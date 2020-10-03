const Notification = require("../../models/notification");
const NotificationResource = require("../../resources/notification-resource");

module.exports = class StudentNotificationController {
    static async index(req, res) {
        // get all the batches where user is added
        const notifications = await Notification.find({
            user: req.user.id
        });

        return res.json({
            notifications: new NotificationResource(notifications)
        });
    }
};
