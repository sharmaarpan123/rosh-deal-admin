import React from "react";

// img
import moment from "moment";

import TableActions from "../../../components/Common/TableActions";
import TableToggle from "../../../components/Common/TableToggle";
import noImg from "../../../components/Common/noImg";
import { PAYMENT_STATUS_CHANGE } from "../../../services/ApiCalls";
import { orderStatusObj, paymentStatusOptions } from "../../../utilities/const";
import { capitalizedFirstAlphaBet } from "../../../utilities/utilities";

export const getColumn = (
  body,
  statusChangeHandler,
  SetPopUpImage,
  acceptRejectHandler,
  setRejectedModel
) => [
  {
    head: "#",
    accessor: "#",
    component: (item, key) => {
      return <>{body.limit * (body.page - 1) + key + 1}</>;
    },
  },
  {
    head: "Order id",
    accessor: "orderIdOfPlatForm",
  },
  {
    head: "Deal Name",
    accessor: "productName",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold" style={{ minWidth: 200 }}>
        {capitalizedFirstAlphaBet(item?.dealId?.productName)}
        {/* {item?.dealId?.uniqueIdentifier || ""} */}
      </p>
    ),
  },

  {
    head: "Selected Exchange Products",
    accessor: "",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold" style={{ minWidth: 200 }}>
        {item?.exchangeDealProducts?.map((item) => {
          return `${capitalizedFirstAlphaBet(item)} , `;
        })}
        {(item?.exchangeDealProducts?.length === 0 ||
          !item?.exchangeDealProducts?.length) &&
          "-"}
      </p>
    ),
  },
  {
    head: "User Name",
    accessor: "productName",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.userId?.name)}
      </p>
    ),
  },
  {
    head: "Reviewer Name",
    accessor: "reviewerName",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.userId?.name)}
      </p>
    ),
  },
  {
    head: "Brand",
    accessor: "brand",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.brand?.name)}
      </p>
    ),
  },
  {
    head: "Platform",
    accessor: "platForm",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.platForm?.name)}
      </p>
    ),
  },
  {
    head: "Deal Category",
    accessor: "dealCategory",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.dealCategory?.name)}
      </p>
    ),
  },
  {
    head: "Admin Commission",
    accessor: "",
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.adminCommission)}
      </p>
    ),
  },

  {
    head: "Created At",
    accessor: "createdAt",
    component: (item, key, arr) => (
      <>{moment(item.createdAt).format("DD-MM-YYYY , HH:MM:SS")}</>
    ),
  },

  {
    head: "Payment Status",
    accessor: "payment Status",
    component: (item, index) => (
      <TableToggle
        Options={paymentStatusOptions.slice(1)}
        onChange={(e) =>
          statusChangeHandler(
            () =>
              PAYMENT_STATUS_CHANGE({
                orderId: item._id,
                status: e.target.value,
              }),
            index,
            "paymentStatus",
            item.paymentStatus === "paid" ? "pending" : "paid"
          )
        }
        style={{
          color: item.paymentStatus === "pending" ? "red" : "green",
          width: 120,
        }}
        value={item.paymentStatus}
      />
    ),
  },

  {
    head: "order ScreenShot",
    accessor: "image",
    component: (item, key, arr) => (
      <img
        onClick={() => SetPopUpImage(item.orderScreenShot || noImg)}
        src={item.orderScreenShot || noImg}
        style={{ width: 100, height: 80, objectFit: "contain" }}
      />
    ),
  },

  {
    head: "delivered ScreenShot",
    accessor: "image",
    component: (item, key, arr) => (
      <img
        onClick={() => SetPopUpImage(item.deliveredScreenShot || noImg)}
        src={item.deliveredScreenShot || noImg}
        style={{ width: 100, height: 80, objectFit: "contain" }}
      />
    ),
  },
  {
    head: "Review ScreenShot",
    accessor: "image",
    component: (item, key, arr) => (
      <img
        onClick={() => SetPopUpImage(item.reviewScreenShot || noImg)}
        src={item.reviewScreenShot || noImg}
        style={{ width: 100, height: 80, objectFit: "contain" }}
      />
    ),
  },
  {
    head: "Order Status",
    accessor: "orderFormStatus",
    component: (item) => (
      <p
        className={ ` text-nowrap ${
          item.orderFormStatus === "reviewFormSubmitted"
            ? "bg-success "
            : item.orderFormStatus === "accepted"
            ? "bg-primary "
            : item.orderFormStatus === "rejected" ||
              item.orderFormStatus === "reviewFormRejected"
            ? "bg-danger"
            : "bg-warning"
        } d-flex justify-content-start pb-0 rounded px-2 text-white `}
        style={{
          width: "fit-content",
        }}
      >
        {orderStatusObj[item.orderFormStatus]}
      </p>
    ),
  },

  {
    head: "Action",
    accessor: "Action",
    component: (item, ind) => (
      <TableActions
        acceptHandler={
          ["pending"].includes(item?.orderFormStatus) &&
          (() => acceptRejectHandler(item._id, ind, "accepted"))
        }
        rejectHandler={
          ["pending", "accepted"].includes(item?.orderFormStatus) &&
          (() =>
            setRejectedModel({
              show: true,
              dumpId: item?._id,
              ind: ind,
              status: "rejected",
            }))
        }
        reviewAcceptHandler={
          ["reviewFormSubmitted"].includes(item.orderFormStatus) &&
          (() => acceptRejectHandler(item._id, ind, "reviewFormAccepted"))
        }
        reviewRejectHandler={
          ["reviewFormSubmitted", "reviewFormAccepted"].includes(
            item.orderFormStatus
          ) &&
          (() =>
            setRejectedModel({
              show: true,
              dumpId: item?._id,
              ind: ind,
              status: "reviewFormRejected",
            }))
        }
      />
    ),
  },
];
