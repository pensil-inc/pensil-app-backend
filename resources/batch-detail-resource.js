const MaterialResource = require('./material-resource');
const Resource = require('./resource');
const StudentListResource = require('./student-list-resource');
const VideoResource = require('./video-resource');

module.exports = class BatchDetailResource extends Resource {

    format(resource) {
        return {
            id: resource.id,
            students: new StudentListResource(resource.students),
            name: resource.name,
            subject: resource.subject.name,
            owner: resource.owner,
            classes: resource.classes,
            announcements: resource.announcements
                .map(announcement => ({
                    id: announcement.id,
                    description: announcement.description,
                    owner: announcement.owner,
                    createdAt: announcement.createdAt,
                    updatedAt: announcement.updatedAt,
                })),
            videos: new VideoResource(resource.videos),
            materials: new MaterialResource(resource.materials),
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        };
    }

}