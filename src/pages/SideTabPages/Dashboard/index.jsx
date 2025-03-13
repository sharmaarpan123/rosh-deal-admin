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
    <section className="dashboard-container py-4">
      <Container fluid>
        {/* Header Section */}
        <Row className="mb-4">
          <Col xs={12} className="d-flex justify-content-between align-items-center">
            <h3 className="dashboard-title mb-0">Dashboard Overview</h3>
            <div className="d-flex gap-3 align-items-center">
              {loader && (
                <div className="spinner-container">
                  <Loading fullSize={true} />
                </div>
              )}
              <Button 
                variant="outline-primary"
                className="filter-toggle-btn"
                onClick={() => setShowFilters(p => !p)}
              >
                <i className="fas fa-filter me-2"></i>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </Col>
        </Row>

        {/* Filters Section */}
        {showFilters && (
          <Row className="mb-4">
            <Col xs={12}>
              <div className="filter-container p-3 bg-light rounded">
                <Row className="g-3">
                  {!DatesFilter.startDate || !DatesFilter.endDate ? (
                    <Col md={4}>
                      <label className="form-label">Report Time Type</label>
                      <Select
                        options={dashboardTypeOptions}
                        value={selectedReportType}
                        onChange={setSelectedReportedType}
                        className="filter-select"
                      />
                    </Col>
                  ) : null}
                  <Col md={4}>
                    <label className="form-label">Start Date</label>
                    <DatePicker
                      selected={DatesFilter?.startDate}
                      onChange={date => setDateFilter(p => ({ ...p, startDate: date }))}
                      className="form-control"
                      isClearable
                      placeholderText="Select start date"
                    />
                  </Col>
                  <Col md={4}>
                    <label className="form-label">End Date</label>
                    <DatePicker
                      selected={DatesFilter?.endDate}
                      onChange={date => setDateFilter(p => ({ ...p, endDate: date }))}
                      className="form-control"
                      isClearable
                      placeholderText="Select end date"
                    />
                  </Col>
                  {DatesFilter.startDate && DatesFilter.endDate && (
                    <Col xs={12}>
                      <Button 
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setDateFilter({ startDate: "", endDate: "" })}
                      >
                        Clear Dates
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        )}

        {/* Feature Cards */}
        <Row className="mb-4">
          <Col xs={12}>
            <FeatureCard data={data} />
          </Col>
        </Row>

        {/* Charts Section */}
        <Row className="g-4">
          <Col lg={7}>
            <div className="dashboard-card h-100">
              <div className="card-header">
                <h5 className="mb-0">Revenue Overview</h5>
              </div>
              <div className="card-body">
                <AreaChart data={data} />
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="dashboard-card h-100">
              <div className="card-header">
                <h5 className="mb-0">Booking Status</h5>
              </div>
              <div className="card-body">
                <PieChart data={data} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
