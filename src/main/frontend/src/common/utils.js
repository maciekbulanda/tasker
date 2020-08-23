import axios from "axios";

export const baseUrl = "http://localhost:8080";
export const myAxios = axios.create({
    baseURL: baseUrl
});

