import LoadingImg from "../../assets/Loading/loading.gif";
import { useState } from "react";
import { downloadDocPdf , downloadDocCsv , deleteAllWshcmData} from "../apiCall";
import PropTypes from 'prop-types';

import { LuRefreshCcw } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";


const Header = ({handleRefreshClick}) => {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const getDocPdf = async () => {
    try {
      setPdfLoading(true);
      await downloadDocPdf();
      setPdfLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getDocExcel = async () => {
    try {
      setExcelLoading(true);
      await downloadDocCsv();
      setExcelLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAll = async () => {
    try {
      await deleteAllWshcmData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="d-flex justify-content-end align-items-center gap-2 py-3 pb-4 px-lg-5 px-2 flex-wrap">

     

      {/* <div className="d-flex justify-content-center align-items-center gap-2" > */}

        <span className="refreshBox p-2 d-flex justify-content-center align-items-center rounded-circle cursor_pointer" onClick={()=>handleRefreshClick()}>
          <LuRefreshCcw className="refreshIcon" />
        </span>
     

      {/* </div> */}

      <div className="btn-group">
  <button className="btn dropdown-toggle exportPdf border rounded-pill px-3 py-2" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
    Exports
  </button>
  <ul className="dropdown-menu">
    <li className="cursor_pointer"  onClick={() => getDocPdf()}><span className="dropdown-item exportPdf" >Export as PDF{" "}
        {pdfLoading ? (
          <img src={LoadingImg} className="loadingImg" alt="loading" />
        ) : (
          ""
        )}</span></li>
    <li className="cursor_pointer" onClick={() => getDocExcel()}><span className="dropdown-item exportPdf" > Export as Excel sheet{" "}
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
        className="cursor_pointer px-2 py-2  exportPdf text-decoration-none text-dark d-flex justify-content-center align-items-center gap-1" to="/WshcmForm"  >
        <FaPlus />
     Add new data
      </Link>

    </li>
    <li className="cursor_pointer">

    <span
        className="cursor_pointer text-nowrap exportPdf px-3 py-2  d-flex justify-content-start align-items-center gap-2"
        onClick={() => deleteAll()}
      >
        <ImCross />
        Delete all {" "}
      </span>

    </li>
  </ul>
</div>

     
    </div>
  );
};

Header.propTypes = {
  handleRefreshClick : PropTypes.func.isRequired
}


export default Header;
