const Mongoose = require("mongoose");
const ResponseHelper = require("../helpers/response_helper");
const Subject = require("../models/subject");
const Video = require("../models/video");
const VideoResource = require("../resources/video-resource");

module.exports = class VideoController {
    // List all videos
    static async index(req, res) {
        const videos = await Video.find({}).populate('subject');

        return res.json({ videos: new VideoResource(videos) });
    }

    // Add a new video
    static async create(req, res) {
        const { title, description, subject, duration, videoUrl, thumbnailUrl, quality, isPrivate } = req.body;

        // check if subject exists
        const subjectObj = await Subject.findOne({ name: subject });
        if (!subjectObj) {
            return ResponseHelper.validationResponse(res, {
                subject: ["Invalid Subject!"]
            })
        }

        const video = await Video.create({
            title,
            subject: subjectObj._id,
            description,
            duration,
            videoUrl,
            thumbnailUrl,
            quality,
            isPrivate
        });

        // to populate subject as well
        const newVideo = await Video.findById(video._id)
            .populate('subject');

        return res.json({
            message: "Video added!",
            video: new VideoResource(newVideo)
        });
    }

    static async update(req, res) {
        const { id } = req.params;

        const { title, description, subject, duration, videoUrl, thumbnailUrl, quality, isPrivate } = req.body;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }


        // check if subject exists
        const subjectObj = await Subject.findOne({ name: subject });
        if (!subjectObj) {
            return ResponseHelper.validationResponse(res, {
                subject: ["Invalid Subject!"]
            })
        }

        video.title = title;
        video.subject = subjectObj._id;
        video.description = description;
        video.duration = duration;
        video.thumbnailUrl = thumbnailUrl;
        video.videoUrl = videoUrl;
        video.quality = quality;
        video.isPrivate = isPrivate;

        await video.save();

        const updatedVideo = (await Video.findById(video._id)).populate('subject');

        return res.json({
            message: "Video updated!",
            video: new VideoResource(updatedVideo)
        });
    }

    // delete video
    static async delete(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const video = await Video.findById(id).populate('subject');

        if (!video) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        await video.remove();

        return res.json({
            message: "Video deleted!",
            video: new VideoResource(video)
        });
    }
};
