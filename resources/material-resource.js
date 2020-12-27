const storage = require('../config/storage');
const Resource = require('./resource');

module.exports = class MaterialResource extends Resource {

    format(resource) {
        return {
            id: resource._id,
            title: resource.title,
            subject: resource.subject ? resource.subject.name : null,
            batch: resource.batch ? resource.batch._id : null,
            description: resource.description,
            fileUrl: resource.fileUrl,
            file: resource.file ? storage.getMaterialLink(resource.file) : null,
            fileType: resource.fileType,
            fileUploadedOn: resource.fileUploadedOn,
            isPrivate: resource.isPrivate,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        };
    }

}