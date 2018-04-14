import axios from 'axios';
import { Socket } from 'phoenix';
import ROOT_URL, { SOCKET_URL } from './root_url';
import cookie from 'react-cookies';

const axiosUploadConfig = {
  baseURL: ROOT_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
};

export const axiosUploadInstance = axios.create(axiosUploadConfig);

const axiosConfig = {
  baseURL: ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
  }
};

export const axiosInstance = axios.create(axiosConfig);


const jwt = cookie.load('jwt');
if (jwt) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}


export const socket = new Socket(SOCKET_URL, {
  params: { token: jwt },
  logger: (kind, msg, data) => {
    console.log(`${kind}: ${msg}`, data);
  },
});
socket.connect();
