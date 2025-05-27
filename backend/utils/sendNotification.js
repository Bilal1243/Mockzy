import { getIO, getOnlineUsers } from "../socket.js";
import Notification from "../models/NotificationModel.js";

const io = getIO();
const onlineUsers = getOnlineUsers();

const sendNotification = async ({ recipient, sender, title, message, type, link }) => {
  if (!recipient) {
    console.warn("⚠️ Skipping undefined recipient in notification");
    return;
  }

  const recipientId = recipient.toString();

  const newNotif = await Notification.create({
    recipient: recipientId,
    sender,
    title,
    message,
    type,
    link,
  });

  console.log(`📨 Notification created for ${recipientId}`);

  const socketId = onlineUsers.get(recipientId); // ⚡ Fast Map lookup

  if (socketId) {
    io.to(socketId).emit("new-notification", newNotif);
    console.log(`✅ Live notification sent to socket ${socketId}`);
  } else {
    console.log(`ℹ️ User ${recipientId} is offline. Notification stored.`);
  }
};

export default sendNotification;
