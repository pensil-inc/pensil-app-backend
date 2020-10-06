const Announcement = require("../../models/announcement");
const Batch = require("../../models/batch");

module.exports = class StudentAnnouncementController {
    /**
     * List Announcements for this user
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        // TODO: Add filter to get announcement only for him
        // get batches for user
        const batches = (await Batch.find({
            students: req.user.id
        })).map(batch => batch.id);

        const announcements = await Announcement.find({
            $or: [
                { isForAll: true },
                { batches: { $in: batches } }
            ]
        });
        return res.json({ count: announcements.length, announcements })
    }
};
