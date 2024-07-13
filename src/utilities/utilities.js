import { toast } from "react-toastify";

export const changePageToOne = (body, setBody) => {
  const newBody = { ...body, page: 1, offset: 0 };
  setBody((p) => newBody);
  return newBody;
};

export const changeBody = (body, setBody, key, value) => {
  const newBody = {
    ...body,
    [key]: value,
  };
  setBody((p) => newBody);
  return newBody;
};

export const capitalizedFirstAlphaBet = (value) => {
  if (!value || typeof value !== "string") return;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const removeUnderScoreAndCapitalizeFirstLetter = (value) => {
  if (!value || typeof value !== "string") return;
  const formattedString = value.replace(/_/g, " ").toLowerCase();

  return capitalizedFirstAlphaBet(formattedString);
};

export const makingOptionsFromArr = (arr) => {
  return arr.map((type) => ({
    label: removeUnderScoreAndCapitalizeFirstLetter(type), // Remove underscores and capitalize first letters
    value: type,
  }));
};

export const makingOptionsFromData = (arr, labelKey, valueKey) => {
  return arr.map((item) => ({
    label: removeUnderScoreAndCapitalizeFirstLetter(item[labelKey]), // Remove underscores and capitalize first letters
    value: item[valueKey],
  }));
};

export const removeUnderScore = (message) => {
  if (!message || typeof message !== "string") {
    toast.dismiss();

    return toast.warning("something went wrong");
  }

  return message.split("_").join(" ");
};

export function createObjectURL(object) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object);
}

export const exportCsvHandler = async (data) => {
  try {
    let res;
    // if (data === "customers") {
    //   res = await EXPORT_CUSTOMER_CSV();
    // }
    // if (data === "builders") {
    //   res = await EXPORT_BUILDER_CSV();
    // }
    // if (data === "properties") {
    //   res = await EXPORT_PROPERTY_CSV();
    // }
    if (res.status === 200) {
      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(res.data);
      hiddenElement.target = "_blank";
      hiddenElement.download = `${data} Report.csv`;
      hiddenElement.click();
    } else {
      toast.error("something went wrong");
    }
  } catch (error) {
    toast.error("something went wrong");
  }
};

export const catchAsync = (fn, setLoader, callBack) => {
  return (...arg) =>
    fn(...arg).catch((error) => {
      toast.dismiss();
      toast.error("something went wrong");
      setLoader && setLoader(false);
      callBack && callBack();
      console.log(error, "error");
    });
};

export const checkResponse = ({
  res,
  setData,
  setTotal,
  showSuccess,
  dataToSet,
  setLoader,
  totalCount,
  navigate,
  navigateUrl,
}) => {
  if (res?.data?.success) {
    setData && setData(dataToSet || res?.data?.data);
    setTotal && setTotal(totalCount || res?.data?.total);
    showSuccess && (toast.dismiss(), toast.success(res?.data?.message));
    setLoader && setLoader(false);
    navigate && navigate(navigateUrl);
    return true;
  } else {
    toast.dismiss();
    toast.error(res?.response?.data?.message);
    setLoader && setLoader(false);
    return false;
  }
};

export function getLast7Days() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dates = [];
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.getDate();
    const month = months[date.getMonth()];
    dates.push(`${day} ${month}`);
  }

  return dates.reverse();
}
