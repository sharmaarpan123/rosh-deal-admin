import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

// css
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Select from "react-select";
import Loading from "../../../components/Common/Loading";
import CrossIcon from "../../../components/icons/svg/CrossIcon";
import {
  AGENCY_AND_MED_DASHBOARD,
  DASHBOARD,
} from "../../../services/ApiCalls";
import { dashboardReportTypeArr } from "../../../utilities/const";
import {
  catchAsync,
  checkResponse,
  makingOptionsFromArr,
  removeUnderScoreAndCapitalizeFirstLetter,
} from "../../../utilities/utilities";
import styles from "./Dashboard.module.scss";
import FeatureCard from "./components/FeatureCard";
import Calendar from "../../../components/icons/svg/Calendar";

const CustomInput = ({ value, onClick }) => (
  <button
    type="button"
    className="border p-2 rounded d-flex justify-content-between align-items-center gap-2 w-100 pe-4"
    onClick={onClick}
  >
    {value || "Select Date"}
    <Calendar />
  </button>
);

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

  const { admin } = useSelector((s) => s.login);

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

    const res = await (admin?.roles?.includes("superAdmin")
      ? DASHBOARD(body)
      : AGENCY_AND_MED_DASHBOARD(body));

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
        {/* <Row className="mb-4">
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center"
          >
            <h3 className="dashboard-title mb-0">Dashboard Overview</h3>
            <div className="d-flex gap-3 align-items-center">
              {loader && (
                <div className={`${styles.spinnerContainer}`}>
                  <Loading fullSize={true} />
                </div>
              )}
              <Button
                variant="outline-primary"
                className="filter-toggle-btn"
                onClick={() => setShowFilters((p) => !p)}
              >
                <i className="fas fa-filter me-2"></i>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
          </Col>
        </Row> */}

        {/* Filters Section */}
        {/* {showFilters && (
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
                  <Col md={3}>
                    <label className="form-label">Start Date</label>
                    <DatePicker
                      selected={DatesFilter?.startDate}
                      onChange={(date) =>
                        setDateFilter((p) => ({ ...p, startDate: date }))
                      }
                      customInput={<CustomInput />}
                      className="form-control"
                      isClearable
                      placeholderText="Select start date"
                    />
                  </Col>
                  <Col md={3}>
                    <label className="form-label">End Date</label>
                    <DatePicker
                      selected={DatesFilter?.endDate}
                      onChange={(date) =>
                        setDateFilter((p) => ({ ...p, endDate: date }))
                      }
                      customInput={<CustomInput />}
                      className="form-control"
                      isClearable
                      placeholderText="Select end date"
                    />
                  </Col>
                  {DatesFilter.startDate && DatesFilter.endDate && (
                    <Col xs={2} className="d-flex align-items-end">
                      <Button
                    
                        className="commonBtn"
                        size="sm"
                        onClick={() =>
                          setDateFilter({ startDate: "", endDate: "" })
                        }
                      >
                        Clear Dates
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        )} */}

        {/* Feature Cards */}
        <Row className="mb-4">
          <Col xs={12}>
            <FeatureCard data={data} />
          </Col>
        </Row>

        {/* Charts Section */}
        {/* <Row className="g-4">
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
        </Row> */}
      </Container>
    </section>
  );
};

export default Dashboard;
