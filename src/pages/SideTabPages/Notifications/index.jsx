import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// img
import { useSelector } from "react-redux";
import CustomPagination from "../../../components/Common/CustomPagination";
import dataHandler from "../../../hooks/dataHandler";
import { GET_ALL_NOTIFICATIONS } from "../../../services/ApiCalls";
import TableLayout from "../../../components/TableLayout";
import moment from "moment";

const Notification = () => {
  const { setBody, body, data, loader, paginationHandler, total } = dataHandler(
    {
      extraBody: {
        limit: 20,
      },
      api: GET_ALL_NOTIFICATIONS,
    }
  );

  const column = [
    {
      head: "#",
      accessor: "#",
      component: (item, key) => {
        return <>{body.limit * (body.page - 1) + key + 1}</>;
      },
    },
    {
      head: "Time",
      component: (item) => {
        return <>{moment(item?.createdAt).format("DD-MM-YYYY  hh:mm:ss A")}</>;
      },
    },
    {
      head: "Title",
      accessor: "body",
    },
    {
      head: "Message",
      accessor: "title",
    },
  ];

  return (
    <>
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
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

export default Notification;
