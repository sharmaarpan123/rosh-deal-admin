import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";

import CustomPagination from "../../../components/Common/CustomPagination";
import TableActions from "../../../components/Common/TableActions";
import noImg from "../../../components/Common/noImg";
import ImagePopUp from "../../../components/Modals/ImagePopUp";
import SetReasonModel from "../../../components/Modals/SetReasonModel";
import dataHandler from "../../../hooks/dataHandler";
import {
  ACCEPT_REJECT_ORDER,
  ORDER_LIST,
  PAYMENT_STATUS_CHANGE,
} from "../../../services/ApiCalls";
import {
  defaultDeleteModelState,
  OrderFromStatusOptionArr,
  paymentStatusOptions,
} from "../../../utilities/const";
import {
  capitalizedFirstAlphaBet,
  catchAsync,
} from "../../../utilities/utilities";
import Filter from "./Filter/Filter";
import ExportExcel from "./exportExcel/ExportExcel";

const OrderManagement = () => {
  const {
    setBody,
    body,
    data,
    loader,
    deleteModel,
    setDeleteModel,
    paginationHandler,
    searchHandler,
    total,
    statusChangeHandler,
  } = dataHandler({
    api: ORDER_LIST,
    extraBody: {
      brandId: "",
      dealId: [],
    },
    dependencies: ["brandId", "dealId"],
  });
  const [rejectReason, setRejectedReason] = useState("");
  const [rejectedModel, setRejectedModel] = useState({
    ...defaultDeleteModelState,
    status: "",
  });
  const [popUpImage, SetPopUpImage] = useState("");

  const acceptRejectHandler = (_id, ind, status) => {
    statusChangeHandler(
      () => {
        const body = {
          orderId: _id,
          status,
          ...((status === "rejected" || status === "reviewFormRejected") && {
            rejectReason,
          }),
        };

        console.log(rejectReason, "body");

        return ACCEPT_REJECT_ORDER(body);
      },
      ind,
      "orderFormStatus",
      status
    );
    setRejectedModel((p) => ({
      ...defaultDeleteModelState,
      status: "",
    }));
  };

  const paymentStatusChangeHandler = catchAsync(async (orderId, status) => {
    const res = await PAYMENT_STATUS_CHANGE({ orderId, status });
  });

  const column = [
    {
      head: "#",
      accessor: "#",
      component: (item, key) => {
        return <>{body.limit * (body.page - 1) + key + 1}</>;
      },
    },
    {
      head: "Order id",
      accessor: "orderIdOfPlatForm",
    },
    {
      head: "User Name",
      accessor: "productName",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.userId?.name)}
        </p>
      ),
    },
    {
      head: "Reviewer Name",
      accessor: "reviewerName",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.userId?.name)}
        </p>
      ),
    },
    {
      head: "Brand",
      accessor: "brand",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.dealId?.brand?.name)}
        </p>
      ),
    },
    {
      head: "Platform",
      accessor: "platForm",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.dealId?.platForm?.name)}
        </p>
      ),
    },
    {
      head: "Deal Category",
      accessor: "dealCategory",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.dealId?.dealCategory?.name)}
        </p>
      ),
    },
    {
      head: "Created At",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.createdAt).format("DD-MM-YYYY , HH:MM:SS")}</>
      ),
    },

    {
      head: "Payment Status",
      accessor: "payment Status",
      component: (item) => (
        <div
          className={`p-1 rounded  ${
            item.paymentStatus === "paid" ? "bg-success" : "bg-warning"
          }`}
          style={{
            width: "130px",
          }}
        >
          <Form.Select
            onChange={(e) => {
              paymentStatusChangeHandler(item._id, e.target.value);
            }}
            value={item.paymentStatus}
          >
            {paymentStatusOptions?.slice(1).map((item) => (
              <option value={item.value}>{item.label} </option>
            ))}
          </Form.Select>
        </div>
      ),
    },

    {
      head: "order ScreenShot",
      accessor: "image",
      component: (item, key, arr) => (
        <img
          onClick={() => SetPopUpImage(item.orderScreenShot || noImg)}
          src={item.orderScreenShot || noImg}
          style={{ width: 100, height: 80, objectFit: "contain" }}
        />
      ),
    },

    {
      head: "delivered ScreenShot",
      accessor: "image",
      component: (item, key, arr) => (
        <img
          onClick={() => SetPopUpImage(item.deliveredScreenShot || noImg)}
          src={item.deliveredScreenShot || noImg}
          style={{ width: 100, height: 80, objectFit: "contain" }}
        />
      ),
    },
    {
      head: "Review ScreenShot",
      accessor: "image",
      component: (item, key, arr) => (
        <img
          onClick={() => SetPopUpImage(item.reviewScreenShot || noImg)}
          src={item.reviewScreenShot || noImg}
          style={{ width: 100, height: 80, objectFit: "contain" }}
        />
      ),
    },
    {
      head: "Order Status",
      accessor: "orderFormStatus",
      component: (item) => (
        <p
          className={`${
            item.orderFormStatus === "reviewFormSubmitted"
              ? "bg-success "
              : item.orderFormStatus === "accepted"
              ? "bg-primary "
              : item.orderFormStatus === "rejected"
              ? "bg-danger"
              : "bg-warning"
          } d-flex justify-content-start pb-0 rounded px-2 text-white `}
          style={{
            width: "fit-content",
          }}
        >
          {item.orderFormStatus}
        </p>
      ),
    },

    {
      head: "Action",
      accessor: "Action",
      component: (item, ind) => (
        <TableActions
          acceptHandler={
            ["pending", "rejected", "accepted"].includes(
              item?.orderFormStatus
            ) && (() => acceptRejectHandler(item._id, ind, "accepted"))
          }
          rejectHandler={
            ["pending", "rejected", "accepted"].includes(
              item?.orderFormStatus
            ) &&
            (() =>
              setRejectedModel({
                show: true,
                dumpId: item?._id,
                ind: ind,
                status: "rejected",
              }))
          }
          reviewAcceptHandler={
            [
              "reviewFormSubmitted",
              "reviewFormRejected",
              "reviewFormAccepted",
            ].includes(item.orderFormStatus) &&
            (() => acceptRejectHandler(item._id, ind, "reviewFormAccepted"))
          }
          reviewRejectHandler={
            [
              "reviewFormSubmitted",
              "reviewFormRejected",
              "reviewFormAccepted",
            ].includes(item.orderFormStatus) &&
            (() =>
              setRejectedModel({
                show: true,
                dumpId: item?._id,
                ind: ind,
                status: "reviewFormRejected",
              }))
          }
        />
      ),
    },
  ];

  return (
    <>
      <ImagePopUp SetPopUpImage={SetPopUpImage} popUpImage={popUpImage} />
      <SetReasonModel
        hide={() => setRejectedModel({ show: false, dumpId: "", status: "" })}
        show={rejectedModel.show}
        rejectReason={rejectReason}
        setRejectedReason={setRejectedReason}
        confirmHandler={() =>
          acceptRejectHandler(
            rejectedModel.dumpId,
            rejectedModel.ind,
            rejectedModel.status
          )
        }
      />
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Order Management
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <Filter
                      statusFilterOptionArr={OrderFromStatusOptionArr}
                      body={body}
                      setBody={setBody}
                    />
                  </ul>
                </div>
                <div className="right">
                  <ExportExcel body={body} />
                </div>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <TableLayout column={column} data={data} loader={loader} />
              <CustomPagination
                body={body}
                pageChangeHandler={paginationHandler}
                setBody={setBody}
                total={total}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default OrderManagement;
