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

export const csvImportEnum = {
  customers: {
    title: "Customers",
    sampleUrl: URLS.API_URL + "public/importUser.csv",
    api: (data) => console.log(data, "wating for api"),
  },
};

export const activeInActiveArr = ["active", "inactive"];

export const accountType = ["single", "enterprise"];
