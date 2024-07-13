import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import { VIEW_SERVICE_CATEGORY } from "../../../../services/ApiCalls";
import moment from "moment";

const ManageServiceDetail = () => {
  const [serviceData, setServiceData] = useState();
  const { id } = useParams();
  const getData = catchAsync(async () => {
    const res = await VIEW_SERVICE_CATEGORY(id);
    checkResponse({ res, setData: setServiceData });
  });

  useEffect(() => {
    if (id) getData();
  }, [id]);

  return (
    <>
      <section className="serviceDetail py-3 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/manage-service-category"
                  className="border d-flex align-items-center p-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 10 16"
                    fill="none"
                  >
                    <path
                      d="M8.64707 0.473344C8.55514 0.381188 8.44594 0.308072 8.32572 0.258184C8.20549 0.208296 8.07661 0.182617 7.94644 0.182617C7.81628 0.182617 7.68739 0.208296 7.56717 0.258184C7.44694 0.308072 7.33774 0.381188 7.24582 0.473344L0.667065 7.05209C0.593675 7.12533 0.53545 7.21233 0.495723 7.3081C0.455996 7.40387 0.435547 7.50654 0.435547 7.61022C0.435547 7.7139 0.455996 7.81657 0.495723 7.91234C0.53545 8.00811 0.593675 8.0951 0.667065 8.16834L7.24582 14.7471C7.63373 15.135 8.25915 15.135 8.64707 14.7471C9.03498 14.3592 9.03498 13.7338 8.64707 13.3458L2.9154 7.60626L8.65498 1.86668C9.03498 1.48668 9.03498 0.853344 8.64707 0.473344Z"
                      fill="#1E232C"
                      stroke="#1E232C"
                      stroke-width="0.2"
                    />
                  </svg>
                </Link>
                <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                  Category Details
                </h4>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <div
                className="cardCstm px-lg-4 px-3 py-2 rounded"
                style={{ background: "#eee" }}
              >
                <ul className="list-unstyled ps-0 mb-0 noLastBorder">
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeBlue w-50">
                      Laundry Service Type:
                    </p>
                    <p className="m-0 fw-sbold text-muted w-50">
                      {serviceData?.catName}
                    </p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeBlue w-50">Created At:</p>
                    <p className="m-0 fw-sbold text-muted w-50">
                      {moment(serviceData?.date_created_utc).format(
                        "DD-MM-YYY , HH:MM:SS"
                      )}
                    </p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeBlue w-50">Status:</p>
                    <p className="m-0 fw-sbold text-muted w-50">
                      {serviceData?.status}
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ManageServiceDetail;
