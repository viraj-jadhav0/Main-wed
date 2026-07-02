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
    type: String
  },
  description_mr: {
    type: String
  },
  description_hi: {
    type: String
  },
  short_en: {
    type: String
  },
  short_mr: {
    type: String
  },
  short_hi: {
    type: String
  },
  images: [{
    type: String
  }],
  duration: {
    type: String
  },
  basic_price: {
    type: String
  },
  basic_includes_en: {
    type: String
  },
  basic_includes_mr: {
    type: String
  },
  basic_includes_hi: {
    type: String
  },
  standard_price: {
    type: String
  },
  standard_includes_en: {
    type: String
  },
  standard_includes_mr: {
    type: String
  },
  standard_includes_hi: {
    type: String
  },
  premium_price: {
    type: String
  },
  premium_includes_en: {
    type: String
  },
  premium_includes_mr: {
    type: String
  },
  premium_includes_hi: {
    type: String
  },
  sahitya: [{
    en: {
      type: String
    },
    mr: {
      type: String
    },
    hi: {
      type: String
    }
  }],
  muhurta: String
}, {
  timestamps: true
});

serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });

module.exports = mongoose.model('Service', serviceSchema);
