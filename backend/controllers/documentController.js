const fs = require("fs");
const pdf = require("pdf-parse");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const buffer = fs.readFileSync(req.file.path);

    const data = await pdf(buffer);

    res.json({
      success: true,

      fileName: req.file.originalname,

      pages: data.numpages,

      text: data.text,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to read PDF",
    });

  }
};

module.exports = {
  uploadDocument,
};