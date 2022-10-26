import React, { useEffect, useRef, useState } from 'react';
import { Device } from 'mediasoup-client';
import io from 'socket.io-client';
import { MediaSoupSocketPoint } from "../../toServer/API-AccessPoint";
import Header from '../../components/Layouts/Header';
import PageBanner from '../../components/Common/PageBanner';
import Footer from '../../components/Layouts/Footer';

function Subscribe(props) {
    const remoteVideo = useRef();
    const localStream = useRef();
    const clientId = useRef();
    const device = useRef();
    const consumerTransport = useRef();
    const videoConsumer = useRef();
    const audioConsumer = useRef();
    const socketRef = useRef();

    //const selected = useRef();
    const [selected, setSelected] = useState("");
    const serviceList = useRef();
    const [selectList, setSelectList] = useState([]);

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {

        connectSocket();
        async function firstCallList() {
            const { allRouters } = await sendRequest('serviceList',{})
            console.log('allrouters?', allRouters);
            listUpdate(allRouters);
        }
        firstCallList();

    }, [])

    function listUpdate(list) {
        console.log('list Update...');
        // selectList = serviceList

        // for (const [key, value] of Object.entries(Object(serviceList))) {
        //     console.log(`${key}: ${value.socketid}`);
        //       let option = document.createElement('option');
        //       option.innerText = value.socketid+':StreamerID';
        //       //option.innerText = value.socketId+':'+value.service.description;
        //       option.value = value.socketid;
        //       SltServiceList.append(option);
        //setServiceList(qres.data);
        serviceList.current = list;
        let nextList = selectList;
        for (const [key, value] of Object.entries(Object(serviceList.current))) {
            //console.log('list set up log',`${key}:${value.sid}`);
            nextList = nextList.concat(`${key}:${value.socketid}`);
        }
        setSelectList(nextList);

    }

    const handleSelect = (e) => {
        console.log('handleSelected? >>', e.target.value);
        setSelected(e.target.value);
    };


    // return Promise
    function playVideo(element, stream) {
        if (element.srcObject) {
            console.warn('element ALREADY playing, so ignore');
            return;
        }
        element.srcObject = stream;
        element.volume = 0;
        remoteVideo.current = element;
        console.log('playVideo');
        console.log(remoteVideo);   
        return element.play();
    }

    function pauseVideo(element) {
        element.pause();
        element.srcObject = null;
    }

    function addRemoteTrack(id, track) {
        let video = remoteVideo.current;

        if (video.srcObject) {
            video.srcObject.addTrack(track);
            return;
        }

        const newStream = new MediaStream();
        newStream.addTrack(track);
        playVideo(video, newStream)
            .then(() => {
                video.volume = 1.0;
            })
            .catch((err) => {
                console.error('media ERROR:', err);
            });
    }

    // ============ UI button ==========

    async function handleSubscribe() {
        //if (!socketRef.current) {
        // await connectSocket().catch((err) => {
        //     console.error(err);
        //     return;
        // });
        // }

        const socketid = selected;


        // --- get capabilities --
        const data = await sendRequest('getRouterRtpCapabilities', socketid);
        console.log('getRouterRtpCapabilities:', data);
        await loadDevice(data);
        // }

        // --- prepare transport ---
        console.log('--- createConsumerTransport --');
        const params = await sendRequest('createConsumerTransport', {socketid : socketid});
        console.log('transport params:', params);
        consumerTransport.current = device.current.createRecvTransport(params);
        console.log('createConsumerTransport:', consumerTransport);

        // --- NG ---
        //sendRequest('connectConsumerTransport', { dtlsParameters: dtlsParameters })
        //  .then(callback)
        //  .catch(errback);

        // --- try --- not well
        //sendRequest('connectConsumerTransport', { dtlsParameters: params.dtlsParameters })
        //  .then(() => console.log('connectConsumerTransport OK'))
        //  .catch(err => console.error('connectConsumerTransport ERROR:', err));

        // --- join & start publish --
        consumerTransport.current.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
                console.log('--consumer trasnport connect');
                sendRequest('connectConsumerTransport', {
                    dtlsParameters: dtlsParameters,
                })
                    .then(callback)
                    .catch(errback);

                //consumer = await consumeAndResume(consumerTransport);
            }
        );

        consumerTransport.current.on('connectionstatechange', (state) => {
            switch (state) {
                case 'connecting':
                    console.log('subscribing...');
                    break;

                case 'connected':
                    console.log('subscribed');
                    setIsSubscribed(true);
                    break;

                case 'failed':
                    console.log('failed');
                    consumerTransport.current.close();
                    break;

                default:
                    break;
            }
        });

        videoConsumer.current = await consumeAndResume(
            consumerTransport.current,
            'video'
        );
        audioConsumer.current = await consumeAndResume(
            consumerTransport.current,
            'audio'
        );
    }

    async function consumeAndResume(transport, kind) {
        const consumer = await consume(transport, kind);
        if (consumer) {
            console.log('-- track exist, consumer ready. kind=' + kind);

            if (kind === 'video') {
                console.log('-- resume kind=' + kind);
                sendRequest('resume', { kind: kind })
                    .then(() => {
                        console.log('resume OK');
                        return consumer;
                    })
                    .catch((err) => {
                        console.error('resume ERROR:', err);
                        return consumer;
                    });
            } else {
                console.log('-- do not resume kind=' + kind);
            }
        } else {
            console.log('-- no consumer yet. kind=' + kind);
            return null;
        }
    }

    function handleDisconnect() {
        if (videoConsumer.current) {
            videoConsumer.current.close();
            videoConsumer.current = null;
        }
        if (audioConsumer.current) {
            audioConsumer.current.close();
            audioConsumer.current = null;
        }
        if (consumerTransport.current) {
            consumerTransport.current.close();
            consumerTransport.current = null;
        }

        removeAllRemoteVideo();

        disconnectSocket();
        setIsSubscribed(false);
    }

    async function loadDevice(routerRtpCapabilities) {
        try {
            device.current = new Device();
        } catch (error) {
            if (error.name === 'UnsupportedError') {
                console.error('browser not supported');
            }
        }
        await device.current.load({ routerRtpCapabilities });
    }

    async function consume(transport, trackKind) {
        console.log('--start of consume --kind=' + trackKind);
        const socketid= selected;
        const { rtpCapabilities } = device.current;
        //const data = await socket.request('consume', { rtpCapabilities });
        const data = await sendRequest('consume', {
            rtpCapabilities: rtpCapabilities,
            kind: trackKind,
            socketid : socketid,
        }).catch((err) => {
            console.error('consume ERROR:', err);
        });
        const { producerId, id, kind, rtpParameters } = data;

        if (producerId) {
            let codecOptions = {};
            const consumer = await transport.consume({
                id,
                producerId,
                kind,
                rtpParameters,
                codecOptions,
            });
            //const stream = new MediaStream();
            //stream.addTrack(consumer.track);

            addRemoteTrack(clientId.current, consumer.track);

            console.log('--end of consume');
            //return stream;

            return consumer;
        } else {
            console.warn('--- remote producer NOT READY');

            return null;
        }
    }

    function sendRequest(type, data) {
        return new Promise((resolve, reject) => {
            socketRef.current.emit(type, data, (err, response) => {
                if (!err) {
                    // Success response, so pass the mediasoup response to the local Room.
                    resolve(response);
                } else {
                    reject(err);
                }
            });
        });
    }
    function disconnectSocket() {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
            clientId.current = null;
            console.log('socket.io closed..');
        }
    }

    const connectSocket = () => {

        socketRef.current = io(MediaSoupSocketPoint, {
            transports: ["websocket"],
        });

        return new Promise((resolve, reject) => {
            const socket = socketRef.current;

            socket.on('listUpdate', function (list) {
                listUpdate(list);
                console.log('listUpdate..');
            });

            socket.on('connect', function (evt) {
                console.log('socket.io connected()');
            });
            socket.on('error', function (err) {
                console.error('socket.io ERROR:', err);
                reject(err);
            });
            socket.on('message', function (message) {
                console.log('socket.io message:', message);
                if (message.type === 'welcome') {
                    if (socket.id !== message.id) {
                        console.warn(
                            'WARN: something wrong with clientID',
                            socket.io,
                            message.id
                        );
                    }

                    clientId.current = message.id;
                    console.log(
                        'connected to server. clientId=' + clientId.current
                    );
                    resolve();
                } else {
                    console.error('UNKNOWN message from server:', message);
                }
            });
            socket.on('newProducer', async function (message) {
                console.log('socket.io newProducer:', message);
                if (consumerTransport.current) {
                    // start consume
                    if (message.kind === 'video') {
                        videoConsumer.current = await consumeAndResume(
                            consumerTransport.current,
                            message.kind
                        );
                    } else if (message.kind === 'audio') {
                        audioConsumer.current = await consumeAndResume(
                            consumerTransport.current,
                            message.kind
                        );
                    }
                }
            });

            socket.on('producerClosed', function (message) {
                console.log('socket.io producerClosed:', message);
                const localId = message.localId;
                const remoteId = message.remoteId;
                const kind = message.kind;
                console.log(
                    '--try removeConsumer remoteId=' +
                    remoteId +
                    ', localId=' +
                    localId +
                    ', kind=' +
                    kind
                );
                if (kind === 'video') {
                    if (videoConsumer.current) {
                        videoConsumer.current.close();
                        videoConsumer.current = null;
                    }
                } else if (kind === 'audio') {
                    if (audioConsumer.current) {
                        audioConsumer.current.close();
                        audioConsumer.current = null;
                    }
                }

                if (remoteId) {
                    removeRemoteVideo(remoteId);
                } else {
                    removeAllRemoteVideo();
                }
            });
        });
    };

    function removeRemoteVideo(id) {
        console.log(' ---- removeRemoteVideo() id=' + id);
    }

    function removeAllRemoteVideo() {
        // remoteVideo.current = null;
        if (remoteVideo.current) {
            remoteVideo.current.pause();
            remoteVideo.current.srcObject = null;
        }
    }

    return (
        <>
        <Header />
    
        <PageBanner
          pageTitle="MediaSoup"
          homePageUrl="/"
          homePageText="MediaSoup"
          activePageText="Subscribe"
          bgImgClass="item-bg2"
        />
        <div>
            <button disabled={isSubscribed} onClick={handleSubscribe}>
                Subscribe
            </button>
            <button disabled={!isSubscribed} onClick={handleDisconnect}>
                Disconnect
            </button>

            <div>
                remote video
                <br />
                <div>
                    <video
                        ref={remoteVideo}
                        autoPlay
                        style={{
                            width: '240px',
                            height: '180px',
                            border: '1px solid black',
                        }}
                    ></video>
                </div>
                <select onChange={handleSelect} value={selected}>
                    <option value='null'>=== 스트리머 선택 ===</option>
                    {selectList.map((item) => (
                        <option value={item.split(':')[1]} key={item}>
                            {item}
                        </option>
                    ))}
                </select>

            </div>
        </div>
        <Footer />
        </>

    );
}

export default Subscribe;