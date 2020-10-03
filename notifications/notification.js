module.exports = class Notification {

  constructor(user, title = "New notification", body = "") {
    this.user = user;
    this.title = title;
    this.body = body;
  }

  async send() {
    if (Array.isArray(this.user)) {
      for (const user of this.user) {
        await this.trigger(user);
      }
    } else {
      await this.trigger(this.user);
    }
  }

  async trigger(user) {
    // TODO: add push notification here
    // send mail
    // await this.sendMail(user);
    // await this.sendPush(user);
    // await this.sendSMS(user);
  }

  async sendMail(user) {
    // Build mail and send it
  }

  async sendPush(user) {
    // Build push and send it
  }

  async sendSMS(user) {
    // Build sms and send it
  }
}