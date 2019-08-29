const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const performanceRecords = require('../../xls_parsing/performanceRecords');
const PartnerRecord = require('../../models/record-models/PartnerRecord');

// @route   GET api/upload
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Upload Route'));

router.post('/', async (req, res) => {
  if( req.files === null) {
    return res
      .status(400)
      .json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  // Get data and parse
  const upload = await file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if( err ) {
      return res.status(500).send('Server Error');
    }
    const path = require('path').resolve(__dirname, `./uploads/${file.name}`);
  
    const result = performanceRecords(path);

    res.json(result);
    // Save data


    try {
      const partnerRecord = async (data) => {
        await PartnerRecord
        .find()
        .populate(
          'name',
          'number',
          'records'
        )
      }
      partnerRecord(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Couldn\'t Save Data');
    }
  });
});

module.exports = router;
