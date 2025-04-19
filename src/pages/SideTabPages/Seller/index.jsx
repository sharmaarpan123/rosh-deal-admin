import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import Toggle from "../../../components/Common/Toggle";
import dataHandler from "../../../hooks/dataHandler";
import {
  AGENCY_SELLER_LIST,
  UPDATE_SUB_ADMIN
} from "../../../services/ApiCalls";
import {
  activeInactiveOptions,
  ADMIN_ROLE_TYPE_ENUM
} from "../../../utilities/const";
import {
  isSuperAdmin
} from "../../../utilities/utilities";

const roleLabelEnum = {
  subadmin: "Mediator",
  admin: "Agency",
  superAdmin: "King",
};

const Sellers = () => {
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
    api: AGENCY_SELLER_LIST,
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
    { head: "Email", accessor: "email" },
    { head: "Phone Number", accessor: "phoneNumber" },
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
        ]
      : []),
  ];

  return (
    <>
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
                    {admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN) && (
                      <>
                        <li className="">
                          <Link
                            to={"/seller/link"}
                            className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                            style={{ height: 40, minWidth: 100, fontSize: 12 }}
                          >
                            Link Seller
                          </Link>
                        </li>{" "}
                        <li className="">
                          <Link
                            to={"/seller/add"}
                            className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                            style={{ height: 40, minWidth: 100, fontSize: 12 }}
                          >
                            Add New
                          </Link>
                        </li>
                      </>
                    )}
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

export default Sellers;
