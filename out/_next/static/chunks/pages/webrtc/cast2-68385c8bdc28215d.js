(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5780],{76883:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/webrtc/cast2",function(){return t(90331)}])},90331:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return v}});var r=t(47568),o=t(14924),c=t(26042),i=t(69396),s=t(828),a=t(82222),u=t(70655),l=t(85893),d=t(67294),f=t(9828),g=t(44108),h=t(73538),m=t(78348);t(30767);function v(){var e=function(e){console.log("createOffer() error: ",e)},n=(0,d.useRef)(!1),t=(0,d.useRef)(),v=(0,d.useRef)(),p=(0,d.useRef)(),S=(0,d.useRef)({}),b=(0,d.useRef)(),y=!1,w=(0,d.useRef)(),C=(0,d.useState)([]),W=C[0],j=C[1],x=(0,d.useState)(!1),R=x[0],_=x[1],T=(0,d.useState)({}),k=(T[0],T[1],(0,d.useRef)({})),P=(0,d.useState)([]),I=P[0],L=P[1],E=(0,d.useRef)({}),Z=(0,d.useState)(""),O=Z[0],G=Z[1],D={socketId:f.W.id,room:"room:"+f.W.id,type:"Device_1",description:"Streamer",contents:"jooonik"},A={iceServers:[{urls:"turn:3.38.108.27",username:"usr",credential:"pass"}]};(0,d.useEffect)((function(){return f.W.connect(),function(){f.W.disconnect()}}),[]);var N=function(e){try{navigator.mediaDevices.getUserMedia({video:!0,audio:!1}).then(e)}catch(n){return void console.log(n)}},M=function(e){console.log("Adding local stream."),S.current=e,t.current.srcObject=e,q("got user media",null)},q=function(e,n){console.log("send message(emit msg-v1)");var t={from:f.W.id,to:n,message:e};f.W.emit("msg-v1",t)},U=(0,d.useState)([]),F=U[0],J=U[1];(0,d.useEffect)((function(){J(F.concat({header:"ServiceList",filter:{}}));var e=new Array({header:"ServiceList",filter:{}});f.W.emit("q_service",e)}),[]),(0,d.useEffect)((function(){f.W.on("q_result",(function(e){var n=JSON.parse(e);if("ServiceList"===n.header){var t=n.data,r=W,o=!0,c=!1,i=void 0;try{for(var a,u=Object.entries(Object(t))[Symbol.iterator]();!(o=(a=u.next()).done);o=!0){var l=(0,s.Z)(a.value,2),d=l[0],f=l[1];r=r.concat("".concat(d,":").concat(f.sid))}}catch(g){c=!0,i=g}finally{try{o||null==u.return||u.return()}finally{if(c)throw i}}j(r)}})),f.W.on("created",(function(e){console.log("Created room "+e),n.current=!0})),f.W.on("full",(function(e){console.log("Room "+e+" is full")})),f.W.on("join",(function(e){console.log("Another peer made a request to join room "+e),console.log("This peer is the initiator of room "+e+"!"),y=!0})),f.W.on("joined",(function(e){console.log("joined: "+e),y=!0})),f.W.on("log",(function(e){console.log("socket on log"),console.log.apply(console,e)})),f.W.on("msg-v1",function(){var e=(0,r.Z)((function(e){var n,t;return(0,u.__generator)(this,(function(r){switch(r.label){case 0:console.log("In msg-v1!"),n=e.message,console.log("msg from",e.from),console.log("Client received message:",n),r.label=1;case 1:return r.trys.push([1,10,,11]),"connection request"!==n?[3,2]:(console.log("check : connection request",k.current[e.from]),L(I.concat({socketId:e.from})),console.log("RTCClientList:"+I),V(e.from),[3,9]);case 2:return"offer"!==n.type?[3,4]:(console.log("ice?",w.current.iceGatheringState),[4,k.current[e.from].setRemoteDescription(new RTCSessionDescription(n))]);case 3:return r.sent(),console.log("check : offer",k.current[e.from]),b.current=e.from,z(e.from),console.log("ice?",w.current.iceGatheringState),[3,9];case 4:return"answer"!==n.type?[3,6]:[4,k.current[e.from].setRemoteDescription(new RTCSessionDescription(n))];case 5:return r.sent(),console.log("check : answer",k.current[e.from]),[3,9];case 6:return"candidate"!==n.type?[3,8]:(console.log("ice?",w.current.iceGatheringState),t=new RTCIceCandidate({sdpMLineIndex:n.label,candidate:n.candidate}),[4,k.current[e.from].addIceCandidate(t)]);case 7:return r.sent(),console.log("check : candi",k.current[e.from]),console.log("ice?",w.current.iceGatheringState),[3,9];case 8:"bye"===n&&(I.splice(I.findIndex((function(n){return n.socketId===e.from})),1),console.log("RTCClientList:"+I),console.log(I)),r.label=9;case 9:return[3,11];case 10:return r.sent(),[3,11];case 11:return[2]}}))}));return function(n){return e.apply(this,arguments)}}())}),[f.W]);var V=function(t){console.log(">>>>>>> maybeStart() ",R,(0,a.Z)(S.current),y),"undefined"!==typeof S.current&&y&&(console.log(">>>>>> creating peer connection",t),X(t),_((function(e){return!0})),console.log("ice?",k.current[t].iceGatheringState),n.current&&(!function(n){console.log("Sending offer to peer",k.current[n]),k.current[n].createOffer(function(){var e=(0,r.Z)((function(e){return(0,u.__generator)(this,(function(t){switch(t.label){case 0:return[4,k.current[n].setLocalDescription(e)];case 1:return t.sent(),console.log("setLocalAndSendMessage sending message",e),q(e,n),[2]}}))}));return function(n){return e.apply(this,arguments)}}(),e),console.log("ice?",w.current.iceGatheringState)}(t),console.log("ice?",w.current.iceGatheringState)))},H=function(e){console.log("docall?",e.target.iceGatheringState,"aaa"),"complete"==e.target.iceGatheringState&&console.log("evnet")},X=function(e){console.log("createPerrconnect -> localVideo.current.srcObject?",S.current);try{w.current=new RTCPeerConnection(A),w.current.onicecandidate=function(n){console.log("icecandidate event: ",n),n.candidate?q({type:"candidate",label:n.candidate.sdpMLineIndex,id:n.candidate.sdpMid,candidate:n.candidate.candidate},e):console.log("End of candidates.")},w.current.onicegatheringstatechange=H,console.log("RTCPeerConnection :",w.current.connectionState),S.current&&S.current.getTracks().forEach((function(e){w.current.addTrack(e,S.current)})),k.current=(0,i.Z)((0,c.Z)({},k.current),(0,o.Z)({},e,w.current)),E.current=(0,o.Z)({},e,w.current),console.log("RTC connection code done.")}catch(n){return console.log("Failed to create PeerConnection, exception: "+n.message),void alert("Cannot create RTCPeerConnection object.")}},z=function(e){console.log("Sending answer to peer."),k.current[e].createAnswer().then(function(){var n=(0,r.Z)((function(n){return(0,u.__generator)(this,(function(t){switch(t.label){case 0:return[4,k.current[e].setLocalDescription(n)];case 1:return t.sent(),console.log("setLocalAndSendMessage sending message",n),q(n,e),[2]}}))}));return function(e){return n.apply(this,arguments)}}(),B)},B=function(e){console.log("Failed to create session description: "+e.toString())};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(g.Z,{}),(0,l.jsx)(h.Z,{pageTitle:"Security & Surveillance",homePageUrl:"/",homePageText:"Home",activePageText:"Service Details",bgImgClass:"item-bg2"}),(0,l.jsx)(f.J.Provider,{value:f.W,children:(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"You are a streamer!"}),(0,l.jsxs)("div",{id:"videos",children:[(0,l.jsx)("video",{ref:t,id:"localVideo",autoPlay:!0,muted:!0,playsInline:!0}),(0,l.jsx)("video",{ref:v,id:"remoteVideo",autoPlay:!0,playsInline:!0})]}),(0,l.jsxs)("div",{ref:p,id:"controlPanel",children:[(0,l.jsx)("button",{onClick:function(){f.W.emit("Start_Service",D),N(M)},children:"Start Streaming"}),(0,l.jsx)("button",{onClick:function(){console.log("ice?",w.current.iceGatheringState),console.log("conn??",w.current.connectionState)},children:"My Audio On/Off"}),(0,l.jsx)("select",{onChange:function(e){G(e.target.value)},value:O,children:W.map((function(e){return(0,l.jsx)("option",{value:e,children:e},e)}))})]}),(0,l.jsx)("div",{id:"image",children:(0,l.jsx)("p",{children:"The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991."})})]})}),(0,l.jsx)(m.Z,{})]})}},47568:function(e,n,t){"use strict";function r(e,n,t,r,o,c,i){try{var s=e[c](i),a=s.value}catch(u){return void t(u)}s.done?n(a):Promise.resolve(a).then(r,o)}function o(e){return function(){var n=this,t=arguments;return new Promise((function(o,c){var i=e.apply(n,t);function s(e){r(i,o,c,s,a,"next",e)}function a(e){r(i,o,c,s,a,"throw",e)}s(void 0)}))}}t.d(n,{Z:function(){return o}})}},function(e){e.O(0,[1664,5234,5126,2199,9774,2888,179],(function(){return n=76883,e(e.s=n);var n}));var n=e.O();_N_E=n}]);