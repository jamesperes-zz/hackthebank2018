import {
  FETCH_PROFILE_CONNECTION_LIST,
  FETCH_CHAT_MESSAGE_LIST,
} from '../actions/action_types';

export function connectionListReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILE_CONNECTION_LIST: {
      return action.payload.data.data;
    }
    default: {
      return state;
    }
  }
}

export function messageListReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CHAT_MESSAGE_LIST: {
      return action.payload.data.data;
    }
    default: {
      return state;
    }
  }
}
