import axios from "axios";
const url = "http://127.0.0.1:8081/api";

// FLIGHT MANAGEMENT
export const fetchAllFlight = () => axios.get(`${url}/flight`);
export const createFlight = (data) => axios.post(`${url}/flight`, data);
export const deleteFlight = (id) => axios.delete(`${url}/flight/${id}`);
export const updateFlight = (id, data) =>
  axios.put(`${url}/flight/${id}`, data);
export const searchFlight = (dataSearch) =>
  axios.post(`${url}/flight/search`, dataSearch);

// PLACE MANAGEMENT
export const fetchAllPlace = () => axios.get(`${url}/place`);
export const createPlace = (data) => axios.post(`${url}/place`, data);
export const deletePlace = (id) => axios.delete(`${url}/place/${id}`);
export const updatePlace = (id, data) => axios.put(`${url}/place/${id}`, data);
export const searchPlace = (dataSearch) =>
  axios.post(`${url}/place/search`, dataSearch);

// AIRPORT MANAGEMENT
export const fetchAllAirport = () => axios.get(`${url}/airport`);
export const createAirport = (data) => axios.post(`${url}/airport`, data);
export const deleteAirport = (id) => axios.delete(`${url}/airport/${id}`);
export const updateAirport = (id, data) =>
  axios.put(`${url}/airport/${id}`, data);
export const searchAirport = (dataSearch) =>
  axios.post(`${url}/airport/search`, dataSearch);

// FLIGHT TIME MANAGEMENT
export const fetchAllFlightTime = () => axios.get(`${url}/flightTime`);
export const createFlightTime = (data) => axios.post(`${url}/flightTime`, data);
export const deleteFlightTime = (id) => axios.delete(`${url}/flightTime/${id}`);
export const updateFlightTime = (id, data) =>
  axios.put(`${url}/flightTime/${id}`, data);
export const searchFlightTime = (dataSearch) =>
  axios.post(`${url}/flightTime/search`, dataSearch);
