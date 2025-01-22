import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  catchAsync,
  checkResponse,
  textAreaAdjust,
} from "../../../utilities/utilities";
import Select from "react-select";
import {
  orderStatusOptions,
  sendNotificationTypes,
} from "../../../utilities/const";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BRAND_LIST,
  DEALS_LIST,
  SEND_NOTIFICATION,
} from "../../../services/ApiCalls";
import {
  optionalOptionSchema,
  optionsSchema,
} from "../../../utilities/commonZodSchema";

const schema = z
  .object({
    title: z
      .string({ required_error: "title is required" })
      .trim()
      .min(1, { message: "title is required" }),
    body: z
      .string({ required_error: "message is required" })
      .trim()
      .min(1, { message: "message is required" }),
    type: optionsSchema("Notification type"),
    dealId: optionalOptionSchema("Deal"),
    orderStatus: optionalOptionSchema("order status"),
  })
  .refine(
    (data) => {
      if (data?.type?.value === "dealOrderStatus" && !data?.dealId?.value) {
        return false;
      }
      return true;
    },
    {
      message: "please select deal",
      path: ["dealId"],
    }
  )
  .refine(
    (data) => {
      if (
        data?.type?.value === "dealOrderStatus" &&
        !data?.orderStatus?.value
      ) {
        return false;
      }
      return true;
    },
    {
      message: "please select status  ",
      path: ["orderStatus"],
    }
  );

const NotificationManagement = () => {
  const [dealsOptions, setDealsOptions] = useState([]);
  const [brandsOptions, setBransOptions] = useState([]);
  const [allDeals, setDeals] = useState([]);
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
      type: { value: "", label: "" },
      dealId: { value: "", label: "" },
      orderStatus: { value: "", label: "" },
    },
  });

  console.log(errors, "errors");

  const getData = catchAsync(async () => {
    const apiArr = [DEALS_LIST(), BRAND_LIST()];

    const res = await Promise.all(apiArr);

    checkResponse({
      res: res[0],
      setData: (data) => {
        const options = data.map((item) => ({
          label:
            item.productName +
            (item.uniqueIdentifier ? ` - ${item.uniqueIdentifier}` : ""),
          value: item?._id,
          brand: item?.brand?._id,
        }));

        setDealsOptions((p) => options);
        setDeals((p) => options);
      },
    });
    checkResponse({
      res: res[1],
      setData: (data) =>
        setBransOptions((p) =>
          data.map((item) => ({ label: item.name, value: item?._id }))
        ),
    });
  });

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = catchAsync(async (formValues) => {
    const body = {
      title: formValues.title,
      body: formValues.body,
      type: formValues.type.value,
      ...(formValues?.dealId?.value && { dealId: formValues.dealId.value }),
      ...(formValues?.orderStatus?.value && {
        orderStatus: formValues.orderStatus.value,
      }),
    };

    const res = await SEND_NOTIFICATION(body);

    checkResponse({
      res,
      showSuccess: true,
    });
  });

  return (
    <>
      <section className=" py-3 position-relative">
        <Container>
          <Row className="justify-content-center">
        
            <Col lg="9" className="my-2">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="formWrpper px-sm-4 box p-3 pb-5">
                  <Row>
                    <Col md="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label m-0 fw-sbold text-muted ps-2"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white"
                        {...register("title")}
                      />
                      {errors?.title && (
                        <p className="text-danger m-0">
                          {errors?.title?.message}
                        </p>
                      )}
                    </Col>
                    <Col md="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label m-0 fw-sbold text-muted ps-2"
                      >
                        Message
                      </label>

                      <textarea
                        type="text"
                        className="d-block w-100 rounded p-2"
                        onKeyUp={textAreaAdjust}
                        {...register("body")}
                      />
                      {errors?.body && (
                        <p className="text-danger m-0">
                          {errors?.body.message}
                        </p>
                      )}
                    </Col>
                    <Col md="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label m-0 fw-sbold text-muted ps-2"
                      >
                        Type
                      </label>

                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              options={sendNotificationTypes}
                            />
                          );
                        }}
                      />
                      {errors?.type?.message ? (
                        <p className="text-danger m-0">
                          {errors?.type.message}
                        </p>
                      ) : (
                        errors?.type?.label?.message && (
                          <p className="text-danger m-0">
                            {errors?.type?.label?.message}
                          </p>
                        )
                      )}
                    </Col>
                    {watch("type")?.value === "dealOrderStatus" && (
                      <>
                        <Col md="12" className="my-2">
                          <label
                            htmlFor=""
                            className="form-label m-0 fw-sbold text-muted ps-2"
                          >
                            select Brands
                          </label>

                          <Select
                            options={brandsOptions}
                            onChange={(option) => {
                              setDealsOptions((p) => {
                                setValue(
                                  "dealId",
                                  { label: "", value: "" },
                                  { shouldValidate: true }
                                );
                                return allDeals.filter(
                                  (item) => item.brand === option.value
                                );
                              });
                            }}
                          />
                        </Col>
                        <Col md="12" className="my-2">
                          <label
                            htmlFor=""
                            className="form-label m-0 fw-sbold text-muted ps-2"
                          >
                            select deals
                          </label>

                          <Controller
                            name="dealId"
                            control={control}
                            render={({ field }) => {
                              return (
                                <Select {...field} options={dealsOptions} />
                              );
                            }}
                          />
                          {errors?.dealId?.message ? (
                            <p className="text-danger m-0">
                              {errors?.dealId.message}
                            </p>
                          ) : (
                            errors?.dealId?.label?.message && (
                              <p className="text-danger m-0">
                                {errors?.dealId?.label?.message}
                              </p>
                            )
                          )}
                        </Col>
                        <Col md="12" className="my-2">
                          <label
                            htmlFor=""
                            className="form-label m-0 fw-sbold text-muted ps-2"
                          >
                            select order status
                          </label>

                          <Controller
                            name="orderStatus"
                            control={control}
                            render={({ field }) => {
                              return (
                                <Select
                                  {...field}
                                  options={orderStatusOptions}
                                />
                              );
                            }}
                          />
                          {errors?.orderStatus?.message ? (
                            <p className="text-danger m-0">
                              {errors?.orderStatus.message}
                            </p>
                          ) : (
                            errors?.orderStatus?.label?.message && (
                              <p className="text-danger m-0">
                                {errors?.orderStatus?.label?.message}
                              </p>
                            )
                          )}
                        </Col>
                      </>
                    )}

                    <Col lg="12" className="my-2">
                      <div className="btnWrpper mt-3">
                        <Button
                          className="d-inline-flex align-items-center justify-content-center commonBtn px-5"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NotificationManagement;
