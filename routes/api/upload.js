const express = require('express');
const router = express.Router();

// @route   GET api/upload
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Upload Route'));

router.post('/', (req, res) => {
  if( req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if( err ) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  });

  res.json('Upload Success');
})

module.exports = router;