const express = require('express');
const router = express.Router();

const Records = require('../../models/record-models/PartnerRecord');
const auth = require('../../middleware/auth');

// @route   GET api/records
// @desc    Get all records
// @access  Private
router.get('/', async (req, res) => {
  try {
    console.log(req.body);
    const records = await Records
      .find()
      .popululate(
        'name',
        'number',
        'records',
      )
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;