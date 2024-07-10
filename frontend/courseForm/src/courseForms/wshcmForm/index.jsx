import { useState } from 'react'
import PropTypes from 'prop-types';

import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';


import Timings from './Timings'
import CompanyDetails from './CompanyDetails'
import Identification from './Identification'
import ContactBtn from './contactBtn'

import { wshcmApiCall } from './apiCall'

import { FaUserTie } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";

import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

import ReactCountryFlag from 'react-country-flag';

import { NATIONALITY , RACE , QUALIFICATION , SALARY_RANGE} from './classTimings'

const Wshcm_form = ({formName}) => {

    const [formData , setFormData] = useState({
        formName : formName,
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
        console.log("formData.organization = ",formData.organization);
        console.log("formData.companyPersonContactNo.length = ",formData.companyPersonContactNo.length<1);
    //     if(!formData.class_type){
    //         const element = document.getElementById('class_type_id');
    //             if (element) {
    //                 element.scrollIntoView({ behavior: 'smooth' });
    //                 return alert("Select class type")
    //             } else {
    //                 console.error("Element with ID", "not found!");
    //             }
    //     } else if(formData.class_type){
    //         if(!formData.sunday_class_timing && !formData.working_day_timing){
    //             const element = document.getElementById('class_timing_id');
    //             if (element) {
    //                 element.scrollIntoView({ behavior: 'smooth' });
                   
    //             } else {
    //                 console.error("Element with ID", "not found!");
    //             }
    //             return alert("Select class timing")
    //         } else if(formData.companyPersonContactNo.length<1 || companyPersonContactError){
    //         console.log("show")
    //         if(formData.organization === "Company"){
    //             const element = document.getElementById('company_id');
    //             if (element) {
    //                 element.scrollIntoView({ behavior: 'smooth' });
                   
    //             } else {
    //                 console.error("Element with ID", "not found!");
    //             }
    //             return alert("Company Contact No invalid")
    //         } else if(formData.contact_no.length<1 || contactNoError){
    //         // console.log("show")
    //         const element = document.getElementById('contact_no_id');
    //         if (element) {
    //             element.scrollIntoView({ behavior: 'smooth' });
               
    //         } else {
    //             console.error("Element with ID", "not found!");
    //         }

    //         return alert("Enter Contact No  properly")
    //     } else if(!formData.gender){
    //         const element = document.getElementById('gender_id');
    //         if (element) {
    //             element.scrollIntoView({ behavior: 'smooth' });
               
    //         } else {
    //             console.error("Element with ID", "not found!");
    //         }
    //         return alert("Select gender")
    //     } else if(!signed){
    //         const element = document.getElementById('signature_id');
    //         if (element) {
    //             element.scrollIntoView({ behavior: 'smooth' });
               
    //         } else {
    //             console.error("Element with ID", "not found!");
    //         }
    //         return alert("Please do digital signature")
    //     } else {
    //         console.log("show")

         
    //     }

       
    // }
    // }

console.log("hello")
console.log("hello")
    setSubmitBtnDisable(true);
    const response = await wshcmApiCall(formData , certificateFiles , photos , signature);
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

    const sigCanvas = useRef(null);
    const [signed, setSigned] = useState(false);
    const [signature, setSignature] = useState(null);
  
    const clearSignature = () => {
        if (sigCanvas.current) { // Check if reference exists
          sigCanvas.current.clear();
          setSigned(false);
          console.log("Signature Cleared"); // Add console log for debugging
        } else {
          console.error("Signature Canvas reference not found!");
        }
      };
    const saveSignature = () => {
        // event.preventDefault();

      if (!signed) return;
      const img = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    //   const img = sigCanvas.current.getTrimmedCanvas();

    //   const reader = new FileReader();
    //   reader.readAsDataURL(img);
    //   reader.onload = () => setSignature(reader.result);
    //   reader.onerror = (error) => console.error('Error:', error);


      console.log("signature = " , signature)
      setSignature(img);
    };

    // const [classType, setClassType] = useState(null); // Track currently active logo (index)
    const [activeLogo, setActiveLogo] = useState(null); // Track currently active logo (index)
    const [genderIndex, setGenderIndex] = useState(null); // Track currently active logo (index)

//   const handleLogoClick = (index) => {
//     setActiveLogo(index); // Set the clicked logo as active
//   };
   

//   const handleClassType = (index) => {
//     setClassType(index); // Update the active logo state
//     // Directly update the organization field in formData based on the index
//     setFormData((formData) => ({
//       ...formData,
//       class_type: index === 0 ? 'Sunday class' : 'Tuesday, Thursday, Saturday',
//     }));

//     console.table(formData)
//   };
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


  function handleClassChange(event) {

    const clickedDiv = event.currentTarget;
    // clickedDiv.classList.add('registrationLogoBoxActive');

    const allDivs = document.querySelectorAll('.registrationLogoBox.classTypeChange');
      
    // Remove the 'registrationLogoBoxActive' class from all divs first
    allDivs.forEach(div => div.classList.remove('registrationLogoBoxActive'));
  
    // Add the 'registrationLogoBoxActive' class only to the clicked div
    // const clickedDiv = event.currentTarget;
    clickedDiv.classList.add('registrationLogoBoxActive');



    // console.log(event)

    const elementName = event.target.attributes.name.nodeValue;
    const elementValue = event.target.attributes.value.nodeValue;

    setFormData((formData)=> ({...formData , [elementName] : elementValue}))
  }
  
  function handleNationalityChange(event) {
   
    const clickedDiv = event.currentTarget;
    // clickedDiv.classList.add('registrationLogoBoxActive');

    const allDivs = document.querySelectorAll('.registrationLogoBox.nationalityChange');
      
    // Remove the 'registrationLogoBoxActive' class from all divs first
    allDivs.forEach(div => div.classList.remove('registrationLogoBoxActive'));
  
    // Add the 'registrationLogoBoxActive' class only to the clicked div
    // const clickedDiv = event.currentTarget;
    clickedDiv.classList.add('registrationLogoBoxActive');



    console.log(event)

    const elementName = event.target.attributes.name.nodeValue;
    const elementValue = event.target.attributes.value.nodeValue;

    setFormData((formData)=> ({...formData , [elementName] : elementValue}))
  }


  function handleRaceChange(event) {

    const clickedDiv = event.currentTarget;
    // clickedDiv.classList.add('registrationLogoBoxActive');

    const allDivs = document.querySelectorAll('.registrationLogoBox.raceChange');
      
    // Remove the 'registrationLogoBoxActive' class from all divs first
    allDivs.forEach(div => div.classList.remove('registrationLogoBoxActive'));
  
    // Add the 'registrationLogoBoxActive' class only to the clicked div
    // const clickedDiv = event.currentTarget;
    clickedDiv.classList.add('registrationLogoBoxActive');


    console.log(event)

    const elementName = event.target.attributes.name.nodeValue;
    const elementValue = event.target.attributes.value.nodeValue;

    setFormData((formData)=> ({...formData , [elementName] : elementValue}))
  }

  function handleQualificationChange(event) {

    const clickedDiv = event.currentTarget;
    // clickedDiv.classList.add('registrationLogoBoxActive');

    const allDivs = document.querySelectorAll('.registrationLogoBox.qualificationChange');
      
    // Remove the 'registrationLogoBoxActive' class from all divs first
    allDivs.forEach(div => div.classList.remove('registrationLogoBoxActive'));
  
    // Add the 'registrationLogoBoxActive' class only to the clicked div
    // const clickedDiv = event.currentTarget;
    clickedDiv.classList.add('registrationLogoBoxActive');


    console.log(event)

    const elementName = event.target.attributes.name.nodeValue;
    const elementValue = event.target.attributes.value.nodeValue;

    setFormData((formData)=> ({...formData , [elementName] : elementValue}))
  }
  
  function handleSalaryChange(event) {
    event.stopPropagation(); 

    const clickedDiv = event.currentTarget;
    // clickedDiv.classList.add('registrationLogoBoxActive');

    const allDivs = document.querySelectorAll('.registrationLogoBox.salaryChange');
      
    // Remove the 'registrationLogoBoxActive' class from all divs first
    allDivs.forEach(div => div.classList.remove('registrationLogoBoxActive'));
  
    // Add the 'registrationLogoBoxActive' class only to the clicked div
    // const clickedDiv = event.currentTarget;
    clickedDiv.classList.add('registrationLogoBoxActive');


    console.log(event)

    const elementName = event.target.attributes.name.nodeValue;
    const elementValue = event.target.attributes.value.nodeValue;

    setFormData((formData)=> ({...formData , [elementName] : elementValue}))
  }
  

  return (
    <div className="container px-lg-5 px-2">
       

        <form action="" onSubmit={validateForm}>
            <div className="form-group py-4" id='class_type_id'>
                <h5 className="fw-bold pb-3" >Class Type</h5>
                

              

                <div className="d-flex justify-content-start align-items-center gap-3">
                    <div name = "class_type" value="Sunday class" className="registrationLogoBox p-4 classTypeChange rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer" onClick={(event) => handleClassChange(event)}> 
                        Sunday class
                    </div>
                    <div name = "class_type" value="Tuesday, Thursday, Saturday" className="registrationLogoBox p-4 classTypeChange rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer" onClick={(event) => handleClassChange(event)}> 
                        Tuesday, Thursday, Saturday
                    </div>

               </div>

            
            </div>
        

        <Timings class_type = {formData.class_type} handleInputChange={handleInputChange} setFormData = {setFormData} /> 

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

            <div className="pb-3" id='gender_id'>
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
            <label htmlFor="" className="fw-bold pb-3">Nationality *</label>
                <div className="d-flex justify-content-start align-items-center flex-wrap gap-2">

                    {NATIONALITY && NATIONALITY.map((item , index)=>{

                        return <div key={index} name = "nationality" value={item.countryName}  className="registrationLogoBox px-3 py-3 nationalityChange rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer" onClick={(event) => handleNationalityChange(event)}>
                            <ReactCountryFlag style={{ width: '40px', height: '20px' }}  name = "nationality" value={item.countryName}  countryCode={item.countryCode} svg />  {/* Use svg for scalability */}
                                {item.countryName}
                            </div>

                    })}
                    
                </div>


            </div>
            
            <div className="pb-3">
            <label htmlFor="" className="fw-bold">Race *</label>

                <div className="d-flex justify-content-start align-items-center flex-wrap gap-2">

                    {RACE && RACE.map((item , index)=>{

                        return <div key={index} name = "race" value={item}  className="registrationLogoBox px-3 py-3 raceChange rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer" onClick={(event) => handleRaceChange(event)}>
                                {item}
                            </div>

                    })}
                    
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
            <label htmlFor="" className="fw-bold pb-3">Salary Range *</label>
                   

                    <div className="d-flex justify-content-center align-items-start flex-column gap-2">
                        {SALARY_RANGE && SALARY_RANGE.map((item , index)=> (
                                <div key={index} name="salary" value={item} className="registrationLogoBox salaryChange py-2 px-3 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-row cursor_pointer" onClick={(e)=> handleSalaryChange(e)}>
                                        
                                <div name="salary" value={item} className="p-2 rounded-circle border bg-white radioBtnShadow"></div>

                                {item}

                                </div>
                            
                                ))}
                        </div>
            </div>
           


            <div className="pb-3">
            <label htmlFor="" className="fw-bold pb-3">Highest Qualification *</label>

                      

                        <div className="d-flex justify-content-center align-items-start flex-column gap-2">
                        {QUALIFICATION && QUALIFICATION.map((item , index)=> (
                                <div key={index} name="qualifications" value={item} className="registrationLogoBox qualificationChange py-2 px-3 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-row cursor_pointer" onClick={(e)=> handleQualificationChange(e)}>
                                        
                                <div name="qualifications" value={item} className="p-2 rounded-circle border bg-white radioBtnShadow"></div>

                                {item}

                                </div>
                            
                                ))}
                        </div>

            </div>
            


            
            <label htmlFor="" className="fw-bold">Upload Educational Certificates *</label>
            <input type="file" className='form-control mb-3' name="educationalCertificates"  onChange={(e)=> setCertificateFiles(e.target.files)} multiple required />

            <label htmlFor="" className="fw-bold">Photo of the Student *</label>
            <input type="file" className='form-control mb-3' name="studentPhoto" onChange={(e)=> setPhotos(e.target.files)} multiple required />
            {/* <input type="file" className='form-control mb-3' name="studentPhoto" onChange={(e)=> setPhoto(e.target.files[0])} required /> */}


            <div className="signature-box" id='signature_id'>
            <h2>Sign Here</h2>
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ className: 'signature-pad' }}
                style ={{background : '#fff'}}
                onEnd={() => setSigned(true)}
            />
            <div className="signature-actions d-flex gap-2 pb-3">
                <button type='button'  className='btn px-3 btn-danger fw-bold' onClick={()=>clearSignature()} disabled={!signed}>Clear</button>
                <button type='button' className='btn px-3 fw-bold mainBgColor' onClick={()=>saveSignature()} disabled={!signed}>Save</button>
            </div>
            {signature && <img src={signature} className="img-fluid border border-success" alt="Signature" />}
            </div>

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

Wshcm_form.propTypes = {
    formName : PropTypes.string.isRequired,
}

export default Wshcm_form