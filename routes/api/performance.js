const express = require('express');
const router = express.Router();
const Performance = require('../../models/records-models/Performance');

// @route   GET api/todos
// @desc    Test Route
// @access  Public
router.get('/search', async (req, res) => {
  
  try {
    let result = [];
    let records = await Performance.find({ date: req.query.date }).populate('partner');
    
    records.forEach(record => {
      const { name, number } = record.partner;
      const { workCategory, performance, direct, unitsPerHour, unitsTotal } = record;
      const found = result.find(partner => {
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
                unitsTotal
              }
            ]
          }

          result.push(newRecord);
        } else {
          found.records.push({
            workCategory,
            performance,
            direct,
            unitsPerHour,
            unitsTotal
          })
        }

      } catch(err) {
        console.error(record);
      }
    })
   
    res.json(result);
  } catch(err) {
    console.error(err);
  }

});

module.exports = router;