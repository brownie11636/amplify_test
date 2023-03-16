import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";
import { socketPoint } from "../../toServer/API-AccessPoint";
import React from "react";
const SOCKET_SERVER_URL = socketPoint;


export const socket = socketio.connect(SOCKET_SERVER_URL, {
    transports: ["websocket"],
});

export const emitHandler = (event) => {
    socket.emit(event, 'hello socket!');
}

export const sendMessage = (message, destination) => {
    console.log("send message(emit msg-v1)", message.type, destination);
    let packet = { from: socket.id, to: destination, message: message };
    //console.log('Client sending message: ', packet);
    socket.emit("msg-v1", packet);
};


export const sendMessage2 = (event) => {
    //do nothing yet
};


export const SocketContext = React.createContext();

