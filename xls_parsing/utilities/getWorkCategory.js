
const getWorkCategory = (data) => {
  if(data.match(/^Printed/)) {
    return;
  };
    // find what work catagory is current
  switch(data) {
    case 'Work Category:  AMBIENT PICKING':
      return workCategory = 'ambientPick';
      
    case 'Work Category:  AMBIENT REPLENISHMENT':
      return workCategory = 'ambientReplenishment';
      
    case 'Work Category:  CHILLED PICKING':
      return workCategory = 'chillPick';
      
    case 'Work Category:  CHLLLED RECEIVING':
      return workCategory = 'chillReceiving';
      
    case 'Work Category:  FRVH PICKING':
      return workCategory = 'frvPick';
      
    case 'Work Category:  LEYLAND ALL LOADING':
      return workCategory = 'loading';
      
    default:
      return workCategory = 'Invalid work category';
  };
}

module.exports = getWorkCategory;