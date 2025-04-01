import URLS from "../services/URLS";

export const paginationLimitArr = [5, 10, 20, 50, 100, 200, 500, 1000, 2000];

export const superAdminCommission = 10;
export const superAdminCommissionOnFullRefund = 2;

export const ADMIN_ROLE_TYPE_ENUM = {
  SUPERADMIN: "superAdmin",
  SUPERSUBADMIN: "superSubAdmin",
  ADMIN: "admin",
  SUBADMIN: "subadmin",
};

export const adminRoleLabel = {
  superAdmin: "Super Admin",
  superSubAdmin: "Sub Admin",
  admin: "Agency",
  subadmin: "Mediator",
};

export const defaultDeleteModelState = {
  show: false,
  dumpId: "",
};
export const defaultStatusModelState = {
  show: false,
  dumpId: "",
  body: {},
};

export const activeInactiveOptions = [
  {
    label: "Active",
    value: "1",
  },
  {
    label: "InActive",
    value: "0",
  },
  {
    label: "All",
    value: "",
  },
];

export const activeInActiveStatusOptions = [
  {
    label: "Active",
    value: "1",
  },
  {
    label: "InActive",
    value: "0",
  },
];

export const OrderFromStatusOptionArr = [
  { label: "All", value: "" },
  { label: "Order Pending", value: "pending" },
  { label: "Order Accepted", value: "accepted" },
  { label: "Order Rejected", value: "rejected" },
  { label: "Review Submitted", value: "reviewFormSubmitted" },
  { label: "Review Rejected", value: "reviewFormRejected" },
  { label: "Review Accepted", value: "reviewFormAccepted" },
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

export const orderStatusObj = {
  pending: "Pending",
  rejected: "Rejected",
  accepted: "Accepted",
  reviewFormSubmitted: "Review Submitted",
  reviewFormRejected: "Review Rejected",
  reviewFormAccepted: "Review Accepted",
};

export const commonSendNotificationTypes = [
  {
    label: "Deal Order Status",
    value: "dealOrderStatus",
  },
  {
    label: "Users",
    value: "users",
  },
];

export const dashboardReportTypeArr = ["yearly", "monthly", "weekly"];

export const orderStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
  { label: "Accepted", value: "accepted" },
  { label: "Review Form Submitted", value: "reviewFormSubmitted" },
  { label: "Review Form Rejected", value: "reviewFormRejected" },
  { label: "Review Form Accepted", value: "reviewFormAccepted" },
];

export const DealByBrandIdApiAccessingAsEnum = {
  dealsAsAgency: "dealsAsAgency",
  medDealsAsAgency: "medDealsAsAgency",
  dealAsMed: "dealAsMed",
};
