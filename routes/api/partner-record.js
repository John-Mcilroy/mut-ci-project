const express = require('express');
const router = express.Router();

// Partner Record Model
const PartnerRecord = require('../../models/record-models/PartnerRecord');

// @route   GET api/partner-record
// @desc    Get all Partner Records
// @access  Private (Currently Public)
router.get('/', () => {
  PartnerRecord.find()
    .sort({ number: -1 })
    .then(records => res.json(records));
});

module.exports = router;