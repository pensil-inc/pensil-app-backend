# Pensil Teaching App Backend


[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fpensil-inc%2Fpensil-app-backend&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

Pensil Teach App is an education platform created specifically for the tutors of the digital age. Pensil Teaching app reduce gap between tutor and students and form a bridge no matter how far they are.

The backend leverages the following - 
 - NodeJS as platform 
 - [V8-Engine](https://github.com/thefallenmerc/v8-engine) for framework
 - MongoDB as database 
 - AWS S3 for storage
 - Firebase for Push Notifications and Google Authentication
 - TWILIO for SMS notification

The frontend is available at [Pensil App](https://github.com/pensil-inc/flutter_pensil_app) and is based on Flutter.

## App Screenshots

<details>
  <summary>Click to expand!</summary>

Login                |  Verify OTP                | Home                |  Batch Detail 
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-1.jpg?raw=true) | ![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-2.jpg?raw=true)|![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-3.jpg?raw=true)|![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-4.jpg?raw=true)


Assignment List               |  Videos List              | Docs List             |  Create Batch
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-5.jpg?raw=true) | ![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-6.jpg?raw=true)|![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-7.jpg?raw=true)|![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-8.jpg?raw=true)

Create Batch                |  Select Students               | Select Students               |  Upload Material
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-9.jpg?raw=true) | ![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-10.jpg?raw=true)|![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-11.jpg?raw=true)|![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-12.jpg?raw=true)

Upload Study Material                |  Upload Video               | Upload Assignment
:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-13.jpg?raw=true) | ![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-14.jpg?raw=true)|![](https://github.com/pensil-inc/flutter_pensil_app/blob/master/screenshots/screenshot-15.jpg?raw=true)

</details>
  
## Project Setup
  
#### 1. [NodeJS Setup](https://nodejs.org/en/docs/guides/getting-started-guide/)

#### 2. Clone the repo

``` sh
$ git clone https://github.com/pensil-inc/pensil-app-backend.git
$ cd pensil-app-backend/
```

#### 3. Setup the firebase app (Used for Google authentication and push notifications)
  
Refer to [Pensil App Readme](https://github.com/pensil-inc/flutter_pensil_app)
  
#### 4. Setting Up Twilio
  
Refer to [Twilio - Getting Started with NodeJS](https://www.twilio.com/docs/sms/quickstart/node)

#### 5. Setting Up S3 Bucket

Refer to [Getting Started NodeJS](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html)

#### 6. Setting Up MongoDB

You can either use [Atlas](https://www.mongodb.com/cloud/atlas) or install [MongoDB Server](https://docs.mongodb.com/manual/installation/) and the [Connect MongoDB with NodeJS](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database)

#### 7. Setting Up Env Variables

Insert the values for different variables according to your use case

```env
PORT=3000
APP_ENV="development"
APP_NAME="V8 Engine"
HASH_ROUNDS=10
APP_KEY=c7ce758bf3ec48d18361de950bfa22ac8c0d38d519aad3d444f33b7bb4b9e727

APP_URL="http://localhost:3000"

SSL_KEY=/etc/letsencrypt/live/api.pensil.in/privkey.pem
SSL_CERT=/etc/letsencrypt/live/api.pensil.in/fullchain.pem

MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USERNAME=
MAIL_USER=
MAIL_PASS=

VAPID_PUBLICKEY=
VAPID_PRIVATEKEY=

TWILIO_SID=
TWILIO_AUTH_TOKEN= 
TWILIO_NUMBER=

FIREBASE_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_KEY=
```

## Project Structure

<details>
 <summary> Click to expand </summary>
  
```
├── README.md
├── bin
│   └── www
├── commands
│   └── sys
│       ├── help-command.js
│       ├── lib
│       │   └── replicator.js
│       ├── list-command.js
│       ├── make-command-command.js
│       ├── make-controller-command.js
│       ├── make-middleware-command.js
│       ├── make-model-command.js
│       ├── make-resource-command.js
│       ├── make-validator-command.js
│       └── templates
│           ├── command.jstemplate
│           ├── controller.jstemplate
│           ├── middleware.jstemplate
│           ├── model.jstemplate
│           ├── resource.jstemplate
│           └── validator.jstemplate
├── config
│   ├── app.js
│   ├── commander.js
│   ├── cron.js
│   ├── database.js
│   ├── errorhandler.js
│   ├── firebase.js
│   ├── global.js
│   ├── helper.js
│   ├── mail.js
│   ├── routes.js
│   ├── s3.js
│   ├── storage.js
│   └── twilio.js
├── controllers
│   ├── announcement-controller.js
│   ├── assignment-controller.js
│   ├── auth
│   │   ├── forgot-password-controller.js
│   │   └── google-auth-controller.js
│   ├── authentication-controller.js
│   ├── batch-controller.js
│   ├── material-controller.js
│   ├── poll-controller.js
│   ├── student
│   │   ├── student-announcement-controller.js
│   │   ├── student-assignment-controller.js
│   │   ├── student-batch-controller.js
│   │   ├── student-notification-controller.js
│   │   ├── student-poll-controller.js
│   │   ├── student-timeline.js
│   │   └── teacher-timeline.js
│   ├── student-controller.js
│   ├── subject-controller.js
│   └── video-controller.js
├── crons
│   └── sample_cron.js
├── data
│   └── country.json
├── deploy-steps.txt
├── deploy.bat
├── deploy.log
├── helpers
│   ├── main_helper.js
│   └── response_helper.js
├── index.js
├── mails
│   ├── mail.js
│   ├── notifications
│   │   ├── announcement-mail.js
│   │   └── poll-mail.js
│   ├── otp-mail.js
│   └── sample_mail.js
├── middlewares
│   └── auth-middleware.js
├── models
│   ├── announcement.js
│   ├── assignment.js
│   ├── batch.js
│   ├── material.js
│   ├── notification.js
│   ├── poll.js
│   ├── subject.js
│   ├── user.js
│   └── video.js
├── notifications
│   ├── announcement-notification.js
│   ├── notification.js
│   └── poll-notification.js
├── package-lock.json
├── package.json
├── pensil-teaching-app-firebase-adminsdk.json
├── public
├── resources
│   ├── announcement-resource.js
│   ├── assignment-list-resource.js
│   ├── assignment-resource.js
│   ├── batch-detail-resource.js
│   ├── batch-with-student-resource.js
│   ├── material-resource.js
│   ├── notification-resource.js
│   ├── poll-answer-resource.js
│   ├── poll-resource.js
│   ├── resource.js
│   ├── student-list-resource.js
│   ├── student-resource.js
│   ├── subject-resource.js
│   ├── user-login-resource.js
│   ├── user-resource.js
│   └── video-resource.js
├── routes
│   ├── api.js
│   └── web.js
├── seeders
│   ├── sample_seeder.js
│   └── seeder.js
├── spark.js
├── test
│   ├── authentication-test.js
│   ├── teacher-batch-test.js
│   └── test-helper.js
├── tree.txt
└── validators
    ├── auth
    │   ├── login-validator.js
    │   ├── password-reset-validator.js
    │   ├── profile-update-validator.js
    │   ├── register-validator.js
    │   └── verify-otp-validator.js
    ├── batch
    │   └── create-batch-validator.js
    ├── create-announcement-validator.js
    ├── create-material-validator.js
    ├── create-video-validator.js
    ├── poll
    │   └── create-poll-validator.js
    ├── poll-vote-validator.js
    ├── update-material-validator.js
    ├── update-video-validator.js
    └── validator.js

29 directories, 138 files
```

  
</details>

## Dependencies
<details>
     <summary> Click to expand </summary>
 
``` sh
v8-engine@1.0.0 /mnt/d/Workspace/Pensil/pensil-backend
├── aws-sdk@2.783.0
├── bcrypt@5.0.0
├── chai@4.2.0
├── chai-http@4.3.0
├── chalk@4.1.0
├── cli-table3@0.6.0
├── cors@2.8.5
├── csv-parser@2.3.3
├── debug@4.1.1
├── dotenv@8.2.0
├── enquirer@2.3.6
├── express@4.17.1
├── express-fileupload@1.2.0
├── firebase-admin@9.2.0
├── jsonwebtoken@8.5.1
├── md5@2.3.0
├── mocha@8.1.3
├── moment@2.29.0
├── mongodb@3.6.0
├── mongoose@5.10.0
├── morgan@1.10.0
├── node-cron@2.0.3
├── nodemailer@6.4.11
├── nodemon@2.0.6
├── twilio@3.49.4
├── uuid@8.3.1
├── validatorjs@3.19.0
└── web-push@3.4.4
```
     
</details>

## App
This server uses Flutter based app for frontend.
The [flutter_pensil_app](https://github.com/pensil-inc/flutter_pensil_app) repo contains the client side code. 

## Contributing

If you wish to contribute a change to any of the existing feature or add new in this repo, send a pull request. We welcome and encourage all pull requests. It usually will take us within 24-48 hours to respond to any issue or request.



## License
```
Copyright (c) 2021 Pensil Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
