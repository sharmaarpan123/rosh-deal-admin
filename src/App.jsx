import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Assets/css/responsive.css";
import "./Assets/css/style.css";
import AuthLayout from "./layout/Auth/authLayout";
import MainLayout from "./layout/MainLayout/MainLayout";
import { privateRoutes, publicRoutes, routes } from "./pages/index";
import requestNotificationPermission from "./firebase";
import { useEffect } from "react";

function App() {
  const isAuthenticated = useSelector((s) => s.login.token);

  useEffect(() => {
    isAuthenticated && requestNotificationPermission();
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
