import React from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../components/icons/svg/Calendar";

const CustomInput = ({ value, onClick }) => (
  <button
    type="button"
    className="border p-2 rounded d-flex justify-content-between align-items-center gap-2 w-100"
    onClick={onClick}
    style={{
      background: "#F9F9F9",
      fontSize: "14px",
    }}
  >
    {value || "Select Date"}
    <Calendar />
  </button>
);

const DateRangeModal = ({
  show,
  onHide,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-5">Select Date Range</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <div className="d-flex flex-column flex-md-row gap-3 gap-md-4 justify-content-center">
          <div className="d-flex flex-column w-100">
            <span className="fw-sbold text-primary mb-2">From</span>
            <DatePicker
              selected={startDate}
              onChange={onStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              customInput={<CustomInput />}
              dateFormat="dd-MM-yyyy"
              placeholderText="Start Date"
            />
          </div>
          <div className="d-flex flex-column w-100">
            <span className="fw-sbold text-primary mb-2">To</span>
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              customInput={<CustomInput />}
              dateFormat="dd-MM-yyyy"
              placeholderText="End Date"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="outline-secondary" onClick={onHide} className="px-4">
          Close
        </Button>
        <Button variant="primary" onClick={onApply} className="px-4">
          Apply Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DateRangeModal;
