import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import copyIcon from "../../../Assets/images/copyIcon.png";
import share from "../../../Assets/images/share.png";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import TableActions from "../../../components/Common/TableActions";
import dataHandler from "../../../hooks/dataHandler";
import { MY_AGENCY_DEALS_AS_MED } from "../../../services/ApiCalls";
import { activeInactiveOptions } from "../../../utilities/const";
import {
  capitalizedFirstAlphaBet,
  copyClipboard,
  handleShare,
} from "../../../utilities/utilities";

const MyAgencyDealsAsMed = () => {
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
    api: MY_AGENCY_DEALS_AS_MED,
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
            <img src={share} alt="Share" style={{ width: 15, height: 15 }} />
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
            <img src={copyIcon} alt="Share" style={{ width: 15, height: 15 }} />
          </button>
        </div>
      ),
    },

    {
      head: "Less Value",
      accessor: "lessAmount",
      component: (item) => (
        <>{!item?.isCommissionDeal ? item?.lessAmount : "-"}</>
      ),
    },

    {
      head: "Commission Value",
      accessor: "commissionValue",
      component: (item) => (
        <>{item?.isCommissionDeal ? item?.commissionValue : "-"}</>
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
          {capitalizedFirstAlphaBet(item?.brand?.name)}
        </p>
      ),
    },
    {
      head: "Platform",
      accessor: "platForm",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.platForm?.name)}
        </p>
      ),
    },
    {
      head: "Deal Category",
      accessor: "dealCategory",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.dealCategory?.name)}
        </p>
      ),
    },
    {
      head: "Price",
      accessor: "actualPrice",
    },

    {
      head: "Date || Time ",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item?.createdAt).format("DD-MM-YYYY ||  hh:mm:ss A")}</>
      ),
    },
    {
      head: "Status",
      accessor: "isDeleted",
      component: (item, index) => (
        <p
          className={`mb-0 ${
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
    // {
    //   head: "Payment Status",
    //   accessor: "payment Status",
    //   component: (item, index) => (
    //     <p
    //       className={`mb-0 ${
    //         !(item.paymentStatus === "paid")
    //           ? "bg-danger text-white"
    //           : "bg-success text-white"
    //       } d-flex justify-content-start pb-0 rounded px-2 `}
    //       style={{
    //         width: "fit-content",
    //       }}
    //     >
    //       {item.paymentStatus === "paid" ? "Paid" : "No Paid Yet"}
    //     </p>
    //   ),
    // },
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
          {item.isSlotCompleted ? "Completed" : "Ongoing"}
        </p>
      ),
    },
    {
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions viewLink={`/myAgencyDealsAsMed/details/${item._id}`} />
      ),
    },
  ];

  return (
    <>
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            {/* <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Deal Management
              </h4>
            </Col> */}
            <Col lg="12">
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
                <div className="right"></div>
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

export default MyAgencyDealsAsMed;
