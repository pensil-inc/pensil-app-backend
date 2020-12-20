const Mongoose = require("mongoose");
const moment = require("moment");

const Batch = require("../../models/batch");
const Poll = require("../../models/poll");
const Announcement = require("../../models/announcement");
const Video = require("../../models/video");
const Material = require("../../models/material");
const VideoResource = require("../../resources/video-resource");
const MaterialResource = require("../../resources/material-resource");

module.exports = class StudentTimelineController {


    static async __invoke(req, res) {
        const { batchId } = req.params;

        // if invalid id, return error
        if (!Mongoose.isValidObjectId(batchId)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // get batch
        const batch = await (await Batch.findById(batchId).populate('students').populate('subject'));

        // if batch not found, return 404
        if (!batch) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // get announcements
        batch.announcements = StudentTimelineController.toTimelineObject((await Announcement.find({ batches: batch._id }).populate('owner')).map(announcement => ({
            id: announcement.id,
            description: announcement.description,
            owner: {
                id: announcement.owner._id,
                name: announcement.owner.name,
            },
            createdAt: announcement.createdAt,
            updatedAt: announcement.updatedAt,
        })), "announcement");

        // get videos
        batch.videos = StudentTimelineController.toTimelineObject(new VideoResource(await Video.find({ batch: batch._id })), "video");

        // get materials
        batch.materials = StudentTimelineController.toTimelineObject(new MaterialResource(await Material.find({ batch: batch._id })), "material");

        const timeline = [
            ...batch.announcements,
            ...batch.videos,
            ...batch.materials
        ];

        timeline.sort((a, b) => {
            // reverse sort the timeline
            return moment(a.createdAt).isAfter(moment(b.createdAt)) ? -1 : 1;
        });

        // return batch details
        return res.json({
            message: "Batch timeline",
            timeline
        });
    }

    /**
     * Convert the given slice of data into timeline compatible slice
     * @param {*} data 
     */
    static toTimelineObject(data = [], type = "") {
        return data.map(datum => {
            return {
                type,
                createdAt: datum.createdAt,
                datum
            }
        })
    }
};
