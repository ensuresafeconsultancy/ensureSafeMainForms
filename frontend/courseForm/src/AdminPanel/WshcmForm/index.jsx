import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import {
  fetchWshcmData,
  downloadFile,
  openFile,
  downloadRecord,
  deleteRecord,
  deleteSingleCertificate,
  deleteSinglePhoto,
} from "../apiCall";
import LoadingForm from "../../assets/Loading/table-loader.gif";
import Header from "./Header";

import { MdDownloadForOffline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import EditFormData from "./editFormData";
import AddcertificateFiles from "./addCertificate";
import AddPhotos from "./addPhoto";

import swal from "sweetalert";

import { IoAddCircleSharp } from "react-icons/io5";

function AdminFormLists({formName , addFormUrl}) {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state (true)


  const [showFormData, setShowFormData] = useState({});

  const handleOpenModal = (recordId) => {
    console.log("recordId = ", recordId);

    for (let formDataOne of formData) {
      if (formDataOne._id == recordId) {
        const excluded = [
          "_id",
          "photoId",
          "certificateFilesId",
          "certificateFiles",
          "photos",
          "__v",
        ];
        const filteredEntries = Object.entries(formDataOne).filter(
          ([key]) => !excluded.includes(key)
        );

        setShowFormData(Object.fromEntries(filteredEntries));
      }
    }
  };

  console.log("formDataFound show = ", showFormData);


  console.table(formData);

  const fetchData = async (formName) => {
    try {
      setIsLoading(true); // Set loading state to true before fetch
      const response = await fetchWshcmData(formName);
      console.log("Form list useEffect");
      if (response && response.status === 200) {

          setFormData(response.data.WshcmFormData);
  
      } else {
        console.log("Error fetching data:", response);
        setFormData([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setFormData([]);
    } finally {
      setIsLoading(false); // Set loading state to false after fetch
    }
  };

  // Execute `fetchData` on initial render and on click of `refreshBox`
  useEffect(() => {
    fetchData(formName);
  }, [formName]); // Empty dependency array for initial fetch

  const handleRefreshClick = (formName) => {
    fetchData(formName);
  };
  

  const deleteSingleRecord = async (recordId) => {
    const response = await deleteRecord(recordId);
    if (response.data.status === 1) {
      let sortFormData = formData.filter((item) => item._id != recordId);
      setFormData(sortFormData);
      swal("Deleted!", response.data.message, "success");
    } else {
      swal("Error!", "An error occurred while deleting the record.", "error");
    }
  };

  const deleteCertificate = async(itemId , index)=>{
    const response = await deleteSingleCertificate(itemId , index)
    if(response.status ==200){
      updateFormData(response.data.updatedForm , itemId)
    }
  }
  const deletePhoto = async(itemId , index)=>{
    const response = await deleteSinglePhoto(itemId , index)
    if(response.status ==200){
      updateFormData(response.data.updatedForm , itemId)
    }
  }

  const updateFormData = (updatedForm , formId)=>{

    const index = formData.findIndex(item => item._id === formId);
    if (index !== -1) {
      const updatedForms = [...formData]; // Create a copy of the forms array
    
      updatedForms[index] = updatedForm; // Replace the old form with the editFormObj data
      // Update the forms state with the updated data 
      setFormData(updatedForms);
    }
  }


  const handleEditClick = (item , formId) => {
    setSelectedFormData(item);
    setEditFormId(formId);
    setIsEditModalOpen(true);
  };

  const handleCertificateUpload = (item , formId)=>{
    setSelectedFormData(item);
    setEditFormId(formId);
    setIsCertificateUploadModalOpen(true);
  }
  const handlePhotoUpload = (item , formId)=>{
    setEditFormId(formId);
    setIsPhotoUploadModalOpen(true);
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [editFormId , setEditFormId] = useState('');

  const [isCertificateUploadModalOpen, setIsCertificateUploadModalOpen] = useState(false);
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false);

  return (
    <div className="">
      <Header handleRefreshClick={handleRefreshClick} formName={formName} addFormUrl={addFormUrl}/>

      <div
        className="modal fade viewFormDataModel"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >

        {/* modal for viewing data */}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
              <h5 className="modal-title fw-bold" id="exampleModalLabel">
                Participant Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{overflowX : 'auto'}}>
              {Object.keys(showFormData).length > 0 ? (
                <table className="data-table">
                  <thead></thead>
                  <tbody>
                    {Object.entries(showFormData).map(([key, value]) => (
                      <tr key={key}>
                        <td className="fw-bold">
                          {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </td>
                        <td>{value != "" ? value : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data found for this participant.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

     
        
    {/* modal for Editing data */}
    {isEditModalOpen && 

      <EditFormData updateFormData={updateFormData} selectedFormData={selectedFormData}  setSelectedFormData={setSelectedFormData} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen}  editFormId={editFormId} />
    }

    {isCertificateUploadModalOpen && 

      <AddcertificateFiles updateFormData={updateFormData} setIsCertificateUploadModalOpen={setIsCertificateUploadModalOpen}  editFormId={editFormId} />
    }

    {isPhotoUploadModalOpen && 

      <AddPhotos updateFormData={updateFormData} setIsPhotoUploadModalOpen={setIsPhotoUploadModalOpen}  editFormId={editFormId} />
    }



 

      <div className="px-lg-5 px-2 wshcmFormContainer">
        {isLoading ? ( // Conditionally render loading component
          <img src={LoadingForm} className="img-fluid" />
        ) : (
          <table className="table table-hover table-bordered formTableCustom ">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Participant Name</th>
                <th scope="col">Class type</th>
                <th scope="col">Organization</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email Id</th>
                <th scope="col">Nationality</th>
                <th scope="col">Certificate Files</th>
                <th scope="col">Signature Files</th>
                <th scope="col">Photo</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {formData && formData.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.participantName}</td>
                        <td>{item.class_type}</td>
                        <td>{item.organization}</td>
                        <td>{item.contact_no}</td>
                        <td>{item.email_id}</td>
                        <td>{item.nationality}</td>
                        <td>
                          {item.certificateFiles &&
                            item.certificateFiles.map((itemFile, index) => {
                              return (
                                <div
                                  className="d-flex justify-content-between align-items-center"
                                  key={index}
                                >
                                  <span
                                    onClick={() =>
                                      openFile(
                                        itemFile,
                                        item.certificateFilesId[index]
                                      )
                                    }
                                    className="text-truncate cursor_pointer fileName "
                                    style={{ maxWidth: "150px" }}
                                  >
                                    {itemFile.substr(0, 23).concat("...") +
                                      itemFile.split(".")[1]}
                                  </span>


                            <div className="d-flex justify-content-center align-items-center">

                                  <span
                                    onClick={() =>
                                      downloadFile(
                                        itemFile,
                                        item.certificateFilesId[index]
                                      )
                                    }
                                    className="text-success cursor_pointer  rounded-circle download_bg"
                                  >
                                    <MdDownloadForOffline className="downloadIcon rounded-circle" />

                                    
                                  </span>
                                  <span className="text-success cursor_pointer  rounded-circle download_bg">
                                      <MdDelete
                                  className="actionIcon p-2 rounded-circle cursor_pointer deleteIcon"
                                  onClick={() => deleteCertificate(item._id , index)}
                                />

                                  </span>


                                  </div>
                                 
                                </div>
                              );
                            })}
                            <div className="d-flex justify-content-center align-items-center">
                              <span className="addCertificateIconBox d-flex justify-content-center align-items-center rounded-circle">

                              <IoAddCircleSharp className="addCertificateIcon cursor_pointer" onClick={()=> handleCertificateUpload(item , item._id)} />
                              </span>
                              </div>
                            {/* <td><div className="d-flex justify-content-center"><IoAddCircleSharp /></div></td> */}
                        </td>
                        <td>
                          {item.signatureFile && <div
                                  className="d-flex justify-content-between align-items-center"
                                  key={index}
                                >
                                  <span
                                    onClick={() =>
                                      openFile(
                                        item.signatureFile,
                                        item.signatureFileId
                                      )
                                    }
                                    className="text-truncate cursor_pointer fileName "
                                    style={{ maxWidth: "150px" }}
                                  >
                                    {item.signatureFile.substr(0, 23).concat("...") +
                                      item.signatureFile.split(".")[1]}
                                  </span>


                            <div className="d-flex justify-content-center align-items-center">

                                  <span
                                    onClick={() =>
                                      downloadFile(
                                        item.signatureFile,
                                        item.signatureFileId
                                      )
                                    }
                                    className="text-success cursor_pointer  rounded-circle download_bg"
                                  >
                                    <MdDownloadForOffline className="downloadIcon rounded-circle" />

                                    
                                  </span>
                                  {/* <span className="text-success cursor_pointer  rounded-circle download_bg">
                                      <MdDelete
                                  className="actionIcon p-2 rounded-circle cursor_pointer deleteIcon"
                                  onClick={() => deletePhoto(item._id , index)}
                                />

                                  </span> */}


                                  </div>
                                 
                                </div>}
                        </td>
                        <td>
                          {item.photos &&
                            item.photos.map((itemFile, index) => {
                              return (
                                <div
                                  className="d-flex justify-content-between align-items-center"
                                  key={index}
                                >
                                  <span
                                    onClick={() =>
                                      openFile(
                                        itemFile,
                                        item.photoId[index]
                                      )
                                    }
                                    className="text-truncate cursor_pointer fileName "
                                    style={{ maxWidth: "150px" }}
                                  >
                                    {itemFile.substr(0, 23).concat("...") +
                                      itemFile.split(".")[1]}
                                  </span>


                            <div className="d-flex justify-content-center align-items-center">

                                  <span
                                    onClick={() =>
                                      downloadFile(
                                        itemFile,
                                        item.photoId[index]
                                      )
                                    }
                                    className="text-success cursor_pointer  rounded-circle download_bg"
                                  >
                                    <MdDownloadForOffline className="downloadIcon rounded-circle" />

                                    
                                  </span>
                                  <span className="text-success cursor_pointer  rounded-circle download_bg">
                                      <MdDelete
                                  className="actionIcon p-2 rounded-circle cursor_pointer deleteIcon"
                                  onClick={() => deletePhoto(item._id , index)}
                                />

                                  </span>


                                  </div>
                                 
                                </div>
                              );
                            })}
                            <div className="d-flex justify-content-center align-items-center">
                              <span className="addCertificateIconBox d-flex justify-content-center align-items-center rounded-circle">

                              <IoAddCircleSharp className="addCertificateIcon cursor_pointer" onClick={()=> handlePhotoUpload(item , item._id)} />
                              </span>
                              </div>
                            {/* <td><div className="d-flex justify-content-center"><IoAddCircleSharp /></div></td> */}
                        </td>
                        
                        <td>
                          <div className="d-flex gap-1">
                            <FaEye
                              className="actionIcon p-2 rounded-circle cursor_pointer"
                              onClick={() => handleOpenModal(item._id)}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            />
                            {/* <FaEye className='actionIcon p-2 rounded-circle cursor_pointer' onClick={()=>handleOpenModal(item._id)} /> */}

                            <CiEdit className="actionIcon p-2 rounded-circle cursor_pointer" onClick={() => handleEditClick(item , item._id)}  data-bs-toggle="modal" data-bs-target="#exampleModal2" />
                            <span
                              onClick={() => downloadRecord(item._id)}
                              className="text-success actionIcon p-1 d-flex justify-content-center align-items-center cursor_pointer  rounded-circle download_bg"
                            >
                              <MdDownloadForOffline className="downloadIcon rounded-circle" />
                            </span>
                            <MdDelete
                              className="actionIcon p-2 rounded-circle cursor_pointer deleteIcon"
                              onClick={() => deleteSingleRecord(item._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

AdminFormLists.propTypes = {
  formName : PropTypes.string.isRequired,
  addFormUrl : PropTypes.string.isRequired,
}

export default AdminFormLists;
