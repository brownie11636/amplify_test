

import { socket } from "./Socket";


function handleRemoteStreamAdded(event) {
    console.log("Remote stream added. event.stream?>>>", event.stream);
}

export const RTC = {

    myid: function myid(payload) {
        console.log('myid?!---------- >>', socket.id);
        return socket.id;
    },

    readEcho(payload) {
        console.log('readEcho2! >>', payload);
        socket.emit('echo', 'fuck!');
    },

    emitHandler(event, packet) {
        console.log('RTCemit event?', event);
        console.log('RTCemit packet?', packet);

        if (event === 'msg-v1') { // msg-v1 emit Event
            let message = packet.message;
            let destination = packet.destination;
            console.log("send message(emit msg-v1)", message.type, destination);
            let newPacket = { from: socket.id, to: destination, message: message };
            //console.log('Client sending message: ', packet);
            socket.emit(event, newPacket);
        }
        else if (event === 'q_service') {
            const q_serviceFORMAT = new Array({
                header: "ServiceList",
                filter: {},
            })

            socket.emit("q_service", q_serviceFORMAT);

        }
        else { //Common emit Event
            socket.emit(event, packet);
        }
    },

    async onHandler(event, newPacket) {
        console.log('RTCon event? >>', event);
        console.log('RTCon packet >>', newPacket);

        let packet = newPacket.packet;
        let pcRef = newPacket.pcRef
        let remoteVideoRef = newPacket.remoteVideo;

        if (event === 'msg-v1') {

            console.log('------------------msg-v1 ', packet.message.type, '-------------------');
            let message = packet.message;
            // console.log('msg from', packet.from);
            // console.log('Client received message:', message);
            try {
                if (message === 'connection request') {
                    console.log('check : connection request');
                } else if (message.type === 'offer') {
                    console.log('Viewer just do nothing in this msg type!');
                    return undefined;
                } else if (message.type === 'answer') {

                    if (!pcRef) return undefined;
                    console.log('signalingStat', pcRef.signalingState);
                    if (pcRef.signalingState !== 'stable') {
                        console.log('set the pcRef : ', pcRef);
                        pcRef.setRemoteDescription(new RTCSessionDescription(message));
                        pcRef.onaddstream = handleRemoteStreamAdded;
                    }
                    pcRef.ontrack = (ev) => {
                        console.log("add remotetrack success>>", remoteVideoRef);
                        if (remoteVideoRef) {
                            remoteVideoRef.srcObject = ev.streams[0];
                            console.log('src??>>', remoteVideoRef.srcObject);
                        }
                    };

                    const setting = {
                        'pcRef': pcRef,
                        'remoteVideoRef': remoteVideoRef,
                    }

                    return setting;

                } else if (message.type === 'candidate') {
                    return undefined;
                }
            } catch (e) {
                console.log('error!\nSocket/EventHandler \nfunction : RTConHandler in msg-v1\n', e);
            }

        } else if (event === 'q_result') {

            let packet = newPacket;

            const qres = JSON.parse(packet);

            if (qres.header === 'ServiceList') {
                console.log('list >>', qres.data);
                return qres.data;
            }

        } else {
            //join, joined, .. etc.
        }

    }
};


export const XR = {


    readEcho(payload) {
        console.log('readEcho2! >>', payload);
        socket.emit('echo', 'fuck!');
    },

    emitHandler(event, packet) {
        console.log('RTCemit event?', event);
        console.log('RTCemit packet?', packet);

        if (event === 'msg-v2') { // msg-v2 emit Event
            let message = packet.message;
            let destination = packet.destination;
            console.log("send message(emit msg-v1)", message.type, destination);
            let newPacket = { from: socket.id, to: destination, message: message };
            //console.log('Client sending message: ', packet);
            socket.emit(event, newPacket);
        }
        else if (event === 'q_service') {
            const q_serviceFORMAT = new Array({
                header: "ServiceList",
                filter: {},
            })

            socket.emit("q_service", q_serviceFORMAT);

        }
        else { //Common emit Event
            console.log('RTCemit event?', event);
            console.log('RTCemit packet?', packet);
            socket.emit(event, packet);
        }
    },

};