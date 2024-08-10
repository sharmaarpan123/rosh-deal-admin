import React, { useState } from "react";
import ExcelJS from "exceljs";
import { Button } from "react-bootstrap";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import { ORDER_LIST } from "../../../../services/ApiCalls";
import ButtonLoader from "../../../../components/Common/ButtonLoader";

function makeHyperLink(row, cellKey, text, hyperValue) {
  const cell = row.getCell(cellKey);
  console.log(cell);

  cell.value = {
    text,
    hyperlink: hyperValue,
  };
  cell.font = { color: { argb: "FF0000FF" }, underline: true };
}

const ExportExcel = ({ body }) => {
  const [loader, setLoader] = useState(false);
  const handleExport = catchAsync(async () => {
    setLoader(true);
    let data = [];

    const customizeBody = { ...body };

    delete customizeBody.page;
    delete customizeBody.offset;
    delete customizeBody.limit;

    const res = await ORDER_LIST(customizeBody);

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
      { header: "name", key: "userName", width: 32 },
      { header: "Reviewer Name", key: "reviewerName", width: 32 },
      {
        header: "Cashback",
        key: "cashbackAmount",
        width: 32,
      },
      { header: "Product name", key: "productName", width: 32 },
      { header: "Product price", key: "productPrice", width: 32 },
      { header: "Order ss", key: "orderSs", width: 32 },
      { header: "Review ss", key: "reviewSs", width: 32 },
      { header: "Seller feedback ss", key: "sellerFeedbackSs" },
      { header: "Delivered ss", key: "deliveredSs", width: 32 },
    ];

    data?.map(async (item, index) => {
      const rowNumber = index + 1;

      const row = sheet.addRow({
        userName: item?.userId.name,
        reviewerName: item?.reviewerName,
        cashbackAmount: item?.dealId?.cashBack,
        productName: item?.dealId?.productName,
        productPrice: item?.dealId.actualPrice,
        sellerFeedback: item?.sellerFeedback,
        orderSs: item.orderScreenShot,
        reviewSs: item.reviewScreenShot,
        deliveredSs: item?.deliveredScreenShot,
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
      if (item?.deliveredScreenShot) {
        makeHyperLink(
          row,
          "deliveredSs",
          "delivered Screenshot",
          item?.deliveredScreenShot
        );
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
