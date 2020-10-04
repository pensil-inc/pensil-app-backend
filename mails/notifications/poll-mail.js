const Mail = require('../mail');

module.exports = class PollMail extends Mail {

    /**
     * Change your options here
     * * this.subject
     * * this.html
     * * this.other
     */
    prepare() {
        this.html = `
        <p>Hi ${this.other.user.name},</p>
        <p>${this.other.message}</p>
        `;
    }
}