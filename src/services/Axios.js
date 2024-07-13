import axios from "axios";
import URLS from "./URLS";

const API_URL = URLS.API_URL;
class Axios {
  defaultOptions = () => {
    if (typeof window === "undefined") {
      return {
        baseURL: `${API_URL}`,
        headers: {
          token: "",
          customerid: "",
        },
      };
    }
    return {
      baseURL: `${API_URL}`,
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token") || "",
      },
    };
  };

  LogoutUser = (url) => {
    if (url?.response !== undefined && url?.response?.status === 401) {
      // console.log(url.response.status, "401 Unauthorized Api Call");
      localStorage.clear();
      window.location.replace("/");
    } else {
      // console.log(url, "401 Unauthorized Api Call");
    }
  };

  get = (url, options = {}) => {
    return axios
      .get(url, { ...this.defaultOptions(), ...options })
      .then((res) => {
        if (res.data.message && res.data.message.includes("You are not Authorized")) {
          let err = {
            response: {
              status: 401,
            },
          };
          this.LogoutUser(err);
        } else {
          return res;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          this.LogoutUser(err);
          return err;
        } else {
          return err;
        }
      });
  };

  post = (url, data, options = {}) => {
    return axios
      .post(url, data, { ...this.defaultOptions(), ...options })
      .then((res) => {
        if (res.data.message && res.data.message.includes("You are not Authorized")) {
          let err = {
            response: {
              status: 401,
            },
          };
          this.LogoutUser(err);
        } else {
          return res;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          this.LogoutUser(err);
          return err;
        } else {
          return err;
        }
      });
  };

  put = (url, data, options = {}) => {
    return axios
      .put(url, data, { ...this.defaultOptions(), ...options })
      .then((res) => {
        if (res.data.message && res.data.message.includes("You are not Authorized")) {
          let err = {
            response: {
              status: 401,
            },
          };
          this.LogoutUser(err);
        } else {
          return res;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          this.LogoutUser(err);
          return err;
        } else {
          return err;
        }
      });
  };

  delete = (url, options = {}) => {
    return axios
      .delete(url, { ...this.defaultOptions(), ...options })
      .then((res) => {
        if (res.data.message && res.data.message.includes("You are not Authorized")) {
          let err = {
            response: {
              status: 401,
            },
          };
          this.LogoutUser(err);
        } else {
          return res;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          this.LogoutUser(err);
          return err;
        } else {
          return err;
        }
      });
  };
}

export default new Axios();
