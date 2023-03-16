

import { socket } from "../../components/Socket/Socket";

export const MyRTC = {
    myid : function myid(payload) {
        console.log('myid?!---------- >>', socket.id);
        return socket.id;
    },

    readEcho (payload) {
        console.log('readEcho2! >>', payload);
        socket.emit('echo', 'fuck!');
    },
    
    emitHandler(event, packet) {
        console.log('RTCemit event?', event);
        console.log('RTCemit packet?', packet);
        console.log('what?');

        if (event === 'msg-v1') { // msg-v1 emit Event
            let message = packet.message;
            let destination = packet.destination;
            console.log("send message(emit msg-v1)", message.type, destination);
            let newPacket = { from: socket.id, to: destination, message: message };
            //console.log('Client sending message: ', packet);
            socket.emit(event, newPacket);
        } else if (event === 'q_service') {

            let servicelistREQ = new Array({
                header: "ServiceList",
                filter: {},
            })

            socket.emit(event, servicelistREQ)

        } else { //Common emit Event
            socket.emit(event, packet);
        }
    },

    async onHandler (event, newPacket) {
        console.log('RTCon event? >>', event);
        console.log('RTCon packet >>', newPacket);

        let packet = newPacket.packet;
        let pcRef = newPacket.pcRef
        let remoteVideoRef = newPacket.remoteVideo;


        if (event === 'msg-v1') {

            console.log('------------------msg-v1 ', packet.message.type, '-------------------');
            let message = packet.message;
            console.log('msg from', packet.from);
            console.log('Client received message:', message);

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
                } else if (message.type === 'convey stream') {
                    // console.log('convey stream. stream? >>', message);
                    // remoteVideoRef.current.srcObject = BSON.deserialize(message.stream);
                }
            } catch (e) {
                console.log('error!\ncomponent : WebRTC \nfunction : RTConHandler in msg-v1\n', e);
            }

        } else if (event === 'q_result') {

        } else {
            //join, joined, .. etc.
        }

    }

};