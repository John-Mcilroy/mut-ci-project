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
const validatePartner = require('./validation/validatePartner');
const ignoredWords = require('./utilities/ignoredWords');
const getWorkCategory = require('./utilities/getWorkCategory');

module.exports = (path) => {
  
  const workbook = xlsx.readFile(path);
  const worksheet = workbook.Sheets['Sheet1'];
  const sheetData = xlsx.utils.sheet_to_json(worksheet);

  let errors = {};

  // Validation
  const validReportType = validateReportType(sheetData[0]);
  const validDates = validateDateInput(sheetData[1]);
  const validWorkTeam = validateWorkTeam(sheetData);

  let dataPersist = false;
  let records = [];
  let workCategory = '';
  let partnerName = '';
  let partnerNumber = '';
  let currentPartner = {};
  let nameContainsNumber = true;
  
  if( validReportType && validDates && validWorkTeam) {
    // Is valid sheet
    sheetData.forEach(record => {

      if(!dataPersist) {
        partnerName = null;
      }

      const recordWorkCategory = record.__EMPTY         || null;
      const recordPartner = record.__EMPTY_1        || null;
      const recordPerformance = record.__EMPTY_2    || null;
      const recordDirect = record.__EMPTY_4         || null;
      const recordUnits = record.__EMPTY_14         || null;
      const recordUnitsPerHour = /[0-9]{3}/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null;
      
      //cycle each record
      if(recordWorkCategory) {
        workCategory = getWorkCategory(recordWorkCategory) || workCategory;
        return;
      }

      if(recordPartner) {
        // Ignore unused cells
        if(ignoredWords.includes(recordPartner)) return;
        
        nameContainsNumber = validatePartner(recordPartner);

        // Set Name ++ Number
        if(nameContainsNumber) {

          if(partnerName !== null) {
            partnerNumber = recordPartner;

            dataPersist = false;

            currentPartner.name = partnerName;
            currentPartner.number = partnerNumber;
            console.log(currentPartner);

          } else {
            // [ 'Last name, First name', number ]
            const splitNameAndNumber = recordPartner.split('-');
            
            // [ 'Last name', 'First name' ]
            const getName = splitNameAndNumber[0].split(',');
            
            // '(First name) (Last name)'
            partnerName = getName[1].trim() + ' ' + getName[0].trim();

            // Number
            const getNumber = splitNameAndNumber[1].toString().trim();

            // Number
            partnerNumber = getNumber;

            currentPartner.name = partnerName;
            currentPartner.number = partnerNumber;
            console.log(currentPartner);
          }

        } else {
          // [ 'Last name', 'First name' ]
          const getName = recordPartner.split(',');

          // '(First name) (Last name)'
          partnerName = getName[1].trim() + ' ' + getName[0].trim();

          dataPersist = true;
          return;
          }
        }

        if(records.find(findUser => {
          return findUser.number == currentPartner.number;
        })) {
          if(recordPerformance === null) return;
          const userIndex = records.findIndex(indexed => indexed.number == currentPartner.number);
          records[userIndex][workCategory] = {};
          records[userIndex][workCategory].performance = recordPerformance;
          records[userIndex][workCategory].direct = recordDirect;
          records[userIndex][workCategory].unitsTotal = recordUnits;
          records[userIndex][workCategory].unitsPH = recordUnitsPerHour;
        } else {
          currentPartner[workCategory] = {};
          currentPartner[workCategory].performance = recordPerformance;
          currentPartner[workCategory].direct = recordDirect;
          currentPartner[workCategory].unitsTotal = recordUnits;
          currentPartner[workCategory].unitsPH = recordUnitsPerHour;

          records.push(currentPartner);
          currentPartner = {};
        }
        return records;
      }
    )
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