import LoadingImg from "../../assets/Loading/loading.gif";
import { useState } from "react";
import { downloadDocPdf , downloadDocCsv , deleteAllWshcmData} from "../apiCall";
const Header = () => {
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
    <div className="d-flex justify-content-end py-3 pb-5 px-lg-5 px-2 gap-2">
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
        {/* {deleteAllLoading ? (
          <img src={LoadingImg} className="loadingImg" alt="loading" />
        ) : (
          ""
        )} */}
      </span>
    </div>
  );
};

export default Header;
