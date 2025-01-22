import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

// css
import styles from "./SetCommissionPop.module.scss";
import { toast } from "react-toastify";

// img

const SetReasonModel = ({
  setRejectedReason,
  show,
  hide,
  rejectReason,
  confirmHandler,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rejectReason) {
      return toast.error("please add some words in the  reason input!");
    }
    confirmHandler(rejectReason);
  };
  return (
    <>
      <Modal
        show={show}
        className={`${styles.SetCommissionPop}  SetCommissionPop`}
        onHide={hide}
        backdrop={true}
        keyboard={false}
        centered
        onBackdropClick={hide}
      >
        <Modal.Body className={` position-relative rounded`}>
          <Button
            onClick={hide}
            className="border-0 p-0 position-absolute"
            variant="transparent"
            style={{ right: 10, top: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 16 15"
              fill="none"
            >
              <g clip-path="url(#clip0_0_6282)">
                <path
                  d="M1.98638 14.906C1.61862 14.9274 1.25695 14.8052 0.97762 14.565C0.426731 14.0109 0.426731 13.1159 0.97762 12.5617L13.0403 0.498994C13.6133 -0.0371562 14.5123 -0.00735193 15.0485 0.565621C15.5333 1.08376 15.5616 1.88015 15.1147 2.43132L2.98092 14.565C2.70519 14.8017 2.34932 14.9237 1.98638 14.906Z"
                  fill="white"
                />
                <path
                  d="M14.0347 14.9061C13.662 14.9045 13.3047 14.7565 13.0401 14.4941L0.977383 2.4313C0.467013 1.83531 0.536401 0.938371 1.13239 0.427954C1.66433 -0.0275797 2.44884 -0.0275797 2.98073 0.427954L15.1145 12.4907C15.6873 13.027 15.7169 13.9261 15.1806 14.4989C15.1593 14.5217 15.1372 14.5437 15.1145 14.5651C14.8174 14.8234 14.4263 14.9469 14.0347 14.9061Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_0_6282">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(0.564453)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Button>
          <div className=" text-center mx-auto text-white">
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-10">
              <label htmlFor="">Add the reason</label>
              <input
                type="text"
                onChange={(e) => setRejectedReason(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SetReasonModel;
