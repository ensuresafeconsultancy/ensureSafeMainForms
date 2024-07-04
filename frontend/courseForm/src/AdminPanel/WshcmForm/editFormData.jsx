import { useEffect , useState } from "react";
import PropTypes from 'prop-types';
import { wshcmEditForm } from "../apiCall";

const EditFormData = ({updateFormData , selectedFormData , isEditModalOpen , setIsEditModalOpen , editFormId}) => {
    const [editFormObj, setEditFormObj] = useState(selectedFormData);

    const [companyNameError , setCompanyNameError] = useState(false);
    const [companyRegError , setCompanyRegError] = useState(false);
    const [companyPersonNameError , setCompanyPersonNameError] = useState(false);
    const [companyPersonEmailError , setCompanyPersonEmailError] = useState(false);

    const [companyPersonContactError , setCompanyPersonContactError] = useState(false);
    const [contactNoError , setContactNoError] = useState(false);

    const [participantNameError  ,setParticipantNameError] = useState(false);
    const [NRICError  ,setNRICError] = useState(false);
    const [workPermitError  ,setWorkPermitError] = useState(false);
    const [emailIDError  ,setEmailIDError] = useState(false);
    const [experienceError  ,setExperienceError] = useState(false);


    const closeEditModal = () => {
        setIsEditModalOpen(false);
      };


  useEffect(() => {
    if (isEditModalOpen) {
      // Add body class and style on modal open (using a utility function)
      addBodyClassAndStyle();
    } else {
      // Remove body class and style on modal close (using a utility function)
      removeBodyClassAndStyle();
    }

    // Cleanup function: Remove styles on component unmount (optional)
    return () => removeBodyClassAndStyle();
  }, [isEditModalOpen]); // Dependency array: Re-run on modal state change

  const addBodyClassAndStyle = () => {
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
  };

  const removeBodyClassAndStyle = () => {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

 
const handleInputChange = (event)=>{
    const classTypeValue = event.target.value || event.target.innerHTML;
    const elementName = event.target.name || event.target.parentElement.children[0].name;
    elementName? setEditFormObj((formData)=> ({...formData , [elementName] : classTypeValue})) : ''

    // console.table(editFormObj);
}


const handleContactNo = (event) => {

    const classTypeValue = event.target.value || event.target.innerHTML;
    const elementName = event.target.name || event.target.parentElement.children[0].name;


    const phonReg = /^\d{10,}$/;

    elementName? setEditFormObj((formData)=> ({...formData , [elementName] : classTypeValue})) : ''
    if(elementName == "companyPersonContactNo"){
        if (phonReg.test(classTypeValue)) { // Use the passed-in value for validation
            event.target.style = "border: auto;";
            setCompanyPersonContactError(false); // Set no error
        } else {
            
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
            setCompanyPersonContactError(true); // Set error
        }
    } else{
        if (phonReg.test(classTypeValue)) { // Use the passed-in value for validation
            event.target.style = "border: auto;";
            setContactNoError(false); // Set no error
        } else {

            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
            setContactNoError(true); // Set error
        }
    }

   
    // console.table(editFormObj);
  };


const checkErrors = (event)=>{
    let elementId = event.target.id;
   
    if (elementId === 'NRIC_No') {
     
      if (editFormObj.NRIC_No.length > 0) {
        event.target.style = "border: auto;";
        setNRICError(false);
      } else {
        event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
        setNRICError(true);
      }
    } else if(elementId === 'work_permit'){
      if(editFormObj.work_permit.length>0){
        event.target.style = "border: auto;";
        setWorkPermitError(false);
      } else {
        event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
        setWorkPermitError(true);
      }
    }
     else if(elementId === 'participantName'){
      if(editFormObj.participantName.length>0){
        event.target.style = "border: auto;";
        setParticipantNameError(false);
      } else {
        event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
        setParticipantNameError(true);
      }
    }else if (elementId === 'email_id') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Enhanced email format validation
    
        if (editFormObj.email_id.length > 0 && emailRegex.test(editFormObj.email_id)) {
          event.target.style = "border: auto;";
          setEmailIDError(false);
        } else {
          event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
          setEmailIDError(true);
        }
      } else if(elementId === 'experience'){
          if(editFormObj.experience.length>0){
              event.target.style = "border: auto;";
              setExperienceError(false);
          } else {
              event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
              setExperienceError(true);
          }
      } else if(elementId === 'companyName'){
        if(editFormObj.companyName.length<1){
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";

          setCompanyNameError(true);
        } else{
          event.target.style = "border : auto";
          setCompanyNameError(false);
        }
      }
      else if(elementId === 'companyUEN'){
        if(editFormObj.companyUEN.length<1){
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";

          setCompanyRegError(true);
        } else{
          event.target.style = "border : auto";
          setCompanyRegError(false);
        }
      }
      else if(elementId === 'companyPersonName'){
        if(editFormObj.companyPersonName.length<1){
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";

          setCompanyPersonNameError(true);
        } else{
          event.target.style = "border : auto";
          setCompanyPersonNameError(false);
        }
      }
      else if (elementId === 'companyPersonEmail') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Enhanced email format validation
    
        if (editFormObj.companyPersonEmail.length > 0 && emailRegex.test(editFormObj.companyPersonEmail)) {
          event.target.style = "border: auto;";
          setCompanyPersonEmailError(false);
        } else {
          event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
          setCompanyPersonEmailError(true);
        }
      }

}


const validateForm = async(event)=>{
    event.preventDefault();
    // console.log("companyPersonContactError = ",companyPersonContactError);
    if(editFormObj.companyPersonContactNo.length<1 || companyPersonContactError){
      if(editFormObj.organization == "Company"){
        return alert("Company Contact No invalid")
      }
    } else if(editFormObj.contact_no.length<1 || contactNoError){
        return alert("Phone number error")
    }

    let successStatus = await wshcmEditForm(editFormObj , editFormId);

    console.log("edit successStatus = " , successStatus)
    if(successStatus){
        updateFormData(editFormObj , editFormId)
      }
      setIsEditModalOpen(false);
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
              <table className="data-table">
                <thead></thead>
              
                <tbody>
         
                  <tr className="">
                    <td className="fw-bold py-1">PARTICIPANT NAME</td>
                    <input type="text" className="form-control" id="participantName" name="participantName" onKeyUp={checkErrors} value={editFormObj? editFormObj.participantName : ''} onChange={handleInputChange} required />
                    {participantNameError && <span className='text-danger'>Participant Name required *</span>}
                
                  </tr>
                  <tr className="py-1">
                    <td className="fw-bold py-1">CLASS_TYPE</td>
                    <select  name="class_type" id="" defaultValue={editFormObj? editFormObj.class_type : ''} className="form-control my-3" onChange={handleInputChange}>
                      {/* <option value="Class not selected" className="form-control py-1">Select class type</option> */}
                      <option value="Sunday class" className="form-control py-1">Sunday class</option>
                      <option value="Tuesday, Thursday, Saturday" className="form-control py-1">Tuesday, Thursday, Saturday</option>
                    </select>
                  </tr>
               
                 

                 {editFormObj.class_type=="Sunday class" && 

                 <tr>
                    <td className="fw-bold py-1">Sunday Class Schedule</td>
                    
                    <select className="form-control my-1" name="sunday_class_timing" defaultValue={editFormObj? editFormObj.sunday_class_timing : ''}  onChange={handleInputChange} id="" >
                        <option value="7 & 14 Apr 2024(9.00am To 6.00pm)">7 & 14 Apr 2024(9.00am To 6.00pm)</option>
                        <option value="21 & 28 Apr 2024(9.00am To 6.00pm)">21 & 28 Apr 2024(9.00am To 6.00pm)</option>  
                    </select>
               </tr>

                 }

                 {editFormObj.class_type == "Tuesday, Thursday, Saturday" && 
                 
                 <tr>
                    <td className="fw-bold py-1">Tuesday, Thursday, Saturday Class Schedule</td>
                    
                    <select className="form-control my-1" name="working_day_timing" defaultValue={editFormObj ? editFormObj.working_day_timing : ''} onChange={handleInputChange} id="">
                    <option value="6 & 7 Apr 2024 (9.00am To 6.00pm)">6 & 7 Apr 2024 (9.00am To 6.00pm)</option>
                    <option value="13 & 14 Apr 2024 (9.00am To 6.00pm)">13 & 14 Apr 2024 (9.00am To 6.00pm)</option>
                    <option value="20 & 21 Apr 2024 (9.00am To 6.00pm)">20 & 21 Apr 2024 (9.00am To 6.00pm)</option>
                    <option value="27 & 28 Mar 2024 (9.00am To 6.00pm)">27 & 28 Mar 2024 (9.00am To 6.00pm)</option>
                    </select>
                </tr>
                 
                 }
                 
                 

                  <tr>
                    <td className="fw-bold py-1">Type of identification</td>

                    <select name="identification" className="form-control my-1" defaultValue={editFormObj ? editFormObj.identification : ''}  onChange={handleInputChange} id="">
                        <option value="NRIC">NRIC</option>
                        <option value="FIN">FIN</option>
                    </select>

                  </tr>
                  {editFormObj.identification=="NRIC" && 
                  
                  <tr>
                    <td className="fw-bold py-1"> NRIC NO</td>
                    <input type="text" className="form-control my-1" name="NRIC_No" id="NRIC_No" value={editFormObj? editFormObj.NRIC_No : ''} onChange={handleInputChange} onKeyUp={checkErrors}required />
                    {NRICError && <span className='text-danger'>NRIC No required *</span>}

                </tr>

                  }

                {editFormObj.identification=="FIN" &&      
                <>
                    <tr>
                    <td className="fw-bold py-1">Work Permit or S pass FIN No</td>
                    <input type="text" name="work_permit" className="form-control my-1" id="work_permit" value={editFormObj ? editFormObj.work_permit : ''} onKeyUp={checkErrors} onChange={handleInputChange} required />
                        {workPermitError && <span className='text-danger'>Work Permit or S pass FIN No required *</span>}

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">Work permit or S Pass Expiry date </td>
                    <input type="date" name="work_permit_expiry"  className="form-control my-1" value={editFormObj ? editFormObj.work_permit_expiry : ''} onChange={handleInputChange} required />
                  </tr>

                  </>
                }

                
                <tr>
                    <td className="fw-bold py-1">Type Of Registration</td>
                    <select id="" className="form-control my-3" name="organization" defaultValue={editFormObj? editFormObj.organization : ''} onChange={handleInputChange}>
                      <option value="organization not selected" className="form-control my-1" >Select Organization</option>
                      <option value="Company" className="form-control my-1">Company</option>
                      <option value="Individual" className="form-control my-1">Individual</option>
                    </select>
                  </tr>

                  {editFormObj.organization == "Company" && 
                  
                  <>
                  
                 
                  <tr>
                    <td className="fw-bold py-1">Company Name</td>
                    <input type="text" className="form-control my-1" id="companyName" name="companyName" value={editFormObj? editFormObj.companyName : ''} onChange={handleInputChange} onKeyUp={checkErrors} required />
                    {companyNameError && <span className='text-danger'>Company name required *</span>}

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">Company UEN/Reg No</td>
                    <input type="text" className="form-control my-1" id="companyUEN" name="companyUEN" value={editFormObj? editFormObj.companyUEN : ''} onChange={handleInputChange} onKeyUp={checkErrors} required />
                    {companyRegError && <span className='text-danger'>Company Reg no required *</span>}

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">Contact Person Name</td>
                    <input type="text" className="form-control my-1" id="companyPersonName" name="companyPersonName" value={editFormObj? editFormObj.companyPersonName : ''} onChange={handleInputChange} onKeyUp={checkErrors} required />
                    {companyPersonNameError && <span className='text-danger'>Company Person name required *</span>}

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">COMPANY PERSON EMAIL</td>
                    <input type="email" className="form-control my-1" id="companyPersonEmail" name="companyPersonEmail" value={editFormObj? editFormObj.companyPersonEmail : ''} onChange={handleInputChange} onKeyUp={checkErrors} required />
                    {companyPersonEmailError && <span className='text-danger'>Company Email ID required *</span>}

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">COMPANY PERSON CONTACT NO</td>
                    <input type="number" className="form-control my-1" id="companyPersonContactNo" name="companyPersonContactNo" value={editFormObj? editFormObj.companyPersonContactNo : ''} onChange={handleContactNo} required />
                    {companyPersonContactError && (
                    <span className="text-danger">
                    {editFormObj.companyPersonContactNo.length == 0 ? (
                        "Company Person contact no required *" // Error for empty input
                    ) : (
                        "Enter valid contact number *" // Error for invalid number
                    )
                    }
                    </span> )}
                  </tr>
                  </>
                  }

                 
                  <tr>
                    <td className="fw-bold py-1">EMAIL_ID</td>
                    <input type="email" className="form-control my-1" id="email_id" name="email_id" value={editFormObj? editFormObj.email_id : ''} onChange={handleInputChange} onKeyUp={checkErrors}  required />
                {emailIDError && <span className='text-danger'>Email id invalid *</span>}

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">CONTACT_NO</td>
                    <input type="number" className="form-control my-1" name="contact_no" value={editFormObj? editFormObj.contact_no : ''} onChange={handleContactNo} required />
                    {contactNoError && (
                        <span className="text-danger">
                        {editFormObj.contact_no.length === 0 ? (
                            "Contact no required *" // Error for empty input
                        ) : (
                            "Enter valid contact number *" // Error for invalid number
                        )
                        }
                        </span> )}
                  </tr>
                  <tr>
                    <td className="fw-bold py-1">EXPERIENCE</td>
                    <input type="text" className="form-control my-1" id="experience" name="experience" value={editFormObj? editFormObj.experience : ''} onChange={handleInputChange} onKeyUp={checkErrors} required />
                {experienceError && <span className='text-danger '>Enter the experience *</span>}

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">DATE_OF_BIRTH</td>
                    <input type="date" className="form-control my-1" name="date_of_birth" value={editFormObj? editFormObj.date_of_birth : ''} onChange={handleInputChange} required />
                  </tr>
                  <tr>
                    <td className="fw-bold py-1">SALARY</td>
                    {/* <input type="text" className="form-control my-1" name="salary" value={editFormObj? editFormObj.salary : ''} onChange={handleInputChange} /> */}
                    <select className="form-control my-1" name="salary" value={editFormObj ? editFormObj.salary : ''} onChange={handleInputChange} id="">
                        {/* <option value="">Select Salary Range</option> */}
                        <option value="Less Than $1000">Less Than $1000</option>
                        <option value="$1000 To $1999">$1000 To $1999</option>
                        <option value="$2000 To $2999">$2000 To $2999</option>
                        <option value="$3000 And Above">$3000 And Above</option>
                        </select>

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">QUALIFICATIONS</td>
                    {/* <input type="text" className="form-control my-1" name="qualifications" value={editFormObj? editFormObj.qualifications : ''} onChange={handleInputChange} /> */}

                    <select name="qualifications" className="form-control my-1" value={editFormObj ? editFormObj.qualifications : ''} onChange={handleInputChange} id="">
                    {/* <option value="">Select Qualification</option> */}
                    <option value="Degree">Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Gce O Level/Sslc/Hsc">Gce O Level/Sslc/Hsc</option>
                    <option value="others">Others</option>
                    </select>

                  </tr>
                  <tr>
                    <td className="fw-bold py-1">GENDER</td>
                    <select id="" className="form-control my-3" name="gender" defaultValue={editFormObj? editFormObj.gender : ''}  onChange={handleInputChange} >
                      <option value="" className="form-control py-1" name="gender">Select Gender</option>
                      <option value="male" className="form-control py-1" name="gender">Male</option>
                      <option value="female" className="form-control py-1" name="gender">Female</option>
                    </select>
                  </tr>
                  <tr>
                    <td className="fw-bold my-1">NATIONALITY</td>
                    {/* <input type="text" className="form-control my-1" name="nationality" value={editFormObj? editFormObj.nationality : ''} onChange={handleInputChange} /> */}


                    <select name="nationality" className="form-control my-3" defaultValue={editFormObj? editFormObj.nationality : ''} onChange={handleInputChange}  id="">
                        <option value="Singaporean">Singaporean</option>
                        <option value="Singapore Pr">Singapore Pr</option>
                        <option value="Malasiyan">Malasiyan</option>
                        <option value="Indian">Indian</option>
                        <option value="Chinese">Chinese</option>
                    </select>
                  </tr>
                  <tr>
                    <td className="fw-bold my-1">RACE</td>
                    {/* <input type="text" className="form-control my-1" name="race" value={editFormObj? editFormObj.race : ''} onChange={handleInputChange} /> */}

                    {/* <select className="form-control my-1" name="race" value={editFormObj? editFormObj.race : ''} onChange={handleInputChange} id="">
                        <option value=""></option>

                    </select> */}


                    <select className="form-control my-1" name="race" defaultValue={editFormObj ? editFormObj.race : ''} onChange={handleInputChange} id="">
                        {/* <option value="">Select Race</option>   */}
                        <option value="Chinese">Chinese</option>
                        <option value="Malay">Malay</option>
                        <option value="Indian">Indian</option>
                        <option value="Bangladeshi">Bangladeshi</option>
                        <option value="Filipino">Filipino</option>
                    </select>

                  </tr>

                
                
                </tbody>
              </table>
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
                Save changes
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


EditFormData.propTypes = {
    isEditModalOpen: PropTypes.bool.isRequired,
    editFormId: PropTypes.string.isRequired,
    selectedFormData: PropTypes.object.isRequired,
    
    setIsEditModalOpen: PropTypes.func.isRequired,
   
    updateFormData: PropTypes.func.isRequired,
}




export default EditFormData;