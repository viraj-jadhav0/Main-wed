const express = require('express');
const router = express.Router();
const HeroImage = require('../models/HeroImage');

// Get hero images
router.get('/', async (req, res) => {
  try {
    const heroImage = await HeroImage.findOne().sort({ createdAt: -1 });
    res.json({ heroImage });
  } catch (error) {
    console.error('Error fetching hero images:', error);
    res.status(500).json({ error: 'Failed to fetch hero images' });
  }
});

// Create or update hero images
router.post('/', async (req, res) => {
  try {
    const { desktop_image, mobile_image } = req.body;

    let heroImage = await HeroImage.findOne().sort({ createdAt: -1 });

    if (heroImage) {
      heroImage.desktop_image = desktop_image;
      heroImage.mobile_image = mobile_image;
      await heroImage.save();
    } else {
      heroImage = new HeroImage({ desktop_image, mobile_image });
      await heroImage.save();
    }

    res.json({ heroImage });
  } catch (error) {
    console.error('Error saving hero images:', error);
    res.status(500).json({ error: 'Failed to save hero images' });
  }
});

module.exports = router;
