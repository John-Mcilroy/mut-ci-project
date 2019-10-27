const express = require('express');
const router = express.Router();

// @route   GET api/todos
// @desc    Test Route
// @access  Public
router.get('/search/:partner', async (req, res) => {
  res.send(partner);
});

module.exports = router;