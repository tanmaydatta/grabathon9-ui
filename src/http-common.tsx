import axios from "axios";
import { AxiosInstance } from "axios";

export const HttpClient: AxiosInstance = axios.create({
  baseURL: "https://grab-discover.herokuapp.com",
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

export const HttpFileClient: AxiosInstance = axios.create({
  baseURL: "https://grab-discover.herokuapp.com",
  headers: {
    "Content-type": "multipart/form-data",
  },
});
