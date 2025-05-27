import { Server } from "socket.io";
import Users from './models/userModel.js';

const onlineUsers = new Map();
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://mockzy-frontend.onrender.com",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 New socket connected:", socket.id);

    // ✅ Optional: join personal room for future use
    socket.on("join", (userId) => {
      if (userId) {
        socket.join(userId); // Room join, optional use
        console.log(`🔔 User ${userId} joined their notification room`);
      }
    });

    // ✅ Add user to onlineUsers Map
    socket.on("user-online", async (userId) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      await Users.findByIdAndUpdate(userId, { status: "online" });

      console.log(`👤 User ${userId} is now online`);
      io.emit("online-users", Array.from(onlineUsers.keys())); // Broadcast all online userIds
    });

    // ✅ Handle user disconnect
    socket.on("disconnect", async () => {
      let disconnectedUserId = null;

      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        await Users.findByIdAndUpdate(disconnectedUserId, {
          status: "offline",
          lastSeen: new Date(),
        });
        console.log(`🔌 User ${disconnectedUserId} disconnected`);
        io.emit("online-users", Array.from(onlineUsers.keys()));
      }
    });
  });

  return io;
};

const getIO = () => io;
const getOnlineUsers = () => onlineUsers;

export { initSocket, getIO, getOnlineUsers };
