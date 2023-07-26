import React from "react";
import { io } from "socket.io-client";
// import { SOCKET_URL } from "config";

import { PortalCommClient } from "../../libs/portal/portalComm.js";
import { PortalCommClient_v0_1 } from "../../libs/portal/portalComm_v0.1.js";
import { socketPoint, socketPoint_dev, socketNsp } from "../../toServer/API-AccessPoint";

const SOCKET_SERVER_URL = 
  process.env.NODE_ENV==="production"?
  socketPoint:
  socketPoint_dev;
const SOCKET_NSP = socketNsp;

const commClient = new PortalCommClient;

commClient.createSocketIO(SOCKET_SERVER_URL,SOCKET_NSP,{transports:["websocket"]});
commClient.initSocketIO();

const commClientV01 = new PortalCommClient_v0_1;

commClientV01.createSocketIO(SOCKET_SERVER_URL,SOCKET_NSP,{transports:["websocket"]});
commClientV01.initSocketIO();
commClientV01.setMainSocket("/")

const PortalCommContext = React.createContext();

export { commClientV01, commClient, PortalCommContext };






