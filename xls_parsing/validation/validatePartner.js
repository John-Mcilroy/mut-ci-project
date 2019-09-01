const validatePartner = (data) => {
  const partnerNumberRegex = /8\d{7}/;
  const getValidity = data.toString().match(partnerNumberRegex);

  if(getValidity) {
    return true;
  } else {
    return false;
  }
};

module.exports = validatePartner;