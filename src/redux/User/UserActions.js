import * as api from "../../api/index";
import * as actions from "./UserTypes";

export const fetchAllUser = () => async (dispatch) => {
  const { data } = await api.fetchAllUser();
  dispatch({
    type: actions.FETCH_ALL_USER,
    payload: data,
  });
};

export const createUser = (user) => async (dispatch) => {
  const { data } = await api.createUser(user);
  dispatch({
    type: actions.CREATE_USER,
    payload: data,
  });
};

export const deleteUser = (id) => async (dispatch) => {
  await api.deleteUser(id);
  dispatch({
    type: actions.DELETE_USER,
    payload: {
      id: id,
    },
  });
};

export const updateUser = (user) => async (dispatch) => {
  await api.updateUser(user.id, user);
  dispatch({
    type: actions.UPDATE_USER,
    payload: {
      id: user.id,
      data: user,
    },
  });
};

export const searchUser = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchUser(dataSearch);
  dispatch({
    type: actions.SEARCH_USER,
    payload: data,
  });
};

export const loginUser = (dataLogin) => async (dispatch) => {
  const { data } = await api.loginUser(dataLogin);
  dispatch({
    type: actions.LOGIN_USER,
    payload: data,
  });
};

export const totalUser = () => async (dispatch) => {
  const { data } = await api.totalUser();
  dispatch({
    type: actions.TOTAL_USER,
    payload: data,
  });
};
