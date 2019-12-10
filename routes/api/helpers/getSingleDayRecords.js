const PartnerRecord = require('../../../models/records-models/PartnerRecord');
const ShiftRecord = require('../../../models/records-models/ShiftRecord');

const getSingleDayRecords = async ( date ) => {
  try {
    const combinedPartnerRecords = [];
    
    const partnerRecords = await PartnerRecord.find({ date }).populate('partner');
    const shiftRecords = await ShiftRecord.find({ date });
    
    console.log(partnerRecords);

    partnerRecords.forEach(record => {
      const { name, number } = record.partner;
      const { workCategory, performance, direct, unitsPerHour, unitsTotal } = record;
      
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
    // console.log(result);
    return result;
  } catch(err) {
    console.log(err);
  }
}

module.exports = getSingleDayRecords;