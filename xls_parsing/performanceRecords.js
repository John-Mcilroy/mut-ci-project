const xlsx = require('xlsx');

module.exports = (path) => {
  
  const workbook = xlsx.readFile(path);
  const worksheet = workbook.Sheets['Sheet1'];
  const sheetData = xlsx.utils.sheet_to_json(worksheet);

  

  return sheetData;
}