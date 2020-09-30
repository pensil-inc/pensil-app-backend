module.exports = class Resource {
    constructor(resource) {
        this.resource = resource;
        return this.prepare();
    }

    format(resource) {
        return resource;
    }

    prepare() {
        if(this.resource instanceof Array) {
            return this.resource.map(item => {
                return this.format(item);
            });
        } else {
            return this.format(this.resource);
        }
    }

}