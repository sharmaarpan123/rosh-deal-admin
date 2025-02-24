import ExcelJS from "exceljs";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ButtonLoader from "../../../../components/Common/ButtonLoader";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";

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
      { header: "name", key: "userName", width: 32 },
      { header: "Reviewer Name", key: "reviewerName", width: 32 },
      {
        header: "Less",
        key: "cashbackAmount",
        width: 32,
      },
      {
        header: "Commission",
        key: "Commission",
        width: 32,
      },
      { header: "Product name", key: "productName", width: 32 },
      { header: "Product price", key: "productPrice", width: 32 },
      { header: "Order ss", key: "orderSs", width: 32 },
      { header: "Review ss", key: "reviewSs", width: 32 },
      { header: "Seller feedback ss", key: "sellerFeedback" },
      { header: "Delivered ss", key: "deliveredScreenShot", width: 32 },
      { header: "Exchange Products", key: "deliveredSs", width: 32 },
    ];

    data?.map(async (item, index) => {
      const row = sheet.addRow({
        _id: item?._id,
        userName: item?.userId.name,
        reviewerName: item?.reviewerName,
        cashbackAmount: item?.dealId?.lessAmount,
        Commission: item?.dealId?.commissionValue,
        productName: item?.dealId?.productName,
        productPrice: item?.dealId.actualPrice,
        sellerFeedback: item?.sellerFeedback,
        orderSs: item.orderScreenShot,
        deliveredScreenShot: item?.deliveredScreenShot,
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
      <h6 className="text-muted">Export to Excel</h6>
      <Button onClick={handleExport} className="commonBtn">
        {loader ? <ButtonLoader /> : "Download Excel"}
      </Button>
    </div>
  );
};

export default ExportExcel;
