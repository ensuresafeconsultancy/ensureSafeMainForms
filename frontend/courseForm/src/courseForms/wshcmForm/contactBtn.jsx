
import PropTypes from 'prop-types';
import {useState} from 'react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactBtn = ({setContactNoFunc , setContactNoError , contactNoError}) => {

  const [PhoneNumber , setPhoneNumber] = useState('');


  const handleContactNo = (value) => {
    setPhoneNumber(() => value); // Update phone number state
    const phonReg = /^\d{10,}$/;

    let name = 'contact_no';
  
    setContactNoFunc(name, value); // Update form data
    if (phonReg.test(value)) { // Use the passed-in value for validation
      setContactNoError(false); // Set no error
    } else {
      setContactNoError(true); // Set error
    }
  };


  return (
    <div className='pb-3'>
    <label htmlFor="">Contact No *</label>
    {/* <input id="phone" type="text" className="form-control mb-3" onChange={classTypeChange} value={contact_no} name="contact_no" required /> */}

    <PhoneInput country={'sg'} id="companyPersonContactNo"  onChange={handleContactNo} inputProps={{ required: true }} />
            {contactNoError && (
            <span className="text-danger">
              {PhoneNumber.length === 0 ? (
                "Company Person contact no required *" // Error for empty input
              ) : (
                "Enter valid contact number *" // Error for invalid number
              )
              }
            </span> )}

    </div>
  )
}


ContactBtn.propTypes = {
  contactNoError : PropTypes.bool.isRequired,
    setContactNoFunc: PropTypes.func.isRequired,
    setContactNoError: PropTypes.func.isRequired,
}


export default ContactBtn;