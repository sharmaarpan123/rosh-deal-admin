import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

// img
// import i1 from "@/Assets/images/authBg.png";
import i1 from "../../../../Assets/images/authBg.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { z } from "zod";
import Loading from "../../../../components/Common/Loading";
import Toggle from "../../../../components/Common/Toggle";
import {
  ADD_SUB_ADMIN,
  GET_ADMIN_BY_ID,
  GET_USER_BY_ID,
  MODULES_LIST,
  UPDATE_SUB_ADMIN,
  UPDATE_USER,
} from "../../../../services/ApiCalls";
import { accountType, activeInActiveArr } from "../../../../utilities/const";
import fileUploader from "../../../../utilities/fileUploader";
import {
  catchAsync,
  checkResponse,
  removeUnderScoreAndCapitalizeFirstLetter,
} from "../../../../utilities/utilities";
import TableLayout from "../../../../components/TableLayout";

const getSchema = (editMode) =>
  z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Invalid email address"),
      password: z.string().optional(),
      phoneNumber: z.string().min(1, { message: "Phone number is required" }),
      isActive: z.boolean({
        message: "This field is required",
        required_error: "This field is required",
        invalid_type_error: "This field is required!",
      }),
      passwordToggle: z.boolean(), // this for the edit mode
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

const AddEditUser = () => {
  const [profileImage, setProfileImage] = useState({});
  const { adminId } = useParams();
  const [userDetails, setUserUserDetails] = useState();
  const [permissions, setPermissions] = useState([]);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const schema = useMemo(() => getSchema(adminId), [adminId]);
  const [showPassWord, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
      isActive: true,
      passwordToggle: false,
    },
    values: {
      isActive: adminId ? userDetails?.isActive : true,
      phoneNumber: userDetails?.phoneNumber
        ? "91" + userDetails?.phoneNumber
        : "",
      email: userDetails?.email || "",
      name: userDetails?.name || "",
      passwordToggle: false,
    },
  });

  const submitHandler = catchAsync(async (data) => {
    const body = {
      ...data,
      ...(adminId && { adminId }),
      phoneNumber: data.phoneNumber.replace("91", ""),
      permissions:
        permissions?.map((item) => ({
          ...item,
          moduleId: item?.moduleId?._id,
        })) || [],
    };

    delete body.passwordToggle;

    const res = adminId ? await UPDATE_SUB_ADMIN(body) : ADD_SUB_ADMIN(body);

    const success = checkResponse({ res, showSuccess: true });

    if (success) {
      navigate("/system-access");
    }
  });

  console.log(errors, "errors");

  const getData = catchAsync(async () => {
    const apiArr = [MODULES_LIST()];

    if (adminId) apiArr.push(GET_ADMIN_BY_ID(adminId));
    const res = await Promise.all(apiArr);

    checkResponse({
      res: res[0],
      setData: (data) => {
        const AlreadyAddedModules =
          res[1]?.data?.data?.permissions?.map((item) => item?.moduleId?._id) ||
          [];

        const permissionsArr = res[1]?.data?.data?.permissions || [];

        data?.forEach((element) => {
          if (!AlreadyAddedModules?.includes(element?._id)) {
            permissionsArr.push({
              moduleId: {
                _id: element?._id,
                name: element?.name,
                uniqueSlug: element?.uniqueSlug,
              },
              allowAccess: false,
              canEdit: false,
              canAdd: false,
              canView: false,
              canViewList: false,
            });
          }
        });

        setPermissions((p) => permissionsArr);
      },
    });

    const success = checkResponse({ res: res[1], setData: setUserUserDetails });
    if (success) setProfileImage(res?.data?.data?.profileImage);
  });

  useEffect(() => {
    getData();
  }, [adminId]);

  const accessChangeHandler = ({ ind, key, isChecked }) => {
    setPermissions((p) => {
      const newArr = [...p];
      newArr[ind][key] = isChecked;
      return newArr;
    });
  };

  console.log("re-render");

  const selectDeSelectAllPermissions = (type) => {
    setPermissions((p) => {
      let isChecked;

      if (type === "selectAll") {
        isChecked = true;
      } else {
        isChecked = false;
      }
      const newArr = p?.map((item) => ({
        ...item,
        allowAccess: isChecked,
        canEdit: isChecked,
        canAdd: isChecked,
        canView: isChecked,
        canViewList: isChecked,
      }));

      return newArr;
    });
  };

  const column = [
    {
      head: "Name",
      accessor: "Name",
      component: (item, key, arr) => (
        <p className="m-0 fw-sbold">{item?.moduleId?.name}</p>
      ),
    },
    {
      head: "Allow Access",
      accessor: "",
      component: (item, ind, arr) => (
        <Toggle
          isChecked={item?.allowAccess}
          onChange={({ target: { checked } }) => {
            accessChangeHandler({
              ind,
              key: "allowAccess",
              isChecked: checked,
            });
          }}
        />
      ),
    },
    {
      head: "Can Edit",
      accessor: "",
      component: (item, ind, arr) => (
        <Toggle
          isChecked={item?.canEdit}
          onChange={({ target: { checked } }) => {
            accessChangeHandler({
              ind,
              key: "canEdit",
              isChecked: checked,
            });
          }}
        />
      ),
    },
    {
      head: "Can Add",
      accessor: "",
      component: (item, ind, arr) => (
        <Toggle
          isChecked={item?.canAdd}
          onChange={({ target: { checked } }) => {
            accessChangeHandler({
              ind,
              key: "canAdd",
              isChecked: checked,
            });
          }}
        />
      ),
    },
    {
      head: "Can View",
      accessor: "",
      component: (item, ind, arr) => (
        <Toggle
          isChecked={item?.canView}
          onChange={({ target: { checked } }) => {
            accessChangeHandler({
              ind,
              key: "canView",
              isChecked: checked,
            });
          }}
        />
      ),
    },
    {
      head: "Can View List",
      accessor: "",
      component: (item, ind, arr) => (
        <Toggle
          isChecked={item?.canViewList}
          onChange={({ target: { checked } }) => {
            accessChangeHandler({
              ind,
              key: "canViewList",
              isChecked: checked,
            });
          }}
        />
      ),
    },
  ];

  return (
    <>
      <section className="editUser position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/manage-user"
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
                  Add New Sub Admin
                </h4>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <div
                className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                style={{ background: "#EEEEEE" }}
              >
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <Row className="justify-content-between">
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
                        {errors?.name && (
                          <p className="text-danger m-0">
                            {errors?.name?.message}
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
                      {adminId && (
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
                      {(!adminId || watch("passwordToggle")) && (
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
                          Phone Number
                        </label>
                        <Controller
                          control={control}
                          name="phoneNumber"
                          render={({ field }) => {
                            return (
                              <PhoneInput
                                {...field}
                                country={"in"}
                                countryCodeEditable={false}
                                disableDropdown={true}
                                onChange={(value, { dialCode }) => {
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

                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Status
                        </label>
                        <div className="iconWithText position-relative">
                          <Toggle
                            isChecked={watch("status")}
                            onChange={(e) =>
                              setValue("status", e.target.checked)
                            }
                          />
                        </div>
                      </div>
                    </Col>

                    <Col className="d-flex justify-content-end gap-10" lg="12">
                      <Button
                        onClick={() =>
                          selectDeSelectAllPermissions("selectAll")
                        }
                      >
                        Select All
                      </Button>

                      <Button
                        onClick={() =>
                          selectDeSelectAllPermissions("deSelectAll")
                        }
                      >
                        DeSelect All
                      </Button>
                    </Col>

                    {!userDetails?.roles?.includes("admin") && (
                      <Col lg="12" className="my-2">
                        <TableLayout data={permissions} column={column} />
                      </Col>
                    )}

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

export default AddEditUser;
