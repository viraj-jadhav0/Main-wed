const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  title_en: {
    type: String,
    required: true
  },
  title_mr: {
    type: String,
    required: true
  },
  title_hi: {
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
  short_en: {
    type: String,
    required: true
  },
  short_mr: {
    type: String,
    required: true
  },
  short_hi: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  basic_price: {
    type: String,
    required: true
  },
  basic_includes_en: {
    type: String,
    required: true
  },
  basic_includes_mr: {
    type: String,
    required: true
  },
  basic_includes_hi: {
    type: String,
    required: true
  },
  standard_price: {
    type: String,
    required: true
  },
  standard_includes_en: {
    type: String,
    required: true
  },
  standard_includes_mr: {
    type: String,
    required: true
  },
  standard_includes_hi: {
    type: String,
    required: true
  },
  premium_price: {
    type: String,
    required: true
  },
  premium_includes_en: {
    type: String,
    required: true
  },
  premium_includes_mr: {
    type: String,
    required: true
  },
  premium_includes_hi: {
    type: String,
    required: true
  },
  sahitya_en: {
    type: String,
    required: true
  },
  sahitya_mr: {
    type: String,
    required: true
  },
  sahitya_hi: {
    type: String,
    required: true
  },
  muhurta: String
}, {
  timestamps: true
});

serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });

module.exports = mongoose.model('Service', serviceSchema);
