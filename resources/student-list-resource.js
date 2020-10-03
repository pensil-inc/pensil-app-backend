const Resource = require('./resource');

module.exports = class StudentListResource extends Resource {

    format(resource) {
        return {
            mobile: resource.mobile,
            name: resource.name,
        };
    }

}