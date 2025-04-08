import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

//img
import { useNavigate } from "react-router-dom";

// css

import noImg from "../../../../Assets/images/no-img.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ADD_BRAND,
  ADD_PLATFORM,
  BRAND_BY_ID,
  PLATFORM_BY_ID,
  UPDATE_BRAND,
  UPDATE_PLATFORM,
} from "../../../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import fileUploader from "../../../../utilities/fileUploader";
import Loading from "../../../../components/Common/Loading";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const AddEditBrand = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [data, setData] = useState();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: data?.name || "",
    },

    resolver: zodResolver(schema),
  });

  const submitHandler = catchAsync(async (data) => {
    let res;
    setLoader(true);
    if (id) {
      res = await UPDATE_BRAND({
        ...data,
        ...(image && { image }),
        brandId: id,
      });
    } else {
      res = await ADD_BRAND({ ...data, ...(image && { image }) });
    }
    checkResponse({
      res,
      showSuccess: true,
      navigate: navigate,
      navigateUrl: "/brand",
      setLoader,
    });
  });

  const imageChangeHandler = catchAsync(async (e) => {
    setImageLoader(true);
    const url = await fileUploader(e.target.files[0]);

    if (!url) {
      setImageLoader(false);

      return;
    }
    setImage(url);
    setImageLoader(false);
  });

  const getData = catchAsync(async () => {
    const res = await BRAND_BY_ID(id);
    const success = checkResponse({ res, setData: setData });
    if (success) setImage(res?.data?.data?.image);
  });

  useEffect(() => {
    if (id) getData();
  }, [id]);

  return (
    <>
      <section className="subadmin position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/brand"
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
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <div
                className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                style={{ background: "#EEEEEE" }}
              >
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <Row className="d-flex justify-content-center">
                    <Col lg="12" className="my-2">
                      <div
                        className="mx-auto position-relative upload text-center rounded-circle"
                        style={{
                          maxWidth: "max-content",
                          border: "3px #005FD9 solid",
                        }}
                      >
                        <input
                          type="file"
                          className="file position-absolute h-100 w-100 "
                          onChange={imageChangeHandler}
                        />
                        <div className="imgWrp position-relative">
                          {!imageLoader && (
                            <span
                              className="icn position-absolute"
                              style={{ right: 0, bottom: 10 }}
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
                          )}

                          {imageLoader ? (
                            <div style={{ height: 50, width: 50 }}>
                              <Loading fullSize={true} />
                            </div>
                          ) : (
                            <img
                              style={{ height: 100, width: 100 }}
                              src={image || noImg}
                              alt=""
                              className="img-fluid rounded-circle object-fit-contain"
                            />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col lg="6" md="12" className="my-2">
                      <div className="py-2">
                        <label
                          htmlFor=""
                          className="form-label fw-sbold text-muted ps-2 m-0"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Brand Name"
                          className="form-control"
                          {...register("name")}
                        />
                        {errors?.name && (
                          <p className="text-danger m-0">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
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
                          type="submit"
                          disabled={loader}
                        >
                          {loader ? "Loading..." : "Submit"}
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

export default AddEditBrand;
