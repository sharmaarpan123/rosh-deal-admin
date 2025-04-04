import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

//img
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
// css

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  BRAND_LIST,
  BULK_ADD_DEAL,
  DEAL_CATEGORY_LIST,
  PLATFORM_LIST,
  SCRAPPER_IMAGE,
} from "../../../../../services/ApiCalls";
import {
  catchAsync,
  checkResponse,
  isStringOnlyContainSpaces,
} from "../../../../../utilities/utilities";
import TagsInput from "../add/TagsInput";
import styles from "./BulkAdd.module.scss";
import noImg from "../../../../../Assets/images/no-img.png";
import BackIcon from "../../../../../components/icons/svg/BackIcon";
import SingleDealBox from "./SingleDealBox.jsx";

const makeOptions = (data) => {
  return data?.map((item) => ({ label: item.name, value: item._id }));
};

const objectIdSchema = (fieldName) =>
  z.object(
    {
      label: z.string({ required_error: fieldName + " is Required" }),
      value: z.string({ required_error: fieldName + " is Required" }),
    },
    {
      invalid_type_error: fieldName + " is required",
      required_error: fieldName + " is Required",
    }
  );

const schema = ({ isExchangeDeal }) =>
  z.object({
    brand: objectIdSchema("brand"),
    platForm: objectIdSchema("Plat form"),
    dealCategory: objectIdSchema("Deal Category"),
    csvData: z
      .array(
        z
          .object({
            productName: z
              .string({ required_error: "This is Required" })
              .min(1, { message: "Name is required" }),
            productCategories: z
              .array(z.string())
              .refine((data) => !data.some((item) => item.trim() === ""), {
                message: "Product categories must contain at least one letter",
              })
              .optional(),
            postUrl: z.string().url({ invalid_type_error: "inValid post url" }),
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
            lessAmountToSubAdmin: z.string().optional(),
            adminCommission: z
              .string({ required_error: "Admin commission required" })
              .min(1, { message: "admin commission is required" })
              .refine((data) => !isNaN(data), {
                message: "Admin  commission should be numeric",
              }),
            slotAlloted: z
              .string({
                invalid_type_error: "invalid slotAlloted",
                required_error: "slot Alloted is required",
              })
              .min(1, { message: "Slot Alloted is required" })
              .refine((data) => !isNaN(data), {
                message: "slot Alloted should be numeric",
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
              {
                message: "commission should be numeric",
                path: ["commissionValue"],
              }
            ),
            commissionValueToSubAdmin: z.string().optional(),
            refundDays: z
              .string({
                invalid_type_error: "invalid Refund Days",
                required_error: "Refund Days is required",
              })
              .min(1, { message: "Refund Days is required" })
              .refine((data) => !isNaN(data), {
                message: "Refund Days should be Numeric",
              }),
            termsAndCondition: z
              .string({
                required_error: "Terms and condition is required",
              })
              .min(1, { message: "This  is required" }),
            uniqueIdentifier: z
              .string({
                required_error: "unique Identifier is required",
              })
              .min(1, { message: "unique Identifier  is required" }),
            imageUrl: z.string().optional(),
            exchangeDealProducts: z.array(z.string()).optional(),
            isCommissionDeal: z.boolean(),
            showToSubAdmins: z.boolean(),
            showToUsers: z.boolean(),
          })
          .refine(
            (data) => {
              if (
                isExchangeDeal &&
                (!data.exchangeDealProducts || !data.exchangeDealProducts[0])
              ) {
                return false;
              }
              return true;
            },
            {
              message:
                "If your deal is exchange deal , then please provide the exchange deals products fields",
              path: ["exchangeDealProducts"],
            }
          )
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
          )
          .refine(
            (data) => {
              if (
                data?.showToSubAdmins &&
                data?.lessAmount &&
                !data?.lessAmountToSubAdmin
              ) {
                return false;
              }
              return true;
            },
            {
              message: "Please fill less Amount for the Mediator",
              path: ["lessAmountToSubAdmin"],
            }
          )
          .refine(
            (data) => {
              if (
                data?.showToSubAdmins &&
                data?.commissionValue &&
                !data?.commissionValueToSubAdmin
              ) {
                return false;
              }
              return true;
            },
            {
              message: "Please fill commission for the Mediator",
              path: ["commissionValueToSubAdmin"],
            }
          )
      )
      .min(1, { message: "At least one deal must be added." }),
  });

const AddBulkDeal = () => {
  const navigate = useNavigate();
  const [brandOptions, setBrandOptions] = useState([]);
  const [dealCategoryOptions, setDealCategoryOptions] = useState([]);
  const [platFormOptions, setPlatFormOptions] = useState([]);
  const [isExchangeDeal, setIsExChangeDeal] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      csvData: [],
    },
    resolver: zodResolver(schema({ isExchangeDeal })),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  console.log(errors, "context");

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "csvData",
  });

  const submitHandler = catchAsync(async (data) => {
    console.log(data, "data");

    const res = await BULK_ADD_DEAL(
      data?.csvData?.map((item, index) => ({
        dealCategory: data.dealCategory.value,
        platForm: data.platForm.value,
        brand: data.brand.value,
        ...item,
        slotAlloted: +item.slotAlloted,
        isCommissionDeal: item?.commissionValue ? true : false,
      }))
    );
    checkResponse({
      res,
      navigate,
      showSuccess: true,
      navigateUrl: "/deal",
    });
  });

  const getData = catchAsync(async () => {
    const apis = [BRAND_LIST(), PLATFORM_LIST(), DEAL_CATEGORY_LIST()];

    const res = await Promise.all(apis);
    checkResponse({
      res: res[0],
      setData: (data) => setBrandOptions((p) => makeOptions(data)),
    });
    checkResponse({
      res: res[1],
      setData: (data) => setPlatFormOptions((p) => makeOptions(data)),
    });
    checkResponse({
      res: res[2],
      setData: (data) => setDealCategoryOptions((p) => makeOptions(data)),
    });
  });

  useEffect(() => {
    getData();
  }, []);

  const csvImportHandler = catchAsync((e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        try {
          const data = [];
          result?.data?.forEach((row) => {
            if (Object.keys(row).length > 1) {
              const item = { ...row };
              item.productCategories =
                String(item?.productCategories)?.split(",") || [];
              item.productCategories = item?.productCategories?.filter(
                (str) => !isStringOnlyContainSpaces(str)
              );
              item.actualPrice = String(item.actualPrice);
              item.cashBack = String(item.cashBack);
              item.slotAlloted = String(item.slotAlloted);
              item.adminCommission = String(item.adminCommission);
              data.push(item);
            }
          });

          if (data.length) {
            setValue("csvData", data, { shouldValidate: true });
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
      error: (error) => {
        console.log(error, "error");
        toast.error(error.message);
      },
    });
  });

  const appendField = () => {
    prepend({
      productName: "",
      uniqueIdentifier: "",
      productCategories: [],
      postUrl: "",
      actualPrice: "",
      lessAmount: "",
      lessAmountToSubAdmin: "",
      commissionValue: "",
      commissionValueToSubAdmin: "",
      finalCashBackForUser: "",
      adminCommission: "",
      refundDays: "",
      showToUsers: false,
      showToSubAdmins: false,
      slotAlloted: "",
      termsAndCondition: "",
      imageUrl: "",
      isCommissionDeal: false,
      exchangeDealProducts: [],
    });
  };

  return (
    <>
      <section className="subadmin position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className=" left d-flex gap-10 align-items-center">
                  <Link
                    to={-1}
                    className="border d-flex align-items-center p-2 rounded"
                  >
                    <BackIcon />
                  </Link>
                </div>
                <div className="right d-flex gap-10">
                  <a target="_blank" href="/sampleBulk.csv">
                    <Button className="d-block align-items-center justify-content-center commonBtn  rounded text-white">
                      Download Sample csv
                    </Button>
                  </a>
                  <Button className="d-flex align-items-center justify-content-center commonBtn position-relative">
                    Import Csv
                    <input
                      type="file"
                      className="file position-absolute h-100 w-100"
                      placeholder=""
                      onChange={csvImportHandler}
                      accept=".csv"
                    />
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <div
                className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                style={{ background: "#EEEEEE" }}
              >
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <Row className="d-flex justify-content-center">
                    <Col lg="4" md="6" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Select Brand
                        </label>
                        <Controller
                          control={control}
                          name="brand"
                          render={({ field }) => {
                            return <Select {...field} options={brandOptions} />;
                          }}
                        />
                        {errors?.brand && (
                          <p className="text-danger m-0">
                            {errors.brand.message}
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col lg="4" md="6" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Select DealCategory
                        </label>
                        <Controller
                          control={control}
                          name="dealCategory"
                          render={({ field }) => {
                            return (
                              <Select
                                {...field}
                                options={dealCategoryOptions}
                                onChange={(value) => {
                                  if (value?.isExchangeDeal) {
                                    setIsExChangeDeal((p) => true);
                                  } else {
                                    setIsExChangeDeal((p) => false);
                                  }
                                  field.onChange(value);
                                }}
                              />
                            );
                          }}
                        />
                        {errors?.dealCategory && (
                          <p className="text-danger m-0">
                            {errors.dealCategory.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col lg="4" md="6" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Select Platform
                        </label>
                        <Controller
                          control={control}
                          name="platForm"
                          render={({ field }) => {
                            return (
                              <Select {...field} options={platFormOptions} />
                            );
                          }}
                        />
                        {errors?.platForm && (
                          <p className="text-danger m-0">
                            {errors.platForm.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Row className="my-2">
                      <Col lg="12" className="d-flex justify-content-end ">
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn "
                          onClick={appendField}
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>

                    <div className={`${styles.csvDataListing}`}>
                      {fields.map((item, index) => {
                        return (
                          <SingleDealBox
                            errors={errors}
                            index={index}
                            setValue={setValue}
                            item={item}
                            register={register}
                            watch={watch}
                            key={index}
                            remove={remove}
                            control={control}
                          />
                        );
                      })}
                    </div>
                    <Col lg="12">
                      {errors?.csvData?.root && (
                        <p className="text-danger text-center">
                          {errors?.csvData?.root?.message}
                        </p>
                      )}
                      {errors?.csvData?.message && (
                        <p className="text-danger text-center">
                          {errors?.csvData?.message}
                        </p>
                      )}
                    </Col>
                    <Col lg="12" className="my-2">
                      <div className="d-flex align-items-center justify-content-center gap-10">
                        <Button
                          onClick={() => navigate(-1)}
                          className="d-flex align-items-center justify-content-center commonBtn GreyBtn"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn"
                          type="button"
                          onClick={handleSubmit(submitHandler)}
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddBulkDeal;
