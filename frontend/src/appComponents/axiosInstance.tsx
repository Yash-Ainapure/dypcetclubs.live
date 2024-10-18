import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});
// const axiosInstance = axios.create({
//   baseURL: "https://dypcetclubs-live.onrender.com",
// });

export default axiosInstance;

