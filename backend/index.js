const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('files'))

//controllers
const FORMS = require('./controllers/wshcmForms')
app.use('/wshcmForm', FORMS)



//mongodb connection
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ensureSafe')
  .then(() => console.log('Connected!'))



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
