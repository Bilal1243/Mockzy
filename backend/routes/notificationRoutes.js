import express from 'express'

const notificationRoute = express.Router()

import { protect } from '../middlewares/authMiddlewares.js'
import { getUserNotifications, markAllAsRead } from '../controllers/notificationControllers.js';


notificationRoute.get("/", protect, getUserNotifications);
notificationRoute.get('/markAllAsRead',protect,markAllAsRead)


export default notificationRoute