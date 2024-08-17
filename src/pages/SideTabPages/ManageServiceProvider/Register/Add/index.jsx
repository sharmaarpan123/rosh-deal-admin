import { useMemo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
// img
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import i1 from "../../../../../Assets/images/authBg.png";
import { accountType, activeInActiveArr } from "../../../../../utilities/const";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// img
// import i1 from "@/Assets/images/authBg.png";

import { toast } from "react-toastify";
import Loading from "../../../../../components/Common/Loading";
import {
  ADD_SERVICE_PROVIDER,
  SERVICE_CATEGORY_LIST,
  SERVICE_PROVIDER_VIEW,
  UPDATE_SERVICE_PROVIDER,
  UPDATE_USER,
} from "../../../../../services/ApiCalls";
import fileUploader from "../../../../../utilities/fileUploader";
import {
  catchAsync,
  checkResponse,
  makingOptionsFromData,
  removeUnderScoreAndCapitalizeFirstLetter,
} from "../../../../../utilities/utilities";
import PhoneInput from "react-phone-input-2";
import Toggle from "../../../../../components/Common/Toggle";

const getSchema = (editMode) =>
  z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Invalid email address"),
      password: z.string().optional(),
      contactNumber: z.string().min(1, { message: "Phone number is required" }),
      countryCode: z.string({ required_error: "CountryCode is Required" }),
      address: z.string().min(1, { message: "Address is required" }),
      status: z.nativeEnum(activeInActiveArr, {
        message: "This field is required",
        required_error: "This field is required",
        invalid_type_error: "This field is required!",
      }),
      accountType: z.string(),
      passwordToggle: z.boolean(), // this for the edit mode,
      serviceType: z
        .array(
          z.object({
            label: z.string({ required_error: "Service type is required" }),
            value: z.string({ required_error: "Service type is required" }),
          })
        )
        .min(1, { message: "Please select at least one service" }),
    })
    .refine(
      (data) => {
        if (!editMode) {
          if (data.password === "") {
            return false;
          }
        }

        if (data.passwordToggle && data.password === "") {
          return false;
        }
        return true;
      },
      { message: "Password is required", path: ["password"] }
    );

const AddNewServiceProvider = () => {
  const [profileImage, setProfileImage] = useState({});
  const { id } = useParams();
  const [userDetails, setUserUserDetails] = useState();
  const [profileImageLoader, setProfileImageLoader] = useState(false);
  const schema = useMemo(() => getSchema(id), [id]);
  const [showPassWord, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "active",
      passwordToggle: false,
    },
    values: {
      status: userDetails
        ? userDetails?.status === "active"
          ? "active"
          : userDetails.status === "approved"
          ? "active"
          : "inactive"
        : "active",
      contactNumber: userDetails?.countryCode + userDetails?.mobileNumber || "",
      accountType: userDetails?.accountType || "",
      email: userDetails?.email || "",
      countryCode: userDetails?.countryCode || "",
      address: userDetails?.address || "",
      name: userDetails?.name || "",
      passwordToggle: false,
      serviceType: [],
    },
  });

  const submitHandler = catchAsync(async (data) => {
    if (!profileImage?.link) {
      return toast.error("Profile image is required");
    }

    const body = {
      ...data,
      ...(id && { _id: id }),
      profileImage: profileImage._id,
      lng: "72.0989",
      lat: "32.908",
      mobileNumber: data.contactNumber.replace(data.countryCode, ""),
      serviceType: data.serviceType.map((item) => item.value),
    };

    delete body.passwordToggle;

    const res = await (id
      ? UPDATE_SERVICE_PROVIDER(body)
      : ADD_SERVICE_PROVIDER(body));

    const success = checkResponse({ res, showSuccess: true });

    if (success) {
      navigate("/service-provider/register");
    }
  });

  const profileImageHandler = catchAsync(async (e) => {
    setProfileImageLoader(true);
    const res = await fileUploader(e.target.files[0]);

    if (!res?._id) {
      setProfileImageLoader(false);
      return;
    }

    setProfileImageLoader(false);

    setProfileImage(res);
  }, setProfileImageLoader);

  const getData = catchAsync(async () => {
    const apis = [SERVICE_CATEGORY_LIST({ page: 1, limit: 1000000000 })];

    if (id) {
      apis.push(SERVICE_PROVIDER_VIEW(id));
    }

    const res = await Promise.all(apis);

    const serviceTypeRes = res[0];
    const userDetailsRes = res[1];

    const serviceCategoryListSuccess = checkResponse({ res: serviceTypeRes });

    if (serviceCategoryListSuccess) {
      setServiceTypeOptions(
        makingOptionsFromData(serviceTypeRes?.data?.data, "catName", "_id")
      );
    }

    const userDetailsSuccess = checkResponse({
      res: userDetailsRes,
      setData: setUserUserDetails,
    });

    if (userDetailsSuccess) {
      setProfileImage(res[1]?.data?.data?.profileImage);
      const selectedServices = serviceTypeRes?.data?.data?.filter((item) => {
        if (userDetailsRes?.data?.data?.serviceType?.includes(item._id))
          return true;
      });

      setValue(
        "serviceType",
        makingOptionsFromData(selectedServices, "catName", "_id")
      );
    }
  });

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <section className="editUser position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/service-provider/register"
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
                      stroke-width="0.2"
                    />
                  </svg>
                </Link>
                <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                  Register Service Providers
                </h4>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <div
                className="formWrpper rounded"
                style={{ background: "#EEEEEE" }}
              >
                <div className="coverImg" style={{ marginBottom: -100 }}>
                  <div className="mx-auto position-relative upload text-center">
                    <input
                      type="file"
                      className="file position-absolute h-100 w-100"
                    />
                    <div className="imgWrp position-relative">
                      <span
                        className="icn position-absolute"
                        style={{ right: 10, top: 10 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
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
                        style={{ height: 140 }}
                        src={i1}
                        alt=""
                        className="img-fluid object-fit-cover w-100 rounded"
                      />
                    </div>
                  </div>
                </div>
                <Col lg="12" className="my-2">
                  <div
                    className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                    style={{ background: "#EEEEEE" }}
                  >
                    <Form onSubmit={handleSubmit(submitHandler)}>
                      <Row className="justify-content-between">
                        <Col lg="12" className="my-2">
                          <div
                            className="mx-auto position-relative upload text-center"
                            style={{ maxWidth: "max-content" }}
                          >
                            <input
                              type="file"
                              className="file position-absolute h-100 w-100"
                              onChange={profileImageHandler}
                            />
                            <div className="imgWrp position-relative">
                              <span
                                className="icn position-absolute"
                                style={{ right: 0, bottom: 20 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
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
                              {profileImageLoader ? (
                                <div
                                  style={{ height: 140, width: 140 }}
                                  className="img-fluid rounded-circle object-fit-cover"
                                >
                                  <Loading fullSize={true} />
                                </div>
                              ) : (
                                <img
                                  style={{ height: 140, width: 140 }}
                                  src={profileImage?.link || i1}
                                  alt=""
                                  className="img-fluid rounded-circle object-fit-cover"
                                />
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col lg="5" md="6" className="my-2">
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              placeholder="Annette Black"
                              className="form-control"
                              {...register("name")}
                            />
                            {errors?.email && (
                              <p className="text-danger m-0">
                                {errors?.email?.message}
                              </p>
                            )}
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              placeholder="jackson.graham@example.com"
                              className="form-control"
                              {...register("email")}
                            />

                            {errors?.email && (
                              <p className="text-danger m-0">
                                {errors?.email?.message}
                              </p>
                            )}
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Phone Number
                            </label>
                            <Controller
                              control={control}
                              name="contactNumber"
                              render={({ field }) => {
                                return (
                                  <PhoneInput
                                    {...field}
                                    onChange={(value, { dialCode }) => {
                                      setValue("countryCode", dialCode);
                                      field.onChange(value);
                                    }}
                                  />
                                );
                              }}
                            />{" "}
                            {errors.countryCode ? (
                              <p className="text-danger m-0">
                                {errors?.countryCode?.message}
                              </p>
                            ) : (
                              errors?.contactNumber && (
                                <p className="text-danger m-0">
                                  {errors?.contactNumber?.message}
                                </p>
                              )
                            )}
                          </div>

                          {id && (
                            <div className="py-2">
                              <label
                                htmlFor=""
                                className="form-label fw-sbold text-muted ps-2 m-0"
                              >
                                Change Password
                              </label>
                              <div className="iconWithText position-relative">
                                <Toggle
                                  isChecked={watch("passwordToggle")}
                                  onChange={(e) =>
                                    setValue("passwordToggle", e.target.checked)
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {(!id || watch("passwordToggle")) && (
                            <div className="py-2">
                              <label
                                htmlFor=""
                                className="form-label fw-sbold text-muted ps-2 m-0"
                              >
                                Password
                              </label>
                              <div className="iconWithText position-relative">
                                <input
                                  type={!showPassWord && "password"}
                                  placeholder="*******************"
                                  className="form-control"
                                  {...register("password")}
                                />
                                {errors?.password && (
                                  <p className="text-danger m-0">
                                    {errors?.password?.message}
                                  </p>
                                )}
                                <Button
                                  variant="transparent"
                                  style={{ right: 10 }}
                                  onClick={() => setShowPassword((p) => !p)}
                                  className="border-0 p-0 position-absolute icn"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="11"
                                    viewBox="0 0 15 11"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.23727 5.82515C9.23727 6.197 9.127 6.5605 8.92041 6.86968C8.71382 7.17886 8.42019 7.41984 8.07664 7.56214C7.7331 7.70444 7.35507 7.74167 6.99037 7.66913C6.62566 7.59658 6.29066 7.41752 6.02772 7.15458C5.76478 6.89164 5.58572 6.55664 5.51318 6.19194C5.44063 5.82723 5.47786 5.4492 5.62016 5.10566C5.76247 4.76211 6.00344 4.46848 6.31263 4.26189C6.62181 4.0553 6.98531 3.94504 7.35716 3.94504C7.85579 3.94504 8.33401 4.14312 8.68659 4.49571C9.03918 4.8483 9.23727 5.32651 9.23727 5.82515ZM14.1694 6.1385C14.0566 6.32651 11.437 10.8388 7.35716 10.8388C3.27732 10.8388 0.657706 6.32651 0.5449 6.1385C0.489895 6.04323 0.460938 5.93515 0.460938 5.82515C0.460937 5.71514 0.489895 5.60706 0.5449 5.51179C0.657706 5.32378 3.27732 0.811523 7.35716 0.811523C11.437 0.811523 14.0566 5.32378 14.1694 5.51179C14.2244 5.60706 14.2534 5.71514 14.2534 5.82515C14.2534 5.93515 14.2244 6.04323 14.1694 6.1385ZM10.4907 5.82515C10.4907 5.20539 10.3069 4.59956 9.96258 4.08426C9.61826 3.56895 9.12888 3.16732 8.5563 2.93016C7.98373 2.69299 7.35368 2.63093 6.74584 2.75184C6.138 2.87275 5.57966 3.17119 5.14143 3.60942C4.7032 4.04765 4.40476 4.60598 4.28385 5.21383C4.16295 5.82167 4.225 6.45171 4.46217 7.02429C4.69934 7.59686 5.10097 8.08625 5.61627 8.43057C6.13157 8.77488 6.73741 8.95866 7.35716 8.95866C8.18822 8.95866 8.98524 8.62852 9.57289 8.04087C10.1605 7.45323 10.4907 6.6562 10.4907 5.82515Z"
                                      fill="#B1B1B1"
                                    />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          )}
                        </Col>
                        <Col lg="5" md="6" className="my-2">
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Account Type
                            </label>
                            <Controller
                              control={control}
                              name="accountType"
                              render={({ field }) => {
                                return (
                                  <Form.Select
                                    {...field}
                                    className="form-control"
                                    aria-label="Default select example"
                                  >
                                    {accountType.map((item) => {
                                      return (
                                        <option value={item}>
                                          {removeUnderScoreAndCapitalizeFirstLetter(
                                            item
                                          )}
                                        </option>
                                      );
                                    })}
                                  </Form.Select>
                                );
                              }}
                            />
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Address
                            </label>
                            <textarea
                              name=""
                              rows={2}
                              id=""
                              className="form-control"
                              {...register("address")}
                            ></textarea>
                            {errors?.address && (
                              <p className="text-danger m-0">
                                {errors?.address?.message}
                              </p>
                            )}
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Service Type
                            </label>
                            <Controller
                              control={control}
                              name="serviceType"
                              render={({ field }) => {
                                return (
                                  <Select
                                    options={serviceTypeOptions}
                                    {...field}
                                    isMulti
                                  />
                                );
                              }}
                            />
                            {errors?.serviceType && (
                              <p className="text-danger m-0">
                                {errors?.serviceType?.message}
                              </p>
                            )}
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor=""
                              className="form-label fw-sbold text-muted ps-2 m-0"
                            >
                              Status
                            </label>
                            <ul className="list-unstyled ps-0 mb-0 d-flex align-items-start gap-10  ps-2 flex-wrap">
                              {activeInActiveArr.map((item) => {
                                return (
                                  <li className="d-flex align-items-center">
                                    <input
                                      type="radio"
                                      id={item}
                                      name="status"
                                      value={item}
                                      className="form-check"
                                      {...register("status")}
                                    />
                                    <label
                                      htmlFor={item}
                                      className="form-label fw-sbold text-muted ps-2 m-0"
                                    >
                                      {removeUnderScoreAndCapitalizeFirstLetter(
                                        item
                                      )}
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                            {errors?.status && (
                              <p className="text-danger m-0">
                                {errors?.status?.message}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col lg="12" className="my-2">
                          <div className="d-flex align-items-center justify-content-center gap-10">
                            <Button
                              className="d-flex align-items-center justify-content-center commonBtn GreyBtn"
                              type="button"
                            >
                              Cancel
                            </Button>
                            <Button
                              className="d-flex align-items-center justify-content-center commonBtn "
                              type="submit"
                              disabled={profileImageLoader}
                            >
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddNewServiceProvider;
