import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import { Link } from "react-router-dom";
import noImg from "../../../components/Common/noImg";
import TableActions from "../../../components/Common/TableActions";
import TableToggle from "../../../components/Common/TableToggle";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import dataHandler from "../../../hooks/dataHandler";
import {
  DEAL_CATEGORY_LIST,
  UPDATE_STATUS_DEAL_CATEGORY,
} from "../../../services/ApiCalls";
import {
  activeInactiveOptions,
  activeInActiveStatusOptions,
} from "../../../utilities/const";
import {
  capitalizedFirstAlphaBet,
  isSuperAdmin,
} from "../../../utilities/utilities";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import { useSelector } from "react-redux";

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

  const { admin } = useSelector((s) => s.login);

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
    ...(isSuperAdmin(admin)
      ? [
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
                      UPDATE_STATUS_DEAL_CATEGORY({
                        dealCategoryId: item._id,
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
        ]
      : []),
    {
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions
          editUrl={isSuperAdmin(admin) ? `/category/edit/${item._id}` : null}
          viewLink={`/category/details/${item._id}`}
        />
      ),
    },
  ];

  return (
    <>
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
           
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
                        to={"/category/add"}
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
                total={total}
                pageChangeHandler={paginationHandler}
                body={body}
                setBody={setBody}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default DealCategory;
