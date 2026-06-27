const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  alternate_phone: String,
  service_type: {
    type: String,
    required: true
  },
  service_slug: {
    type: String,
    required: true
  },
  service_name: {
    type: String,
    required: true
  },
  package_type: {
    type: String,
    required: true
  },
  package_price: {
    type: String,
    required: true
  },
  decorations: String,
  deco_prices: String,
  muhurta: String,
  preferred_date: {
    type: String,
    required: true
  },
  preferred_time: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  notes: String,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'completed', 'cancelled']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ status: 1 });
bookingSchema.index({ preferred_date: 1 });
bookingSchema.index({ service_slug: 1 });
bookingSchema.index({ user_id: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
