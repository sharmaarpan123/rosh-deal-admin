import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

// img
// import i1 from "@/Assets/images/authBg.png";

import React, { useEffect, useState } from "react";

// img
// import i1 from "@/Assets/images/authBg.png";

import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../../../../../components/Common/Loading";
import Title from "../../../../../components/Common/Title";
import {
  CLONE_DEAL,
  MY_AGENCY_DEAL_DETAIL_AS_MED,
} from "../../../../../services/ApiCalls";
import { superAdminCommission } from "../../../../../utilities/const";
import { catchAsync, checkResponse } from "../../../../../utilities/utilities";

export const cloneDealSchema = z
  .object({
    actualPrice: z
      .string({ required_error: "Actual Price is required" })
      .min(1, { message: "Actual Price is required" })
      .refine((data) => !isNaN(data), {
        message: "Actual Price must be numeric",
        paths: ["actualPrice"],
      }),
    lessAmount: z
      .string()
      .refine(
        (data) => {
          if (!data) return true;
          return !isNaN(data);
        },
        {
          message: "Less Amount must be numeric",
          paths: ["lessAmount"],
        }
      )
      .optional(),
    adminCommission: z
      .string({ required_error: "Admin commission required" })
      .min(1, { message: "admin commission is required" })
      .refine((data) => !isNaN(data), {
        message: "Admin  commission should be numeric",
      }),
    finalCashBackForUser: z
      .string({
        invalid_type_error: "invalid finalCashBackForUser",
        required_error: "final Cash Back ForUser is required",
      })
      .min(1, { message: "final Cash Back ForUser is required" }),
    commissionValue: z.string().refine(
      (data) => {
        if (data && isNaN(data)) {
          return false;
        }
        return true;
      },
      { message: "commission should be numeric", path: ["commissionValue"] }
    ),
  })

  .refine(
    (data) => {
      if (!data?.lessAmount && !data?.commissionValue) {
        return false;
      }
      return true;
    },
    {
      message: "Please fill either less Amount or commission",
      path: ["lessAmount"],
    }
  );

const MyAgencyDealDetailsAsMed = () => {
  const [dealDetails, setDealDetails] = useState();
  const { id } = useParams();
  const getData = catchAsync(async () => {
    setInitialLoader(true);
    const res = await MY_AGENCY_DEAL_DETAIL_AS_MED(id);
    checkResponse({
      res,
      setData: setDealDetails,
      setLoader: setInitialLoader,
    });
  });

  const [initialLoader, setInitialLoader] = useState(false);
  const [cloneLoader, setCloneLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) getData();
  }, [id]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(cloneDealSchema),
    values: {
      actualPrice: dealDetails?.actualPrice,
      commissionValue: "",
      lessAmount: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submitHandler = catchAsync(async (data) => {
    let res;
    setCloneLoader(true);

    res = await CLONE_DEAL({
      dealId: id,
      ...data,
    });

    checkResponse({
      res,
      showSuccess: true,
      navigate: navigate,
      setLoader: setCloneLoader,
      navigateUrl: "/myAgencyDealsAsMed",
    });
  }, setCloneLoader);

  console.log(errors, "errors");

  useEffect(() => {
    const actualPrice = watch("actualPrice");
    const lessAmount = watch("lessAmount");
    const commissionValue = watch("commissionValue");
    if (actualPrice && (lessAmount || commissionValue)) {
      const adminCommission = Math.ceil(
        (superAdminCommission * (lessAmount || commissionValue)) / 100
      );

      setValue("adminCommission", String(adminCommission), {
        shouldValidate: true,
      });
      if (commissionValue) {
        setValue(
          "finalCashBackForUser",
          String(
            Number(actualPrice) +
              Number(commissionValue) -
              Number(adminCommission)
          ),
          {
            shouldValidate: true,
          }
        );
      } else {
        setValue(
          "finalCashBackForUser",
          String(
            Number(actualPrice) - Number(lessAmount) - Number(adminCommission)
          ),
          {
            shouldValidate: true,
          }
        );
      }
    } else {
      setValue("adminCommission", "0", {
        shouldValidate: true,
      });
      setValue("finalCashBackForUser", "0", {
        shouldValidate: true,
      });
    }
  }, [watch("actualPrice"), watch("lessAmount"), watch("commissionValue")]);

  return (
    <>
      <section className="userDetail py-3 position-relative">
        <Container>
          <Row>
            <Title
              // title={" Deal Information"}
              BackPath={"/myAgencyDealsAsMed"}
            />
            <Col lg="12">
              <h5 className="text-success mb-0">
                {dealDetails?.isClonedAlready &&
                  "This Deals is Already Posted By You"}
              </h5>
            </Col>

            <Col lg="12" className="my-2 position-relative">
      <div
        className="formWrpper px-lg-5 p-md-4 p-3 rounded position-relative"
        style={{ background: "#EEEEEE" }}
      >
        {initialLoader ? (
          <div
            className="position-absolute "
            style={{
              right: 12,
              top: 12,
              width: 30,
            }}
          >
            <Loading fullSize={true} />
          </div>
        ) : (
          <Row className="justify-content-between">
            <Col md={6} className="my-2">
              <ul className="list-unstyled ps-0 mb-0 notLastBorder pe-lg-3">
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Created at:</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {moment(dealDetails?.createdAt).format(
                      "DD-MM-YYYY  hh:mm:ss A"
                    )}
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Brand</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.brand?.name}
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Product Name:</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.productName}
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Product Price</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.actualPrice}
                  </h6>
                </li>
                {dealDetails?.isCommissionDeal ? (
                  <li className="py-2 d-flex align-items-center gap-10">
                    <p className="m-0 themeBlue fw-sbold w-25">Commission</p>
                    <h6 className="m-0 text-muted fw-bold w-50">
                      {dealDetails?.commissionValueToSubAdmin}
                    </h6>
                  </li>
                ) : (
                  <li className="py-2 d-flex align-items-center gap-10">
                    <p className="m-0 themeBlue fw-sbold w-25">Less</p>
                    <h6 className="m-0 text-muted fw-bold w-50">
                      {dealDetails?.lessAmountToSubAdmin}
                    </h6>
                  </li>
                )}
              
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Deal Type</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.dealCategory?.name}
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25 text-break">Product Link</p>
                  <h6 className="m-0 text-muted fw-bold w-50 text-truncate text-wrap">
                    <a
                      href={dealDetails?.postUrl}
                      target="_blank"
                      
                    >
                      {dealDetails?.postUrl}
                    </a>
                  </h6>
                </li>
              </ul>
            </Col>
            <Col md={6} className="my-2">
              <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Platform</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.platForm?.name}
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Slot Alloted</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.slotAlloted}
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Slot Completed</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.slotCompletedCount}
                  </h6>
                </li>

                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Payment Status</p>
                  <h6 className="m-0 text-muted fw-bold ">
                    <p
                      className={`text-white px-4  mb-0 text-capitalize rounded text-center ${
                        dealDetails?.paymentStatus === "paid"
                          ? "bg-success"
                          : dealDetails?.paymentStatus === "pending"
                          ? "bg-warning"
                          : "bg-pending"
                      }`}
                    >
                      {dealDetails?.paymentStatus}
                    </p>
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Deal Status</p>
                  <h6 className="m-0 text-muted fw-bold ">
                    <p
                      className={` rounded text-capitalize mb-0  px-4 text-center text-white ${
                        dealDetails?.isActive ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {dealDetails?.isActive ? "active" : "inactive"}
                    </p>
                  </h6>
                </li>
                <li className="py-2 d-flex align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Platform Fee</p>
                  <h6 className="m-0 text-muted fw-bold w-50">
                    {dealDetails?.adminCommission}
                  </h6>
                </li>
              </ul>
            </Col>
            <Col lg="12">
              <li className="py-2 d-flex align-items-center gap-10">
                <p className="m-0 themeBlue fw-sbold w-25">
                  Terms And Condition
                </p>
                <h6 className="m-0 text-muted fw-bold">
                  {dealDetails?.termsAndCondition}
                </h6>
              </li>
            </Col>
          </Row>
        )}
      </div>
    </Col>
            {dealDetails && !dealDetails?.isClonedAlready && (
              <Col lg="12" className="my-2">
                <div
                  className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                  style={{ background: "#EEEEEE" }}
                >
                  <h5>Post This Deal</h5>
                  <Form onSubmit={handleSubmit(submitHandler)}>
                    {!dealDetails?.isCommissionDeal ? (
                      <Col lg="4" md="6" className="my-2">
                        <div className="py-2">
                          <label
                            htmlFor=""
                            className="form-label fw-sbold text-muted ps-2 m-0"
                          >
                            Less Amount
                          </label>
                          <Controller
                            control={control}
                            name="lessAmount"
                            render={({ field }) => {
                              return (
                                <input
                                  {...field}
                                  onChange={(e) => {
                                    if (getValues("commissionValue")) {
                                      toast.dismiss();
                                      toast.error(
                                        "You cannot add both less and commission value "
                                      );
                                      return;
                                    }
                                    field.onChange(e.target.value);
                                  }}
                                  type="text"
                                  placeholder="Enter less value for users"
                                  className="form-control"
                                />
                              );
                            }}
                          />

                          {errors?.lessAmount &&
                            !getValues("commissionValue") && (
                              <p className="text-danger m-0">
                                {errors.lessAmount.message}
                              </p>
                            )}
                        </div>
                      </Col>
                    ) : (
                      <Col lg="4" md="6" className="my-2">
                        <div className="py-2">
                          <label
                            htmlFor=""
                            className="form-label fw-sbold text-muted ps-2 m-0"
                          >
                            Commission Value
                          </label>
                          <Controller
                            control={control}
                            name="commissionValue"
                            render={({ field }) => {
                              return (
                                <input
                                  {...field}
                                  onChange={(e) => {
                                    if (getValues("lessAmount")) {
                                      toast.dismiss();
                                      toast.error(
                                        "You cannot add both  less and commission value "
                                      );
                                      return;
                                    }
                                    field.onChange(e.target.value);
                                  }}
                                  type="text"
                                  placeholder="Add commission value"
                                  className="form-control"
                                />
                              );
                            }}
                          />

                          {errors?.commissionValue && (
                            <p className="text-danger m-0">
                              {errors.commissionValue.message}
                            </p>
                          )}
                        </div>
                      </Col>
                    )}
                    <Row lg="4" md="6" className="my-2">
                      <Col>
                        <div className="py-2 d-flex flex-column">
                          <label
                            htmlFor=""
                            className="form-label fw-sbold text-muted ps-2 m-0"
                          >
                            Platform Fee
                          </label>

                          <p className="form-label fw-sbold  ps-2 m-0 text-success">
                            {getValues("adminCommission")}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <div className="py-2 d-flex flex-column">
                          <label
                            htmlFor=""
                            className="form-label fw-sbold text-muted ps-2 m-0"
                          >
                            Final Refund amount To buyer
                          </label>

                          <p className="form-label fw-sbold  ps-2 m-0 text-success">
                            {watch("finalCashBackForUser")}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Col lg="12" className="my-2">
                      <div className="d-flex align-items-center justify-content-center gap-10">
                        <Button className="d-flex align-items-center justify-content-center commonBtn GreyBtn">
                          Cancel
                        </Button>
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn"
                          type="submit"
                          disabled={cloneLoader}
                        >
                          {cloneLoader ? "Posting..." : "Submit"}
                        </Button>
                      </div>
                    </Col>
                  </Form>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MyAgencyDealDetailsAsMed;
