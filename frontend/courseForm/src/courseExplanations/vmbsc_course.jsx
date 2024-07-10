// import React from 'react'
import Wshcm_form from '../courseForms/wshcmForm'
// import CheckForm from '../courseForms/wshcmForm/checkForm'

import EnsureSafeLogo from '../assets/logos/Ensure-Safe-Logo-min.png'
const Vmbsc_course = () => {
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

            <h2 className='fw-bolder mainColor'>VEHICLE AND MACHINERY BANKSMEN SAFETY COURSE (VMBSC)-S$90</h2>
            <hr />

            <h4 className='fw-bold mainColor'>For Whom:</h4>
            <p>This course is suitable for Construction / Workshop worker
            Road worker
            or any person who is interested to learn about vehicle safety in their workplaces.
            Assumed Attitude, Skills and Knowledge / Entry Requirement</p>
            <p>Learners should be able to Read, Write and Converse in Simple English.</p>

            <h4 className='fw-bold mainColor'>Course Overview:</h4>
            <p>This “Vehicle and Machinery Banksmen Safety Course” aims to provide the basic skill requirements and associated job safety knowledge to persons carrying out vehicle Banksman duties. By the end of the course, participants should be able to :</p>
            <p>Ensure the safe passage of reversing vehicles in confined areas. <br />
                Identify areas of danger within the site.</p>
            <p>Guide all vehicles/machinery excavator’s rigid and articulated lorry using recommended codes of signals.</p>



            <h4 className='fw-bold mainColor'>Course Content</h4>
            <ul>
                <li>Banks man -Introduction</li>
                <li>Roles and responsibilities of the Banksman</li>
                <li>Legal Requirements in relation to workplace machineries, vehicles</li>
                <li>Risks involved in Banksman operations</li>
                <li>Different types of vehicles, machineries and plants used in the working
            area and their blind spots</li>
            <li>Safe operations and Banksman Code of signals</li>
            <li>Personal Protective Equipment (PPE) used for Banksman Job</li>
            <li>Emergency Prepardness</li>
            </ul>

            <p className='fw-bold'>Course Duration:4 hours (Including Examination 15 Minutes)</p>
            <p>Medium of Instruction: English</p>

            {/* <p>Banks man -Introduction <br />
Roles and responsibilities of the Banksman <br />
Legal Requirements in relation to workplace machineries, vehicles<br />
Risks involved in Banksman operations<br />
Different types of vehicles, machineries and plants used in the working<br />
area and their blind spots<br />
Safe operations and Banksman Code of signals<br />
Personal Protective Equipment (PPE) used for Banksman Job<br />
Emergency Prepardness</p> */}
        
            <h4 className="fw-bold mainColor">Teaching Methodology:</h4>
            <ul>
                <li>Face to Face class room teaching</li>
                <li>Online webinar class</li>
            </ul>

            <h4 className="fw-bold mainColor">Learning Environment:</h4>
            <p>Our ergonomically designed class rooms are fully air-conditioned, equipped with white boards; audio/video equipment’s and free wi-fi</p>

            <h4 className="fw-bold mainColor">Qualification or experience of facilitators:</h4>
            <p>A facilitator and assessor of this course will possess the following:</p>

            <ul>
                <li>Specialist Diploma in WSH</li>
                <li>Advanced Certificate in Training and Assessment (ACTA) qualification.</li>
                <li>At least 3 years of working experience in relevant industry.</li>
                <li>Class Size: Maximum 20</li>
            </ul>
           

            <h4 className="fw-bold mainColor">Facilitator/Learner Ratio:</h4>
            <p>1:20 for Theory Lesson & Assessment</p>

            <h4 className="fw-bold mainColor">Attendance Requirements</h4>
            <p>100%</p>

            <h4 className="fw-bold mainColor">Written Examinations:</h4>
            <p>Duration : 15 Minutes <br />
            10 MCQ ( One Marks Each) <br />
            Pass Mark for Written Exam: 60%</p> <br />
          
            <h4 className="fw-bold mainColor">Certification:</h4>
            <p>Based on the successful completion of the course and assessment, a Statement of Attainment (SOA) from the Skillsfuture Singapore (SSG) and a Safety Pass from Ensure safe consultancy Pte. Ltd. will be awarded to the trainee.</p>
            <p>E-certificate available</p>

            <h4 className="fw-bold mainColor">Course Venue</h4>
            <p>3, Soon Lee Street,#02-05 Pioneer Junction, Singapore-627606</p>

            <h4 className="fw-bold mainColor">Renewal Points for professionals:</h4>
            <p>Not Available</p>

            <h4 className="fw-bold mainColor">Course Fees</h4>
            <p>$90/-</p>

            <h4 className="fw-bold mainColor">Contact Details</h4>
            <p>+65 9680 5878 <br />+65 69777350</p>



            <hr />


        <Wshcm_form formName={'VMBSC'} />

        </div>


    </section>
  )
}

export default Vmbsc_course;    