const Mail = require('./mail');

module.exports = class OTPMail extends Mail {

    /**
     * Change your options here
     * * this.subject
     * * this.html
     * * this.other
     */
    prepare() {
        this.subject = "Your OTP for pensil is " + this.other.otp;
        this.html = `
        <p>Hi ${this.other.user.name},</p>
        <p>Please use <b>${this.other.otp}</b> as your <b>OTP</b>.</p>
        `;
    }
}