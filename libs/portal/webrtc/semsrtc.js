"use strict"

// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation
// modify polite to isInitiator

export class PortalRTC { // RTC 관련 기능 - 시그널링 관련 (프론트)
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
      constraints: { 
        audio: false,
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      },
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
    this.remoteVideos = [];
    this.pcs = {};

    this.isPolite = false;
    this.makingOffer = false;
    this.ignoreOffer = false;
    this.isInitiators = {};

    this.setOnSocketIOCallbacks();

  }

  async setOnSocketIOCallbacks() {
    this.comm.on("webrtc:connection request", async (senderId) => {

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

  async operateCamera (config) {
    try {
      if (config.isCasting) {
        let stream = await navigator.mediaDevices.getUserMedia(this.webrtcParams.constraints)
        this.localVideo.srcObject = stream;
      }
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
  }

  async startStreaming(serviceId, config) {
    console.log('startStreaming config >>', serviceId, config);

    let targetServiceId = serviceId;
    let targetServiceHostId;
    //requestIsPloite(targetServiceId);
    //this.polite = await this.comm.emit('webrtc:isHost', targetServiceId)
    // try {
    // if (config.isCasting) {
    //   let stream = await navigator.mediaDevices.getUserMedia(this.webrtcParams.constraints)
    //   this.localVideo.srcObject = stream;
    // }
    // } catch (e) {
    //   console.error(e.name);
    //   let errorCode = e.name;
    //   switch (errorCode) {
    //     case "AbortError":
    //       console.log("AbortError");
    //     case "NotAllowedError":
    //       alert('해당 페이지에서 카메라에 접근할 수 있는 권한이 없습니다.')
    //       console.log("NotAllowedError");
    //       break;
    //     case "NotFoundError":
    //       alert('카메라 디바이스를 찾을 수 없습니다.')
    //       console.log("NotFoundError");
    //       break;
    //     case "NotReadableError":
    //       console.log("NotReadableError")
    //       break;
    //     case "OverconstrainedError":
    //       console.log("OverconstrainedError")
    //       break;
    //   }
    // }
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
        this.comm.emit('get service host', targetServiceId, (res) => {
          console.log('get ser? >>', res);
          targetServiceHostId = res;
          if (targetServiceHostId === null) {
            alert('아직 디바이스가 방송을 시작하지 않았습니다.');
            this.remoteVideos[targetServiceId].remove();
            return;
          }

          this.comm.emit('webrtc:isHost', this.id, targetServiceId, async (res) => {
            this.polite = res;
            if (res) {              
              this.iamHost = true;
              this.operateCamera(config);
            }
            else {
              if(config.isCasting) { //cast page인데 host가 아닌 경우. 즉, 이미 다른 디바이스가 방송을 하고 있는 방에 들어와서 방송을 하려는 경우
                console.log('이미 방송 중인 디바이스가 있음');
                return;
              }
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

  async disconnectRTC (targetServiceId) {
    //console.log('@@@@@@@@@@', this.pcs);
    //console.log('@@@@@@@@@@', targetServiceId.split(':')[1]);
    //targetServiceId.split(':')[0]
    if (this.iamHost) {
      this.comm.emit('get service host', targetServiceId, (res) => {
        //close all rtc peer connection
        for (let idx in this.pcs) {
          this.pcs[idx].close();
        }
        this.localVideo.remove();
        this.localVideo = null;
        this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "disconnected");
      });
    }
    else {
      try {
        //console.log()
        this.pcs[targetServiceId.split(':')[1]].close();
        this.remoteVideos[targetServiceId].remove();
        this.remoteVideos[targetServiceId] = null;
        this.comm.emit('webrtc:connectionStateChanged', this.id, targetServiceId, "disconnected");

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
    let pc = new RTCPeerConnection(this.webrtcParams.pcConfig);
    let senderId = this.id;

    if (this.localVideo !== null) { //viewer인 경우 stream이 없으므로
      let stream = this.localVideo.srcObject;
      for (const track of stream.getTracks()) {
        console.log('Video Track added');
        pc.addTrack(track, stream);
      }
    }

    pc.ontrack = (event) => {
      console.log('Video Track comming ... ', event);
      //console.log('remoteVideos?>>', this.remoteVideos);
      //console.log('remoteVideos []?>>', this.remoteVideos['webrtc:' + this.id]);
      //this.remoteVideos['webrtc:'+this.id].srcObject = event.streams[0];
      this.remoteVideos[targetServiceId].srcObject = event.streams[0];
    }

    pc.addEventListener('datachannel', event => {
      dataChannel = event.channel;
      dataChannel.binaryType = 'arraybuffer';
      dataChannel.onopen = onReceiveChannelStateChange;

      /*
      
      */

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
          if(this.remoteVideos[targetServiceId]) {
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
        if(this.remoteVideos[targetServiceId])
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
      // if (pc.iceConnectionState === "failed") {
      //   pc.restartIce();
      // }
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