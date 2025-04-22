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

import {
  privateRoutes,
  publicRoutes,
  routes,
  sellerRoutes,
} from "./pages/index";
import { getPlatforms } from "./store/Platform/actions";
import SellerLayout from "./layout/SellerLayout/SellerLayout";

function App() {
  const isAuthenticated = useSelector((s) => s.login.token);
  const isSeller = useSelector((s) => s.login.isSeller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission();
      dispatch(getPlatforms());
    }
  }, [isAuthenticated]);

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
            {isSeller ? (
              <>
                <Route
                  path="*"
                  element={<Navigate replace to="/seller/deals" />}
                />
                {sellerRoutes?.map((item) => {
                  return (
                    <Route element={<SellerLayout title={item?.title} />}>
                      <Route path={item?.path} element={item?.element} />
                    </Route>
                  );
                })}
              </>
            ) : (
              <>
                <Route
                  path="*"
                  element={<Navigate replace to="/dashboard" />}
                />

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
            )}
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
