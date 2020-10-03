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
        const announcements = await Announcement.find({ owner: req.user.id });
        return res.json({ announcements })
    }

    /**
     * Create Announcement
     * @param {*} req 
     * @param {*} res 
     */
    static async create(req, res) {
        const { description } = req.body;
        const announcement = await Announcement.create({
            description,
            owner: req.user.id
        });
        return res.json({ announcement });
    }

    static async update(req, res) {
        const { id } = req.params;
        const { description } = req.body;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const announcement = await Announcement.findOne({
            _id: id,
            owner: req.user.id
        });

        if (!announcement) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        announcement.description = description;
        await announcement.save();

        return res.json({
            message: "Announcement updated!",
            announcement
        })

    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const announcement = await Announcement.findOne({
            _id: id,
            owner: req.user.id
        });

        if (!announcement) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        await announcement.remove();

        return res.json({
            message: "Announcement deleted!",
            announcement
        })

    }
};
