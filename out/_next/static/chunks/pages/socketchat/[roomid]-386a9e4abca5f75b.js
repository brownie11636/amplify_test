(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9377],{66174:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/socketchat/[roomid]",function(){return n(93099)}])},73538:function(e,s,n){"use strict";var o=n(51438),t=n(52951),a=n(88029),i=n(5950),r=n(85893),c=n(67294),l=n(41664),_=n.n(l),d=function(e){(0,a.Z)(n,e);var s=(0,i.Z)(n);function n(){return(0,o.Z)(this,n),s.apply(this,arguments)}return(0,t.Z)(n,[{key:"render",value:function(){var e=this.props,s=e.pageTitle,n=e.homePageUrl,o=e.homePageText,t=e.activePageText,a=e.bgImgClass;return(0,r.jsxs)("div",{className:"page-title-area ".concat(a),children:[(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"page-title-content",children:[(0,r.jsx)("h2",{children:s}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(_(),{href:n,children:(0,r.jsx)("a",{children:o})})}),(0,r.jsx)("li",{children:t})]})]})}),(0,r.jsxs)("div",{className:"lines",children:[(0,r.jsx)("div",{className:"line"}),(0,r.jsx)("div",{className:"line"}),(0,r.jsx)("div",{className:"line"})]})]})}}]),n}(c.Component);s.Z=d},95306:function(e,s,n){"use strict";n.d(s,{Z:function(){return p}});var o=n(828),t=n(20943);var a=n(13375);var i=n(91566);function r(e){return function(e){if(Array.isArray(e))return(0,t.Z)(e)}(e)||(0,a.Z)(e)||(0,i.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c=n(85893),l=n(84434),_=n.n(l),d=n(67294),h=n(9828),u=n(70461),m=n(96894),g=n(86809),v=n.n(g),f=m.d5,x=v()(f,{transports:["websocket"]}),p=function(e){var s=e.roomID,n=(0,d.useState)(!0),t=(n[0],n[1],(0,d.useState)("")),a=t[0],i=t[1],l=(0,d.useState)([]),m=l[0],g=l[1],v=(0,o.Z)((0,u.Z)(["roomID"]),2),f=v[0];(0,v[1])("roomID",s),(0,d.useEffect)((function(){return x.connect(),console.log("in sock compo roomID?",f.roomID,"\n",s),void 0!=s?(console.log("if in"),x.emit("join-room",s,"dummy-nick")):void 0==s?(console.log("else if in"),x.emit("join-room",f.roomID,"dummy-nick")):console.log("somethings wrong!"),function(){console.log("unmounted"),x.disconnect()}}),[]),console.log("sock con??",x.connected);x.on("createMessage",(function(e,s){console.log("create msg!"),g(r(m).concat([{userName:s,message:e}]))}));return(0,c.jsx)(h.J.Provider,{value:x,children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:_().header,children:(0,c.jsxs)("div",{className:_().logo,children:[(0,c.jsx)("div",{className:_().header__back,children:(0,c.jsx)("i",{className:"styles.fas fa-angle-left"})}),(0,c.jsx)("h3",{children:"Socket Chat"})]})}),(0,c.jsxs)("div",{className:_().main,children:[(0,c.jsxs)("div",{className:_().main__left,children:[(0,c.jsxs)("div",{className:_().videos__group,children:[(0,c.jsx)("p",{style:{color:"white"},children:"Graphs will be here soon!"}),(0,c.jsx)("div",{id:_().video_grid})]}),(0,c.jsxs)("div",{className:_().options,children:[(0,c.jsxs)("div",{className:_().options__left,children:[(0,c.jsx)("div",{id:_().downloadButton,className:_().options__button,children:(0,c.jsx)("i",{className:"fa-solid fa-download"})}),(0,c.jsx)("div",{id:_().questionButton,className:_().options__button,children:(0,c.jsx)("i",{className:"fa-solid fa-circle-question"})}),(0,c.jsx)("div",{id:_().showChat,className:_().options__button,children:(0,c.jsx)("i",{className:"fa fa-comment"})})]}),(0,c.jsx)("div",{className:_().options__right,children:(0,c.jsx)("div",{id:_().inviteButton,className:_().options__button,children:(0,c.jsx)("i",{className:"fas fa-user-plus"})})})]})]}),(0,c.jsxs)("div",{className:_().main__right,children:[(0,c.jsx)("div",{className:_().main__chat_window,children:(0,c.jsx)("div",{className:_().messages,children:m.map((function(e,s){var n=e.userName,o=e.message;return(0,c.jsx)("div",{className:_().message,children:(0,c.jsxs)("h3",{children:[n,":",(0,c.jsx)("span",{children:o})]})},s)}))})}),(0,c.jsxs)("div",{className:_().main__message_container,children:[(0,c.jsx)("input",{onChange:function(e){i(e.target.value),console.log(a)},value:a,id:_().chat_message,type:"text",autoComplete:"off",placeholder:"Type message here..."}),(0,c.jsx)("div",{onClick:function(){0!==a.length?(console.log("none zero"),x.emit("message",a),i("")):console.log("text length is zero")},id:_().send,className:_().options__button,children:(0,c.jsx)("i",{className:"fa fa-plus","aria-hidden":"true"})})]})]})]})]})})}},93099:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return _}});var o=n(51351),t=n(85893),a=(n(67294),n(44108)),i=n(73538),r=n(78348),c=n(11163),l=n(95306);function _(e){e=null!==e?e:(0,o.Z)(new TypeError("Cannot destructure undefined"));var s=(0,c.useRouter)();s.query.roomid;console.log("rt2?",s.query.query_roomid),console.log("rt?",s);var n=s.query.query_roomid;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.Z,{}),(0,t.jsx)(i.Z,{pageTitle:"Security & Surveillance",homePageUrl:"/",homePageText:"Home",activePageText:"Service Details",bgImgClass:"item-bg2"}),(0,t.jsx)(l.Z,{roomID:n}),(0,t.jsx)(r.Z,{})]})}},96894:function(e,s,n){"use strict";n.d(s,{Ki:function(){return t},d5:function(){return o}});var o="https://api.portal301.com/",t="https://soup.portal301.com/"},9828:function(e,s,n){"use strict";n.d(s,{J:function(){return c},W:function(){return r}});var o=n(67294),t=n(86809),a=n.n(t),i=n(96894).d5,r=a()(i,{transports:["websocket"]}),c=(0,o.createContext)(r)},84434:function(e){e.exports={root:"Chat_root__UdO7s",header:"Chat_header__aCAg_",logo:"Chat_logo__vyW6R",main:"Chat_main___VSWW",main__left:"Chat_main__left__84PSN",videos__group:"Chat_videos__group__KCvOQ",options:"Chat_options__zzeQE",options__left:"Chat_options__left__FV578",options__right:"Chat_options__right__rBBOn",options__button:"Chat_options__button__jWpX4",background__red:"Chat_background__red__ha0rU",main__right:"Chat_main__right__XCVCh",main__chat_window:"Chat_main__chat_window__yAamR",main__message_container:"Chat_main__message_container__tfJhQ",messages:"Chat_messages__JaF3N",message:"Chat_message__hRlwN",video_grid:"Chat_video_grid__Iervg",showChat:"Chat_showChat__ldO7h",header__back:"Chat_header__back__dLaYy"}},77020:function(){}},function(e){e.O(0,[1664,5234,8912,9774,2888,179],(function(){return s=66174,e(e.s=s);var s}));var s=e.O();_N_E=s}]);