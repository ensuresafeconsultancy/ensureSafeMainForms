import {useEffect , useState} from 'react'

import LoadingImg from "../../assets/Loading/loading.gif";

import { getWshcmCount } from '../apiCall';
const Dashboard = () => {

  const [wshcmCount , setWshcmcount] = useState('');

  useEffect(()=>{

    (async()=>{
      const count = await getWshcmCount();

      if(count){
        setWshcmcount(count);
      }
    })();


    console.log("hello")
  },[])

  return (
    <div className="p-4 container">

      <div className="row">
        <div className="col-lg-4 col-md-6 col">
          <div className="border border-dark p-4 rounded-4">
            <h5>Forms</h5>
              <hr />

        <div className="d-flex justify-content-between">
            <strong className="h6">WSHCM Form</strong>
            <strong>{wshcmCount? wshcmCount : <img src={LoadingImg} alt="Loading..."  className="loadingImg" />}</strong>
        </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard;