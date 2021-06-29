import * as api from "../../api/index";
import * as actions from "./AirportTypes";

export const fetchAllAirport = () => async (dispatch) => {
  const { data } = await api.fetchAllAirport();
  dispatch({
    type: actions.FETCH_ALL_AIRPORT,
    payload: data,
  });
};

export const createAirport = (airport) => async (dispatch) => {
  const { data } = await api.createAirport(airport);
  dispatch({
    type: actions.CREATE_AIRPORT,
    payload: data,
  });
};

export const deleteAirport = (id) => async (dispatch) => {
  await api.deleteAirport(id);
  dispatch({
    type: actions.DELETE_AIRPORT,
    payload: {
      id: id,
    },
  });
};

export const updateAirport = (airport) => async (dispatch) => {
  await api.updateAirport(airport.id, airport);
  dispatch({
    type: actions.UPDATE_AIRPORT,
    payload: {
      id: airport.id,
      data: airport,
    },
  });
};

export const searchAirport = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchAirport(dataSearch);
  dispatch({
    type: actions.SEARCH_AIRPORT,
    payload: data,
  });
};
