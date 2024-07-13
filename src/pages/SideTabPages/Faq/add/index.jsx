import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddFaq = () => {
  return (
    <>
      <section className="addFaq py-3 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/faq"
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
                  Add Faq
                </h4>
              </div>
            </Col>
            <Col lg="9" className="my-2">
              <Form>
                <div className="formWrpper px-sm-4 box p-3 pb-5">
                  <Row>
                    <Col md="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label m-0 fw-sbold text-muted ps-2"
                      >
                        QUESTIONS
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white"
                        name="question"
                      />
                    </Col>
                    <Col md="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label m-0 fw-sbold text-muted ps-2"
                      >
                        Subject
                      </label>
                      {/* <CKEditor
                        editor={ClassicEditor}
                        data="<p>This is the static content.</p>"
                        onReady={(editor) => {
                          console.log("Editor is ready to use!", editor);
                        }}
                        onBlur={(event, editor) => {
                          console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          console.log("Focus.", editor);
                        }}
                      /> */}
                    </Col>
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

export default AddFaq;
