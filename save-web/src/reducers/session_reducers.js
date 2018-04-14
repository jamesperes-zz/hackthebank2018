import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_ERROR,
  PREVIOUS_PAGE
} from "../actions/action_types";

export function sessionReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER: {
      return { data: action.payload.data, error: false };
    }
    case LOGIN_ERROR: {
      return { data: {}, error: action.payload.response.data };
    }
    case REGISTER_ERROR: {
      return { data: {}, error: true };
    }
    case LOGOUT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function previousPageReducer(state = "", action) {
  switch (action.type) {
    case PREVIOUS_PAGE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
