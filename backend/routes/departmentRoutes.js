import express from "express";
import { isOrganization, protect } from "../middlewares/authMiddlewares.js";
import { addDepartment, getAllDepartments, getFacultyByDepartment } from "../controllers/departmentControllers.js";

const departmentRoutes = express.Router()


departmentRoutes.route('/').get(protect, isOrganization, getAllDepartments).post(protect, isOrganization, addDepartment)

departmentRoutes.route('/:departmentId/:organization/faculties').get(protect, isOrganization, getFacultyByDepartment)


export default departmentRoutes