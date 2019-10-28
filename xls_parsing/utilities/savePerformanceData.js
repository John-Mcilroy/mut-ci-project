const Partner = require('../../models/records-models/Partner');
const Performance = require('../../models/records-models/Performance');

module.exports = async (records) => {
  records.forEach(async record => {
    const recordsAlreadyUploaded = await Performance.findOne({ date: record.records.date });
  
    if(recordsAlreadyUploaded) {
      throw new Error({ msg: 'Records have already been uploaded for this date' });
    }


    const currentPartner = await Partner.findOne({ number: record.number });
    
    if(!currentPartner) {
      
      try{
        const partner = new Partner({
          name: record.name,
          number: record.number
        })
        partner.save();
      
        await record.records.forEach(async uploadedRecord => {

          try {
            const performance = new Performance({
              partner: partner,
              workCategory: uploadedRecord.workCategory,
              performance: uploadedRecord.performance,
              direct: uploadedRecord.direct,
              unitsPerHour: uploadedRecord.unitsPerHour,
              unitsTotal: uploadedRecord.unitsTotal
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
  
            try {
            const performance = new Performance({
              partner: currentPartner,
              workCategory: uploadedRecord.workCategory,
              performance: uploadedRecord.performance,
              direct: uploadedRecord.direct,
              unitsPerHour: uploadedRecord.unitsPerHour,
              unitsTotal: uploadedRecord.unitsTotal,
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
};
