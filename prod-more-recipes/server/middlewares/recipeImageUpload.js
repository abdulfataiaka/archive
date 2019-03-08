import cloudinary from '../cloudinary';

// expects req.file to exist
export default (req, res, next) => {
  const { uploadImage } = req.body;
  // checks if to upload new image
  if (uploadImage) {
    const { buffer } = req.file;
    if (!buffer) {
      req.upload = { status: false, error: 'Invalid buffer file' };
      next();
    } else {
      // Upload image to cloudinary to get the url
      cloudinary.uploader.upload_stream(({ error, url }) => {
        if (error) {
          req.upload = { status: false, error };
        } else {
          req.upload = { status: true, url };
        }
        next();
      }).end(buffer);
    }
  } else {
    req.upload = null;
    next();
  }
};

