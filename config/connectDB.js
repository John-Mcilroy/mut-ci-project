const mongoose = require('mongoose');

// Database Config
const db = process.env.MLAB_DB_KEY || require('./keys').DB_URI;

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