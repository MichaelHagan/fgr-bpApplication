const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createTestPreset = async () => {
  try {
    const presets = await cloudinary.api.upload_presets({ max_results: 500 });
    const testPreset = presets.presets.find((preset) => preset.name === 'fgrbpl_preset');

    if (!testPreset) {
      const uploadResult = await cloudinary.api.create_upload_preset({
        name: 'fgrbpl_preset',
        tags: ['fgr'],
        folder: 'fgr-bpApplication',
      });

      console.log(uploadResult);
    } else {
      console.log('fgrbpl_preset already exists.');
    }
  } catch (error) {
    console.error(error);
  }
};

// createTestPreset();

module.exports = { cloudinary };
