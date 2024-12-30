import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import TableActions from "../../../components/Common/TableActions";
import dataHandler from "../../../hooks/dataHandler";
import { MODULES_LIST } from "../../../services/ApiCalls";

const AdminModules = () => {
  const {
    setBody,
    statusChangeHandler,
    body,
    data,
    loader,
    paginationHandler,
    searchHandler,
    total,
  } = dataHandler({
    api: MODULES_LIST,
    extraBody: {
      limit: 20,
    },
  });
  const column = [
    {
      head: "Sr. No.",
      accessor: "#",
      component: (item, key) => {
        return <>{key < 9 ? `0${key + 1}` : key + 1}</>;
      },
    },
  {
      head: "Name",
      accessor: "Name",
      component: (item, key, arr) => (
        <p className="m-0 fw-sbold">{item?.name}</p>
      ),
    },
    { head: "unique Slug", accessor: "uniqueSlug" },
    {
      head: "Action",
      accessor: "",
      component: (item, key, arr) => (
        <TableActions editUrl={"/module/edit/" + item?._id} />
      ),
    },
  ];

  return (
    <>
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
            
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <Filter
                      body={body}
                      searchHandler={searchHandler}
                      setBody={setBody}
                      showStatusFilter={false}
                    />
                  </ul>
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Link
                        to={"/module/add"}
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

export default AdminModules;
