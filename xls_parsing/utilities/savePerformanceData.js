const Partner = require('../../models/records-models/Partner');
const Performance = require('../../models/records-models/Performance');

module.exports = async (records, date) => {
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
          const performance = new Performance({
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
            const performance = new Performance({
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
};
