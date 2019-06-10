const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');

// Import Middleware
const auth = require('../../middleware/auth');
const fileUpload = require('express-fileupload');

// Import Models
const Records = require('../../models/record-models/PartnerRecord');
const ChillPick = require('../../models/record-models/ChillPick');
const ChillReceiving = require('../../models/record-models/ChillReceiving');
const FRVPick = require('../../models/record-models/FRVPick');
const FRVReceiving = require('../../models/record-models/FRVReceiving');
const AmbientPick = require('../../models/record-models/AmbientPick');

// @route   GET api/records
// @desc    Get all records
// @access  Private
router.get('/', fileUpload, async (req, res) => {
  try {
    console.log(req.body);
    const records = await Records
      .find()
      .popululate(
        'name',
        'number',
        'records',
      )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/records
// @desc    Uploads an XLS Document, and extracts data as a JSON Object
// @access  Private
router.post('/', auth, async (req, res) => {
  if (req.files === null) {
    res
      .status(400)
      .json({ msg: 'No file uploaded.' });
  }

  const file = req.files.file;
  let records = {};

  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if(err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }

    // Excel fields to ignore
    const bannedWords = [
      'AMBIENT PICKING', 
      'CHLLLED', 
      'RECEIVING', 
      'FRVH PICKING',
      'User ID',
      ' ',
      'CHILLED PICKING',
      undefined,
      null
    ];

    // *** Convert XLS input into JSON Data *** //

    // Create workbook
    const workbook = xlsx.readFile(`./uploads/${file.name}`);

    // Grab worksheet
    const worksheet = workbook.Sheets['Sheet1'];

    // Parse into JSON
    const sheetData = xlsx.utils.sheet_to_json(worksheet);

    records.date = new Date.now();

    sheetData.forEach(record => {
      if (record.__EMPTY_1) {
        if (!bannedWords.includes(record.__EMPTY_1)) {
          records[record.__EMPTY_1] = {
            pickrate: record.__EMPTY_2
          }
        }
      }
    });

    records.save();
    res.json(records);
  });
});

module.exports = router;