const validateDateInput = (data) => {
  const dateRegex = /([0-3][0-9]\/[0-1][0-9])\/20[1-2][0-9]/;
  const inputDates = Object.values(data);
  const getValidity = inputDates.toString().match(dateRegex);

  if(getValidity.length === 2) {
    return true;
  } else {
    return false;
  }
};

module.exports = validateDateInput;