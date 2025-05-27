import Users from "../models/userModel.js";
import Organization from "../models/organizationsModel.js";
import bcrypt from 'bcrypt';
import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import generateToken from "../utils/generateToken.js";
import Students from "../models/studentsModel.js";
import Faculties from "../models/facultyModel.js";


// @desc    Auth user & get token
// @route   POST /api/users/
// @access  Public
const authUser = expressAsyncHandler(async (req, res) => {
    let { email, password } = req.body

    console.log(req.body)

    const user = await Users.findOne({ email: email })

    if (!user) {
        return res.status(400).json({ message: 'No user founded for this email' });
    }

    let userData

    if (user.role === 'organization') {
        userData = await Organization.findById(user.userId)
    } else if (user.role === 'faculty') {
        userData = await Faculties.findById(user.userId)
    } else if (user.role === 'student') {
        userData = await Students.findById(user.userId)
    } else {
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    if (user && await user.matchPassword(password)) {

        if (user.role === 'organization' && !user.isAccepted) {
            return res.status(400).json({ message: 'profile not accepted' })
        }

        generateToken(res, user._id)

        if (user.role === 'organization') {
            return res.status(201).json({
                _id: user._id,
                name: userData.organizationName,
                email: user.email,
                isAccepted: user.isAccepted,
                role: user.role,
                userId: userData._id
            })
        }
        else if (user.role === 'faculty') {
            return res.status(201).json({
                _id: user._id,
                name: userData.name,
                email: user.email,
                isAccepted: user.isAccepted,
                role: user.role,
                userId: userData._id
            })
        } else {
            return res.status(201).json({
                _id: user._id,
                name: userData.name,
                email: user.email,
                isAccepted: user.isAccepted,
                role: user.role,
                userId: userData._id
            })
        }


    }
    else {
        return res.status(400).json({ message: 'invalid user data' })
    }
});

// @desc    Logout user (frontend can just clear token)
// @route   POST /api/users/logout
// @access  Public
const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expiresIn: new Date(0)
    })

    res.status(200).json({ message: 'logout success' })
});



export {
    authUser,
    logoutUser
}
