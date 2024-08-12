import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img

import CustomPagination from "../../../components/Common/CustomPagination";
import ImagePopUp from "../../../components/Modals/ImagePopUp";
import SetReasonModel from "../../../components/Modals/SetReasonModel";
import dataHandler from "../../../hooks/dataHandler";
import {
  ACCEPT_REJECT_ORDER,
  ORDER_LIST
} from "../../../services/ApiCalls";
import {
  defaultDeleteModelState,
  OrderFromStatusOptionArr
} from "../../../utilities/const";
import BulkPaymentStatusChange from "./BulkPaymentStatusChange";
import Filter from "./Filter/Filter";
import { getColumn } from "./column";
import ExportExcel from "./exportExcel/ExportExcel";

const OrderManagement = () => {
  const {
    setBody,
    body,
    data,
    loader,
    deleteModel,
    setDeleteModel,
    paginationHandler,
    searchHandler,
    total,
    refetch,
    statusChangeHandler,
  } = dataHandler({
    api: ORDER_LIST,
    extraBody: {
      brandId: "",
      dealId: [],
    },
    dependencies: ["brandId", "dealId"],
  });
  const [rejectReason, setRejectedReason] = useState("");
  const [rejectedModel, setRejectedModel] = useState({
    ...defaultDeleteModelState,
    status: "",
  });
  const [popUpImage, SetPopUpImage] = useState("");

  const acceptRejectHandler = (_id, ind, status) => {
    statusChangeHandler(
      () => {
        const body = {
          orderId: _id,
          status,
          ...((status === "rejected" || status === "reviewFormRejected") && {
            rejectReason,
          }),
        };

        return ACCEPT_REJECT_ORDER(body);
      },
      ind,
      "orderFormStatus",
      status
    );
    setRejectedModel((p) => ({
      ...defaultDeleteModelState,
      status: "",
    }));
  };

  const column = getColumn(body, statusChangeHandler);

  return (
    <>
      <ImagePopUp SetPopUpImage={SetPopUpImage} popUpImage={popUpImage} />
      <SetReasonModel
        hide={() => setRejectedModel({ show: false, dumpId: "", status: "" })}
        show={rejectedModel.show}
        rejectReason={rejectReason}
        setRejectedReason={setRejectedReason}
        confirmHandler={() =>
          acceptRejectHandler(
            rejectedModel.dumpId,
            rejectedModel.ind,
            rejectedModel.status
          )
        }
      />
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Order Management
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <Filter
                      statusFilterOptionArr={OrderFromStatusOptionArr}
                      body={body}
                      setBody={setBody}
                    />
                  </ul>
                </div>
                <div className="right">
                  <div className="d-flex gap-10">
                    
                  <ExportExcel body={body} />
                  <BulkPaymentStatusChange refetch={refetch} />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <TableLayout column={column} data={data} loader={loader} />
              <CustomPagination
                body={body}
                pageChangeHandler={paginationHandler}
                setBody={setBody}
                total={total}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default OrderManagement;
