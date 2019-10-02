const express = require('express');
const router = express.Router();
const PartnerRecord = require('../../models/record-models/PartnerModel');

// @route   GET api/todos
// @desc    Test Route
// @access  Public
router.get('/search/:partner', async (req, res) => {
  const partner = await PartnerRecord.findOne({ number: req.params.partner });
  res.send(partner);
});

module.exports = router;