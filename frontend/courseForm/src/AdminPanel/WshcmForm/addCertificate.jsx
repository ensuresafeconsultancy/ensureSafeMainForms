
import { useState } from "react";
import PropTypes from 'prop-types';

import { uploadCertificateFiles } from "../apiCall";

const AddcertificateFiles = ({ updateFormData , setIsCertificateUploadModalOpen , editFormId}) => {


    const [certificateFiles , setCertificateFiles] = useState([]);
    const closeEditModal = () => {
        setIsCertificateUploadModalOpen(false);
      };

    const validateForm = async(event)=>{
        event.preventDefault();

        const response = await uploadCertificateFiles(certificateFiles , editFormId);

        if(response.status == 200){
          updateFormData(response.data.updatedForm , editFormId)
        }
        setIsCertificateUploadModalOpen(false);
    }


  return (
    <> 
    <div
        className="modal fade show editModal"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-modal="true"
        style={{display : "block"}}
        role = "dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
              <form action="" onSubmit={validateForm}>

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">
                Edit Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>closeEditModal()}
              ></button>
            </div>
            <div className="modal-body">  

            <label htmlFor="Add certificates" className="">Add Certificates :</label>
            <input type="file" className = "form-control  my-3" onChange={(e)=> setCertificateFiles(e.target.files)} multiple required />
            
            
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={()=>closeEditModal()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
               Upload
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>

<div className="modal-backdrop fade show" onClick={()=> closeEditModal()}></div>

</>
  )
}


AddcertificateFiles.propTypes = {
    setIsCertificateUploadModalOpen: PropTypes.func.isRequired,

    editFormId: PropTypes.string.isRequired,

    updateFormData: PropTypes.func.isRequired,
}

export default AddcertificateFiles