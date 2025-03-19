import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AreaChart from "../../../../../components/Graph/AreaChart";

const Earnings = () => {
  return (
    <>
      <section className="earningSec py-3 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Earning
              </h4>
            </Col>
            <Col lg="8" className="my-2">
              <div className="cardCstm p-3 border h-100 rounded">
                <div className="cardHead m-0 pb-2">
                  <h6 className="m-0 fw-sbold themeClr">Revenue</h6>
                </div>
                <div className="cardBody">
                  <AreaChart />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Earnings;
