import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import u1 from "../../../Assets/images/authBg.png";
import { Link } from "react-router-dom";
import { CstmPagination } from "../../../components/Common/Common";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import {
  DEAL_CATEGORY_LIST,
  DELETE_DEAL_CATEGORY,
  DELETE_PLATFORM,
  PLATFORM_LIST,
} from "../../../services/ApiCalls";
import dataHandler from "../../../hooks/dataHandler";
import { capitalizedFirstAlphaBet } from "../../../utilities/utilities";
import moment from "moment";
import Toggle from "../../../components/Common/Toggle";
import TableActions from "../../../components/Common/TableActions";
import CustomPagination from "../../../components/Common/CustomPagination";
import noImg from "../../../components/Common/noImg";

const DealCategory = () => {
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
    api: DEAL_CATEGORY_LIST,
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
      head: "Name",
      accessor: "name",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item.name)}
        </p>
      ),
    },
    {
      head: "Image",
      accessor: "image",
      component: (item, key, arr) => (
        <img
          src={item.image || noImg}
          style={{ width: 100, height: 80, objectFit: "contain" }}
        />
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
      head: "Status",
      accessor: "isDeleted",
      component: (item) => (
        <p
          className={`${
            item.isDeleted ? "bg-danger text-white" : "bg-success text-white"
          } d-flex justify-content-start pb-0 rounded px-2 `}
          style={{
            width: "fit-content",
          }}
        >
          {item.isDeleted ? "Deleted" : "Active"}
        </p>
      ),
    },
    {
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions
          editUrl={`/deal-category/edit/${item._id}`}
          viewLink={`/deal-category/details/${item._id}`}
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
        confirmHandler={() =>
          deleteHandler(() =>
            DELETE_DEAL_CATEGORY({ dealCategoryId: deleteModel.dumpId })
          )
        }
        confirmation={deleteModel.show}
        setConfirmation={() => setDeleteModel({ dumpId: "", show: false })}
      />
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Deal Category
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap"></ul>
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Link
                        to={"/deal-category/add"}
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
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default DealCategory;
