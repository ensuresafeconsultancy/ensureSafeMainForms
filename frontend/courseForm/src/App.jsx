
import './App.css'

import Awshp_course from './courseExplanations/awshp_course'
import Vmbsc_course from './courseExplanations/vmbsc_course'
import Wshcm_course from './courseExplanations/wshcm_course.jsx'
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'

// import { Sidebar } from './layouts/sidebar'
// import Dashboard from './AdminPanel/Dashboard'
// import { Header } from './layouts/headers'

import './assets/css/sidebar.css'
// import Wshcm_form from './courseForms'
import AdminPanel from './AdminPanel/index.jsx'
import HomePage from './Home/homePage'

import { REG_FORM_URL_CLIENT_PATH } from './courseExplanations/RegistrationFormUrl/formUrls'
import ThankYou from './layouts/thankYou'
import './assets/css/formLayout.css'
function App() {

  return (
    <>

    <Router>
      <Routes>
    
        <Route path="/" element={<HomePage />} />

        {/* If u change this url(/fdr) then update the name in Adminpanel>index.js>addFormUrl */}
        <Route path={REG_FORM_URL_CLIENT_PATH.awshpForm} element={<Awshp_course />} />
        <Route path={REG_FORM_URL_CLIENT_PATH.vmbscForm} element={<Vmbsc_course />} />
        <Route path={REG_FORM_URL_CLIENT_PATH.wshcmForm} element={<Wshcm_course />} />

        <Route path="/thankyou" element={<ThankYou />} />

        
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/*" element={<AdminPanel />} />

      </Routes>
      
    </Router>
     
    </>
  )
}

export default App
