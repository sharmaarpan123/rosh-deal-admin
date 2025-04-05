import { errorToast } from "../../../../../../utilities/utilities";
import { excelHeaderValidationEnum } from "./const";

export const isExcelHeaderAreValid = (arr) => {
  if (!Array.isArray(arr)) {
    return;
  }
  for (let i = 0; i < excelHeaderValidationEnum?.length; i++) {
    if (arr[i] !== excelHeaderValidationEnum[i]) {
      errorToast({ message: "In valid excel sheet headers" });
      return false;
    }
  }
  return true;
};
