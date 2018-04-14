import { combineReducers } from "redux";
import { sessionReducer, previousPageReducer } from "./session_reducers";
import SocketReducer from "./socket_reducers";
import {
  connectionListReducer,
  messageListReducer
} from "./connection_reducers";

const rootReducer = combineReducers({
  session: sessionReducer,
  socket: SocketReducer
});

export default rootReducer;
