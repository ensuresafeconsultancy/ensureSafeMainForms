import { useState } from 'react'

import Timings from './Timings'
import CompanyDetails from './CompanyDetails'
import Identification from './Identification'
import ContactBtn from './contactBtn'

import { wshcmApiCall } from './apiCall'

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
    const [photo , setPhoto] = useState([]);


    const validateForm=(event)=>{
        event.preventDefault();
        console.log("companyPersonContactError = ",companyPersonContactError);
        if(formData.companyPersonContactNo.length<1 || companyPersonContactError){
            if(formData.organization == "Company"){
                return alert("Company Contact No invalid")
            }
        } else if(formData.contact_no.length<1 || contactNoError){
            return alert("Phone number error")
        }
        wshcmApiCall(formData , certificateFiles , photo);
    }


    const handleInputChange = (event)=>{
        const classTypeValue = event.target.value || event.target.innerHTML;
        const elementName = event.target.name || event.target.parentElement.children[0].name;
        elementName? setFormData((formData)=> ({...formData , [elementName] : classTypeValue})) : ''
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
   
   

  return (
    <div className="container px-lg-5 px-2">
       

        <form action="" onSubmit={validateForm}>
            <div className="form-group py-4">
        <h5 className="fw-bold">Class Type</h5>
                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio" value="Sunday class" name="class_type" id="flexRadioDefault1" required />
                    <label className="form-check-label" >
                        Sunday class
                    </label>
                </div>

                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio"  name="class_type" value="Tuesday, Thursday, Saturday" id="flexRadioDefault2" />
                    <label className="form-check-label">
                        Tuesday, Thursday, Saturday
                    </label>
                </div>
            </div>
        

        <Timings class_type = {formData.class_type} handleInputChange={handleInputChange} /> 

        <div className="form-group pb-4">
        <h5 className='fw-bold'>Type Of Registration</h5>
                <div className="form-check" onClick={handleInputChange}>
                        <input className="form-check-input" type="radio" value="Company" name="organization" required />
                        <label className="form-check-label" >
                        Company  
                        </label>
                </div>

                <div className="form-check" onClick={handleInputChange}>
                    <input className="form-check-input" type="radio" value="Individual" name="organization" />
                    <label className="form-check-label">
                    Individual
                    </label>
                </div>

        </div>
        

        <CompanyDetails handleInputChange={handleInputChange} setContactNoFunc={setContactNoFunc} companyPersonContactError={companyPersonContactError} setCompanyPersonContactError={setCompanyPersonContactError} companyOrNot={formData.organization} companyName = {formData.companyName} companyUEN={formData.companyUEN} companyPersonName={formData.companyPersonName} companyPersonEmail={formData.companyPersonEmail} companyPersonContactNo={formData.companyPersonContactNo} />

        <Identification handleInputChange={handleInputChange} companyOrNot={formData.organization} identification={formData.identification} participantName={formData.participantName} NRIC_No={formData.NRIC_No} work_permit={formData.work_permit} work_permit_expiry={formData.work_permit_expiry} />

        
        {formData.identification && <div className='form-group pb-4'>
        
        
            <h4 className='fw-bold'>Enter Personal Details</h4>
        <div className="form-group">
            <div className="form-group pb-3">
            <label htmlFor="">Date of Birth *</label>
                <input type="date" className="form-control" onChange={handleInputChange} value={formData.date_of_birth} name="date_of_birth" required />

            </div>

            <div className="pb-3">
             <label htmlFor="">Gender *</label>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="male" name="gender" required />
                <label className="form-check-label">
                Male
                </label>
            </div>
            <div className="form-check" onClick={handleInputChange} >
                <input className="form-check-input" type="radio" value="female" name="gender" />
                <label className="form-check-label">
                female
                </label>
            </div>   
            </div>
            
            <div className="pb-3">
            <label htmlFor="">Nationality *</label>
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
            <label htmlFor="">Race *</label>

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
               <label htmlFor="">Email *</label>
                <input type="text" className="form-control" onChange={handleInputChange} onKeyUp={checkErrors} value={formData.email_id} name="email_id" id="email_id" required />
                {emailIDError && <span className='text-danger'>Email id invalid *</span>}
           </div>
            
            <div className="mb-3">
               <label htmlFor="">Years of Experience *</label>
                <input type="text" className="form-control " onChange={handleInputChange} onKeyUp={checkErrors} value={formData.experience} name="experience" id="experience"  required />
                {experienceError && <span className='text-danger '>Enter the experience *</span>}
            </div>
            
            <div className="pb-3">
            <label htmlFor="">Salary Range *</label>
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
            <label htmlFor="">Highest Qualification *</label>

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
            


            
            <label htmlFor="">Upload Educational Certificates *</label>
            <input type="file" className='form-control mb-3' name="educationalCertificates"  onChange={(e)=> setCertificateFiles(e.target.files)} multiple required />

            <label htmlFor="">Photo of the Student *</label>
            <input type="file" className='form-control mb-3' name="studentPhoto" onChange={(e)=> setPhoto(e.target.files[0])} required />


            <div className="pb-3">
                <input type="checkbox" className='form-checkbox' required />
                <span className='ms-2'>I declare that all the above details are provided</span>
            </div>
           
             
        </div>
      

      <button className='btn btn-primary'>Submit</button>

        
        
        </div>}


      </form>

    </div>
  )
}

export default Wshcm_form