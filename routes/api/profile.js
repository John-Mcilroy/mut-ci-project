const express = require('express');
const router = express.Router();

const moment = require('moment');
const getDateRange = require('./helpers/getDateRange');
const PartnerRecord = require('../../models/records-models/PartnerRecord');
const Partner = require('../../models/records-models/Partner');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
// router.get(
//   '/me', 
//   async (req, res) => {
//     try {

//       const start = moment(req.query['date-from'], 'DD-MM-YYYY').isValid() ? moment(req.query['date-from'], 'DD-MM-YYYY') : null;;
//       const end = moment(req.query['date-to'], 'DD-MM-YYYY').isValid() ? moment(req.query['date-to'], 'DD-MM-YYYY') : null;
//       const dateRange = getDateRange(start, end);
      
//       // const deleteRecord = await PartnerRecord.findOneAndDelete({ _id: '5df3e8b9b778db00175bce69' })
//       const getWorkPerformance = await PartnerRecord.find().populate('partner');

//       const voidData = [];
//       getWorkPerformance.forEach(record => {
//         if(!record.partner) {
//           voidData.push(record);
//         }
//       })


//       res.send(voidData);
//     } catch(err) {
//       console.log(err.message);

//     }
//   });

// module.exports = router;
