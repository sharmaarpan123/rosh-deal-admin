import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
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
  errorToast,
  isStringOnlyContainSpaces,
} from "../../../../../utilities/utilities";
import TagsInput from "../add/TagsInput";
import styles from "./BulkAdd.module.scss";
import noImg from "../../../../../Assets/images/no-img.png";
import BackIcon from "../../../../../components/icons/svg/BackIcon";
import SingleDealBox from "./SingleDealBox.jsx";
import * as XLSX from "xlsx";
import { ErrorMessage } from "./utils/errorMessage.js";
import { isExcelHeaderAreValid } from "./utils/ValidationFunction.js";
import {
  excelHeaderBodyKeys,
  excelHeaderValidationEnum,
} from "./utils/const.js";
import {
  superAdminCommission,
  superAdminCommissionOnFullRefund,
} from "../../../../../utilities/const.js";
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
  const [excelImportError, setExcelImportError] = useState("");
  const [loader, setLoader] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      csvData: [],
    },
    resolver: zodResolver(schema({ isExchangeDeal })),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "csvData",
  });

  const submitHandler = catchAsync(async (data) => {
    setLoader(true);
    const res = await BULK_ADD_DEAL(
      data?.csvData?.map((item, index) => ({
        dealCategory: data.dealCategory.value,
        platForm: data.platForm.value,
        brand: data.brand.value,
        ...item,
        slotAlloted: +item.slotAlloted,
        isCommissionDeal: item?.commissionValue ? true : false,
        isExchangeDeal,
      }))
    );
    checkResponse({
      res,
      navigate,
      showSuccess: true,
      navigateUrl: "/myDealsAsAgency",
      setLoader,
    });
  }, setLoader);

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
      setData: (data) =>
        setDealCategoryOptions((p) =>
          data?.map((item) => ({
            label: item.name,
            value: item._id,
            isExchangeDeal: item?.isExchangeDeal,
          }))
        ),
    });
  });

  useEffect(() => {
    getData();
  }, []);

  const csvImportHandler = (e) => {
    let file = e.target.files[0];

    e.target.value = "";

    if (!file) return;

    setExcelImportError((p) => "");

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Use {header: 1} for raw rows

      const headerArr = jsonData && jsonData[0];

      if (!headerArr && !headerArr?.length) {
        // validating the headers info are complete or not
        setExcelImportError((p) => ErrorMessage.inCompleteHeader);
        return errorToast({
          message: ErrorMessage.inCompleteHeader,
        });
      }

      if (!isExcelHeaderAreValid(jsonData && jsonData[0])) {
        // validating the header spelling;
        setExcelImportError((p) => ErrorMessage.inValidHeader);
        return;
      }

      // removing extra empty data
      jsonData = jsonData?.filter((item) => {
        if (item?.length > 1) {
          return true;
        }
        return false;
      });

      console.log(jsonData, "json data"); // Now you have your data

      let finalData = [];

      for (let i = 0; i < jsonData?.length; i++) {
        if (i === 0) continue; // escape the first row ,  that is header

        const row = jsonData[i];

        const singleRow = {};

        for (let k = 0; k < excelHeaderValidationEnum?.length; k++) {
          if (k === 0) continue; // escape the first col ,  that is SR.NO we don't need this

          const singleRowKeyName =
            excelHeaderBodyKeys[excelHeaderValidationEnum[k]];

          if (
            !row[k] &&
            row[k] !== 0 &&
            ![
              "commissionValue",
              "lessAmount",
              "lessAmountToSubAdmin",
              "commissionValueToSubAdmin",
            ].includes(singleRowKeyName) // this values can be empty conditionally ,  we will validate below
          ) {
            // validation to sure every column has value
            errorToast({
              message: ErrorMessage.columnShouldNotBeEmpty,
            });
            setExcelImportError(
              (p) => "Sr no." + i + " " + ErrorMessage.columnShouldNotBeEmpty
            );
            return;
          }

          if (["showToUsers", "showToSubAdmins"].includes(singleRowKeyName)) {
            // add the boolean value to this keys
            singleRow[singleRowKeyName] = row[k] === "Yes";
          } else {
            singleRow[excelHeaderBodyKeys[excelHeaderValidationEnum[k]]] =
              String(row[k] || "")?.trim();
          }
        }

        console.log(singleRow, "single row");
        // ==== start =====
        // validation for the below keys
        // ===>  "commissionValue", ===>  "lessAmount", "lessAmountToSubAdmin", "commissionValueToSubAdmin",
        // ==== start =====
        if (!singleRow.lessAmount && !singleRow.commissionValue) {
          errorToast({
            message: ErrorMessage.pleaseEnterEitherLessOrCommission,
          });
          setExcelImportError(
            (p) =>
              "Sr no." +
              i +
              " " +
              ErrorMessage.pleaseEnterEitherLessOrCommission
          );
          return;
        }

        if (singleRow.lessAmount && singleRow.commissionValue) {
          errorToast({
            message: ErrorMessage.enterOnlyOneLessOrCommission,
          });
          setExcelImportError(
            (p) =>
              "Sr no." + i + " " + ErrorMessage.enterOnlyOneLessOrCommission
          );
          return;
        }

        if (
          singleRow.showToSubAdmins &&
          singleRow.lessAmount &&
          !singleRow.lessAmountToSubAdmin
        ) {
          errorToast({
            message: ErrorMessage.pleaseFillTheLessAmountToMediator,
          });
          setExcelImportError(
            (p) =>
              "Sr no." +
              i +
              " " +
              ErrorMessage.pleaseFillTheLessAmountToMediator
          );
          return;
        }
        if (
          singleRow.showToSubAdmins &&
          singleRow.commissionValue &&
          !singleRow.commissionValueToSubAdmin
        ) {
          errorToast({
            message: ErrorMessage.pleaseFillTheCommissionAmountToMediator,
          });
          setExcelImportError(
            (p) =>
              "Sr no." +
              i +
              " " +
              ErrorMessage.pleaseFillTheCommissionAmountToMediator
          );
          return;
        }
        // ==== end =====
        // validation for the below keys
        // ===>  "commissionValue", ===>  "lessAmount", "lessAmountToSubAdmin", "commissionValueToSubAdmin",
        // ==== end =====

        //////////////////////

        /// setting the AdminCommission and finalCashbackToUser
        const actualPrice = singleRow.actualPrice;
        const lessAmount = singleRow.lessAmount;
        const commissionValue = singleRow.commissionValue;

        if (actualPrice && (lessAmount === "0" || commissionValue === "0")) {
          // if less amount and commission is 0 then admin commission will be
          // the ${superAdminCommissionOnFullRefund} % on the actual price
          const adminCommission = Math.ceil(
            (superAdminCommissionOnFullRefund * actualPrice) / 100
          );
          singleRow.adminCommission = String(adminCommission);
          singleRow.finalCashBackForUser = String(
            Number(actualPrice) - Number(adminCommission)
          );
        } else if (actualPrice && (lessAmount || commissionValue)) {
          // if less amount and commission is not 0 then admin commission will be
          // the ${superAdminCommission} % on the (less || commission) price
          const adminCommission = Math.ceil(
            (superAdminCommission * (lessAmount || commissionValue)) / 100
          );

          singleRow.adminCommission = String(adminCommission);
          if (commissionValue) {
            singleRow.finalCashBackForUser = String(
              Number(actualPrice) +
                Number(commissionValue) -
                Number(adminCommission)
            );
          } else {
            singleRow.finalCashBackForUser = String(
              Number(actualPrice) - Number(lessAmount) - Number(adminCommission)
            );
          }
        }

        /////////////////////

        singleRow.isCommissionDeal = Boolean(singleRow?.commissionValue); // set is deal is commission or not
        singleRow.exchangeDealProducts = []; // the user will enter the exchange Products if deal is exchange deal
        finalData.push(singleRow);
      }
      console.log(finalData, "final data");

      /// convert some numeric values into string as html dom will  works in strings
      finalData = finalData.map((item) => ({
        ...item,
        actualPrice: String(item?.actualPrice),
        slotAlloted: String(item?.slotAlloted),
        lessAmount: String(item?.lessAmount),
        lessAmountToSubAdmin: String(item?.lessAmountToSubAdmin),
        commissionValueToSubAdmin: String(item?.commissionValueToSubAdmin),
        commissionValue: String(item?.commissionValue),
        refundDays: String(item?.refundDays),
      }));

      setValue("csvData", finalData, { shouldValidate: true });
    };

    reader.readAsArrayBuffer(file);
  };

  const appendField = () => {
    prepend({
      productName: "",
      uniqueIdentifier: "",
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
                    Import sheet
                    <input
                      type="file"
                      className="file position-absolute h-100 w-100"
                      placeholder=""
                      onChange={csvImportHandler}
                      accept=".xlsx"
                    />
                  </Button>
                </div>
              </div>
            </Col>
            {excelImportError && (
              <Col lg="12">
                <p className="text-danger">{excelImportError}</p>
              </Col>
            )}

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
                            isExchangeDeal={isExchangeDeal}
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
                          disabled={loader}
                        >
                          {loader ? "loading..." : "Submit"}
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
