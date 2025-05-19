import Users from '../models/userModel.js';

const onlineUsers = new Map();

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('user-online', async (userId) => {
      console.log(userId)
      onlineUsers.set(userId, socket.id);
      await Users.findByIdAndUpdate(userId, { status: 'online' });
      io.emit('online-users', Array.from(onlineUsers.keys()));
    });

    socket.on('disconnect', async () => {
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
          status: 'offline',
          lastSeen: new Date(),
        });
        io.emit('online-users', Array.from(onlineUsers.keys()));
      }
    });
  });
};

export default setupSocketHandlers;
