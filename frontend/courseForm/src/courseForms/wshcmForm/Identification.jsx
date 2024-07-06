import PropTypes, { object } from 'prop-types';
import { useState } from 'react';

const Identification = ({handleInputChange , participantName ,companyOrNot, identification , NRIC_No , work_permit , work_permit_expiry , setFormData ,formData}) => {

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

    const [identificationNF, setIdentificationNF] = useState(null); // Track currently active logo (index)


    const handleIdentification = (index) => {
      setIdentificationNF(index); // Update the active logo state
      // Directly update the organization field in formData based on the index
      setFormData((formData) => ({
        ...formData,
        identification: index === 0 ? 'NRIC' : 'FIN',
      }));
  
      console.table(formData)
    };
  return (
    <>
    {companyOrNot && <div className='form-group pb-3'>
        <h4 className='fw-bold'>Enter Participant Details</h4>
        <div className="form-group pb-3">
            <label htmlFor="" className="fw-bold">Participant Name :</label>
            <input type="text" className='form-control' onChange={handleInputChange} onKeyUp={checkErrors} value={participantName} name="participantName" id="participantName" required />
            {participantNameError && <span className='text-danger'>Participant Name required *</span>}
        </div>

        <div className="form-group">
            <label htmlFor="" className='fw-bold pb-2'>Type of identification</label>

            

            <div className="d-flex justify-content-start align-items-center gap-3">
                    <div
                        className={`registrationLogoBox p-4 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                          identificationNF === 0 ? 'registrationLogoBoxActive' : ''
                        }`}
                        onClick={() => handleIdentification(0)}
                    >
                        
                        NRIC
                    </div>
                    <div
                        className={`registrationLogoBox p-4 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-column cursor_pointer ${
                          identificationNF === 1 ? 'registrationLogoBoxActive' : ''
                        }`}
                        onClick={() => handleIdentification(1)}
                    >
                        
                        FIN
                    </div>
                </div>
        </div>
    </div>
    }

    

    {identification!=''? identification==="NRIC"? <div className='form-group pb-3'>
        <h4 className='fw-bold'>Enter NRIC No</h4>
        <div className="form-group">
            <label htmlFor="" className="fw-bold">NRIC No <span className='text-danger'>*</span></label>
            <input type="text" className="form-control" onChange={handleInputChange} onKeyUp={checkErrors} value={NRIC_No} id="NRIC_No" name="NRIC_No" required />
            {NRICError && <span className='text-danger'>NRIC No required *</span>}
        </div>
    </div> : <div className='form-group pb-5'> 
        <h4 className="fw-bold">Enter WP/S Pass FIN No & Expiry Date</h4>
        <div className="form-group ">
            <div className="pb-3">
                 <label htmlFor="" className="fw-bold pb-2">Work Permit or S pass FIN No <span className='text-danger'>*</span></label>
                <input type="text" className="form-control" onChange={handleInputChange} onKeyUp={checkErrors} value={work_permit} name="work_permit" id="work_permit" required />
                {workPermitError && <span className='text-danger'>Work Permit or S pass FIN No required *</span>}
            </div>
           
            <label htmlFor="" className="fw-bold pb-2">Work permit or S Pass Expiry date <span className='text-danger'>*</span></label>
            <input type="date" className="form-control  d-lg-block d-none w-25" onChange={handleInputChange} value={work_permit_expiry} name="work_permit_expiry" required/>
            <input type="date" className="form-control  d-lg-none d-block" onChange={handleInputChange} value={work_permit_expiry} name="work_permit_expiry" required />
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
    formData: PropTypes.arrayOf(object).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
}

export default Identification