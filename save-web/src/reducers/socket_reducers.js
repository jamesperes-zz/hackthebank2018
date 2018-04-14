import {
  CONNECT_SOCKET,
  JOIN_CHAT_SUCCESS,
} from '../actions/action_types';

export default function SocketReducer(state = null, action) {
  switch (action.type) {
    case CONNECT_SOCKET:
    case JOIN_CHAT_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
