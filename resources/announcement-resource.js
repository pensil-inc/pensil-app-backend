const Resource = require('./resource');
const storage = require('../config/storage');

module.exports = class AnnouncementResource extends Resource {

    format(resource) {
        return {
            batches: resource.batches,
            description: resource.description,
            image: resource.image ? storage.getAnnouncementLink(resource.image) : null,
            isForAll: resource.isForAll,
            owner: {
                id: resource.owner._id,
                name: resource.owner.name
            },
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
            id: resource.id,
        };
    }

}