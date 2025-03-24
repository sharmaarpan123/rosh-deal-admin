import ExcelJS from "exceljs";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ButtonLoader from "../../../../components/Common/ButtonLoader";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import { orderStatusObj } from "../../../../utilities/const";
import moment from "moment/moment";

function makeHyperLink(row, cellKey, text, hyperValue) {
  const cell = row.getCell(cellKey);

  cell.value = {
    text,
    hyperlink: hyperValue,
  };
  cell.font = { color: { argb: "FF0000FF" }, underline: true };
}

const ExportExcel = ({ body, api }) => {
  const [loader, setLoader] = useState(false);
  const handleExport = catchAsync(async () => {
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

    sheet.columns = [
      // reviewerName
      { header: "_id", key: "_id", width: 32 },
      { header: "Order Date Time", key: "OrderDateTime", width: 32 },
      
      { header: "Product name", key: "productName", width: 32 },
      { header: "Brand name", key: "brand", width: 32 },
      { header: "Platform name", key: "platform", width: 32 },
      { header: "Deal Type", key: "dealType", width: 32 },
      { header: "Product price", key: "productPrice", width: 32 },
      {
        header: "Less",
        key: "lessAmount",
        width: 32,
      },
      {
        header: "Link",
        key: "link",
        width: 32,
      },
      {
        header: "Commission",
        key: "Commission",
        width: 32,
      },
      { header: "Reviewer Name", key: "reviewerName", width: 32 },
      { header: "Order ss", key: "orderSs", width: 32 },
      { header: "Review ss", key: "reviewSs", width: 32 },
      { header: "Seller feedback ss", key: "sellerFeedback" },
      { header: "Delivered ss", key: "deliveredScreenShot", width: 32 },
      { header: "Review Link", key: "reviewLink", width: 32 },
      { header: "Exchange Products", key: "exchangeDealProducts", width: 32 },
      { header: "Payment Status", key: "paymentStatus", width: 32 },
      { header: "Order Status", key: "orderFormStatus", width: 32 },
    ];

    data?.map(async (item, index) => {
      const row = sheet.addRow({
        _id: item?._id,
        productName:
          item?.dealId?.parentDealId?.productName || item?.dealId?.productName,
        OrderDateTime: moment(item?.createdAt).format("DD-MM-YYYY  hh:mm:ss A") || "-",
        brand:
          item?.dealId?.parentDealId?.brand?.name || item?.dealId?.brand?.name,
        platform:
          item?.dealId?.parentDealId?.platForm?.name ||
          item?.dealId?.platForm?.name,
        dealType:
          item?.dealId?.parentDealId?.dealCategory?.name ||
          item?.dealId?.dealCategory?.name,
        productPrice:
          item?.dealId?.parentDealId?.actualPrice || item?.dealId.actualPrice,
        lessAmount:
          item?.dealId?.parentDealId?.lessAmount ||
          item?.dealId?.lessAmount ||
          "-",
        Commission:
          item?.dealId?.parentDealId?.commissionValue ||
          item?.dealId?.commissionValue ||
          "-",
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
