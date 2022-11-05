(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[765],{76489:function(t,e){"use strict";e.Q=function(t,e){if("string"!==typeof t)throw new TypeError("argument str must be a string");for(var r={},i=e||{},u=t.split(";"),s=i.decode||n,a=0;a<u.length;a++){var c=u[a],f=c.indexOf("=");if(!(f<0)){var p=c.substring(0,f).trim();if(void 0==r[p]){var d=c.substring(f+1,c.length).trim();'"'===d[0]&&(d=d.slice(1,-1)),r[p]=o(d,s)}}}return r},e.q=function(t,e,n){var o=n||{},u=o.encode||r;if("function"!==typeof u)throw new TypeError("option encode is invalid");if(!i.test(t))throw new TypeError("argument name is invalid");var s=u(e);if(s&&!i.test(s))throw new TypeError("argument val is invalid");var a=t+"="+s;if(null!=o.maxAge){var c=o.maxAge-0;if(isNaN(c)||!isFinite(c))throw new TypeError("option maxAge is invalid");a+="; Max-Age="+Math.floor(c)}if(o.domain){if(!i.test(o.domain))throw new TypeError("option domain is invalid");a+="; Domain="+o.domain}if(o.path){if(!i.test(o.path))throw new TypeError("option path is invalid");a+="; Path="+o.path}if(o.expires){if("function"!==typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");a+="; Expires="+o.expires.toUTCString()}o.httpOnly&&(a+="; HttpOnly");o.secure&&(a+="; Secure");if(o.sameSite){switch("string"===typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:a+="; SameSite=Strict";break;case"lax":a+="; SameSite=Lax";break;case"strict":a+="; SameSite=Strict";break;case"none":a+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return a};var n=decodeURIComponent,r=encodeURIComponent,i=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function o(t,e){try{return e(t)}catch(n){return t}}},59608:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/logout",function(){return n(67024)}])},67024:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return h}});var r=n(47568),i=n(828),o=n(34051),u=n.n(o),s=n(85893),a=n(67294),c=n(70461),f=n(11163),p=n.n(f),d=n(9473);n(32505);function h(){(0,d.I0)();var t=(0,i.Z)((0,c.Z)(["id","nickname"]),2),e=(t[0],t[1]),n=function(){var t=(0,r.Z)(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e("id"),e("nickname");case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,a.useEffect)((function(){n(),p().push("/")}),[]),(0,s.jsx)("div",{children:"logout!"})}},11163:function(t,e,n){t.exports=n(90387)},70461:function(t,e,n){"use strict";n.d(e,{Z:function(){return f}});var r=n(67294),i=n(76489);function o(t,e){void 0===e&&(e={});var n=function(t){if(t&&"j"===t[0]&&":"===t[1])return t.substr(2);return t}(t);if(function(t,e){return"undefined"===typeof e&&(e=!t||"{"!==t[0]&&"["!==t[0]&&'"'!==t[0]),!e}(n,e.doNotParse))try{return JSON.parse(n)}catch(r){}return t}var u=function(){return u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},u.apply(this,arguments)},s=function(){function t(t,e){var n=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(t,e){return"string"===typeof t?i.Q(t,e):"object"===typeof t&&null!==t?t:{}}(t,e),new Promise((function(){n.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return t.prototype._updateBrowserValues=function(t){this.HAS_DOCUMENT_COOKIE&&(this.cookies=i.Q(document.cookie,t))},t.prototype._emitChange=function(t){for(var e=0;e<this.changeListeners.length;++e)this.changeListeners[e](t)},t.prototype.get=function(t,e,n){return void 0===e&&(e={}),this._updateBrowserValues(n),o(this.cookies[t],e)},t.prototype.getAll=function(t,e){void 0===t&&(t={}),this._updateBrowserValues(e);var n={};for(var r in this.cookies)n[r]=o(this.cookies[r],t);return n},t.prototype.set=function(t,e,n){var r;"object"===typeof e&&(e=JSON.stringify(e)),this.cookies=u(u({},this.cookies),((r={})[t]=e,r)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(t,e,n)),this._emitChange({name:t,value:e,options:n})},t.prototype.remove=function(t,e){var n=e=u(u({},e),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=u({},this.cookies),delete this.cookies[t],this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(t,"",n)),this._emitChange({name:t,value:void 0,options:e})},t.prototype.addChangeListener=function(t){this.changeListeners.push(t)},t.prototype.removeChangeListener=function(t){var e=this.changeListeners.indexOf(t);e>=0&&this.changeListeners.splice(e,1)},t}(),a=r.createContext(new s),c=(a.Provider,a.Consumer,a);function f(t){var e=(0,r.useContext)(c);if(!e)throw new Error("Missing <CookiesProvider>");var n=e.getAll(),i=(0,r.useState)(n),o=i[0],u=i[1],s=(0,r.useRef)(o);return"undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement&&(0,r.useLayoutEffect)((function(){function n(){var n=e.getAll();(function(t,e,n){if(!t)return!0;for(var r=0,i=t;r<i.length;r++){var o=i[r];if(e[o]!==n[o])return!0}return!1})(t||null,n,s.current)&&u(n),s.current=n}return e.addChangeListener(n),function(){e.removeChangeListener(n)}}),[e]),[o,(0,r.useMemo)((function(){return e.set.bind(e)}),[e]),(0,r.useMemo)((function(){return e.remove.bind(e)}),[e])]}},20943:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,{Z:function(){return r}})},47568:function(t,e,n){"use strict";function r(t,e,n,r,i,o,u){try{var s=t[o](u),a=s.value}catch(c){return void n(c)}s.done?e(a):Promise.resolve(a).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var u=t.apply(e,n);function s(t){r(u,i,o,s,a,"next",t)}function a(t){r(u,i,o,s,a,"throw",t)}s(void 0)}))}}n.d(e,{Z:function(){return i}})},13375:function(t,e,n){"use strict";function r(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n.d(e,{Z:function(){return r}})},828:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});var r=n(13375);var i=n(91566);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||(0,r.Z)(t,e)||(0,i.Z)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},91566:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(20943);function i(t,e){if(t){if("string"===typeof t)return(0,r.Z)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,r.Z)(t,e):void 0}}}},function(t){t.O(0,[9774,2888,179],(function(){return e=59608,t(t.s=e);var e}));var e=t.O();_N_E=e}]);