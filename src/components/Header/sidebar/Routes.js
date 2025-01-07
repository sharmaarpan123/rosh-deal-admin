import ManageUserIcons from "./icons/ManangeUserIcons.jsx";
import DashboardIcon from "./icons/DashBoardIcon.jsx";
import CommonNavIcon from "./icons/CommonNavIcon.jsx";

const commonItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/manage-user",
    name: "Manage User",
    icon: ManageUserIcons,
  },
  {
    path: "/platform",
    name: "Plat Form",
    icon: CommonNavIcon,
  },
  {
    path: "/category",
    name: "Deal Category",
    icon: CommonNavIcon,
  },
  {
    path: "/brand",
    name: "Brand",
    icon: CommonNavIcon,
  },
];

export const superAdminItems = [
  ...commonItems,

  {
    path: "/myDealsAsAgency",
    name: "Agency Deal Management",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/myDealsAsAgency",
        name: "My Deals",
        icon: CommonNavIcon,
      },
      {
        path: "/myDealsAsAgency",
        name: "My Mediator Deals",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/deal",
    name: "Mediator Deal Management",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/deal",
        name: "My Agency  Deals",
        icon: CommonNavIcon,
      },
      {
        path: "/deal",
        name: "My  Deals As Med",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/orders",
    name: "Order Management",
    icon: CommonNavIcon,
  },
  {
    path: "/poster",
    name: "Poster Management",
    icon: CommonNavIcon,
  },
  {
    path: "/notification-management",
    name: "Notification Management",
    icon: CommonNavIcon,
  },
  {
    path: "/modules",
    name: "Admin Modules",
    icon: CommonNavIcon,
  },
  {
    path: "/system-access",
    name: "System Access",
    icon: CommonNavIcon,
  },
];
export const adminItems = [
  ...commonItems,
  {
    path: "/myDealsAsAgency",
    name: "Agency Deal Management",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/myDealsAsAgency",
        name: "My Deals",
        icon: CommonNavIcon,
      },
      {
        path: "/myMedDealsAsAgency",
        name: "My Mediator Deals",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/orders",
    name: "Order Management",
    icon: CommonNavIcon,
  },
  {
    path: "/notification-management",
    name: "Notification Management",
    icon: CommonNavIcon,
  },
  {
    path: "/system-access",
    name: "System Access",
    icon: CommonNavIcon,
  },
];
export const subAdminItems = [
  ...commonItems,
  {
    path: "/deal",
    name: "Mediator Deal Management",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/myAgencyDealsAsMed",
        name: "My Agency  Deals",
        icon: CommonNavIcon,
      },
      {
        path: "/myDealsAsMed",
        name: "My  Deals As Med",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/orders",
    name: "Order Management",
    icon: CommonNavIcon,
  },
  {
    path: "/notification-management",
    name: "Notification Management",
    icon: CommonNavIcon,
  },
];
export const adminSubAdminItems = [
  ...commonItems,
  {
    path: "/deal",
    name: "Agency Deal Management",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/myDealsAsAgency",
        name: "My Deals",
        icon: CommonNavIcon,
      },
      {
        path: "/myMedDeals",
        name: "My Mediator Deals",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/deal",
    name: "Mediator Deal Management",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/deal",
        name: "My Agency  Deals",
        icon: CommonNavIcon,
      },
      {
        path: "/deal",
        name: "My  Deals As Med",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/orders",
    name: "Order Management",
    icon: CommonNavIcon,
  },
  {
    path: "/notification-management",
    name: "Notification Management",
    icon: CommonNavIcon,
  },
  {
    path: "/system-access",
    name: "System Access",
    icon: CommonNavIcon,
  },
];
