import React from "react";
import { io } from "socket.io-client";
// import { SOCKET_URL } from "config";

import { PortalCommClient } from "../../libs/portal/portalComm.js";
import { socketPoint, socketPoint_dev, socketNsp } from "../../toServer/API-AccessPoint";

const SOCKET_SERVER_URL = socketPoint_dev;
const SOCKET_NSP = socketNsp;

const commClient = new PortalCommClient;

commClient.createSocketIO(SOCKET_SERVER_URL,SOCKET_NSP,{transports:["websocket"]});
commClient.initSocketIO();


const PortalCommContext = React.createContext();

export { commClient, PortalCommContext };






