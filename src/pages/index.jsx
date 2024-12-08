import Login from "./AuthPages/Login/Index";
import Otp from "./AuthPages/Otp/Index";
import ForgotPassword from "./AuthPages/forgotPassword/Index";
import ResetPassword from "./AuthPages/resetPassword/Index";
import Accounting from "./SideTabPages/Accounting";
import ContentPage from "./SideTabPages/ContentPages";
import AddContentPage from "./SideTabPages/ContentPages/add";
import Dashboard from "./SideTabPages/Dashboard";
import Earnings from "./SideTabPages/Earnings";
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
import Promocode from "./SideTabPages/Promocode";
import AddPromoCode from "./SideTabPages/Promocode/add";
import PromoCodeDetail from "./SideTabPages/Promocode/detail";
import Settings from "./SideTabPages/Settings";
import EditProfile from "./SideTabPages/Settings/EditProfile";
import ManagePassword from "./SideTabPages/Settings/ManagePassword";
import SystemAccess from "./SideTabPages/SystemAccess";
import PlatForm from "./SideTabPages/PlatForm";
import AddSubAdmin from "./SideTabPages/SystemAccess/add";
import AddPlatForm from "./SideTabPages/PlatForm/add";
import PlatFormDetail from "./SideTabPages/PlatForm/detail";
import DealCategory from "./SideTabPages/DealCategory";
import AddEditDealCategory from "./SideTabPages/DealCategory/add";
import DealCategoryDetails from "./SideTabPages/DealCategory/detail";
import Brand from "./SideTabPages/Brand";
import AddEditBrand from "./SideTabPages/Brand/add";
import BrandDetails from "./SideTabPages/Brand/detail";
import DealManagement from "./SideTabPages/DealManagement";
import AddEditDeal from "./SideTabPages/DealManagement/add";
import DealDetails from "./SideTabPages/DealManagement/detail";
import OrderManagement from "./SideTabPages/OrderMangement";
import OrderDetails from "./SideTabPages/OrderMangement/detail";
import AddBulkDeal from "./SideTabPages/DealManagement/bulkAdd/Index";
import Poster from "./SideTabPages/Poster";
import AddEditPoster from "./SideTabPages/Poster/add";
import PosterDetails from "./SideTabPages/Poster/detail";
import NotificationManagement from "./SideTabPages/NotificationMangement";
import AddEditModule from "./SideTabPages/AdminModules/add";
import AdminModules from "./SideTabPages/AdminModules";
import { components } from "react-select";
import PrivacyPolicy from "./PublicPages/privacyPolicy/PrivacyPolicy";
import ChatPage from "./SideTabPages/chat";

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
  { path: "privacy-policy", components: <PrivacyPolicy /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/chat", component: <ChatPage /> },
  {
    path: "/platform",
    component: <PlatForm />,
  },
  {
    path: "/platform/add",
    component: <AddPlatForm />,
  },
  {
    path: "/platform/edit/:id",
    component: <AddPlatForm />,
  },
  {
    path: "/platform/details/:id",
    component: <PlatFormDetail />,
  },
  {
    path: "/deal-category",
    component: <DealCategory />,
  },
  {
    path: "/deal-category/add",
    component: <AddEditDealCategory />,
  },
  {
    path: "/deal-category/edit/:id",
    component: <AddEditDealCategory />,
  },
  {
    path: "/deal-category/details/:id",
    component: <DealCategoryDetails />,
  },
  {
    path: "/brand",
    component: <Brand />,
  },
  {
    path: "/brand/add",
    component: <AddEditBrand />,
  },
  {
    path: "/brand/edit/:id",
    component: <AddEditBrand />,
  },
  {
    path: "/brand/details/:id",
    component: <BrandDetails />,
  },
  {
    path: "/poster",
    component: <Poster />,
  },
  {
    path: "/poster/add",
    component: <AddEditPoster />,
  },
  {
    path: "/poster/edit/:id",
    component: <AddEditPoster />,
  },
  {
    path: "/poster/details/:id",
    component: <PosterDetails />,
  },
  {
    path: "/deal",
    component: <DealManagement />,
  },
  {
    path: "/deal/add",
    component: <AddEditDeal />,
  },
  {
    path: "/deal/bulk-add",
    component: <AddBulkDeal />,
  },
  {
    path: "/deal/edit/:id",
    component: <AddEditDeal />,
  },
  {
    path: "/deal/details/:id",
    component: <DealDetails />,
  },

  {
    path: "/orders",
    component: <OrderManagement />,
  },
  {
    path: "/orders/details/:id",
    component: <OrderDetails />,
  },

  {
    path: "/notification-management",
    component: <NotificationManagement />,
  },

  {
    path: "/system-access",
    component: <SystemAccess />,
  },
  {
    path: "/system-access/add",
    component: <AddSubAdmin />,
  },
  {
    path: "/system-access/edit/:adminId",
    component: <AddSubAdmin />,
  },
  {
    path: "/modules",
    component: <AdminModules />,
  },
  {
    path: "/module/add",
    component: <AddEditModule />,
  },
  {
    path: "/module/edit/:moduleId",
    component: <AddEditModule />,
  },

  // not used yet this /////////////////******************* */
  { path: "/manage-user", component: <ManageUser /> },
  { path: "/manage-user/add", component: <AddEditUser /> },
  { path: "/manage-user/edit/:id", component: <AddEditUser /> },
  { path: "/manage-user/detail/:id", component: <UserDetail /> },
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
