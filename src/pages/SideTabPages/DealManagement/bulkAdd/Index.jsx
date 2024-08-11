import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

//img
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
// css

import noImg from "../../../../Assets/images/no-img.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { array, z } from "zod";
import {
  ADD_BRAND,
  ADD_DEAL,
  BRAND_BY_ID,
  BRAND_LIST,
  BULK_ADD_DEAL,
  DEAL_CATEGORY_LIST,
  EDIT_DEAL,
  GET_DEAL_VIEW,
  PLATFORM_LIST,
  UPDATE_BRAND,
} from "../../../../services/ApiCalls";
import fileUploader from "../../../../utilities/fileUploader";
import {
  catchAsync,
  checkResponse,
  isStringOnlyContainSpaces,
  textAreaAdjust,
} from "../../../../utilities/utilities";
import Select from "react-select";
import { toast } from "react-toastify";
import styles from "./BulkAdd.module.scss";
import TagsInput from "../add/TagsInput";

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

const schema = z.object({
  brand: objectIdSchema("brand"),
  platForm: objectIdSchema("Plat form"),
  dealCategory: objectIdSchema("Deal Category"),
  csvData: z
    .array(
      z.object(
        {
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
          cashBack: z
            .string({ required_error: "Cashback is required" })
            .min(1, { message: "Cashback is required" })
            .refine((data) => !isNaN(data), {
              message: "cashback must be numeric",
              paths: ["cashBack"],
            }),
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
            .min(1, { message: "Slot Alloted is required" }),
          termsAndCondition: z
            .string({
              required_error: "Terms and condition is required",
            })
            .min(1, { message: "This  is required" }),
        },
        {
          invalid_type_error: "CSv Data is not imported or invalid",
          required_error: "Please add the csv Data",
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
  const { id } = useParams();

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
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, append, remove, prepend, replace } = useFieldArray({
    control,
    name: "csvData",
    shouldUnregister: false,
  });

  const submitHandler = catchAsync(async (data) => {
    const res = await BULK_ADD_DEAL(
      data?.csvData?.map((item, index) => ({
        dealCategory: data.dealCategory.value,
        platForm: data.platForm.value,
        brand: data.brand.value,
        ...item,
        slotAlloted: +item.slotAlloted,
      }))
    );

    checkResponse({
      res,
      showSuccess: true,
      navigate: navigate,
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

  const csvImportHandler = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const data = [];
        result?.data?.forEach((row) => {
          if (Object.keys(row).length > 1) {
            const item = { ...row };
            item.productCategories = item?.productCategories?.split(",") || [];
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
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
  };

  const appendField = () => {
    prepend({
      productName: "",
      productCategories: [],
      postUrl: "",
      actualPrice: "",
      cashBack: "",
      slotAlloted: "",
      termsAndCondition: "",
      adminCommission: "",
    });
  };

  console.log(errors, "errors");

  return (
    <>
      <section className="subadmin position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className=" left d-flex gap-10 align-items-center">
                  <Link
                    to="/deal"
                    className="border d-flex align-items-center p-2 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 10 16"
                      fill="none"
                    >
                      <path
                        d="M8.64707 0.473344C8.55514 0.381188 8.44594 0.308072 8.32572 0.258184C8.20549 0.208296 8.07661 0.182617 7.94644 0.182617C7.81628 0.182617 7.68739 0.208296 7.56717 0.258184C7.44694 0.308072 7.33774 0.381188 7.24582 0.473344L0.667065 7.05209C0.593675 7.12533 0.53545 7.21233 0.495723 7.3081C0.455996 7.40387 0.435547 7.50654 0.435547 7.61022C0.435547 7.7139 0.455996 7.81657 0.495723 7.91234C0.53545 8.00811 0.593675 8.0951 0.667065 8.16834L7.24582 14.7471C7.63373 15.135 8.25915 15.135 8.64707 14.7471C9.03498 14.3592 9.03498 13.7338 8.64707 13.3458L2.9154 7.60626L8.65498 1.86668C9.03498 1.48668 9.03498 0.853344 8.64707 0.473344Z"
                        fill="#1E232C"
                        stroke="#1E232C"
                        strokeWidth="0.2"
                      />
                    </svg>
                  </Link>
                  <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                    {id ? "Edit" : "Add"} Deal
                  </h4>
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
                          Select Plat Form
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
                          <Row
                            className={` ${styles.singleData}`}
                            key={item.id}
                          >
                            <Col lg="12" className="mt-2">
                              <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                                <li className=" d-flex flex-column align-items-center justify-content-center">
                                  <p className="m-0  fw-bold text-center">
                                    Deal Details No.
                                  </p>

                                  <h6 className="m-0 text-muted fw-bold">
                                    {index + 1}
                                  </h6>
                                </li>
                              </ul>
                            </Col>
                            {Object.keys(item)?.map((itm, i) => {
                              if (itm === "id") {
                                return;
                              }
                              return (
                                <Col lg="4" md="6" className="my-2">
                                  <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                                    <li className="py-1 align-items-center gap-10">
                                      <p className="m-0 themeBlue fw-sbold ">
                                        {itm} :
                                      </p>

                                      {itm === "productCategories" ? (
                                        <TagsInput
                                          setValue={setValue}
                                          watch={watch}
                                          fieldName={`csvData.${index}.${itm}`}
                                        />
                                      ) : (
                                        <input
                                          type="text"
                                          className="form-control"
                                          {...register(
                                            `csvData.${index}.${itm}`
                                          )}
                                        />
                                      )}

                                      <p className="mb-0 text-danger">
                                        {errors?.csvData &&
                                          errors?.csvData[index] &&
                                          errors?.csvData[index][itm]?.message}
                                      </p>
                                    </li>
                                  </ul>
                                </Col>
                              );
                            })}

                            <Col className="4 d-flex align-items-end py-4">
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                Delete
                              </Button>
                            </Col>
                          </Row>
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
                        <Button className="d-flex align-items-center justify-content-center commonBtn GreyBtn">
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
