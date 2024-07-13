import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import {
  ADD_SERVICE_CATEGORY,
  UPDATE_SERVICE_CATEGORY,
  VIEW_SERVICE_CATEGORY,
} from "../../../../services/ApiCalls";

const schema = z.object({
  catName: z.string().min(1, { message: "Name is required" }),
  status: z.boolean(),
});

const AddEditServiceCategory = () => {
  const [serviceData, setServiceData] = useState();
  const { id } = useParams();
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
      status: true,
    },
    values: {
      catName: serviceData?.catName || "",
      status: serviceData ? serviceData?.status === "active" : true,
    },
  });

  const submitHandler = catchAsync(async (data) => {
    const body = {
      ...data,
      status: data.status ? "active" : "inactive",
      ...(id && { _id: id }),
    };

    const res = await (id
      ? UPDATE_SERVICE_CATEGORY(body)
      : ADD_SERVICE_CATEGORY(body));

    const success = checkResponse({ res, showSuccess: true });

    if (success) {
      navigate("/manage-service-category");
    }
  });

  const getData = catchAsync(async () => {
    const res = await VIEW_SERVICE_CATEGORY(id);
    checkResponse({ res, setData: setServiceData });
  });

  useEffect(() => {
    if (id) getData();
  }, [id]);

  return (
    <>
      <section className="serviceCategory py-3.position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/manage-service-category"
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
                  Add New Category
                </h4>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <div
                className="cardCstm px-lg-4 px-3 py-2 rounded mt-3"
                style={{ background: "#eee" }}
              >
                <Form className="py-3" onSubmit={handleSubmit(submitHandler)}>
                  <Row>
                    <Col lg="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label m-0 pb-2 text-muted fw-sbold"
                      >
                        Laundry Service Type
                      </label>
                      <input
                        type="text"
                        placeholder="Business"
                        className="form-control"
                        {...register("catName")}
                      />
                      {errors?.catName && (
                        <p classcatName="text-danger m-0">
                          {errors?.catName?.message}
                        </p>
                      )}
                    </Col>
                    <Col lg="12" className="my-2">
                      <div className="d-inline-flex align-items-center gap-10">
                        <label
                          htmlFor=""
                          className="form-label m-0 text-muted fw-sbold"
                        >
                          Status
                        </label>

                        <Form.Check
                          type="switch"
                          {...register("status")}
                          id="custom-switch"
                        />
                      </div>
                    </Col>
                    <Col lg="12" className="my-2">
                      <div className="d-flex align-items-center justify-content-center gap-10">
                        <Button className="d-flex align-items-center justify-content-center commonBtn GreyBtn">
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

export default AddEditServiceCategory;
