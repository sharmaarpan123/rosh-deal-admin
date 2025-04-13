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
    name: "Users",
    icon: ManageUserIcons,
  },
  {
    path: "/platform",
    name: "Platform",
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
    name: "Deals",
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

  // myOrdersAsMed

  {
    path: "/orders",
    name: "Orders",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/orders",
        name: "My Orders As Agency",
        icon: CommonNavIcon,
      },
      {
        path: "/myMedOrdersAsAgency",
        name: "My Mediator Orders",
        icon: CommonNavIcon,
      },
    ],
  },

  // {
  //   path: "/orders",
  //   name: "Order Management",
  //   icon: CommonNavIcon,
  // },
  {
    path: "/poster",
    name: "Banners",
    icon: CommonNavIcon,
  },
  {
    path: "/notification-management",
    name: "Notification",
    icon: CommonNavIcon,
  },
  // {
  //   path: "/modules",
  //   name: "Admin Modules",
  //   icon: CommonNavIcon,
  // },
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
    name: "Deals",
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
    name: "Orders",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/orders",
        name: "My Orders As Agency",
        icon: CommonNavIcon,
      },
      {
        path: "/myMedOrdersAsAgency",
        name: "My Mediator Orders",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/notification-management",
    name: "Notification Management",
    icon: CommonNavIcon,
  },
  {
    path: "/system-access",
    name: "Mediators",
    icon: CommonNavIcon,
  },
];
export const subAdminItems = [
  ...commonItems,
  {
    path: "/deal",
    name: "Deals",
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
    name: "Orders",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/myOrdersAsMed",
        name: "My  Orders As Med",
        icon: CommonNavIcon,
      },
    ],
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
    path: "/myDealsAsAgency",
    name: "Deals",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/myDealsAsAgency",
        name: "My Deals As Agency",
        icon: CommonNavIcon,
      },
      {
        path: "/myMedDealsAsAgency",
        name: "My Mediator Deals",
        icon: CommonNavIcon,
      },
      {
        path: "/myAgencyDealsAsMed",
        name: "My Agency Deal As Med",
        icon: CommonNavIcon,
      },
      {
        path: "/myDealsAsMed",
        name: "My  Deal As Med",
        icon: CommonNavIcon,
      },
    ],
  },

  {
    path: "/orders",
    name: "Orders",
    icon: CommonNavIcon,
    IsSubItems: true,
    subItems: [
      {
        path: "/orders",
        name: "My Orders As Agency",
        icon: CommonNavIcon,
      },
      {
        path: "/myMedOrdersAsAgency",
        name: "My Mediator Orders",
        icon: CommonNavIcon,
      },
      {
        path: "/myOrdersAsMed",
        name: "My  Orders As Med",
        icon: CommonNavIcon,
      },
    ],
  },
  {
    path: "/notification-management",
    name: "Notification Management",
    icon: CommonNavIcon,
  },
  {
    path: "/system-access",
    name: "Mediators",
    icon: CommonNavIcon,
  },
];
