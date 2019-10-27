const Partner = require('../../models/records-models/Partner');
const Performance = require('../../models/records-models/Performance');

module.exports = async (records, date) => {
  const recordsAlreadyUploaded = await Performance.findOne({ date: date });

  if(recordsAlreadyUploaded) {
    console.log('Already Uploaded');
    return;
  }

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

          try {
          const performance = new Performance({
            partner: partner,
            workCategory: uploadedRecord.workCategory,
            performance: uploadedRecord.performance,
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
};
