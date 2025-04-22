import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// css
import styles from "./mainLayout.module.scss";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Common/Loading";
import SellerHeader from "../../components/SellerHeader";
import { getSellerDetails } from "../../store/actions";

const SellerLayout = ({ title }) => {
  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();

  const { meQueryLoading, admin } = useSelector((s) => s.login);

  useEffect(() => {
    dispatch(getSellerDetails());
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
          <main
            className={`${styles.MainBody} ms-auto MainBody position-relative bg-white`}
          >
            <SellerHeader
              sidebar={sidebar}
              setSidebar={setSidebar}
              title={title}
            />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};
export default SellerLayout;
