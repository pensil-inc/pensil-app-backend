const Announcement = require("../../models/announcement");

module.exports = class StudentAnnouncementController {
    /**
     * List Announcements for this user
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        // TODO: Add filter to get announcement only for him
        const announcements = await Announcement.find();
        return res.json({ announcements })
    }

    static create(req, res) { }

    static update(req, res) { }

    static delete(req, res) { }
};
