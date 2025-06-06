import express from 'express'
import { authUser, logoutUser } from '../controllers/userControllers.js'


const userRoute = express()

userRoute.route('/').post(authUser)

userRoute.route('/logout').get(logoutUser)

export default userRoute
