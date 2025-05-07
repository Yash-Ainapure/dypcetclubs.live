import axios from "axios";
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000",
// https://dypcetclubs-live.onrender.com
//   withCredentials: true,
// });
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
