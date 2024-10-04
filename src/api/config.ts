import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://api-tsg-8f6ff7a19420.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
