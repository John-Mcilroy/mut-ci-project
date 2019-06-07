const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const partnerRecord = require('./routes/api/partner-record');

// Import sensitive data
const keys = require('./config/keys');

const app = express();

// BodyParsere Middleware
app.use(bodyParser.json());

// Database Config
const db = require('./config/keys').DB_URI;

// Connect to Mongo Database
mongoose.connect(db)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err));

app.use('/api/partner-record', partnerRecord);

app.listen(keys.PORT, () => console.log(`Listening on port: ${keys.PORT}`));
