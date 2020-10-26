// const multer = require('multer');

// const path = require('path');

// const uploadDir = {
//     image: 'public/uploads/images',
//     file: 'public/uploads/files'
// };

// const filterCallBack = {
//     image: function(req, file, cb) {
//         if(file.mimetype.indexOf('image/') == -1) {
//             return cb(new Error('Please upload an Image'), false);
//         }
//         return cb(null, true);
//     },
//     file: function(req, file, cb) {
//         return cb(null, true);
//     }
// }

// const uploadLimits = {
//     image: {
//         fileSize: 1024 * 1024 * 1 // 1 mb
//     },
//     file: {
//         fileSize: 1024 * 1024 * 1 // 1 mb
//     }
// }

// function storageConfig(storage) {
//     return multer.diskStorage({
//         destination: (req, file, cb) => {
//           cb(null, storage);
//         },
//         filename: (req, file, cb) => {
//             const fileName = file.originalname.substr(0, file.originalname.lastIndexOf('.'));
//             const fileExtension = path.extname(file.originalname);
//             cb(null, fileName + "_" + Date.now() + fileExtension);
//         }
//       })
// }

// function onError(err, next) {
//     console.error('Upload Error', err);
//     next(err);
// }

//   const storage = {
//     image: multer({
//         storage: storageConfig(uploadDir.image),
//         fileFilter: filterCallBack.image,
//         onError, onError,
//         limits : uploadLimits.image
//     }),
//     file: multer({
//         storage: storageConfig(uploadDir.file),
//         onError, onError,
//         fileFilter: filterCallBack.file
//     }),
//   }
  
//   module.exports = storage;

const path = require('path');
const AppConfig = require('./app');

const storagePath = path.join(process.cwd(), "public");
const materialPath = path.join(storagePath, 'materials')
const videoPath = path.join(storagePath, 'videos')
module.exports = {
    storageDir: 'public',
    storagePath,
    materialPath,
    videoPath,
    getRelativePath: (...paths) => path.join(...paths),
    getFilePath: (...paths) => path.join(storagePath, ...paths),
    getMaterialPath: (...paths) => path.join(storagePath, "materials", ...paths),
    getVideoPath: (...paths) => path.join(storagePath, "videos", ...paths),
    getFileLink: name => AppConfig.app_url + name,
    getMaterialLink: name => AppConfig.app_url + "/materials/" + name,
    getVideoLink: name => AppConfig.app_url + "/video/" + name,
}