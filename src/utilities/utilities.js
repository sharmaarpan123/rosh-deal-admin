import { toast } from "react-toastify";
import { ADMIN_ROLE_TYPE_ENUM, POSTER_ENUM } from "./const";

export const activeInActiveArr = ["active", "inactive"];

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

export const activeInActiveOptions = makingOptionsFromArr(activeInActiveArr);

export const posterEnumOptions = makingOptionsFromArr(
  Object.values(POSTER_ENUM)
);

export function createObjectURL(object) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object);
}

export const exportCsvHandler = async (data) => {
  try {
    let res;

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

export const isUrlValid = (data) =>
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi.test(
    data
  );

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
  showError = true,
  fallBackMessage = "",
}) => {
  console.log(res, "res");
  if (res?.data?.success) {
    setData && setData(dataToSet || res?.data?.data);
    setTotal && setTotal(totalCount || res?.data?.total);
    showSuccess && (toast.dismiss(), toast.success(res?.data?.message));
    setLoader && setLoader(false);
    navigate && navigate(navigateUrl);
    return true;
  } else {
    console.log(res, "Res");
    toast.dismiss();
    if (res?.code === "ERR_NETWORK") {
      showError &&
        toast.error(
          fallBackMessage ||
            "Server is taking to long time to respond please try after some time , or Please Try to check your internet connection"
        );
      setLoader && setLoader(false);
      return false;
    }
    showError && toast.error(res?.response?.data?.message || "Network Error!");
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

export function textAreaAdjust(element) {
  console.log(element.target.style);
  element.target.style.height = "1px";
  element.target.style.height = 25 + element.target.scrollHeight + "px";
}

export const isStringOnlyContainSpaces = (str) => /^\s*$/.test(str);

export const makeQueryFromData = (data) => {
  if (!data || typeof data !== "object") {
    return "?";
  }

  let string = "?";

  Object.keys(data)?.forEach((item) => {
    string += item + "=";
    string += data[item] + "&";
  });

  return string;
};

export const handleShare = (productId) => {
  if (!productId) {
    alert("Product ID is missing. Unable to share.");
    return;
  }

  const shareUrl = `${import.meta.env.VITE_APP_API_URL}?product_id=${productId}`;  
  const shareData = {
    title: "Share this deal now",
    text: shareUrl,
  };

  // 👇 Send to React Native WebView if available
  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ event: "share", payload: shareData })
    );
  } 
  // 👇 Otherwise try browser-native share
  else if (navigator.share) {
    navigator
      .share(shareData)
      .then(() => console.log("Successful share"))
      .catch((error) => console.error("Error sharing", error));
  } 
  // 👇 Final fallback
  else {
    alert("Share functionality is not supported on this browser.");
  }
};
export const copyDealClipboard = (productId) => {
  const shareUrl = `${
    import.meta.env.VITE_APP_API_URL
  }?product_id=${productId}`;
  console.log(shareUrl, "url");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.dismiss();
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to copy the link to clipboard. Please try again.");
      });
  } else {
    toast.dismiss();
    toast.warning("Clipboard functionality is not supported on this browser.");
  }
};

export const copyToClipboard = (string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(string)
      .then(() => {
        toast.dismiss();
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to copy the link to clipboard. Please try again.");
      });
  } else {
    toast.dismiss();
    toast.warning("Clipboard functionality is not supported on this browser.");
  }
};

export const isSuperAdmin = (admin) =>
  admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM?.SUPERADMIN);

export const errorToast = ({ message }) => {
  toast.dismiss();
  toast.error(message);
};

export const successToast = ({ message }) => {
  toast.dismiss();
  toast.success(message);
};


