import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, routes } from "./pages/index";
import "bootstrap/dist/css/bootstrap.min.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./Assets/css/style.css";
import "./Assets/css/responsive.css";
import AuthLayout from "./layout/Auth/authLayout";
import MainLayout from "./layout/MainLayout/MainLayout";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((s) => s.login.token);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route element={<MainLayout />}>
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
          {privateRoutes.map((data, index) => (
            <Route
              onUpdate={() => window.scrollTo(0, 0)}
              exact={true}
              path={data.path}
              element={data.component}
              key={index}
            />
          ))}
        </Route>
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
  );
}

export default App;
