(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2927],{81006:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/webrtc/viewzero",function(){return r(75026)}])},75026:function(e,n,r){"use strict";r.r(n),r.d(n,{App:function(){return h}});var t=r(47568),o=r(14924),c=r(26042),i=r(69396),s=r(828),u=r(70655),a=r(85893),l=r(67294),f=r(86809),d=r.n(f),g={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},h=function(){var e=function(e){console.log("Remote stream added. event.stream?>>>",e.stream),p.current.srcObject=e.stream},n=(0,l.useRef)(),r=(0,l.useRef)(),f=(0,l.useRef)({}),h=(0,l.useRef)(),v=(0,l.useRef)(null),p=(0,l.useRef)(null),m=(0,l.useRef)(),w=(0,l.useRef)(),_=(0,l.useRef)(),y=(0,l.useState)([]),S=y[0],R=y[1],b=function(e,r){console.log("send message(emit msg-v1)",e.type,r),console.log("send message(emit msg-v1)",e.type,r);var t={from:n.current.id,to:r,message:e};n.current.emit("msg-v1",t)},C=(function(){var e=(0,t.Z)((function(){var e,t;return(0,u.__generator)(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,navigator.mediaDevices.getUserMedia({video:!0,audio:!0})];case 1:return e=o.sent(),v.current&&(v.current.srcObject=e),e.getTracks().forEach((function(n){r.current&&r.current.addTrack(n,e)})),n.current.emit("Start_Service",{socketId:n.current.id,room:"room:"+n.current.id,type:"Device_1",description:"Streamer",contents:"jooonik"}),b("got user media",null),[3,3];case 2:return t=o.sent(),console.error(t),[3,3];case 3:return[2]}}))}))}(),function(){var e=(0,t.Z)((function(){var e,t,o;return(0,u.__generator)(this,(function(c){switch(c.label){case 0:console.log("create offer"),e=_.current.find((function(e){return e.sid===w.current})),console.log(e),n.current.emit("Join_Service",e.sid),c.label=1;case 1:return c.trys.push([1,4,,5]),[4,r.current.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!0})];case 2:return t=c.sent(),[4,r.current.setLocalDescription(new RTCSessionDescription(t))];case 3:return c.sent(),console.log(r.current.iceGatheringState),r.current.oniceconnectionstatechange=function(e){console.log("oniceconnectionstatechange : ",e.target.connectionState)},b(t,e.sid),h.current=e.sid,[3,5];case 4:return o=c.sent(),console.log("errrrrrrrrr"),console.error(o),[3,5];case 5:return[2]}}))}));return function(){return e.apply(this,arguments)}}()),k=function(){var e=(0,t.Z)((function(){var e,t;return(0,u.__generator)(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,4]),[4,r.current.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!0})];case 1:return e=o.sent(),[4,r.current.setLocalDescription(new RTCSessionDescription(e))];case 2:return o.sent(),console.log(r.current.iceGatheringState),r.current.oniceconnectionstatechange=function(e){console.log("oniceconnectionstatechange : ",e.target.connectionState)},b(e,h.current),n.current.emit("offer",e),[3,4];case 3:return t=o.sent(),console.log("errrrrrrrrr"),console.error(t),[3,4];case 4:return[2]}}))}));return function(){return e.apply(this,arguments)}}(),j=function(e){console.log("Failed to create session description: "+e.toString())},T=function(){var e=(0,t.Z)((function(e,s){var a;return(0,u.__generator)(this,(function(l){switch(l.label){case 0:return l.trys.push([0,2,,3]),f.current[s]=new RTCPeerConnection(g),r.current.onicecandidate=function(e){if(e.candidate){if(!n.current)return;console.log("onicecandidate"),b({type:"candidate",label:e.candidate.sdpMLineIndex,id:e.candidate.sdpMid,candidate:e.candidate.candidate},s)}},r.current.oniceconnectionstatechange=function(e){console.log("oniceconnectionstatechange : ",e.target.connectionState)},f.current=(0,i.Z)((0,c.Z)({},f.current),(0,o.Z)({},s,r.current)),[4,f.current[s].setRemoteDescription(new RTCSessionDescription(e))];case 1:return l.sent(),console.log("answer set remote description success",f.current),f.current[s].createAnswer().then(function(){var e=(0,t.Z)((function(e){return(0,u.__generator)(this,(function(n){switch(n.label){case 0:return[4,f.current[s].setLocalDescription(e)];case 1:return n.sent(),console.log("setLocalAndSendMessage sending message",e),b(e,s),[2]}}))}));return function(n){return e.apply(this,arguments)}}(),j),[3,3];case 2:return a=l.sent(),console.error(a),[3,3];case 3:return[2]}}))}));return function(n,r){return e.apply(this,arguments)}}(),D=(0,l.useState)([]),Z=D[0],x=D[1];(0,l.useEffect)((function(){x(Z.concat({header:"ServiceList",filter:{}}));var o=new Array({header:"ServiceList",filter:{}});return n.current=d()("https://192.168.0.12:3333",{transports:["websocket"]}),n.current.connected?console.log("connected"):console.log("not conn"),n.current.emit("q_service",o),r.current=new RTCPeerConnection(g),m.current={socketId:n.current.id,room:"room:"+n.current.id,type:"Device_1",description:"Streamer",contents:"jooonik"},n.current.on("all_users",(function(e){console.log("alluser",e.length,e)})),n.current.on("user-connected",(function(e){console.log('"user-connected"',e)})),n.current.on("getOffer",(function(e){console.log("get offer"),T(e)})),n.current.on("getAnswer",(function(n){console.log("get answer"),r.current&&(r.current.setRemoteDescription(new RTCSessionDescription(n)),r.current.onaddstream=e)})),n.current.on("getCandidate",function(){var e=(0,t.Z)((function(e){return(0,u.__generator)(this,(function(n){switch(n.label){case 0:return r.current?[4,r.current.addIceCandidate(new RTCIceCandidate(e))]:[2];case 1:return n.sent(),console.log("candidate add success"),[2]}}))}));return function(n){return e.apply(this,arguments)}}()),n.current.on("joined",(function(e,n){k(),console.log("joined!")})),n.current.on("join",(function(e){console.log("Another peer made a request to join room "+e),console.log("This peer is the initiator of room "+e+"!")})),n.current.on("q_result",(function(e){var n=JSON.parse(e);if("ServiceList"===n.header){_.current=n.data;var r=S,t=!0,o=!1,c=void 0;try{for(var i,u=Object.entries(Object(_.current))[Symbol.iterator]();!(t=(i=u.next()).done);t=!0){var a=(0,s.Z)(i.value,2),l=a[0],f=a[1];r=r.concat("".concat(l,":").concat(f.sid))}}catch(d){o=!0,c=d}finally{try{t||null==u.return||u.return()}finally{if(o)throw c}}R(r)}})),n.current.on("msg-v1",function(){var n=(0,t.Z)((function(n){var t;return(0,u.__generator)(this,(function(o){console.log("------------------msg-v1 ",n.message.type,"-------------------"),t=n.message,console.log("msg from",n.from),console.log("Client received message:",t),h.current=n.from;try{if("connection request"===t)console.log("check : connection request");else if("offer"===t.type)console.log("check : offer",t),T(t,n.from);else if("answer"===t.type){if(!r.current)return[2];console.log("signalingStat",r.current.signalingState),"stable"!==r.current.signalingState&&(console.log("set the pcRef : ",r.current),r.current.setRemoteDescription(new RTCSessionDescription(t)),r.current.onaddstream=e),console.log("set the pcRef2 : ",r.current)}else"candidate"===t.type&&console.log("check : candi")}catch(c){console.log("eeeeeeeeeeee",c)}return[2]}))}));return function(e){return n.apply(this,arguments)}}()),function(){n.current,r.current}}),[]);return(0,a.jsxs)("div",{children:[(0,a.jsx)("video",{style:{width:240,height:240,margin:5,backgroundColor:"black"},muted:!0,ref:v,autoPlay:!0}),(0,a.jsx)("video",{id:"remotevideo",style:{width:240,height:240,margin:5,backgroundColor:"black"},ref:p,autoPlay:!0}),(0,a.jsx)("button",{onClick:C,children:"Join Streaming"}),(0,a.jsx)("button",{onClick:function(){k(h.current),console.log(r.current.iceGatheringState)},children:"console debug"}),(0,a.jsx)("select",{onChange:function(e){console.log(e.target.value),w.current=e.target.value},value:w.current,children:S.map((function(e){return(0,a.jsx)("option",{value:e.split(":")[1],children:e},e)}))})]})};n.default=h},77020:function(){},47568:function(e,n,r){"use strict";function t(e,n,r,t,o,c,i){try{var s=e[c](i),u=s.value}catch(a){return void r(a)}s.done?n(u):Promise.resolve(u).then(t,o)}function o(e){return function(){var n=this,r=arguments;return new Promise((function(o,c){var i=e.apply(n,r);function s(e){t(i,o,c,s,u,"next",e)}function u(e){t(i,o,c,s,u,"throw",e)}s(void 0)}))}}r.d(n,{Z:function(){return o}})}},function(e){e.O(0,[5234,9774,2888,179],(function(){return n=81006,e(e.s=n);var n}));var n=e.O();_N_E=n}]);