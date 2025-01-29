import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableLayout from "../../../../components/TableLayout";
import { CstmPagination } from "../../../../components/Common/Common";
import ConfirmationPop from "../../../../components/Modals/ConfirmationPop";
import dataHandler from "../../../../hooks/dataHandler";
import {
  DELETE_PROVIDER,
  SERVICE_PROVIDERS_LIST,
} from "../../../../services/ApiCalls";
import CustomPagination from "../../../../components/Common/CustomPagination";
import TableActions from "../../../../components/Common/TableActions";
import Toggle from "../../../../components/Common/Toggle";
import Filter from "../../../../components/Common/Filter";
import { activeInactiveOptions } from "../../../../utilities/const";

import moment from "moment";

const ServiceProviderRequest = () => {
  const {
    setBody,
    body,
    data,
    loader,
    paginationHandler,
    searchHandler,
    total,
  } = dataHandler({
    api: SERVICE_PROVIDERS_LIST,
    extraBody: {
      type: "new_request",
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
      head: "Name",
      accessor: "name",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">{item.name}</p>
      ),
    },
    { head: "Email", accessor: "email" },
    {
      head: "Date || Time ",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.date_created_utc).format("DD-MM-YYYY ||  hh:mm:ss A")}</>
      ),
    },
    {
      head: "Account Type",
      accessor: "accountType",
    },

    {
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions
          viewLink={`/service-provider/request/detail/${item._id}`}
        />
      ),
    },
  ];

  return (
    <>
      <section className="serviceProvider py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                New Service Providers Request
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <Filter
                    body={body}
                    searchHandler={searchHandler}
                    setBody={setBody}
                    statusFilterOptionArr={activeInactiveOptions}
                  />
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Button
                        className="d-flex align-items-center justify-content-center fw-sbold commonBtn GreyBtn"
                        style={{ height: 40, minWidth: 100, fontSize: 12 }}
                      >
                        Import CSV
                      </Button>
                    </li>
                    <li className="">
                      <Button
                        className="d-flex align-items-center justify-content-center fw-sbold commonBtn GreyBtn"
                        style={{ height: 40, minWidth: 100, fontSize: 12 }}
                      >
                        Export CSV
                      </Button>
                    </li>
                    <li className="">
                      <Link
                        to="/service-provider/register/add"
                        className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn "
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

export default ServiceProviderRequest;
