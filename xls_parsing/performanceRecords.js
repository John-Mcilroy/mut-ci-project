// 
// Needs a major refactor, once MVP is achieved
//

const xlsx = require('xlsx');

// Validation && Utilities
const validateReportType = require('./validation/validateReportType');
const validateDateInput = require('./validation/validateDateInput');
const validateWorkTeam = require('./validation/validateWorkTeam');
const validatePartner = require('./validation/validatePartner');
const ignoredWords = require('./utilities/ignoredWords');
const getWorkCategory = require('./utilities/getWorkCategory');
const savePerformanceData = require('./utilities/savePerformanceData');

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
  let shiftRecords = [];
  let workCategory = '';
  let partnerName = '';
  let partnerNumber = '';
  let nameContainsNumber = true;
  let date = validDates[0];
  
  
  let currentPartner = {};
  
  if( validReportType && validDates && validWorkTeam) {
    try {
      // Is valid sheet
      sheetData.forEach(record => {
        
        if(!dataPersist) {
          partnerName = null;
        }
        
        if(record.__EMPTY == 'Subtotal:' && record.__EMPTY_1 !== 'PM\'s') {
          try {
          let shiftRecord = {};
          switch(record.__EMPTY_1) {
            case 'AMBIENT PICKING':
              shiftRecord = {
                workCategory: 'ambientPicking',
                performance: record.__EMPTY_2,
                unitsPerHour: /[0-9]/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null,
                date
              }
              shiftRecords.push(shiftRecord);
              break;
              
            case 'AMBIENT':
              shiftRecord = {
                workCategory: 'ambientReplenishment',
                performance: record.__EMPTY_2,
                unitsPerHour: /[0-9]/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null,
                date
              }
              shiftRecords.push(shiftRecord);
              break;
              
            case 'CHILLED PICKING':
              shiftRecord = {
                workCategory: 'chilledPicking',
                performance: record.__EMPTY_2,
                unitsPerHour: /[0-9]/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null,
                date
              }
              shiftRecords.push(shiftRecord);
              break;
                
            case 'CHLLLED':
                shiftRecord = {
                  workCategory: 'chilledReceiving',
                  performance: record.__EMPTY_2,
                  unitsPerHour: /[0-9]/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null,
                  date
                }
                shiftRecords.push(shiftRecord);
                break;
                    
            case 'FRVH PICKING':
              shiftRecord = {
                workCategory: 'FRVPicking',
                performance: record.__EMPTY_2,
                unitsPerHour: /[0-9]/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null,
                date
              }
              shiftRecords.push(shiftRecord);
              break;
              
              case 'LEYLAND ALL':
                shiftRecord = {
                  workCategory: 'loading',
                  performance: record.__EMPTY_2,
                  unitsPerHour: /[0-9]/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null,
                  date
                }
                shiftRecords.push(shiftRecord);
                break;
                
                default:
                  break;
              }

              return;
            } catch(err) {
              console.log(record);
            }
            }
                      
        const recordWorkCategory = record.__EMPTY || null;
        const recordPartner = record.__EMPTY_1 || null;
        const recordPerformance = record.__EMPTY_2 || null;
        const recordDirect = record.__EMPTY_4 || null;
          if(recordDirect == null && recordDirect == 'Measured' && recordDirect == 'Direct') return;
        const recordUnits = record.__EMPTY_14 || null;
        const recordUnitsPerHour = /[0-9]/.test(record.__EMPTY_16) ? record.__EMPTY_16 : record.__EMPTY_17 || null;
        
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
              
            } else {
              // [ 'Last name, First name', number ]
              const splitNameAndNumber = recordPartner.split('-');
              
              // [ 'Last name', 'First name' ]
              const getName = splitNameAndNumber[0].split(',');
              
              // '(First name) (Last name)'
              partnerName = getName[1].trim() + ' ' + getName[0].trim();
              
              // Number
              partnerNumber = splitNameAndNumber[1].toString().trim();
              
              currentPartner.name = partnerName;
              currentPartner.number = partnerNumber;
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
        
        if(records.find(findPartner => {
          return findPartner.number == currentPartner.number;
        })) {
          if(recordPerformance === 'Perf') return;
          if(recordPerformance === null) return;
          const userIndex = records.findIndex(indexed => indexed.number == currentPartner.number);
          const createPerformanceRecord = {};
          
          let scanRecord;
          if(workCategory == 'chillReceiving') {
            scanRecord = Math.round(recordUnitsPerHour / 500 * 100);
          }
          
          createPerformanceRecord.workCategory = workCategory;
          createPerformanceRecord.performance = scanRecord || recordPerformance;
          createPerformanceRecord.direct = recordDirect;
          createPerformanceRecord.unitsTotal = recordUnits;
          createPerformanceRecord.unitsPerHour = recordUnitsPerHour;
          createPerformanceRecord.date = date;
          
          records[userIndex].records.push(createPerformanceRecord);
        } else {
          const createPerformanceRecord = {};
          let scanRecord;
          if(workCategory == 'chillReceiving') {
            scanRecord = Math.round(recordUnitsPerHour / 500 * 100);
          }
          
          createPerformanceRecord.workCategory = workCategory;
          createPerformanceRecord.performance = scanRecord || recordPerformance;
          createPerformanceRecord.direct = recordDirect;
          createPerformanceRecord.unitsTotal = recordUnits;
          createPerformanceRecord.unitsPerHour = recordUnitsPerHour;
          createPerformanceRecord.date = date;
          
          currentPartner.records = [];
          currentPartner.records.push(createPerformanceRecord);
          
          
          records.push(currentPartner);
          currentPartner = {};
        }
      })
    } catch(err) {
      console.log(err);
    }
  } else {
    if(!validReportType)  errors.reportType = 'Invalid report type entered';
    if(!validDates)       errors.dates = 'Invalid dates entered';
    if(!validWorkTeam)  errors.workTeam = 'Invalid work team entered';
    
    return errors;
  }
  
  records.splice(0, 1);
  const result = {
    records,
    shiftRecords
  }
  
  try {
    savePerformanceData(records, shiftRecords, date);
    return result;
  } catch(err) {
    return 'duplicate';
  }  
}
