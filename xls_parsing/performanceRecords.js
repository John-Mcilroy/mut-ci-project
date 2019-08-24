//                                ------------                                //
//                               | Column Key |                               //
//                                ------------                                //
//                                                                            //
//  __EMPTY: Work Catagory / Subtotal  - -  __EMPTY_1: Partner Name & Number  //
//  __EMPTY_2: Performance (%)         - -  __EMPTY_3: Time Taken (Goal)      //
//  __EMPTY_4: Time Taken (Actual)     - -  __EMPTY_9: Date & Report Type     //
//  __EMPTY_13: Picks Worked (Picks)   - -  __EMPTY_14: Total Units (Cases)   //
//  __EMPTY_16: Units Per Hour (Cases)                                        //
//                                                                            //
//----------------------------------------------------------------------------//
const xlsx = require('xlsx');

module.exports = (path) => {
  
  const workbook = xlsx.readFile(path);
  const worksheet = workbook.Sheets['Sheet1'];
  const sheetData = xlsx.utils.sheet_to_json(worksheet);

<<<<<<< HEAD
  

  return sheetData;
=======
  const unusedColumns = [
    '__EMPTY_5', '__EMPTY_6', '__EMPTY_7',
    '__EMPTY_8', '__EMPTY_10', '__EMPTY_11',
    '__EMPTY_12', '__EMPTY_15','__EMPTY_17',
    '__EMPTY_18', '__EMPTY_19', '__EMPTY_21',
    '__EMPTY_22'
  ];

  let records = [];

  sheetData.forEach(record => {
    unusedColumns.forEach(column => {
      if(column in record) delete record[column];
      if(record[column] === 0) delete record[column];
    })
  });

  let validReport;
  sheetData.forEach(record => {
    if(validReport) {
      if(typeof record.__EMPTY_1 === 'number') {
        let newRecord = {};
        
        newRecord.number = record.__EMPTY_1;
        newRecord.pickrate = record.__EMPTY_2;
        newRecord.goalTime = record.__EMPTY_3;
        newRecord.actualTime = record.__EMPTY_4;
        newRecord.totalPicks = record.__EMPTY_13;
        newRecord.totalCases = record.__EMPTY_14;
        newRecord.unitsPerHour = record.__EMPTY_16;
        
        records.push(newRecord);
      }
    } else {

      // Check if the right Summary Report has been given
      if(record.__EMPTY_9 === 'Summary Report By Work Category and User ID') {
        validReport = true;
      } else {
        return;
      }
    }

  })
  console.log(records);
  return records;
>>>>>>> d9f3f008a84a73fe605a8a96c744a0331978e7c7
}