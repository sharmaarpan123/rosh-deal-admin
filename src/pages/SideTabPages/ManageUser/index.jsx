import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import u1 from "../../../Assets/images/authBg.png";
import { Link } from "react-router-dom";
import { CstmPagination } from "../../../components/Common/Common";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import CustomPagination from "../../../components/Common/CustomPagination";
import dataHandler from "../../../hooks/dataHandler";
import Axios from "../../../services/Axios";
import Filter from "../../../components/Common/Filter";
import {
  activeInactiveOptions,
  csvImportEnum,
  defaultDeleteModelState,
} from "../../../utilities/const";
import ImportCsv from "../../../components/Common/ImportCsv";
import TableActions from "../../../components/Common/TableActions";
import {
  DELETE_USER,
  USER_LIST,
  USER_STATUS_CHANGE,
} from "../../../services/ApiCalls";
import moment from "moment";
import Toggle from "../../../components/Common/Toggle";
import { removeUnderScoreAndCapitalizeFirstLetter } from "../../../utilities/utilities";

const ManageUser = () => {
  const {
    setBody,
    statusChangeHandler,
    body,
    data,
    loader,
    deleteModel,
    setDeleteModel,
    paginationHandler,
    searchHandler,
    total,
    deleteHandler,
  } = dataHandler({
    api: USER_LIST,
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
      head: "User Name",
      accessor: "name",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">{item.name}</p>
      ),
    },
    { head: "Email", accessor: "email" },
    { head: "Phone Number", accessor: "phoneNumber" },
    {
      head: "Created At",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.date_created_utc).format("DD-MM-YYYY , HH:MM:SS")}</>
      ),
    },
    {
      head: "Account Type",
      accessor: "roles",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {item?.roles[0].toUpperCase()}
        </p>
      ),
    },
    {
      head: "Status",
      accessor: "status",
      component: (item, key, arr) => (
        <Toggle
          isChecked={item.isVerified}
          onChange={() =>
            statusChangeHandler(
              () =>
                USER_STATUS_CHANGE({
                  userId: item?._id,
                  isVerified: !item?.isVerified
                }),
              key,
              "isVerified",
              !item?.isVerified
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
          editUrl={`/manage-user/edit/${item._id}`}
          viewLink={`/manage-user/detail/${item._id}`}
          setDeleteModel={() =>
            setDeleteModel({ show: true, dumpId: item?._id })
          }
        />
      ),
    },
  ];

  return (
    <>
      <ConfirmationPop
        confirmation={deleteModel.show}
        setConfirmation={() => setDeleteModel((p) => defaultDeleteModelState)}
        confirmHandler={() =>
          deleteHandler(() => DELETE_USER({ _id: deleteModel.dumpId }))
        }
        type={"delete"}
      />
      <section className="manageUser py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Manage user
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <Filter
                    body={body}
                    setBody={setBody}
                    searchHandler={searchHandler}
                    statusFilterOptionArr={activeInactiveOptions}
                  />
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <ImportCsv
                        item={csvImportEnum.customers}
                        callBack={() => console.log("waiting for api")}
                      />
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
                        to="/manage-user/add"
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

export default ManageUser;
