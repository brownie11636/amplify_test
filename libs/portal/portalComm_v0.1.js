import { io } from "socket.io-client";
import { registerWebrtcEvents } from "./webrtc/eventHandler.js";

/*
  TODO:
*/
/*
in the most case, sockets must emit and recieve 
two parameter TYPE and MESSAGE according CRUD method;

This file only covers setting socket options, 
creating profile, and managing events about services.

Other functions and events are written in other module, 
like webrtc signaling and creating peerconnection at "./webrtc/"
 "./"
*/

export class PortalCommClient_v0_1 {

  constructor() {
    this.TAG = `[PORTAL_COMM]`
    this.VERSION = "portalComm_v0.1"

    //socket.io
    this.socket = null;
    this.sockets = {};
    this.serviceParams = null;//roomParams?
    this.isSocketConnected = false;
    // this.SOCKET_ENDPOINT = null;
    this.connectedModules = [];

    this.profile = {
      id: null,
      pw: null,
      serviceId: null,
      serviceType : "webrtc",
      state: {
        status: "offline",
      },
    }
    /*
    below object is distinct with service objects in DB?
    this.profile.services: {
      serviceid:{
        role: "HOST"
        typs: "webrtc"
      }
      serviceid2:{
        role: "guest"
        type: "robot"
      }
    */

    this.services = {
      serviceid: {
        role: "HOST",
        type: "webrtc"
      },
    }

  }

  /**
  create socketIO client according to the given namespace and options.
  default path is "portalCommV0".
  only main namespace("/") is set to this.socket.
  other namespaces are set to this.sockets.namespace
  */
  createSocketIO(URL,namespace = "/", options) {

    let socket = io(URL+namespace, { ...options, path: `/${this.VERSION}` });
    // console.log(socket.id);
    // socket.on("connect", () => {
    //   this.isSocketConnected = true;
    //   console.log("socket.io is connected socket.id:",socket.id);
    // });

    socket.on("connect", () => {
      this.profile.id = socket.id
    });

    if (namespace === "/") {
      this.sockets[namespace] = socket;
      this.socket = this.sockets[namespace];

      return this.sockets[namespace];
    } else {

      return this.sockets[namespace] = socket;
    }

  }

  //maybe useless....
  setMainSocket(namespace) {
    return this.socket = this.sockets[namespace];
  }

  /*
  init socketIO client and set bisic socketIO events including room registration. 
  */
  initSocketIO(nsp = "/") {
    let socket = this.sockets[nsp]
    registerWebrtcEvents(socket);


    if (nsp === "some namespace") {

    }

    return this.sockets[nsp];
  }

  //promise로 만들어야 나중에 화면에서 list update 가능? 비동기, 프라미스 등 공부
  fetchServices(filter = {}, nsp = "/") {
    // let query = new Array().push({
    //   header: "ServiceList", 
    //   filter: filter
    // });
    let req = { filter: filter };
    console.log(this.TAG, nsp, " send GET request.", req);
    return new Promise(resolve => {
      this.sockets[nsp].emit("services", "GET", req, (res) => {
        console.log(this.TAG, nsp, " get query response.");
        console.log(res);
        resolve(res);
      });
    })
  }

  setOnServicesUpdate(callback1, callback2, nsp = "/") {
    let socket = this.sockets[nsp];
    socket.on("services:updated", (packet) => callback1(packet));
    socket.on("joined-services:updated", (packet) => callback2(packet));
  }

  createService(nickname = "undifined user", nsp = "/") {
    console.log('creating Service by user - ', nickname);
    let socket = this.sockets[nsp]; 
    this.profile.serviceId = "webrtc:" + this.profile.id;
    
    // 어떤 서비스(webrtc, robot ,...)를 시작할 것인지에 대한 태그.
    // 현재는 webrtc밖에 없긴한데, 추후 이 부분 수정해야 할 듯함.
    
    socket.emit("registering service", "POST", this.profile, (res) => {

      if (res.status === 'fail') {
        alert('you are already have service');
        return;
      }
      let registeredService = res.registeredService;

      this.services[registeredService.serviceId] = {
        role : registeredService.role,
        type : registeredService.serviceType,
      };

      let isHost = false;
      if (registeredService.role.toLowerCase() === 'host') {
        isHost = true;
      }

      let msg = {
        action : 'join',
        serviceId : registeredService.serviceId,
        userId : this.profile.id,
        isHost : isHost,
      }
      
      // 서비스를 만든 유저는 반드시 조인이 되어야하므로
      // create service 이후 바로 join service를 진행
      socket.emit("registering service", "PUT", msg, (res) => {
        if (res.status === 'ok') {
          console.log('service join done');
        }
      });      
    });

  };

  requestJoinService(serviceId, nsp = "/") {
    console.log('requestJoinService function');
    
    let msg = {
      action: "join",
      serviceId: serviceId,
      userId : this.profile.id,
      isHost : false,
    }

    //let serviceType = serviceId.split(':')[0]; // webrtc:~~
    //webrtc:~~~ , robot:~~~~
    this.sockets[nsp].emit("joining service", "PUT", msg, (res) => {
      if(res.status === "fail") {
        alert('you are already joined this service');
      } else {
        console.log('joined service');
        alert('join service complete successfully');
      }
    });
  }

  requestLeaveService(serviceId, nsp = "/") {
    let msg = {
      action: "leave",
      serviceId: serviceId,
      userId : this.profile.id,
      isHost : false,
    }
    let serviceType = serviceId.split(':')[0]; // webrtc:~~
    //webrtc:~~~ , robot:~~~~
    this.sockets[nsp].emit("joining service", "PUT", serviceType, msg, (res) => {
      if(res.status === "fail") {
        alert('can not exit service');
      } else {
        console.log('joined service');
        alert('exit service successfully');
      }
    });
  }

  deleteAllService(nsp = "/") {
    this.sockets[nsp].emit("deleteAllService", (res) => {
      console.log('delete all service (clear DB) ... ', res)
    });
  }



  requestServicesInfo() {
    //request information about rooms which the socket-client belongs
    //
  }

  ////webRTC
}