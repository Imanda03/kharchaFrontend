import axios from "axios";

export const cancelTokenSource = axios.CancelToken.source();

export const host = "http://localhost:8000";
const baseURL = host + "/api/v1/";
const AxiosInstance = axios.create({
  baseURL: baseURL,
  // cancelToken: cancelTokenSource.token,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// const handleCancelRequest = () => {
//   cancelTokenSource.cancel("Redundant request was canceled!");
// };

const refreshPath = "auth/token/refresh/";

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "JWT " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === refreshPath) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      alert("Session Expired! Please Login Again!");
      window.location.pathname = "/login";
      // return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return AxiosInstance.post("auth/token/refresh/").then((res) => {
        if (res.status === 200) {
          let new_token = res.data.access;
          localStorage.setItem("access_token", new_token);
          originalRequest.headers["Authorization"] = "JWT " + new_token;
          return AxiosInstance(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
