import moment from "moment";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import copyIcon from "../../../../Assets/images/copyIcon.png";
import share from "../../../../Assets/images/share.png";
import CustomPagination from "../../../../components/Common/CustomPagination";
import TableActions from "../../../../components/Common/TableActions";
import TableLayout from "../../../../components/TableLayout";
import dataHandler from "../../../../hooks/dataHandler";
import {
  MY_SELLER_DEALS_LIST_AS_AGENCY,
  REMOVE_DEAL_FROM_SELLER,
} from "../../../../services/ApiCalls";
import { activeInactiveOptions } from "../../../../utilities/const";
import {
  capitalizedFirstAlphaBet,
  copyDealClipboard,
} from "../../../../utilities/utilities";
import Filter from "../../DealManagement/Components/Filters";
import ConfirmationPop from "../../../../components/Modals/ConfirmationPop";
import SellerDealFilter from "../Components/Filters";

const ViewSeller = () => {
  const { sellerId } = useParams();

  const {
    setBody,
    body,
    data,
    loader,
    paginationHandler,
    searchHandler,
    total,
    statusChangeHandler,
    setDeleteModel,
    deleteModel,
    deleteHandler,
  } = dataHandler({
    api: MY_SELLER_DEALS_LIST_AS_AGENCY,

    dependencies: ["selectedPlatformFilter"],
    extraBody: {
      selectedPlatformFilter: [],
      selectedBrandFilter: [],
      sellerId,
    },
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
      head: "Date || Time ",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.createdAt).format("DD-MM-YYYY  hh:mm:ss A")}</>
      ),
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
            onClick={() => copyDealClipboard(item?._id)}
          >
            <img src={copyIcon} alt="Share" style={{ width: 15, height: 15 }} />
          </button>
        </div>
      ),
    },

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
      head: "Deal Type",
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
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions
          setDeleteModel={() =>
            setDeleteModel((p) => ({ show: true, dumpId: item?._id }))
          }
        />
      ),
    },
  ];

  return (
    <>
      <ConfirmationPop
        type={"delete"}
        confirmHandler={() => {
          deleteHandler(() =>
            REMOVE_DEAL_FROM_SELLER({ dealId: deleteModel.dumpId, sellerId })
          );
        }}
        confirmation={deleteModel.show}
        setConfirmation={(value) =>
          setDeleteModel((p) => ({ show: false, dumpId: "" }))
        }
      />
      <section className="editUser position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/seller"
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
              </div>
            </Col>

            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <SellerDealFilter
                    body={body}
                    setBody={setBody}
                    searchHandler={searchHandler}
                  />
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

export default ViewSeller;
