import moment from "moment";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../../../Assets/images/copyIcon.png";
import share from "../../../../Assets/images/share.png";
import TableActions from "../../../../components/Common/TableActions";
import TableLayout from "../../../../components/TableLayout";
import dataHandler from "../../../../hooks/dataHandler";
import { MY_SELLER_DEALS_LIST } from "../../../../services/ApiCalls";
import { activeInactiveOptions } from "../../../../utilities/const";
import {
  capitalizedFirstAlphaBet,
  copyDealClipboard,
  handleShare,
} from "../../../../utilities/utilities";
import DealsAsSellerFilter from "./Components/Filters";
import CustomPagination from "../../../../components/Common/CustomPagination";

const MyDealsAsSeller = () => {
  const {
    setBody,
    body,
    data,
    loader,
    paginationHandler,
    searchHandler,
    total,
    statusChangeHandler,
  } = dataHandler({
    api: MY_SELLER_DEALS_LIST,
    dependencies: ["selectedPlatformFilter", "selectedBrandFilter", "agencyId"],
    extraBody: {
      selectedPlatformFilter: [],
      selectedBrandFilter: [],
      agencyId: "",
    },
  });

  const navigate = useNavigate();

  const column = [
    {
      head: "#",
      accessor: "#",
      component: (item, key) => {
        return <>{body.limit * (body.page - 1) + key + 1}</>;
      },
    },
    {
      head: "Date || Time ",
      accessor: "createdAt",
      component: (item, key, arr) => (
        <>{moment(item.createdAt).format("DD-MM-YYYY  hh:mm:ss A")}</>
      ),
    },
    {
      head: "Name",
      accessor: "productName",
      component: (item, key, arr) => (
        <div style={{ display: "flex", alignItems: "center", minWidth: 200 }}>
          <p className="m-0 themeBlue fw-sbold">
            {capitalizedFirstAlphaBet(item.productName)}
          </p>
        </div>
      ),
    },

    {
      head: "Platform",
      accessor: "platForm",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.platForm?.name)}
        </p>
      ),
    },
    {
      head: "Deal Type",
      accessor: "dealCategory",
      component: (item, key, arr) => (
        <p className="m-0 themeBlue fw-sbold">
          {capitalizedFirstAlphaBet(item?.dealCategory?.name)}
        </p>
      ),
    },
    {
      head: "Price",
      accessor: "actualPrice",
    },
    {
      head: "Slot",
      accessor: "isSlotCompleted",
      component: (item) => (
        <p
          className={`mb-0 ${!item.isSlotCompleted
              ? "bg-danger text-white"
              : "bg-success text-white"
            } d-flex justify-content-start pb-0 rounded px-2 `}
          style={{
            width: "fit-content",
          }}
        >
          {item.isSlotCompleted ? "Completed" : "Ongoing"}
        </p>
      ),
    },
    {
      head: "Status",
      accessor: "",
      component: (item, index) => (
        <p
          className={`mb-0 ${!item.isActive ? "bg-danger text-white" : "bg-success text-white"
            } d-flex justify-content-start pb-0 rounded px-2 `}
          style={{
            width: "fit-content",
          }}
        >
          {item.isActive ? "Active" : "InActive"}
        </p>
      ),
    },
    {
      head: "Total Orders",
      accessor: "slotCompletedCount",
    },
    {
      head: "Action",
      accessor: "Action",
      component: (item) => (
        <div className="d-flex gap-2">
          <TableActions viewLink={`/seller/deal/details/${item._id}`} />
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/seller/orders/${item._id}`)}
          >
            View Orders
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container fluid className="p-4">
      <Row>
        <Col lg="12" className="px-0">
          <div className="tableFilter d-flex flex-column gap-10 mb-1">
            <div className="">
              <DealsAsSellerFilter
                body={body}
                searchHandler={searchHandler}
                setBody={setBody}
                statusFilterOptionArr={activeInactiveOptions}
                ShowPaymentStatus={true}
                ShowSlotStatus={true}
              />
            </div>
          </div>
          <TableLayout
            column={column}
            data={data}
            loader={loader}
            paginationHandler={paginationHandler}
            total={total}
            body={body}
          />
          <CustomPagination
            body={body}
            pageChangeHandler={paginationHandler}
            setBody={setBody}
            total={total}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MyDealsAsSeller;
