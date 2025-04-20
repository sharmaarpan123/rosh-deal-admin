import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Assets/css/responsive.css";
import "./Assets/css/style.css";
import requestNotificationPermission from "./firebase";
import AuthLayout from "./layout/Auth/authLayout";
import MainLayout from "./layout/MainLayout/MainLayout";
import { privateRoutes, publicRoutes, routes } from "./pages/index";
import MyDealsAsSeller from "./pages/SideTabPages/DealManagement/MyDealsAsSeller";
import MyOrderAsSeller from "./pages/SideTabPages/OrderMangement/MyOrderAsSeller";
import { getPlatforms } from "./store/Platform/actions";
import DealDetails from "./pages/SideTabPages/DealManagement/MyDealsAsAgency/detail";

function App() {
  const isAuthenticated = useSelector((s) => s.login.token);
  const admin = useSelector((s) => s.login.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission();
      dispatch(getPlatforms());
    }
  }, [isAuthenticated]);
  const isSeller = admin?.roles?.includes("seller");

  return (
    <>
      <Routes>
        {publicRoutes.map((data, index) => (
          <Route
            onUpdate={() => window.scrollTo(0, 0)}
            exact={true}
            path={data.path}
            element={data.component}
            key={index}
          />
        ))}
        {isAuthenticated ? (
          <>
           {isSeller && (
              <>
                <Route
                  path="/seller/deals"
                  element={<MyDealsAsSeller />}
                />
                <Route
                  path="/seller/deal/details/:id"
                  element={<DealDetails />}
                />
                <Route
                  path="/seller/orders/:dealId"
                  element={<MyOrderAsSeller />}
                />
              </>
            )}
            <Route path="*" element={<Navigate replace to="/dashboard" />} />

            {privateRoutes.map((data, index) => (
              <Route element={<MainLayout title={data?.title} />}>
                <Route
                  onUpdate={() => window.scrollTo(0, 0)}
                  exact={true}
                  path={data.path}
                  element={data.component}
                  key={index}
                  title={data?.title}
                />
              </Route>
            ))}
          </>
        ) : (
          <Route element={<AuthLayout />}>
            <Route path="*" element={<Navigate to="/login" />} />
            {routes.map((data, index) => (
              <Route
                onUpdate={() => window.scrollTo(0, 0)}
                exact={true}
                path={data.path}
                element={data.component}
                key={index}
              />
            ))}
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
