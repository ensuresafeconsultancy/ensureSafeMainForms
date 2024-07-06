import LoadingImg from "../../assets/Loading/loading.gif";
import { useState } from "react";
import { downloadDocPdf , downloadDocCsv , deleteAllWshcmData} from "../apiCall";
import PropTypes from 'prop-types';

import { LuRefreshCcw } from "react-icons/lu";
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
    <div className="d-flex justify-content-end align-items-center gap-2 py-3 pb-5 px-lg-5 px-2">

     

      {/* <div className="d-flex justify-content-center align-items-center gap-2" > */}

        <span className="refreshBox d-flex justify-content-center align-items-center rounded-circle cursor_pointer" onClick={()=>handleRefreshClick()}>
          <LuRefreshCcw className="refreshIcon" />
        </span>

      <span
        className="cursor_pointer px-3 py-2 border rounded-pill exportPdf d-flex justify-content-center align-items-center gap-1"
        onClick={() => getDocExcel()}
      >
        Export as Excel sheet{" "}
        {excelLoading ? (
          <img src={LoadingImg} className="loadingImg" alt="loading" />
        ) : (
          ""
        )}
      </span>
      <span
        className="cursor_pointer px-3 py-2 border rounded-pill exportPdf d-flex justify-content-center align-items-center gap-1"
        onClick={() => getDocPdf()}
      >
        Export as PDF{" "}
        {pdfLoading ? (
          <img src={LoadingImg} className="loadingImg" alt="loading" />
        ) : (
          ""
        )}
      </span>
      <span
        className="cursor_pointer px-3 py-2 border rounded-pill exportPdf d-flex justify-content-center align-items-center gap-1"
        onClick={() => deleteAll()}
      >
        Delete all data{" "}
      </span>

      {/* </div> */}


     
    </div>
  );
};

Header.propTypes = {
  handleRefreshClick : PropTypes.func.isRequired
}


export default Header;
