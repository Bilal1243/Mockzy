import express from 'express'
import {isOrganization, protect } from '../middlewares/authMiddlewares.js'
import { RegisterOrganization, changeAccountStatus, createUser, getAllUsers, getOrganizationById } from '../controllers/organizationControllers.js'
import { OrganizationLogo } from '../config/upload.js'

const organizationRoute = express.Router()

organizationRoute.route('/').get(protect, isOrganization, getAllUsers).post(OrganizationLogo.single('logo'), RegisterOrganization)

organizationRoute.route('/changeStatus').put(changeAccountStatus)

organizationRoute.route('/createUser').post(protect,isOrganization,createUser)

organizationRoute.route('/getOrganization').get(protect, isOrganization, getOrganizationById)


export default organizationRoute