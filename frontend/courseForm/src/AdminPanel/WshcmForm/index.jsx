
import { useEffect, useState } from 'react'
import { fetchWshcmData , downloadFile , openFile , downloadRecord , deleteRecord} from '../apiCall';
import LoadingForm from '../../assets/table-loader.gif';
import Header from './Header';

import { MdDownloadForOffline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import swal from 'sweetalert';
// import ViewModalComponent from './viewData';

function WshcmForm(){


  const [formData , setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state (true)


  // const [showModal, setShowModal] = useState(false);
  const [showFormData , setShowFormData] = useState({});
  

  const handleOpenModal = (recordId) => {
    console.log("recordId = " , recordId)

    for(let formDataOne of formData){
      if(formDataOne._id == recordId){

        const excluded = ['_id', 'photoId', 'certificateFilesId', 'certificateFiles', 'photo', '__v'];
        const filteredEntries =  Object.entries(formDataOne).filter(([key]) => !excluded.includes(key));


        setShowFormData(Object.fromEntries(filteredEntries));
      }
    }
    

  };

  console.log("formDataFound show = " , showFormData)

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchWshcmData(); // Call the function to fetch data

  //       if (response && response.status === 200) { // Check for successful response (assuming API uses status code 200 for success)
  //         console.log(response.data.WshcmFormData)
  //         setFormData(response.data.WshcmFormData); // Update state with fetched data
  //       } else {
  //         console.log('Error fetching data:', response); // Handle unsuccessful response
  //       }
  //     } catch (err) {
  //       console.log('Error fetching data:', err); // Handle errors
  //     } finally {
  //       setIsLoading(false); // Set loading state to false after data fetching (success or failure)
  //     }
  //   };

 
  //     fetchData(); // Call the fetchData function within useEffect
  
    
  // }, []);

  console.table(formData)
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetchWshcmData();
  
        if (response && response.status === 200) {
          setFormData(response.data.WshcmFormData);
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    }, 0); // Delay for 2 seconds
  
    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);



  const deleteSingleRecord = async(recordId)=>{

    const response = await deleteRecord(recordId);
    if(response.data.status === 1){
      let sortFormData = formData.filter((item)=>item._id != recordId)
      setFormData(sortFormData);
      swal("Deleted!", response.data.message, "success");
    } else {
      swal("Error!", "An error occurred while deleting the record.", "error");
    }

  }

   
  

  return (

    <div className="">
      <Header />


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
              <h5 className="modal-title fw-bold" id="exampleModalLabel">Participant Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {Object.keys(showFormData).length > 0 ? (
              <table className="data-table">
                <thead>
                  
                </thead>
                <tbody>
                  {Object.entries(showFormData).map(([key, value]) => (
                    <tr key={key}>
                      <td className='fw-bold'>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</td>
                      <td>{value!=''? value : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data found for this participant.</p>
            )}

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
             
            </div>
          </div>
        </div>
      </div>

      
  
    <div className="px-lg-5 px-2 wshcmFormContainer">
{isLoading ? ( // Conditionally render loading component
       <img src={LoadingForm} className="img-fluid"  />
      ) : (

      <table className="table table-hover table-bordered ">
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
            <th scope="col">Photo</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {formData? formData.map((item , index)=>{
            return(
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>{item.participantName}</td>
                <td>{item.class_type}</td>
                <td>{item.organization}</td>
                <td>{item.contact_no}</td>
                <td>{item.email_id}</td>
                <td>{item.nationality}</td>
                <td>{item.certificateFiles &&
                          item.certificateFiles.map((itemFile, index) => {
                            return (
                              <div className="d-flex justify-content-between " key={index}>
                                <span
                                  onClick={() => openFile(itemFile , item.certificateFilesId[index])}
                                  className="text-truncate cursor_pointer fileName "
                                  style={{ maxWidth: "150px" }}
                                >
                                  {itemFile.substr(0, 23).concat("...") +
                                    itemFile.split(".")[1]}
                                </span>
                                <span
                                  onClick={() => downloadFile(itemFile , item.certificateFilesId[index])}
                                  className="text-success cursor_pointer  rounded-circle download_bg"
                                >
                                  <MdDownloadForOffline className="downloadIcon rounded-circle" />
                                </span>
                              </div>
                            );
                          })}
                </td>
                <td>{item.photo? <div className="d-flex justify-content-between ">
                                <span
                                  onClick={() => openFile(item.photo , item.photoId)}
                                  className="text-truncate cursor_pointer fileName "
                                  style={{ maxWidth: "150px" }}
                                >
                                  {item.photo.substr(0, 23).concat("...") +
                                    item.photo.split(".")[1]}
                                </span>
                                <span
                                  onClick={() => downloadFile(item.photo , item.photoId)}
                                  className="text-success cursor_pointer  rounded-circle download_bg"
                                >
                                  <MdDownloadForOffline className="downloadIcon rounded-circle" />
                                </span>
                              </div>
                              
                    : "" }</td>
                <td>
                          <div className="d-flex gap-1">
                        
                            <FaEye className='actionIcon p-2 rounded-circle cursor_pointer' onClick={()=>handleOpenModal(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" />
                            {/* <FaEye className='actionIcon p-2 rounded-circle cursor_pointer' onClick={()=>handleOpenModal(item._id)} /> */}
                      

                            <CiEdit className='actionIcon p-2 rounded-circle cursor_pointer'  />
                            <span
                                  onClick={() => downloadRecord(item._id)}
                                  className="text-success actionIcon p-1 d-flex justify-content-center align-items-center cursor_pointer  rounded-circle download_bg"
                                >
                                  <MdDownloadForOffline className="downloadIcon rounded-circle" />
                                </span>
                            <MdDelete className='actionIcon p-2 rounded-circle cursor_pointer deleteIcon' onClick={() => deleteSingleRecord(item._id)} />
                            
                          </div>

                </td>
              </tr>
            )
          }) : ""}
       
        </tbody>
      </table>

       )}

    </div>
    {/* <ViewModalComponent show={showModal} handleClose={handleCloseModal} showFormData={showFormData} /> */}
    </div>
        
    
  )
}

export default WshcmForm;