import {Link} from 'react-router-dom'

const HomePage = () => {
  return (

    <>

        <div>Homepage</div>
        <Link to="/WshcmForm">GO to WshcmForm </Link> <br />
        <Link to="/admin">GO to Admin </Link>
    
    </>
    
  )
}

export default HomePage;