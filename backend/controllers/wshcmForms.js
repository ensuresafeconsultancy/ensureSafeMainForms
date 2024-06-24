require('dotenv').config();
const express = new require('express')
const router = express.Router()
const multer  = require('multer')


// const ejs = require('ejs');
// const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')

//mail
// const nodemailer = require('nodemailer');

// const filesDir = path.join(__dirname, 'files');
// if (!fs.existsSync(filesDir)) {
//     fs.mkdirSync(filesDir, { recursive: true });
// }
    


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'files')
    },
    filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null,uniqueSuffix + file.originalname)
    }
})



const upload = multer({ storage: storage })



const WshcmForm  = require('../schema/wshcmFormSchema')

router.get("/wshcmFormSubmit" , async(req,res)=>{
    //  const userDetailsDb = await FormModel.find();

    //  if(userDetailsDb){
    //       res.send({status : 1 , userDetails : userDetailsDb})
    //  }

    res.send({message : 'success'})
})


router.post("/submitForm", upload.fields([{ name: 'certificateFiles', maxCount: 12 }, { name: 'photo', maxCount: 1 }]), async (req, res) => {
    try{

        // console.table(req.body)

        const certificateFiles = req.files['certificateFiles'].map(file => file.filename);
        // For single file, use req.file
        const photo = req.files['photo'][0].filename;

    //     const certificateFiles = req.files['certificateFiles']? req.files['certificateFiles'].map(file => file.filename)
    //     : [];

    //   const photo = req.files['photo'] ? req.files['photo'][0].filename : null;


      const newForm = new WshcmForm({
        class_type: req.body.class_type,
        participantName: req.body.participantName,
        NRIC_No: req.body.NRIC_No,
        organization: req.body.organization,
        date_of_birth: req.body.date_of_birth, // Assuming date format is handled appropriately
        sunday_class_timing: req.body.sunday_class_timing,
        work_permit: req.body.work_permit,
        work_permit_expiry: req.body.work_permit_expiry, // Assuming date format is handled appropriately
        working_day_timing: req.body.working_day_timing,
        contact_no: req.body.contact_no,
        identification: req.body.identification,
        companyName: req.body.companyName,
        companyUEN: req.body.companyUEN,
        companyPersonName: req.body.companyPersonName,
        companyPersonEmail: req.body.companyPersonEmail,
        companyPersonContactNo: req.body.companyPersonContactNo,
        email_id: req.body.email_id,
        experience: req.body.experience,
        salary: req.body.salary,
        qualifications: req.body.qualifications,
        gender: req.body.gender,
        nationality: req.body.nationality,
        race: req.body.race,
      
        // Handle certificate files (assuming an array of filenames in req.body.certificateFiles)
        certificateFiles: req.body.certificateFiles ? req.body.certificateFiles : [],
      
        // Handle photo filename (assuming a single filename in req.body.photo)
        photo: req.body.photo,
      });

      const response = await newForm.save();

      console.table(newForm);
      



        res.send({status : 1 , message : "Successfully received"})


    } catch(err){
        console.log("Something went wrong");
        res.send({status : 0 , message : "Something went wrong"})
    }
    
});


// router.post(
//     "/submitForm",
//     upload.fields([
//       { name: 'educationalCertificates', maxCount: 12 }, // Adjust maxCount as needed
//       { name: 'studentPhoto', maxCount: 1 },
//     ]),
//     async (req, res) => {
//       try {
//         console.table(req.body); // Log form data for debugging
//         console.log(req.files); // Log uploaded files for debugging
  
//         // Accessing educationalCertificates (multiple files):
//         const certificateFiles = req.files['educationalCertificates'].map(
//           file => file.filename
//         );
  
//         // Accessing studentPhoto (single file):
//         const photoFile = req.files['studentPhoto'][0].filename;
  
//         // ... your logic to process files and data
  
//         res.send({ status: 1, message: "Successfully received" });
//       } catch (err) {
//         console.error(err);
//         res.send({ status: 0, message: "Something went wrong" });
//       }
//     }
//   );

module.exports = router