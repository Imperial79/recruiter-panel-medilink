import axios from "axios";

export const baseUrl = "https://vedicpetsclinic.com/probo/api";

export const dbObject = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});
