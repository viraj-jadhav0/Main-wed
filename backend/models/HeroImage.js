const mongoose = require('mongoose');

const heroImageSchema = new mongoose.Schema({
  desktop_image: {
    type: String,
    required: true
  },
  mobile_image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HeroImage', heroImageSchema);
