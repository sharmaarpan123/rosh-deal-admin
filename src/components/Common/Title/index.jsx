import React from "react";
import { Col } from "react-bootstrap";
import BackIcon from "../../icons/svg/BackIcon";
import { Link } from "react-router-dom";

const Title = ({ title, BackPath }) => {
  return (
    <Col lg="12">
      <div className="d-flex align-items-center gap-10">
        <Link
          to={BackPath}
          className="border d-flex align-items-center p-2 rounded"
        >
          <BackIcon />
        </Link>
        <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">{title}</h4>
      </div>
    </Col>
  );
};

export default Title;
