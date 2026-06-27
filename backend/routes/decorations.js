const express = require('express');
const router = express.Router();
const Decoration = require('../models/Decoration');

// Get all decorations
router.get('/', async (req, res) => {
  try {
    const decorations = await Decoration.find().sort({ service_id: 1, name_en: 1 });
    res.json({ decorations });
  } catch (error) {
    console.error('Error fetching decorations:', error);
    res.status(500).json({ error: 'Failed to fetch decorations' });
  }
});

// Get decoration by ID
router.get('/:id', async (req, res) => {
  try {
    const decoration = await Decoration.findById(req.params.id);
    if (!decoration) {
      return res.status(404).json({ error: 'Decoration not found' });
    }
    res.json({ decoration });
  } catch (error) {
    console.error('Error fetching decoration:', error);
    res.status(500).json({ error: 'Failed to fetch decoration' });
  }
});

// Get decorations by service ID
router.get('/service/:serviceId', async (req, res) => {
  try {
    const decorations = await Decoration.find({ service_id: req.params.serviceId }).sort({ name_en: 1 });
    res.json({ decorations });
  } catch (error) {
    console.error('Error fetching decorations by service:', error);
    res.status(500).json({ error: 'Failed to fetch decorations by service' });
  }
});

// Create new decoration
router.post('/', async (req, res) => {
  try {
    const decoration = new Decoration(req.body);
    await decoration.save();
    res.status(201).json({ decoration });
  } catch (error) {
    console.error('Error creating decoration:', error);
    res.status(500).json({ error: 'Failed to create decoration' });
  }
});

// Update decoration
router.put('/:id', async (req, res) => {
  try {
    const decoration = await Decoration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!decoration) {
      return res.status(404).json({ error: 'Decoration not found' });
    }
    res.json({ decoration });
  } catch (error) {
    console.error('Error updating decoration:', error);
    res.status(500).json({ error: 'Failed to update decoration' });
  }
});

// Delete decoration
router.delete('/:id', async (req, res) => {
  try {
    const decoration = await Decoration.findByIdAndDelete(req.params.id);
    if (!decoration) {
      return res.status(404).json({ error: 'Decoration not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting decoration:', error);
    res.status(500).json({ error: 'Failed to delete decoration' });
  }
});

module.exports = router;
