"use strict"

// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation
// modify polite to isInitiator

import { setDataChannel, messageEventHandler } from "./dataChannel.js";

export default class PortalRTC { // RTC 관련 기능 - 시그널링 관련 (프론트)
  // constructor(parentElement, commClient){
  constructor(commClient, namespace = "/") {
    // this.tag = document.createElement("video");
    // this.tag.id = "video-webrtc"
    // parentElement.appendChild(this.tag);

    this.comm = commClient.sockets[namespace]; //portalCommClient
    this.id = commClient.profile.id;
    // this.nsp = namespace;
    this.isInitiator = null;

    this.webrtcParams = {
      constraints: { audio: false, video: true },
      pcConfig: {
        'iceServers': [
          {
            "urls": "turn:3.35.133.246",
            "username": "user",
            "credential": "pass"
          },
          {
            'urls': 'stun:stun.l.google.com:19302'
          }
        ]
      },
    }

    this.iamHost = false;
    this.localVideo = null;
    this.remoteVideos = {};
    this.pcs = {};

    this.isPolite = false;
    this.makingOffer = false;
    this.ignoreOffer = false;
    this.isInitiators = {};

    this.receivedDChBuff = [];
    this.spatialVideo = null;
    this.rgbImg = null;
    this.depthImg = null;
    this.quaternion = null;

    this.setOnSocketIOCallbacks();
    
  }

  async setOnSocketIOCallbacks() {
    this.comm.on("webrtc:connection request", async (senderId) => {
      console.log('connection request from :', senderId);
      let targetId = senderId;
      let pc = this.createPeerConnection(targetId, targetId);
      this.pcs[targetId] = pc;

    });
    this.comm.on("webrtc:signaling", async (senderId, description, candidate) => {

      console.log('description >>', description);
      console.log('candidate >>', candidate);
      console.log('senderId >>', senderId);

      try {
        if (description) {
          const offerCollision =
            description.type === "offer" &&
            (this.makingOffer || this.pcs[senderId].signalingState !== "stable");

          //Polite한 client(host)가 받은 오퍼를 무시한다. 
          this.ignoreOffer = this.polite && offerCollision;
          console.log('ignoreOffer >> ', this.ignoreOffer);
          //this.ignoreOffer = offerCollision;
          if (this.ignoreOffer) {
            console.log('offer Collision, Ignore offer \nmaybe you are host.');
            return;
          }


          await this.pcs[senderId].setRemoteDescription(description);
          console.log('received peer`s offer or answer');
          if (description.type === "offer") {
            console.log('making my answer');
            await this.pcs[senderId].setLocalDescription();
            let targetId = senderId;
            this.sendSignal(targetId, this.id, this.pcs[senderId].localDescription, undefined);
          }

        } else if (candidate) {
          try {
            await this.pcs[senderId].addIceCandidate(candidate);
          } catch (err) {
            if (!this.ignoreOffer) {
              throw err;
            }
          }
        }
      } catch (err) {
        console.error(err);
      }

    });

  }

  async startStreaming(targetProfile) {
    console.log('startStreaming config >>', targetProfile);

    let targetServiceId = targetProfile.serialNumber;
    //requestIsPloite(targetServiceId);
    //this.polite = await this.comm.emit('webrtc:isHost', targetServiceId)
    try {
      let stream = await navigator.mediaDevices.getUserMedia(this.webrtcParams.constraints)
      this.localVideo.srcObject = stream;
    } catch (e) {
      console.error(e.name);
      let errorCode = e.name;
      switch (errorCode) {
        case "AbortError":
          console.log("AbortError");
        case "NotAllowedError":
          alert('해당 페이지에서 카메라에 접근할 수 있는 권한이 없습니다.')
          console.log("NotAllowedError");
          break;
        case "NotFoundError":
          alert('카메라 디바이스를 찾을 수 없습니다.')
          console.log("NotFoundError");
          break;
        case "NotReadableError":
          console.log("NotReadableError")
          break;
        case "OverconstrainedError":
          console.log("OverconstrainedError")
          break;
      }
    }
    // error event 종류에 따라 분기

    /*
    let rtcStatus;
    await this.comm.emit('webrtc:isConnection', this.id, targetServiceId, (res) => {
      
    })
    //console.log('rtc???', rtcStatus);
    if (rtcStatus.rtcStatus === 'online') {
      alert('you already have webRTC connection about this service host');
      console.log('you already have webRTC connection about this service host');
      return;
    }
    */
   console.log('aaaaa')
    const promise = new Promise((resolve) => {
      this.comm.emit('webrtc:isConnection', this.id, targetServiceId, (res) => {
        resolve(res);
      })
    })

    promise.then(value => {
      if (value === 'online') {
        alert('you already have webRTC connection about this service host');
        console.log('you already have webRTC connection about this service host');
      }
      else {
        console.log('sssssss')
        this.comm.emit('get service host', targetServiceId, (res) => {
          targetServiceHostId = res;

          this.comm.emit('webrtc:isHost', this.id, targetServiceId, async (res) => {
            this.polite = res;
            if (res) {
              this.iamHost = true;
            }
            else {
              this.iamHost = false;
              let senderId = this.comm.id;
              let pc = this.createPeerConnection(targetServiceHostId, targetServiceId);
              this.comm.emit('webrtc:connection request', targetServiceId, senderId);
              this.pcs[targetServiceHostId] = pc;
            }
          });

        })

      }
    });

    return true;

  }

  async disconnectRTC(targetServiceId) {
    //console.log('@@@@@@@@@@', this.pcs);
    //console.log('@@@@@@@@@@', targetServiceId.split(':')[1]);
    //targetServiceId.split(':')[0]
    if (this.iamHost) {
      this.comm.emit('get service host', targetServiceId, (res) => {
        for (let idx in this.pcs) {
          this.pcs[idx].close();
        }
        if(this.localVideo) {
          this.localVideo.remove();
          this.localVideo = null;  
        }
        this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "offline");

      })
      //this.pcs[]
      //this.localVideo.remove();
    }
    else {
      try {
        //console.log()
        this.pcs[targetServiceId.split(':')[1]].close();
        this.remoteVideos[targetServiceId].remove();
        this.remoteVideos[targetServiceId] = null;
        this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "offline");

      } catch (e) {
        alert('You are not connected to this service yet.')
        console.error(e);
      }
      //this.remoteVideos[targetServiceId].remove();
    }
    // remove local Video, pcConnection

    // if guest (== Viewer)
    // remove remote Video, pcConnection

  }

  sendSignal(target, senderId, description = undefined, icecandidate = undefined) {
    this.comm.emit("webrtc:signaling", target, senderId, description, icecandidate)
  }

  async requestIsPloite(targetServiceId) {
    let polite = await this.comm.emit('get service host', targetServiceId);

    return polite;
  }


  createPeerConnection(targetId, targetServiceId = null) {
    // 여기서 targetId은 service host의 id 또는 request를 요청한 guest의 id이다.
    console.log('createPeerConnection');
    let pc = new RTCPeerConnection(this.webrtcParams.pcConfig);
    let senderId = this.id;
    let stream = null;
    try {
      stream = this.localVideo.srcObject;

    } catch (e) {
      console.log('stream var is null', e);
    }

    if (stream !== null) { //viewer인 경우 stream이 없으므로
      for (const track of stream.getTracks()) {
        console.log('Video Track added');
        pc.addTrack(track, stream);
      }
    }

    pc.ontrack = (event) => {
      console.log('ontrack ev?>> ', event);
      console.log('remoteVideos?>>', this.remoteVideos);
      console.log('remoteVideos []?>>', this.remoteVideos['webrtc:' + this.id]);
      //this.remoteVideos['webrtc:'+this.id].srcObject = event.streams[0];
      try {
        this.remoteVideos[targetServiceId].srcObject = event.streams[0];
      } catch (e){
        console.log(e)
      }
    }

    pc.addEventListener('datachannel', event => {
  
      let dataChannel = setDataChannel(event.channel);
 
      /*
      
      */
     dataChannel.addEventListener("message", event=>{
      let receivedDatacontrol = 'None';
      // console.log(event)
      messageEventHandler(event, this.spatialVideo, this.rgbImg, this.depthImg, this);
      // this.quaternion = messageEventHandler(event, this.spatialVideo, this.rgbImg, this.depthImg, this.quaternion);
      console.log('received quaternion data : ', this.quaternion)
     });

    });

    pc.onconnectionstatechange = (event) => {
      console.log('[webRTC] state changed !', event);
      switch (pc.connectionState) {
        case "new":
          console.log("New");
        case "checking":
          console.log("Connecting…");
          break;
        case "connected":
          this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "online");
          console.log("Online");
          break;
        case "disconnected":
          /*
          if (this.iamHost) {
            this.localVideo.remove();
            //this.remoteVideos[]
            //this.pcs[targetId].close();
          }
          else {
            if(this.remoteVideos[targetServiceId])
              this.remoteVideos[targetServiceId].remove();
            //this.pcs[targetServiceId].close();
          }
          */
          if (this.remoteVideos[targetServiceId]) {
            //this.remoteVideos[targetServiceId].currentTime = 0;
            //this.remoteVideos[targetServiceId].pause();
            //this.remoteVideos[targetServiceId].load();
            this.remoteVideos[targetServiceId].remove();
          }
          console.log("Disconnecting…");
          this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "disconnected");

          break;

        case "closed":
          this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "offline");
          console.log("Offline");
          break;
        case "failed":
          this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "error");
          console.log("Error");
          break;
        default:
          console.log("Unknown");
          break;
      }
    }

    pc.onclose = () => {
      if (this.iamHost) {
        //this.localVideo.remove();
        //this.remoteVideos[]
        //this.pcs[targetId].close();
      }
      else {
        if (this.remoteVideos[targetServiceId])
          this.remoteVideos[targetServiceId].remove();
        //this.pcs[targetServiceId].close();
      }
      console.log("Closed");
    }

    pc.onicecandidate = ({ candidate }) => {
      console.log('signaling state >>', pc.signalingState);
      this.sendSignal(targetId, senderId, undefined, candidate);
      console.log('making candidate >>', candidate);
    }

    pc.onnegotiationneeded = async () => {
      console.log('onnegotiationneeded start');
      try {
        this.makingOffer = true;
        await pc.setLocalDescription();
        //this.sendSignal( target, { description: pc.localDescription });
        this.sendSignal(targetId, this.id, this.pcs[targetId].localDescription, undefined);
      } catch (err) {
        console.error(err);
      } finally {
        this.makingOffer = false;
      }
    }


    pc.oniceconnectionstatechange = () => {
      console.log('oniceconnectionstatechange >>', pc.iceConnectionState);
      if (pc.iceConnectionState === "failed") {
        pc.restartIce();
      }
    };

    return pc;
  }

  setOnServicesUpdate(callback, nsp = "/") {
    let socket = this.sockets[nsp];
    socket.on("services:updated", (packet) => callback(packet));
  }

  onCreateSessionDescriptionError(error) {
    trace('Failed to create session description: ' + error.toString());
  }

}