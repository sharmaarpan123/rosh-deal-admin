import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ImportCsvModel from "./ImportCsvModel";

const ImportCsv = ({ item, callBack }) => {
  const [modelStatus, setModelStatus] = useState(false);
  return (
    <>
      <ImportCsvModel
        modelStatus={modelStatus}
        setModelStatus={setModelStatus}
        item={item}
        callBack={callBack}
      />
      <Button
        className="d-flex align-items-center justify-content-center fw-sbold commonBtn GreyBtn"
        style={{ height: 40, minWidth: 100, fontSize: 12 }}
        onClick={() => setModelStatus(true)}
      >
        Import CSV
      </Button>
    </>
  );
};

export default ImportCsv;
