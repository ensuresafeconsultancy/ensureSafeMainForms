import axios from 'axios';
import { APIURL } from '../../API_URL/apiUrl';
import { ServerVariables } from '../../SERVER_VARIABLES/serverVariables';

import swal from 'sweetalert';


export const wshcmApiCall = async (formData, certificateFiles, photo) => {
  try {
    const newFormData = new FormData();

    // Append all key-value pairs from the `formData` object
    for (const [key, value] of Object.entries(formData)) {
      newFormData.append(key, value);
    }

    // Append certificate files (assuming they are in an array)
    for (let i = 0; i < certificateFiles.length; i++) {
        newFormData.append('certificateFiles', certificateFiles[i]);
      }
    // if (certificateFiles && certificateFiles.length > 0) {
    //     certificateFiles.forEach(file => newFormData.append('educationalCertificates', file));
    //   }
    // Append photo file (assuming it's a single file)
    if (photo) {
      newFormData.append('photo', photo);
    }

    const confirmResult = await swal({
      title: "Want to submit?",
      text: "check all the input fields before submitting the form",
      icon: "warning",
      buttons: {
        cancel: "No, cancel it!",
        confirm: {
          text: "Yes, submit it",
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
        title: "Submitting...",
        text: "Please wait...",
        closeModal: false,
        // closeOnConfirm: false, // Prevent automatic closing
        closeOnEsc: false ,  // Prevent user from closing with Esc
        allowOutsideClick: false // Prevent user from clicking outside the dialog
      });

      try {
        const response = await axios.post(
          `${APIURL}${ServerVariables.WshcmFormSubmit}`,
          newFormData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        swal.close(); // Close loading indicator after response

        if (response.data.message) {
          swal("Submitted!", response.data.message, "success");
        } else {
          swal("Error!", "An error occurred while submitting the form.", "error");
        }

        console.log(response.data.message);
        console.table(response.data.userObj);
      } catch (error) {
        swal.close(); // Close loading indicator on error
        console.error('Error:', error.response ? error.response.data.errors : error); // Handle error data if available
        swal("Error!", "An error occurred while submitting the form.", "error");
      }
    } else {
      swal("Your imaginary file is safe!");
    }

    
    // swal({
    //   title: "Want to submit?",
    //   text: "check all the input fields before submitting the form",
    //   icon: "warning",
    //   // buttons: true,
    //   buttons: {
    //     cancel: "No, cancel it!",
    //     confirm: "Yes, submit it"
    //   },
    //   dangerMode: true,
    // })
    // .then(async (willSubmit) => {


    //   if (willSubmit) {


    //     swal({
    //       title: "Submitting...",
    //       text: "Please wait...",
    //       closeOnConfirm: false, // Prevent automatic closing
    //       allowEscapeKey: false,  // Prevent user from closing with Esc
    //       allowOutsideClick: false // Prevent user from clicking outside the dialog
    //     }, async()=>{

    //       const response = await axios.post(
    //         `${APIURL}${ServerVariables.WshcmFormSubmit}`,
    //         newFormData, // Send only the newFormData object
    //         {
    //           headers: { 'Content-Type': 'multipart/form-data' },
    //         }
    //       );
    //       // console.log(response.data.message)
    //       // console.table(response.data.userObj)
    //       if(response){


    //         swal.close(); // Close loading indicator after response

    //         if (response.data.message) {
    //           swal("Submitted!", response.data.message, "success");
    //         } else {
    //           swal("Error!", "An error occurred while submitting the form.", "error");
    //         }

    //         console.log(response.data.message);
    //         console.table(response.data.userObj);


    //         swal("Submitted", {
    //           icon: "success",
    //         });
    //       } else {
    //         swal.close(); // Close loading indicator (in case of errors)
    //         // console.error('Error:', error);
    //         swal("Error!", "An error occurred while submitting the form.", "error");
    //       }

    //     })
        
    //   } else {
    //     swal("Your imaginary file is safe!");
    //   }
    // });

    

    // console.table(response.data); // Log response data for debugging
    // return response; // Return the entire response object

  } catch (error) {
    console.log('Error during API call:', error.response.data.errors);

    // Check if it's a 400 Bad Request error
    // if (error.response && error.response.status === 400) {
    //   // Handle the specific error message (validation errors)
    //   const errorData = error.response.data;
    //   if (errorData && errorData.errors && errorData.errors.length > 0) {
    //     // Display user-friendly error messages for validation errors
    //     errorData.errors.forEach(errorMessage => {
    //       console.log(errorMessage);
    //       // You can display the error message to the user using a toast notification or an alert
    //     });
    //   } else {
    //     // Handle other 400 errors (if applicable)
    //     console.log('Unexpected 400 error:', errorData);
    //   }
    //   throw error; // Re-throw the error for further handling (optional)
    // } else {
    //   // Handle other errors (e.g., network errors, 500 errors)
    //   throw error;
    // }
  }
};









