import moment from "moment";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomPagination from "../../../../components/Common/CustomPagination";
import Filter from "../../../../components/Common/Filter";
import TableActions from "../../../../components/Common/TableActions";
import Toggle from "../../../../components/Common/Toggle";
import ConfirmationPop from "../../../../components/Modals/ConfirmationPop";
import TableLayout from "../../../../components/TableLayout";
import dataHandler from "../../../../hooks/dataHandler";
import {
  DELETE_PROVIDER,
  SERVICE_PROVIDERS_LIST,
  STATUS_CHANGE_SERVICE_PROVIDER,
} from "../../../../services/ApiCalls";
import {
  activeInactiveOptions
} from "../../../../utilities/const";
import { capitalizedFirstAlphaBet } from "../../../../utilities/utilities";

const RegisterServiceProvider = () => {
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
    api: SERVICE_PROVIDERS_LIST,
    extraBody: {
      type: "registered",
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
        <p className="m-0 themeBlue fw-sbold">{capitalizedFirstAlphaBet(item.name)}</p>
      ),
    },
    { head: "Email", accessor: "email" },
    {
      head: "Date || Time ",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.date_created_utc).format("DD-MM-YYYY  hh:mm:ss A")}</>
      ),
    },
    {
      head: "Account Type",
      accessor: "accountType",
      component: (item) => (
        <>{capitalizedFirstAlphaBet(item.accountType)}</>
      ),
    },

    {
      head: "Status",
      accessor: "status",
      component: (item, key) => (
        <Toggle
          isChecked={item?.status === "active" || item?.status === "approved"}
          onChange={(e) =>
            statusChangeHandler(
              () =>
                STATUS_CHANGE_SERVICE_PROVIDER({
                  _id: item._id,
                  status: item?.status === "active" ? "inactive" : "active",
                }),
              key
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
          editUrl={`/service-provider/register/edit/${item._id}`}
          viewLink={`/service-provider/register/detail/${item._id}`}
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
        confirmation={deleteModel.show}
        setConfirmation={() => setDeleteModel({ show: false, dumpId: "" })}
        confirmHandler={() =>
          deleteHandler(() => DELETE_PROVIDER({ _id: deleteModel.dumpId }))
        }
      />
      <section className="serviceProvider py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Register Service Providers
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

export default RegisterServiceProvider;
