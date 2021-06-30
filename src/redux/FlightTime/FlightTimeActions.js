import * as api from "../../api/index";
import * as actions from "./FlightTimeTypes";

export const fetchAllFlightTime = () => async (dispatch) => {
  const { data } = await api.fetchAllFlightTime();
  dispatch({
    type: actions.FETCH_ALL_FLIGHT_TIME,
    payload: data,
  });
};

export const createFlightTime = (flightTime) => async (dispatch) => {
  const { data } = await api.createFlightTime(flightTime);
  dispatch({
    type: actions.CREATE_FLIGHT_TIME,
    payload: data,
  });
};

export const deleteFlightTime = (id) => async (dispatch) => {
  await api.deleteFlightTime(id);
  dispatch({
    type: actions.DELETE_FLIGHT_TIME,
    payload: {
      id: id,
    },
  });
};

export const updateFlightTime = (flightTime) => async (dispatch) => {
  await api.updateFlightTime(flightTime.id, flightTime);
  dispatch({
    type: actions.UPDATE_FLIGHT_TIME,
    payload: {
      id: flightTime.id,
      data: flightTime,
    },
  });
};

export const searchFlightTime = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchFlightTime(dataSearch);
  dispatch({
    type: actions.SEARCH_FLIGHT_TIME,
    payload: data,
  });
};
