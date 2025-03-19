import moment from "moment";
import React from "react";
import { removeUnderScoreAndCapitalizeFirstLetter } from "../../../utilities/utilities";
import { Col, Row } from "react-bootstrap";
import Loading from "../../Common/Loading";

const DealDetailView = ({
  DealDetails,
  loader,
  isSubAdminWatchingDetails = false,
}) => {
  return (
    <Col lg="12" className="my-2 position-relative">
      <div
        className="formWrpper px-lg-5 p-md-4 p-3 rounded position-relative"
        style={{ background: "#EEEEEE" }}
      >
        {loader ? (
          <div
            className="position-absolute "
            style={{
              right: 12,
              top: 12,
              width: 30,
            }}
          >
            <Loading fullSize={true} />
          </div>
        ) : (
            <Row className="justify-content-between">
                            {/* <Col lg="12" className="my-2">
                              <div
                                className="imgWrp text-center mx-auto"
                                style={{ maxWidth: "max-content" }}
                              >
                                <img
                                  src={profileImage || i1}
                                  style={{ height: 140, width: 140 }}
                                  alt=""
                                  className="img-fluid rounded-circle object-fit-contain"
                                />
                              </div>
                            </Col> */}
                            <Col md={6} className="my-2">
                              <ul className="list-unstyled ps-0 mb-0 notLastBorder pe-lg-3">
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Created at:
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {moment(DealDetails?.createdAt).format(
                                      "DD-MM-YYYY  hh:mm:ss A"
                                    )}
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">Brand</p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.brand?.name}
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Product Name:
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.productName}
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Product Price
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.actualPrice}
                                  </h6>
                                </li>
                                {DealDetails?.isCommissionDeal ? (
                                  <li className="py-2 d-flex align-items-center gap-10">
                                    <p className="m-0 themeBlue fw-sbold w-25">
                                      Commission
                                    </p>
                                    <h6 className="m-0 text-muted fw-bold w-50">
                                      {DealDetails?.commissionValue}
                                    </h6>
                                  </li>
                                ) : (
                                  <li className="py-2 d-flex align-items-center gap-10">
                                    <p className="m-0 themeBlue fw-sbold w-25">Less</p>
                                    <h6 className="m-0 text-muted fw-bold w-50">
                                      {DealDetails?.lessAmount}
                                    </h6>
                                  </li>
                                )}
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Product Link
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold w-50 text-truncate">
                                    <a
                                      href={DealDetails?.postUrl}
                                      target="_blank"
                                   
                                      className="text-truncate"
                                    >
                                      {DealDetails?.postUrl}
                                    </a>
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">Deal Type</p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.dealCategory?.name}
                                  </h6>
                                </li>
                              </ul>
                            </Col>
                            <Col md={6} className="my-2">
                              <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">Platform</p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.platForm?.name}
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Slot Alloted
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.slotAlloted}
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Slot Completed
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.slotCompletedCount}
                                  </h6>
                                </li>
          
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Payment Status
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold ">
                                    <p
                                      className={`text-white px-4  mb-0 text-capitalize rounded text-center ${
                                        DealDetails?.paymentStatus === "paid"
                                          ? "bg-success"
                                          : DealDetails?.paymentStatus === "pending"
                                          ? "bg-warning"
                                          : "bg-pending"
                                      }`}
                                    >
                                      {DealDetails?.paymentStatus}
                                    </p>
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Deal Status
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold ">
                                    <p
                                      className={` rounded text-capitalize mb-0  px-4 text-center text-white ${
                                        DealDetails?.isActive ? "bg-success" : "bg-danger"
                                      }`}
                                    >
                                      {DealDetails?.isActive ? "active" : "inactive"}
                                    </p>
                                  </h6>
                                </li>
                                <li className="py-2 d-flex align-items-center gap-10">
                                  <p className="m-0 themeBlue fw-sbold w-25">
                                    Platform Fee
                                  </p>
                                  <h6 className="m-0 text-muted fw-bold w-50">
                                    {DealDetails?.adminCommission}
                                  </h6>
                                </li>
                              </ul>
                            </Col>
                            <Col lg="12">
                              <li className="py-2 d-flex align-items-center gap-10">
                                <p className="m-0 themeBlue fw-sbold w-25">
                                  Terms And Condition
                                </p>
                                <h6 className="m-0 text-muted fw-bold">
                                  {DealDetails?.termsAndCondition}
                                </h6>
                              </li>
                            </Col>
                          </Row>
        )}
      </div>
    </Col>
  );
};

export default DealDetailView;
