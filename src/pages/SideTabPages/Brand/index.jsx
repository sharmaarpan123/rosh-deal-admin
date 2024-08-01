import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import TableActions from "../../../components/Common/TableActions";
import noImg from "../../../components/Common/noImg";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import dataHandler from "../../../hooks/dataHandler";
import {
  BRAND_LIST,
  DELETE_BRAND,
  DELETE_PLATFORM,
} from "../../../services/ApiCalls";
import { capitalizedFirstAlphaBet } from "../../../utilities/utilities";
import Filter from "../../../components/Common/Filter";
import { activeInactiveOptions } from "../../../utilities/const";

const Brand = () => {
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
    api: BRAND_LIST,
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
          editUrl={`/brand/edit/${item._id}`}
          viewLink={`/brand/details/${item._id}`}
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
          deleteHandler(() => DELETE_BRAND({ brandId: deleteModel.dumpId }))
        }
        confirmation={deleteModel.show}
        setConfirmation={() => setDeleteModel({ dumpId: "", show: false })}
      />
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Brand Management
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
                    />
                  </ul>
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Link
                        to={"/brand/add"}
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

export default Brand;
