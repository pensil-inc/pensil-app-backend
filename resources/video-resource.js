const storage = require('../config/storage');
const Resource = require('./resource');

module.exports = class VideoResource extends Resource {

    format(resource) {
        return {
            id: resource._id,
            title: resource.title,
            subject: resource.subject ? resource.subject.name : null,
            batchId: resource.batch ? resource.batch._id : null,
            description: resource.description,
            duration: resource.duration,
            thumbnailUrl: resource.thumbnailUrl,
            videoUrl: resource.videoUrl,
            video: resource.video,
            fileUploadedOn: resource.fileUploadedOn,
            isPrivate: resource.isPrivate,
            quality: resource.quality,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        };
    }

}