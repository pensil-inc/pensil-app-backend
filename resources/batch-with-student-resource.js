const Resource = require('./resource');
const StudentResource = require('./student-resource');

module.exports = class BatchWithStudentResource extends Resource {

    format(resource) {
        return {
            "id": resource.id,
            "name": resource.name,
            "description": resource.description,
            "subject": resource.subject ? resource.subject.name : null,
            "classes": resource.classes.map(classs => ({
                dayOfWeek: classs.dayOfWeek,
                startTime: classs.startTime,
                endTime: classs.endTime,
            })),
            "students": resource.students.map(student => new StudentResource(student)),
            "createdAt": resource.createdAt,
            "updatedAt": resource.updatedAt,
        };
    }

}