import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

// img
// import i1 from "@/Assets/images/authBg.jpeg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ADD_MODULE,
  GET_MODULE_BY_ID,
  UPDATE_MODULE,
} from "../../../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";

const getSchema = () =>
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
    uniqueSlug: z.string().min(1, { message: "Unique Slug is required" }),
  });

const AddEditModule = () => {
  const { moduleId } = useParams();
  const [Modules, setUserModules] = useState();
  const schema = useMemo(() => getSchema(), []);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    values: {
      name: Modules?.name || "",
      uniqueSlug: Modules?.uniqueSlug || "",
    },
  });

  const submitHandler = catchAsync(async (data) => {
    const body = {
      ...(moduleId && { moduleId }),
      ...data,
    };

    const res = moduleId ? await UPDATE_MODULE(body) : await ADD_MODULE(body);

    const success = checkResponse({ res, showSuccess: true });

    if (success) {
      navigate("/modules");
    }
  });

  const getData = catchAsync(async () => {
    const res = await GET_MODULE_BY_ID(moduleId);
    checkResponse({ res, setData: setUserModules });
  });

  useEffect(() => {
    if (moduleId) getData(moduleId);
  }, [moduleId]);

  return (
    <>
      <section className="editUser position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/modules"
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
                          Unique Slug
                        </label>
                        <input
                          type="text"
                          placeholder="Annette Black"
                          className="form-control"
                          {...register("uniqueSlug")}
                        />
                        {errors?.uniqueSlug && (
                          <p className="text-danger m-0">
                            {errors?.uniqueSlug?.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col lg="12" className="my-2">
                      <div className="d-flex align-items-center justify-content-center gap-10">
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn GreyBtn"
                          type="button"
                          onClick={() => navigate(-1)}
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

export default AddEditModule;
