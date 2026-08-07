let currentImage = null;

const setCurrentImage = (image) => {
  currentImage = image;
};

const getCurrentImage = () => {
  return currentImage;
};

const clearCurrentImage = () => {
  currentImage = null;
};

module.exports = {
  setCurrentImage,
  getCurrentImage,
  clearCurrentImage,
};