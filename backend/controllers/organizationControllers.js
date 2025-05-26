import expressAsyncHandler from "express-async-handler";
import Organization from "../models/organizationsModel.js";
import Users from "../models/userModel.js";
import bcrypt from 'bcrypt';
import Faculties from "../models/facultyModel.js";
import Students from "../models/studentsModel.js";
import mongoose from "mongoose";
import Departments from "../models/departmentModel.js";
import sendNotification from "../utils/sendNotification.js";

const RegisterOrganization = expressAsyncHandler(async (req, res) => {
    let { password, organizationName, description, email } = req.body


    const salt = await bcrypt.genSalt(10)
    const encrycptedPassword = await bcrypt.hash(password, salt)


    const logo = req.file ? req.file.path : null;

    let organizationExists = await Organization.findOne({ organizationName: organizationName })

    if (organizationExists) {
        return res.status(400).json({ message: 'organization already exists' })
    }

    let organization = await Organization.create({
        organizationName,
        description,
        logo
    })

    if (organization) {
        let newUser = await Users.create({
            email,
            role: 'organization',
            password: encrycptedPassword,
            userId: organization._id
        })


        if (newUser) {
            res.status(200).json(newUser)
        }
        else {
            res.status(400).json({ message: 'Invalid user data' })
        }

    } else {
        res.status(400).json({ message: 'failed to create organization' })
    }

})

const changeAccountStatus = expressAsyncHandler(async (req, res) => {
    const { id } = req.query

    const user = await Users.findById(id)
    if (user) {
        user.isAccepted = true
        user.save()
        res.status(200).json({ message: 'status changed successfully' })
    } else {
        res.status(404).json('user not found')
    }

})

const createUser = expressAsyncHandler(async (req, res) => {
    const { name, email, organization, role, department, faculty } = req.body;

    if (!name || !email || !organization || !role || (role === "student" && !faculty)) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const findOrganization = await Organization.findById(organization);
    if (!findOrganization) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    const userExists = [...findOrganization.faculties, ...findOrganization.students]
        .find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists in this organization' });
    }

    const salt = await bcrypt.genSalt(10)
    const encrycptedPassword = await bcrypt.hash(findOrganization.organizationName, salt)

    const user = await Users.create({
        name,
        email,
        role: role,
        organization,
        password: encrycptedPassword
    })

    const newUser = { _id: user._id, name, email, role };

    let findDepartment = await Departments.findById(department)

    if (role === 'faculty') {
        let newFaculty = await Faculties.create({
            name,
            email,
            organization,
            department
        })
        user.userId = newFaculty._id;
        await user.save();

        for (let recipient of findOrganization?.faculties) {
            await sendNotification({
                recipient: recipient._id,
                sender: req.user._id,
                title: "Welcome our new Faculty",
                message: `Let's welcome our new faculty ${name}`,
                type: "newFaculty_added",
                link: null
            });
        }
        findOrganization.faculties.push(newUser);
    } else if (role === 'student') {
        let newStudent = await Students.create({
            name,
            email,
            organization,
            department,
            faculty
        })
        user.userId = newStudent._id;
        await user.save();
        await sendNotification({
            recipient: faculty,
            sender: req.user._id,
            title: "New Student has been assigned to you",
            message: `${name} has been assigned to you`,
            type: "newStudent_added",
            link: null
        });
        findOrganization.students.push(newUser);
    } else {
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    findDepartment.members.push(user._id)
    await findDepartment.save()
    await findOrganization.save();

    res.status(201).json({ message: 'User added successfully' });
});



const getAllUsers = expressAsyncHandler(async (req, res) => {
    const { organization } = req.query;

    if (!organization) {
        res.status(400);
        throw new Error("Organization ID is required");
    }

    const students = await Users.aggregate([
        {
            $lookup: {
                from: 'students',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
            },
        },
        {
            $unwind: '$userDetails',
        },
        {
            $match: { 'userDetails.organization': new mongoose.Types.ObjectId(organization) }
        }
    ]);

    const faculties = await Users.aggregate([
        {
            $lookup: {
                from: 'faculties',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
            },
        },
        {
            $unwind: '$userDetails',
        },
        {
            $match: { 'userDetails.organization': new mongoose.Types.ObjectId(organization) }
        }
    ]);


    const data = [...students, ...faculties];

    res.json(data);
});


const getOrganizationById = expressAsyncHandler(async (req, res) => {
    let { id } = req.query

    let organizations = await Organization.find({ _id: id })

    res.json(organizations)

})

const getAllFaculties = expressAsyncHandler(async (req, res) => {
    const { organization } = req.query;
    const faculties = await Users.aggregate([
        {
            $lookup: {
                from: 'faculties',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
            },
        },
        {
            $unwind: '$userDetails',
        },
        {
            $match: { 'userDetails.organization': new mongoose.Types.ObjectId(organization) }
        }
    ]);

    res.json(faculties);
})




export {
    RegisterOrganization,
    changeAccountStatus,
    createUser,
    getAllUsers,
    getOrganizationById,
    getAllFaculties
}