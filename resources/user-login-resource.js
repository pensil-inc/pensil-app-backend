const Resource = require('./resource');

module.exports = class UserLoginResource extends Resource {

    format(resource) {
        return {
            id: resource.id,
            name: resource.name,
            mobile: resource.mobile,
            role: resource.role,
            lastLoginDate: resource.lastLoginDate,
            fcmToken: resource.fcmToken,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
            token: resource.token,
        };
    }

}