const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Helper functions to ensure the uploads folder exists and get unique filenames
const ensureUploadsFolderExists = (destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
};

const getUniqueFilename = (destination, originalName) => {
  let filename = originalName;
  let extension = path.extname(originalName);
  let basename = path.basename(originalName, extension);
  let counter = 1;

  while (fs.existsSync(path.join(destination, filename))) {
    filename = `${basename}-${counter}${extension}`;
    counter += 1;
  }
  return filename;
};

// Configure multer storage with automatic folder creation and unique file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    ensureUploadsFolderExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    const uniqueFilename = getUniqueFilename(uploadPath, file.originalname);
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage });

// Define routes
router.post('/', upload.array('files', 10), uploadController.handleFileUpload);
router.get('/files', uploadController.getFileList);
router.get('/count', uploadController.getFileCount);

module.exports = router;
