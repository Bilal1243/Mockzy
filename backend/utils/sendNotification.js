import { getIO } from "../socket.js";
import Notification from "../models/NotificationModel.js";

const io = getIO();

const sendNotification = async ({ recipients, sender, title, message, type, link }) => {


  for (const recipient of recipients) {
    if (!recipient) {
      console.warn("⚠️ Skipping undefined recipient in notification");
      continue;
    }

    const newNotif = await Notification.create({
      recipient,
      sender,
      title,
      message,
      type,
      link,
    });

    console.log(`recipient : ${recipient}`)

    io.to(recipient.toString()).emit("new-notification", newNotif);

  }

};

export default sendNotification;
