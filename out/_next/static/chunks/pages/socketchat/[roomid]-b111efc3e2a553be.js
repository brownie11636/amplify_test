(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9377],{3165:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/socketchat/[roomid]",function(){return t(1589)}])},8319:function(e,n,t){"use strict";var o=t(5893),s=t(1724),r=t.n(s),a=t(7294),i=t(6750),l=t(461),c=t(6809);function _(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=e[t];return o}function d(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var o,s,r=[],a=!0,i=!1;try{for(t=t.call(e);!(a=(o=t.next()).done)&&(r.push(o.value),!n||r.length!==n);a=!0);}catch(l){i=!0,s=l}finally{try{a||null==t.return||t.return()}finally{if(i)throw s}}return r}}(e,n)||m(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e){return function(e){if(Array.isArray(e))return _(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||m(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,n){if(e){if("string"===typeof e)return _(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_(e,n):void 0}}var h=t.n(c)()("https://localhost:3333",{transports:["websocket"]});n.Z=function(e){var n=e.roomID,t=(0,a.useState)(!0),s=(t[0],t[1],(0,a.useState)("")),c=s[0],_=s[1],m=(0,a.useState)([]),f=m[0],g=m[1],v=d((0,l.Z)(["roomID"]),2),p=v[0];(0,v[1])("roomID",n),(0,a.useEffect)((function(){return h.connect(),console.log("in sock compo roomID?",p.roomID,"\n",n),void 0!=n?(console.log("if in"),h.emit("join-room",n,"dummy-nick")):void 0==n?(console.log("else if in"),h.emit("join-room",p.roomID,"dummy-nick")):console.log("somethings wrong!"),function(){console.log("unmounted"),h.disconnect()}}),[]),console.log("sock con??",h.connected);h.on("createMessage",(function(e,n){console.log("create msg!"),g(u(f).concat([{userName:n,message:e}]))}));return(0,o.jsx)(i.J.Provider,{value:h,children:(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:r().header,children:(0,o.jsxs)("div",{className:r().logo,children:[(0,o.jsx)("div",{className:r().header__back,children:(0,o.jsx)("i",{className:"styles.fas fa-angle-left"})}),(0,o.jsx)("h3",{children:"Socket Chat"})]})}),(0,o.jsxs)("div",{className:r().main,children:[(0,o.jsxs)("div",{className:r().main__left,children:[(0,o.jsxs)("div",{className:r().videos__group,children:[(0,o.jsx)("p",{style:{color:"white"},children:"Graphs will be here soon!"}),(0,o.jsx)("div",{id:r().video_grid})]}),(0,o.jsxs)("div",{className:r().options,children:[(0,o.jsxs)("div",{className:r().options__left,children:[(0,o.jsx)("div",{id:r().downloadButton,className:r().options__button,children:(0,o.jsx)("i",{className:"fa-solid fa-download"})}),(0,o.jsx)("div",{id:r().questionButton,className:r().options__button,children:(0,o.jsx)("i",{className:"fa-solid fa-circle-question"})}),(0,o.jsx)("div",{id:r().showChat,className:r().options__button,children:(0,o.jsx)("i",{className:"fa fa-comment"})})]}),(0,o.jsx)("div",{className:r().options__right,children:(0,o.jsx)("div",{id:r().inviteButton,className:r().options__button,children:(0,o.jsx)("i",{className:"fas fa-user-plus"})})})]})]}),(0,o.jsxs)("div",{className:r().main__right,children:[(0,o.jsx)("div",{className:r().main__chat_window,children:(0,o.jsx)("div",{className:r().messages,children:f.map((function(e,n){var t=e.userName,s=e.message;return(0,o.jsx)("div",{className:r().message,children:(0,o.jsxs)("h3",{children:[t,":",(0,o.jsx)("span",{children:s})]})},n)}))})}),(0,o.jsxs)("div",{className:r().main__message_container,children:[(0,o.jsx)("input",{onChange:function(e){_(e.target.value),console.log(c)},value:c,id:r().chat_message,type:"text",autoComplete:"off",placeholder:"Type message here..."}),(0,o.jsx)("div",{onClick:function(){0!==c.length?(console.log("none zero"),h.emit("message",c),_("")):console.log("text length is zero")},id:r().send,className:r().options__button,children:(0,o.jsx)("i",{className:"fa fa-plus","aria-hidden":"true"})})]})]})]})]})})}},1589:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return c}});var o=t(5893),s=(t(7294),t(4119)),r=t(50),a=t(6866),i=t(1163),l=t(8319);function c(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));var n=(0,i.useRouter)();n.query.roomid;console.log("rt2?",n.query.query_roomid),console.log("rt?",n);var t=n.query.query_roomid;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.Z,{}),(0,o.jsx)(r.Z,{pageTitle:"Security & Surveillance",homePageUrl:"/",homePageText:"Home",activePageText:"Service Details",bgImgClass:"item-bg2"}),(0,o.jsx)(l.Z,{roomID:t}),(0,o.jsx)(a.Z,{})]})}},6750:function(e,n,t){"use strict";t.d(n,{J:function(){return l},W:function(){return i}});var o=t(7294),s=t(6809),r=t.n(s),a=t(4422).d5,i=r()(a,{transports:["websocket"]}),l=(0,o.createContext)(i)},1724:function(e){e.exports={root:"Chat_root__UdO7s",header:"Chat_header__aCAg_",logo:"Chat_logo__vyW6R",main:"Chat_main___VSWW",main__left:"Chat_main__left__84PSN",videos__group:"Chat_videos__group__KCvOQ",options:"Chat_options__zzeQE",options__left:"Chat_options__left__FV578",options__right:"Chat_options__right__rBBOn",options__button:"Chat_options__button__jWpX4",background__red:"Chat_background__red__ha0rU",main__right:"Chat_main__right__XCVCh",main__chat_window:"Chat_main__chat_window__yAamR",main__message_container:"Chat_main__message_container__tfJhQ",messages:"Chat_messages__JaF3N",message:"Chat_message__hRlwN",video_grid:"Chat_video_grid__Iervg",showChat:"Chat_showChat__ldO7h",header__back:"Chat_header__back__dLaYy"}}},function(e){e.O(0,[5637,6809,1309,5003,9774,2888,179],(function(){return n=3165,e(e.s=n);var n}));var n=e.O();_N_E=n}]);