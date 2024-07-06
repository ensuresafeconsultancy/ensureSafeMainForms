
import { useState } from "react";
import PropTypes from 'prop-types';

import { uploadPhotoFile } from "../apiCall";

const AddPhotos = ({ updateFormData, setIsPhotoUploadModalOpen , editFormId}) => {


    const [photos , setPhotos] = useState([]);

    const closeEditModal = () => {
        setIsPhotoUploadModalOpen(false);
      };

    const validateForm = async(event)=>{
        event.preventDefault();

        const response = await uploadPhotoFile(photos , editFormId);

        if(response.status == 200){
          updateFormData(response.data.updatedForm , editFormId)
        }
        setIsPhotoUploadModalOpen(false);
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
                Add photo
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

            <label htmlFor="Add photo">Add Photo :</label>
            <input type="file" className='form-control my-3' name="studentPhoto" onChange={(e)=> setPhotos(e.target.files)} multiple required />

            
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


AddPhotos.propTypes = {
    setIsPhotoUploadModalOpen: PropTypes.func.isRequired,

    editFormId: PropTypes.string.isRequired,

    updateFormData: PropTypes.func.isRequired,
}

export default AddPhotos;