const Resource = require('./resource');

module.exports = class AnnouncementResource extends Resource {

    format(resource) {
        return {
            batches: resource.batches,
            description: resource.description,
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