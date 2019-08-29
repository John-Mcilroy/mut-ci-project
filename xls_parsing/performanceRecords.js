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
const validateReportType = require('./validation/validateReportType');
const validateDateInput = require('./validation/validateDateInput');
const validateWorkTeam = require('./validation/validateWorkTeam');
const ignoredWords = require('./utilities/ignoredWords');

module.exports = (path) => {
  
  const workbook = xlsx.readFile(path);
  const worksheet = workbook.Sheets['Sheet1'];
  const sheetData = xlsx.utils.sheet_to_json(worksheet);

  let errors = {};

  // Validation
  const validReportType = validateReportType(sheetData[0]);
  const validDates = validateDateInput(sheetData[1]);
  const validWorkTeam = validateWorkTeam(sheetData);
  let records = [];
  let workCategory = '';
  
  if( validReportType && validDates && validWorkTeam) {
    // Is valid sheet
    sheetData.forEach(record => {
      //cycle each record
      if(record.__EMPTY) {
        // find what work catagory is current
        if (record.__EMPTY === 'Work Category:  AMBIENT PICKING') workCategory = 'ambientPick'; 
        if (record.__EMPTY === 'Work Category:  AMBIENT PUTAWAY') workCategory = 'ambientPutaway';
        if (record.__EMPTY === 'Work Category:  CHILLED PICKING') workCategory = 'chillPick'; 
        if (record.__EMPTY === 'Work Category:  CHLLLED RECEIVING') workCategory = 'chillReceiving'; 
        if (record.__EMPTY === 'Work Category:  FRVH PICKING') workCategory = 'frvPick'; 
        if (record.__EMPTY === 'Work Category:  LEYLAND ALL LOADING') workCategory = 'loading';
      }
      
      if(record.__EMPTY_1) {
        let currentPartner = {};
        // Ignore unused cells
        if(ignoredWords.includes(record.__EMPTY_1)) return;
        
        if(records.find(findUser => {
          return findUser.user == record.__EMPTY_1;
        })) {
          const userIndex = records.findIndex(indexed => indexed.user == record.__EMPTY_1);
          records[userIndex][workCategory] = {};
          records[userIndex][workCategory].performance = record.__EMPTY_2;
          records[userIndex][workCategory].direct = record.__EMPTY_4;
          records[userIndex][workCategory].unitsTotal = record.__EMPTY_14;
          records[userIndex][workCategory].unitsPH = record.__EMPTY_16;
        } else {
          currentPartner[workCategory] = {};
          currentPartner.user = record.__EMPTY_1;
          currentPartner[workCategory].performance = record.__EMPTY_2;
          currentPartner[workCategory].direct = record.__EMPTY_4;
          currentPartner[workCategory].unitsTotal = record.__EMPTY_14;
          currentPartner[workCategory].unitsPH = record.__EMPTY_16;

          records.push(currentPartner);
        }
      }
    })
  } else {
    if(!validReportType)  errors.reportType = 'Invalid report type entered';
    if(!validDates)       errors.dates = 'Invalid dates entered';
    if(!validWorkTeam)  errors.workTeam = 'Invalid work team entered';

    return errors;
  }


  console.log(`
    Valid Report Type: ${validReportType}
    Valid Dates: ${validDates}
    Valid Work Team: ${validWorkTeam}
`);
  return records;
}