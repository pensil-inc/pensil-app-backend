const AppConfig = {
    app_url: process.env.APP_URL ? process.env.APP_URL : 'http://localhost:3000',
    version: 2.0,
    password_verify_link: 'change-password/'
};

module.exports = AppConfig;