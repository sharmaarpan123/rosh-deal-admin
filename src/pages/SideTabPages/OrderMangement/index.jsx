import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import TableActions from "../../../components/Common/TableActions";
import noImg from "../../../components/Common/noImg";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import dataHandler from "../../../hooks/dataHandler";
import {
  BRAND_LIST,
  DEALS_LIST,
  DELETE_BRAND,
  ORDER_LIST,
} from "../../../services/ApiCalls";
import {
  activeInactiveOptions,
  OrderFromStatusOptionArr,
} from "../../../utilities/const";
import { capitalizedFirstAlphaBet } from "../../../utilities/utilities";
import ImagePopUp from "../../../components/Modals/ImagePopUp";

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
    deleteHandler,
    statusChangeHandler,
  } = dataHandler({
    api: ORDER_LIST,
  });

  const [popUpImage, SetPopUpImage] = useState("");

  const column = [
    {
      head: "#",
      accessor: "#",
      component: (item, key) => {
        return <>{body.limit * (body.page - 1) + key + 1}</>;
      },
    },
    {
      head: "_id",
      accessor: "",
      component: (item, key) => {
        return <>{item._id}</>;
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
      head: "Payment Status",
      accessor: "payment Status",
      component: (item) => (
        <p
          className={`${
            item?.dealId?.paymentStatus === "pending"
              ? "bg-danger text-white"
              : item?.dealId?.paymentStatus === "received"
              ? "bg-warning text-white"
              : "bg-success text-white"
          } d-flex justify-content-start pb-0 rounded px-2 `}
          style={{
            width: "fit-content",
          }}
        >
          {item?.dealId?.paymentStatus}
        </p>
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
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions
          editUrl={`/deal/edit/${item._id}`}
          viewLink={`/deal/details/${item._id}`}
          setDeleteModel={() =>
            setDeleteModel({ dumpId: item._id, show: true })
          }
        />
      ),
    },
  ];

  return (
    <>
      <ConfirmationPop
        type={"delete"}
        // confirmHandler={() =>
        //   deleteHandler(() => DELETE_BRAND({ brandId: deleteModel.dumpId }))
        // }
        confirmation={deleteModel.show}
        setConfirmation={() => setDeleteModel({ dumpId: "", show: false })}
      />

      <ImagePopUp SetPopUpImage={SetPopUpImage} popUpImage={popUpImage} />
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
                      body={body}
                      searchHandler={searchHandler}
                      setBody={setBody}
                      statusFilterOptionArr={OrderFromStatusOptionArr}
                      showSearch={false}
                    />
                  </ul>
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
