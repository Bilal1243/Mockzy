import express from 'express'
import { authUser, logoutUser } from '../controllers/userControllers.js'


const userRoute = express()

console.log('entered')

userRoute.route('/').post(authUser)

userRoute.route('/logout').get(logoutUser)

export default userRoute
