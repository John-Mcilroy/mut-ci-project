const express = require('express');
const router = express.Router();
const PartnerRecord = require('../../models/records-models/PartnerRecord');
const ShiftRecord = require('../../models/records-models/ShiftRecord');

// @route   GET api/todos
// @desc    Test Route
// @access  Public
router.get('/search', async (req, res) => {
  
  try {
    let combinedPartnerRecords = [];
    const partnerRecords = await PartnerRecord.find({ date: req.query.date }).populate('partner');
    const shiftRecords = await ShiftRecord.find({ date: req.query.date });

    
    partnerRecords.forEach(record => {
      const { name, number } = record.partner;
      const { workCategory, performance, direct, unitsPerHour, unitsTotal, date } = record;
      const found = combinedPartnerRecords.find(partner => {
        return partner.number == record.partner.number;
      })
      try {
        if(!found) {
          const newRecord = {
            name,
            number,
            records: [
              {
                workCategory,
                performance,
                direct,
                unitsPerHour,
                unitsTotal,
                date
              }
            ]
          }

          combinedPartnerRecords.push(newRecord);
        } else {
          found.records.push({
            workCategory,
            performance,
            direct,
            unitsPerHour,
            unitsTotal,
            date
          })
        }

      } catch(err) {
        console.error(record);
      }
    })
   
    const result = {
      records: combinedPartnerRecords,
      shiftRecords: shiftRecords
    }

    res.json(result);
  } catch(err) {
    console.error(err);
  }

});

module.exports = router;