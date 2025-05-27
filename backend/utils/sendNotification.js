import { getIO, getOnlineUsers } from "../socket.js";
import Notification from "../models/NotificationModel.js";

const sendNotification = async ({ recipient, sender, title, message, type, link }) => {
  if (!recipient) {
    console.warn("⚠️ Skipping undefined recipient in notification");
    return;
  }

  const recipientId = recipient.toString(); // Ensure string ID for room
  const io = getIO();
  const onlineUsers = getOnlineUsers();

  // Save to DB
  const newNotif = await Notification.create({
    recipient: recipientId,
    sender,
    title,
    message,
    type,
    link,
  });

  console.log(`📨 Notification created for ${recipientId}`);

  // Check if user is online
  const socketId = onlineUsers.get(recipientId);
  console.log("📡 Online socketId:", socketId);

  if (socketId) {
    // Send to the user's room (joined via socket.join(userId))
    io.to(recipientId).emit("new-notification", newNotif);
    console.log(`✅ Live notification sent to room: ${recipientId}`);
  } else {
    console.log(`ℹ️ User ${recipientId} is offline. Notification stored only.`);
  }
};

export default sendNotification;
