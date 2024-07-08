import {Link} from 'react-router-dom'

const HomePage = () => {
  return (

    <>

        <div>Homepage</div>
        <Link to="/wshcmForm">GO to WshcmForm </Link> <br />
        <Link to="/awshpForm">GO to awshpForm </Link> <br />
        <Link to="/admin">GO to Admin </Link>
    
    </>
    
  )
}

export default HomePage;