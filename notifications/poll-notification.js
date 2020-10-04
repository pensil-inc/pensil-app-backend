const PollMail = require("../mails/notifications/poll-mail");
const Batch = require("../models/batch");
const User = require("../models/user");
const Notification = require("./notification");
const NotificationModel = require("../models/notification");
const SMS = require("../config/twilio");

module.exports = class PollNotification extends Notification {

    constructor(user, poll) {
        super(user, "New Poll!", poll.question);
    }

    /**
     * Send to all students
     */
    static async toAll(poll) {
        const users = await User.find({ role: "student" });
        for (const user of users) {
            const an = new PollNotification(user, poll);
            await an.send();
        }
        return users.map(e => e._id);
    }

    /**
     * Send to all the students in given batches
     * @param {*} batches 
     * @param {*} poll 
     */
    static async toBatches(batches = [], poll) {
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

        // send poll notification to each user
        for (const user in users) {
            const an = new PollNotification(users[user], poll);
            await an.send();

        }

        return Object.keys(users);
    }

    async trigger(user) {
        // TODO: add push notification here
        // send mail
        await this.sendMail(user);
        // await this.sendPush(user);
        await this.sendSMS(user);
        return await NotificationModel.create({
            title: this.body,
            user
        });
    }

    async sendMail(user) {
        if (user.email) {
            const mail = new PollMail({
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