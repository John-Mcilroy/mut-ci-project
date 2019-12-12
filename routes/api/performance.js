const express = require('express');

const router = express.Router();
const PartnerRecord = require('../../models/records-models/PartnerRecord');
const ShiftRecord = require('../../models/records-models/ShiftRecord');
const Partner = require('../../models/records-models/Partner'); 
const moment = require('moment');
const getDateRange = require('./helpers/getDateRange');
const auth = require('../../middleware/auth');


// @route   GET api/performance/search?date-from=:dateFrom&&date-to=:dateTo&&partner=:partner&&work-category=:workCategory
// @desc    Get overall records from and to a specified date
// @access  Private

router.get('/search', auth,  async (req, res) => {
  
  try {
    // Set Start and End dates, check if is a valid date input and return 'null' if not valid

    const queryStartDate =  moment(req.query['date-from'], 'DD-MM-YYYY').isValid() ? moment(req.query['date-from'], 'DD-MM-YYYY') : null;
    const queryEndDate = moment(req.query['date-to'], 'DD-MM-YYYY').isValid() ? moment(req.query['date-to'], 'DD-MM-YYYY') : null;
    const queryPartner = req.query['partner'] ? await Partner.findOne({number: req.query['partner'] }) : null;

    // Check that Start and End dates are valid inputs
    if(!queryStartDate || !queryEndDate) {
      // If invalid, send error
      res
        .status(400)
        .send('Invalid Date Entry')

      // Check if entered dates are the same
    } else if(queryStartDate.isSame(queryEndDate)) {
      // If dates are the same, return values as if single date was entered

      const date = queryStartDate.format('DD/MM/YYYY');

      if(queryPartner) {
        const partnerRecords = await PartnerRecord.find({ partner: queryPartner.id, date }).populate('partner');
        const result = partnerRecords.reduce((record, current) => {
          if(!record.name || !record.number) {
            record.name = current.name;
            record.number = current.number;
          }
          switch(current.workCategory) {
            case 'chillPick':
              record.records.push({
                performance: current.performance,
                workCategory: current.workCategory,
                direct: current.direct,
                unitsTotal: current.unitsTotal,
                unitsPerHour: current.unitsPerHour
              })
              break;
            case 'frvPick':
              record.records.push({
                performance: current.performance,
                workCategory: current.workCategory,
                direct: current.direct,
                unitsTotal: current.unitsTotal,
                unitsPerHour: current.unitsPerHour
              })
              break;
            case 'ambientPick':
              record.records.push({
                performance: current.performance,
                workCategory: current.workCategory,
                direct: current.direct,
                unitsTotal: current.unitsTotal,
                unitsPerHour: current.unitsPerHour
              })
              break;
            case 'chillReceiving':
              record.records.push({
                performance: current.performance,
                workCategory: current.workCategory,
                direct: current.direct,
                unitsTotal: current.unitsTotal,
                unitsPerHour: current.unitsPerHour
              })
              break;
            case 'ambientReplenishment':
              record.records.push({
                performance: current.performance,
                workCategory: current.workCategory,
                direct: current.direct,
                unitsTotal: current.unitsTotal,
                unitsPerHour: current.unitsPerHour
              })
              break;
            case 'loading':
              record.records.push({
                performance: current.performance,
                workCategory: current.workCategory,
                direct: current.direct,
                unitsTotal: current.unitsTotal,
                unitsPerHour: current.unitsPerHour
              })
              break;
            default:
              break;
          }  
          return record;
        }, {
          name: queryPartner.name,
          number: queryPartner.number, 
          records: []
        });

        console.log(result);

        res.send(result);

      } else {
        // ------------------------------

        let combinedPartnerRecords = [];
        const partnerRecords = await PartnerRecord.find({ date }).populate('partner');
        const shiftRecords = await ShiftRecord.find({ date });
        
        partnerRecords.forEach(record => {
        const { name, number } = record.partner;
        const { workCategory, performance, direct, unitsPerHour, unitsTotal, date } = record;
        const found = combinedPartnerRecords.find(partner => {
          return partner.number == record.partner.number;
        });
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

      // Sort partnerResults alphabetically by first name
      combinedPartnerRecords.sort((first, second) => first.name.localeCompare(second.name));
    
      const result = [
        shiftRecords,
        combinedPartnerRecords
      ];

      res.json(result);
    }
      // Check if Start date is later than the End date
    } else if(queryStartDate.isAfter(queryEndDate)) {
      // If Start Date is Later than End date, send error
      res
        .status(400)
        .send('Start Date must be before End Date.');

    } else {
      // Get the range of dates with getDateRange helper function
      const dateRange = getDateRange(queryStartDate, queryEndDate);

      let totalPartnerRecords = [];
      let totalShiftRecords = [];
      for(i = 0; dateRange.length > i; i++) {

        // Get Shift Data
        const shiftData = await ShiftRecord.find({ date: dateRange[i] });
        if(typeof shiftData === Object) {
          totalShiftRecords.push(shiftData);
        } else {
          shiftData.forEach(shift => {
            totalShiftRecords.push(shift);
          })
        }

        // Get Partner Data
        let data;
        if(queryPartner) {
          data = await PartnerRecord.find({ partner: queryPartner._id, date: dateRange[i] }).populate('partner');
        } else {
          data = await PartnerRecord.find({ date: dateRange[i] }).populate('partner');
        }

        data.forEach(record => {
          const { name, number } = record.partner;
          const { workCategory, performance, direct, unitsPerHour, unitsTotal, date } = record;
          const currentRecord = totalPartnerRecords.find(partnerResults => number == partnerResults.number);

          if(currentRecord) {
            // Check if current record has this work category
            if(Object.keys(currentRecord).includes(workCategory)) {
              // Create a new record and push to current work category record
              const newRecord = {
                performance,
                direct,
                unitsPerHour,
                unitsTotal,
                date
              }

              currentRecord[workCategory].push(newRecord);
            } else {
              // Create a new work category in the current partner record
              currentRecord[workCategory] = [
                {
                  performance,
                  direct,
                  unitsPerHour,
                  unitsTotal,
                  date
                }
              ]
            }
          } else {
            // Create New Record
            const newRecord = {
              name,
              number,
              records: [],
              [workCategory]: [
                {
                  performance,
                  direct,
                  unitsPerHour,
                  unitsTotal,
                  date
                }
              ],
            }
  
            totalPartnerRecords.push(newRecord);
          }
        })
      }
      // Get overall average performance records
      const partnerResults = [];
      totalPartnerRecords.forEach(record => {

        // Get overall for Chill Pick
        if(record.chillPick) {
          let overallRecord = {};
          let chillPickPerformance = 0;
          let chillPickDirect = 0;
          let chillPickUnitsPerHour = 0;
          let chillPickUnitsTotal = 0;

          record.chillPick.forEach(chillPickRecord => {
            chillPickPerformance += chillPickRecord.performance;
            chillPickDirect += chillPickRecord.direct;
            chillPickUnitsPerHour += chillPickRecord.unitsPerHour;
            chillPickUnitsTotal += chillPickRecord.unitsTotal;
          });

          overallRecord = {
            workCategory: 'chillPick',
            performance: Math.round(chillPickPerformance / record.chillPick.length),
            direct: chillPickDirect.toFixed(2),
            unitsPerHour: Math.round(chillPickUnitsPerHour / record.chillPick.length),
            unitsTotal: chillPickUnitsTotal
          }
          
          record.records.push(overallRecord);
          delete record.chillPick;
        }
        // Get overall for FRV Pick
        if(record.frvPick) {
          let overallRecord = {};
          let frvPickPerformance = 0;
          let frvPickDirect = 0;
          let frvPickUnitsPerHour = 0;
          let frvPickUnitsTotal = 0;

          record.frvPick.forEach(frvPickRecord => {
            frvPickPerformance += frvPickRecord.performance;
            frvPickDirect += frvPickRecord.direct;
            frvPickUnitsPerHour += frvPickRecord.unitsPerHour;
            frvPickUnitsTotal += frvPickRecord.unitsTotal;
          });

          overallRecord = {
            workCategory: 'frvPick',
            performance: Math.round(frvPickPerformance / record.frvPick.length),
            direct: frvPickDirect.toFixed(2),
            unitsPerHour: Math.round(frvPickUnitsPerHour / record.frvPick.length),
            unitsTotal: frvPickUnitsTotal
          }

          record.records.push(overallRecord);
          delete record.frvPick;
        }

        // Get overall for Ambient Pick
        if(record.ambientPick) {
          let overallRecord = {};
          let ambientPickPerformance = 0;
          let ambientPickDirect = 0;
          let ambientPickUnitsPerHour = 0;
          let ambientPickUnitsTotal = 0;

          record.ambientPick.forEach(ambientPickRecord => {
            ambientPickPerformance += ambientPickRecord.performance;
            ambientPickDirect += ambientPickRecord.direct;
            ambientPickUnitsPerHour += ambientPickRecord.unitsPerHour;
            ambientPickUnitsTotal += ambientPickRecord.unitsTotal;
          });

          overallRecord = {
            workCategory: 'ambientPick',
            performance: Math.round(ambientPickPerformance / record.ambientPick.length),
            direct: ambientPickDirect.toFixed(2),
            unitsPerHour: Math.round(ambientPickUnitsPerHour / record.ambientPick.length),
            unitsTotal: ambientPickUnitsTotal
          }

          record.records.push(overallRecord);
          delete record.ambientPick;
        }
        
        // Get overall for Chill Receiving
        if(record.chillReceiving) {
          let overallRecord = {};
          let chillReceivingPerformance = 0;
          let chillReceivingDirect = 0;
          let chillReceivingUnitsPerHour = 0;
          let chillReceivingUnitsTotal = 0;


          record.chillReceiving.forEach(chillReceivingRecord => {
            chillReceivingPerformance += chillReceivingRecord.performance;
            chillReceivingDirect += chillReceivingRecord.direct;
            chillReceivingUnitsPerHour += chillReceivingRecord.unitsPerHour;
            chillReceivingUnitsTotal += chillReceivingRecord.unitsTotal;
          });

          
          overallRecord = {
            workCategory: 'chillReceiving',
            performance: Math.round(chillReceivingPerformance / record.chillReceiving.length),
            direct: chillReceivingDirect.toFixed(2),
            unitsPerHour: Math.round(chillReceivingUnitsPerHour / record.chillReceiving.length),
            unitsTotal: chillReceivingUnitsTotal
          }

          record.records.push(overallRecord);
          delete record.chillReceiving;
        }

        // Get overall for Ambient Replenishment
        if(record.ambientReplenishment) {
          let overallRecord = {};
          let ambientReplenishmentPerformance = 0;
          let ambientReplenishmentDirect = 0;
          let ambientReplenishmentUnitsPerHour = 0;
          let ambientReplenishmentUnitsTotal = 0;


          record.ambientReplenishment.forEach(ambientReplenishmentRecord => {
            ambientReplenishmentPerformance += ambientReplenishmentRecord.performance;
            ambientReplenishmentDirect += ambientReplenishmentRecord.direct;
            ambientReplenishmentUnitsPerHour += ambientReplenishmentRecord.unitsPerHour;
            ambientReplenishmentUnitsTotal += ambientReplenishmentRecord.unitsTotal;
          });

          
          overallRecord = {
            workCategory: 'ambientReplenishment',
            performance: Math.round(ambientReplenishmentPerformance / record.ambientReplenishment.length),
            direct: ambientReplenishmentDirect.toFixed(2),
            unitsPerHour: Math.round(ambientReplenishmentUnitsPerHour / record.ambientReplenishment.length),
            unitsTotal: ambientReplenishmentUnitsTotal
          }

          record.records.push(overallRecord);
          delete record.ambientReplenishment;
        }

        // Get overall for Loading
        if(record.loading) {
          let overallRecord = {};
          let loadingPerformance = 0;
          let loadingDirect = 0;
          let loadingUnitsPerHour = 0;
          let loadingUnitsTotal = 0;


          record.loading.forEach(loadingRecord => {
            loadingPerformance += loadingRecord.performance;
            loadingDirect += loadingRecord.direct;
            loadingUnitsPerHour += loadingRecord.unitsPerHour;
            loadingUnitsTotal += loadingRecord.unitsTotal;
          });

          
          overallRecord = {
            workCategory: 'loading',
            performance: Math.round(loadingPerformance / record.loading.length),
            direct: loadingDirect.toFixed(2),
            unitsPerHour: Math.round(loadingUnitsPerHour / record.loading.length),
            unitsTotal: loadingUnitsTotal
          }

          record.records.push(overallRecord);
          delete record.loading;
        }

        partnerResults.push(record);
      });

      let shiftResults = {
        chillPick: [],
        frvPick: [],
        ambientPick: [],
        chillReceiving: [],
        ambientReplenishment: [],
        loading: []
      };

      totalShiftRecords.forEach(record => {
        switch(record.workCategory) {
          case 'chillPick': 
            shiftResults.chillPick.push(record);
            break;
          case 'frvPick':
            shiftResults.frvPick.push(record);
            break;
          case 'ambientPick':
            shiftResults.ambientPick.push(record);
            break;
          case 'chillReceiving':
            shiftResults.chillReceiving.push(record);
            break;
          case 'ambientReplenishment':
            shiftResults.ambientReplenishment.push(record);
            break;
          case 'loading':
            shiftResults.loading.push(record);
            break;
          default:
            return;
        }
      })

      let shiftCategories = Object.keys(shiftResults);
      let shiftTotals = shiftCategories.map(category => {
        // Add all the totals up
        let result = shiftResults[category].reduce((subtotal, currentValue) => {
           subtotal = {
             performance: subtotal.performance + currentValue.performance,
             unitsPerHour: subtotal.unitsPerHour + currentValue.unitsPerHour,
             workCategory: category
           };
           return subtotal
        }, {
          performance: 0,
          unitsPerHour: 0
        });
        // Divide by amount of records
        result.performance = Math.round(result.performance / shiftResults[category].length);
        result.unitsPerHour = Math.round(result.unitsPerHour / shiftResults[category].length);

        // Return the average
        return result;
      })

      /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

      // Sort partnerResults alphabetically by first name
      partnerResults.sort((first, second) => first.name.localeCompare(second.name));

      let combinedRecords = [shiftTotals, partnerResults];

      res.send(combinedRecords);
    }

  } catch(err) {
    
    res
      .status(500)
      .send(err.message);
  }
});

module.exports = router;