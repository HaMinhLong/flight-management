import * as api from "../../api/index";
import * as actions from "./StatisticalTypes";

export const totalFlightByPlaceDeparture = () => async (dispatch) => {
  const { data } = await api.totalFlightByPlaceDeparture();
  dispatch({
    type: actions.TOTAL_FLIGHT_BY_PLACE_DEPARTURE,
    payload: data,
  });
};

export const totalFlightByPlaceDestination = () => async (dispatch) => {
  const { data } = await api.totalFlightByPlaceDestination();
  dispatch({
    type: actions.TOTAL_FLIGHT_BY_PLACE_DESTINATION,
    payload: data,
  });
};

export const totalFlightByType = () => async (dispatch) => {
  const { data } = await api.totalFlightByType();
  dispatch({
    type: actions.TOTAL_FLIGHT_BY_TYPE,
    payload: data,
  });
};

export const totalFlightByAirport = () => async (dispatch) => {
  const { data } = await api.totalFlightByAirport();
  dispatch({
    type: actions.TOTAL_FLIGHT_BY_AIRPORT,
    payload: data,
  });
};
