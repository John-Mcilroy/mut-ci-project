const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');

const app = express();

// BodyParsere Middleware
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/records', require('./routes/api/records'));

app.listen(keys.PORT, () => console.log(`Listening on port: ${keys.PORT}`));
