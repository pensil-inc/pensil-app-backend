const Resource = require('./resource');

module.exports = class UserLoginResource extends Resource {

    format(resource) {
        return {
            id: resource.id,
            name: resource.name,
            mobile: resource.mobile,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
            token: resource.token,
        };
    }

}