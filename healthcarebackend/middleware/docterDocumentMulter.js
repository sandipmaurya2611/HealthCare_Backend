const docterDocumentMulter = require('multer')
const storage = docterDocumentMulter.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'docteruploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Filename for uploaded files
    }
});

const docterupload = docterDocumentMulter({ storage: docterDocumentMulter.memoryStorage() });

module.exports = {docterupload}