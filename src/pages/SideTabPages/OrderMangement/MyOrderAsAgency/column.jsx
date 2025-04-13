import React from "react";

// img
import moment from "moment";

import TableActions from "../../../../components/Common/TableActions";
import TableToggle from "../../../../components/Common/TableToggle";
import noImg from "../../../../components/Common/noImg";
import TableHeaderCheckbox from "../../../../components/Common/TableHeaderCheckbox";
import { PAYMENT_STATUS_CHANGE } from "../../../../services/ApiCalls";
import {
  orderStatusObj,
  paymentStatusOptions,
} from "../../../../utilities/const";
import { capitalizedFirstAlphaBet } from "../../../../utilities/utilities";

export const getColumn = (
  body,
  statusChangeHandler,
  SetPopUpImage,
  acceptRejectHandler,
  setRejectedModel,
  setExportedKeysHandler
) => [
  {
    head: "#",
    accessor: "#",
    component: (item, key) => {
      return <>{body.limit * (body.page - 1) + key + 1}</>;
    },
  },
  {
    head: "Date || Time ",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Date || Time"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("orderDateTime", e.target.checked)
        }
      />
    ),
    accessor: "createdAt",
    component: (item, key, arr) => (
      <>{moment(item.createdAt).format("DD-MM-YYYY  hh:mm:ss A")}</>
    ),
  },
  {
    head: "Status",
    accessor: "orderFormStatus",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Status"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("orderFormStatus", e.target.checked)
        }
      />
    ),
    component: (item) => (
      <p
        className={`mb-0 text-nowrap mb-0 ${
          ["accepted", "reviewFormAccepted"]?.includes(item.orderFormStatus)
            ? "bg-success "
            : ["rejected", "reviewFormRejected"]?.includes(item.orderFormStatus)
            ? "bg-danger "
            : "bg-warning "
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
    head: "Profile Name",
    accessor: "reviewerName",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Profile Name"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("reviewerName", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <p
        className="m-0 themeBlue fw-sbold text-break "
        style={{
          maxWidth: 250,
        }}
      >
        {capitalizedFirstAlphaBet(item?.reviewerName)}
      </p>
    ),
  },
  {
    head: "Brand",
    accessor: "brand",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Brand"
        id={key}
        onChange={(e) => setExportedKeysHandler("brand", e.target.checked)}
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.brand?.name)}
      </p>
    ),
  },
  {
    head: "Platform",
    accessor: "platForm",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Platform"
        id={key}
        onChange={(e) => setExportedKeysHandler("platform", e.target.checked)}
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.platForm?.name)}
      </p>
    ),
  },
  {
    head: "Product Name",
    accessor: "productName",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Product Name"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("productName", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.productName)}
      </p>
    ),
  },
  {
    head: "Product Link",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Product Link"
        id={key}
        onChange={(e) => setExportedKeysHandler("link", e.target.checked)}
      />
    ),
    component: (item, key, arr) =>
      item?.reviewLink && (
        <a target="_blank" href={item?.dealId?.postUrl}>
          Click here
        </a>
      ),
  },
  {
    head: "Order id",
    accessor: "orderIdOfPlatForm",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Order id"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("orderIdOfPlatForm", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <p
        className="m-0 themeBlue fw-sbold  text-break "
        style={{
          maxWidth: 250,
          minWidth: 140,
        }}
      >
        {item?.orderIdOfPlatForm}
      </p>
    ),
  },
  {
    head: "Price",
    accessor: "",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Price"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("productPrice", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">{item?.dealId?.actualPrice}</p>
    ),
  },
  {
    head: "Less",
    accessor: "",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Less"
        id={key}
        onChange={(e) => setExportedKeysHandler("lessAmount", e.target.checked)}
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {item?.dealId?.lessAmount || "-"}
      </p>
    ),
  },
  {
    head: "Commission",
    accessor: "",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Commission"
        id={key}
        onChange={(e) => setExportedKeysHandler("commission", e.target.checked)}
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {item?.dealId?.commissionValue || "-"}
      </p>
    ),
  },
  {
    head: "Exchange Product",
    accessor: "",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Exchange Product"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("exchangeDealProducts", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
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
    head: "Platform Fee",
    accessor: "",
   
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.adminCommission)}
      </p>
    ),
  },

  {
    head: "Deal Category",
    accessor: "dealCategory",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Deal Category"
        id={key}
        onChange={(e) => setExportedKeysHandler("dealType", e.target.checked)}
      />
    ),
    component: (item, key, arr) => (
      <p className="m-0 themeBlue fw-sbold">
        {capitalizedFirstAlphaBet(item?.dealId?.dealCategory?.name)}
      </p>
    ),
  },

  {
    head: "Order SS",
    accessor: "image",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Order SS"
        id={key}
        onChange={(e) => setExportedKeysHandler("orderSs", e.target.checked)}
      />
    ),
    component: (item, key, arr) => (
      <img
        onClick={() => SetPopUpImage(item.orderScreenShot || noImg)}
        src={item.orderScreenShot || noImg}
        style={{ width: 100, height: 80, objectFit: "contain" }}
      />
    ),
  },

  {
    head: "Delivered SS",
    accessor: "image",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Delivered SS"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("deliveredScreenShot", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <img
        onClick={() => SetPopUpImage(item.deliveredScreenShot || noImg)}
        src={item.deliveredScreenShot || noImg}
        style={{ width: 100, height: 80, objectFit: "contain" }}
      />
    ),
  },

  {
    head: "Review/Rating SS",
    accessor: "image",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Review/Rating SS"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("reviewSs", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <img
        onClick={() => SetPopUpImage(item.reviewScreenShot || noImg)}
        src={item.reviewScreenShot || noImg}
        style={{ width: 100, height: 80, objectFit: "contain" }}
      />
    ),
  },

  {
    head: "Seller Feedback SS",
    accessor: "image",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Seller Feedback SS"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("sellerFeedback", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) => (
      <img
        onClick={() => SetPopUpImage(item.sellerFeedback || noImg)}
        src={item.sellerFeedback || noImg}
        style={{ width: 100, height: 80, objectFit: "contain" }}
      />
    ),
  },

  {
    head: "Review Link",
    accessor: "image",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Review Link"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("reviewLink", e.target.checked)
        }
      />
    ),
    component: (item, key, arr) =>
      item?.reviewLink && (
        <a target="_blank" href={item?.reviewLink}>
          Click here
        </a>
      ),
  },



  {
    head: "Payment Status",
    accessor: "payment Status",
    headComponent: (item, key, index) => (
      <TableHeaderCheckbox
        label="Payment Status"
        id={key}
        onChange={(e) =>
          setExportedKeysHandler("paymentStatus", e.target.checked)
        }
      />
    ),
    component: (item, index) => {
      return (
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
      );
    },
  },

  {
    head: "Action",
    accessor: "Action",
    component: (item, ind) => {
      return item?.paymentStatus !== "paid" ? (
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
      ) : (
        <></>
      );
    },
  },
];
