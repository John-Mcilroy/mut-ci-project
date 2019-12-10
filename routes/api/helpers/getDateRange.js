const getDateRange = (startDate, endDate) => {
  const dateRange = [];
  while(startDate.isBefore(endDate) || startDate.isSame(endDate)) {
    dateRange.push(startDate.format('DD/MM/YYYY'));
    startDate.add(1, 'd');
  };

  return dateRange;
}

module.exports = getDateRange;