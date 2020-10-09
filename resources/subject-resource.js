const Resource = require('./resource');

module.exports = class SubjectResource extends Resource {

    format(resource) {
        return resource.name;
    }

}