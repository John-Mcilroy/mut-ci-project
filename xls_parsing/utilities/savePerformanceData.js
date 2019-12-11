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
          if(
            (uploadedRecord.workCategory == 'chillPick' && uploadedRecord.direct < 0.5 ) ||
            (uploadedRecord.workCategory == 'frvPick' && uploadedRecord.direct < 0.5 ) ||
            (uploadedRecord.workCategory == 'ambientPick' && uploadedRecord.direct < 0.5 )) {
              console.log(uploadedRecord);
              return;
            }
          let uploadedPerformance;
          if(uploadedRecord.workCategory === 'chillReceiving') {
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

            if(
              (uploadedRecord.workCategory == 'chillPick' && uploadedRecord.direct < 0.5 ) ||
              (uploadedRecord.workCategory == 'frvPick' && uploadedRecord.direct < 0.5 ) ||
              (uploadedRecord.workCategory == 'ambientPick' && uploadedRecord.direct < 0.5 ))
            {
              return;
            } else if(
              (uploadedRecord.workCategory == 'chillPick' && uploadedRecord.direct === undefined || null ) ||
              (uploadedRecord.workCategory == 'frvPick' && uploadedRecord.direct === undefined || null ) ||
              (uploadedRecord.workCategory == 'ambientPick' && uploadedRecord.direct === undefined || null )) 
            {
              return;
            }

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
      const shiftRecord = new ShiftRecord(record);

      shiftRecord.save();
    });
  }
};
