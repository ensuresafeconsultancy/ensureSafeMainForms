import {Link} from 'react-router-dom'

const HomePage = () => {
  return (

    <>

        <div>Homepage</div>
        <Link to="/awshpForm">GO to awshpForm </Link> <br />
        <Link to="/vmbscForm">GO to vmbscForm </Link> <br />
        <Link to="/wshcmForm">GO to WshcmForm </Link> <br />
        <Link to="/admin">GO to Admin </Link>
    
    </>
    
  )
}

export default HomePage;