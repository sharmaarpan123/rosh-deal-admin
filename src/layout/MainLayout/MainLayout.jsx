import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

// css
import styles from "./mainLayout.module.scss";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Common/Loading";
import Sidebar from "../../components/Header/sidebar/Sidebar";
import { getAdminDetails } from "../../store/actions";

const MainLayout = ({ title }) => {
  const [sidebar, setSidebar] = useState();

  const dispatch = useDispatch();

  const { meQueryLoading, admin } = useSelector((s) => s.login);

  useEffect(() => {
    dispatch(getAdminDetails());
  }, [dispatch]);

  return (
    <>
      {meQueryLoading || !admin ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className={`${styles.mainLayout} d-flex align-items-start`}>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <main
            className={`${styles.MainBody} ms-auto MainBody position-relative bg-white`}
          >
            <Header sidebar={sidebar} setSidebar={setSidebar} title={title} />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};
export default MainLayout;
