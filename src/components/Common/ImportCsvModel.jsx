import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ImportCsvModel = ({ modelStatus, setModelStatus, item, callBack }) => {
  const fileRef = useRef();
  const handleImport = async () => {
    if (!fileRef.current.files[0]) {
      return toast.error("please select the file");
    }

    try {
      const formData = new FormData();
      formData.append("file", fileRef.current.files[0]);
      const res = await item.api(formData);

      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        setModelStatus(false);
        callBack && callBack();
      } else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log("err in import " + item.title + "csv", error);
    }
  };

  return (
    <Modal
      show={modelStatus}
      onHide={() => {
        setModelStatus(false);
      }}
      className="deleteAdd-pop delete-pop"
      centered
    >
      <Modal.Body>
        <div className="text-center py-3">
          <h2 className="pop-head m-0 pb-2">Import {item.title}</h2>
          <input
            ref={fileRef}
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <a href={item.sampleUrl}>sample csv</a>
          <div className="btn-wrap my-2 d-flex align-items-center justify-content-center mt-3 gap-10">
            <div className="pe-2 w-50">
              <Button
                className="btn-2 w-100 d-flex align-items-center justify-content-center commonBtn"
                onClick={() => {
                  setModelStatus(false);
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="pe-2 w-50">
              <Button
                className=" w-100 d-flex align-items-center justify-content-center commonBtn"
                onClick={handleImport}
              >
                Import
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImportCsvModel;
