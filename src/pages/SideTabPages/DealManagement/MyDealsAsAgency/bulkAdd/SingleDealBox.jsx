import React, { useEffect } from "react";
import TagsInput from "../add/TagsInput";
import { Button, Col, Row } from "react-bootstrap";
import {
  superAdminCommission,
  superAdminCommissionOnFullRefund,
} from "../../../../../utilities/const";
import styles from "./BulkAdd.module.scss";
import noImg from "../../../../../Assets/images/no-img.png";
import { errorToast } from "../../../../../utilities/utilities";
import { Controller } from "react-hook-form";

const fieldLabelObj = {
  productName: "Product Name",
  uniqueIdentifier: "Unique Identifier",
  productCategories: "Product Categories",
  postUrl: "Post URL",
  actualPrice: "Actual Price",
  lessAmount: "Less Amount",
  lessAmountToSubAdmin: "Less Amount to Mediators",
  commissionValue: "Buyer Commission",
  commissionValueToSubAdmin: "Commission to Mediator",
  finalCashBackForUser: "Final Refund for Buyer",
  adminCommission: "Admin Commission",
  refundDays: "Refund Days",
  showToUsers: "Show to Users",
  showToSubAdmins: "Show to Mediators",
  slotAlloted: "Slot Allotted",
  termsAndCondition: "Terms and Conditions",
  imageUrl: "Image URL",
  isCommissionDeal: "Is Commission Deal",
  exchangeDealProducts: "Exchange Deal Products",
};

const SingleDealBox = ({
  register,
  index,
  item,
  errors,
  setValue,
  watch,
  remove,
  control,
  isExchangeDeal,
}) => {
  console.log(isExchangeDeal, "isExchangeDeal");
  useEffect(() => {
    const actualPrice = watch(`csvData.${index}.actualPrice`);
    const lessAmount = watch(`csvData.${index}.lessAmount`);
    const commissionValue = watch(`csvData.${index}.commissionValue`);

    if (actualPrice && (lessAmount === "0" || commissionValue === "0")) {
      const adminCommission = Math.ceil(
        (superAdminCommissionOnFullRefund * actualPrice) / 100
      );
      setValue(`csvData.${index}.adminCommission`, String(adminCommission), {
        shouldValidate: true,
      });
      setValue(
        `csvData.${index}.finalCashBackForUser`,
        actualPrice - adminCommission,
        {
          shouldValidate: true,
        }
      );
    } else if (actualPrice && (lessAmount || commissionValue)) {
      const adminCommission = Math.ceil(
        (superAdminCommission * (lessAmount || commissionValue)) / 100
      );

      setValue(`csvData.${index}.adminCommission`, String(adminCommission), {
        shouldValidate: true,
      });
      if (commissionValue) {
        setValue(
          `csvData.${index}.finalCashBackForUser`,
          String(
            Number(actualPrice) +
              Number(commissionValue) -
              Number(adminCommission)
          ),
          {
            shouldValidate: true,
          }
        );
      } else {
        setValue(
          `csvData.${index}.finalCashBackForUser`,
          String(
            Number(actualPrice) - Number(lessAmount) - Number(adminCommission)
          ),
          {
            shouldValidate: true,
          }
        );
      }
    } else {
      setValue(`csvData.${index}.adminCommission`, "0", {
        shouldValidate: true,
      });
      setValue(`csvData.${index}.finalCashBackForUser`, "0", {
        shouldValidate: true,
      });
    }
  }, [
    watch(`csvData.${index}.actualPrice`),
    watch(`csvData.${index}.lessAmount`),
    watch(`csvData.${index}.commissionValue`),
  ]);

  return (
    <Row className={` ${styles.singleData}`} key={item.id}>
      <Col lg="12" className="mt-2">
        <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
          <li className=" d-flex flex-column align-items-center justify-content-center">
            <p className="m-0  fw-bold text-center">
              Deal Details No. {index + 1}
            </p>
          </li>
        </ul>
      </Col>
      <Col lg="12" className="mt-2">
        <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
          <li className=" d-flex flex-column align-items-center justify-content-center rounded">
            <img
              src={watch(`csvData.${index}.imageUrl`) || noImg}
              style={{
                width: 100,
                height: 100,
              }}
              className="rounded"
              alt=""
            />
          </li>
        </ul>
      </Col>
      {Object.keys(item)?.map((itm, i) => {
        if (["id", "imageUrl", "isCommissionDeal"].includes(itm)) {
          return;
        }

        if (
          (itm === "lessAmountToSubAdmin" &&
            !watch(`csvData.${index}.showToSubAdmins`)) ||
          (itm === "lessAmountToSubAdmin" &&
            watch(`csvData.${index}.showToSubAdmins`) &&
            !watch(`csvData.${index}.lessAmount`))
        ) {
          return;
        }

        if (
          (itm === "commissionValueToSubAdmin" &&
            !watch(`csvData.${index}.showToSubAdmins`)) ||
          (itm === "commissionValueToSubAdmin" &&
            watch(`csvData.${index}.showToSubAdmins`) &&
            !watch(`csvData.${index}.commissionValue`))
        ) {
          return;
        }

        if (itm === "exchangeDealProducts" && !isExchangeDeal) {
          return;
        }

        if (itm === "exchangeDealProducts" && isExchangeDeal) {
          return (
            <Col lg="4" md="6" className="my-2">
              <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                <li className="py-1 align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold ">
                    {fieldLabelObj[itm]} :
                  </p>

                  <TagsInput
                    setValue={setValue}
                    watch={watch}
                    fieldName={`csvData.${index}.${itm}`}
                  />

                  <p className="mb-0 text-danger">
                    {errors?.csvData &&
                      errors?.csvData[index] &&
                      errors?.csvData[index][itm]?.message}
                  </p>
                </li>
              </ul>
            </Col>
          );
        }

        if (itm === "adminCommission" || itm === "finalCashBackForUser") {
          return (
            <Col lg="4" md="6" className="my-2">
              <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                <li className="py-1 align-items-center gap-10">
                  <p className="m-0 themeBlue fw-sbold ">
                    {" "}
                    {fieldLabelObj[itm]} :
                  </p>
                  <p className="form-label fw-sbold  ps-2 m-0 text-success">
                    {watch(`csvData.${index}.${itm}`)}
                  </p>
                </li>
              </ul>
            </Col>
          );
        }

        return (
          <Col lg="4" md="6" className="my-2">
            <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
              <li className="py-1 align-items-center gap-10">
                <p className="m-0 themeBlue fw-sbold ">
                  {" "}
                  {fieldLabelObj[itm]} :
                </p>

                <Controller
                  control={control}
                  name={`csvData.${index}.${itm}`}
                  render={({ field }) => {
                    return (
                      <input
                        type={
                          ["showToUsers", "showToSubAdmins"].includes(itm)
                            ? "checkbox"
                            : "text"
                        }
                        className={
                          !["showToUsers", "showToSubAdmins"].includes(itm) &&
                          "form-control"
                        }
                        {...field}
                        {...{
                          ...(["showToUsers", "showToSubAdmins"].includes(
                            itm
                          ) && { checked: field.value }),
                        }}
                        {...{
                          ...(["commissionValue", "lessAmount"].includes(
                            itm
                          ) && {
                            onChange: (e) => {
                              if (
                                e?.target?.value[0] === "0" &&
                                e?.target?.value?.length > 1
                              ) {
                                return errorToast({
                                  message: `INVALID ${
                                    itm === "commissionValue"
                                      ? "COMMISSION VALUE"
                                      : "LESS AMOUNT"
                                  }`,
                                });
                              }
                              if (
                                itm === "commissionValue" &&
                                e.target.value &&
                                watch(`csvData.${index}.lessAmount`)
                              ) {
                                return errorToast({
                                  message:
                                    "You cannot add both  less and commission value",
                                });
                              } else if (
                                itm === "lessAmount" &&
                                e.target.value &&
                                watch(`csvData.${index}.commissionValue`)
                              ) {
                                return errorToast({
                                  message:
                                    "You cannot add both  less and commission value",
                                });
                              } else {
                                setValue(
                                  `csvData.${index}.${itm}`,
                                  ["showToUsers", "showToSubAdmins"].includes(
                                    item
                                  )
                                    ? e.target.checked
                                    : e.target.value,
                                  {
                                    shouldValidate: true,
                                  }
                                );
                              }
                            },
                          }),
                        }}
                      />
                    );
                  }}
                />

                <p className="mb-0 text-danger">
                  {errors?.csvData &&
                    errors?.csvData[index] &&
                    errors?.csvData[index][itm]?.message}
                </p>
              </li>
            </ul>
          </Col>
        );
      })}

      <Col className="4 d-flex align-items-end py-4">
        <Button type="button" onClick={() => remove(index)}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};

export default SingleDealBox;
