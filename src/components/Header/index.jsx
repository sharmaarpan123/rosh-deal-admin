import React, { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// css
import styles from "./Header.module.scss";

// img
import logo from "../../Assets/images/logo.png";
import user from "../../Assets/images/authBg.png";
import ConfirmationPop from "../Modals/ConfirmationPop";
import Axios from "../../services/Axios";

const Header = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmation, setConfirmation] = useState();
  const pageName = location.pathname;
  let lastSlashIndex = pageName.lastIndexOf("/");
  let heading;
  if (lastSlashIndex !== -1) {
    const afterLastSlash = pageName.substring(lastSlashIndex + 1);
    heading = afterLastSlash;
  }
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <ConfirmationPop
        confirmation={confirmation}
        setConfirmation={setConfirmation}
        type={"logout"}
        confirmHandler={() =>
          Axios.LogoutUser({
            response: {
              status: 401,
            },
          })
        }
      />
      <header
        className={`${styles.siteHeader}  siteHeader bg-white  sticky-top pt-lg-3 py-1 w-100`}
        style={{ zIndex: 99 }}
      >
        <Container>
          <Navbar expand="lg" className=" border-bottom border-dark px-lg-3">
            <Button
              onClick={handleSidebar}
              className="d-lg-none border-0 p-0"
              variant="transparent"
              style={{ width: 30 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3.75 10.5C3.55109 10.5 3.36032 10.4209 3.21967 10.2803C3.07902 10.1396 3 9.94887 3 9.74996V3.75146C3 3.55255 3.07902 3.36179 3.21967 3.22113C3.36032 3.08048 3.55109 3.00146 3.75 3.00146H9.75C9.94891 3.00146 10.1397 3.08048 10.2803 3.22113C10.421 3.36179 10.5 3.55255 10.5 3.75146V9.74996C10.5 9.94887 10.421 10.1396 10.2803 10.2803C10.1397 10.4209 9.94891 10.5 9.75 10.5H3.75ZM14.25 10.5C14.0511 10.5 13.8603 10.4209 13.7197 10.2803C13.579 10.1396 13.5 9.94887 13.5 9.74996V3.75146C13.5 3.55255 13.579 3.36179 13.7197 3.22113C13.8603 3.08048 14.0511 3.00146 14.25 3.00146H20.2485C20.4474 3.00146 20.6382 3.08048 20.7788 3.22113C20.9195 3.36179 20.9985 3.55255 20.9985 3.75146V9.74996C20.9985 9.94887 20.9195 10.1396 20.7788 10.2803C20.6382 10.4209 20.4474 10.5 20.2485 10.5H14.25ZM3.75 21C3.55109 21 3.36032 20.9209 3.21967 20.7803C3.07902 20.6396 3 20.4489 3 20.25V14.25C3 14.051 3.07902 13.8603 3.21967 13.7196C3.36032 13.579 3.55109 13.5 3.75 13.5H9.75C9.94891 13.5 10.1397 13.579 10.2803 13.7196C10.421 13.8603 10.5 14.051 10.5 14.25V20.25C10.5 20.4489 10.421 20.6396 10.2803 20.7803C10.1397 20.9209 9.94891 21 9.75 21H3.75ZM14.25 21C14.0511 21 13.8603 20.9209 13.7197 20.7803C13.579 20.6396 13.5 20.4489 13.5 20.25V14.25C13.5 14.051 13.579 13.8603 13.7197 13.7196C13.8603 13.579 14.0511 13.5 14.25 13.5H20.2485C20.4474 13.5 20.6382 13.579 20.7788 13.7196C20.9195 13.8603 20.9985 14.051 20.9985 14.25V20.25C20.9985 20.4489 20.9195 20.6396 20.7788 20.7803C20.6382 20.9209 20.4474 21 20.2485 21H14.25Z"
                  fill="#005FD9"
                />
              </svg>
            </Button>
            <Navbar.Brand className={`${styles.logo} d-lg-none`} href="#">
              <img src={logo} alt="" className={`img-fluid`} />
            </Navbar.Brand>

            <Navbar.Toggle
              className="border-0 p-0"
              aria-controls="navbarScroll"
            />
            <Navbar.Collapse
              className={` justify-content-end`}
              id="navbarScroll"
            >
              <Form
                className={`${styles.searchForm} mx-lg-2 position-relative`}
              >
                <div className="iconWithText position-relative">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className=""
                    aria-label="Search"
                  />
                  <Button
                    variant="transparent"
                    className="border-0 icn p-0 position-absolute"
                    style={{ left: 10 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_8_762)">
                        <path
                          d="M17.7916 17.4843L12.6916 12.3843C13.6666 11.1843 14.2666 9.60928 14.2666 7.88428C14.2666 3.98428 11.0416 0.759277 7.1416 0.759277C3.2416 0.759277 0.0166016 3.98428 0.0166016 7.88428C0.0166016 11.7843 3.2416 15.0093 7.1416 15.0093C8.8666 15.0093 10.3666 14.4093 11.6416 13.4343L16.7416 18.5343C16.8916 18.6843 17.1166 18.7593 17.2666 18.7593C17.4166 18.7593 17.6416 18.6843 17.7916 18.5343C18.0916 18.2343 18.0916 17.7843 17.7916 17.4843ZM7.1416 13.5093C4.0666 13.5093 1.5166 10.9593 1.5166 7.88428C1.5166 4.80928 4.0666 2.25928 7.1416 2.25928C10.2166 2.25928 12.7666 4.80928 12.7666 7.88428C12.7666 10.9593 10.2166 13.5093 7.1416 13.5093Z"
                          fill="#C4C4C4"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_8_762">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0.0166016 0.759277)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Button>
                </div>
              </Form>
              <Nav className=" my-2 my-lg-0 align-items-center">
                <Dropdown className={`${styles.notificationDropdown} noAfter`}>
                  <div
                    className="position-fixed h-100 w-100 bg-dark d-none"
                    style={{ left: 0, top: 0, opacity: 0.5 }}
                  ></div>
                  <Dropdown.Toggle
                    className={`border-0 p-0 position-relative`}
                    variant="transparent"
                    id="dropdown-basic"
                  >
                    <span
                      className={`${styles.count} count rounded-circle d-flex align-items-center fw-bold position-absolute justify-content-center text-white`}
                    >
                      1
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 36 43"
                      fill="none"
                    >
                      <path
                        d="M18.1239 42.8392C21.3253 42.8392 24.0034 40.557 24.6183 37.5361H11.6294C12.2447 40.557 14.9228 42.8392 18.1239 42.8392Z"
                        fill="#5F86B6"
                      />
                      <path
                        d="M31.5159 26.0392C31.4699 26.0392 31.4275 26.0463 31.3816 26.0463C23.5843 26.0463 17.2403 19.7023 17.2403 11.9051C17.2403 8.84151 18.2301 6.01165 19.8919 3.69222V2.18261C19.8919 1.20512 19.0998 0.415039 18.124 0.415039C17.1484 0.415039 16.3564 1.20512 16.3564 2.18261V4.09195C10.3691 4.95454 5.75031 10.1038 5.75031 16.3242V21.2524C5.75031 24.7506 4.21772 28.0527 1.52898 30.3259C0.841498 30.9146 0.447266 31.7701 0.447266 32.6751C0.447266 34.3812 1.83485 35.7687 3.5406 35.7687H32.7073C34.4134 35.7687 35.801 34.3812 35.801 32.6751C35.801 31.7701 35.4067 30.9146 34.7015 30.312C33.3084 29.1328 32.2338 27.6656 31.5159 26.0392Z"
                        fill="#5F86B6"
                      />
                    </svg>
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className={`${styles.menu} rounded-0 pt-0 shadow-sm border-0`}
                  >
                    <div
                      className={`${styles.top} top py-3 px-3 d-flex justify-content-between align-items-center mb-2`}
                    >
                      <h4 className="m-0 fw-sbold">
                        Notifications{" "}
                        <span
                          className={`${styles.count} text-white rounded-circle fw-normal d-inline-flex align-items-center justify-content-center`}
                        >
                          2
                        </span>
                      </h4>
                      <Button className="border-0 p-0" variant="transparent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="4"
                          height="19"
                          viewBox="0 0 4 19"
                          fill="none"
                        >
                          <circle
                            cx="1.64589"
                            cy="1.59413"
                            r="1.55019"
                            fill="#80849D"
                          />
                          <circle
                            cx="1.64589"
                            cy="9.03456"
                            r="1.55019"
                            fill="#80849D"
                          />
                          <circle
                            cx="1.64589"
                            cy="16.476"
                            r="1.55019"
                            fill="#80849D"
                          />
                        </svg>
                      </Button>
                    </div>
                    <div className="ContentBody">
                      <ul
                        className={`${styles.notificationList} list-unstyled ps-0 mb-0`}
                      >
                        <li className="py-3 d-flex align-items-start gap-10 px-3">
                          <div
                            className="imgWrp rounded-circle"
                            style={{
                              height: 40,
                              width: 40,
                              background: "#6CBC6E",
                            }}
                          >
                            {/* <img
                              src={user}
                              alt=""
                              className="img-fluid h-100 w-100 rounded-circle"
                               style={{ objectFit: "cover" }}
                            /> */}
                          </div>
                          <div className="content">
                            <h6 className="fw-bold text-dark m-0">
                              Edward Curr
                            </h6>
                            <p className=" text-muted m-0">
                              agency driver submits their profile for
                              verification
                            </p>
                            <div className="btnWrpper my-2 d-flex align-items-center gap-10">
                              <Button className="d-flex align-items-center justify-content-center h-auto commonBtn">
                                Approve
                              </Button>
                              <Button
                                className="d-flex align-items-center justify-content-center h-auto commonBtn bg-transparent text-muted broder-light"
                                style={{ borderColor: "#ddd" }}
                              >
                                Approve
                              </Button>
                            </div>
                            <p className="m-0 text-muted">17 min ago</p>
                          </div>
                        </li>
                        <li className="py-3 d-flex align-items-start gap-10 px-3">
                          <div
                            className="imgWrp rounded-circle"
                            style={{
                              height: 40,
                              width: 40,
                              background: "#6CBC6E",
                            }}
                          >
                            <img
                              src={user}
                              alt=""
                              className="img-fluid h-100 w-100 rounded-circle"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="content">
                            <h6 className="fw-bold text-dark m-0">
                              Edward Curr
                            </h6>
                            <p className=" text-muted m-0">
                              agency driver submits their profile for
                              verification
                            </p>
                            <div className="btnWrpper my-2 d-flex align-items-center gap-10">
                              <Button className="d-flex align-items-center justify-content-center h-auto commonBtn">
                                Approve
                              </Button>
                              <Button
                                className="d-flex align-items-center justify-content-center h-auto commonBtn bg-transparent text-muted broder-light"
                                style={{ borderColor: "#ddd" }}
                              >
                                Approve
                              </Button>
                            </div>
                            <p className="m-0 text-muted">17 min ago</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <Link
                  className={`${styles.profileLink} px-3 d-flex align-items-center gap-10`}
                  to="/settings"
                >
                  <img
                    src={user}
                    style={{ aspectRatio: 1, height: 40, width: 40 }}
                    alt=""
                    className="img-fluid rounded-circle object-fit-cover flex-shrink-0"
                  />
                  <div className="content">
                    <p className="m-0 themeClr fw-sbold">Brooklyn Simmons</p>
                    <p className="m-0 text-muted fw-sbold">
                      michelle.rivera@example.com
                    </p>
                  </div>
                </Link>
                <Button
                  onClick={() => setConfirmation(true)}
                  variant="transparent"
                  className="px-3 border-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 47 48"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.9894 0.362555C20.0155 0.0547534 21.0993 -0.00892026 22.1543 0.176616C23.2094 0.362153 24.2064 0.791761 25.0659 1.43115C25.9254 2.07054 26.6235 2.902 27.1045 3.85916C27.5856 4.81633 27.8362 5.87268 27.8363 6.94392V40.444C27.8362 41.5153 27.5856 42.5716 27.1045 43.5288C26.6235 44.486 25.9254 45.3174 25.0659 45.9568C24.2064 46.5962 23.2094 47.0258 22.1543 47.2113C21.0993 47.3969 20.0155 47.3332 18.9894 47.0254L5.24482 42.902C3.82936 42.4774 2.58847 41.6078 1.70624 40.4223C0.823999 39.2368 0.34741 37.7984 0.347168 36.3207V11.0673C0.34741 9.58951 0.823999 8.15118 1.70624 6.96565C2.58847 5.78011 3.82936 4.91054 5.24482 4.48593L18.9894 0.362555ZM30.1271 5.36787C30.1271 4.76032 30.3684 4.17766 30.798 3.74806C31.2276 3.31846 31.8103 3.07711 32.4179 3.07711H39.2901C41.1128 3.07711 42.8608 3.80115 44.1496 5.08996C45.4384 6.37876 46.1624 8.12675 46.1624 9.9494V12.2402C46.1624 12.8477 45.9211 13.4304 45.4915 13.86C45.0619 14.2896 44.4792 14.5309 43.8717 14.5309C43.2641 14.5309 42.6815 14.2896 42.2519 13.86C41.8223 13.4304 41.5809 12.8477 41.5809 12.2402V9.9494C41.5809 9.34185 41.3396 8.75919 40.91 8.32959C40.4804 7.89998 39.8977 7.65864 39.2901 7.65864H32.4179C31.8103 7.65864 31.2276 7.41729 30.798 6.98769C30.3684 6.55809 30.1271 5.97542 30.1271 5.36787ZM43.8717 32.857C44.4792 32.857 45.0619 33.0984 45.4915 33.528C45.9211 33.9576 46.1624 34.5403 46.1624 35.1478V37.4386C46.1624 39.2612 45.4384 41.0092 44.1496 42.298C42.8608 43.5868 41.1128 44.3109 39.2901 44.3109H32.4179C31.8103 44.3109 31.2276 44.0695 30.798 43.6399C30.3684 43.2103 30.1271 42.6276 30.1271 42.0201C30.1271 41.4125 30.3684 40.8299 30.798 40.4003C31.2276 39.9707 31.8103 39.7293 32.4179 39.7293H39.2901C39.8977 39.7293 40.4804 39.488 40.91 39.0584C41.3396 38.6288 41.5809 38.0461 41.5809 37.4386V35.1478C41.5809 34.5403 41.8223 33.9576 42.2519 33.528C42.6815 33.0984 43.2641 32.857 43.8717 32.857ZM16.3825 21.4032C15.775 21.4032 15.1923 21.6446 14.7627 22.0742C14.3331 22.5038 14.0917 23.0864 14.0917 23.694C14.0917 24.3015 14.3331 24.8842 14.7627 25.3138C15.1923 25.7434 15.775 25.9847 16.3825 25.9847H16.3848C16.9924 25.9847 17.575 25.7434 18.0046 25.3138C18.4342 24.8842 18.6756 24.3015 18.6756 23.694C18.6756 23.0864 18.4342 22.5038 18.0046 22.0742C17.575 21.6446 16.9924 21.4032 16.3848 21.4032H16.3825Z"
                      fill="#5F86B6"
                    />
                    <path
                      d="M43.8713 23.6938L39.2898 28.2754M32.4175 23.6938H43.8713H32.4175ZM43.8713 23.6938L39.2898 19.1123L43.8713 23.6938Z"
                      stroke="#3366FF"
                      stroke-width="3.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>
    </>
  );
};

export default Header;