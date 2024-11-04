import axios from "axios";
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// });
const axiosInstance = axios.create({
  baseURL: "https://dypcetclubs-live.onrender.com",
});
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
