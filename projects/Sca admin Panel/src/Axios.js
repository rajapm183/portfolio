import axios from "axios";
import { Logout } from "./views/Log-InOut";


const api = axios.create({ baseURL: "https://api.a1matrimony.in"});
export const baseURL ="https://api.a1matrimony.in"
// const api = axios.create({ baseURL: "http://192.168.29.172:3004"});
// export const baseURL ="http://192.168.29.172:3004"

api.defaults.headers.common["adminauthtoken"] = localStorage.getItem("AuthId");

api.interceptors.response.use(
  (resp) => Promise.resolve(resp),
  (error) => {
    if (error.response) {
      console.log(error.response)
      if (error.response.data.error.code === "Authentication Failed") {
        Logout();
        return Promise.reject(error.message);
      }
      console.log("ErrorResponse", error.response);
      if (typeof error.response.data.error.message === "string")
        return Promise.reject(error.response.data.error.message);
      else return Promise.reject("Failed");
    } else if (error.message) {
      console.log("ErrorMessage", error.message);

      if (typeof error.message === "string")
        return Promise.reject(error.message);
      else return Promise.reject("Failed");
    } else if (error.request) {
      console.log("ErrorRequest", error.request);

      if (typeof error.request === "string")
        return Promise.reject(error.request);
      else return Promise.reject("Failed");
    } else {
      return Promise.reject("Failed");
    }
  }
);

export default api;


// /admin/shop/dashboard --/