import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import TableActions from "../../../components/Common/TableActions";
import Toggle from "../../../components/Common/Toggle";
import dataHandler from "../../../hooks/dataHandler";
import {
  MANAGE_ADMIN_SUB_ADMIN_RELATION,
  SUB_ADMIN_LIST,
  UPDATE_SUB_ADMIN,
} from "../../../services/ApiCalls";
import {
  activeInactiveOptions,
  ADMIN_ROLE_TYPE_ENUM,
  defaultDeleteModelState,
  defaultStatusModelState,
} from "../../../utilities/const";
import { useSelector } from "react-redux";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import TableToggle from "../../../components/Common/TableToggle";
import {
  activeInActiveArr,
  activeInActiveOptions,
  isSuperAdmin,
} from "../../../utilities/utilities";
import Filter from "../../../components/Common/Filter";

const roleLabelEnum = {
  subadmin: "Mediator",
  admin: "Agency",
  superAdmin: "King",
};

const PlatForm = () => {
  const {
    setBody,
    statusChangeHandler,
    body,
    data,
    loader,
    paginationHandler,
    statusChangeModel,
    setStatusChangeModel,
    total,
    searchHandler,
  } = dataHandler({
    api: SUB_ADMIN_LIST,
  });
  const { admin } = useSelector((s) => s.login);
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
        <p className="m-0 fw-sbold">{item.name}</p>
      ),
    },
    {
      head: "User Name",
      accessor: "userName",
      component: (item, key, arr) => (
        <p className="m-0 fw-sbold">{item.userName}</p>
      ),
    },
    { head: "Email", accessor: "email" },
    { head: "Phone Number", accessor: "phoneNumber" },
    ...(admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN)
      ? [
          {
            head: "Roles",
            accessor: "Roles",
            component: (item, key, arr) => (
              <p className={`text-warning m-0 fw-sbold text-capitalize`}>
                {item?.roles?.map((item) => roleLabelEnum[item])?.join(",")}
              </p>
            ),
          },
          {
            head: "Status",
            accessor: "status",
            component: (item, ind, arr) => (
              <Toggle
                disabled={
                  item?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN) || // abe super admin ko kon deactivate kar sakata be
                  false
                }
                isChecked={item?.isActive}
                onChange={({ target: { checked } }) => {
                  statusChangeHandler(
                    () =>
                      UPDATE_SUB_ADMIN({
                        isActive: checked,
                        adminId: item?._id,
                      }),
                    ind,
                    "isActive",
                    checked
                  );
                }}
              />
            ),
          },
          {
            head: "Action",
            accessor: "Action",
            component: (item, key, arr) => (
              <TableActions editUrl={"/system-access/edit/" + item?._id} />
            ),
          },
        ]
      : []),
    ...(admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN)
      ? [
          {
            head: "Action",
            accessor: "Action",
            component: (item, key, arr) => (
              <TableToggle
                Options={activeInActiveOptions}
                onChange={(e) => {
                  setStatusChangeModel((p) => ({
                    dumpId: item?._id,
                    show: true,
                    body: {
                      adminId: admin?._id,
                      isActive: e?.target?.value === "active",
                      ind: key,
                    },
                  }));
                }}
                value={
                  item?.adminSubAdminLinkerInfo?.isActive
                    ? "active"
                    : "inactive"
                }
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <ConfirmationPop
        confirmHandler={() =>
          statusChangeHandler(
            () =>
              MANAGE_ADMIN_SUB_ADMIN_RELATION({
                adminId: statusChangeModel?.body?.adminId,
                subAdminId: statusChangeModel?.body?.subAdminId,
                isActive: statusChangeModel?.body?.isActive,
                subAdminId: statusChangeModel?.dumpId,
              }), // api
            statusChangeModel?.body?.ind, // ind
            "isActive", // key
            statusChangeModel?.body?.isActive // value
          )
        }
        confirmation={statusChangeModel.show}
        setConfirmation={() => {
          setStatusChangeModel((p) => defaultStatusModelState);
        }}
        type={"sure"}
      />
      <section className="systemAcess py-3 position-relative">
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
                    showStatusFilter={isSuperAdmin(admin)}
                  />
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Link
                        to={"/system-access/linkedMed"}
                        className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                        style={{ height: 40, minWidth: 100, fontSize: 12 }}
                      >
                        Link Mediator
                      </Link>
                    </li>{" "}
                    <li className="">
                      <Link
                        to={"/system-access/add"}
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

export default PlatForm;
