import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import moment from "moment";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Common/CustomPagination";
import Filter from "../../../components/Common/Filter";
import TableActions from "../../../components/Common/TableActions";
import noImg from "../../../components/Common/noImg";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import dataHandler from "../../../hooks/dataHandler";
import {
  POSTER_DELETE,
  POSTER_LIST,
  POSTER_STATUS_CHANGE,
} from "../../../services/ApiCalls";
import { activeInactiveOptions } from "../../../utilities/const";
import {
  activeInActiveOptions,
  capitalizedFirstAlphaBet,
} from "../../../utilities/utilities";
import TableToggle from "../../../components/Common/TableToggle";

const Poster = () => {
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
    api: POSTER_LIST,
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
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item.name)}
        </p>
      ),
    },
    {
      head: "Title",
      accessor: "title",
    },
    {
      head: "Poster Type",
      accessor: "posterType",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item.posterType)}
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
      head: "Brand",
      accessor: "brand",
      component: (item, key, arr) => <>{item?.brand?.name || "-"}</>,
    },
    {
      head: "Deal",
      accessor: "deal",
      component: (item, key, arr) => <>{item?.deal?.productName || "-"}</>,
    },
    {
      head: "Deal Category",
      accessor: "dealCategory",
      component: (item, key, arr) => <>{item?.dealCategory?.name || "-"}</>,
    },
    {
      head: "Redirect url",
      accessor: "redirectUrl",
      component: (item, key, arr) => (
        <>
          {item?.redirectUrl ? (
            <a href={item?.redirectUrl} target="_blank">
              Redirect url
            </a>
          ) : (
            "-"
          )}
        </>
      ),
    },

    {
      head: "Date || Time ",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.createdAt).format("DD-MM-YYYY  hh:mm:ss A")}</>
      ),
    },
    {
      head: "Status",
      accessor: "isDeleted",
      component: (item, index) => (
        <TableToggle
          Options={activeInActiveOptions}
          value={item.isActive ? "active" : "inactive"}
          classNames={item.isActive ? "bg-success" : "bg-danger"}
          style={{
            color: item.isActive ? "green" : "red",
            width: 120,
          }}
          onChange={(e) =>
            statusChangeHandler(
              () =>
                POSTER_STATUS_CHANGE({
                  posterId: item._id,
                  status: e.target.value === "active",
                }),
              index,
              "isActive",
              !item.isActive
            )
          }
        />
      ),
    },
    {
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <TableActions editUrl={`/poster/edit/${item._id}`} />
      ),
    },
  ];

  return (
    <>
      <ConfirmationPop
        type={"delete"}
        confirmHandler={() =>
          deleteHandler(() => POSTER_DELETE({ posterId: deleteModel.dumpId }))
        }
        confirmation={deleteModel.show}
        setConfirmation={() => setDeleteModel({ dumpId: "", show: false })}
      />
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
                      showSearch={false}
                    />
                  </ul>
                </div>
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Link
                        to={"/poster/add"}
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

export default Poster;
