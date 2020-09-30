const Mail = require('./mail');

module.exports = class SampleMail extends Mail {

    /**
     * Change your options here
     * * this.subject
     * * this.html
     * * this.other
     */
    prepare() {
        //
    }
}