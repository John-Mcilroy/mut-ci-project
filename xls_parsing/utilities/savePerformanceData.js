const Partner = require('../../models/records-models/Partner');
const ShiftRecord = require('../../models/records-models/ShiftRecord');

module.exports = async (records, shift, date) => {

  const isDuplicate = await ShiftRecord.findOne({ date });

  if(isDuplicate) {
    try {
      if(isDuplicate) throw new Error({ msg: 'duplicate'});
    } catch(err) {
      return 'duplicate';
    }
  } else {
    
    records.forEach(async record => {
    const currentPartner = await Partner.findOne({ number: record.number });
      
    if(!currentPartner) {
        
      try{
        const partner = new Partner({
          name: record.name,
          number: record.number
        })
        partner.save();
        
        await record.records.forEach(async uploadedRecord => {

          let uploadedPerformance;
          if(uploadedRecord.workCategory == 'chillReceiving') {
            uploadedPerformance = Math.round(uploadedRecord.unitsPerHour / 500 * 100);
          } else {
            uploadedPerformance = uploadedRecord.performance;
          }



        try {
          const performance = new PartnerRecord({
            partner: partner,
            workCategory: uploadedRecord.workCategory,
            performance: uploadedPerformance,
            direct: uploadedRecord.direct,
            unitsPerHour: uploadedRecord.unitsPerHour,
            unitsTotal: uploadedRecord.unitsTotal,
            date
          });
            performance.save();
          } catch(err) {
            console.error(err);
          }});

        } catch(err) {
          console.error('Error: ', record);
        }
      } else {
        //
        try{
          await record.records.forEach(async uploadedRecord => {
            let uploadedPerformance;
            if(uploadedRecord.workCategory == 'chillReceiving') {
              uploadedPerformance = Math.round(uploadedRecord.unitsPerHour / 500 * 100);
            } else {
              uploadedPerformance = uploadedRecord.performance;
            }

            try {
            const performance = new PartnerRecord({
              partner: currentPartner,
              workCategory: uploadedRecord.workCategory,
              performance: uploadedPerformance,
              direct: uploadedRecord.direct,
              unitsPerHour: uploadedRecord.unitsPerHour,
              unitsTotal: uploadedRecord.unitsTotal,
              date
            });
            performance.save();
            } catch(err) {
              console.error(err);
            }
          });

        } catch(err) {
          console.error('Error: ', record);
        }
      }
    })

    shift.forEach(record => {
      const shiftRecord =  new ShiftRecord(record);

      shiftRecord.save();
    });
  }
};
