const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '../uploads');

// Handle file uploads
exports.handleFileUpload = (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  const fileDetails = req.files.map(file => ({
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
  }));

  res.status(200).json({
    message: 'Files uploaded successfully!',
    files: fileDetails,
  });
};

// Get list of all files
exports.getFileList = (req, res) => {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to read directory.', error: err });
    }

    const fileList = files.map(file => ({
      filename: file,
      path: path.join(UPLOADS_DIR, file),
    }));

    res.status(200).json({ files: fileList });
  });
};

// Get count of all files
exports.getFileCount = (req, res) => {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to read directory.', error: err });
    }

    const fileCount = files.length;
    res.status(200).json({ count: fileCount });
  });
};
