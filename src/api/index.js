import axios from "axios";
const url = "http://127.0.0.1:8081/api";

export const fetchAllFlight = () => axios.get(`${url}/flight`);
export const createFlight = (data) => axios.post(`${url}/flight`, data);
export const deleteFlight = (id) => axios.delete(`${url}/flight/${id}`);
export const updateFlight = (id, data) =>
  axios.put(`${url}/flight/${id}`, data);
export const searchFlight = (dataSearch) =>
  axios.post(`${url}/flight/search`, dataSearch);
