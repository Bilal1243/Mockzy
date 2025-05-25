import expressAsyncHandler from "express-async-handler";
import Departments from "../models/departmentModel.js";
import Organization from "../models/organizationsModel.js";
import mongoose from "mongoose";
import Faculties from "../models/facultyModel.js";
import Users from "../models/userModel.js";

const addDepartment = expressAsyncHandler(async (req, res) => {
    const { organization, name, createdBy } = req.body;

    if (!organization || !name || !createdBy) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const findOrganization = await Organization.findById(organization);

    if (!findOrganization) {
        res.status(404);
        throw new Error("Organization not found");
    }

    const existingDepartment = await Departments.findOne({
        name: name,
        organization: organization
    });

    if (existingDepartment) {
        res.status(400);
        throw new Error("Department already exists in this organization");
    }

    const newDepartment = await Departments.create({
        name,
        organization,
        createdBy
    });

    findOrganization.departments.push(newDepartment._id)
    await findOrganization.save()

    res.status(201).json({
        message: "Department added successfully",
        department: newDepartment
    });
});



const getAllDepartments = expressAsyncHandler(async (req, res) => {

    const departments = await Departments.aggregate([
        {
            $match: {
                organization: new mongoose.Types.ObjectId(req.query.organization)
            }
        },
        {
            $lookup: {
                from: "users", // make sure this matches your actual collection name
                localField: "members",
                foreignField: "_id",
                as: "memberDetails",
            },
        },
        {
            $addFields: {
                studentsCount: {
                    $size: {
                        $filter: {
                            input: "$memberDetails",
                            as: "member",
                            cond: { $eq: ["$$member.role", "student"] },
                        },
                    },
                },
                facultiesCount: {
                    $size: {
                        $filter: {
                            input: "$memberDetails",
                            as: "member",
                            cond: { $eq: ["$$member.role", "faculty"] },
                        },
                    },
                },
            },
        },
    ])

    res.json(departments);
});


const getFacultyByDepartment = expressAsyncHandler(async (req, res) => {
    const { departmentId, organization } = req.params;

    const faculties = await Users.aggregate([
        {
            $match: { role: 'faculty' },
        },
        {
            $lookup: {
                from: 'faculties',
                localField: 'userId',
                foreignField: '_id',
                as: 'facultyDetails',
            },
        },
        {
            $unwind: '$facultyDetails',
        },
        {
            $match: {
                'facultyDetails.organization': new mongoose.Types.ObjectId(organization),
                'facultyDetails.department': departmentId,
            },
        },
    ]);

    res.json(faculties);
});



export {
    addDepartment,
    getAllDepartments,
    getFacultyByDepartment
}