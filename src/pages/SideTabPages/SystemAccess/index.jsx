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
} from "../../../utilities/utilities";

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
      head: "userName",
      accessor: "userName",
      component: (item, key, arr) => (
        <p className="m-0 fw-sbold">{item.userName}</p>
      ),
    },
    { head: "Email", accessor: "email" },
    { head: "Phone Number", accessor: "phoneNumber" },
    {
      head: "Roles",
      accessor: "Roles",
      component: (item, key, arr) => (
        <p className={`text-warning m-0 fw-sbold text-capitalize`}>
          {item?.roles?.join(",")}
        </p>
      ),
    },
    ...(admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN)
      ? [
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
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Sub Admin Modules
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    {admin?.roles?.includes(
                      ADMIN_ROLE_TYPE_ENUM?.SUPERADMIN
                    ) && (
                      <li className="d-flex align-items-center gap-10">
                        <label
                          htmlFor=""
                          className="form-label m-0 fw-sbold text-muted"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Filter by Status
                        </label>
                        <Form.Select
                          className="select text-muted"
                          aria-label="Default select example"
                        >
                          <option>Active</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </li>
                    )}
                    <li className="">
                      <div className="searchBox position-relative iconWithText">
                        <Button
                          className="border-0 p-0 position-absolute icn"
                          variant="transparent"
                          style={{ right: 10 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                          >
                            <path
                              d="M18.2462 17.225L13.1462 12.125C14.1212 10.925 14.7212 9.35 14.7212 7.625C14.7212 3.725 11.4962 0.5 7.59619 0.5C3.69619 0.5 0.471191 3.725 0.471191 7.625C0.471191 11.525 3.69619 14.75 7.59619 14.75C9.32119 14.75 10.8212 14.15 12.0962 13.175L17.1962 18.275C17.3462 18.425 17.5712 18.5 17.7212 18.5C17.8712 18.5 18.0962 18.425 18.2462 18.275C18.5462 17.975 18.5462 17.525 18.2462 17.225ZM7.59619 13.25C4.52119 13.25 1.97119 10.7 1.97119 7.625C1.97119 4.55 4.52119 2 7.59619 2C10.6712 2 13.2212 4.55 13.2212 7.625C13.2212 10.7 10.6712 13.25 7.59619 13.25Z"
                              fill="#C4C4C4"
                            />
                          </svg>
                        </Button>
                        <input
                          type="text"
                          placeholder="Search"
                          className="form-control"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
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
