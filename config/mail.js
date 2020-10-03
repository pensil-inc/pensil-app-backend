const nodeMailer = require('nodemailer');

class Transporter {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.example.com',
            port: process.env.MAIL_PORT || 587,
            secure: process.env.MAIL_SECURE || false,
            auth: {
                user: process.env.MAIL_USER || 'test@example.com',
                pass: process.env.MAIL_PASS || 'secret'
            }
        });
    }

    sendMail(configuration) {
        return this.transporter.sendMail(configuration);
    }
};

module.exports = Transporter;