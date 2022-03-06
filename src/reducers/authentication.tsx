import { ActionTypes } from "../actions/ActionTypes";

const initialState = {
  token: null,
  firstName: "",
  lastName: "",
  mail: "",
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_LOGIN_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        ...action.user,
      };
    case ActionTypes.DELETE_USER:
      return {
        token: null,
        firstName: null,
        lastName: null,
        mail: null,
      };
    case ActionTypes.REGISTER_USER:
      return {
        ...state,
        ...action.user,
      };
    default:
      return { ...state };
  }
};
export default authReducer;
