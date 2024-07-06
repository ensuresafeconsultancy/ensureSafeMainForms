import PropTypes from 'prop-types';
import {useState} from 'react';
// import { useEffect, useRef } from 'react'

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CompanyDetails = ({handleInputChange , setContactNoFunc, companyPersonContactError, setCompanyPersonContactError , companyOrNot ,companyName, companyUEN, companyPersonName, companyPersonEmail }) => {

  const [companyNameError , setCompanyNameError] = useState(false);
  const [companyRegError , setCompanyRegError] = useState(false);
  const [companyPersonNameError , setCompanyPersonNameError] = useState(false);
  const [companyPersonEmailError , setCompanyPersonEmailError] = useState(false);

  const checkKeyup= (event)=>{
    let elementId = event.target.id;
    if(elementId === 'companyName'){
      if(companyName.length<1){
        event.target.style = "border : 2px solid red";
        event.target.style = "box-shadow : 2px 0.5px 2px 0.5px red";
        setCompanyNameError(true);
      } else{
        event.target.style = "border : auto";
        setCompanyNameError(false);
      }
    }
    else if(elementId === 'companyUEN'){
      if(companyUEN.length<1){
        event.target.style = "border : 2px solid red";
        event.target.style = "box-shadow : 2px 0.5px 2px 0.5px red";
        setCompanyRegError(true);
      } else{
        event.target.style = "border : auto";
        setCompanyRegError(false);
      }
    }
    else if(elementId === 'companyPersonName'){
      if(companyPersonName.length<1){
        event.target.style = "border : 2px solid red";
        event.target.style = "box-shadow : 2px 0.5px 2px 0.5px red";
        setCompanyPersonNameError(true);
      } else{
        event.target.style = "border : auto";
        setCompanyPersonNameError(false);
      }
    }
    else if (elementId === 'companyPersonEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Enhanced email format validation
  
      if (companyPersonEmail.length > 0 && emailRegex.test(companyPersonEmail)) {
        event.target.style = "border: auto;";
        setCompanyPersonEmailError(false);
      } else {
        event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
        setCompanyPersonEmailError(true);
      }
    }
  }

  const [PhoneNumber , setPhoneNumber] = useState('');


  const handleContactNo = (value) => {
    setPhoneNumber(() => value); // Update phone number state
    const phonReg = /^\d{10,}$/;

    let name = 'companyPersonContactNo';
  
    setContactNoFunc(name, value); // Update form data
    if (phonReg.test(value)) { // Use the passed-in value for validation
      setCompanyPersonContactError(false); // Set no error
    } else {
      setCompanyPersonContactError(true); // Set error
    }
  };
  


  return (
    
    <>
    {companyOrNot=="Company" && <div className='form-group pb-5'>

    <h4 className="fw-bold">Enter the Company Details</h4>

        <div className="form-group">
          <div className="py-3">
            <label htmlFor="" className="fw-bold">Company Name *</label>
            <input type="text" className='form-control' id='companyName' onChange={handleInputChange} onKeyUp={checkKeyup} value={companyName} name="companyName" required />
            {companyNameError && <span className='text-danger'>Company name required *</span>}
          </div>
            
          <div className="pb-3">
            <label htmlFor="" className="fw-bold">Company UEN/Reg No *</label>
            <input type="text" className='form-control' id='companyUEN' onChange={handleInputChange} onKeyUp={checkKeyup} value={companyUEN} name="companyUEN" required />
            {companyRegError && <span className='text-danger'>Company Reg no required *</span>}
          </div>
            
          <div className="pb-3">
            <label htmlFor="" className="fw-bold">Contact Person Name *</label>
            <input type="text" className='form-control' id='companyPersonName' onChange={handleInputChange} onKeyUp={checkKeyup} value={companyPersonName} name="companyPersonName" required />
            {companyPersonNameError && <span className='text-danger'>Company Person name required *</span>}
          </div>
            
          <div className="pb-3">
            <label htmlFor="" className="fw-bold">Contact Person Email *</label>
            <input type="email" className='form-control' id="companyPersonEmail" onChange={handleInputChange} onKeyUp={checkKeyup} value={companyPersonEmail} name="companyPersonEmail" required />
            {companyPersonEmailError && <span className='text-danger'>Company Email ID required *</span>}

          </div>
           

          <div className="pb-3">
          <label htmlFor="" className="fw-bold">Contact Person Contact No *</label>
       
            <PhoneInput country={'sg'} id="companyPersonContactNo"  onChange={handleContactNo} inputProps={{ required: true }} />
            {companyPersonContactError && (
            <span className="text-danger">
              {PhoneNumber.length === 0 ? (
                "Company Person contact no required *" // Error for empty input
              ) : (
                "Enter valid contact number *" // Error for invalid number
              )
              }
            </span> )}
          </div>
            
        </div>
    </div>
    }

    
    </>
  )
}

CompanyDetails.propTypes = {
    companyOrNot: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    companyUEN: PropTypes.string.isRequired,
    companyPersonName: PropTypes.string.isRequired,
    companyPersonEmail: PropTypes.string.isRequired,
    companyPersonContactNo: PropTypes.string.isRequired,
    companyPersonContactError: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    setContactNoFunc: PropTypes.func.isRequired,
    setCompanyPersonContactError: PropTypes.func.isRequired,
}

export default CompanyDetails