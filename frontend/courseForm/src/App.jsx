
import './App.css'

import Wshcm_course from './courseExplanations/wshcm_course.jsx'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'

// import { Sidebar } from './layouts/sidebar'
// import Dashboard from './AdminPanel/Dashboard'
// import { Header } from './layouts/headers'

import './assets/css/sidebar.css'
// import Wshcm_form from './courseForms'
import AdminPanel from './AdminPanel/index.jsx'
import HomePage from './Home/homePage'
function App() {

  return (
    <>



    <Router>
      <Routes>
    
        <Route path="/" element={<HomePage />} />
        <Route path="/WshcmForm" element={<Wshcm_course />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/*" element={<AdminPanel />} />

      </Routes>
      
  
    {/* <Wshcm_course /> */}
        
        {/* <Route path="/" element={<Sidebar />} /> */}
        
        {/* <Wshcm_course /> */}

        {/* <AdminPanel /> */}

    </Router>
     
    </>
  )
}

export default App
