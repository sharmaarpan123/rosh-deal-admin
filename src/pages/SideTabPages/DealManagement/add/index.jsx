import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

//img
import { useNavigate } from "react-router-dom";

// css

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  ADD_DEAL,
  BRAND_LIST,
  DEAL_CATEGORY_LIST,
  EDIT_DEAL,
  GET_DEAL_VIEW,
  PLATFORM_LIST,
  SCRAPPER_IMAGE,
} from "../../../../services/ApiCalls";
import {
  catchAsync,
  checkResponse,
  textAreaAdjust,
} from "../../../../utilities/utilities";
import TagsInput from "./TagsInput";
import fileUploader from "../../../../utilities/fileUploader";
import noImg from "../../../../Assets/images/no-img.png";

const makeOptions = (data, extraKey, extraKeyValueKey) => {
  return data?.map((item) => ({
    label: item.name,
    value: item._id,
    [extraKey]: item[extraKeyValueKey],
  }));
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

const schema = z
  .object({
    productName: z
      .string({ required_error: "This is Required" })
      .min(1, { message: "Name is required" }),
    brand: objectIdSchema("brand"),
    platForm: objectIdSchema("Plat form"),
    dealCategory: objectIdSchema("Deal Category"),
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
      .string({ required_error: "Less Amount is required" })
      .refine((data) => !isNaN(data), {
        message: "Less Amount must be numeric",
        paths: ["lessAmount"],
      })
      .optional(),
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
    commissionValue: z
      .string({
        invalid_type_error: "Invalid Commision Amount",
        required_error: "Commision Amount is required",
      })
      .optional(),
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
    isExchangeDeal: z.boolean().optional(),
    isCommissionDeal: z.boolean(),
  })
  .refine(
    (data) => {
      if (
        data?.isExchangeDeal &&
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
  );

const getAdminCommission = (actualPrice, lessAmount, adminPercentage = 5) => {
  return ((actualPrice - lessAmount) * adminPercentage) / 100;
};
const AddEditDeal = () => {
  const navigate = useNavigate();
  const [brandOptions, setBrandOptions] = useState([]);
  const [dealCategoryOptions, setDealCategoryOptions] = useState([]);
  const [platFormOptions, setPlatFormOptions] = useState([]);
  const [data, setData] = useState();
  const { id } = useParams();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    values: {
      productName: data?.productName || "",
      uniqueIdentifier: data?.uniqueIdentifier || "",
      brand: data?.brand || "",
      platForm: data?.platForm || "",
      dealCategory: data?.dealCategory || "",
      productCategories: data?.productCategories || [],
      postUrl: data?.postUrl || "",
      actualPrice: data?.actualPrice || "",
      lessAmount: data?.lessAmount || "",
      finalCashBackForUser: data?.finalCashBackForUser
        ? data?.finalCashBackForUser
        : "",
      isCommissionDeal: data?.isCommissionDeal || false,
      commissionValue: data?.commissionValue ? data?.commissionValue : "",
      refundDays: data?.refundDays || "",
      slotAlloted: data?.slotAlloted ? String(data?.slotAlloted) : "",
      termsAndCondition: data?.termsAndCondition || "",
      adminCommission: data?.adminCommission || "",
      imageUrl: data?.imageUrl,
      isExchangeDeal: data?.dealCategory?.isExchangeDeal ? true : false,
      exchangeDealProducts: data?.exchangeDealProducts
        ? data?.exchangeDealProducts
        : [],
    },
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const imageChangeHandler = catchAsync(async (e) => {
    const url = await fileUploader(e.target.files[0]);

    if (!url) {
      return;
    }
    setValue("imageUrl", url, { shouldValidate: true });
  });

  const submitHandler = catchAsync(async (data) => {
    let res;

    if (id) {
      res = await EDIT_DEAL({
        ...data,
        dealId: id,
        dealCategory: data.dealCategory.value,
        platForm: data.platForm.value,
        brand: data.brand.value,
        slotAlloted: +data.slotAlloted,
        refundDays: +data.refundDays,
        lessAmount: data?.lessAmount || "",
        isCommissionDeal: data?.commissionValue ? true : false,
      });
    } else {
      res = await ADD_DEAL({
        ...data,
        dealCategory: data.dealCategory.value,
        platForm: data.platForm.value,
        brand: data.brand.value,
        slotAlloted: +data.slotAlloted,
        refundDays: +data.refundDays,
        lessAmount: data?.lessAmount || "",
        isCommissionDeal: data?.commissionValue ? true : false,
      });
    }
    checkResponse({
      res,
      showSuccess: true,
      navigate: navigate,
      navigateUrl: "/deal",
    });
  });

  const getData = catchAsync(async () => {
    const apis = [BRAND_LIST(), PLATFORM_LIST(), DEAL_CATEGORY_LIST()];

    if (id) {
      apis.push(GET_DEAL_VIEW(id));
    }
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
          makeOptions(data, "isExchangeDeal", "isExchangeDeal")
        ),
    });
    checkResponse({
      res: res[3],
      setData: (data) => {
        setData((p) => ({
          ...data,
          brand: {
            label: data?.brand?.name || "",
            value: data?.brand?._id || "",
          },
          platForm: {
            label: data?.platForm?.name || "",
            value: data?.platForm?._id || "",
          },
          dealCategory: {
            label: data?.dealCategory?.name || "",
            value: data?.dealCategory?._id || "",
            isExchangeDeal: data?.dealCategory?.isExchangeDeal || false,
          },
        }));
      },
    });
  });

  useEffect(() => {
    getData();
  }, []);

  const superAdminCommission = 10; // percentage;

  useEffect(() => {
    const actualPrice = watch("actualPrice");
    const lessAmount = watch("lessAmount");
    const commissionValue = watch("commissionValue");
    if (actualPrice && (lessAmount || commissionValue)) {
      const adminCommission =
        (superAdminCommission * (lessAmount || commissionValue)) / 100;

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
      <section className="subadmin position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
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
            </Col>
            <Col lg="12" className="my-2">
              <div
                className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                style={{ background: "#EEEEEE" }}
              >
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <Row className="d-flex justify-content-center">
                    {/* Category Platform Brand View */}
                    <>
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
                                  onChange={(value) => {
                                    if (value?.isExchangeDeal) {
                                      setValue("isExchangeDeal", true, {
                                        shouldValidate: true,
                                      });
                                    } else {
                                      setValue("isExchangeDeal", false, {
                                        shouldValidate: true,
                                      });
                                    }
                                    field.onChange(value);
                                  }}
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
                              return (
                                <Select {...field} options={brandOptions} />
                              );
                            }}
                          />
                          {errors?.brand && (
                            <p className="text-danger m-0">
                              {errors.brand.message}
                            </p>
                          )}
                        </div>
                      </Col>
                    </>
                    {/* Product Name , Slug , Product Categories View */}
                    <>
                      <Col lg="4" md="6" className="my-2">
                        <div className="py-2">
                          <label
                            htmlFor=""
                            className="form-label fw-sbold text-muted ps-2 m-0"
                          >
                            Product Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter name of product"
                            className="form-control"
                            {...register("productName")}
                          />
                          {errors?.productName && (
                            <p className="text-danger m-0">
                              {errors.productName.message}
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
                            Unique Value(Add deal month)
                          </label>
                          <input
                            type="text"
                            placeholder="Boat-Watch-Dec"
                            className="form-control"
                            {...register("uniqueIdentifier")}
                          />
                          {errors?.uniqueIdentifier && (
                            <p className="text-danger m-0">
                              {errors.uniqueIdentifier.message}
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
                            Product Categories
                          </label>
                          <TagsInput
                            setValue={setValue}
                            watch={watch}
                            fieldName={"productCategories"}
                          />
                          {errors?.productCategories && (
                            <p className="text-danger m-0">
                              {errors.productCategories.message}
                            </p>
                          )}
                        </div>
                      </Col>
                    </>
                    {/* Slow Alloted, Product Link, Refund Days */}
                    <>
                      <Col lg="4" md="6" className="my-2 h-100 ">
                        <div className="py-2">
                          <label
                            htmlFor=""
                            className="form-label fw-sbold text-muted ps-2 m-0"
                          >
                            Total Slots Available
                          </label>
                          <input
                            type="text"
                            placeholder="Add total number of slots available"
                            className="form-control"
                            {...register("slotAlloted")}
                          />
                          {errors?.slotAlloted && (
                            <p className="text-danger m-0">
                              {errors.slotAlloted.message}
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
                            Product Link
                          </label>
                          <input
                            type="text"
                            placeholder="Add product link"
                            className="form-control"
                            {...register("postUrl")}
                          />
                          {errors?.postUrl && (
                            <p className="text-danger m-0">
                              {errors.postUrl.message}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col lg="4" md="6" className="my-2 h-100 ">
                        <div className="py-2">
                          <label
                            htmlFor=""
                            className="form-label fw-sbold text-muted ps-2 m-0"
                          >
                            Refund Days
                          </label>
                          <input
                            type="text"
                            placeholder="No of days after user get refund"
                            className="form-control"
                            {...register("refundDays")}
                          />
                          {errors?.refundDays && (
                            <p className="text-danger m-0">
                              {errors.refundDays.message}
                            </p>
                          )}
                        </div>
                      </Col>
                    </>
                    <Col md="12">
                      <Row>
                        <Col lg="4" md="6" className="my-2">
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Actual Price
                            </label>
                            <Controller
                              control={control}
                              name="actualPrice"
                              render={({ field }) => {
                                return (
                                  <input
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Enter the actual price of product"
                                    className="form-control"
                                  />
                                );
                              }}
                            />
                            {errors?.actualPrice && (
                              <p className="text-danger m-0">
                                {errors.actualPrice.message}
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
                                      if (
                                        e.target.value &&
                                        getValues("actualPrice")
                                      ) {
                                        setValue(
                                          "adminCommission",
                                          getAdminCommission(
                                            getValues("actualPrice"),
                                            e.target.value,
                                            superAdminCommission
                                          ),
                                          { shouldValidate: true }
                                        );
                                      } else {
                                        setValue("adminCommission", 0, {
                                          shouldValidate: true,
                                        });
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
                        {/* Commsion View */}
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
                                          "You cannot add both less and commission value "
                                        );
                                        return;
                                      }
                                      if (
                                        e.target.value &&
                                        getValues("actualPrice")
                                      ) {
                                        setValue(
                                          "adminCommission",
                                          getAdminCommission(
                                            getValues("actualPrice"),
                                            e.target.value,
                                            superAdminCommission
                                          ),
                                          { shouldValidate: true }
                                        );
                                      } else {
                                        setValue("adminCommission", 0, {
                                          shouldValidate: true,
                                        });
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
                        {watch("isExchangeDeal") && (
                          <Col lg="4" md="6" className="my-2">
                            <div className="py-2">
                              <label
                                htmlFor=""
                                className="form-label fw-sbold text-muted ps-2 m-0"
                              >
                                Exchange Deal Products
                              </label>
                              <TagsInput
                                setValue={setValue}
                                watch={watch}
                                fieldName={"exchangeDealProducts"}
                              />
                              {errors?.exchangeDealProducts && (
                                <p className="text-danger m-0">
                                  {errors.exchangeDealProducts.message}
                                </p>
                              )}
                            </div>
                          </Col>
                        )}
                        <Row lg="4" md="6" className="my-2">
                          <Col>
                            <div
                              className="position-relative upload text-center"
                              style={{ maxWidth: "max-content" }}
                            >
                              <label
                                htmlFor=""
                                className="form-label fw-sbold text-muted ps-2 m-0"
                              >
                                Product Image
                              </label>
                              <input
                                type="file"
                                className="file position-absolute h-100 w-100 "
                                onChange={imageChangeHandler}
                              />
                              <div className="imgWrp position-relative">
                                <span className="icn position-absolute">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                  >
                                    <circle
                                      cx="13.2007"
                                      cy="12.9282"
                                      r="12.3872"
                                      fill="#3366FF"
                                    />
                                    <path
                                      d="M9.68021 16.69C9.79021 16.69 9.81221 16.679 9.91121 16.657L11.8912 16.261C12.1002 16.206 12.3092 16.107 12.4742 15.942L17.2702 11.146C18.0072 10.409 18.0072 9.14404 17.2702 8.40704L16.8632 7.97804C16.1262 7.24104 14.8502 7.24104 14.1132 7.97804L9.31721 12.785C9.16321 12.939 9.05321 13.159 8.99821 13.368L8.58021 15.37C8.52521 15.744 8.63521 16.107 8.89921 16.371C9.10821 16.58 9.41621 16.69 9.68021 16.69ZM10.0542 13.577L14.8502 8.77004C15.1692 8.45104 15.7522 8.45104 16.0602 8.77004L16.4782 9.18804C16.8522 9.56204 16.8522 10.09 16.4782 10.453L11.6932 15.26L9.65821 15.601L10.0542 13.577ZM17.2262 17.372H9.10821C8.78921 17.372 8.58021 17.581 8.58021 17.9C8.58021 18.219 8.84421 18.428 9.10821 18.428H17.1822C17.5012 18.428 17.7652 18.219 17.7652 17.9C17.7542 17.581 17.4902 17.372 17.2262 17.372Z"
                                      fill="#F2F2F7"
                                      stroke="#F8FAFC"
                                      stroke-width="0.3"
                                    />
                                  </svg>
                                </span>
                                <img
                                  style={{ height: 60, width: 60 }}
                                  src={getValues("imageUrl") || noImg}
                                  alt=""
                                  className="img-fluid rounded-circle object-fit-contain"
                                />
                              </div>
                            </div>
                          </Col>
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
                                Final Refund Value To user
                              </label>

                              <p className="form-label fw-sbold  ps-2 m-0 text-success">
                                {watch("finalCashBackForUser")}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </Row>
                    </Col>
                    <Col md="12" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Terms and condition
                        </label>
                        <textarea
                          type="text"
                          placeholder="Add terms and conditions of the deal"
                          className="d-block w-100 p-2"
                          onKeyUp={textAreaAdjust}
                          {...register("termsAndCondition")}
                        />
                        {errors?.termsAndCondition && (
                          <p className="text-danger m-0">
                            {errors?.termsAndCondition.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col lg="12" className="my-2">
                      <div className="d-flex align-items-center justify-content-center gap-10">
                        <Button className="d-flex align-items-center justify-content-center commonBtn GreyBtn">
                          Cancel
                        </Button>
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn"
                          type="submit"
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

export default AddEditDeal;
