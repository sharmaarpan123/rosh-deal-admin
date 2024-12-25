import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import { Link } from "react-router-dom";
import copyIcon from "../../../Assets/images/copyIcon.png";
import share from "../../../Assets/images/share.png";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import TableActions from "../../../components/Common/TableActions";
import TableToggle from "../../../components/Common/TableToggle";
import dataHandler from "../../../hooks/dataHandler";
import {
  DEAL_UPDATE_PAYMENT_STATUS,
  DEAL_UPDATE_STATUS,
  DEALS_LIST
} from "../../../services/ApiCalls";
import {
  activeInactiveOptions,
  paymentStatusOptions,
} from "../../../utilities/const";
import {
  activeInActiveOptions,
  capitalizedFirstAlphaBet,
  copyClipboard,
  handleShare,
} from "../../../utilities/utilities";

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
      accessor: "_id",
    },
    {
      head: "Name",
      accessor: "productName",
      component: (item, key, arr) => (
        <div style={{ display: "flex", alignItems: "center", minWidth: 200 }}>
          <p className="m-0 themeBlue fw-sbold">
            {capitalizedFirstAlphaBet(item.productName)}
          </p>
          <button
            className="share-button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "5px",
            }}
            onClick={() => handleShare(item?._id)}
          >
            <img
              src={share}
              alt="Share"
              style={{ width: 15, height: 15 }}
            />
          </button>
          <button
            className="share-button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => copyClipboard(item?._id)}
          >
            <img
              src={copyIcon}
              alt="Share"
              style={{ width: 15, height: 15 }}
            />
          </button>
        </div>
      ),
    },
    // {
    //   head: "unique slug",
    //   accessor: "unique slug",
    //   component: (item, key, arr) => (
    //     <p className="m-0 themeBlue fw-sbold" style={{ minWidth: 200 }}>
    //       {capitalizedFirstAlphaBet(item.uniqueIdentifier)}
    //     </p>
    //   ),
    // },
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
      head: "Price",
      accessor: "actualPrice",
    },
    {
      head: "Refund",
      accessor: "finalCashBackForUser",
    },
    {
      head: "Platform Fee",
      accessor: "adminCommission",
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
      component: (item, index) => (
        // <p
        //   className={`mb-0 ${
        //     !item.isActive ? "bg-danger text-white" : "bg-success text-white"
        //   } d-flex justify-content-start pb-0 rounded px-2 `}
        //   style={{
        //     width: "fit-content",
        //   }}
        // >
        //   {item.isActive ? "Active" : "InActive"}
        // </p>

        <TableToggle
          Options={activeInActiveOptions}
          value={item.isActive ? "active" : "inactive"}
          classNames={item.isActive ? "bg-success" : "bg-danger"}
          style={{
            color: item.isActive ? "green" : "red",
            width: 120,
          }}
          onChange={(e) =>
            statusChangeHandler(
              () =>
                DEAL_UPDATE_STATUS({
                  dealId: item._id,
                  status: e.target.value === "active",
                }),
              index,
              "isActive",
              !item.isActive
            )
          }
        />
      ),
    },
    {
      head: "Payment Status",
      accessor: "payment Status",
      component: (item, index) => (
        <TableToggle
          Options={paymentStatusOptions.slice(1)}
          value={item.paymentStatus}
          classNames={
            item.paymentStatus === "pending" ? "bg-danger" : "bg-success"
          }
          style={{
            color: item.paymentStatus === "pending" ? "red" : "pending",
            width: 120,
          }}
          onChange={(e) =>
            statusChangeHandler(
              () =>
                DEAL_UPDATE_PAYMENT_STATUS({
                  dealId: item._id,
                  status: e.target.value,
                }),
              index,
              "paymentStatus",
              item.paymentStatus === "pending" ? "paid" : "pending"
            )
          }
        />
      ),
    },
    {
      head: "Is slot Completed",
      accessor: "isSlotCompleted",
      component: (item) => (
        <p
          className={`mb-0 ${
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
        />
      ),
    },
  ];

  return (
    <>
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
                        to={"/deal/bulk-add"}
                        className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                        style={{ height: 40, minWidth: 100, fontSize: 12 }}
                      >
                        Bulk Add
                      </Link>
                    </li>
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
