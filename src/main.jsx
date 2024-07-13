import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer />
      <App />
      <ScrollToTop />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
