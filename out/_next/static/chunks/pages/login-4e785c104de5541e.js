(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3459],{76489:function(e,n){"use strict";n.Q=function(e,n){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var i={},r=n||{},s=e.split(";"),o=r.decode||t,c=0;c<s.length;c++){var l=s[c],u=l.indexOf("=");if(!(u<0)){var d=l.substring(0,u).trim();if(void 0==i[d]){var h=l.substring(u+1,l.length).trim();'"'===h[0]&&(h=h.slice(1,-1)),i[d]=a(h,o)}}}return i},n.q=function(e,n,t){var a=t||{},s=a.encode||i;if("function"!==typeof s)throw new TypeError("option encode is invalid");if(!r.test(e))throw new TypeError("argument name is invalid");var o=s(n);if(o&&!r.test(o))throw new TypeError("argument val is invalid");var c=e+"="+o;if(null!=a.maxAge){var l=a.maxAge-0;if(isNaN(l)||!isFinite(l))throw new TypeError("option maxAge is invalid");c+="; Max-Age="+Math.floor(l)}if(a.domain){if(!r.test(a.domain))throw new TypeError("option domain is invalid");c+="; Domain="+a.domain}if(a.path){if(!r.test(a.path))throw new TypeError("option path is invalid");c+="; Path="+a.path}if(a.expires){if("function"!==typeof a.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+a.expires.toUTCString()}a.httpOnly&&(c+="; HttpOnly");a.secure&&(c+="; Secure");if(a.sameSite){switch("string"===typeof a.sameSite?a.sameSite.toLowerCase():a.sameSite){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;case"none":c+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return c};var t=decodeURIComponent,i=encodeURIComponent,r=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function a(e,n){try{return n(e)}catch(t){return e}}},36429:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return t(16984)}])},73538:function(e,n,t){"use strict";var i=t(51438),r=t(52951),a=t(88029),s=t(5950),o=t(85893),c=t(67294),l=t(41664),u=t.n(l),d=function(e){(0,a.Z)(t,e);var n=(0,s.Z)(t);function t(){return(0,i.Z)(this,t),n.apply(this,arguments)}return(0,r.Z)(t,[{key:"render",value:function(){var e=this.props,n=e.pageTitle,t=e.homePageUrl,i=e.homePageText,r=e.activePageText,a=e.bgImgClass;return(0,o.jsxs)("div",{className:"page-title-area ".concat(a),children:[(0,o.jsx)("div",{className:"container",children:(0,o.jsxs)("div",{className:"page-title-content",children:[(0,o.jsx)("h2",{children:n}),(0,o.jsxs)("ul",{children:[(0,o.jsx)("li",{children:(0,o.jsx)(u(),{href:t,children:(0,o.jsx)("a",{children:i})})}),(0,o.jsx)("li",{children:r})]})]})}),(0,o.jsxs)("div",{className:"lines",children:[(0,o.jsx)("div",{className:"line"}),(0,o.jsx)("div",{className:"line"}),(0,o.jsx)("div",{className:"line"})]})]})}}]),t}(c.Component);n.Z=d},78348:function(e,n,t){"use strict";var i=t(51438),r=t(52951),a=t(88029),s=t(5950),o=t(85893),c=t(67294),l=t(41664),u=t.n(l),d=function(e){(0,a.Z)(t,e);var n=(0,s.Z)(t);function t(){return(0,i.Z)(this,t),n.apply(this,arguments)}return(0,r.Z)(t,[{key:"render",value:function(){(new Date).getFullYear();return(0,o.jsxs)("footer",{className:"footer-area",children:[(0,o.jsx)("div",{className:"container",children:(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-md-12",children:(0,o.jsx)("div",{className:"single-footer-widget",children:(0,o.jsxs)("div",{className:"footer-contact-list",children:[(0,o.jsx)("div",{className:"title",children:"Contacts"}),(0,o.jsxs)("div",{className:"info",children:[(0,o.jsx)("strong",{children:"Email:"})," jangjun_park@portal301.com"]}),(0,o.jsxs)("div",{className:"info",children:[(0,o.jsx)("strong",{children:"Phone:"})," +82 10-5609-9527"]})]})})})})}),(0,o.jsx)("div",{className:"copyright-area",children:(0,o.jsx)("div",{className:"container",children:(0,o.jsx)("div",{className:"row align-items-center",children:(0,o.jsx)("div",{className:"col-md-12",children:(0,o.jsx)("ul",{children:(0,o.jsx)("li",{children:(0,o.jsx)(u(),{href:"/",children:(0,o.jsx)("a",{children:"\xa9 Copyright PORTAL301 All Rights Reserved."})})})})})})})})]})}}]),t}(c.Component);n.Z=d},44108:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var i=t(828),r=t(82222),a=t(85893),s=t(67294),o=t(13823),c=t(70461),l=t(9473),u=t(32505);function d(){var e=(0,l.I0)(),n=(0,l.v9)(u.h5),t=(0,s.useRef)(),d=(0,l.v9)(u.L4),h=(0,s.useState)(!0),f=h[0],m=h[1],v=(0,i.Z)((0,c.Z)(["id","nickname"]),2),p=v[0];v[1];(0,s.useEffect)((function(){return console.log("cookies.id:",p.id),"undefined"===p.id&&console.log("aaaaaaaaa",(0,r.Z)(p.id)),void 0===p.id||"undefined"===p.id?(t.current=!1,e((0,u.Q2)(!1)),e((0,u.vm)("")),e((0,u.ng)(""))):(t.current=!0,e((0,u.Q2)(!0)),e((0,u.vm)(p.id)),e((0,u.ng)(p.nickname))),console.log("is?",t.current),document.getElementById("navbar").classList.add("is-sticky"),function(){!1}}),[]);var g=f?"collapse navbar-collapse":"collapse navbar-collapse show",x=f?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,a.jsx)("div",{className:"main-nav",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"navbar navbar-expand-md navbar-light",children:[(0,a.jsx)(o.Z,{href:"/",children:(0,a.jsxs)("a",{className:"navbar-brand",children:[(0,a.jsx)("img",{src:"/images/main_bar.png",className:"main-bar",alt:"logo"}),(0,a.jsx)("img",{src:"/images/main_logo3.png",className:"optional-logo",alt:"logo"})]})}),(0,a.jsxs)("button",{onClick:function(){m((function(e){return!e}))},className:x,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,a.jsx)("span",{className:"icon-bar top-bar"}),(0,a.jsx)("span",{className:"icon-bar middle-bar"}),(0,a.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,a.jsxs)("div",{className:g,id:"navbarSupportedContent",children:[(0,a.jsxs)("ul",{className:"navbar-nav",children:[!1===n?(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(o.Z,{href:"/registration",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Registration"})})}):(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(o.Z,{href:"/mypage",activeClassName:"active",children:(0,a.jsxs)("a",{className:"nav-link",children:[d,"\ub2d8"]})})}),!1===n?(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(o.Z,{href:"/login",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Log In"})})}):(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(o.Z,{href:"/logout",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Log Out"})})})]}),(0,a.jsx)("div",{className:"others-options"})]})]})})})})})}},16984:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return j}});var i=t(51351),r=t(85893),a=t(67294),s=t(44108),o=t(78348),c=t(47568),l=t(828),u=t(34051),d=t.n(u),h=t(11163),f=t(70461),m=t(49763),v=t.n(m),p=t(13823);function g(){var e=(0,h.useRouter)(),n=(0,l.Z)((0,f.Z)(["id"]),2),t=n[0],i=n[1],s=(0,a.useState)("\uc774\uba54\uc77c\uacfc \ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694"),o=s[0],u=s[1],m=(0,a.useState)("black"),g=m[0],x=m[1],j=(0,a.useState)(""),y=j[0],N=j[1],_=(0,a.useState)(""),b=_[0],w=_[1];function C(){return Z.apply(this,arguments)}function Z(){return(Z=(0,c.Z)(d().mark((function n(){var t,r,a;return d().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("loginSubmit func"),n.next=3,fetch("https://localhost:3333/login/session",{method:"POST",body:JSON.stringify({email:y,password:b}),headers:{"Content-Type":"application/json"}});case 3:return t=n.sent,n.next=6,t.json();case 6:r=n.sent,200===(a=t.status)?(console.log(r),i("id",r.id,{maxAge:2e3}),i("nickname",r.nickname,{maxAge:2e3}),e.push("/")):400===a?(u("\uc798\ubabb\ub41c \ube44\ubc00\ubc88\ud638\uc785\ub2c8\ub2e4."),x("red")):404===a?(u("\uc720\uc800\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4"),x("red")):500===a?(u("\uc11c\ubc84\uc5d0 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4"),x("red")):(u("\uc54c \uc218 \uc5c6\ub294 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4"),x("red"));case 9:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,a.useEffect)((function(){"undefined"!==t.id&&void 0!==t.id||console.log("lg component err")}),[]),(0,r.jsx)("div",{className:v().wrap,onKeyPress:function(e){"Enter"===e.key&&(console.log("Press Enter"),C())},children:(0,r.jsxs)("div",{className:v().login,children:[(0,r.jsx)("h1",{children:"Welcome to Portal301 !"}),(0,r.jsxs)("div",{className:v().login_sns,children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"",children:(0,r.jsx)("i",{className:"fab fa-instagram"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"",children:(0,r.jsx)("i",{className:"fab fa-facebook-f"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"",children:(0,r.jsx)("i",{className:"fab fa-twitter"})})})]}),(0,r.jsxs)("div",{className:v().login_id,children:[(0,r.jsx)("h4",{children:"E-mail"}),(0,r.jsx)("input",{value:y,onChange:function(e){N(e.target.value)},type:"email",placeholder:"Email"})]}),(0,r.jsxs)("div",{className:v().login_id,children:[(0,r.jsx)("h4",{children:"Password"}),(0,r.jsx)("input",{value:b,onChange:function(e){w(e.target.value)},type:"password",placeholder:"Password"})]}),(0,r.jsxs)("div",{className:v().submit,children:[(0,r.jsx)("span",{style:{color:g},children:o}),(0,r.jsx)("br",{}),(0,r.jsx)("input",{type:"submit",value:"submit",onClick:C})]}),(0,r.jsxs)("div",{className:v().login_etc,children:[(0,r.jsx)(p.Z,{href:"/",activeClassName:"active",children:(0,r.jsx)("a",{style:{marginRight:10},children:"Forgot Password?"})}),(0,r.jsx)(p.Z,{href:"/registration",activeClassName:"active",children:(0,r.jsx)("a",{children:"Create New Account"})})]})]})})}var x=t(73538);function j(e){e=null!==e?e:(0,i.Z)(new TypeError("Cannot destructure undefined"));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{}),(0,r.jsx)(x.Z,{pageTitle:"Sign-In",homePageUrl:"/",homePageText:"Home",activePageText:"Sign-In",bgImgClass:"item-bg1"}),(0,r.jsx)(g,{}),(0,r.jsx)(o.Z,{})]})}},13823:function(e,n,t){"use strict";var i=t(26042),r=t(69396),a=t(99534),s=t(85893),o=t(11163),c=t(41664),l=t.n(c),u=t(67294);n.Z=(0,o.withRouter)((function(e){var n=e.router,t=e.children,o=(0,a.Z)(e,["router","children"]),c=u.Children.only(t),d=c.props.className||"";return n.pathname===o.href&&o.activeClassName&&(d="".concat(d," ").concat(o.activeClassName).trim()),delete o.activeClassName,(0,s.jsx)(l(),(0,r.Z)((0,i.Z)({},o),{children:u.cloneElement(c,{className:d})}))}))},49763:function(e){e.exports={root:"login2_root__y0aVy",a:"login2_a__FI_Tp",li:"login2_li__GcEX5",wrap:"login2_wrap__3mn_i",login:"login2_login__dsv_Z",h2:"login2_h2__JK8l1",login_sns:"login2_login_sns__54AbR",login_id:"login2_login_id__cRZz6",login_pw:"login2_login_pw__Bd3_V",login_etc:"login2_login_etc__DrUMC",submit:"login2_submit__B_3VZ"}},11163:function(e,n,t){e.exports=t(90387)},70461:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var i=t(67294),r=t(76489);function a(e,n){void 0===n&&(n={});var t=function(e){if(e&&"j"===e[0]&&":"===e[1])return e.substr(2);return e}(e);if(function(e,n){return"undefined"===typeof n&&(n=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!n}(t,n.doNotParse))try{return JSON.parse(t)}catch(i){}return e}var s=function(){return s=Object.assign||function(e){for(var n,t=1,i=arguments.length;t<i;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},s.apply(this,arguments)},o=function(){function e(e,n){var t=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,n){return"string"===typeof e?r.Q(e,n):"object"===typeof e&&null!==e?e:{}}(e,n),new Promise((function(){t.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=r.Q(document.cookie,e))},e.prototype._emitChange=function(e){for(var n=0;n<this.changeListeners.length;++n)this.changeListeners[n](e)},e.prototype.get=function(e,n,t){return void 0===n&&(n={}),this._updateBrowserValues(t),a(this.cookies[e],n)},e.prototype.getAll=function(e,n){void 0===e&&(e={}),this._updateBrowserValues(n);var t={};for(var i in this.cookies)t[i]=a(this.cookies[i],e);return t},e.prototype.set=function(e,n,t){var i;"object"===typeof n&&(n=JSON.stringify(n)),this.cookies=s(s({},this.cookies),((i={})[e]=n,i)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=r.q(e,n,t)),this._emitChange({name:e,value:n,options:t})},e.prototype.remove=function(e,n){var t=n=s(s({},n),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=s({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=r.q(e,"",t)),this._emitChange({name:e,value:void 0,options:n})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var n=this.changeListeners.indexOf(e);n>=0&&this.changeListeners.splice(n,1)},e}(),c=i.createContext(new o),l=(c.Provider,c.Consumer,c);function u(e){var n=(0,i.useContext)(l);if(!n)throw new Error("Missing <CookiesProvider>");var t=n.getAll(),r=(0,i.useState)(t),a=r[0],s=r[1],o=(0,i.useRef)(a);return"undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement&&(0,i.useLayoutEffect)((function(){function t(){var t=n.getAll();(function(e,n,t){if(!e)return!0;for(var i=0,r=e;i<r.length;i++){var a=r[i];if(n[a]!==t[a])return!0}return!1})(e||null,t,o.current)&&s(t),o.current=t}return n.addChangeListener(t),function(){n.removeChangeListener(t)}}),[n]),[a,(0,i.useMemo)((function(){return n.set.bind(n)}),[n]),(0,i.useMemo)((function(){return n.remove.bind(n)}),[n])]}},20943:function(e,n,t){"use strict";function i(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}t.d(n,{Z:function(){return i}})},47568:function(e,n,t){"use strict";function i(e,n,t,i,r,a,s){try{var o=e[a](s),c=o.value}catch(l){return void t(l)}o.done?n(c):Promise.resolve(c).then(i,r)}function r(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var s=e.apply(n,t);function o(e){i(s,r,a,o,c,"next",e)}function c(e){i(s,r,a,o,c,"throw",e)}o(void 0)}))}}t.d(n,{Z:function(){return r}})},13375:function(e,n,t){"use strict";function i(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}t.d(n,{Z:function(){return i}})},99534:function(e,n,t){"use strict";function i(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}t.d(n,{Z:function(){return i}})},828:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}});var i=t(13375);var r=t(91566);function a(e,n){return function(e){if(Array.isArray(e))return e}(e)||(0,i.Z)(e,n)||(0,r.Z)(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},51351:function(e,n,t){"use strict";function i(e){throw e}t.d(n,{Z:function(){return i}})},91566:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var i=t(20943);function r(e,n){if(e){if("string"===typeof e)return(0,i.Z)(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?(0,i.Z)(e,n):void 0}}}},function(e){e.O(0,[1664,9774,2888,179],(function(){return n=36429,e(e.s=n);var n}));var n=e.O();_N_E=n}]);