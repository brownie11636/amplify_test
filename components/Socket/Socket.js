import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";
import { socketPoint } from "../../toServer/API-AccessPoint";
import React from "react";
const SOCKET_SERVER_URL = socketPoint;


export const socket = socketio.connect('https://192.168.1.26:3333', {
    transports: ["websocket"],
});

export const emitHandler = (event, packet) => {
    console.log('event?', event);
    console.log('packet?', packet);
    
    if (event === 'msg-v1') { // msg-v1 emit Event
        let message = packet.message;
        let destination = packet.destination;
        console.log("send message(emit msg-v1)", message.type, destination);
        let newPacket = { from: socket.id, to: destination, message: message };
        //console.log('Client sending message: ', packet);
        socket.emit(event, newPacket);
    } else { //Common emit Event
        socket.emit(event, packet);
    }  
}

export const onHandelr = () => {
    socket.on('echo', readEcho);

    return;
}

export const readEcho2 = async (payload) => {
    console.log('readEcho2! >>', payload);
    callback
    return payload;
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

