import * as api from "../../api/index";
import * as actions from "./PlaceTypes";

export const fetchAllPlace = () => async (dispatch) => {
  const { data } = await api.fetchAllPlace();
  dispatch({
    type: actions.FETCH_ALL_PLACE,
    payload: data,
  });
};

export const createPlace = (place) => async (dispatch) => {
  const { data } = await api.createPlace(place);
  dispatch({
    type: actions.CREATE_PLACE,
    payload: data,
  });
};

export const deletePlace = (id) => async (dispatch) => {
  await api.deletePlace(id);
  dispatch({
    type: actions.DELETE_PLACE,
    payload: {
      id: id,
    },
  });
};

export const updatePlace = (place) => async (dispatch) => {
  await api.updatePlace(place.id, place);
  dispatch({
    type: actions.UPDATE_PLACE,
    payload: {
      id: place.id,
      data: place,
    },
  });
};

export const searchPlace = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchPlace(dataSearch);
  dispatch({
    type: actions.SEARCH_PLACE,
    payload: data,
  });
};

export const totalPlace = () => async (dispatch) => {
  const { data } = await api.totalPlace();
  dispatch({
    type: actions.TOTAL_PLACE,
    payload: data,
  });
};
