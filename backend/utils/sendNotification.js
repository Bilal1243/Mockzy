import { getIO, onlineUsers } from "../socket.js";
import Notification from "../models/NotificationModel.js";

const io = getIO();

const sendNotification = async ({ recipient, sender, title, message, type, link }) => {
  if (!recipient) {
    console.warn("⚠️ Skipping undefined recipient in notification");
    return;
  }

  const recipientId = recipient.toString(); // Ensure it's a string

  const newNotif = await Notification.create({
    recipient: recipientId,
    sender,
    title,
    message,
    type,
    link,
  });

  console.log(`📨 Notification created for recipient: ${recipientId}`);

  // ✅ Check if user is online by userId
  const userOnline = onlineUsers.find(user => user.userId === recipientId);

  if (userOnline) {
    io.to(userOnline.socketId).emit("new-notification", newNotif);
    console.log(`✅ Sent live notification to socket: ${userOnline.socketId}`);
  } else {
    console.log(`ℹ️ User ${recipientId} is offline. Notification saved to DB only.`);
  }
};

export default sendNotification;
