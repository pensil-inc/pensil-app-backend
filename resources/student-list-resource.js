const Resource = require('./resource');

module.exports = class StudentListResource extends Resource {

    format(resource) {
        return {
            id: resource._id,
            mobile: resource.mobile,
            name: resource.name,
        };
    }

}