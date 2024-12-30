import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import TableActions from "../../../components/Common/TableActions";
import Toggle from "../../../components/Common/Toggle";
import dataHandler from "../../../hooks/dataHandler";
import { USER_LIST, USER_STATUS_CHANGE } from "../../../services/ApiCalls";
import {
  activeInactiveOptions,
  ADMIN_ROLE_TYPE_ENUM,
} from "../../../utilities/const";
import { useSelector } from "react-redux";

const ManageUser = () => {
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
    api: USER_LIST,
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
        <>{moment(item.createdAt).format("DD-MM-YYYY , HH:MM:SS")}</>
      ),
    },
    ...(admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN)
      ? [
          {
            head: "Status",
            accessor: "status",
            component: (item, key, arr) => (
              <Toggle
                isChecked={item.isActive}
                onChange={() =>
                  statusChangeHandler(
                    () =>
                      USER_STATUS_CHANGE({
                        userId: item._id,
                        status: !item.isActive,
                      }),
                    key,
                    "isActive",
                    !item.isActive
                  )
                }
              />
            ),
          },
        ]
      : []),
    ...(admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN)
      ? [
          {
            head: "Action",
            accessor: "Action",
            component: (item) => (
              <TableActions editUrl={`/manage-user/edit/${item._id}`} />
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <section className="manageUser py-3 position-relative">
        <Container>
          <Row>
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
