const Mongoose = require("mongoose");
const ResponseHelper = require("../helpers/response_helper");
const Announcement = require("../models/announcement");
const Batch = require("../models/batch");
const AnnouncementNotification = require("../notifications/announcement-notification");
const { v4: uuid } = require('uuid');
const { promises: fs } = require('fs');
const storage = require("../config/storage");
const AnnouncementResource = require("../resources/announcement-resource");

module.exports = class AnnouncementController {
    // List all announcement by batch Id
    static async listByBatch(req, res) {
        const { batchId } = req.params;

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        const announcements = await Announcement.find({
            owner: req.user.id,
            batches: batch._id
        }).populate('answers.student')
            .populate('owner')
            .populate('batch');

        return res.json({ announcements: new AnnouncementResource(announcements) })
    }
    /**
     * List Announcements
     * @param {*} req 
     * @param {*} res 
     */
    static async index(req, res) {
        const announcements = await Announcement.find({ owner: req.user.id, isForAll: true })
            .populate('owner');

        return res.json({ announcements: new AnnouncementResource(announcements) });
    }

    /**
     * Create Announcement
     * @param {*} req 
     * @param {*} res 
     */
    static async create(req, res) {
        const { description, isForAll, batches } = req.body;

        // is announcement is not for all
        if (!isForAll) {
            // check for invalid batches
            const invalidBatches = (await Promise.all(batches.map(async batch => {
                return Batch.findOne({
                    _id: batch,
                    owner: req.user.id
                });
            }))).map((batch, index) => {
                if (batch) {
                    return false;
                } else {
                    return batches[index] + " in not a valid batch!";
                }
            }).filter(e => e);

            if (invalidBatches.length > 0) {
                return ResponseHelper.validationResponse(res, {
                    batches: invalidBatches
                });
            }
        }

        const announcement = await Announcement.create({
            description,
            isForAll,
            batches: !isForAll ? batches : [],
            owner: req.user.id
        });

        // TODO: broadcast this announcement (notify the users)
        if (isForAll) {
            AnnouncementNotification.toAll(announcement);
        } else {
            AnnouncementNotification.toBatches(batches, announcement);
        }


        return res.json({ announcement: new AnnouncementResource(announcement) });
    }

    static async updateImage(req, res) {
        const { id } = req.params;

        // Check if file uploaded
        if (!req.files) {
            return ResponseHelper.validationResponse(res, { file: ["File is required!"] });
        }

        const { file } = req.files;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }


        // Check if file uploaded
        if (!file) {
            return ResponseHelper.validationResponse(res, { file: ["File is required!"] });
        }

        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // get file content
        const { data, mimetype, name, size, tempFilePath } = file;

        const fileName = uuid() + "." + name.split(".").pop();

        // check for previous saved file and delete it
        if (announcement.image) {
            try {
                await fs.unlink(storage.getAnnouncementPath(announcement.image));
            } catch (error) {
                console.info("Older file " + announcement.image + " not deleted!");
            }
        }

        // save file
        await fs.writeFile(storage.getAnnouncementPath(fileName), await fs.readFile(tempFilePath));

        announcement.image = fileName;

        await announcement.save();

        return res.json({ announcement: new AnnouncementResource(announcement) });

    }

    static async updateFile(req, res) {
        const { id } = req.params;

        // Check if file uploaded
        if (!req.files) {
            return ResponseHelper.validationResponse(res, { file: ["File is required!"] });
        }

        const { file } = req.files;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }


        // Check if file uploaded
        if (!file) {
            return ResponseHelper.validationResponse(res, { file: ["File is required!"] });
        }

        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // get file content
        const { data, mimetype, name, size, tempFilePath } = file;

        const fileName = uuid() + "." + name.split(".").pop();

        // check for previous saved file and delete it
        if (announcement.image) {
            try {
                await fs.unlink(storage.getAnnouncementPath(announcement.image));
            } catch (error) {
                console.info("Older file " + announcement.image + " not deleted!");
            }
        }

        // save file
        await fs.writeFile(storage.getAnnouncementPath(fileName), await fs.readFile(tempFilePath));

        announcement.file = fileName;

        await announcement.save();

        return res.json({ announcement: new AnnouncementResource(announcement) });

    }

    static async update(req, res) {
        const { description } = req.body;

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

        announcement.description = description;

        await announcement.save();

        return res.json({ announcement: new AnnouncementResource(announcement) });

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
            announcement: new AnnouncementResource(announcement)
        })

    }
};
