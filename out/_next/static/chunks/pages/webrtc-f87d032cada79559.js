(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2128],{33037:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/webrtc",function(){return n(54552)}])},54552:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var r=n(85893),i=n(44108),o=n(73538),s=n(78348),u=n(9315);function a(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Z,{}),(0,r.jsx)(o.Z,{pageTitle:"WebRTC",homePageUrl:"/",homePageText:"Home",activePageText:"Service Details",bgImgClass:"item-bg2"}),(0,r.jsx)(u.Z,{}),(0,r.jsx)(s.Z,{})]})}},11163:function(e,t,n){e.exports=n(90387)},70461:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(67294),i=n(38087);function o(e,t){void 0===t&&(t={});var n=function(e){if(e&&"j"===e[0]&&":"===e[1])return e.substr(2);return e}(e);if(function(e,t){return"undefined"===typeof t&&(t=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!t}(n,t.doNotParse))try{return JSON.parse(n)}catch(r){}return e}var s=function(){return s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},s.apply(this,arguments)},u=function(){function e(e,t){var n=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,t){return"string"===typeof e?i.Q(e,t):"object"===typeof e&&null!==e?e:{}}(e,t),new Promise((function(){n.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=i.Q(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,n){return void 0===t&&(t={}),this._updateBrowserValues(n),o(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var n={};for(var r in this.cookies)n[r]=o(this.cookies[r],e);return n},e.prototype.set=function(e,t,n){var r;"object"===typeof t&&(t=JSON.stringify(t)),this.cookies=s(s({},this.cookies),((r={})[e]=t,r)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(e,t,n)),this._emitChange({name:e,value:t,options:n})},e.prototype.remove=function(e,t){var n=t=s(s({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=s({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(e,"",n)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}(),a=r.createContext(new u),c=(a.Provider,a.Consumer,a);function f(e){var t=(0,r.useContext)(c);if(!t)throw new Error("Missing <CookiesProvider>");var n=t.getAll(),i=(0,r.useState)(n),o=i[0],s=i[1],u=(0,r.useRef)(o);return"undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement&&(0,r.useLayoutEffect)((function(){function n(){var n=t.getAll();(function(e,t,n){if(!e)return!0;for(var r=0,i=e;r<i.length;r++){var o=i[r];if(t[o]!==n[o])return!0}return!1})(e||null,n,u.current)&&s(n),u.current=n}return t.addChangeListener(n),function(){t.removeChangeListener(n)}}),[t]),[o,(0,r.useMemo)((function(){return t.set.bind(t)}),[t]),(0,r.useMemo)((function(){return t.remove.bind(t)}),[t])]}},38087:function(e,t){"use strict";t.Q=function(e,t){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var r={},i=t||{},s=e.split(";"),u=i.decode||n,a=0;a<s.length;a++){var c=s[a],f=c.indexOf("=");if(!(f<0)){var p=c.substring(0,f).trim();if(void 0==r[p]){var h=c.substring(f+1,c.length).trim();'"'===h[0]&&(h=h.slice(1,-1)),r[p]=o(h,u)}}}return r},t.q=function(e,t,n){var o=n||{},s=o.encode||r;if("function"!==typeof s)throw new TypeError("option encode is invalid");if(!i.test(e))throw new TypeError("argument name is invalid");var u=s(t);if(u&&!i.test(u))throw new TypeError("argument val is invalid");var a=e+"="+u;if(null!=o.maxAge){var c=o.maxAge-0;if(isNaN(c)||!isFinite(c))throw new TypeError("option maxAge is invalid");a+="; Max-Age="+Math.floor(c)}if(o.domain){if(!i.test(o.domain))throw new TypeError("option domain is invalid");a+="; Domain="+o.domain}if(o.path){if(!i.test(o.path))throw new TypeError("option path is invalid");a+="; Path="+o.path}if(o.expires){if("function"!==typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");a+="; Expires="+o.expires.toUTCString()}o.httpOnly&&(a+="; HttpOnly");o.secure&&(a+="; Secure");if(o.sameSite){switch("string"===typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:a+="; SameSite=Strict";break;case"lax":a+="; SameSite=Lax";break;case"strict":a+="; SameSite=Strict";break;case"none":a+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return a};var n=decodeURIComponent,r=encodeURIComponent,i=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function o(e,t){try{return t(e)}catch(n){return e}}},20943:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,{Z:function(){return r}})},13375:function(e,t,n){"use strict";function r(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,{Z:function(){return r}})},99534:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}n.d(t,{Z:function(){return r}})},828:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(13375);var i=n(91566);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||(0,r.Z)(e,t)||(0,i.Z)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},91566:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(20943);function i(e,t){if(e){if("string"===typeof e)return(0,r.Z)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return "Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,r.Z)(e,t):void 0;}}}},function(e){e.O(0,[1664,7112,9774,2888,179],(function(){return t=33037,e(e.s=t);var t}));var t=e.O();_N_E=t}]);