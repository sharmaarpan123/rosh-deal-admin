import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";

// img
import { Accordion, Button } from "react-bootstrap";
import logo from "../../../Assets/images/logo.jpeg";

import { useSelector } from "react-redux";
import { ADMIN_ROLE_TYPE_ENUM } from "../../../utilities/const";
import {
  adminItems,
  adminSubAdminItems,
  subAdminItems,
  superAdminItems,
} from "./Routes";

const Sidebar = ({ sidebar, setSidebar }) => {
  const location = useLocation();
  const pageActive = location.pathname;
  const handleSidebar = () => {
    setSidebar((p) => !p);
  };

  const { admin } = useSelector((s) => s.login);

  const navItems = admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN)
    ? superAdminItems
    : admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN) &&
      admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUBADMIN)
    ? adminSubAdminItems
    : admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.ADMIN)
    ? adminItems
    : admin?.roles?.includes(ADMIN_ROLE_TYPE_ENUM.SUBADMIN)
    ? subAdminItems
    : [];

  return (
    <div
      className={`${styles.sidebar} ${
        sidebar && styles.active
      } pt-4 position-fixed`}
    >
      <Button
        onClick={handleSidebar}
        variant="transparent"
        className="position-absolute border-0 p-2 closeBtn d-lg-none"
        style={{ top: 0, right: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="21"
          viewBox="0 0 15 21"
          fill="none"
        >
          <path
            d="M7.245 6.529L10.668 1.3H14.259V1.447L9.303 8.608L14.343 15.895V16H10.71L7.245 10.834L3.78 16H0.147V15.895L5.145 8.608L0.21 1.447V1.3H3.801L7.245 6.529Z"
            fill="white"
          />
        </svg>
      </Button>
      <div className={`${styles.top} top text-center px-3 py-2 rounded`}>
        <div className={`${styles.logo}`}>
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-100  object-fit-contain rounded"
            />
          </Link>
        </div>
      </div>
      <Accordion className={`${styles.linkWrpper} linkWrpper pt-2 px-2`}>
        <ul className="list-unstyled ps-0 mb-0">
          {navItems.map(
            ({ path, name, icon: Icon, IsSubItems, subItems }, ind) => {
              if (IsSubItems) {
                return (
                  <li className={`py-1 ${styles.accordionWrp} `}>
                    <Accordion.Item
                      eventKey={ind}
                      className={`${styles?.accordionBtn}`}
                    >
                      <Accordion.Header>
                        <Icon styles={styles} />
                        {name}
                      </Accordion.Header>
                      {subItems?.map(({ path, name, icon: Icon }) => {
                        return (
                          <Accordion.Body>
                            <NavLink
                              onClick={() => setSidebar((p) => false)}
                              to={path}
                              className={`${styles.link} ${
                                pageActive.includes(path) && styles.active
                              } d-flex align-items-center gap-10 text-white`}
                            >
                              {name}
                            </NavLink>
                          </Accordion.Body>
                        );
                      })}
                    </Accordion.Item>
                  </li>
                );
              }
              return (
                <li
                  key={path}
                  className="my-1"
                  onClick={() => setSidebar((p) => false)}
                >
                  <NavLink
                    to={path}
                    className={`${styles.link} ${
                      pageActive.includes(path) && styles.active
                    } d-flex align-items-center gap-10 text-white`}
                  >
                    <Icon styles={styles} />
                    {name}
                  </NavLink>
                </li>
              );
            }
          )}
        </ul>
      </Accordion>
    </div>
  );
};

export default Sidebar;
