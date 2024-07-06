import { useState } from 'react'

import Timings from './Timings'
import CompanyDetails from './CompanyDetails'
import Identification from './Identification'
import ContactBtn from './contactBtn'

import { wshcmApiCall } from './apiCall'

import { FaUserTie } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";

import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

const Wshcm_form = () => {

    const [formData , setFormData] = useState({
        class_type : '',
        participantName : '',
        NRIC_No : '',
        organization : '',
        date_of_birth:'',
        sunday_class_timing : '',
        
        work_permit : '',
        work_permit_expiry : '',

        working_day_timing : '',
        contact_no : '',
        identification : '',
        companyName	: '',
        companyUEN : '',
        companyPersonName : '',
        companyPersonEmail : '',
        companyPersonContactNo : '',
        email_id: '',
        experience:'',
        salary:'',
        qualifications :'',
        gender : '',
        nationality : '',
        race : '',
        // educationalCertificates: [], // Initialize as an empty array
        // studentPhoto: null, // Initialize with null
    })

    const [emailIDError  ,setEmailIDError] = useState(false);
    const [experienceError  ,setExperienceError] = useState(false);
    const [companyPersonContactError , setCompanyPersonContactError] = useState(false);
    const [contactNoError , setContactNoError] = useState(false);
    const [certificateFiles , setCertificateFiles] = useState([]);
    const [photos , setPhotos] = useState([]);

    const [submitBtnDisabled , setSubmitBtnDisable] = useState(false);


    const validateForm= async(event)=>{
        event.preventDefault();
        console.log("companyPersonContactError = ",companyPersonContactError);
        if(formData.companyPersonContactNo.length<1 || companyPersonContactError){
            if(formData.organization == "Company"){
                return alert("Company Contact No invalid")
            }
        } else if(formData.contact_no.length<1 || contactNoError){
            return alert("Enter Contact No  properly")
        } else if(formData.class_type == ''){
            return alert("Select class type")
        }

        setSubmitBtnDisable(true);
        const response = await wshcmApiCall(formData , certificateFiles , photos);
        if(response){
            setSubmitBtnDisable(false);
        }
    }


    const handleInputChange = (event)=>{
        const classTypeValue = event.target.value || event.target.innerHTML;
        const elementName = event.target.name || event.target.parentElement.children[0].name;
        elementName? setFormData((formData)=> ({...formData , [elementName] : classTypeValue})) : ''

        console.table(formData)
    }

 
    // in contactBtn component , i use PhoneInput for phone number , it doesnt have 'name' attribute , so i created this seperate function for phone number , and i pass 'name = contact_no' to it to store number in state.
    const setContactNoFunc = (elementNameNew , value)=>{
        console.log("elementName = " , elementNameNew); 
      
        setFormData((prevformData)=> ({...prevformData , [elementNameNew] : value}))
    }

    const checkErrors = (event)=>{
        let elementId = event.target.id;
       
        if (elementId === 'email_id') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Enhanced email format validation
      
          if (formData.email_id.length > 0 && emailRegex.test(formData.email_id)) {
            event.target.style = "border: auto;";
            setEmailIDError(false);
          } else {
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
            setEmailIDError(true);
          }
        } else if(elementId === 'experience'){
            if(formData.experience.length>0){
                event.target.style = "border: auto;";
                setExperienceError(false);
            } else {
                event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
                setExperienceError(true);
            }
        }

    }
   

    const [classType, setClassType] = useState(null); // Track currently active logo (index)
    const [activeLogo, setActiveLogo] = useState(null); // Track currently active logo (index)
    const [genderIndex, setGenderIndex] = useState(null); // Track currently active logo (index)

//   const handleLogoClick = (index) => {
//     setActiveLogo(index); // Set the clicked logo as active
//   };
   

  const handleClassType = (index) => {
    setClassType(index); // Update the active logo state
    // Directly update the organization field in formData based on the index
    setFormData((formData) => ({
      ...formData,
      class_type: index === 0 ? 'Sunday class' : 'Tuesday, Thursday, Saturday',
    }));

    console.table(formData)
  };
  const handleLogoClick = (index) => {
    setActiveLogo(index); // Update the active logo state
    // Directly update the organization field in formData based on the index
    setFormData((formData) => ({
      ...formData,
      organization: index === 0 ? 'Company' : 'Individual',
    }));

    console.table(formData)
  };

  const handleGenderClick = (index) => {
    setGenderIndex(index); // Update the active logo state
    // Directly update the organization field in formData based on the index
    setFormData((formData) => ({
      ...formData,
      gender: index === 0 ? 'Male' : 'Female',
    }));

    console.table(formData)
  };

  return (
    <div className="container px-lg-5 px-2">
       

        <form action="" onSubmit={validateForm}>
            <div className="form-group py-4">
                <h5 className="fw-bold pb-3">Class Type</h5>
                

                <div className="d-flex justify-content-start align-items-center gap-3">
                    <div
                        className={`registrationLogoBox p-4 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                            classType === 0 ? 'registrationLogoBoxActive' : ''
                        }`}
                        onClick={() => handleClassType(0)}
                    >
                        
                        Sunday class
                    </div>
                    <div
                        className={`registrationLogoBox p-4 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                            classType === 1 ? 'registrationLogoBoxActive' : ''
                        }`}
                        onClick={() => handleClassType(1)}
                    >

                        <span>Tuesday, Thursday, Saturday</span>
                        
                        {/* Tuesday, Thursday, Saturday */}
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col">

                    </div>
                    <div className="col"></div>
                </div> */}

            
            </div>
        

        <Timings class_type = {formData.class_type} handleInputChange={handleInputChange} /> 

        <div className="form-group pb-4">
        <h5 className='fw-bold pb-3'>Type Of Registration</h5>

            

            <div className="d-flex justify-content-start align-items-center gap-3">
                <div
                    className={`registrationLogoBox p-4 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                    activeLogo === 0 ? 'registrationLogoBoxActive' : ''
                    }`}
                    onClick={() => handleLogoClick(0)}
                >
                    <GrOrganization className='registrationLogo' />
                    Company
                </div>
                <div
                    className={`registrationLogoBox p-4 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                    activeLogo === 1 ? 'registrationLogoBoxActive' : ''
                    }`}
                    onClick={() => handleLogoClick(1)}
                >
                    <FaUserTie className='registrationLogo' />
                    Individual
                </div>
            </div>
          
                

        </div>
         

        <CompanyDetails handleInputChange={handleInputChange} setContactNoFunc={setContactNoFunc} companyPersonContactError={companyPersonContactError} setCompanyPersonContactError={setCompanyPersonContactError} companyOrNot={formData.organization} companyName = {formData.companyName} companyUEN={formData.companyUEN} companyPersonName={formData.companyPersonName} companyPersonEmail={formData.companyPersonEmail} companyPersonContactNo={formData.companyPersonContactNo} />

        <Identification handleInputChange={handleInputChange} companyOrNot={formData.organization} identification={formData.identification} participantName={formData.participantName} NRIC_No={formData.NRIC_No} work_permit={formData.work_permit} work_permit_expiry={formData.work_permit_expiry} setFormData={setFormData} formData={formData} />

        
        {formData.identification && <div className='form-group pb-4'>
        
        
            <h4 className='fw-bold'>Enter Personal Details</h4>
        <div className="form-group">
            <div className="form-group pb-3">
            <label htmlFor="" className="fw-bold pb-2">Date of Birth *</label>
                <input type="date" className="form-control d-lg-block d-none w-25" onChange={handleInputChange} value={formData.date_of_birth} name="date_of_birth" required />
                <input type="date" className="form-control d-lg-none d-inline" onChange={handleInputChange} value={formData.date_of_birth} name="date_of_birth" required />

            </div>

            <div className="pb-3">
                <label htmlFor="" className='pb-2 fw-bold'>Gender *</label>

                <div className="d-flex justify-content-start align-items-center gap-3">
                <div
                    className={`registrationLogoBox py-4 px-5 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                        genderIndex === 0 ? 'registrationLogoBoxActive' : ''
                    }`}
                    onClick={() => handleGenderClick(0)}
                >
                    <FaMale className='registrationLogo' />
                    Male
                </div>
                <div
                    className={`registrationLogoBox py-4 px-5 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                        genderIndex === 1 ? 'registrationLogoBoxActive' : ''
                    }`}
                    onClick={() => handleGenderClick(1)}
                >
                    <FaFemale className='registrationLogo' />
                    Female
                </div>
            </div>
          



            </div>

            

           

            
            
            <div className="pb-3">
            <label htmlFor="" className="fw-bold">Nationality *</label>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="Singaporean" name="nationality" required />
                <label className="form-check-label">
                Singaporean
                </label>
            </div>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="Singapore Pr" name="nationality" />
                <label className="form-check-label">
                Singapore Pr
                </label>
            </div>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="Malasiyan" name="nationality" />
                <label className="form-check-label">
                Malasiyan
                </label>
            </div>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="Indian" name="nationality" />
                <label className="form-check-label">
                Indian
                </label>
            </div>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="Chinese" name="nationality" />
                <label className="form-check-label">
                Chinese
                </label>
            </div>
            </div>
            
            <div className="pb-3">
            <label htmlFor="" className="fw-bold">Race *</label>

                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio" value="Chinese" name="race" required />
                    <label className="form-check-label">
                    Chinese
                    </label>
                </div>
                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio" value="Malay" name="race" />
                    <label className="form-check-label">
                    Malay
                    </label>
                </div>
                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio" value="Indian" name="race" />
                    <label className="form-check-label">
                    Indian
                    </label>
                </div>
                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio" value="Bangladeshi" name="race" />
                    <label className="form-check-label">
                    Bangladeshi
                    </label>
                </div>
                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio" value="Filipino" name="race" />
                    <label className="form-check-label">
                    Filipino
                    </label>
                </div>
            </div>
            


            <ContactBtn setContactNoFunc={setContactNoFunc} setContactNoError={setContactNoError} contactNoError={contactNoError} />
           <div className="mb-3">
               <label htmlFor="" className="fw-bold">Email *</label>
                <input type="text" className="form-control" onChange={handleInputChange} onKeyUp={checkErrors} value={formData.email_id} name="email_id" id="email_id" required />
                {emailIDError && <span className='text-danger'>Email id invalid *</span>}
           </div>
            
            <div className="mb-3">
               <label htmlFor="" className="fw-bold">Years of Experience *</label>
                <input type="text" className="form-control " onChange={handleInputChange} onKeyUp={checkErrors} value={formData.experience} name="experience" id="experience"  required />
                {experienceError && <span className='text-danger '>Enter the experience *</span>}
            </div>
            
            <div className="pb-3">
            <label htmlFor="" className="fw-bold">Salary Range *</label>
                    <div className="form-check" onClick={handleInputChange}>
                        <input className="form-check-input" type="radio" value="Less Then $1000" name="salary" required />
                        <label className="form-check-label">
                        Less Then $1000
                        </label>
                    </div>
                    <div className="form-check" onClick={handleInputChange}>
                        <input className="form-check-input" type="radio" value="$1000 To $1999" name="salary" />
                        <label className="form-check-label">
                        $1000 To $1999
                        </label>
                    </div>
                    <div className="form-check" onClick={handleInputChange}>
                        <input className="form-check-input" type="radio" value="$2000 To $2999" name="salary" />
                        <label className="form-check-label">
                        $2000 To $2999
                        </label>
                    </div>
                    <div className="form-check" onClick={handleInputChange}>
                        <input className="form-check-input" type="radio" value="$3000 And Above" name="salary" />
                        <label className="form-check-label">
                        $3000 And Above
                        </label>
                    </div>
            </div>
           


            <div className="pb-3">
            <label htmlFor="" className="fw-bold">Highest Qualification *</label>

                        <div className="form-check" onClick={handleInputChange}>
                            <input className="form-check-input" type="radio" value="Degree" name="qualifications" required />
                            <label className="form-check-label">
                            Degree
                            </label>
                        </div>
                        <div className="form-check" onClick={handleInputChange}>
                            <input className="form-check-input" type="radio" value="Diploma" name="qualifications" />
                            <label className="form-check-label">
                            Diploma
                            </label>
                        </div>
                        <div className="form-check" onClick={handleInputChange}>
                            <input className="form-check-input" type="radio" value="Gce O Level/Sslc/Hsc" name="qualifications" />
                            <label className="form-check-label">
                            Gce O Level/Sslc/Hsc
                            </label>
                        </div>
                        <div className="form-check" onClick={handleInputChange}>
                            <input className="form-check-input" type="radio" value="others" name="qualifications" />
                            <label className="form-check-label">
                            others
                            </label>
                        </div>
            </div>
            


            
            <label htmlFor="" className="fw-bold">Upload Educational Certificates *</label>
            <input type="file" className='form-control mb-3' name="educationalCertificates"  onChange={(e)=> setCertificateFiles(e.target.files)} multiple required />

            <label htmlFor="" className="fw-bold">Photo of the Student *</label>
            <input type="file" className='form-control mb-3' name="studentPhoto" onChange={(e)=> setPhotos(e.target.files)} multiple required />
            {/* <input type="file" className='form-control mb-3' name="studentPhoto" onChange={(e)=> setPhoto(e.target.files[0])} required /> */}


            <div className="pb-3 d-flex justify-content-start align-items-center">
                <input type="checkbox" className='form-checkbox' required />
                <span className='ms-2'>I declare that all the above details are provided</span>
            </div>
           
             
        </div>
      

<div className="text-center pt-3">
      <button className={`btn px-5 fw-bold mainBgColor ${submitBtnDisabled? "disabled" : ''}`}>Submit</button>
</div>

        
        
        </div>}


      </form>

    </div>
  )
}

export default Wshcm_form