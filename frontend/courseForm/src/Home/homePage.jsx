import {Link} from 'react-router-dom'

import { REG_FORM_URL_CLIENT_PATH } from '../courseExplanations/RegistrationFormUrl/formUrls';
// import SignatureApp from './signatureTry';
const HomePage = () => {
  return (

    <>

        <div>Homepage</div>
        <Link to={REG_FORM_URL_CLIENT_PATH.awshpForm}>GO to awshpForm </Link> <br />
        <Link to={REG_FORM_URL_CLIENT_PATH.vmbscForm}>GO to vmbscForm </Link> <br />
        <Link to={REG_FORM_URL_CLIENT_PATH.wshcmForm}>GO to WshcmForm </Link> <br />
        <Link to="/signatureApp">GO to Signature </Link> <br />


        
        <Link to="/admin">GO to Admin </Link>
    
    </>
    
  )
}

export default HomePage;