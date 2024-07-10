import LoadingImg from "../../assets/Loading/loading.gif";
import { useState } from "react";
import { downloadDocPdf , downloadDocCsv , deleteAllFormData} from "../apiCall";
import PropTypes from 'prop-types';

import { LuRefreshCcw } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";


const Header = ({handleRefreshClick , formName , addFormUrl}) => {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const getDocPdf = async (formName) => {
    try {
      setPdfLoading(true);
      await downloadDocPdf(formName);
      setPdfLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getDocExcel = async (formName) => {
    try {
      setExcelLoading(true);
      await downloadDocCsv(formName);
      setExcelLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAll = async (formName) => {
    try {
      await deleteAllFormData(formName);
      handleRefreshClick(formName)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="d-flex justify-content-between align-items-center gap-2 py-3 pb-4 px-lg-5 px-2 ">

<div className="d-flex justify-content-center align-items-center gap-2">
      <h4 className="fw-bolder">{formName} Forms</h4>

       <span className="refreshBox p-2 d-flex justify-content-center align-items-center rounded-circle cursor_pointer" onClick={()=>handleRefreshClick(formName)}>
          <LuRefreshCcw className="refreshIcon" />
        </span>
     
</div>

<div className="d-flex justify-content-end align-items-center gap-2">
 

    
      <div className="btn-group">
      <button className="btn dropdown-toggle exportPdf border rounded-pill px-3 py-2" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
        Exports
      </button>
      <ul className="dropdown-menu">
        <li className="cursor_pointer"  onClick={() => getDocPdf(formName)}><span className="dropdown-item exportPdf" >Export as PDF{" "}
            {pdfLoading ? (
              <img src={LoadingImg} className="loadingImg" alt="loading" />
            ) : (
              ""
            )}</span></li>
        <li className="cursor_pointer" onClick={() => getDocExcel(formName)}><span className="dropdown-item exportPdf" > Export as Excel sheet{" "}
            {excelLoading ? (
              <img src={LoadingImg} className="loadingImg" alt="loading" />
            ) : (
              ""
            )}</span></li>
      </ul>
    </div>
      <div className="btn-group ">
      <button className="btn dropdown-toggle exportPdf border rounded-pill px-3 py-2" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
        Others
      </button>
      <ul className="dropdown-menu">
        <li className="cursor_pointer">

        <Link
            className="cursor_pointer px-2 py-2  exportPdf text-decoration-none text-dark d-flex justify-content-center align-items-center gap-1" to={addFormUrl}  >
            <FaPlus />
        Add new data
          </Link>

        </li>
        <li className="cursor_pointer">

        <span
            className="cursor_pointer text-nowrap exportPdf px-3 py-2  d-flex justify-content-start align-items-center gap-2"
            onClick={() => deleteAll(formName)}
          >
            <ImCross />
            Delete all {" "}
          </span>

        </li>
      </ul>
    </div>

</div>
    

     
    </div>
  );
};

Header.propTypes = {
  formName : PropTypes.string.isRequired,
  addFormUrl : PropTypes.string.isRequired,
  handleRefreshClick : PropTypes.func.isRequired
}


export default Header;
