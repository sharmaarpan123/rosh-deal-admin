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

// img

const PaymentStatusChangeModel = ({ show, setModal, refetch }) => {
  const [ids, setIds] = useState([]);
  const [status, setStatus] = useState("pending");
  const hideHandler = () => {
    setModal(false);
  };

  const onCSvSelect = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    console.log(file, "file");
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const data = [];
        result.data.pop();
        result?.data?.forEach((row) => {
          const arr = Object.keys(row);
          let _idKeyName = "_id"; // this to sure if any space include in the key name  in csv file
          arr.forEach((item) => {
            if (item.includes("_id")) {
              _idKeyName = item;
            }
          });
          if (arr.length > 0) {
            data.push(row[_idKeyName]);
          }
        });
        setIds(data);
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
  };

  const confirmHandler = catchAsync(async () => {
    if (!!!ids.length) {
      toast.error("please select csv!");
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
              <input type="file" accept=".csv" onChange={onCSvSelect} />
            </Button>

            <Row>
              {ids.map((item) => (
                <Col lg="6" key={item}>
                  {item}
                </Col>
              ))}
            </Row>
            <Row>
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
