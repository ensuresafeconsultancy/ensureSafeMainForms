import {useEffect , useState} from 'react'

import LoadingImg from "../../assets/Loading/loading.gif";

import { getWshcmCount } from '../apiCall';
const Dashboard = () => {

  // const [wshcmCount , setWshcmcount] = useState('null');

  const [formNameCounts , setFormNameCounts] = useState('null');

  useEffect(()=>{

    (async()=>{
      const formNameCounts = await getWshcmCount();
      console.log("Dashboard useEffect");


      setFormNameCounts(formNameCounts);

      // console.log("count = " , count)

      // if(count>=0){
      //   setWshcmcount(count);
      //   // setWshcmcount(6);
      // }
    })();


    console.log("hello")
  },[])

  return (
    <div className="p-4 container">

      <div className="row">
        <div className="col-lg-6 col-md-6 col">
          <div className="border border-dark p-lg-4 p-3 rounded-4" style={{overflowX : 'auto'}}>
            <table className="table text-center" style={{overflowX : 'auto'}}>
              <thead>
                <tr>

                  <th>Forms</th>
                  <th className='text-nowrap'>Submitted count</th>
                  <th>Company</th>
                  <th>Individual</th>


                </tr>
               
              </thead>
              <tbody style={{overflowX : 'auto'}}>
              {formNameCounts!='null'? !formNameCounts? "No forms submitted" : formNameCounts.map((item , index)=>{

                return <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.count}</td>
                  <td>{item.companyCount}</td>
                  <td>{item.individualCount}</td>
                </tr>
                

              })
              :
              <img src={LoadingImg} alt="Loading..."  className="loadingImg" />
      
              }
              </tbody>
            </table>
          </div>


          {/* <div className="border border-dark p-4 rounded-4">
            <h5>Forms</h5>
              <hr /> */}

        {/* <div className="d-flex justify-content-between">
            <strong className="h6">WSHCM Form</strong>
            <strong>{wshcmCount!= 'null'? wshcmCount : <img src={LoadingImg} alt="Loading..."  className="loadingImg" />}</strong>
        </div> */}


          {/* {formNameCounts!='null'? formNameCounts.length == 0? "No forms submitted" : formNameCounts.map((item , index)=>{
            return <div key={index} className="d-flex justify-content-between">
            <strong className="h6">{item._id}</strong>
            <strong>{item.count}</strong>
        </div>
          })
        :
        <img src={LoadingImg} alt="Loading..."  className="loadingImg" />

        }



          </div> */}

        </div>
      </div>

    </div>
  )
}

export default Dashboard;