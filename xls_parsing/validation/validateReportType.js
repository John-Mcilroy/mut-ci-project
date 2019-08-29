const validateReportType = (data) => {
  if(Object.values(data).includes('Summary Report By Work Team, Work Category and User')) {
    return true;
  } else {
    return false;
  };
}

module.exports = validateReportType;
