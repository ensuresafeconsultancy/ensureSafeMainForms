const express = require('express');
const app = express();
require('dotenv').config();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); // Parse incoming JSON data


const fs = require('fs').promises; // Using promises for asynchronous operations
const path = require('path');
const uploadFolder = path.join(__dirname, 'files'); // Adjust based on your project structure


app.use(async (req, res, next) => {
  try {
    await fs.access(uploadFolder); // Check if folder exists
  } catch (err) {
    if (err.code === 'ENOENT') { // Folder doesn't exist, create it
      await fs.mkdir(uploadFolder, { recursive: true }); // Create folder recursively
      console.log(`Upload folder created: ${uploadFolder}`);
    } else {
      console.error('Error checking/creating upload folder:', err);
    }
  }

  next(); // Continue request processing
});



const cors = require('cors')
app.use(cors())
app.use(express.static('files'))
app.use(express.static('exportedPdfs')) // or this

//controllers
const FORMS = require('./controllers/wshcmForms')
const LOGIN = require('./controllers/login')
app.use('/', LOGIN)
app.use('/wshcmForm', FORMS)

// const routes = require('./routes')
// app.use('/', routes)



//mongodb connection
const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/ensureSafe')
//   .then(() => console.log('Connected!'))


  mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// http://localhost:3000/wshcmForm/uploadCertificateFiles/668251cad8033905aa357bf4