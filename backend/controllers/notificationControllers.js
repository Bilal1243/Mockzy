import expressAsyncHandler from "express-async-handler";
import Notification from "../models/NotificationModel.js";

const getUserNotifications = expressAsyncHandler(async (req, res) => {

    const notifications = await Notification.find({
        recipient: req.user._id, isRead: false
    })
        .sort({ createdAt: -1 })
        .limit(50);

    res.json(notifications);
})


const markAllAsRead = expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;

    await Notification.updateMany(
        { recipient: userId, isRead: false },
        { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read." });
});


export { getUserNotifications, markAllAsRead }