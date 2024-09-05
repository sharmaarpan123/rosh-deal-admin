import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CstmPagination } from "../../../components/Common/Common";
import { Link } from "react-router-dom";

// css
import styles from "./Dashboard.module.scss";
import FeatureCard from "./components/FeatureCard";
import AreaChart from "../../../components/Graph/AreaChart";
import PieChart from "../../../components/Graph/PieChart";
import { catchAsync, checkResponse } from "../../../utilities/utilities";
import { DASHBOARD } from "../../../services/ApiCalls";

// img

const Dashboard = () => {
  const [data, setData] = useState({});

  const getDashBoardData = catchAsync(async () => {
    const res = await DASHBOARD();

    checkResponse({ res, setData });
  });

  useEffect(() => {
    getDashBoardData();
  }, []);

  return (
    <>
      <section className="position-relative py-2">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Dashboard
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <FeatureCard data={data} />
            </Col>
            <Col md="6" className="my-2">
              <div className="cardCstm p-3 border h-100 rounded">
                <div className="cardHead m-0 pb-2">
                  <h6 className="m-0 fw-sbold themeClr">Revenue</h6>
                </div>
                <div className="cardBody">
                  <AreaChart data={data} />
                </div>
              </div>
            </Col>
            <Col md="6" className="my-2">
              <div className="cardCstm p-3 border h-100 rounded">
                <div className="cardHead m-0 pb-2">
                  <h6 className="m-0 fw-sbold">Booking Status</h6>
                </div>
                <div className="cardBody">
                  <PieChart data={data} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
