import { User } from "../general/types";

export const selectUser = (state): User => {
  return state.auth;
};
