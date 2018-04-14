import { axiosInstance } from './configured_axios';
import {
  SEND_REQUEST,
  FETCH_SENT_REQUEST_LIST,
  FETCH_RECEIVED_REQUEST_LIST,
  ACCEPT_REQUEST,
  DECLINE_REQUEST,
  FETCH_REQUEST,
  FETCH_INVERSE_REQUEST,
  EMPTY_REQUEST,
} from './action_types';

export function fetchSentRequestList() {
  const request = axiosInstance.get(`/api/requests_sent`);

  return {
    type: FETCH_SENT_REQUEST_LIST,
    payload: request,
  };
}

export function fetchReceivedRequestList() {
  const request = axiosInstance.get(`/api/requests_received`);

  return {
    type: FETCH_RECEIVED_REQUEST_LIST,
    payload: request,
  };
}

export function sendRequest(request) {
  const connectionRequest = axiosInstance.post(`/api/requests`, { request });

  return {
    type: SEND_REQUEST,
    payload: connectionRequest,
  };
}

export function acceptRequest(requestId) {
  const request = axiosInstance.put(`/api/requests/${requestId}`,
    { request: { status: 'Accepted' }}
  );

  return {
    type: ACCEPT_REQUEST,
    payload: request,
  };
}

export function declineRequest(requestId) {
  const request = axiosInstance.put(`/api/requests/${requestId}`,
    { request: { status: 'Declined' }}
  );

  return {
    type: DECLINE_REQUEST,
    payload: request,
  };
}

export function fetchRequest(sender_id, receiver_id) {
  const request = axiosInstance.put(`/api/requests/`, { sender_id, receiver_id });

  return {
    type: FETCH_REQUEST,
    payload: request,
  };
}

export function emptyRequest() {
  return {
    type: EMPTY_REQUEST,
    payload: {},
  };
}

export function fetchInverseRequest(receiver_id, sender_id) {
  const request = axiosInstance.put(`/api/requests/`, { sender_id, receiver_id });

  return {
    type: FETCH_INVERSE_REQUEST,
    payload: request,
  };
}
