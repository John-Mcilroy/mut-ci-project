const mongoose = require('mongoose');

// Database Config
const db = `mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds217078.mlab.com:17078/${process.env.MLAB_NAME}`;

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