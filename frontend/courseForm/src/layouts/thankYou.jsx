import SUCCESS_ICON from '../assets/logos/successIcon.png'

import { FaListAlt } from "react-icons/fa";

import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosCall } from "react-icons/io";

import { FaBookOpen } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { AiFillInstagram } from "react-icons/ai";

import PLAY_STORE from '../assets/logos/google-play.png'
import APPLE_STORE from '../assets/logos/apple-logo.png'


import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const ThankYou = () => {

    const successIcon = {
        height : '70px'
    }

    const socialMediaIconSize = {
        fontSize : '22px'
    }

    const mainThankyouBox = {
        backgroundColor : '#5151ff',
        color : '#fff'
    }

  
  return (
    <div className="container pt-3 pb-5">
        <div className="row">
            <div className="col-lg-2 col-0"></div>
            <div className="col-lg-8 col">
                <div className="border rounded-2 pb-5" style={mainThankyouBox}>
                    <div className=" text-center pt-5">
                        <h5 className="fw-bold">Your Registration</h5>
                        <h5 className="fw-bold">has been</h5>
                        <h3 className="fw-bolder" style={{letterSpacing : "1px"}}>Successfully Submitted.</h3>
                        <img src={SUCCESS_ICON} style={successIcon} className='mt-3' alt="" />

                        <h2 className='fw-bold pt-4'  style={{letterSpacing : "2px"}}>Thank you</h2>
                        <h6>We contact you soon.</h6>
                        <div className="d-flex justify-content-center gap-2 pt-5 flex-wrap">
                            <a href="https://www.ensuresafe.sg/courses/" className="px-3 py-2 text-decoration-none border cursor_pointer rounded-4  d-flex  justify-content-center align-items-center gap-2 redirectWebsiteBtn" target="_blank"> <FaListAlt /> Courses</a>
                            <a href="https://www.ensuresafe.sg/wp-content/uploads/2024/06/ALL-COURSES-BROCHURE.pdf" className="px-3 py-2 text-decoration-none border cursor_pointer rounded-4 d-flex  justify-content-center align-items-center gap-2 redirectWebsiteBtn" target="_blank"><FaBookOpen /> Brochure</a>
                        </div>


                    </div>
                    
                    <div className="row px-lg-5 px-4 pt-4 ">
                    <div className="col-lg-6">
                            <h5 className='pt-lg-0 pt-4 text-center fw-bold'>Follow us:</h5>

                            <div className="d-flex justify-content-center gap-2 align-items-center flex-row  pt-3">
                                    <a href="https://www.facebook.com/Ensuresafeconsultancy" target="_blank" data-tooltip-id="facebook_TT" data-tooltip-content="Facebook" className="d-flex text-decoration-none justify-content-start gap-2 align-items-center p-3  rounded-circle facebookIconTY iconTY" style={{width : 'fit-content'}}>
                                        <FaFacebook style={socialMediaIconSize} />
                                        <Tooltip id="facebook_TT" />
                                    </a>
                                    <a href="https://www.youtube.com/@ensuresafeconsultanc" target="_blank"  data-tooltip-id="youtube_TT" data-tooltip-content="YouTube"  className="d-flex justify-content-start gap-2 align-items-center p-3  rounded-circle youtubeIconTY iconTY" style={{width : 'fit-content'}}>
                                        <FaYoutube  style={socialMediaIconSize}  /> 
                                        <Tooltip id="youtube_TT" />
                                    </a>
                                    <a href="https://www.linkedin.com/company/ensure-safe-consultancy-pte-ltd" target="_blank"  data-tooltip-id="linkedin_TT" data-tooltip-content="LinkedIn"  className="d-flex justify-content-start gap-2 align-items-center p-3  rounded-circle linkedinIconTY iconTY" style={{width : 'fit-content'}}>
                                        <FaLinkedin style={socialMediaIconSize} />
                                        <Tooltip id="linkedin_TT" />
                                    </a>
                                    <a href="https://www.instagram.com/ensuresafeconsultancy" target="_blank" data-tooltip-id="Instagram_TT" data-tooltip-content="Instagram"  className="d-flex justify-content-start gap-2 align-items-center p-3  rounded-circle instagramIconTY iconTY" style={{width : 'fit-content'}}>
                                        <AiFillInstagram style={socialMediaIconSize} /> 
                                        <Tooltip id="Instagram_TT" />
                                    </a>

                            </div>

                      
                        </div>

                        <div className="col-lg-6">
                            <h5 className='text-center pt-lg-0 pt-5 fw-bold'>Contact us:</h5>
                            <div className=" d-flex  justify-content-center pt-3 align-items-center flex-column gap-3">
                                    <a href="https://api.whatsapp.com/send/?phone=6596805878&text&type=phone_number&app_absent=0" target="_blank" data-tooltip-id="whatsapp_TT" data-tooltip-content="Whatsapp"  className="d-flex justify-content-center gap-2 align-items-center p-3 whatsappIconTY rounded-circle iconTY" style={{width : 'fit-content'}} >
                                        <IoLogoWhatsapp style={socialMediaIconSize} />
                                        <Tooltip id="whatsapp_TT" />
                                    </a>
                                    <div className="">
                                        <span> <IoIosCall style={socialMediaIconSize}/> +65 96805878</span>
                                    </div>
                                    <div className="">
                                        <span> <MdEmail style={socialMediaIconSize}/> training@ensuresafe.sg</span>
                                    </div>

                            </div>
                       
                        </div>
                        
                    </div>
                    
                    <div className="pt-5 px-4">
                            <h5 className='text-center'>Download our app:</h5>
                            <div className="d-flex  justify-content-center gap-2 flex-wrap">
                                <a href='https://play.google.com/store/apps/details?id=com.ensuresafe.app' target="_blank" className="border text-decoration-none rounded-2 d-flex  justify-content-center align-items-center px-3 py-2 gap-2 redirectWebsiteBtn">
                                    <img src={PLAY_STORE} style={{height : '40px'}} alt="" /> Play store 
                                </a>
                                <a href="https://apps.apple.com/in/app/ensure-safe-lms-app/id6443871756" target="_blank" className="border text-decoration-none rounded-2 d-flex  justify-content-center align-items-center px-3 py-lg-2 py-3 gap-2 redirectWebsiteBtn">
                                    <img src={APPLE_STORE} style={{height : '35px'}} alt="" /> Apple store 
                                </a>
                            </div>
                        </div>

                </div>
            </div>
            <div className="col-lg-2 col-0"></div>
        </div>




    </div>
  )
}

export default ThankYou;