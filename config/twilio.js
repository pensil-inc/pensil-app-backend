const twilio = require('twilio');

module.exports = class SMS {
    constructor(to, message) {
        this.body = message;
        this.to = to;
    }

    /**
     * Initialize the client and send the message
     */
    async send() {
        const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        return client.messages.create({
            body: this.body,
            to: this.to,
            from: process.env.TWILIO_NUMBER
        });
    }
}