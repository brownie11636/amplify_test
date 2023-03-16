import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import { SocketContext } from "../Socket/Socket";
import { RTC } from '../Socket/EventHandler';

const pc_config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

//socket 관련 동작을 통합함. (emitHandler, onHandler < EventHandler.js 참고)
//edit by joonik 01.02.2023

export const RemoteMy = (props) => {
    const socket = useContext(SocketContext);

    const socketFrom = useRef(undefined);
    const pcRef = useRef();
    const dataChannelRef = useRef(undefined);
    
    // RemoteVideoPanel.jsx 로부터 전달받은 비디오를 remoteVideoRef에 등록. 해당 변수는 시그널링 과정에 사용된 후 다시 RemoteVideoPanel.jsx로 전달된다.
    const remoteVideoRef = useRef(props.stream);

    const [targetProfile, setTargetProfile] = useState({});
    const [profileList, setProfileList] = useState([]);
    const stampRef = useRef();

    // RemoteVideoPanel.jsx로 stream 전달
    const setStream = (stream) => { 
        props.setStream(stream);
    } 

    const handleSelect = (e) => {
        setTargetProfile(e.target.value)
    };

    function handleRemoteStreamAdded(event) {
        console.log("Remote stream added. event.stream?>>>", event.stream);
        remoteVideoRef.current.srcObject = event.stream;
        setStream(remoteVideoRef.current);
    }

    useEffect(()=> {
        remoteVideoRef.current = props.stream;
    }, [props.stream]);

    useEffect(() => {

        pcRef.current = new RTCPeerConnection(pc_config, {optional: [{
            RtpDataChannels: true
        }]});
        dataChannelRef.current = pcRef.current.createDataChannel('data') // create data channel (receive?)
        // dataChannelRef.current.onopen = (event) => {
        //     channel.send('Hi!');
        // }
        dataChannelRef.current.addEventListener('msg', event => {
            const msg = event.data;
            console.log('(DATACHANNEL) receive msg >>', msg);
        });

        RTC.emitHandler('q_service');

        socket.on('msg-v2', async function (packet) {
            socketFrom.current = packet.from;


            if (typeof(packet.message) !== 'object') {
                packet.message = JSON.parse(packet.message)
            }
            const newPacket = { 'packet' : packet, 'pcRef' : pcRef.current, 'remoteVideo' : remoteVideoRef.current }
            const setting = await RTC.onHandler('msg-v1', newPacket);

            if (setting !== undefined) {
                console.log('RTConHandler return value (setting) >> ', setting);
                pcRef.current = setting.pcRef;
                remoteVideoRef.current = setting.remoteVideoRef; // 프로미스 구문으로 해결해야함.. 싯팔..
                setStream(remoteVideoRef.current);
            }
        });

        socket.on('msg-v1', async (packet) => {
            console.log('------------------msg-v1 ', packet ,'-------------------');
            if (typeof(packet.message) !== 'object') {
                packet.message = JSON.parse(packet.message)
            }
            let message = packet.message;
            console.log('msg from:', packet.from);
            console.log('Client received message:', message);
            socketFrom.current = packet.from;
            

            try{
              if (message === 'connection request') {
                //console.log('check : connection request');      
              } else if (message.type === 'offer') {
                //console.log('check : connection request');      
              } else if (message.type === 'answer') {
                if (!pcRef.current) return;
                console.log('signalingStat', pcRef.current.signalingState);
                if(pcRef.current.signalingState !== 'stable') {
                  pcRef.current.setRemoteDescription(new RTCSessionDescription(message));
                  pcRef.current.onaddstream = handleRemoteStreamAdded;
                }

              } else if (message.type === 'candidate') {
                let candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate
                  });
                  pcRef.current.addIceCandidate(candidate);
                  // let candidate = new RTCIceCandidate({
                //   sdpMLineIndex: message.label,
                //   candidate: message.candidate
                // });
                // pcRef.current.addIceCandidate(candidate);
              } else if (message === 'bye') {
              }
    
            }catch(e){
              console.log('error', e);
            }
        });

        socket.on('q_result', async function (packet) {
            let list = await RTC.onHandler('q_result', packet);
            setProfileList(list);
        });

        socket.on("joined", async function (packet) {
            console.log("joined!");
            
            // try {
            //     // const sdp = await pcRef.current.createOffer({
            //     //     offerToReceiveAudio: true,
            //     //     offerToReceiveVideo: true,
            //     // });
            //     // await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
            //     const sdp = await pcRef.current.createOffer();
            //     await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
            //     RTC.emitHandler('msg-v1', { 'message': sdp, 'destination': stampRef.current.sid });
            //     socketFrom.current = stampRef.current.sid;
            // } catch (e) {
            //     console.error('Err in createOffer Function >>', e);
            // }
    
    
        });

        socket.on("connection response", async function (packet) {
            console.log("connection response");
            
            try {
                // const sdp = await pcRef.current.createOffer({
                //     offerToReceiveAudio: true,
                //     offerToReceiveVideo: true,
                // });
                // await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
                const sdp = await pcRef.current.createOffer();
                await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
                RTC.emitHandler('msg-v1', { 'message': sdp, 'destination': stampRef.current.sid });
                socketFrom.current = stampRef.current.sid;
            } catch (e) {
                console.error('Err in createOffer Function >>', e);
            }
    
        });

        

        socket.on('join', function (room) {
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
        });

    }, [socket]);

    const createOffer = async () => {
        let selectedProfile = profileList.find(function (data) {
            return data.sid === targetProfile;
        });

        console.log(selectedProfile, targetProfile);
        stampRef.current = selectedProfile;


        console.log("create offer & send offer to ", selectedProfile.sid);
        RTC.emitHandler('Join_Service', selectedProfile.sid);
        //RTC.emitHandler('connection request', selectedProfile.sid);
        //RTC.emitHandler('msg-v1', { 'message': 'connection request', 'destination': selectedProfile.sid });
        console.log("send message(emit msg-v1)", message, destination);
        let packet = { from: socket.id, to: selectedProfile.sid, message: 'connection request' };
        //console.log('Client sending message: ', packet);
        socket.emit("msg-v1", packet);
    

        // try {
        //     // const sdp = await pcRef.current.createOffer({
        //     //     offerToReceiveAudio: true,
        //     //     offerToReceiveVideo: true,
        //     // });
        //     // await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
        //     const sdp = await pcRef.current.createOffer();
        //     await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
        //     RTC.emitHandler('msg-v1', { 'message': sdp, 'destination': stampRef.current.sid });
        //     socketFrom.current = stampRef.current.sid;
        // } catch (e) {
        //     console.error('Err in createOffer Function >>', e);
        // }


        // try {
        //     // const sdp = await pcRef.current.createOffer({
        //     //     offerToReceiveAudio: true,
        //     //     offerToReceiveVideo: true,
        //     // });
        //     // await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
        //     const sdp = await pcRef.current.createOffer();
        //     await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
        //     RTC.emitHandler('msg-v1', { 'message': sdp, 'destination': selectedProfile.sid });
        //     socketFrom.current = selectedProfile.sid;
        // } catch (e) {
        //     console.error('Err in createOffer Function >>', e);
        // }
    };

    const check = () => {
        console.log('connection state?', pcRef.current.connectionState);
        console.log('datachannel state?', dataChannelRef.current.readyState);
    }



    return (
        <>
            <div className="col-md-4">
                <select className="form-control" style={{ width: '400px' }} onChange={handleSelect} value={targetProfile}>
                        {profileList.map((item) => (
                        <option value={item.sid} key={item.sid}>
                            {item.sid}
                        </option>
                    ))}
                </select>
            </div>

            <button type="button" className="btn btn-primary" onClick={createOffer}>Join Streaming</button>
            <button type="button" className='btn btn-primary' onClick={check}>Check connecting state</button>
        </>
    );
}

export default RemoteMy;
