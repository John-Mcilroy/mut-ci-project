const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');
const fileUpload = require('express-fileupload');
const secure = require('ssl-express-www');

const path = require('path');

const app = express();

// Use port 5000 if in development environment
const PORT = process.env.PORT || 5000;

// BodyParsere Middleware
app.use(bodyParser.json());
app.use(fileUpload());
app.use(secure);

// Connect to Database
connectDB();

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/performance', require('./routes/api/performance'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT);
