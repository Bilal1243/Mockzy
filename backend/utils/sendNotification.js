import { getIO, onlineUsers } from "../socket.js";
import Notification from "../models/NotificationModel.js";

const io = getIO();

const sendNotification = async ({ recipients, sender, title, message, type, link }) => {
    console.log(recipients)

  for (const recipient of recipients) {
    const newNotif = await Notification.create({
      recipient,
      sender,
      title,
      message,
      type,
      link,
    });

    const userOnline = onlineUsers.find(
      (user) => user.userId === recipient.toString()
    );

    if (userOnline) {
      // ✅ Use room name (userId), NOT socketId
      io.to(recipient.toString()).emit("new-notification", newNotif);
    }
  }
};

export default sendNotification;
