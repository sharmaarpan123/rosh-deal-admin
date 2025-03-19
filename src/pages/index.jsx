import Login from "./AuthPages/Login/Index";
import Otp from "./AuthPages/Otp/Index";
import ForgotPassword from "./AuthPages/forgotPassword/Index";
import ResetPassword from "./AuthPages/resetPassword/Index";
import PrivacyPolicy from "./PublicPages/privacyPolicy/PrivacyPolicy";
import Accounting from "./SideTabPages/Accounting";
import AdminModules from "./SideTabPages/AdminModules";
import AddEditModule from "./SideTabPages/AdminModules/add";
import Brand from "./SideTabPages/Brand";
import AddEditBrand from "./SideTabPages/Brand/add";
import BrandDetails from "./SideTabPages/Brand/detail";
import ContentPage from "./SideTabPages/ContentPages";
import AddContentPage from "./SideTabPages/ContentPages/add";
import Dashboard from "./SideTabPages/Dashboard";
import DealCategory from "./SideTabPages/DealCategory";
import AddEditDealCategory from "./SideTabPages/DealCategory/add";
import DealCategoryDetails from "./SideTabPages/DealCategory/detail";
import Earnings from "./SideTabPages/DealManagement/MyMediatorDeals/Earnings";
import Faq from "./SideTabPages/Faq";
import AddFaq from "./SideTabPages/Faq/add";
import Help from "./SideTabPages/Help";
import HelpDetail from "./SideTabPages/Help/detail";
import ManageCommssions from "./SideTabPages/ManageCommissions";
import ManageServiceCategory from "./SideTabPages/ManageServiceCategory";
import AddEditServiceCategory from "./SideTabPages/ManageServiceCategory/Add";
import ManageServiceDetail from "./SideTabPages/ManageServiceCategory/Detail";
import ServiceProviderRequest from "./SideTabPages/ManageServiceProvider/NewRequest";
import RegisterServiceProvider from "./SideTabPages/ManageServiceProvider/Register";
import AddNewServiceProvider from "./SideTabPages/ManageServiceProvider/Register/Add";
import ServiceProviderDetail from "./SideTabPages/ManageServiceProvider/detail";
import ManageUser from "./SideTabPages/ManageUser";
import AddEditUser from "./SideTabPages/ManageUser/Add";
import UserDetail from "./SideTabPages/ManageUser/detail";
import MyAgencyDealsAsMed from "./SideTabPages/DealManagement/MyAgencyDeals";
import MyAgencyDealDetailsAsMed from "./SideTabPages/DealManagement/MyAgencyDeals/detail";
import DealManagement from "./SideTabPages/DealManagement/MyDealsAsAgency";
import AddEditDeal from "./SideTabPages/DealManagement/MyDealsAsAgency/add";
import AddBulkDeal from "./SideTabPages/DealManagement/MyDealsAsAgency/bulkAdd/Index";
import DealDetails from "./SideTabPages/DealManagement/MyDealsAsAgency/detail";
import MyDealsAsMed from "./SideTabPages/DealManagement/MyDealsAsMed";
import MyDealsDetailsAsMed from "./SideTabPages/DealManagement/MyDealsAsMed/detail";
import MyMedDealsAsAgency from "./SideTabPages/DealManagement/MyMediatorDeals";
import NotificationManagement from "./SideTabPages/NotificationMangement";
import PlatForm from "./SideTabPages/PlatForm";
import AddPlatForm from "./SideTabPages/PlatForm/add";
import PlatFormDetail from "./SideTabPages/PlatForm/detail";
import Poster from "./SideTabPages/Poster";
import AddEditPoster from "./SideTabPages/Poster/add";
import PosterDetails from "./SideTabPages/Poster/detail";
import Promocode from "./SideTabPages/Promocode";
import AddPromoCode from "./SideTabPages/Promocode/add";
import PromoCodeDetail from "./SideTabPages/Promocode/detail";
import Settings from "./SideTabPages/Settings";
import EditProfile from "./SideTabPages/Settings/EditProfile";
import ManagePassword from "./SideTabPages/Settings/ManagePassword";
import SystemAccess from "./SideTabPages/SystemAccess";
import LinkedSubAdmin from "./SideTabPages/SystemAccess/LinkedMed";
import AddSubAdmin from "./SideTabPages/SystemAccess/add";
import MyOrderAsAgency from "./SideTabPages/OrderMangement/MyOrderAsAgency";
import MyMedOrdersAsAgency from "./SideTabPages/OrderMangement/MyMedOrdersAsAgency";
import MyOrderAsMed from "./SideTabPages/OrderMangement/MyOrderAsMed";
import Notification from "./SideTabPages/Notifications";
export const publicRoutes = [
  { path: "privacy-policy", component: <PrivacyPolicy /> },
];

export const routes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/otp", component: <Otp /> },
  { path: "/reset-password", component: <ResetPassword /> },
];

export const privateRoutes = [
  {
    path: "privacy-policy",
    component: <PrivacyPolicy />,
    title: "Privacy Policy",
  },
  { path: "/dashboard", component: <Dashboard />, title: "Dashboard" },
  { path: "/platform", component: <PlatForm />, title: "Platform" },
  { path: "/platform/add", component: <AddPlatForm />, title: "Add Platform" },
  {
    path: "/platform/edit/:id",
    component: <AddPlatForm />,
    title: "Edit Platform",
  },
  {
    path: "/platform/details/:id",
    component: <PlatFormDetail />,
    title: "Platform Details",
  },
  { path: "/category", component: <DealCategory />, title: "Deal Categories" },
  {
    path: "/category/add",
    component: <AddEditDealCategory />,
    title: "Add Deal Category",
  },
  {
    path: "/category/edit/:id",
    component: <AddEditDealCategory />,
    title: "Edit Deal Category",
  },
  {
    path: "/category/details/:id",
    component: <DealCategoryDetails />,
    title: "Category Details",
  },
  { path: "/brand", component: <Brand />, title: "Brands" },
  { path: "/brand/add", component: <AddEditBrand />, title: "Add Brand" },
  { path: "/brand/edit/:id", component: <AddEditBrand />, title: "Edit Brand" },
  {
    path: "/brand/details/:id",
    component: <BrandDetails />,
    title: "Brand Details",
  },
  { path: "/poster", component: <Poster />, title: "Posters" },
  { path: "/poster/add", component: <AddEditPoster />, title: "Add Poster" },
  {
    path: "/poster/edit/:id",
    component: <AddEditPoster />,
    title: "Edit Poster",
  },
  {
    path: "/poster/details/:id",
    component: <PosterDetails />,
    title: "Poster Details",
  },
  {
    path: "/myDealsAsAgency",
    component: <DealManagement />,
    title: "My Deals As Agency",
  },
  {
    path: "/myMedDealsAsAgency",
    component: <MyMedDealsAsAgency />,
    title: "My Med Deals As Agency",
  },

  { path: "/deal/add", component: <AddEditDeal />, title: "Add Deal" },
  {
    path: "/deal/bulk-add",
    component: <AddBulkDeal />,
    title: "Add Bulk Deals",
  },
  { path: "/deal/edit/:id", component: <AddEditDeal />, title: "Edit Deal" },
  {
    path: "/deal/details/:id",
    component: <DealDetails />,
    title: "Deal Details As Agency",
  },
  {
    path: "/myAgencyDealsAsMed",
    component: <MyAgencyDealsAsMed />,
    title: "My Agency Deals As Med",
  },
  {
    path: "/myAgencyDealsAsMed/details/:id",
    component: <MyAgencyDealDetailsAsMed />,
    title: "My Agency Deal Details As Med",
  },
  {
    path: "/myDealsAsMed",
    component: <MyDealsAsMed />,
    title: "My Deal As Med",
  },
  {
    path: "/myDealsAsMed/details/:id",
    component: <MyDealsDetailsAsMed />,
    title: "My Agency Deal Details As Med",
  },

  {
    path: "/orders",
    component: <MyOrderAsAgency />,
    title: "My Orders AS Agency",
  },
  {
    path: "/myOrdersAsMed",
    component: <MyOrderAsMed />,
    title: "My  Orders as Med ",
  },
  {
    path: "/myMedOrdersAsAgency",
    component: <MyMedOrdersAsAgency />,
    title: "My Med Orders as Agency ",
  },
  {
    path: "/notification-management",
    component: <NotificationManagement />,
    title: "Notification Management",
  },
  {
    path: "/system-access",
    component: <SystemAccess />,
    title: "System Access",
  },
  {
    path: "/system-access/add",
    component: <AddSubAdmin />,
    title: "Add New Member",
  },
  {
    path: "/system-access/linkedMed",
    component: <LinkedSubAdmin />,
    title: "Linked  Mediator",
  },
  {
    path: "/system-access/edit/:adminId",
    component: <AddSubAdmin />,
    title: "Edit Sub Admin",
  },
  { path: "/modules", component: <AdminModules />, title: "Modules" },
  { path: "/module/add", component: <AddEditModule />, title: "Add Module" },
  {
    path: "/module/edit/:moduleId",
    component: <AddEditModule />,
    title: "Edit Module",
  },
  { path: "/manage-user", component: <ManageUser />, title: "Manage Users" },
  { path: "/manage-user/add", component: <AddEditUser />, title: "Add User" },
  {
    path: "/manage-user/edit/:id",
    component: <AddEditUser />,
    title: "Edit User",
  },
  {
    path: "/manage-user/detail/:id",
    component: <UserDetail />,
    title: "User Details",
  },

  {
    path: "/notifications",
    component: <Notification />,
    title :"Notifications"
  },
  // not used yet this /////////////////******************* */
  {
    path: "/service-provider/register",
    component: <RegisterServiceProvider />,
  },
  {
    path: "/service-provider/register/add",
    component: <AddNewServiceProvider />,
  },
  {
    path: "/service-provider/register/edit/:id",
    component: <AddNewServiceProvider />,
  },
  {
    path: "/service-provider/register/detail/:id",
    component: <ServiceProviderDetail />,
  },
  {
    path: "/service-provider/request/detail/:id",
    component: <ServiceProviderDetail />,
  },
  {
    path: "/service-provider/request",
    component: <ServiceProviderRequest />,
  },

  {
    path: "/manage-service-category",
    component: <ManageServiceCategory />,
  },
  {
    path: "/manage-service-category/detail/:id",
    component: <ManageServiceDetail />,
  },
  {
    path: "/manage-service-category/add",
    component: <AddEditServiceCategory />,
  },
  {
    path: "/manage-service-category/edit/:id",
    component: <AddEditServiceCategory />,
  },
  {
    path: "/manage-commissions",
    component: <ManageCommssions />,
  },
  {
    path: "/earnings",
    component: <Earnings />,
  },
  {
    path: "/accounting",
    component: <Accounting />,
  },
  {
    path: "/promocode",
    component: <Promocode />,
  },
  {
    path: "/promocode/add",
    component: <AddPromoCode />,
  },
  {
    path: "/promocode/detail",
    component: <PromoCodeDetail />,
  },
  {
    path: "/help",
    component: <Help />,
  },
  {
    path: "/help/detail",
    component: <HelpDetail />,
  },

  {
    path: "/settings",
    component: <Settings />,
  },
  {
    path: "/settings/edit-profile",
    component: <EditProfile />,
  },
  {
    path: "/settings/password",
    component: <ManagePassword />,
  },
  {
    path: "/faq",
    component: <Faq />,
  },
  {
    path: "/faq/add",
    component: <AddFaq />,
  },
  {
    path: "/content-page",
    component: <ContentPage />,
  },
  {
    path: "/content-page/add",
    component: <AddContentPage />,
  },
];
