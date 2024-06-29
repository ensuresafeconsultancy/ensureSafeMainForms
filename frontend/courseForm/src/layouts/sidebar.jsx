import { Link } from 'react-router-dom'
// import EnsureSafeLogo from '../assets/logos'
export function Sidebar(){
    return (
        <>
            <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light d-flex align-items-center justify-content-center" >  <strong className="d-inline-block h4 fw-bold">Admin Panel</strong> </div>
                {/* <img className='Bk_Logo rounded-circle shadow'  src={EnsureSafeLogo}/> */}
                <div className="list-group list-group-flush overflow-hidden">
                    
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/admin/dashboard" > Dashboard</Link>
                    <div className="accordion " id="accordionExample">
                   

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Forms
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body p-0">
                            <Link className="list-group-item list-group-item-action list-group-item-light border-none p-3 " to="/admin/WshcmForm" >WSHCM Forms</Link>

                        </div>
                        </div>
                    </div>
                    </div>

                    {/* <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/products" >Products</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/users"  >Users</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/vendors"  >Vendors</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orders" >Orders</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/faqs" >FAQs</Link> */}
         
                </div>
            </div>
            

        </>
    )
}