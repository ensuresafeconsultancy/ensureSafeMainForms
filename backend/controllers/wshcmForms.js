require('dotenv').config();
const express = new require('express')
const router = express.Router()
const multer  = require('multer')
const WshcmForm  = require('../schema/wshcmFormSchema')

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

const credentials = {
  private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'),
};


async function authorize(){
    const jwtClient = new google.auth.JWT(
      process.env.CLIENT_EMAIL,
        null,
        credentials.private_key,
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
    return true;
  } catch (error) {
    console.log('Error deleting file:', error);
    return false
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
    } else {
      res.status(404).send('File not found or unsupported format');
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error'); // Handle errors
  }
});

// A Function that will upload the desired file to google drive folder

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


// router.get("/fetchWshcmForms/:formName" , async(req,res)=>{
 
//     try{

//       const formName = req.params.formName;
//       let WshcmFormData = await WshcmForm.find({formName : formName});
//       const wshcmFormSchemaFields = Object.keys(WshcmForm.schema.obj);
//       const schemaFieldsWithTypes = WshcmForm.schema.obj;
//       res.send({status : 1 , message:"Welcome to Product Page" , WshcmFormData : WshcmFormData , wshcmFormSchemaFields : wshcmFormSchemaFields , schemaFieldsWithTypes: schemaFieldsWithTypes});  

//     }catch(err){
//       res.send({status : 0 , message : "Error occured in wschm from fetch"})
//     }


// })


router.get("/fetchWshcmForms/:formName", async (req, res) => {
  try {
    const { formName } = req.params; // Destructure formName from request parameters

    console.log(" formName = "  , formName)

    // Validate formName (optional, but recommended for security and UX)
    if (!formName) {
      return res.status(400).send({ status: 0, message: "Missing required parameter: formName" });
    }
    

    // const WshcmFormData = await WshcmForm.find(); // Find forms matching formName
    const WshcmFormData = await WshcmForm.find({ formName : formName }); // Find forms matching formName
    const wshcmFormSchemaFields = Object.keys(WshcmForm.schema.obj);
    const schemaFieldsWithTypes = WshcmForm.schema.obj;


    console.log("WshcmFormData = " , WshcmFormData)
    if(WshcmFormData.length>0){
      return res.send({
        status: 1,
        message: "Fetched Forms",
       WshcmFormData : WshcmFormData , wshcmFormSchemaFields : wshcmFormSchemaFields , schemaFieldsWithTypes: schemaFieldsWithTypes
      });
    }

    res.send({
      status: 0,
      message: "No Forms",
    });
  } catch (err) {
    console.log("Error message = " , err); // Log error for debugging
    res.status(500).send({ status: 0, message: "Error occurred while fetching forms" }); // Send appropriate error response
  }
});



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

router.get("/getWshcmCount", async(req,res)=>{
  try {
    const count = await WshcmForm.countDocuments();

    // const formNameCounts = await WshcmForm.aggregate([
    //   { $group: { _id: "$formName", count: { $sum: 1 } } },
    // ]);

    const formNameCounts = await WshcmForm.aggregate([
      {
        $group: {
          _id: "$formName",
          companyCount: {
            $sum: {
              $cond: { if: { $eq: ["$organization", "Company"] }, then: 1, else: 0 },
            },
          },
          individualCount: {
            $sum: {
              $cond: { if: { $eq: ["$organization", "Individual"] }, then: 1, else: 0 },
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);


    console.log("formNameCounts = " , formNameCounts)



    console.log(`There are ${count} wshcmForm documents in the collection.`);
    // res.send({WshcmCount : count})
    res.send({formNameCounts : formNameCounts})
  } catch (error) {
    console.error("Error counting wshcmForm documents:", error);
    res.send({message : "something went wrong sorrrry"})
  }
})




// const submitForm = async(req,res) =>{

  // upload.fields([{ name: 'certificateFiles', maxCount: 12 }, { name: 'photo', maxCount: 1 }]) ,
router.post("/submitForm", upload.fields([{ name: 'certificateFiles', maxCount: 12 }, { name: 'photos', maxCount: 12 }]) , async (req, res) => {
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
  
      // Contact number (required, string)
      if (!req.body.contact_no || typeof req.body.contact_no !== 'string') {
        validationErrors.push('"contact_no" is required and must be a string.');
      }
  
      // Identification (required, string)
      if (!req.body.identification || typeof req.body.identification !== 'string') {
        validationErrors.push('"identification" is required and must be a string.');
      }
  

      if(req.body.organization == "Company"){
        
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
        

      }
     
        // Email ID (required, string)
        if (!req.body.email_id || typeof req.body.email_id !== 'string') {
            validationErrors.push('"email_id" is required and must be a string.');
        }
        
        // Experience (optional, string)
        if (req.body.experience && typeof req.body.experience !== 'string') {
            validationErrors.push('"experience" must be a string if provided.');
        }

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
        


        console.log("check 1")

        
        // Validate certificate files
        if (req.files['certificateFiles']) {
          for (const file of req.files['certificateFiles']) {
            if (!validateFileSize(file)) {
              validationErrors.push(`Certificate file "${file.originalname}" exceeds the maximum size of 30MB.`);
            }
          }
        }
        
        // Validate certificate files
        if (req.files['photos']) {
          for (const file of req.files['photos']) {
            if (!validateFileSize(file)) {
              validationErrors.push(`Photos file "${file.originalname}" exceeds the maximum size of 30MB.`);
            }
          }
        }
        
        console.log("check 2")
        // Validate photo file size
      //   if (req.files['photos'] && !validateFileSize(req.files['photos'][0])) {
      //     validationErrors.push(`Photo file exceeds the maximum size of 30MB.`);
      // }
  
    
    if (validationErrors.length > 0) {
      // If there are validation errors, return a bad request with the errors
      return res.status(400).send({ status: 0, message: 'Validation errors:', errors: validationErrors });
    }
    
    
    const certificateFiles = req.files['certificateFiles'];
    console.log("check 3")

    const photoFiles = req.files['photos']; // new added
    // const photos = req.files['photos'][0];
    console.log("check 4")

    console.log(req.files['certificateFiles'])
    // console.log("photos = " ,req.files['photos'][0].path)

    for(let certificate of certificateFiles){
      console.log(typeof certificate.path)
    }


    //uploading files to gdrive
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

    const photoFileIds = [];
    const photoFileNames = [];
    for (const photo of photoFiles) {
      fileLocation = photo.path;
      mimeTypeParams = photo.mimetype;
      const fileId = await uploadFile(authClient, photo.path, photo.mimetype , photo.originalname);
      photoFileIds.push(fileId.data.id);
      photoFileNames.push(photo.originalname); // Optional: Store original filename
    }

    console.log("photoFileIds = " , photoFileIds)
    console.log("photoFileNames = " , photoFileNames)

      
    // const photoIds = await uploadFile(authClient, photos.path, photos.mimetype , photos.originalname);

    // console.log("photoId = " , photoId.data.id)
          

      
      // Create a new form instance
    const newForm = new WshcmForm({
      formName : req.body.formName,
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
      
      photos: photoFileNames,
      photoId : photoFileIds,
    
    });

    console.log(newForm)

    // photo: photo.originalname,
    //   photoId : photoId.data.id,
 
  
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




router.get('/exportFormPdf/:formName', async(req,res)=>{
  try{

    const {formName} = req.params;

      console.log("Hello")
      const formDoc = await WshcmForm.find({formName:formName});
      const data = {
          formDoc : formDoc,
      };

      const filePathName = path.resolve(__dirname , '../ejs_file/htmltopdf.ejs');
      const htmlString = fs.readFileSync(filePathName).toString();
      const options = {
        format: 'A2',
        orientation: 'landscape',
        margin: '10mm', // Set all margins to 0
        childProcessOptions: {
          env: { OPENSSL_CONF: '/dev/null' },
        },
      }  
      const ejsData = ejs.render(htmlString , data);

      console.log("EJS Data:", ejsData);
    console.log("Options used for PDF generation:", options);


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


router.get('/exportFormCsv/:formName', async(req,res)=>{
  try{

    const {formName} = req.params;

    console.log("hello")
    const data = await WshcmForm.find({formName:formName});

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
      'photos',
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



router.delete('/delete-all/:formName', async (req, res) => {
  try {
    const { formName } = req.params; // Destructure formName for clarity

    console.log("delete formName = ", formName)

    const deletedRecords = await WshcmForm.find({ formName : formName}, { certificateFilesId: 1, photoId: 1 });

    console.log("deletedRecords = , ",deletedRecords)

 
    if(deletedRecords.length>0){
       // Delete documents from database
     const deletedCount = await WshcmForm.deleteMany({formName : formName});
    console.log(`Deleted ${deletedCount.length} forms from database.`);


    const authClient = await authorize();
    for(let deleteRecord of deletedRecords){
      for(let certificateFileId of deleteRecord.certificateFilesId){
        await deleteFile(authClient, certificateFileId)
      }
      for(let photoId of deleteRecord.photoId){
        await deleteFile(authClient, photoId)
      }
    }

    // Delete files from Google Drive folder (if successful deletion in database)
  
    // await deleteAllFilesInFolder(authClient, folderId); // Adjust folderId as needed
    console.log('Deletion of files from Google Drive completed.');

    // Respond with success message
    // res.send({ status: 1, message: `Deleted hehe forms` });
    res.send({ status: 1, message: `Deleted ${deletedCount} forms` });

    } else {
      return res.send({status : 0 , message : "No forms to delete"})
    }
   

  
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting forms');
  }
});


router.delete('/deleteWshcmRecord/:id', async(req,res)=>{
  try {
    const formId = req.params.id;

    console.log("formId = " , formId)
    const deletedForm = await WshcmForm.findByIdAndDelete(formId);
    const authClient = await authorize();
    console.log("deletedForm = " , deletedForm)

    let certificateFileIds = deletedForm.certificateFilesId;
    let photoId = deletedForm.photoId;

    // multiple certificates are deleting
    for(let certificateFile of certificateFileIds){
      await deleteFile(authClient, certificateFile);
    }

     // multiple Photo are deleting
    for(let photo of photoId){
      await deleteFile(authClient, photo);
    }
  
    // single photo is deleting
    // await deleteFile(authClient, photoId);


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


//edit forms

router.post("/editWshcmRecord/:editFormId", async(req,res)=>{
  try{
    
    if(req.body.organization == "Individual"){
      req.body.companyName = '';
      req.body.companyUEN = '';
      req.body.companyPersonName = '';
      req.body.companyPersonEmail = '';
      req.body.companyPersonContactNo = '';
    } 
    if(req.body.identification == "NRIC"){
      req.body.work_permit = '';
      req.body.work_permit_expiry = '';
    } else {
      req.body.NRIC_No = '';
    }


    console.log(req.body);
    const updatedWshcmForm = await WshcmForm.findByIdAndUpdate(req.params.editFormId, req.body, { new: true });


    if (!updatedProduct) {
        return res.send({
            message: 'Form not found',
            status: 0
        });
    }
    res.send({
        message: 'Form updated successfully',
        status: 1,
      
    });
    
    // res.send({message : "Success"})
  }catch(err){
    res.send({message : err.message});
  }
})

router.delete("/deleteSingleCertificate/:formId/:certificateIndex", async (req, res) => {
  try {
    const formId = req.params.formId;
    const certificateIndex = parseInt(req.params.certificateIndex); // Ensure valid integer

    // Find the form document using the form ID
    const wshcmForm = await WshcmForm.findOne({ _id: formId });

    if (!wshcmForm) {
      return res.status(404).send({ message: "Form not found" });
    }

    // Validate certificate index within bounds
    if (certificateIndex < 0 || certificateIndex >= wshcmForm.certificateFilesId.length) {
      return res.status(400).send({ message: "Invalid certificate index" });
    }

    // Extract the certificate details to be deleted
    const certificateFileIdToDelete = wshcmForm.certificateFilesId[certificateIndex];
    const certificateFileToDelete = wshcmForm.certificateFiles[certificateIndex];

    
    console.log("certificateFileIdToDelete = " , certificateFileIdToDelete)
    console.log("certificateFileToDelete = " , certificateFileToDelete)
    
    try{
      const authClient = await authorize();
      await deleteFile(authClient, certificateFileIdToDelete);
     
      wshcmForm.certificateFilesId.splice(certificateIndex, 1);
      wshcmForm.certificateFiles.splice(certificateIndex, 1);
  
      // Save the updated form document
      const updatedForm = await wshcmForm.save();
  
      res.send({ message: `Certificate ${certificateFileToDelete} deleted successfully` , updatedForm : updatedForm });
      
    } catch(err){
      return res.status(400).send({message : "File not found"})
    }

    // Update the arrays using splice to remove the specified element
   
  
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting certificate" });
  }
});

router.delete("/deleteSinglePhoto/:formId/:photoIndex", async (req, res) => {
  try {
    const formId = req.params.formId;
    const photoIndex = parseInt(req.params.photoIndex); // Ensure valid integer

    // Find the form document using the form ID
    const wshcmForm = await WshcmForm.findOne({ _id: formId });

    if (!wshcmForm) {
      return res.status(404).send({ message: "Form not found" });
    }

    // Validate certificate index within bounds
    if (photoIndex < 0 || photoIndex >= wshcmForm.photoId.length) {
      return res.status(400).send({ message: "Invalid photo index" });
    }

    // Extract the certificate details to be deleted
    const photoFileIdToDelete = wshcmForm.photoId[photoIndex];
    const photoFileToDelete = wshcmForm.photos[photoIndex];

    
    console.log("photoFileIdToDelete = " , photoFileIdToDelete)
    console.log("photoFileToDelete = " , photoFileToDelete)
    
    try{
      const authClient = await authorize();
      await deleteFile(authClient, photoFileIdToDelete);
     
      wshcmForm.photoId.splice(photoIndex, 1);
      wshcmForm.photos.splice(photoIndex, 1);
  
      // Save the updated form document
      const updatedForm = await wshcmForm.save();
  
      res.send({ message: `Photo ${photoFileToDelete} deleted successfully` , updatedForm : updatedForm });
      
    } catch(err){
      return res.status(400).send({message : "File not found"})
    }

    // Update the arrays using splice to remove the specified element
   
  
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting certificate" });
  }
});




router.post("/uploadCertificateFiles/:formId" , upload.fields([{ name: 'certificateFiles', maxCount: 12 }]) , async(req,res)=>{
  try{


    const validationErrors = [];

    if (req.files['certificateFiles']) {
      for (const file of req.files['certificateFiles']) {
        if (!validateFileSize(file)) {
          validationErrors.push(`Certificate file "${file.originalname}" exceeds the maximum size of 30MB.`);
        }
      }
    }

    if (validationErrors.length > 0) {
      // If there are validation errors, return a bad request with the errors
      return res.status(400).send({ status: 0, message: 'Validation errors:', errors: validationErrors });
    }


    const certificateFiles = req.files['certificateFiles'];
    console.log("check 3")
  
    console.log(req.files['certificateFiles'])
   
    for(let certificate of certificateFiles){
      console.log(typeof certificate.path)
    }

    //uploading files to gdrive
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



    const formId = req.params.formId;

    const wshcmForm = await WshcmForm.findByIdAndUpdate(formId, {
      $push: {
        certificateFilesId: certificateFileIds,
        certificateFiles: certificateFileNames,
      },
    }, { new: true }); // Ensure you get the updated document

    if (!wshcmForm) {
      return res.status(404).send({ message: "Form not found" });
    }
    deleteAllFiles('files'); 

    res.send({ message: "Certificate files uploaded successfully" , updatedForm : wshcmForm });

  }catch(error){

    return res.status(404).send({ message: "Something went wrong sorrrry" });

  }

})



router.post("/uploadPhotos/:formId" , upload.fields([{ name: 'photos', maxCount: 12 }]) , async(req,res)=>{
  try{


    const validationErrors = [];

    if (req.files['photos']) {
      for (const file of req.files['photos']) {
        if (!validateFileSize(file)) {
          validationErrors.push(`photos file "${file.originalname}" exceeds the maximum size of 30MB.`);
        }
      }
    }

    if (validationErrors.length > 0) {
      // If there are validation errors, return a bad request with the errors
      return res.status(400).send({ status: 0, message: 'Validation errors:', errors: validationErrors });
    }


    const photoFiles = req.files['photos'];
    console.log("check 3")
  
    console.log(req.files['photos'])
   
    for(let photo of photoFiles){
      console.log(typeof photo.path)
    }

    //uploading files to gdrive
    const authClient = await authorize();

    const photoFileIds = [];
    const photoFileNames = [];
    for (const photo of photoFiles) {
      fileLocation = photo.path;
      mimeTypeParams = photo.mimetype;
      const fileId = await uploadFile(authClient, photo.path, photo.mimetype , photo.originalname);
      photoFileIds.push(fileId.data.id);
      photoFileNames.push(photo.originalname); // Optional: Store original filename
    }

    console.log("photoFileIds = " , photoFileIds)
    console.log("photoFileNames = " , photoFileNames)



    const formId = req.params.formId;

    const wshcmForm = await WshcmForm.findByIdAndUpdate(formId, {
      $push: {
        photoId: photoFileIds,
        photos: photoFileNames,
      },
    }, { new: true }); // Ensure you get the updated document

    if (!wshcmForm) {
      return res.status(404).send({ message: "Form not found" });
    }
    deleteAllFiles('files'); 

    res.send({ message: "Photo files uploaded successfully" , updatedForm : wshcmForm });

  }catch(error){

    return res.status(404).send({ message: "Something went wrong sorrrry" });

  }

})




router.post("/checkFilesUpload" , async(req , res)=>{
  console.log("sucess")
  console.log("req.body = " , req.body.name)
  const { name, certificateFiles, photo } = req.body;

  console.log("  name, certificateFiles, photo  = " ,  name, certificateFiles, photo  )
  res.send({status : 1 , message : "sucess"})
}) 



module.exports = router;