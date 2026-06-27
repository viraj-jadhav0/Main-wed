const mongoose = require('mongoose');

const decorationSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  name_mr: {
    type: String,
    required: true
  },
  name_hi: {
    type: String,
    required: true
  },
  description_en: {
    type: String,
    required: true
  },
  description_mr: {
    type: String,
    required: true
  },
  description_hi: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  photos: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

decorationSchema.index({ service_id: 1 });

module.exports = mongoose.model('Decoration', decorationSchema);
