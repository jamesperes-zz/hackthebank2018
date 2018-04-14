import { Socket } from 'phoenix';
import { SOCKET_URL } from './root_url';
import { CONNECT_SOCKET } from './action_types';

export function connectSocket(jwt) {
  const socket = new Socket(SOCKET_URL, {
    params: { token: jwt },
    logger: (kind, msg, data) => {
      console.log(`${kind}: ${msg}`, data);
    },
  });

  socket.connect();

  return {
    type: CONNECT_SOCKET,
    payload: socket,
  };
}
