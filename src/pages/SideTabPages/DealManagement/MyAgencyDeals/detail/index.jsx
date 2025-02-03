import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

// img
// import i1 from "@/Assets/images/authBg.png";

import React, { useEffect, useState } from "react";

// img
// import i1 from "@/Assets/images/authBg.png";

import Title from "../../../../../components/Common/Title";
import DealDetailView from "../../../../../components/Deal/DealDetailView";
import {
  CLONE_DEAL,
  MY_AGENCY_DEAL_DETAIL_AS_MED,
} from "../../../../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../../../../utilities/utilities";
import { z } from "zod";
import { superAdminCommission } from "../../../../../utilities/const";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
              title={" Deal Information"}
              BackPath={"/myAgencyDealsAsMed"}
            />
            <Col lg="12">
              <h5 className="text-warning mb-0">
                {dealDetails?.isClonedAlready &&
                  "This Deals is Already Posted By You"}
              </h5>
            </Col>

            <DealDetailView
              DealDetails={dealDetails}
              loader={initialLoader}
              isSubAdminWatchingDetails={true}
            />
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
