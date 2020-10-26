const Mongoose = require("mongoose");
const storage = require("../config/storage");
const ResponseHelper = require("../helpers/response_helper");
const Batch = require("../models/batch");
const Subject = require("../models/subject");
const Video = require("../models/video");
const VideoResource = require("../resources/video-resource");
const moment = require('moment');
const { v4: uuid } = require('uuid');
const { promises: fs } = require('fs');

module.exports = class VideoController {
    // List all videos
    static async index(req, res) {
        const { batchId } = req.params;

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        const videos = await Video.find({
            batch: batch._id
        }).populate('subject').populate('batch');

        return res.json({ videos: new VideoResource(videos) });
    }

    // Add a new video
    static async create(req, res) {
        const { title, description, subject, duration, videoUrl, batchId, thumbnailUrl, quality, isPrivate } = req.body;

        // check if subject exists
        const subjectObj = await Subject.findOne({ name: subject });
        if (!subjectObj) {
            return ResponseHelper.validationResponse(res, {
                subject: ["Invalid Subject!"]
            })
        }

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        const video = await Video.create({
            title,
            subject: subjectObj._id,
            batch: batch._id,
            description,
            duration,
            videoUrl,
            thumbnailUrl,
            quality,
            isPrivate
        });

        // to populate subject as well
        const newVideo = await Video.findById(video._id)
            .populate('subject').populate('batch');

        return res.json({
            message: "Video added!",
            video: new VideoResource(newVideo)
        });
    }

    static async update(req, res) {
        const { id } = req.params;

        const { title, description, subject, duration, videoUrl, batchId, thumbnailUrl, quality, isPrivate } = req.body;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
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
        video.batch = batchId._id;
        video.description = description;
        video.duration = duration;
        video.thumbnailUrl = thumbnailUrl;
        video.videoUrl = videoUrl;
        video.quality = quality;
        video.isPrivate = isPrivate;

        await video.save();

        const updatedVideo = (await Video.findById(video._id)).populate('subject').populate('batch');

        return res.json({
            message: "Video updated!",
            video: new VideoResource(updatedVideo)
        });
    }


    // upload file to material
    static async updateVideo(req, res) {
        const { id } = req.params;

        const { file } = req.files;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const video = await Video.findById(id);

        // if not found, return error
        if (!video) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // get file content
        const { data, mimetype, name, size } = file;

        const fileName = uuid() + "." + name.split(".").pop();

        // check for previous saved file and delete it
        if (video.video) {
            try {
                await fs.unlink(storage.getVideoPath(video.video));
            } catch (error) {
                console.info("Older file " + video.video + " not deleted!");
            }
        }

        // save file
        await fs.writeFile(storage.getVideoPath(fileName), data);

        // save file info
        video.video = fileName;
        video.fileUploadedOn = moment().toISOString();
        await video.save();

        return res.json({ video: new VideoResource(video) });
    }

    // delete video
    static async delete(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const video = await Video.findById(id).populate('subject').populate('batch');

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
