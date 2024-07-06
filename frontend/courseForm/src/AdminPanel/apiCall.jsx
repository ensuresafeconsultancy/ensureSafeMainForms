import axios from 'axios'
import { APIURL } from '../API_URL/apiUrl';
import {ServerVariables} from '../SERVER_VARIABLES/serverVariables';
import { saveAs } from 'file-saver';
import swal from 'sweetalert';


export const fetchWshcmData = async()=>{
    try{
        const response = await axios.get(`${APIURL}${ServerVariables.fetchWshcmFormData}`);
        console.log(response.data)
        if(response && response.data){
            if(response.data.status == 1){
                return response;
            }
        }
       
    } catch(err){
        console.log(err);
    }
}

export const downloadFile = async (file , fileId) => {

  try{
    let url = `https://drive.usercontent.google.com/u/3/uc?id=${fileId}&export=download`;
    window.open(url);
  } catch (error) {
    console.error("Error during file download:", error);
  }


    // try {
    //   const response = await axios.get(`${APIURL}/${file}`, {
    //     responseType: "blob", // Important
    //   });
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", file); // or any other extension
    //   document.body.appendChild(link);
    //   link.click();
    //   window.URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error("Error during file download:", error);
    // }
  };

export const openFile = async(file , fileId) => {

  try {

    swal({
      title: `${file} is opening`,
      text: "Please wait...",
      closeModal: false,
      // closeOnConfirm: false, // Prevent automatic closing
      closeOnEsc: false ,  // Prevent user from closing with Esc
      allowOutsideClick: false // Prevent user from clicking outside the dialog
    });


    console.log("fileId = " , fileId)
    const response = await axios.get(`${APIURL}${ServerVariables.openFile}/${fileId}`);
    swal.close();
    console.log("response = " , response)
    if(response){
      console.log(response.data.downloadUrl)
      const originalFileId = response.data.downloadUrl;

      let url = `https://drive.google.com/file/d/${originalFileId}`; // Use the file path from the backend
      // if(fileType == 'photo'){
      // } else {
      //   url = `https://drive.google.com/file/d/${originalFileId}/view`; // Use the file path from the backend
      // }
      window.open(url, '_blank'); // Open the PDF in a new tab
    }

  } catch (error) {
    swal.close();
        console.error(error);
    }
  
  // const url = `https://drive.google.com/file/d/${fileId}/view`; // Use the file path from the backend
  //       window.open(url, '_blank'); // Open the PDF in a new tab
  
  // window.open(`${APIURL}/${file}`, "_blank", "noopener");
  };

 export const downloadDocPdf = async () => {
    try {
    
        const response = await axios.get(`${APIURL}${ServerVariables.exportWshcmFormPdf}`);
        const url = `${APIURL}/${response.data.filePath}`; // Use the file path from the backend
        window.open(url, '_blank'); // Open the PDF in a new tab
    } catch (error) {
        console.error(error);
    }
};


// export const downloadDocPdf = async () => {
//   try {
//     const response = await axios.get(`${APIURL}${ServerVariables.exportWshcmFormPdf}`);

//     // Check response status code for success (optional)
//     if (response.status === 200) {
//       const pdfBuffer = response.data; // Assuming response contains the PDF buffer

//       // Option a) Using a Blob
//       const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       window.open(url, '_blank'); // Open the PDF in a new tab

//       // Option b) Using a Download Link (if applicable)
//       // const downloadUrl = response.data; // Assuming response contains the download URL
//       // const link = document.createElement('a');
//       // link.href = downloadUrl;
//       // link.download = 'userForms.pdf'; // Set a custom filename if needed
//       // document.body.appendChild(link);
//       // link.click();
//       // document.body.removeChild(link);

//       // Revoke object URL after a while (for option a)
//       setTimeout(() => URL.revokeObjectURL(url), 10000); // Adjust timeout as needed
//     } else {
//       console.error(`Error downloading PDF: ${response.statusText}`);
//       // Handle download error (show message to user, etc.)
//     }

//   } catch (error) {
//     console.error(error);
//     // Handle other errors (network issues, etc.)
//   }
// };



 export const downloadDocCsv = async () => {
  
    try {
    
        const response = await axios.get(`${APIURL}${ServerVariables.exportWshcmFormCsv}`);
        const csvData = response.data; // Assuming the response contains the CSV data

        // Create a Blob object with the CSV data
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    
        // Save the Blob object as a file using FileSaver.js
        saveAs(blob, 'wshcm-forms.csv');
        // const url = `${APIURL}/${response.data.filePath}`; // Use the file path from the backend
        // window.open(url, '_blank'); // Open the PDF in a new tab
    } catch (error) {
        console.error(error);
    }
};

export const downloadRecord = async (recordId)=>{
  try{

    swal({
      title: "Downloading in...",
      text: "Please wait...",
      closeModal: false,
      // closeOnConfirm: false, // Prevent automatic closing
      closeOnEsc: false ,  // Prevent user from closing with Esc
      allowOutsideClick: false // Prevent user from clicking outside the dialog
    });

    const response = await axios.get(`${APIURL}${ServerVariables.exportSingleRecord}/${recordId}`);

    swal.close();

    // console.log(response)
    const url = `${APIURL}/${response.data.filePath}`; // Use the file path from the backend
    window.open(url, '_blank'); // Open the PDF in a new tab
  }catch(err){
    console.log(err);
  }
}

export const deleteAllWshcmData = async ()=>{
  try{


    const confirmResult = await swal({
      title: "Are you sure , want to delete all records?",
      text: "This will be permanently delete all the records",
      icon: "warning",
      buttons: {
        cancel: "No, cancel it!",
        confirm: {
          text: "Yes, delete it",
          closeModal: false // Close the dialog only when explicitly closed by user or timer
        }
      },
      dangerMode: true,
      closeOnEsc: false, // New option for preventing Escape key closing
      allowOutsideClick: false
    });

    console.log("confirmResult = ", confirmResult);
    if (confirmResult) {
      // Show loading indicator
      swal({
        title: "deleting all data and files...",
        text: "Please wait...",
        closeModal: false,
        // closeOnConfirm: false, // Prevent automatic closing
        closeOnEsc: false ,  // Prevent user from closing with Esc
        allowOutsideClick: false // Prevent user from clicking outside the dialog
      });

      try {
        const response = await axios.delete(`${APIURL}${ServerVariables.deleteAllWshcmData}`);


        if(response){
          console.log(response.data)
        }
        swal.close(); // Close loading indicator after response
        swal("Success!", "All the data deleted successfully", "success").then(() => {
          window.location.href="/admin"
            });
        

        return response;

      } catch (error) {
        swal.close(); // Close loading indicator on error
        console.error('Error:', error.response ? error.response.data.errors : error); // Handle error data if available
        swal("Error!", "An error occurred while deleting the record.", "error");
      }
    } else {
      swal("Record not deleted");
    }



    // const response = await axios.delete(`${APIURL}${ServerVariables.deleteAllWshcmData}`);
    // console.log(response.data)
    // const url = `${APIURL}/${response.data.filePath}`; // Use the file path from the backend
    // window.open(url, '_blank'); // Open the PDF in a new tab
  }catch(err){
    console.log(err);
  }
}

export const adminLogin = async (formData)=>{

  

  try{

    swal({
      title: "Logging in...",
      text: "Please wait...",
      closeModal: false,
      // closeOnConfirm: false, // Prevent automatic closing
      closeOnEsc: false ,  // Prevent user from closing with Esc
      allowOutsideClick: false // Prevent user from clicking outside the dialog
    });


    const response = await axios.post(`${APIURL}${ServerVariables.adminLoginPath}` , formData);

    swal.close();

    console.log(response.data);
    if(response.data.status){
      localStorage.setItem('isAuth' , response.data.token)

      swal("Welcome", response.data.message, "success")
        .then(() => {
          window.location.href="/admin"
            });
        }

    else{
        swal("Error", response.data.message, "warning")
        .then(() => {
        localStorage.setItem('isAuth' , '')
        });
    }
    // const url = `${APIURL}/${response.data.filePath}`; // Use the file path from the backend
    // window.open(url, '_blank'); // Open the PDF in a new tab
  }catch(err){
    swal.close();
    console.log(err);
  }
}


export const adminRegister = async (formData)=>{
  try{
    // const response = await axios.post(`${APIURL}${ServerVariables.adminRegisterPath}` , formData);


    axios.post(`${APIURL}${ServerVariables.adminRegisterPath}` , formData)
            .then(function (response) {
                console.log(response.data);
                if(response.data.status){
                  // localStorage.setItem('isAuth' , true)
                  alert("registered successfully ")
                  window.location.href="/admin"
                  swal("Welcome", response.data.message, "success")
                  .then(() => {
                
                    });
                }
                else{
                swal("Error", response.data.message, "warning")
                .then(() => {
                  localStorage.setItem('isAuth' , false)
                  });
                }
            })
            .catch(function (error) {
                localStorage.setItem('isAuth' , false)
                console.log("this is SuperUserError" , error);
            });

    // const url = `${APIURL}/${response.data.filePath}`; // Use the file path from the backend
    // window.open(url, '_blank'); // Open the PDF in a new tab
  }catch(err){
    console.log(err);
  }
}

export const deleteRecord = async (formId)=>{
  try{

    const confirmResult = await swal({
      title: "Are sure to delete this record?",
      text: "This will be permanently delete the record",
      icon: "warning",
      buttons: {
        cancel: "No, cancel it!",
        confirm: {
          text: "Yes, delete it",
          closeModal: false // Close the dialog only when explicitly closed by user or timer
        }
      },
      dangerMode: true,
      closeOnEsc: false, // New option for preventing Escape key closing
      allowOutsideClick: false
    });

    if (confirmResult) {
      // Show loading indicator
      swal({
        title: "deleting...",
        text: "Please wait...",
        closeModal: false,
        // closeOnConfirm: false, // Prevent automatic closing
        closeOnEsc: false ,  // Prevent user from closing with Esc
        allowOutsideClick: false // Prevent user from clicking outside the dialog
      });

      try {
        const response = await axios.delete(`${APIURL}${ServerVariables.deleteWshcmRecord}/${formId}`);

        swal.close(); // Close loading indicator after response

        return response;
        // if (response.data.message) {
        //   swal("Deleted!", response.data.message, "success");
        //   return true;
        // } else {
        //   swal("Error!", "An error occurred while deleting the record.", "error");
        //   return false;
        // }

        // console.log(response.data.message);
        // console.table(response.data.userObj);
      } catch (error) {
        swal.close(); // Close loading indicator on error
        console.error('Error:', error.response ? error.response.data.errors : error); // Handle error data if available
        swal("Error!", "An error occurred while deleting the record.", "error");
      }
    } 
    // else {
    //   swal("Record not deleted");
    // }
    
   
  }catch(err){
    console.log(err);
  }
}



export const wshcmEditForm = async(editFormData , editFormId)=>{

  try{

    const response = await axios.post(`${APIURL}${ServerVariables.editWshcmRecord}/${editFormId}` , editFormData);

    if(response.status == 200){
      swal("Edited", response.data.message, "success")
      return true;
    } else {
      return false;
    }

  } catch(err){
    console.log(err);
  }

}

export const deleteSingleCertificate = async (formId , certificateIndex)=>{


  try{
    const confirmResult = await swal({
      title: "Are sure to delete this Certificate file?",
      text: "This will be permanently delete the certificate",
      icon: "warning",
      buttons: {
        cancel: "No, cancel it!",
        confirm: {
          text: "Yes, delete it",
          closeModal: false // Close the dialog only when explicitly closed by user or timer
        }
      },
      dangerMode: true,
      closeOnEsc: false, // New option for preventing Escape key closing
      allowOutsideClick: false
    });

    if (confirmResult) {
      // Show loading indicator
      swal({
        title: "deleting...",
        text: "Please wait...",
        closeModal: false,
        // closeOnConfirm: false, // Prevent automatic closing
        closeOnEsc: false ,  // Prevent user from closing with Esc
        allowOutsideClick: false // Prevent user from clicking outside the dialog
      });

      try {
        const response = await axios.delete(`${APIURL}${ServerVariables.deleteSingleCertificate}/${formId}/${certificateIndex}`); 


        console.log(response.status)

        if(response.status ==200){
          console.log("success ")
        } else if(response.status ==400){
          console.log("error ")
        }

        swal.close(); // Close loading indicator after response

        swal("Deleted", response.data.message, "success")
       


        return response;
    
      } catch (error) {
        swal.close(); // Close loading indicator on error
        console.error('Error:', error.response ? error.response.data.errors : error); // Handle error data if available
        swal("Error!", "An error occurred while deleting the record.", "error");

        if(error.response.status == 400){
          console.log("please check gdrive")
    
        } else if(error.response.status == 500){
          console.log("its server error check backend")
        }
      }
    }
   

  }catch(err){
    console.log(err.response.status)
    console.log(err.message)
  }
}
export const deleteSinglePhoto = async (formId , photoIndex)=>{


  try{
    const confirmResult = await swal({
      title: "Are sure to delete this Photo file?",
      text: "This will be permanently delete the Photo",
      icon: "warning",
      buttons: {
        cancel: "No, cancel it!",
        confirm: {
          text: "Yes, delete it",
          closeModal: false // Close the dialog only when explicitly closed by user or timer
        }
      },
      dangerMode: true,
      closeOnEsc: false, // New option for preventing Escape key closing
      allowOutsideClick: false
    });

    if (confirmResult) {
      // Show loading indicator
      swal({
        title: "deleting...",
        text: "Please wait...",
        closeModal: false,
        // closeOnConfirm: false, // Prevent automatic closing
        closeOnEsc: false ,  // Prevent user from closing with Esc
        allowOutsideClick: false // Prevent user from clicking outside the dialog
      });

      try {
        const response = await axios.delete(`${APIURL}${ServerVariables.deleteSinglePhoto}/${formId}/${photoIndex}`); 


        console.log(response.status)

        if(response.status ==200){
          console.log("success ")
        } else if(response.status ==400){
          console.log("error ")
        }

        swal.close(); // Close loading indicator after response

        swal("Deleted", response.data.message, "success")
       


        return response;
    
      } catch (error) {
        swal.close(); // Close loading indicator on error
        console.error('Error:', error.response ? error.response.data.errors : error); // Handle error data if available
        swal("Error!", "An error occurred while deleting the record.", "error");

        if(error.response.status == 400){
          console.log("please check gdrive")
    
        } else if(error.response.status == 500){
          console.log("its server error check backend")
        }
      }
    }

  }catch(err){
    console.log(err.response.status)
    console.log(err.message)
  }
}



export const uploadCertificateFiles = async(certificateFiles , formId)=>{

  try {
    const newFormData = new FormData();

    // Append certificate files (assuming they are in an array)
    for (let i = 0; i < certificateFiles.length; i++) {
        newFormData.append('certificateFiles', certificateFiles[i]);
      }

      swal({
        title: "Submitting...",
        text: "Please wait...",
        closeModal: false,
        // closeOnConfirm: false, // Prevent automatic closing
        closeOnEsc: false ,  // Prevent user from closing with Esc
        allowOutsideClick: false // Prevent user from clicking outside the dialog
      });


      try {
        const response = await axios.post(
          `${APIURL}${ServerVariables.uploadCertificateFiles}/${formId}`,newFormData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        swal.close(); // Close loading indicator after response

        if (response.data.message) {
          swal("Certificates Uploaded!", response.data.message, "success");
        } else {
          swal("Error!", "An error occurred while Uploading the certificates.", "error");
        }

        console.log(response.data.message);
        console.table(response.data.userObj);

        return response;
      } catch (error) {
        swal.close(); // Close loading indicator on error
        console.error('Error:', error.response ? error.response.data.errors : error); // Handle error data if available
        swal("Error!", "An error occurred while submitting the form.", "error");
      }




  } catch(error){
    console.log(error.message)
  }

}
export const uploadPhotoFile = async(photos , formId)=>{

  try {
    const newFormData = new FormData();

    // Append certificate files (assuming they are in an array)
    for (let i = 0; i < photos.length; i++) {
        newFormData.append('photos', photos[i]);
      }

      swal({
        title: "Submitting...",
        text: "Please wait...",
        closeModal: false,
        // closeOnConfirm: false, // Prevent automatic closing
        closeOnEsc: false ,  // Prevent user from closing with Esc
        allowOutsideClick: false // Prevent user from clicking outside the dialog
      });


      try {
        const response = await axios.post(
          `${APIURL}${ServerVariables.uploadPhotos}/${formId}`,newFormData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        swal.close(); // Close loading indicator after response

        if (response.data.message) {
          swal("Photos Uploaded!", response.data.message, "success");
        } else {
          swal("Error!", "An error occurred while Uploading the photos.", "error");
        }

        console.log(response.data.message);
        console.table(response.data.userObj);

        return response;
      } catch (error) {
        swal.close(); // Close loading indicator on error
        console.error('Error:', error.response ? error.response.data.errors : error); // Handle error data if available
        swal("Error!", "An error occurred while submitting the form.", "error");
      }




  } catch(error){
    console.log(error.message)
  }

}

