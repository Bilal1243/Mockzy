import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import userRoute from './routes/userRoutes.js'
import organizationRoute from './routes/organizationRoutes.js'
import cookieParser from 'cookie-parser'
import Users from './models/userModel.js'
import cors from 'cors'
import http from 'http'

dotenv.config()

const app = express()

const server = http.createServer(app);

// Connect to MongoDB
connectDb()

const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/users', userRoute) 
app.use('/api/organization', organizationRoute)

// Error handlers
app.use(notFound)
app.use(errorHandler)

// Start server
server.listen(port, () => {
  console.log(`Server started successfully on port ${port}`)
})

import { Server } from 'socket.io'

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})


let onlineUsers = [];

io.on("connection", (socket) => {
  // add new user
  socket.on("new-user-add", async (newUserId) => {
    if (!onlineUsers.some((user) => user.userId === newUserId)) {
      onlineUsers.push({ userId: newUserId, socketId: socket.id });
      await Users.findByIdAndUpdate(newUserId, { status: 'online' }); // ✅ correct variable name
      console.log("new user is here!", onlineUsers);
    }
    io.emit("get-users", onlineUsers);
  });

  socket.on("disconnect", async () => {
    const disconnectedUser = onlineUsers.find((user) => user.socketId === socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    if (disconnectedUser) {
      await Users.findByIdAndUpdate(disconnectedUser.userId, {
        status: 'offline',
        lastSeen: new Date(),
      });
    }

    console.log("user disconnected", onlineUsers);
    io.emit("get-users", onlineUsers);
  });

  socket.on("offline", async () => {
    const offlineUser = onlineUsers.find((user) => user.socketId === socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    if (offlineUser) {
      await Users.findByIdAndUpdate(offlineUser.userId, {
        status: 'offline',
        lastSeen: new Date(),
      });
    }

    console.log("user is offline", onlineUsers);
    io.emit("get-users", onlineUsers);
  });
});
