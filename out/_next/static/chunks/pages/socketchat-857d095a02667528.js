(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7022],{6218:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/socketchat",function(){return n(5305)}])},1487:function(e,t,n){"use strict";var s=n(5893),r=n(7294);n(1664);function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function a(e){return a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},a(e)}function c(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}var u=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function d(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,s=a(e);if(t){var r=a(this).constructor;n=Reflect.construct(s,arguments,r)}else n=s.apply(this,arguments);return c(this,n)}}var _=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(c,e);var t,n,r,a=d(c);function c(){return o(this,c),a.apply(this,arguments)}return t=c,(n=[{key:"render",value:function(){return(0,s.jsx)("div",{className:"services-details-area ptb-110",children:(0,s.jsxs)("div",{className:"container",children:[(0,s.jsxs)("div",{className:"services-details-overview",children:[(0,s.jsxs)("div",{className:"services-details-desc mb-30",children:[(0,s.jsx)("h3",{children:"Streamer"}),(0,s.jsx)("p",{children:"WebRTC\ub97c \ud1b5\ud574 \uc2a4\ud2b8\ub9ac\uba38\uac00 \ub418\uc5b4\ubcf4\uc138\uc694!"}),(0,s.jsx)("div",{className:"btn-box"})]}),(0,s.jsx)("div",{className:"services-details-image",children:(0,s.jsx)("img",{src:"/images/services-details/service-details1.jpg",alt:"image"})})]}),(0,s.jsxs)("div",{className:"services-details-overview",children:[(0,s.jsxs)("div",{className:"services-details-desc",children:[(0,s.jsx)("h3",{children:"Viewer"}),(0,s.jsx)("p",{children:"\ub2e4\ub978 \uc2a4\ud2b8\ub9ac\uba38\ub97c \uc2dc\uccad\ud574\ubcf4\uc138\uc694!"}),(0,s.jsx)("div",{className:"btn-box"})]}),(0,s.jsx)("div",{className:"services-details-image mb-30",children:(0,s.jsx)("img",{src:"/images/services-details/service-details2.jpg",alt:"image"})})]})]})})}}])&&i(t.prototype,n),r&&i(t,r),c}(r.Component);t.Z=_},8319:function(e,t,n){"use strict";var s=n(5893),r=n(1724),o=n.n(r),i=n(7294),a=n(4197),c=n(461),l=n(6809);function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,s=new Array(t);n<t;n++)s[n]=e[n];return s}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var s,r,o=[],i=!0,a=!1;try{for(n=n.call(e);!(i=(s=n.next()).done)&&(o.push(s.value),!t||o.length!==t);i=!0);}catch(c){a=!0,r=c}finally{try{i||null==n.return||n.return()}finally{if(a)throw r}}return o}}(e,t)||h(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||h(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){if(e){if("string"===typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}var m=n.n(l)()("https://localhost:3333",{transports:["websocket"]});t.Z=function(e){var t=e.roomID,n=(0,i.useState)(!0),r=(n[0],n[1],(0,i.useState)("")),l=r[0],u=r[1],h=(0,i.useState)([]),f=h[0],v=h[1],p=d((0,c.Z)(["roomID"]),2),g=p[0];(0,p[1])("roomID",t),(0,i.useEffect)((function(){return m.connect(),console.log("in sock compo roomID?",g.roomID,"\n",t),void 0!=t?(console.log("if in"),m.emit("join-room",t,"dummy-nick")):void 0==t?(console.log("else if in"),m.emit("join-room",g.roomID,"dummy-nick")):console.log("somethings wrong!"),function(){console.log("unmounted"),m.disconnect()}}),[]),console.log("sock con??",m.connected);m.on("createMessage",(function(e,t){console.log("create msg!"),v(_(f).concat([{userName:t,message:e}]))}));return(0,s.jsx)(a.J.Provider,{value:m,children:(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:o().header,children:(0,s.jsxs)("div",{className:o().logo,children:[(0,s.jsx)("div",{className:o().header__back,children:(0,s.jsx)("i",{className:"styles.fas fa-angle-left"})}),(0,s.jsx)("h3",{children:"Socket Chat"})]})}),(0,s.jsxs)("div",{className:o().main,children:[(0,s.jsxs)("div",{className:o().main__left,children:[(0,s.jsxs)("div",{className:o().videos__group,children:[(0,s.jsx)("p",{style:{color:"white"},children:"Graphs will be here soon!"}),(0,s.jsx)("div",{id:o().video_grid})]}),(0,s.jsxs)("div",{className:o().options,children:[(0,s.jsxs)("div",{className:o().options__left,children:[(0,s.jsx)("div",{id:o().downloadButton,className:o().options__button,children:(0,s.jsx)("i",{className:"fa-solid fa-download"})}),(0,s.jsx)("div",{id:o().questionButton,className:o().options__button,children:(0,s.jsx)("i",{className:"fa-solid fa-circle-question"})}),(0,s.jsx)("div",{id:o().showChat,className:o().options__button,children:(0,s.jsx)("i",{className:"fa fa-comment"})})]}),(0,s.jsx)("div",{className:o().options__right,children:(0,s.jsx)("div",{id:o().inviteButton,className:o().options__button,children:(0,s.jsx)("i",{className:"fas fa-user-plus"})})})]})]}),(0,s.jsxs)("div",{className:o().main__right,children:[(0,s.jsx)("div",{className:o().main__chat_window,children:(0,s.jsx)("div",{className:o().messages,children:f.map((function(e,t){var n=e.userName,r=e.message;return(0,s.jsx)("div",{className:o().message,children:(0,s.jsxs)("h3",{children:[n,":",(0,s.jsx)("span",{children:r})]})},t)}))})}),(0,s.jsxs)("div",{className:o().main__message_container,children:[(0,s.jsx)("input",{onChange:function(e){u(e.target.value),console.log(l)},value:l,id:o().chat_message,type:"text",autoComplete:"off",placeholder:"Type message here..."}),(0,s.jsx)("div",{onClick:function(){0!==l.length?(console.log("none zero"),m.emit("message",l),u("")):console.log("text length is zero")},id:o().send,className:o().options__button,children:(0,s.jsx)("i",{className:"fa fa-plus","aria-hidden":"true"})})]})]})]})]})})}},5305:function(e,t,n){"use strict";n.r(t);var s=n(5893),r=(n(7294),n(4119)),o=n(50),i=(n(1487),n(8319),n(6866));t.default=function(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.Z,{}),(0,s.jsx)(o.Z,{pageTitle:"Security & Surveillance",homePageUrl:"/",homePageText:"Home",activePageText:"Service Details",bgImgClass:"item-bg2"}),(0,s.jsx)(i.Z,{})]})}},1724:function(e){e.exports={root:"Chat_root__UdO7s",header:"Chat_header__aCAg_",logo:"Chat_logo__vyW6R",main:"Chat_main___VSWW",main__left:"Chat_main__left__84PSN",videos__group:"Chat_videos__group__KCvOQ",options:"Chat_options__zzeQE",options__left:"Chat_options__left__FV578",options__right:"Chat_options__right__rBBOn",options__button:"Chat_options__button__jWpX4",background__red:"Chat_background__red__ha0rU",main__right:"Chat_main__right__XCVCh",main__chat_window:"Chat_main__chat_window__yAamR",main__message_container:"Chat_main__message_container__tfJhQ",messages:"Chat_messages__JaF3N",message:"Chat_message__hRlwN",video_grid:"Chat_video_grid__Iervg",showChat:"Chat_showChat__ldO7h",header__back:"Chat_header__back__dLaYy"}}},function(e){e.O(0,[5637,6809,1309,2882,9774,2888,179],(function(){return t=6218,e(e.s=t);var t}));var t=e.O();_N_E=t}]);