import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  BRAND_LIST,
  DEALS_LIST,
  My_DEAL_AS_MED,
  SEND_NOTIFICATION,
} from "../../../services/ApiCalls";
import {
  optionalOptionSchema,
  optionsSchema,
} from "../../../utilities/commonZodSchema";
import {
  ADMIN_ROLE_TYPE_ENUM,
  commonSendNotificationTypes,
  orderStatusOptions,
} from "../../../utilities/const";
import {
  catchAsync,
  checkResponse,
  textAreaAdjust,
} from "../../../utilities/utilities";

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
  const [asAgencyOrMediator, setAsAgencyOrMediator] = useState(""); // asAgency // asMediator
  const [sendNotificationTypeOption, setSendNotificationOption] = useState(
    commonSendNotificationTypes
  );
  const [brandIdToFilterDeal, setBrandIdToFilterDeal] = useState("");

  const { admin } = useSelector((s) => s.login);

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

  useEffect(() => {
    if (admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN)) {
      setSendNotificationOption((p) => [
        ...p,
        { label: "For Agency", value: "toAgency" },
        { label: "For Med", value: "toMed" },
      ]);
    }
    if (admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN)) {
      setSendNotificationOption((p) => [
        ...p,
        { label: "For Med", value: "toMed" },
      ]);
    }
  }, [admin]);

  const loadBrandOptions = async (inputValue, callback) => {
    const response = await BRAND_LIST({ search: inputValue });
    if (response) {
      const options = response?.data?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      callback(options);
      if (!!!options.length) {
        setBrandIdToFilterDeal((p) => "");
      }
    } else {
      callback([]);
      setBrandIdToFilterDeal((p) => "");
    }
  };

  const loadDealOptions = async (inputValue, callback) => {
    // validation start
    if (!brandIdToFilterDeal) {
      toast.error("Please select brand to see the deals options!");
      return callback([]);
    }

    if (
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN) &&
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUBADMIN) &&
      !asAgencyOrMediator
    ) {
      toast.error("Please Select The Check Box As Agency or Mediator");
      return callback([]);
    }
    // validation end

    let dealApi = async () => {};

    /// api to call to fetch according to the role
    if (
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN) &&
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUBADMIN) &&
      asAgencyOrMediator === "asMediator"
    ) {
      dealApi = My_DEAL_AS_MED;
    } else if (
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN) &&
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUBADMIN) &&
      asAgencyOrMediator === "asAgency"
    ) {
      dealApi = DEALS_LIST;
    } else if (
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN) ||
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN)
    ) {
      dealApi = DEALS_LIST;
    } else if (admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUBADMIN)) {
      dealApi = My_DEAL_AS_MED;
    } else {
      dealApi = async () => {};
    }
    /// api to call to fetch according to the role

    const response = await dealApi({ search: inputValue });
    const options = response?.data?.data?.map((item) => ({
      value: item._id,
      label: item?.parentDealId?.item.productName || item?.productName,
    }));
    callback(options || []);
  };

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
                              options={sendNotificationTypeOption}
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
                        {admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN) &&
                          admin?.roles?.includes(
                            ADMIN_ROLE_TYPE_ENUM.SUBADMIN
                          ) && ( // only show if panel is accessing by the double role (agency and med)
                            <Col md="12" className="my-2">
                              <div className="d-flex gap-10">
                                <label
                                  htmlFor="asMediator"
                                  className="form-label m-0 fw-sbold text-muted ps-2"
                                >
                                  As Mediator
                                </label>
                                <input
                                  type="checkbox"
                                  id="asMediator"
                                  checked={asAgencyOrMediator === "asMediator"}
                                  value={"asMediator"}
                                  onChange={() => {
                                    setValue(
                                      "dealId",
                                      { label: "", value: "" },
                                      {
                                        shouldValidate: true,
                                      }
                                    );
                                    setAsAgencyOrMediator("asMediator");
                                  }}
                                />
                                <label
                                  htmlFor="asAgency"
                                  className="form-label m-0 fw-sbold text-muted ps-2"
                                >
                                  As Agency
                                </label>
                                <input
                                  type="checkbox"
                                  id="asAgency"
                                  value={"asAgency"}
                                  checked={asAgencyOrMediator === "asAgency"}
                                  onChange={() => {
                                    setValue(
                                      "dealId",
                                      { label: "", value: "" },
                                      {
                                        shouldValidate: true,
                                      }
                                    );
                                    setAsAgencyOrMediator("asAgency");
                                  }}
                                />
                              </div>
                            </Col>
                          )}

                        <Col md="12" className="my-2">
                          <label
                            htmlFor=""
                            className="form-label m-0 fw-sbold text-muted ps-2"
                          >
                            select Brands
                          </label>

                          <AsyncSelect
                            placeholder="Please Type To see the brands"
                            loadOptions={loadBrandOptions}
                            onChange={(option) => {
                              setBrandIdToFilterDeal(option?.value || "");
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
                                <AsyncSelect
                                  placeholder="Please Type To see the Deals"
                                  loadOptions={loadDealOptions}
                                  // onChange={(option) => {}}
                                  {...field}
                                />

                                // <Select {...field} options={dealsOptions} />
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
