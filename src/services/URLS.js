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
  DELETE_PLATFORM: "/admin/platForm/delete",
  // DEAL CATEGORY
  ADD_DEAL_CATEGORY: "/admin/dealCategory/add",
  DEAL_CATEGORY_LIST: "/dealCategory/getAllDealCategories",
  DEAL_CATEGORY_BY_ID: "/admin/dealCategory/getById/",
  UPDATE_DEAL_CATEGORY: "/admin/dealCategory/edit",
  DELETE_DEAL_CATEGORY: "/admin/dealCategory/delete",
  // Brand
  ADD_BRAND: "/admin/brand/add",
  BRAND_LIST: "/brand/getAllBrands",
  BRAND_BY_ID: "/admin/brand/getById/",
  UPDATE_BRAND: "/admin/brand/edit",
  DELETE_BRAND: "/admin/brand/delete",

  ////////////////////////////////// this api are already imported at some where so no time remove that other wise it will give errors

  // ADD USER
  ADD_USER: "/store/adduser",
  USER_LIST: "/store/users",
  GET_USER_BY_ID: "/store/user/",
  UPDATE_USER: "/store/updateuser",
  DELETE_USER: "/store/removeuser",
  USER_STATUS_CHANGE: "/store/user/updatestatus/all",

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
