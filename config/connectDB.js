const mongoose = require('mongoose');

// Database Config
const db = `mongodb://dev:js56720546@ds217078.mlab.com:17078/managersutilitytool`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  } catch(err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  };
}

module.exports = connectDB;