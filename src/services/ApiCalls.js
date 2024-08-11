import Axios from "./Axios";
import API_URL from "./URLS";

export const LOGIN_ADMIN = (data) => Axios.post(API_URL.LOGIN_ADMIN, data);
export const FORGET_PASSWORD_ADMIN = (data) =>
  Axios.post(API_URL.FORGET_PASSWORD_ADMIN, data);
export const OTP_VERIFY = (data) => Axios.post(API_URL.OTP_VERIFY, data);
export const RESET_PASSWORD = (data) =>
  Axios.post(API_URL.RESET_PASSWORD, data);
export const CHANGE_PASSWORD = (data) =>
  Axios.post(API_URL.CHANGE_PASSWORD, data);
// upload file
export const UPLOAD_FILE = (data) => Axios.post(API_URL.UPLOAD_FILE, data);

// PLATFORM

export const ADD_PLATFORM = (data) => Axios.post(API_URL.ADD_PLATFORM, data);
export const PLATFORM_LIST = (data) => Axios.get(API_URL.PLATFORM_LIST, data);
export const PLATFORM_BY_ID = (data) =>
  Axios.get(API_URL.PLATFORM_BY_ID + data);
export const UPDATE_PLATFORM = (data) =>
  Axios.post(API_URL.UPDATE_PLATFORM, data);
export const DELETE_PLATFORM = (data) =>
  Axios.post(API_URL.DELETE_PLATFORM, data);

// DEAL CATEGORY
export const ADD_DEAL_CATEGORY = (data) =>
  Axios.post(API_URL.ADD_DEAL_CATEGORY, data);
export const DEAL_CATEGORY_LIST = (data) =>
  Axios.get(API_URL.DEAL_CATEGORY_LIST, data);
export const DEAL_CATEGORY_BY_ID = (data) =>
  Axios.get(API_URL.DEAL_CATEGORY_BY_ID + data);
export const UPDATE_DEAL_CATEGORY = (data) =>
  Axios.post(API_URL.UPDATE_DEAL_CATEGORY, data);
export const DELETE_DEAL_CATEGORY = (data) =>
  Axios.post(API_URL.DELETE_DEAL_CATEGORY, data);

// DEAL CATEGORY
export const ADD_BRAND = (data) => Axios.post(API_URL.ADD_BRAND, data);
export const BRAND_LIST = (data) => Axios.post(API_URL.BRAND_LIST, data);
export const BRAND_BY_ID = (data) => Axios.get(API_URL.BRAND_BY_ID + data);
export const UPDATE_BRAND = (data) => Axios.post(API_URL.UPDATE_BRAND, data);
export const DELETE_BRAND = (data) => Axios.post(API_URL.DELETE_BRAND, data);

// DEAL

export const ADD_DEAL = (data) => Axios.post(API_URL.ADD_DEAL, data);
export const BULK_ADD_DEAL = (data) => Axios.post(API_URL.BULK_ADD_DEAL, data);
export const EDIT_DEAL = (data) => Axios.post(API_URL.EDIT_DEAL, data);
export const DEALS_LIST = (data) => Axios.post(API_URL.DEALS_LIST, data);
export const GET_DEAL_VIEW = (data) => Axios.get(API_URL.GET_DEAL_VIEW + data);
export const DEAL_BY_BRAND_ID = (body) =>
  Axios.get(API_URL.DEAL_BY_BRAND_ID + body);

// ORDERS

export const ORDER_LIST = (data) => Axios.post(API_URL.ORDER_LIST, data);
export const ACCEPT_REJECT_ORDER = (data) =>
  Axios.post(API_URL.ACCEPT_REJECT_ORDER, data);
export const PAYMENT_STATUS_CHANGE = (data) =>
  Axios.post(API_URL.PAYMENT_STATUS_CHANGE, data);
export const BULK_PAYMENT_STATUS_CHANGE = (data) =>
  Axios.post(API_URL.BULK_PAYMENT_STATUS_CHANGE, data);

////////////////////////////////// this api are already imported at some where so no time remove that other wise it will give errors

// user
export const ADD_USER = (data) => Axios.post(API_URL.ADD_USER, data);
export const USER_LIST = (data) => Axios.post(API_URL.USER_LIST, data);
export const GET_USER_BY_ID = (data) =>
  Axios.get(API_URL.GET_USER_BY_ID + data);
export const UPDATE_USER = (data) => Axios.post(API_URL.UPDATE_USER, data);
export const DELETE_USER = (data) => Axios.post(API_URL.DELETE_USER, data);
export const USER_STATUS_CHANGE = (data) =>
  Axios.post(API_URL.USER_STATUS_CHANGE, data);

// service provider
export const SERVICE_PROVIDERS_LIST = (data) =>
  Axios.post(API_URL.SERVICE_PROVIDERS_LIST, data);
export const SERVICE_PROVIDER_VIEW = (data) =>
  Axios.get(API_URL.SERVICE_PROVIDER_VIEW + data);
export const ADD_SERVICE_PROVIDER = (data) =>
  Axios.post(API_URL.ADD_SERVICE_PROVIDER, data);
export const DELETE_PROVIDER = (data) =>
  Axios.post(API_URL.DELETE_PROVIDER, data);
export const UPDATE_SERVICE_PROVIDER = (data) =>
  Axios.post(API_URL.UPDATE_SERVICE_PROVIDER, data);
export const STATUS_CHANGE_SERVICE_PROVIDER = (data) =>
  Axios.post(API_URL.STATUS_CHANGE_SERVICE_PROVIDER, data);

// SERVICE CATEGORY

export const SERVICE_CATEGORY_LIST = (data) =>
  Axios.post(API_URL.SERVICE_CATEGORY_LIST, data);
export const ADD_SERVICE_CATEGORY = (data) =>
  Axios.post(API_URL.ADD_SERVICE_CATEGORY, data);
export const UPDATE_SERVICE_CATEGORY = (data) =>
  Axios.post(API_URL.UPDATE_SERVICE_CATEGORY, data);
export const DELETE_SERVICE_CATEGORY = (data) =>
  Axios.post(API_URL.DELETE_SERVICE_CATEGORY, data);
export const VIEW_SERVICE_CATEGORY = (data) =>
  Axios.get(API_URL.VIEW_SERVICE_CATEGORY + data);
