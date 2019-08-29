const validateWorkTeam = (data) => {
  if (data[5].__EMPTY === 'Work Team:  PM\'s') {
    return true;
  } else {
    return false;
  }
}

module.exports = validateWorkTeam;
