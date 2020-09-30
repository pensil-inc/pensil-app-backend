const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.example.com',
    port: process.env.MAIL_PORT || 587,
    secure: process.env.MAIL_SECURE || false,
    auth: {
        user: process.env.MAIL_USER || 'test@example.com',
        pass: process.env.MAIL_PASS || 'secret'
    }
});

module.exports = transporter;