"use strict"

//import { Signaling } from "./signaling.js"

/*

*/
export function registerWebrtcEvents(socket) {

  //type: "offer", "answer" 
  /*
  socket.on("webrtc:signaling", async (target, signal) => {
    // signalPacket.response //메세지 받은 쪽에서 전달이 잘 되었다고 확인해주는 메세지
    target
    signal.type
    signal.senderId
    let reply = await Signaling.getPacket(type, signal);
    //reply = {message:message, destination:destination}
    // sendToPeer(reply.message, reply.destination, );
    socket.in().emit("webrtc:signaling", type, signal);
  });
  */
};

// module.exports = {registerWebrtcEvents};