
import PropTypes from 'prop-types';

import { SUNDAY_CLASS_TIMING , TUE_THUR_FRI } from './classTimings';

const Timings = ({class_type , setFormData}) => {
        // handleInputChange

    // const [genderIndex, setGenderIndex] = useState(null); // Track currently active logo (index)

    function selectBox(event) {
        // Get all the divs with the relevant classes
        const allDivs = document.querySelectorAll('.registrationLogoBox.timingChange');
      
        // Remove the 'registrationLogoBoxActive' class from all divs first
        allDivs.forEach(div => div.classList.remove('registrationLogoBoxActive'));
      
        // Add the 'registrationLogoBoxActive' class only to the clicked div
        const clickedDiv = event.currentTarget;
        clickedDiv.classList.add('registrationLogoBoxActive');

        // console.log("value = " , event.target.value)
        // console.log("target =  " ,event.target)
        // console.log("name =  " ,event.target.__reactProps$g9c2rqddy8.name)
        // console.log("children =  " ,event.target.__reactProps$g9c2rqddy8.value)
        // handleInputChange(event);


        // console.log(event.target.attributes.name.nodeValue)
        // console.log(event.target.attributes.value.nodeValue)
        const elementName = event.target.attributes.name.nodeValue;
        const elementValue = event.target.attributes.value.nodeValue;

        setFormData((formData)=> ({...formData , [elementName] : elementValue}))

      }
      

  return (
        <>
        {class_type!==''? class_type === "Sunday class"? 


        <div className='form-group pb-5'> 

                <h5 className="fw-bold pb-2">Sunday Class Schedule *</h5>

                {/* {SUNDAY_CLASS_TIMING && SUNDAY_CLASS_TIMING.map((item , index)=> (
                     <div key={index} className="form-check" onClick={handleInputChange}>
                                <input className="form-check-input" type="radio" value={item} name="sunday_class_timing" required/>
                                <label className="form-check-label" >
                                {item}
                                </label>
                        </div>
                ))} */}

                <div className="d-flex justify-content-center align-items-start flex-column gap-2">
                        {SUNDAY_CLASS_TIMING && SUNDAY_CLASS_TIMING.map((item , index)=> (
                                <div key={index} name="sunday_class_timing" value={item} className="registrationLogoBox timingChange py-2 px-3 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-row cursor_pointer" onClick={(e)=> selectBox(e)}>
                                        
                                <div name="sunday_class_timing" value={item} className="p-2 rounded-circle border bg-white radioBtnShadow"></div>

                                {item}

                                </div>
                        
                                ))}
                </div>

        </div>
        
        : 
        
        <div className='form-group pb-5'>
                <h5 className="fw-bold" >Tuesday, Thursday, Saturday Class Schedule *</h5>

                {/* {TUE_THUR_FRI && TUE_THUR_FRI.map((item , index)=> (
                      <div key={index} className="form-check" onClick={handleInputChange}>
                      <input className="form-check-input" type="radio" value={item} name="working_day_timing" required/>
                      <label className="form-check-label" >
                     {item}  
                      </label>
              </div>
                ))} */}

                <div className="d-flex justify-content-center align-items-start flex-column gap-2">
                {TUE_THUR_FRI && TUE_THUR_FRI.map((item , index)=> (
                        <div key={index} name="working_day_timing" value={item} className="registrationLogoBox timingChange py-2 px-3 rounded-4 border d-flex justify-content-center align-items-center gap-2 flex-row cursor_pointer" onClick={(e)=> selectBox(e)}>
                                
                        <div name="working_day_timing" value={item} className="p-2 rounded-circle border bg-white radioBtnShadow"></div>

                        {item}

                        </div>
                       
                        ))}
                </div>

        </div> 
        
        : 
        
        ''}

        </>
    
    
  )
}

Timings.propTypes = {
    class_type: PropTypes.string.isRequired,
//     handleInputChange: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
   
}


export default Timings