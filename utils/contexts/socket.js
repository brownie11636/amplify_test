import { io } from "socket.io-client";
// import { SOCKET_URL } from "config";
import { socketPoint } from "../../toServer/API-AccessPoint";
import React from "react";

const SOCKET_SERVER_URL = socketPoint;


export const socket = io.connect(SOCKET_SERVER_URL, {
    transports: ["websocket"],
    path: "portalComm_v0",
});

export const SocketContext = React.createContext();