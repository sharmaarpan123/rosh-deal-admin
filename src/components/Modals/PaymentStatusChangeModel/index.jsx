import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

// css
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { BULK_PAYMENT_STATUS_CHANGE } from "../../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../../utilities/utilities";
import TableToggle from "../../Common/TableToggle";
import styles from "./PaymentStatusChangeModel.module.scss";

// img

export const paymentStatusOptions = [
  { label: "Select Status", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

const PaymentStatusChangeModel = ({ show, setModal, refetch }) => {
  const [ids, setIds] = useState([]);
  const [status, setStatus] = useState("");
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
          data.push(row[_idKeyIndex]);
        } else {
          toast.dismiss();
          return toast.error("Please add header _id in excel sheel");
        }
      });

      setIds(data);
    };

    reader.readAsArrayBuffer(file);
  };

  const confirmHandler = catchAsync(async () => {
    if (!!!ids.length) {
      return toast.error("please select csv!");
    }
    if (!status) {
      return toast.error("please select status!");
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
            <Button className="commonBtn position-relative mb-1">
              <input type="file" accept=".xls,.xlsx" onChange={onCSVSelect} />
            </Button>

            <Row
              className="overflow-scroll"
              style={{
                maxHeight: 200,
              }}
            >
              {ids.map((item) => (
                <Col lg="12" key={item}>
                  <p
                    className="text-wrap mb-1"
                    style={{
                      wordBreak: "break-all",
                    }}
                  >
                    {item}
                  </p>
                </Col>
              ))}
              {!ids?.length && (
                <p className="text-center mb-0 mt-2 text-danger">
                  No data found
                </p>
              )}
            </Row>
            <Row className="d-flex justify-content-center mt-2">
              <div>Select payment status</div>
              <TableToggle
                style={{
                  width: 150,
                }}
                Options={paymentStatusOptions}
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
