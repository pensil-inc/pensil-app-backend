const Mongoose = require("mongoose");
const { response } = require("..");
const Announcement = require("../models/announcement");

module.exports = class AnnouncementController {
    /**
     * List Announcements
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        const announcements = await Announcement.find();
        return res.json({ announcements })
    }

    /**
     * Create Announcement
     * @param {*} req 
     * @param {*} res 
     */
    static async create(req, res) {
        const announcement = await Announcement.create(req.body);
        return res.json({ announcement });
    }

    static update(req, res) { }

    static async delete(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }
        
        await announcement.remove();

        return res.json({ announcement })

    }
};
