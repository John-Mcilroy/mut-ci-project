const express = require('express');
const router = express.Router();

// @route   GET api/notes
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Notes Route'));

module.exports = router;