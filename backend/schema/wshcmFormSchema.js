const mongoose = require('mongoose')

const wshcmForm = new mongoose.Schema({
    formName : String,
    class_type : String,
    participantName : String,
    NRIC_No : String,
    organization : String,
    date_of_birth:String,
    sunday_class_timing : String,
    work_permit : String,
    work_permit_expiry : String,
    working_day_timing : String,
    contact_no : String,
    identification : String,
    companyName	: String,
    companyUEN : String,
    companyPersonName : String,
    companyPersonEmail : String,
    companyPersonContactNo : String,
    email_id: String,
    experience:String,
    salary:String,
    qualifications :String,
    gender : String,
    nationality : String,
    race : String,
    certificateFilesId : [String],
    certificateFiles : [String],
    photoId : [String],
    photos : [String],
})

module.exports = mongoose.model('wshcmForm' , wshcmForm)