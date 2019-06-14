import axios from "axios";
import { APILIST } from "./config";
import router from "../router";
// import { message } from "ant-design-vue";

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

class Axios {
  constructor(baseUrl) {
    this.instance = null;
    this.init(baseUrl);
  }

  init(baseUrl) {
    this.instance = axios.create({
      baseURL: baseUrl
    });
    // http request 拦截器
    this.instance.interceptors.request.use(
      config => {
        if (window.localStorage.getItem("token") !== "") {
          config.headers.Authorization = window.localStorage.getItem("token");
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );

    // http response 拦截器
    this.instance.interceptors.response.use(
      response => {
        if (response.data.status === "406") {
          router.replace({
            path: "/login"
          });
          // return message.error(response.data.msg);
        }
        return response.data;
      },
      error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 406) {
            console.log("xxxxx406");
            return error;
          }
        }
      }
    );
  }
}
console.log(APILIST.api, "jjjjjjj");
export const apiAxios = new Axios(APILIST.api).instance;
export default {
  Axios,
  apiAxios
};
