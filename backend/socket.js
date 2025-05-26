import { Server } from "socket.io";
import Users  from './models/userModel.js'
let onlineUsers = [];
let io 

const initSocket = (server) => {
   io = new Server(server, {
    cors: {
        origin: "https://mockzy-frontend.onrender.com",
        credentials: true,
    },
});


    io.on("connection", (socket) => {
        socket.on("new-user-add", async (newUserId) => {
            if (!onlineUsers.some((user) => user.userId === newUserId)) {
                onlineUsers.push({ userId: newUserId, socketId: socket.id });
                await Users.findByIdAndUpdate(newUserId, { status: "online" });
                console.log("new user is here!", onlineUsers);
            }
            io.emit("get-users", onlineUsers);
        });

        socket.on("disconnect", async () => {
            const disconnectedUser = onlineUsers.find(
                (user) => user.socketId === socket.id
            );
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            if (disconnectedUser) {
                await Users.findByIdAndUpdate(disconnectedUser.userId, {
                    status: "offline",
                    lastSeen: new Date(),
                });
            }
            console.log("user disconnected", onlineUsers);
            io.emit("get-users", onlineUsers);
        });

        socket.on("offline", async () => {
            const offlineUser = onlineUsers.find(
                (user) => user.socketId === socket.id
            );
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            if (offlineUser) {
                await Users.findByIdAndUpdate(offlineUser.userId, {
                    status: "offline",
                    lastSeen: new Date(),
                });
            }
            console.log("user is offline", onlineUsers);
            io.emit("get-users", onlineUsers);
        });
    });

    return io;
};

const getIO = () => io;

export { initSocket, onlineUsers , getIO };
