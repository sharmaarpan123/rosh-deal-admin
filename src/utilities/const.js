import URLS from "../services/URLS";
import { makingOptionsFromArr } from "./utilities";

export const paginationLimitArr = [5, 10, 20, 50, 100, 200, 500, 1000];

export const defaultDeleteModelState = {
  show: false,
  dumpId: "",
};

export const activeInactiveOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "InActive",
    value: "inactive",
  },
];

export const OrderFromStatusOptionArr = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "ReviewFormSubmitted", value: "reviewFormSubmitted" },
  { label: "ReviewForm  Rejected", value: "reviewFormRejected" },
  { label: "ReviewFormAccepted", value: "reviewFormAccepted" },
];

export const paymentStatusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

export const slotCompletedStatusOptions = [
  { label: "All", value: "" },
  { label: "Completed", value: "completed" },
  { label: "UnCompleted", value: "uncompleted" },
];

export const csvImportEnum = {
  customers: {
    title: "Customers",
    sampleUrl: URLS.API_URL + "public/importUser.csv",
    api: (data) => console.log(data, "wating for api"),
  },
};

export const activeInActiveArr = ["active", "inactive"];

export const accountType = ["single", "enterprise"];

export const POSTER_ENUM = {
  REDIRECT: "redirect",
  BRAND: "brand",
  DEALCATEGORY: "dealCategory",
  DEAL: "deal",
};


export const orderStatusArr = [
  "pending",
  "rejected",
  "accepted",
  "reviewFormSubmitted",
  "reviewFormRejected",
  "reviewFormAccepted",
];



