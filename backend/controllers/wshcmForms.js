require('dotenv').config();
const express = new require('express')
const router = express.Router()
const multer  = require('multer')
const WshcmForm  = require('../schema/wshcmFormSchema')
const formidable = require('formidable');

// const PDFDocument = require('pdfkit'); // no need
// const { PDFDocument, StandardFonts } = require('pdf-lib');

const Json2csvParser = require('json2csv').Parser;

// const nodemailer = require('nodemailer');
const ejs = require('ejs');
const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')

const { google } = require('googleapis');
// const apiKeys = require('./googleApiKey.json')
const folderId = process.env.FOLDER_ID;

const SCOPE = [process.env.SCOPE];
// A Function that can provide access to google drive api
async function authorize(){
    const jwtClient = new google.auth.JWT(
      process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;

    
}

async function deleteFile(authClient, fileId) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  try {
    await drive.files.delete({ fileId });
    console.log(`File with ID ${fileId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

router.get('/openFile/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId; // Get file ID from request parameter

    console.log("fileId = " , fileId)
    const authClient = await authorize();
    const drive = google.drive({ version: 'v3', auth: authClient });

    const response = await drive.files.get({ fileId });
    const urlExtract = response.request.responseURL.split('/');
    console.log(urlExtract[urlExtract.length-1])

    if(urlExtract[urlExtract.length-1]){
      res.send({downloadUrl : urlExtract[urlExtract.length-1]})
    }else {
      res.status(404).send('File not found or unsupported format');
    }

    // console.log("response.data.exportLinks = " , response.data.exportLinks)
    // if (response.data.exportLinks) {
    //   const downloadUrl = response.data.exportLinks[desiredMimeType]; // Choose the desired format
    //   console.log("downloadUrl = " , downloadUrl)
    //   res.json({ downloadUrl });
    // } else {
    //   res.status(404).send('File not found or unsupported format');
    // }

    // const response = await drive.files.get({ fileId, fields: 'downloadUrl' });

    // if (response.data.downloadUrl) {
    //   const signedUrl = response.data.downloadUrl;
    //   console.log("signedUrl = " , signedUrl)
    //   res.json({ downloadUrl: signedUrl }); // Send signed URL in response
    // } else {
    //   res.status(404).send('File not found'); // Handle non-existent file
    // }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error'); // Handle errors
  }
});

// A Function that will upload the desired file to google drive folder
var fileLocation = '';
var mimeTypeParams = '';

// folder id = 1k0JF9dMxTV-97il_aaqSkSgsy2aIxb5b
async function uploadFile(authClient, fileLocation , mimeTypeParams , fileName){
  console.log("outside fileLocation = " ,fileLocation)
  console.log("outside mimeTypeParams = " ,mimeTypeParams)

  return new Promise((resolve,rejected)=>{

    console.log("fileLocation = " ,fileLocation)
    console.log("mimeTypeParams = " ,mimeTypeParams)
      const drive = google.drive({version:'v3',auth:authClient}); 
      var fileMetaData = {
          name: fileName,    
          parents:[folderId] // A folder ID to which file will get uploaded
      }
      drive.files.create({
          resource:fileMetaData,
          media:{
              body: fs.createReadStream(fileLocation), // files that will get uploaded
              mimeType: mimeTypeParams
          },
          fields:'id'
      },function(error,file){
          if(error){
              return rejected(error)
          }
          resolve(file);
      })
  });
}



router.get('/uploadFile' , async(req, res)=>{
  console.log("Hello sending")
  authorize().then(uploadFile).catch("error",console.error()); 
  console.log("Hello sent")
  res.send("send successfully")
})



//mail

// const filesDir = path.join(__dirname, 'files');
// if (!fs.existsSync(filesDir)) {
//     fs.mkdirSync(filesDir, { recursive: true });
// }
    


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//             cb(null, 'files')
//     },
//     filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now()
//             cb(null,uniqueSuffix + file.originalname)
//     }
// })



// const upload = multer({ storage: storage })




router.get("/fetchWshcmForms" , async(req,res)=>{
 
    try{
      let WshcmFormData = await WshcmForm.find();
      const wshcmFormSchemaFields = Object.keys(WshcmForm.schema.obj);
      const schemaFieldsWithTypes = WshcmForm.schema.obj;
      res.send({status : 1 , message:"Welcome to Product Page" , WshcmFormData : WshcmFormData , wshcmFormSchemaFields : wshcmFormSchemaFields , schemaFieldsWithTypes: schemaFieldsWithTypes});  

    }catch(err){
      res.send({status : 0 , message : "Error occured in wschm from fetch"})
    }


})


// router.post("/submitForm", upload.fields([{ name: 'certificateFiles', maxCount: 12 }, { name: 'photo', maxCount: 1 }]), async (req, res) => {
//     try{

//         // console.table(req.body)

//         const certificateFiles = req.files['certificateFiles'].map(file => file.filename);
//         // For single file, use req.file
//         const photo = req.files['photo'][0].filename;


//       const newForm = new WshcmForm({
//         class_type: req.body.class_type,
//         participantName: req.body.participantName,
//         NRIC_No: req.body.NRIC_No,
//         organization: req.body.organization,
//         date_of_birth: req.body.date_of_birth, // Assuming date format is handled appropriately
//         sunday_class_timing: req.body.sunday_class_timing,
//         work_permit: req.body.work_permit,
//         work_permit_expiry: req.body.work_permit_expiry, // Assuming date format is handled appropriately
//         working_day_timing: req.body.working_day_timing,
//         contact_no: req.body.contact_no,
//         identification: req.body.identification,
//         companyName: req.body.companyName,
//         companyUEN: req.body.companyUEN,
//         companyPersonName: req.body.companyPersonName,
//         companyPersonEmail: req.body.companyPersonEmail,
//         companyPersonContactNo: req.body.companyPersonContactNo,
//         email_id: req.body.email_id,
//         experience: req.body.experience,
//         salary: req.body.salary,
//         qualifications: req.body.qualifications,
//         gender: req.body.gender,
//         nationality: req.body.nationality,
//         race: req.body.race,
      
//         // Handle certificate files (assuming an array of filenames in req.body.certificateFiles)
//         certificateFiles: req.body.certificateFiles ? req.body.certificateFiles : [],
      
//         // Handle photo filename (assuming a single filename in req.body.photo)
//         photo: req.body.photo,
//       });

//       const response = await newForm.save();

      
//     res.send({status : 1 , message : "Successfully received"})


//     } catch(err){
//         console.log("Something went wrong");
//         res.send({status : 0 , message : "Something went wrong"})
//     }
    
// });


// function isValidDate(dateString) {
//     // Regex pattern for YYYY-MM-DD format
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
  
//     // Check if the date string matches the format
//     if (!regex.test(dateString)) {
//       return false;
//     }
  
//     // Split the date string into year, month, and day components
//     const parts = dateString.split('-');
//     const year = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
//     const day = parseInt(parts[2], 10);
  
//     // Check for valid date ranges (considering leap years)
//     return new Date(year, month, day).getTime() !== NaN &&
//            (year >= 1900 && year <= new Date().getFullYear());
//   }


function validateFileSize(file) {
    const fileSizeLimit = 30 * 1024 * 1024; // 30MB in bytes
    return file.size <= fileSizeLimit;
  }
  
  // Configure Multer storage with file size validation
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files'); // Adjust 'files' as needed for your file storage location
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
    limits: { fileSize: validateFileSize },
  });

const upload = multer({ storage: storage })


async function deleteAllFiles(folderPath) {
  try {
    const files = await fs.promises.readdir(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      await fs.promises.unlink(filePath);
    }
    console.log('All files deleted from', folderPath);
  } catch (err) {
    console.error('Error deleting files:', err);
  }
}

// Example usage (call this after uploading or whenever you need to delete files)
// deleteAllFiles('files'); 






// const submitForm = async(req,res) =>{

  // upload.fields([{ name: 'certificateFiles', maxCount: 12 }, { name: 'photo', maxCount: 1 }]) ,
router.post("/submitForm", upload.fields([{ name: 'certificateFiles', maxCount: 12 }, { name: 'photo', maxCount: 1 }]) , async (req, res) => {
    try {
      // Comprehensive validation
      const validationErrors = [];
  
      // Class type (required, string)
      if (!req.body.class_type || typeof req.body.class_type !== 'string') {
        validationErrors.push('"class_type" is required and must be a string.');
      }

      
      // Participant name (required, string)
      if (!req.body.participantName || typeof req.body.participantName !== 'string') {
          validationErrors.push('"participantName" is required and must be a string.');
        }
        
        // NRIC_No (optional, string)
        if (req.body.NRIC_No && typeof req.body.NRIC_No !== 'string') {
            validationErrors.push('"NRIC_No" must be a string if provided.');
        }
        
        // Organization (required, string)
        if (!req.body.organization || typeof req.body.organization !== 'string') {
            validationErrors.push('"organization" is required and must be a string.');
        }
        
        // Date of birth (required, valid date format)
        //   if (!req.body.date_of_birth || !isValidDate(req.body.date_of_birth)) {
    //     validationErrors.push('"date_of_birth" is required and must be a valid date format.');
    //   }
  
      // Sunday class timing (required, string)
      if (req.body.sunday_class_timing && typeof req.body.sunday_class_timing !== 'string' || req.body.work_permit && typeof req.body.work_permit !== 'string' ) {
        validationErrors.push('"sunday_class_timing" is required and must be a string or "work_permit" must be a string if provided.');
      }
  
      // Work permit (optional, string)
    //   if () {
    //     validationErrors.push('');
    //   }
  
      // Work permit expiry (optional, valid date format if work permit is provided)
    //   if (req.body.work_permit && (!req.body.work_permit_expiry || !isValidDate(req.body.work_permit_expiry))) {
    //     validationErrors.push('"work_permit_expiry" is required and must be a valid date format if "work_permit" is provided.');
    //   }
  
      // Working day timing (required, string)
      // if (!req.body.working_day_timing || typeof req.body.working_day_timing !== 'string') {
      //   validationErrors.push('"working_day_timing" is required and must be a string.');
      // }
  
      // Contact number (required, string)
      if (!req.body.contact_no || typeof req.body.contact_no !== 'string') {
        validationErrors.push('"contact_no" is required and must be a string.');
      }
  
      // Identification (required, string)
      if (!req.body.identification || typeof req.body.identification !== 'string') {
        validationErrors.push('"identification" is required and must be a string.');
      }
  
      // Company name (required, string)
      if (!req.body.companyName || typeof req.body.companyName !== 'string') {
        validationErrors.push('"companyName" is required and must be a string.');
      }
  
      // Company UEN (optional, string)
      if (req.body.companyUEN && typeof req.body.companyUEN !== 'string') {
        validationErrors.push('"companyUEN" must be a string if provided.');
      }
  
      // Company person name (required, string)
      if (!req.body.companyPersonName || typeof req.body.companyPersonName !== 'string') {
          validationErrors.push('"companyPersonName" is required and must be a string.');
      }
  
      // Company person email (required, string)
      if (!req.body.companyPersonEmail || typeof req.body.companyPersonEmail !== 'string') {
        validationErrors.push('"companyPersonEmail" is required and must be a string.');
      }

      // Company person contact number (optional, string)
        if (req.body.companyPersonContactNo && typeof req.body.companyPersonContactNo !== 'string') {
            validationErrors.push('"companyPersonContactNo" must be a string if provided.');
        }
        
        // Email ID (required, string)
        if (!req.body.email_id || typeof req.body.email_id !== 'string') {
            validationErrors.push('"email_id" is required and must be a string.');
        }
        
        // Experience (optional, string)
        if (req.body.experience && typeof req.body.experience !== 'string') {
            validationErrors.push('"experience" must be a string if provided.');
        }
        
        // Salary (optional, number)
        // if (req.body.salary && (typeof req.body.salary !== 'number' || isNaN(req.body.salary))) {
        //     validationErrors.push('"salary" must be a number if provided.');
        // }
        
        // Qualifications (optional, string)
        if (req.body.qualifications && typeof req.body.qualifications !== 'string') {
            validationErrors.push('"qualifications" must be a string if provided.');
        }
        
        // Gender (optional, string)
        if (req.body.gender && typeof req.body.gender !== 'string') {
            validationErrors.push('"gender" must be a string if provided.');
        }
        
        // Nationality (optional, string)
        if (req.body.nationality && typeof req.body.nationality !== 'string') {
            validationErrors.push('"nationality" must be a string if provided.');
        }
        
        // Race (optional, string)
        if (req.body.race && typeof req.body.race !== 'string') {
            validationErrors.push('"race" must be a string if provided.');
        }
        


        // const uploadResult = await upload.fields([
        //     { name: 'certificateFiles', maxCount: 12 },
        //     { name: 'photo', maxCount: 1 },
        //   ])(req, res, (err) => {
        //     if (err) {
        //       console.error(err);
        //       return res.status(500).send({ status: 0, message: "Internal server error" });
        //     }
      
        //     // Continue with processing the request after successful upload
        //     // Access uploaded files through req.files
        //   });
        


        console.log("check 1")

        // const form = formidable({ multiples: true });

    // Parse form data and extract files
        // const { fields, files } = await new Promise((resolve, reject) => {
        //   form.parse(req, (err, fields, files) => {
        //     if (err) {
        //       reject(err);
        //     } else {
        //       resolve({ fields, files });
        //     }
        //   });
        // });


        
        // Validate certificate files
        if (req.files['certificateFiles']) {
          for (const file of req.files['certificateFiles']) {
            if (!validateFileSize(file)) {
              validationErrors.push(`Certificate file "${file.originalname}" exceeds the maximum size of 30MB.`);
            }
          }
        }
        
        console.log("check 2")
        // Validate photo file size
        if (req.files['photo'] && !validateFileSize(req.files['photo'][0])) {
          validationErrors.push(`Photo file exceeds the maximum size of 30MB.`);
      }
  



    
    if (validationErrors.length > 0) {
      // If there are validation errors, return a bad request with the errors
      return res.status(400).send({ status: 0, message: 'Validation errors:', errors: validationErrors });
    }
    

    // const certificateFiles = files['certificateFiles'] || [];
    // const photo = files['photo'] ? files['photo'][0] : null;

    // console.log("files['certificateFiles'] = " , files['certificateFiles'])

    // // Check for required files
    // if (certificateFiles.length === 0 || !photo) {
    //   validationErrors.push('Certificate files and photo are required.');
    // }
    
    
    
    // const certificateFiles = req.files['certificateFiles'].map(file => file.filename);
    // For single file, use req.file
    // const photo = req.files['photo'][0].filename;
    
    const certificateFiles = req.files['certificateFiles'];
    console.log("check 3")
    const photo = req.files['photo'][0];
    console.log("check 4")

    console.log(req.files['certificateFiles'])
    console.log("photo = " ,req.files['photo'][0].path)

    for(let certificate of certificateFiles){
      console.log(typeof certificate.path)
      
    }
    

    // const certificateFileIds = [];
    // const certificateFileNames = [];

    // for (const certificateFile of certificateFiles) {
    //   const fileId = await uploadFile(authClient, certificateFile, certificateFile.originalFilename);
    //   certificateFileIds.push(fileId);
    //   certificateFileNames.push(certificate.filename); // Optional: Store original filename

    // }

    // const photoId = photo ? await uploadFile(authClient, photo, photo.originalFilename) : null;




          const authClient = await authorize();

          const certificateFileIds = [];
          const certificateFileNames = [];
          for (const certificate of certificateFiles) {
            fileLocation = certificate.path;
            mimeTypeParams = certificate.mimetype;
            const fileId = await uploadFile(authClient, certificate.path, certificate.mimetype , certificate.originalname);
            certificateFileIds.push(fileId.data.id);
            certificateFileNames.push(certificate.originalname); // Optional: Store original filename
          }

          console.log("certificateFileIds = " , certificateFileIds)
          console.log("certificateFileNames = " , certificateFileNames)


          // const certificateFileIds = [];
          // const certificateFileNames = [];
          // for (const certificate of certificateFiles) {
          //   fileLocation = certificate.path;
          //   mimeTypeParams = certificate.mimetype;
          //   const fileId = await uploadFile(authClient, certificate.path, certificate.mimetype);
          //   certificateFileIds.push(fileId); // Push extracted ID here
          //   certificateFileNames.push(certificate.filename); // Optional
          // }


      
          const photoId = await uploadFile(authClient, photo.path, photo.mimetype , photo.originalname);


          console.log("photoId = " , photoId.data.id)
          

        // } catch (error) {
        //   console.error('Error:', error);
        //   res.status(500).send('Error uploading or deleting file');
        // }



      
      // Create a new form instance
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
        companyPersonContactNo: req.body.companyPersonContactNo, // Assuming this field exists
        email_id: req.body.email_id,
        experience: req.body.experience,
        salary: req.body.salary,
        qualifications: req.body.qualifications,
        gender: req.body.gender,
        nationality: req.body.nationality,
        race: req.body.race,
        certificateFiles: certificateFileNames,
        certificateFilesId : certificateFileIds,
       
        
        photo: photo.originalname,
        photoId : photoId.data.id,
      
      });
      // certificateFiles,
        // photo,
  
      const response = await newForm.save();

      if (response.error) {
        // Handle custom error object or message returned by newForm.save()
        return res.status(400).send({ status: 0, message: response.error });
      }
      deleteAllFiles('files'); 
      res.send({ status: 1, message: "Successfully received" });
      console.log("check 1")
       // Include saved data in response (optional)
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send({ status: 0, message: "Internal server error" });
    }
});





router.get('/exportFormPdf', async(req,res)=>{
  try{

      console.log("Hello")
      const formDoc = await WshcmForm.find();
      const data = {
          formDoc : formDoc,
      };

      const filePathName = path.resolve(__dirname , '../ejs_file/htmltopdf.ejs');
      const htmlString = fs.readFileSync(filePathName).toString();
      const options = {
        format: 'A2',
        orientation: 'landscape',
        margin: 0, // Set all margins to 0
        childProcessOptions: {
          env: { OPENSSL_CONF: '/dev/null' },
        },
      }  
      const ejsData = ejs.render(htmlString , data);
      pdf.create(ejsData, options).toFile('./exportedPdfs/userForms.pdf', (err, response) => {
          if (err) {
              console.log("Error->>>>>>>>>", err);
              res.status(500).send(err);
          } else {
              console.log('File generated');
              res.send({ filePath: 'userForms.pdf' }); // Send the file path
          }
      });
     
  }catch(err){
      console.log(err.message)
      res.send({status : 0 , message : err.message})
  }
})


router.get("/exportSingleRecordPdf/:id",async(req , res)=>{
  const formId = req.params.id;
  const formDoc = await WshcmForm.findById(formId);

  const data = {
    data : formDoc,
};
  console.log("data retrieved:", data);

  if(data){
    const filePathName = path.resolve(__dirname , '../ejs_file/individualDocAsPdf.ejs');
      const htmlString = fs.readFileSync(filePathName).toString();
      const options = {
        format: 'Letter',
        childProcessOptions: {
          env: { OPENSSL_CONF: '/dev/null' },
        },
      }  
      const ejsData = ejs.render(htmlString , data);



      pdf.create(ejsData, options).toFile('./exportedPdfs/individualRecord.pdf', (err, response) => {
          if (err) {
              console.log("Error->>>>>>>>>", err);
              res.status(500).send(err);
          } else {
              console.log('File generated');
              res.send({ filePath: 'individualRecord.pdf' }); // Send the file path
          }
      });
  }

})


router.get('/exportFormCsv', async(req,res)=>{
  try{

    console.log("hello")


    const data = await WshcmForm.find();

    // Configure CSV parser with desired fields (adjust as needed)
    const fields = [
      'class_type',
      'participantName',
      'NRIC_No',
      'organization',
      'date_of_birth',
      'sunday_class_timing',
      'work_permit',
      'work_permit_expiry',
      'working_day_timing',
      'contact_no',
      'identification',
      'companyName',
      'companyUEN',
      'companyPersonName',
      'companyPersonEmail',
      'companyPersonContactNo',
      'email_id',
      'experience',
      'salary',
      'qualifications',
      'gender',
      'nationality',
      'race',
      // Include certificateFiles and photo if needed (adjust format)
      'certificateFiles',
      'photo',
    ];
    const csvParser = new Json2csvParser({ fields });

    // Convert data to CSV string
    const csvData = csvParser.parse(data);

    // Set CSV response headers for download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=wshcm-forms.csv');

    // Send CSV data as response
    res.send(csvData);

     
     
  }catch(err){
      console.log(err.message)
      res.send({status : 0 , message : err.message})
  }
})



router.delete('/delete-all', async (req, res) => {
  try {
    // Delete documents from database
    const deletedCount = await WshcmForm.deleteMany({});
    console.log(`Deleted ${deletedCount} forms from database.`);

    // Delete files from Google Drive folder (if successful deletion in database)
    const authClient = await authorize();
    await deleteAllFilesInFolder(authClient, folderId); // Adjust folderId as needed
    console.log('Deletion of files from Google Drive completed.');

    // Respond with success message
    res.send({ status: 1, message: `Deleted ${deletedCount} forms` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting forms');
  }
});


router.delete('/deleteWshcmRecord/:id', async(req,res)=>{
  try {
    const formId = req.params.id;
    const deletedForm = await WshcmForm.findByIdAndDelete(formId);
    const authClient = await authorize();
    console.log("deletedForm = " , deletedForm)

    let certificateFileIds = deletedForm.certificateFilesId;
    let photoId = deletedForm.photoId;

    // multiple certificates are deleting
    for(let certificateFile of certificateFileIds){
      await deleteFile(authClient, certificateFile);
    }
  
    // single photo is deleting
    await deleteFile(authClient, photoId);


    if (deletedForm) {
      console.log(`Form with ID ${formId} deleted successfully`);
      res.send({status : 1 , message :"Record deleted successfully"})
    } else {
      console.log(`Form with ID ${formId} not found`);
      res.send({status : 0 , message :"Record not found"})
    }
  } catch (err) {
    // console.error(err);
    res.send({status : 0 , message :"Record not found or server error"})
  }
})


async function deleteFile(authClient, fileId) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  try {
    await drive.files.delete({ fileId });
    console.log(`File with ID ${fileId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}


async function deleteAllFilesInFolder(authClient, folderId) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  // Function to list files within a folder (helper function)
  async function listFolderContents(folderId, pageToken = '') {
    const response = await drive.files.list({
      pageSize: 100, // Adjust page size as needed
      q: `parents in '${folderId}' and trashed = false`, // Filter untrashed files
      fields: 'nextPageToken, files(id, name)', // Include next page token and file details
      pageToken,
    });

    return response.data;
  }

  try {
    let nextPageToken = '';
    let filesToDelete = [];

    do {
      const folderContents = await listFolderContents(folderId, nextPageToken);
      nextPageToken = folderContents.nextPageToken || ''; // Update next page token

      // Collect file IDs for deletion
      filesToDelete.push(...folderContents.files.map(file => file.id));
    } while (nextPageToken);

    // Delete the collected files in batches (optional)
    if (filesToDelete.length > 0) {
      for (const fileId of filesToDelete) {
        await drive.files.delete({ fileId });
        console.log(`File with ID ${fileId} deleted successfully.`);
      }
    } else {
      console.log(`No files found for deletion in folder ${folderId}.`);
    }
  } catch (error) {
    console.error('Error deleting files:', error);
  }
}

// Usage example (replace with your actual authClient and folder ID)


router.post("/checkFilesUpload" , async(req , res)=>{
  console.log("sucess")
  console.log("req.body = " , req.body.name)
  const { name, certificateFiles, photo } = req.body;

  console.log("  name, certificateFiles, photo  = " ,  name, certificateFiles, photo  )
  res.send({status : 1 , message : "sucess"})
}) 






module.exports = router

// module.exports = submitForm;