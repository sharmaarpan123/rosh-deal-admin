export default {
  API_URL: import.meta.env.VITE_APP_API_URL,

  // ADMIN
  LOGIN_ADMIN: "auth/signin",
  FORGET_PASSWORD_ADMIN: "auth/forgetPassword",
  RESET_PASSWORD: "auth/resetPassword",
  CHANGE_PASSWORD: "/api/v1/admin/changePassword",
  ADMIN_UPDATE: "admin/editAdmin",
  GET_ADMIN_BY_ID: "/admin/getUserById/",

  // UPLOAD FILE

  UPLOAD_FILE: "/fileUpload",

  // add plat form

  ADD_PLATFORM: "/admin/platForm/add",
  PLATFORM_LIST: "/platForm/getAllPlatForms",
  PLATFORM_BY_ID: "/admin/platForm/getById/",
  UPDATE_PLATFORM: "/admin/platForm/edit",
  STATUS_UPDATE_PLATFORM: "/admin/platForm/updateStatus",
  // DEAL CATEGORY
  ADD_DEAL_CATEGORY: "/admin/dealCategory/add",
  DEAL_CATEGORY_LIST: "/dealCategory/getAllDealCategories",
  DEAL_CATEGORY_BY_ID: "/admin/dealCategory/getById/",
  UPDATE_DEAL_CATEGORY: "/admin/dealCategory/edit",
  UPDATE_STATUS_DEAL_CATEGORY: "/admin/dealCategory/updateStatus",
  // Brand
  ADD_BRAND: "/admin/brand/add",
  BRAND_LIST: "/brand/getAllBrands",
  BRAND_BY_ID: "/admin/brand/getById/",
  UPDATE_BRAND: "/admin/brand/edit",
  BRAND_UPDATE_STATUS: "/admin/brand/updateStatus",

  // deal

  ADD_DEAL: "/admin/deal/add",
  BULK_ADD_DEAL: "admin/deal/bulk-add",
  EDIT_DEAL: "/admin/deal/edit",
  GET_DEAL_VIEW: "/deal/detail/",
  DEALS_LIST: "/admin/deal/all/withFilters",
  DEAL_BY_BRAND_ID: "/admin/deal/getDealWithBrandId/",
  DEAL_UPDATE_PAYMENT_STATUS: "/admin/deal/updatePaymentStatus",
  DEAL_UPDATE_STATUS: "/admin/deal/updateStatus",
  ALL_DEALS: "/admin/deal/all/allDeals",

  // orders

  ORDER_LIST: "/admin/orders/all",
  ACCEPT_REJECT_ORDER: "admin/order/acceptRejectOrder",
  PAYMENT_STATUS_CHANGE: "admin/order/paymentStatusUpdate",
  BULK_PAYMENT_STATUS_CHANGE: "admin/order/bulkPaymentStatusUpdate",

  // poster
  POSTER_LIST: "/admin/poster/getAllPosters",
  POSTER_ADD: "/admin/poster/add",
  POSTER_EDIT: "/admin/poster/edit",
  POSTER_STATUS_CHANGE: "/admin/poster/statusChange",
  POSTER_DELETE: "/admin/poster/delete",
  POSTER_GET_BY_ID: "/admin/poster/getById/",

  ////////////////////////////////// this api are already imported at some where so no time remove that other wise it will give errors

  // ADD USER
  USER_LIST: "/admin/user/getAllUsers/withFilters",
  USER_STATUS_CHANGE: "/admin/user/updateStatus",
  GET_USER_BY_ID: "/admin/user/getUserById/",
  UPDATE_USER: "/admin/user/updateUser",
  // ADD_USER: "/store/adduser",
  // DELETE_USER: "/store/removeuser",

  // service provider
  SERVICE_PROVIDERS_LIST: "/store/vendors",
  SERVICE_PROVIDER_VIEW: "/store/vendor/view/",
  ADD_SERVICE_PROVIDER: "/store/addvendor",
  UPDATE_SERVICE_PROVIDER: "store/updatevendor",
  DELETE_PROVIDER: "/store/archivevendor",
  STATUS_CHANGE_SERVICE_PROVIDER: "/store/vendors/updatestatus/all",

  // service category

  SERVICE_CATEGORY_LIST: "/category/viewallcategory",
  ADD_SERVICE_CATEGORY: "/category/add",
  UPDATE_SERVICE_CATEGORY: "/category/update",
  DELETE_SERVICE_CATEGORY: "/category/remove",
  VIEW_SERVICE_CATEGORY: "/category/view/",
};
