import React from "react";
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
} from "../../../services/ApiCalls";
import { activeInactiveOptions } from "../../../utilities/const";
import { capitalizedFirstAlphaBet } from "../../../utilities/utilities";

const DealManagement = () => {
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
    api: DEALS_LIST,
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
      head: "_id",
      accessor: "",
      component: (item, key) => {
        return <>{item._id}</>;
      },
    },
    {
      head: "Name",
      accessor: "productName",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item.productName)}
        </p>
      ),
    },
    {
      head: "Brand",
      accessor: "brand",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item.brand.name)}
        </p>
      ),
    },
    {
      head: "Platform",
      accessor: "platForm",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item.platForm.name)}
        </p>
      ),
    },
    {
      head: "Deal Category",
      accessor: "dealCategory",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item.dealCategory.name)}
        </p>
      ),
    },
    {
      head: "Commission",
      accessor: "adminCommission",
    },
    {
      head: "cashback",
      accessor: "cashBack",
    },
    {
      head: "actualPrice",
      accessor: "actualPrice",
    },
    {
      head: "Created At",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.createdAt).format("DD-MM-YYYY , HH:MM:SS")}</>
      ),
    },
    {
      head: "Status",
      accessor: "isDeleted",
      component: (item) => (
        <p
          className={`${
            !item.isActive ? "bg-danger text-white" : "bg-success text-white"
          } d-flex justify-content-start pb-0 rounded px-2 `}
          style={{
            width: "fit-content",
          }}
        >
          {item.isActive ? "Active" : "InActive"}
        </p>
      ),
    },
    {
      head: "Payment Status",
      accessor: "payment Status",
      component: (item) => (
        <p
          className={`${
            item.paymentStatus === "pending"
              ? "bg-danger text-white"
              : item.paymentStatus === "received"
              ? "bg-warning text-white"
              : "bg-success text-white"
          } d-flex justify-content-start pb-0 rounded px-2 `}
          style={{
            width: "fit-content",
          }}
        >
          {item.paymentStatus}
        </p>
      ),
    },
    {
      head: "Is slot Completed",
      accessor: "isSlotCompleted",
      component: (item) => (
        <p
          className={`${
            !item.isSlotCompleted
              ? "bg-danger text-white"
              : "bg-success text-white"
          } d-flex justify-content-start pb-0 rounded px-2 `}
          style={{
            width: "fit-content",
          }}
        >
          {item.isSlotCompleted ? "Completed" : "UnCompleted"}
        </p>
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
      {/* <ConfirmationPop
        type={"delete"}
        // confirmHandler={() =>
        //   deleteHandler(() => DELETE_BRAND({ brandId: deleteModel.dumpId }))
        // }
        confirmation={deleteModel.show}
        setConfirmation={() => setDeleteModel({ dumpId: "", show: false })}
      /> */}
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Deal Management
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
                      statusFilterOptionArr={activeInactiveOptions}
                      ShowPaymentStatus={true}
                      ShowSlotStatus={true}
                    />
         
                  </ul>
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Link
                        to={"/deal/add"}
                        className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                        style={{ height: 40, minWidth: 100, fontSize: 12 }}
                      >
                        Add New
                      </Link>
                    </li>
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

export default DealManagement;
