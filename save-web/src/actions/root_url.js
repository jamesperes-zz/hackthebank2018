const useTLS = process.env.REACT_APP_USE_TLS === "true";
const domain = process.env.REACT_APP_DOMAIN;

const protocol = useTLS ? "https" : "http";
const websocketProtocol = useTLS ? "wss" : "ws";

// const ROOT_URL = `${protocol}://api.${domain}`;
const ROOT_DOMAIN = "jamesperes.com.br";
const ROOT_URL = `http://${ROOT_DOMAIN}`;

export default ROOT_URL;
// export const SOCKET_URL = `${websocketProtocol}://api.${domain}/socket`;

export const SOCKET_URL = `ws://${ROOT_DOMAIN}/socket`;
