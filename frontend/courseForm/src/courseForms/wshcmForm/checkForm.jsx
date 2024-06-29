
import { useState } from 'react';
import axios from 'axios';
import { APIURL } from '../../API_URL/apiUrl';
import { ServerVariables } from '../../SERVER_VARIABLES/serverVariables';


const CheckForm = () => {
    const [name , setName] = useState('');
    const [certificateFiles , setCertificateFiles] = useState([]);
    const [photo , setPhoto] = useState([]);


    const validateForm = async () => {
        // event.preventDefault();

        const formData = {
            name : name ,
            certificateFiles : certificateFiles,
            photo : photo
        }
      
        // const formData = new FormData();
      
        // formData.append('name', name);
      
        // for (let i = 0; i < certificateFiles.length; i++) {
        //   formData.append('certificateFiles', certificateFiles[i]);
        // }
      
        // if (photo) {
        //   formData.append('photo', photo);
        // }
      
        console.log("formData = ", formData); // Log here after data is appended
      
        const response = await axios.post(
          `${APIURL}${ServerVariables.checkFilesUpload}`,
          formData
        );
      
        if (response) {
          console.log(response);
        }
      };
      

    console.log("name " , name)
  return (
    <>

<div className="container px-lg-5 px-2">
       

       <div action="" >
           <div className="form-group py-4">

               <input type="text" onChange={(e)=>setName(e.target.value)} />
               <label htmlFor="">Upload Educational Certificates *</label>
            <input type="file" className='form-control mb-3' name="educationalCertificates"  onChange={(e)=> setCertificateFiles(e.target.files)} multiple required />

            <label htmlFor="">Photo of the Student *</label>
            <input type="file" className='form-control mb-3' name="studentPhoto" onChange={(e)=> setPhoto(e.target.files[0])} required />


            <button onClick={validateForm}>Submit</button>

               </div>
        </div>

        </div>
    
    </>
  )
}

export default CheckForm;