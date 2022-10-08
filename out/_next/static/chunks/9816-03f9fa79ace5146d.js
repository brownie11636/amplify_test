(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9816],{6489:function(e,t){"use strict";t.Q=function(e,t){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var i={},o=t||{},r=e.split(";"),a=o.decode||n,c=0;c<r.length;c++){var u=r[c],l=u.indexOf("=");if(!(l<0)){var d=u.substring(0,l).trim();if(void 0==i[d]){var h=u.substring(l+1,u.length).trim();'"'===h[0]&&(h=h.slice(1,-1)),i[d]=s(h,a)}}}return i},t.q=function(e,t,n){var s=n||{},r=s.encode||i;if("function"!==typeof r)throw new TypeError("option encode is invalid");if(!o.test(e))throw new TypeError("argument name is invalid");var a=r(t);if(a&&!o.test(a))throw new TypeError("argument val is invalid");var c=e+"="+a;if(null!=s.maxAge){var u=s.maxAge-0;if(isNaN(u)||!isFinite(u))throw new TypeError("option maxAge is invalid");c+="; Max-Age="+Math.floor(u)}if(s.domain){if(!o.test(s.domain))throw new TypeError("option domain is invalid");c+="; Domain="+s.domain}if(s.path){if(!o.test(s.path))throw new TypeError("option path is invalid");c+="; Path="+s.path}if(s.expires){if("function"!==typeof s.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+s.expires.toUTCString()}s.httpOnly&&(c+="; HttpOnly");s.secure&&(c+="; Secure");if(s.sameSite){switch("string"===typeof s.sameSite?s.sameSite.toLowerCase():s.sameSite){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;case"none":c+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return c};var n=decodeURIComponent,i=encodeURIComponent,o=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function s(e,t){try{return t(e)}catch(n){return e}}},3538:function(e,t,n){"use strict";var i=n(1438),o=n(2951),s=n(8029),r=n(5950),a=n(5893),c=n(7294),u=n(1664),l=n.n(u),d=function(e){(0,s.Z)(n,e);var t=(0,r.Z)(n);function n(){return(0,i.Z)(this,n),t.apply(this,arguments)}return(0,o.Z)(n,[{key:"render",value:function(){var e=this.props,t=e.pageTitle,n=e.homePageUrl,i=e.homePageText,o=e.activePageText,s=e.bgImgClass;return(0,a.jsxs)("div",{className:"page-title-area ".concat(s),children:[(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"page-title-content",children:[(0,a.jsx)("h2",{children:t}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:(0,a.jsx)(l(),{href:n,children:(0,a.jsx)("a",{children:i})})}),(0,a.jsx)("li",{children:o})]})]})}),(0,a.jsxs)("div",{className:"lines",children:[(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"})]})]})}}]),n}(c.Component);t.Z=d},5306:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var i=n(828),o=n(943);var s=n(3375);var r=n(1566);function a(e){return function(e){if(Array.isArray(e))return(0,o.Z)(e)}(e)||(0,s.Z)(e)||(0,r.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c=n(5893),u=n(4434),l=n.n(u),d=n(7294),h=n(9828),_=n(461),f=n(6809),m=n.n(f)()("https://localhost:3333",{transports:["websocket"]}),p=function(e){var t=e.roomID,n=(0,d.useState)(!0),o=(n[0],n[1],(0,d.useState)("")),s=o[0],r=o[1],u=(0,d.useState)([]),f=u[0],p=u[1],v=(0,i.Z)((0,_.Z)(["roomID"]),2),g=v[0];(0,v[1])("roomID",t),(0,d.useEffect)((function(){return m.connect(),console.log("in sock compo roomID?",g.roomID,"\n",t),void 0!=t?(console.log("if in"),m.emit("join-room",t,"dummy-nick")):void 0==t?(console.log("else if in"),m.emit("join-room",g.roomID,"dummy-nick")):console.log("somethings wrong!"),function(){console.log("unmounted"),m.disconnect()}}),[]),console.log("sock con??",m.connected);m.on("createMessage",(function(e,t){console.log("create msg!"),p(a(f).concat([{userName:t,message:e}]))}));return(0,c.jsx)(h.J.Provider,{value:m,children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:l().header,children:(0,c.jsxs)("div",{className:l().logo,children:[(0,c.jsx)("div",{className:l().header__back,children:(0,c.jsx)("i",{className:"styles.fas fa-angle-left"})}),(0,c.jsx)("h3",{children:"Socket Chat"})]})}),(0,c.jsxs)("div",{className:l().main,children:[(0,c.jsxs)("div",{className:l().main__left,children:[(0,c.jsxs)("div",{className:l().videos__group,children:[(0,c.jsx)("p",{style:{color:"white"},children:"Graphs will be here soon!"}),(0,c.jsx)("div",{id:l().video_grid})]}),(0,c.jsxs)("div",{className:l().options,children:[(0,c.jsxs)("div",{className:l().options__left,children:[(0,c.jsx)("div",{id:l().downloadButton,className:l().options__button,children:(0,c.jsx)("i",{className:"fa-solid fa-download"})}),(0,c.jsx)("div",{id:l().questionButton,className:l().options__button,children:(0,c.jsx)("i",{className:"fa-solid fa-circle-question"})}),(0,c.jsx)("div",{id:l().showChat,className:l().options__button,children:(0,c.jsx)("i",{className:"fa fa-comment"})})]}),(0,c.jsx)("div",{className:l().options__right,children:(0,c.jsx)("div",{id:l().inviteButton,className:l().options__button,children:(0,c.jsx)("i",{className:"fas fa-user-plus"})})})]})]}),(0,c.jsxs)("div",{className:l().main__right,children:[(0,c.jsx)("div",{className:l().main__chat_window,children:(0,c.jsx)("div",{className:l().messages,children:f.map((function(e,t){var n=e.userName,i=e.message;return(0,c.jsx)("div",{className:l().message,children:(0,c.jsxs)("h3",{children:[n,":",(0,c.jsx)("span",{children:i})]})},t)}))})}),(0,c.jsxs)("div",{className:l().main__message_container,children:[(0,c.jsx)("input",{onChange:function(e){r(e.target.value),console.log(s)},value:s,id:l().chat_message,type:"text",autoComplete:"off",placeholder:"Type message here..."}),(0,c.jsx)("div",{onClick:function(){0!==s.length?(console.log("none zero"),m.emit("message",s),r("")):console.log("text length is zero")},id:l().send,className:l().options__button,children:(0,c.jsx)("i",{className:"fa fa-plus","aria-hidden":"true"})})]})]})]})]})})}},6894:function(e,t,n){"use strict";n.d(t,{d5:function(){return i}});var i="https://api.portal301.com"},9828:function(e,t,n){"use strict";n.d(t,{J:function(){return c},W:function(){return a}});var i=n(7294),o=n(6809),s=n.n(o),r=n(6894).d5,a=s()(r,{transports:["websocket"]}),c=(0,i.createContext)(a)},4434:function(e){e.exports={root:"Chat_root__UdO7s",header:"Chat_header__aCAg_",logo:"Chat_logo__vyW6R",main:"Chat_main___VSWW",main__left:"Chat_main__left__84PSN",videos__group:"Chat_videos__group__KCvOQ",options:"Chat_options__zzeQE",options__left:"Chat_options__left__FV578",options__right:"Chat_options__right__rBBOn",options__button:"Chat_options__button__jWpX4",background__red:"Chat_background__red__ha0rU",main__right:"Chat_main__right__XCVCh",main__chat_window:"Chat_main__chat_window__yAamR",main__message_container:"Chat_main__message_container__tfJhQ",messages:"Chat_messages__JaF3N",message:"Chat_message__hRlwN",video_grid:"Chat_video_grid__Iervg",showChat:"Chat_showChat__ldO7h",header__back:"Chat_header__back__dLaYy"}},1163:function(e,t,n){e.exports=n(387)},461:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var i=n(7294),o=n(6489);function s(e,t){void 0===t&&(t={});var n=function(e){if(e&&"j"===e[0]&&":"===e[1])return e.substr(2);return e}(e);if(function(e,t){return"undefined"===typeof t&&(t=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!t}(n,t.doNotParse))try{return JSON.parse(n)}catch(i){}return e}var r=function(){return r=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},a=function(){function e(e,t){var n=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,t){return"string"===typeof e?o.Q(e,t):"object"===typeof e&&null!==e?e:{}}(e,t),new Promise((function(){n.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=o.Q(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,n){return void 0===t&&(t={}),this._updateBrowserValues(n),s(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var n={};for(var i in this.cookies)n[i]=s(this.cookies[i],e);return n},e.prototype.set=function(e,t,n){var i;"object"===typeof t&&(t=JSON.stringify(t)),this.cookies=r(r({},this.cookies),((i={})[e]=t,i)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=o.q(e,t,n)),this._emitChange({name:e,value:t,options:n})},e.prototype.remove=function(e,t){var n=t=r(r({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=r({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=o.q(e,"",n)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}(),c=i.createContext(new a),u=(c.Provider,c.Consumer,c);function l(e){var t=(0,i.useContext)(u);if(!t)throw new Error("Missing <CookiesProvider>");var n=t.getAll(),o=(0,i.useState)(n),s=o[0],r=o[1],a=(0,i.useRef)(s);return"undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement&&(0,i.useLayoutEffect)((function(){function n(){var n=t.getAll();(function(e,t,n){if(!e)return!0;for(var i=0,o=e;i<o.length;i++){var s=o[i];if(t[s]!==n[s])return!0}return!1})(e||null,n,a.current)&&r(n),a.current=n}return t.addChangeListener(n),function(){t.removeChangeListener(n)}}),[t]),[s,(0,i.useMemo)((function(){return t.set.bind(t)}),[t]),(0,i.useMemo)((function(){return t.remove.bind(t)}),[t])]}},7020:function(){},9534:function(e,t,n){"use strict";function i(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},s=Object.keys(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}n.d(t,{Z:function(){return i}})}}]);