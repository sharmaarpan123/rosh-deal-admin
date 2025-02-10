import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

// css
import styles from "./PaymentStatusChangeModel.module.scss";
import Papa from "papaparse";
import { catchAsync, checkResponse } from "../../../utilities/utilities";
import { toast } from "react-toastify";
import { BULK_PAYMENT_STATUS_CHANGE } from "../../../services/ApiCalls";
import TableToggle from "../../Common/TableToggle";
import { paymentStatusOptions } from "../../../utilities/const";
import * as XLSX from "xlsx";

// img

const PaymentStatusChangeModel = ({ show, setModal, refetch }) => {
  const [ids, setIds] = useState([]);
  const [status, setStatus] = useState("pending");
  const hideHandler = () => {
    setModal(false);
  };

  const onCSVSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log(file, "file");

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      let parsedData = XLSX.utils.sheet_to_json(sheet);

      const data = [];
      let _idKeyIndex = "";
      parsedData.forEach((row) => {
        const arr = Object.keys(row);
        if (String(arr[0]).includes("_id")) {
          _idKeyIndex = arr[0];
        }
        data.push(row[_idKeyIndex]);
      });

      setIds(data);
    };

    reader.readAsArrayBuffer(file);
  };

  const confirmHandler = catchAsync(async () => {
    if (!!!ids.length) {
      return toast.error("please select csv!");
    }
    const res = await BULK_PAYMENT_STATUS_CHANGE({ orderIds: ids, status });
    const success = checkResponse({ res, showSuccess: true });

    if (success) {
      refetch();
      setModal(false);
    }
  });

  return (
    <>
      <Modal
        show={show}
        className={`${styles.ConfirmationPop} transparentModal`}
        onHide={hideHandler}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className={`${styles.modalBody} `}>
          <div className="px-md-5 text-center mx-auto ">
            <h6 className="m-0 fw-bold themeBlue">Select csv</h6>
            <Button className="commonBtn position-relative">
              <input type="file" accept=".xls,.xlsx" onChange={onCSVSelect} />
            </Button>

            <Row>
              {ids.map((item) => (
                <Col lg="6" key={item}>
                  {item}
                </Col>
              ))}
            </Row>
            <Row className="d-flex justify-content-center mt-2">
              <TableToggle
                Options={paymentStatusOptions.slice(1)}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
              />
            </Row>

            <div className="btnWrpper mt-4 d-flex align-items-center justify-content-center gap-10">
              <div className="px-2 w-100">
                <Button
                  onClick={hideHandler}
                  className="fw-sbold d-flex align-items-center justify-content-center commonBtn w-100 GreyBtn"
                >
                  cancel
                </Button>
              </div>

              <div className="px-2 w-100">
                <Button
                  onClick={confirmHandler}
                  className="fw-sbold d-flex align-items-center justify-content-center commonBtn w-100"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentStatusChangeModel;
