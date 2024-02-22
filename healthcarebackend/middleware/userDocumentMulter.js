const userDocumentMulter = require('multer')
const storage = userDocumentMulter.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'useruploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Filename for uploaded files
    }
});

const upload = userDocumentMulter({ storage: userDocumentMulter.memoryStorage() });

module.exports = {upload}