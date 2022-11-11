import axios from "axios";

export const axiosPrivate = axios.create();
export const axiosPublic = axios.create();
axiosPublic.defaults.timeout = 5000;
axiosPrivate.defaults.headers.common["Content-Type"] = "application/json";
