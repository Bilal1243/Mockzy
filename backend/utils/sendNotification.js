import { getIO, getOnlineUsers } from "../socket.js";
import Notification from "../models/NotificationModel.js";

const io = getIO();
const onlineUsers = getOnlineUsers();

const sendNotification = async ({ recipient, sender, title, message, type, link }) => {
  if (!recipient) {
    console.warn("⚠️ Skipping undefined recipient in notification");
    return;
  }


  const newNotif = await Notification.create({
    recipient,
    sender,
    title,
    message,
    type,
    link,
  });

  console.log(`📨 Notification created for ${recipient}`);

  const socketId = onlineUsers.get(recipient);
  console.log(socketId)
  if (socketId) {
    io.to(recipient).emit("new-notification", newNotif);
    console.log(`✅ Live notification sent to user room: ${recipient}`);
  } else {
    console.log(`ℹ️ User ${recipient} is offline. Notification stored.`);
  }
};

export default sendNotification;
