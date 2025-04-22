import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import ReactSelectNoOptionMessage from "../../../../components/Common/ReactSelectNoOptionMessage";
import {
  DEALS_LIST,
  LINKED_SELLER_TO_ADMIN,
} from "../../../../services/ApiCalls";
import {
  catchAsync,
  checkResponse,
  errorToast,
} from "../../../../utilities/utilities";
import styles from "./AddDealToSeller.module.scss";

const AddDealToSeller = () => {
  const { sellerId } = useParams();
  const [loader, setLoader] = useState(false);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const navigate = useNavigate();

  const submitHandler = catchAsync(async (e) => {
    e.preventDefault();
    if (!!!selectedDeals?.length) {
      return errorToast({ message: "Please select deal!" });
    }
    setLoader(true);

    const res = await LINKED_SELLER_TO_ADMIN({
      sellerId,
      linkBySellerId: true,
      dealIds: selectedDeals?.map((item) => item?.value),
    });

    const success = checkResponse({ res, showSuccess: true, setLoader });

    if (success) {
      navigate("/seller");
    }
  }, setLoader);

  const loadDealOptions = async (inputValue, callback) => {
    if (inputValue?.trim()?.length < 2) return;

    const response = await DEALS_LIST({
      search: inputValue?.trim(),
    });
    if (response) {
      const options = response?.data?.data?.map((item) => ({
        value: item._id,
        label: item?.parentDealId?.productName || item?.productName,
      }));
      callback(options);
      if (!!!options.length) {
        setSelectedDeals([]);
      }
    } else {
      callback([]);
      setSelectedDeals([]);
    }
  };

  return (
    <section className={styles.addDealToSeller}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className={styles.pageHeader}>
              <Link
                to="/seller"
                className={styles.backButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                >
                  <path
                    d="M8.64707 0.473344C8.55514 0.381188 8.44594 0.308072 8.32572 0.258184C8.20549 0.208296 8.07661 0.182617 7.94644 0.182617C7.81628 0.182617 7.68739 0.208296 7.56717 0.258184C7.44694 0.308072 7.33774 0.381188 7.24582 0.473344L0.667065 7.05209C0.593675 7.12533 0.53545 7.21233 0.495723 7.3081C0.455996 7.40387 0.435547 7.50654 0.435547 7.61022C0.435547 7.7139 0.455996 7.81657 0.495723 7.91234C0.53545 8.00811 0.593675 8.0951 0.667065 8.16834L7.24582 14.7471C7.63373 15.135 8.25915 15.135 8.64707 14.7471C9.03498 14.3592 9.03498 13.7338 8.64707 13.3458L2.9154 7.60626L8.65498 1.86668C9.03498 1.48668 9.03498 0.853344 8.64707 0.473344Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.2"
                  />
                </svg>
                <span>Back to Seller</span>
              </Link>
            </div>

            <div className={styles.formWrapper}>
              <h4 className={styles.title}>
                Add Deals to Seller
              </h4>

              <Form onSubmit={submitHandler}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="deals"
                    className={styles.label}
                  >
                    Select Deals
                  </label>
                  <div className={styles.selectWrapper}>
                    <AsyncSelect
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                        NoOptionsMessage: (props) => (
                          <ReactSelectNoOptionMessage
                            message="Search Deals"
                            {...props}
                          />
                        ),
                      }}
                      onChange={(value) => {
                        setSelectedDeals(value);
                      }}
                      loadOptions={loadDealOptions}
                      value={selectedDeals}
                      isMulti
                      isClearable
                      placeholder="Search and select deals..."
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    className={styles.submitButton}
                    type="submit"
                    disabled={loader}
                  >
                    {loader ? (
                      <span className={styles.loadingSpinner}>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </span>
                    ) : (
                      "Add Deals"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddDealToSeller;
