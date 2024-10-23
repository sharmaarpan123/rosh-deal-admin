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
  uniqueIdentifier: z
    .string({
      required_error: "unique Identifier is required",
    })
    .min(1, { message: "unique Identifier  is required" }),
  imageUrl: z.string().optional(),
});

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
    defaultValues: {
      productCategories: [],
    },
    values: {
      productName: data?.productName || "",
      uniqueIdentifier: data?.uniqueIdentifier || "",
      brand: data?.brand || "",
      platForm: data?.platForm || "",
      dealCategory: data?.dealCategory || "",
      productCategories: data?.productCategories || [],
      postUrl: data?.postUrl || "",
      actualPrice: data?.actualPrice || "",
      cashBack: data?.cashBack || "",
      slotAlloted: data?.slotAlloted ? String(data?.slotAlloted) : "",
      termsAndCondition: data?.termsAndCondition || "",
      adminCommission: data?.adminCommission || "",
      imageUrl: data?.imageUrl,
    },

    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
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
      });
    } else {
      res = await ADD_DEAL({
        ...data,
        dealCategory: data.dealCategory.value,
        platForm: data.platForm.value,
        brand: data.brand.value,
        slotAlloted: +data.slotAlloted,
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
      setData: (data) => setDealCategoryOptions((p) => makeOptions(data)),
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
          },
        }));
      },
    });
  });

  useEffect(() => {
    getData();
  }, []);

  const scrapeImageHandler = catchAsync(async () => {
    if (!getValues("postUrl")) return toast.error("abe post url to daa!");
    const res = await SCRAPPER_IMAGE(getValues("postUrl"));
    if (res.status === 200) {
      setValue("imageUrl", res.data.image_url, { shouldValidate: true });
    } else {
      toast.error(res.response.data.error);
    }
  });

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
                          placeholder="Annette Black"
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
                          Unique Slug
                        </label>
                        <input
                          type="text"
                          placeholder="Annette Black"
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

                    <Col lg="4" md="6" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Actual Price
                        </label>
                        <input
                          type="text"
                          placeholder="Annette Black"
                          className="form-control"
                          {...register("actualPrice")}
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
                          Admin commission
                        </label>
                        <input
                          type="text"
                          placeholder="Annette Black"
                          className="form-control"
                          {...register("adminCommission")}
                        />
                        {errors?.adminCommission && (
                          <p className="text-danger m-0">
                            {errors.adminCommission.message}
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
                          Cash Back
                        </label>
                        <input
                          type="text"
                          placeholder="Annette Black"
                          className="form-control"
                          {...register("cashBack")}
                        />
                        {errors?.cashBack && (
                          <p className="text-danger m-0">
                            {errors.cashBack.message}
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
                          Slot Allotted
                        </label>
                        <input
                          type="text"
                          placeholder="Annette Black"
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
                      <Button onClick={scrapeImageHandler} type="button">
                        Scrap Image
                      </Button>
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Post url
                        </label>
                        <input
                          type="text"
                          placeholder="Annette Black"
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
                    <Col lg="4" md="6" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Scrap Image View
                        </label>
                        <img
                          src={watch("imageUrl")}
                          style={{ width: 100, height: 100 }}
                        />
                      </div>
                    </Col>

                    <Col md="12" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          terms and condition
                        </label>
                        <textarea
                          type="text"
                          placeholder="Annette Black"
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
