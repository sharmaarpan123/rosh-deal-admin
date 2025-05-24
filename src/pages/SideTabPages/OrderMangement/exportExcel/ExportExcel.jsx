import ExcelJS from "exceljs";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ButtonLoader from "../../../../components/Common/ButtonLoader";
import {
  catchAsync,
  checkResponse,
  errorToast,
  isSuperAdmin,
} from "../../../../utilities/utilities";
import { orderStatusObj } from "../../../../utilities/const";
import moment from "moment/moment";
import { exportedFromComponentEnum, orderColumnEnum } from "../utils/const";
import { useSelector } from "react-redux";

function makeHyperLink(row, cellKey, text, hyperValue) {
  const cell = row.getCell(cellKey);

  cell.value = {
    text,
    hyperlink: hyperValue,
  };
  cell.font = { color: { argb: "FF0000FF" }, underline: true };
}

const ExportExcel = ({
  body,
  api,
  exportedKeys = {},
  showTheSelectBrandValidation = true,
  exportedFromComponent,
}) => {
  const [loader, setLoader] = useState(false);
  const { admin } = useSelector((s) => s.login);
  const handleExport = catchAsync(async () => {
    if (!body?.brandId && showTheSelectBrandValidation) {
      return errorToast({ message: "Please select the brand" });
    }
    setLoader(true);
    let data = [];

    const customizeBody = { ...body };

    delete customizeBody.page;
    delete customizeBody.offset;
    delete customizeBody.limit;

    const res = await api(customizeBody);

    const success = checkResponse({
      res,
      setData: (res) => {
        data = res;
      },
    });

    if (!success) return;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    const noColumnIsSelected = Object.keys(exportedKeys)?.every(
      (item) => !exportedKeys[item]
    );

    const exportedColumnsArr = Object.keys(exportedKeys)
      ?.filter((item) => {
        if (noColumnIsSelected) {
          return true;
        }
        return exportedKeys[item];
      })
      ?.map((item) => orderColumnEnum[item]);

    sheet.columns = [
      { header: "_id", key: "_id", width: 32 },
      ...exportedColumnsArr,
    ];

    data?.map(async (item, index) => {
      const row = sheet.addRow({
        _id: item?._id,
        productName:
          item?.dealId?.parentDealId?.productName || item?.dealId?.productName,
        mediator: item?.dealId?.adminId?.name,
        orderId: item?.orderIdOfPlatForm,
        orderDateTime:
          moment(item?.createdAt).format("DD-MM-YYYY  hh:mm:ss A") || "-",
        brand:
          item?.dealId?.parentDealId?.brand?.name || item?.dealId?.brand?.name,
        platform:
          item?.dealId?.parentDealId?.platForm?.name ||
          item?.dealId?.platForm?.name,
        dealType:
          item?.dealId?.parentDealId?.dealCategory?.name ||
          item?.dealId?.dealCategory?.name,
        productPrice: item?.deliveryFee
          ? `${Number(item?.orderPrice) + Number(item?.deliveryFee)} (Incl. ${item?.deliveryFee} Delivery Fee)`
          : item?.orderPrice,
        link: item?.dealId?.parentDealId?.postUrl || item?.dealId?.postUrl,
        reviewerName: item?.reviewerName,
        sellerFeedback: item?.sellerFeedback,
        orderSs: item.orderScreenShot,
        reviewSs: item.reviewScreenShot,
        reviewLink: item.reviewLink,
        deliveredScreenShot: item?.deliveredScreenShot,
        exchangeDealProducts:
          item?.exchangeDealProducts?.length > 0
            ? item?.exchangeDealProducts?.join(",")
            : "",
        paymentStatus: item?.paymentStatus,
        orderFormStatus: orderStatusObj[item?.orderFormStatus],
        //agency order keys
        ...(exportedFromComponent === exportedFromComponentEnum.agencyOrder && {
          platformFee: Number(item?.dealId?.adminCommission) || "-",
          lessAmount: Number(item?.lessAmount) + Number(item?.adminCommission) || "-",
          commission: Number(item?.commissionValue) -
              Number(item?.dealId?.adminCommission) ||
            "-",
        }),
        // med order as agency
        ...(exportedFromComponent ===
          exportedFromComponentEnum.myMedOrderAsAgency && {
          platformFee: isSuperAdmin(admin)
            ? item?.dealId?.adminCommission
            : item?.dealId?.parentDealId?.adminCommission,
          lessAmount: isSuperAdmin(admin)
            ? Number(item?.lessAmount) + Number(item?.adminCommission)
            : item?.dealId?.parentDealId?.lessAmountToSubAdmin || "-",
          commission: isSuperAdmin(admin)
            ? Number(item?.commissionValue) -
              Number(item?.dealId?.adminCommission)
            : item?.dealId?.parentDealId?.commissionValueToSubAdmin || "-",
        }),
        // mediator order as mediator
        ...(exportedFromComponent ===
          exportedFromComponentEnum.myMedOrderAsMed && {
          platformFee: item?.dealId?.adminCommission,
          lessAmount:
            Number(item?.lessAmount) + Number(item?.adminCommission) || "-",
          commission:
            Number(item?.commissionValue) -
            Number(item?.dealId?.adminCommission) || "-",
        }),
        // seller orders
        ...(exportedFromComponent ===
          exportedFromComponentEnum.sellerOrders && {
          platformFee: "",
          lessAmount: "",
          commission: "-",
        }),
      });

      if (item?.orderScreenShot) {
        makeHyperLink(row, "orderSs", "orderScreenshot", item?.orderScreenShot);
      }
      if (item?.reviewScreenShot) {
        makeHyperLink(
          row,
          "reviewSs",
          "review screen shot",
          item?.reviewScreenShot
        );
      }
      if (item?.sellerFeedback) {
        makeHyperLink(
          row,
          "sellerFeedback",
          "Seller FeedBack",
          item?.reviewScreenShot
        );
      }
      if (item?.deliveredScreenShot) {
        makeHyperLink(
          row,
          "deliveredScreenShot",
          "Delivered Screenshot",
          item?.deliveredScreenShot
        );
      }
      if (
        item?.exchangeDealProducts?.length &&
        Array.isArray(item?.exchangeDealProducts?.length)
      ) {
        const cell = row.getCell("exchangeDealProducts");
        cell.value = {
          text:
            item?.exchangeDealProducts?.map((i) => `${i} ,`)?.join("") || "",
        };
      }
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });

    setLoader(false);
  }, setLoader);

  return (
    <div>
      <h6 className="text-muted mb-1">Export to Excel</h6>
      <Button onClick={handleExport} className="commonBtn">
        {loader ? <ButtonLoader /> : "Download Excel"}
      </Button>
    </div>
  );
};

export default ExportExcel;
