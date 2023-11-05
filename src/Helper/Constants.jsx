import axios from "axios";

export const baseUrl = "https://recruiter-api.shapon.tech";

export const dbObject = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});
