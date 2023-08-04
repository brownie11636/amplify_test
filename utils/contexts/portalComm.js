import React from "react";
import { io } from "socket.io-client";
// import { SOCKET_URL } from "config";

import { PortalCommClient } from "../../libs/portal/portalComm.js";
import { PortalCommClient_v0_1 } from "../../libs/portal/portalComm_v0.1.js";
import { socketPoint, socketPoint_dev, socketNsp } from "../../toServer/API-AccessPoint";

const SOCKET_SERVER_URL = socketPoint
// const SOCKET_SERVER_URL = socketPoint_dev;

const SOCKET_NSP = socketNsp;

const commClient = new PortalCommClient;

commClient.createSocketIO(SOCKET_SERVER_URL,SOCKET_NSP,{transports:["websocket"]});
commClient.initSocketIO();
console.log("portalComm.js V00 initSocketIO")
const commClientV01 = new PortalCommClient_v0_1;

commClientV01.createSocketIO(SOCKET_SERVER_URL,SOCKET_NSP,{transports:["websocket"]});
commClientV01.initSocketIO();
commClientV01.setMainSocket("/")
console.log("portalComm.js V01 initSocketIO")

const PortalCommContext = React.createContext();

export { commClientV01, commClient, PortalCommContext };






