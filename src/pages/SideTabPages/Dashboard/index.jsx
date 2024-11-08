import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CstmPagination } from "../../../components/Common/Common";
import { Link } from "react-router-dom";

// css
import styles from "./Dashboard.module.scss";
import FeatureCard from "./components/FeatureCard";
import AreaChart from "../../../components/Graph/AreaChart";
import PieChart from "../../../components/Graph/PieChart";
import {
  catchAsync,
  checkResponse,
  makingOptionsFromArr,
  removeUnderScoreAndCapitalizeFirstLetter,
} from "../../../utilities/utilities";
import { DASHBOARD } from "../../../services/ApiCalls";
import Select from "react-select";
import { dashboardReportTypeArr } from "../../../utilities/const";
import Loading from "../../../components/Common/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dashboardTypeOptions = makingOptionsFromArr(dashboardReportTypeArr);

// img

const Dashboard = () => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [DatesFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [selectedReportType, setSelectedReportedType] = useState({
    label: removeUnderScoreAndCapitalizeFirstLetter(dashboardReportTypeArr[0]),
    value: dashboardReportTypeArr[0],
  });

  const getDashBoardData = catchAsync(async () => {
    setLoader(true);

    const body = {
      revenueReportType: selectedReportType.value,
      ...(DatesFilter.startDate &&
        DatesFilter.endDate && {
          startDate: new Date(DatesFilter.startDate),
          endDate: new Date(DatesFilter.endDate),
        }),
    };

    const res = await DASHBOARD(body);

    checkResponse({ res, setData, setLoader });
  }, setLoader);

  useEffect(() => {
    getDashBoardData();
  }, [selectedReportType]);

  useEffect(() => {
    DatesFilter.startDate && DatesFilter.endDate && getDashBoardData();
    !DatesFilter.startDate && !DatesFilter.endDate && getDashBoardData();
  }, [DatesFilter]);

  return (
    <>
      <section className="position-relative py-2">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize d-flex justify-content-between">
                Dashboard{" "}
                {loader && (
                  <div
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  >
                    <Loading fullSize={true} />
                  </div>
                )}
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <FeatureCard data={data} />
            </Col>
            <Col md="6" className="my-2">
              <div className="cardCstm p-3 border h-100 rounded">
                <div className="cardHead m-0 pb-2">
                  <h6 className="m-0 fw-sbold themeClr d-flex justify-content-between">
                    Revenue{" "}
                    {showFilters && (
                      <Button
                        onClick={() =>
                          setDateFilter((p) => ({
                            startDate: "",
                            endDate: "",
                          }))
                        }
                      >
                        Clear dates
                      </Button>
                    )}
                    <Button onClick={() => setShowFilters((p) => !p)}>
                      Toggle show Filters
                    </Button>
                  </h6>
                </div>
                {showFilters && (
                  <div>
                    {DatesFilter.startDate && DatesFilter.endDate ? (
                      <></>
                    ) : (
                      <>
                        <label htmlFor="">Report Time Type</label>
                        <Select
                          options={dashboardTypeOptions}
                          value={selectedReportType}
                          onChange={setSelectedReportedType}
                        />
                      </>
                    )}
                    <div className="d-flex justify-content-between">
                      <Row>
                        <label htmlFor="">Start Date</label>
                        <DatePicker
                          className="w-100"
                          selected={DatesFilter?.startDate}
                          onChange={(date) =>
                            setDateFilter((p) => ({ ...p, startDate: date }))
                          }
                          isClearable
                        />
                      </Row>
                      <Row>
                        <label htmlFor="">End Date</label>
                        <DatePicker
                          className="w-100"
                          selected={DatesFilter?.endDate}
                          onChange={(date) =>
                            setDateFilter((p) => ({ ...p, endDate: date }))
                          }
                          isClearable
                        />
                      </Row>
                    </div>
                  </div>
                )}
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
