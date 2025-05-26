import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import userRoute from './routes/userRoutes.js'
import organizationRoute from './routes/organizationRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import departmentRoutes from './routes/departmentRoutes.js'
import { initSocket } from './socket.js'
import notificationRoute from './routes/notificationRoutes.js'

dotenv.config()

const app = express()

const server = http.createServer(app);

// Connect to MongoDB
connectDb()

const port = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: 'https://mockzy-frontend.onrender.com',
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/users', userRoute)
app.use('/api/organization', organizationRoute)
app.use('/api/departments', departmentRoutes)
app.use('/api/notifications',notificationRoute)

// Error handlers
app.use(notFound)
app.use(errorHandler)

// Start server
server.listen(port, () => {
  console.log(`Server started successfully on port ${port}`)
})

const io = initSocket(server);
