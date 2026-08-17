const { setCurrentImage } = require("../memory/imageMemory");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Create image object
    const image = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      url: `/uploads/images/${req.file.filename}`,
    };

    // Save current image in memory
    setCurrentImage(image);

    return res.status(200).json({
      success: true,
      image,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  uploadImage,
};