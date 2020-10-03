const Resource = require('./resource');

module.exports = class NotificationResource extends Resource {

    format(resource) {
        return {
            title: resource.title
        };
    }

}