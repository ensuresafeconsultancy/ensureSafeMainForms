
import PropTypes from 'prop-types';

const Timings = ({class_type , classTypeChange}) => {
  return (
        <>
        {class_type!==''? class_type === "Sunday class"? <div className='form-group pb-5'> 

                <h5 className="fw-bold">Sunday Class Schedule *</h5>
                <div className="form-check" onClick={classTypeChange}>
                        <input className="form-check-input" type="radio" value="7 & 14 Apr 2024(9.00am To 6.00pm) " name="sunday_class_timing" required/>
                        <label className="form-check-label" >
                        7 & 14 Apr 2024(9.00am To 6.00pm) 
                        </label>
                </div>

                <div className="form-check" onClick={classTypeChange}>
                    <input className="form-check-input" type="radio" value="21 & 28 Apr 2024(9.00am To 6.00pm)" name="sunday_class_timing" />
                    <label className="form-check-label">
                    21 & 28 Apr 2024(9.00am To 6.00pm)
                    </label>
                </div>
                </div> : <div className='form-group pb-5'>
                <h5 className="fw-bold" >Tuesday, Thursday, Saturday Class Schedule *</h5>
                <div className="form-check" onClick={classTypeChange}>
                        <input className="form-check-input" type="radio" value="6 & 7 Apr 2024 (9.00am To 6.00pm)" name="working_day_timing" required/>
                        <label className="form-check-label" >
                        6 & 7 Apr 2024 (9.00am To 6.00pm)   
                        </label>
                </div>

                <div className="form-check" onClick={classTypeChange}>
                    <input className="form-check-input" type="radio" value="13 & 14 Apr 2024 (9.00am To 6.00pm)" name="working_day_timing" />
                    <label className="form-check-label">
                    13 & 14 Apr 2024 (9.00am To 6.00pm)
                    </label>
                </div>
            
                <div className="form-check" onClick={classTypeChange}>
                    <input className="form-check-input" type="radio" value="20 & 21 Apr 2024 (9.00am To 6.00pm)" name="working_day_timing" />
                    <label className="form-check-label">
                    20 & 21 Apr 2024 (9.00am To 6.00pm)
                    </label>
                </div>
                <div className="form-check" onClick={classTypeChange}>
                    <input className="form-check-input" type="radio" value="27 & 28 Mar 2024 (9.00am To 6.00pm)" name="working_day_timing" />
                    <label className="form-check-label">
                    27 & 28 Mar 2024 (9.00am To 6.00pm)
                    </label>
                </div>
                
                </div> : ''}

        </>
    
    
  )
}

Timings.propTypes = {
    class_type: PropTypes.string.isRequired,
    classTypeChange: PropTypes.func.isRequired,
}


export default Timings