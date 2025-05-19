import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const protect = async (req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET); //for token verify The Token Inside Have user Id
                req.user = await Users.findById(decoded.userId).select("-password"); //.select userd for not show password
                next();
            } catch (error) {
                res.status(401);
                throw new Error("Not Authorised,Invalid Token");
            }
        } else {
            res.status(401);
            throw new Error("Not Authorised,No Token");
        }
    } catch (error) {
        next(error);
    }
};


const isOrganization = (req, res, next) => {
    if (req.user && req.user.role === 'organization') {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorised As Organization')
    }
}

const superAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'superAdmin') {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorised As Super Admin')
    }
}


export { protect, isOrganization , superAdmin};