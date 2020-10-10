const AnnouncementMail = require("../mails/notifications/announcement-mail");
const Batch = require("../models/batch");
const User = require("../models/user");
const Notification = require("./notification");
const NotificationModel = require("../models/notification");
const SMS = require("../config/twilio");
const firebaseAdmin = require("../config/firebase");

module.exports = class AnnouncementNotification extends Notification {

    constructor(user, announcement) {
        super(user, "New Announcement!", announcement.description);
    }

    /**
     * Send to all students
     */
    static async toAll(announcement) {
        const users = await User.find({ role: "student" });
        for (const user of users) {
            const an = new AnnouncementNotification(user, announcement);
            await an.send();
        }
        return users.map(e => e._id);
    }

    /**
     * Send to all the students in given batches
     * @param {*} batches 
     * @param {*} announcement 
     */
    static async toBatches(batches = [], announcement) {
        const users = {};
        // add all user in all batches
        batches = await Batch.find({ _id: { $in: batches } }).populate('students');

        for (const batch of batches) {
            // for each student of this batch
            for (const student of batch.students) {
                if (!(student.id in users)) {
                    // add student to users
                    users[student.id] = student;
                }
            }
        }

        // send announcement notification to each user
        for (const user in users) {
            const an = new AnnouncementNotification(users[user], announcement);
            await an.send();

        }

        return Object.keys(users);
    }

    async trigger(user) {
        // TODO: add push notification here
        // send mail
        await this.sendMail(user);
        await this.sendPush(user);
        await this.sendSMS(user);
        return await NotificationModel.create({
            title: this.body,
            user
        });
    }

    async sendMail(user) {
        if (user.email) {
            const mail = new AnnouncementMail({
                to: user.email,
                subject: this.title,
            }, {
                user: user,
                message: this.body
            });

            mail.send().catch(error => {
                // TODO: Handle error
                console.log(error);
            });

            return true;
        } else {
            return false;
        }
    }

    async sendPush(user) {
        // Build push and send it
        try {
            if (user.fcmToken) {
                console.log(await firebaseAdmin.messaging().send({
                    token: user.fcmToken,
                    notification: {
                        title: this.title,
                        body: this.body
                    },
                }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    async sendSMS(user) {
        // Build sms and send it
        if (user.mobile) {
            const sms = new SMS("+91" + user.mobile, this.body);
            sms.send().catch(error => {
                // TODO: Handle error
                console.log(error);
            });
        }
    }
}