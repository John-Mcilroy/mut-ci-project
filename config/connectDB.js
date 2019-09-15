const mongoose = require('mongoose');

// Testing Database Key -- To be changed for env.variable in production build
const db = 'mongodb://localhost/managersutility' || `mongodb://dev:js56720546@ds217078.mlab.com:17078/managersutilitytool`;

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  } catch(err) {
    console.log(`Unable to connect to database: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  };
}

module.exports = connectDB;
