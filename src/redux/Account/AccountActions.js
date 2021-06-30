import * as api from "../../api/index";
import * as actions from "./AccountTypes";

export const fetchAllAccount = () => async (dispatch) => {
  const { data } = await api.fetchAllAccount();
  dispatch({
    type: actions.FETCH_ALL_ACCOUNT,
    payload: data,
  });
};

export const createAccount = (account) => async (dispatch) => {
  const { data } = await api.createAccount(account);
  dispatch({
    type: actions.CREATE_ACCOUNT,
    payload: data,
  });
};

export const deleteAccount = (id) => async (dispatch) => {
  await api.deleteAccount(id);
  dispatch({
    type: actions.DELETE_ACCOUNT,
    payload: {
      id: id,
    },
  });
};

export const updateAccount = (account) => async (dispatch) => {
  await api.updateAccount(account.id, account);
  dispatch({
    type: actions.UPDATE_ACCOUNT,
    payload: {
      id: account.id,
      data: account,
    },
  });
};

export const searchAccount = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchAccount(dataSearch);
  dispatch({
    type: actions.SEARCH_ACCOUNT,
    payload: data,
  });
};
