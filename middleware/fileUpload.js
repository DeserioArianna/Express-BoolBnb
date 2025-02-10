const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/");
    },
    filename: (req, file, cb) => {
        const originalFilename = file.originalname;
        const uniqueName = `${Date.now()}-${originalFilename}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

module.exports = upload;