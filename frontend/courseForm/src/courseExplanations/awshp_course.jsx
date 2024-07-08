// import React from 'react'
import Wshcm_form from '../courseForms/wshcmForm'
// import CheckForm from '../courseForms/wshcmForm/checkForm'

import EnsureSafeLogo from '../assets/logos/Ensure-Safe-Logo-min.png'
const Awshp_course = () => {
  return (
    <section className=" pb-lg-5 pt-lg-5 " id='formMainBox'>
        <div className="container pt-5 pb-5 px-lg-5 px-4 formMainBoxBorder rounded-4">


      <div className="text-center">

        <img src={EnsureSafeLogo} className="ensureSafeMainLogo" alt="" />
        <div className="">
          {/* <h1 className='text-center fw-bolder'>Ensure Safe Consultancy</h1> */}
            <h2 className="text-center fw-bolder mainColor">COURSE REGISTRATION FORM</h2>

        </div>

        
      </div>
          


            <hr />

            <h2 className='fw-bolder mainColor'>APPLY WORKPLACE SAFETY AND HEALTH IN PROCESS PLANT (AWSHPP-English-Blended)-S$90</h2>
            <hr />

            <h4 className='fw-bold mainColor'>Course Overview:</h4>
            <p>This “Apply Workplace Safety and Health in Process Plant course” is previously known as Oil and Petrochemical Safety Orientation Course (OPSOC). On completion of this unit, learners will have the skills and knowledge in applying workplace safety and health practices to ensure the safety of oneself and others at work in the Oil and Petrochemical industry.</p>

            <h4 className='fw-bold mainColor'>Who Should Attend This Course?</h4>
            <p>This course is mandatory to all personnel who are working in the Oil and Petrochemical plants in Singapore.</p>
            <p>The occupations that this unit would be relevant to include but not limited to:</p>
            <p>Workers, Supervisors, Technicians, engineers or Managers who are involved in planning /assessment or management of work activities in the process industries</p>
            
            <h4 className="fw-bold mainColor">Course Objectives</h4>
            <ul>
                <li>Understand legal obligations to Apply Workplace Safety and Health.</li>
                <li>Identify hazards in oil and petrol chemical plant and other sites within the premises.</li>
                <li>Recognize all types of industrial safety signs</li>
                <li>Put on Personal Protective Equipment (PPE)</li>
                <li>Take safety precautions when working with different hazards.</li>
                <li>Respond in case of fire or emergency.</li>
            </ul>

            <h4 className="fw-bold mainColor">Pre-Requisites / Assume Skills And Knowledge</h4>
            <p>Learners must be able to apply numbers, listen, read, speak & write English at a proficiency level equivalent to the Employability Skills System (ESS-Level-2)</p>

            <h4 className="fw-bold mainColor">Trainer To Trainee Ratio</h4>
            <p>1: 20 (Classroom)</p>

            <h4 className="fw-bold mainColor">Course Duration</h4>
            <p>9 hours (Training 8 hours, Assessment 1 hour)</p>

            <h4 className="fw-bold mainColor">Attendance Requirements</h4>
            <p>100%</p>

            <h4 className="fw-bold mainColor">Assessment</h4>
            <p>Practical Performance</p>
            <p>Written / Oral Questioning Session</p>

            <h4 className="fw-bold mainColor">Training Methodology - Blended Learning</h4>
            <p>Lecture Slides presentation, self-directed learning, e-learning, group discussion, presentation sharing of best practice and incident. Hands on practical session.</p>

            <h4 className="fw-bold mainColor">Passing marks</h4>
            <p>Learner must achieve 100% (Competent or not yet Competent / C or NYC)</p>

            <h4 className="fw-bold mainColor">Certifications</h4>
            <p>Upon successful completion of the course a Statement of Attainment (SOA) will be awarded by Skills</p>
            <p>Future Singapore Agency (SSG)</p>

            <h4 className="fw-bold mainColor">Course Fees</h4>
            <p>$90/-</p>

            <h4 className="fw-bold mainColor">Course Venue</h4>
            <p>No. 3 Soon Lee Street, #02-05, Pioneer Junction, S (627606).</p>

            <h4 className="fw-bold mainColor">Contact Details</h4>
            <p>+65 9680 5878 <br />+65 69777350</p>



            <hr />


        <Wshcm_form formName={'AWSHP'} />

        </div>


    </section>
  )
}

export default Awshp_course;    