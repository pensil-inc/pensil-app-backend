const Resource = require('./resource');

module.exports = class StudentResource extends Resource {

    format(resource) {
        return {
            isVerified: resource.isVerified,
            lastLoginDate: resource.lastLoginDate,
            id: resource._id,
            name: resource.name,
            mobile: resource.mobile,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        };
    }

}