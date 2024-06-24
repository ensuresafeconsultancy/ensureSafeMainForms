import axios from 'axios';
import { APIURL } from '../../API_URL/apiUrl';
import { ServerVariables } from '../../SERVER_VARIABLES/serverVariables';

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

    const response = await axios.post(
      `${APIURL}${ServerVariables.WshcmFormSubmit}`,
      newFormData, // Send only the newFormData object
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    console.table(response.data); // Log response data for debugging
    return response; // Return the entire response object

  } catch (error) {
    console.error('Error during API call:', error); // Log the error for debugging
    throw error; // Re-throw the error for proper error handling
  }
};
