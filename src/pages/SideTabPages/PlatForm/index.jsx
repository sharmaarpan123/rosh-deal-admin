import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import { Link } from "react-router-dom";
import TableActions from "../../../components/Common/TableActions";
import TableToggle from "../../../components/Common/TableToggle";
import noImg from "../../../components/Common/noImg";
import dataHandler from "../../../hooks/dataHandler";
import {
  PLATFORM_LIST,
  STATUS_UPDATE_PLATFORM,
} from "../../../services/ApiCalls";
import { activeInActiveStatusOptions } from "../../../utilities/const";
import { capitalizedFirstAlphaBet } from "../../../utilities/utilities";

const PlatForm = () => {
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
    api: PLATFORM_LIST,
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
      accessor: "",
      component: (item, index) => (
        <TableToggle
          Options={activeInActiveStatusOptions}
          value={item.isActive ? "1" : "0"}
          classNames={item.isActive ? "bg-success" : "bg-danger"}
          style={{
            color: item.isActive ? "green" : "red",
            width: 120,
          }}
          onChange={(e) =>
            statusChangeHandler(
              () =>
                STATUS_UPDATE_PLATFORM({
                  platFormId: item._id,
                  status: e.target.value === "1",
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
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions
          editUrl={`/platform/edit/${item._id}`}
          viewLink={`/platform/details/${item._id}`}
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
                Plat form
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
                        to={"/platform/add"}
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

export default PlatForm;
