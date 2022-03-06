import { ActionTypes } from "./ActionTypes";
import { User } from "../general/types";

export const setToken = (token: string) => {
  return {
    type: ActionTypes.SET_LOGIN_TOKEN,
    token,
  };
};

export const setUser = (user: User) => {
  return {
    type: ActionTypes.SET_USER,
    user,
  };
};

export const createUser = (user: User) => {
  return {
    type: ActionTypes.REGISTER_USER,
    user,
  };
};

export const deleteUser = () => {
  return {
    type: ActionTypes.DELETE_USER,
  };
};
