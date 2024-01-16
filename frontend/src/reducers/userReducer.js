import { FETCH_USERS_SUCCESS } from "../actions/types";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default userReducer;
