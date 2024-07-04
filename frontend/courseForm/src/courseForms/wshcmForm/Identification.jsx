import PropTypes from 'prop-types';
import { useState } from 'react';

const Identification = ({handleInputChange , participantName ,companyOrNot, identification , NRIC_No , work_permit , work_permit_expiry}) => {

    const [participantNameError  ,setParticipantNameError] = useState(false);
    const [NRICError  ,setNRICError] = useState(false);
    const [workPermitError  ,setWorkPermitError] = useState(false);

    const checkErrors = (event)=>{
        let elementId = event.target.id;
       
        if (elementId === 'NRIC_No') {
         
          if (NRIC_No.length > 0) {
            event.target.style = "border: auto;";
            setNRICError(false);
          } else {
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
            setNRICError(true);
          }
        } else if(elementId === 'work_permit'){
          if(work_permit.length>0){
            event.target.style = "border: auto;";
            setWorkPermitError(false);
          } else {
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
            setWorkPermitError(true);
          }
        }
         else if(elementId === 'participantName'){
          if(participantName.length>0){
            event.target.style = "border: auto;";
            setParticipantNameError(false);
          } else {
            event.target.style = "border: 2px solid red; box-shadow: 2px 0.5px 2px 0.5px red;";
            setParticipantNameError(true);
          }
        }

    }

  return (
    <>
    {companyOrNot && <div className='form-group pb-3'>
        <h4 className='fw-bold'>Enter Participant Details</h4>
        <div className="form-group pb-3">
            <label htmlFor="">Participant Name :</label>
            <input type="text" className='form-control' onChange={handleInputChange} onKeyUp={checkErrors} value={participantName} name="participantName" id="participantName" required />
            {participantNameError && <span className='text-danger'>Participant Name required *</span>}
        </div>

        <div className="form-group">
            <label htmlFor="">Type of identification</label>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="NRIC" name="identification" required />
                <label className="form-check-label">
                NRIC
                </label>
            </div>
            <div className="form-check" onClick={handleInputChange}>
                <input className="form-check-input" type="radio" value="FIN" name="identification" />
                <label className="form-check-label">
                FIN
                </label>
            </div>
        </div>
    </div>
    }

    {identification!=''? identification==="NRIC"? <div className='form-group pb-3'>
        <h4 className='fw-bold'>Enter NRIC No</h4>
        <div className="form-group">
            <label htmlFor="">NRIC No *</label>
            <input type="text" className="form-control" onChange={handleInputChange} onKeyUp={checkErrors} value={NRIC_No} id="NRIC_No" name="NRIC_No" required />
            {NRICError && <span className='text-danger'>NRIC No required *</span>}
        </div>
    </div> : <div className='form-group pb-5'> 
        <h4 className="fw-bold">Enter WP/S Pass FIN No & Expiry Date</h4>
        <div className="form-group ">
            <div className="pb-3">
                 <label htmlFor="">Work Permit or S pass FIN No *</label>
                <input type="text" className="form-control" onChange={handleInputChange} onKeyUp={checkErrors} value={work_permit} name="work_permit" id="work_permit" required />
                {workPermitError && <span className='text-danger'>Work Permit or S pass FIN No required *</span>}
            </div>
           
            <label htmlFor="">Work permit or S Pass Expiry date *</label>
            <input type="date" className="form-control" onChange={handleInputChange} value={work_permit_expiry} name="work_permit_expiry"/>
        </div> 

    </div> 

    : ""
    }

  
    </>
  )
}

Identification.propTypes = {
    participantName: PropTypes.string.isRequired,
    companyOrNot: PropTypes.string.isRequired,
    NRIC_No: PropTypes.string.isRequired,
    work_permit: PropTypes.string.isRequired,
    work_permit_expiry: PropTypes.string.isRequired,
    identification: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
}

export default Identification