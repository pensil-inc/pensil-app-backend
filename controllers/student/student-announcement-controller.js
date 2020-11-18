const Announcement = require("../../models/announcement");
const Batch = require("../../models/batch");
const AnnouncementResource = require("../../resources/announcement-resource");

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
        }).populate('owner');

        return res.json({ count: announcements.length, announcements: new AnnouncementResource(announcements) })
    }
};
