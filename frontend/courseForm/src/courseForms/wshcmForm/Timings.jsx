
import PropTypes from 'prop-types';

import { SUNDAY_CLASS_TIMING , TUE_THUR_FRI } from './classTimings';

const Timings = ({class_type , handleInputChange}) => {

    // const [genderIndex, setGenderIndex] = useState(null); // Track currently active logo (index)

  return (
        <>
        {class_type!==''? class_type === "Sunday class"? 


        <div className='form-group pb-5'> 

                <h5 className="fw-bold pb-2">Sunday Class Schedule *</h5>

                {SUNDAY_CLASS_TIMING && SUNDAY_CLASS_TIMING.map((item , index)=> (
                     <div key={index} className="form-check" onClick={handleInputChange}>
                                <input className="form-check-input" type="radio" value={item} name="sunday_class_timing" required/>
                                <label className="form-check-label" >
                                {item}
                                </label>
                        </div>
                ))}
        </div>
        
        : 
        
        <div className='form-group pb-5'>
                <h5 className="fw-bold" >Tuesday, Thursday, Saturday Class Schedule *</h5>

                {TUE_THUR_FRI && TUE_THUR_FRI.map((item , index)=> (
                      <div key={index} className="form-check" onClick={handleInputChange}>
                      <input className="form-check-input" type="radio" value={item} name="working_day_timing" required/>
                      <label className="form-check-label" >
                     {item}  
                      </label>
              </div>
                ))}

        </div> 
        
        : 
        
        ''}

        </>
    
    
  )
}

Timings.propTypes = {
    class_type: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
   
}


export default Timings