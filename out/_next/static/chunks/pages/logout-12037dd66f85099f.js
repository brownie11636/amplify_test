(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[765],{6489:function(e,t){"use strict";t.Q=function(e,t){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var r={},i=t||{},u=e.split(";"),a=i.decode||n,s=0;s<u.length;s++){var c=u[s],f=c.indexOf("=");if(!(f<0)){var p=c.substring(0,f).trim();if(void 0==r[p]){var h=c.substring(f+1,c.length).trim();'"'===h[0]&&(h=h.slice(1,-1)),r[p]=o(h,a)}}}return r},t.q=function(e,t,n){var o=n||{},u=o.encode||r;if("function"!==typeof u)throw new TypeError("option encode is invalid");if(!i.test(e))throw new TypeError("argument name is invalid");var a=u(t);if(a&&!i.test(a))throw new TypeError("argument val is invalid");var s=e+"="+a;if(null!=o.maxAge){var c=o.maxAge-0;if(isNaN(c)||!isFinite(c))throw new TypeError("option maxAge is invalid");s+="; Max-Age="+Math.floor(c)}if(o.domain){if(!i.test(o.domain))throw new TypeError("option domain is invalid");s+="; Domain="+o.domain}if(o.path){if(!i.test(o.path))throw new TypeError("option path is invalid");s+="; Path="+o.path}if(o.expires){if("function"!==typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");s+="; Expires="+o.expires.toUTCString()}o.httpOnly&&(s+="; HttpOnly");o.secure&&(s+="; Secure");if(o.sameSite){switch("string"===typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;case"none":s+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return s};var n=decodeURIComponent,r=encodeURIComponent,i=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function o(e,t){try{return t(e)}catch(n){return e}}},5852:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/logout",function(){return n(2166)}])},2166:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(4051),i=n.n(r),o=n(5893),u=n(7294),a=n(461),s=n(1163),c=n.n(s),f=n(9473);n(6166);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function h(e,t,n,r,i,o,u){try{var a=e[o](u),s=a.value}catch(c){return void n(c)}a.done?t(s):Promise.resolve(s).then(r,i)}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);u=!0);}catch(s){a=!0,i=s}finally{try{u||null==n.return||n.return()}finally{if(a)throw i}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(){(0,f.I0)();var e=l((0,a.Z)(["id","nickname"]),2),t=(e[0],e[1]),n=function(){var e,n=(e=i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t("id"),t("nickname");case 2:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function u(e){h(o,r,i,u,a,"next",e)}function a(e){h(o,r,i,u,a,"throw",e)}u(void 0)}))});return function(){return n.apply(this,arguments)}}();return(0,u.useEffect)((function(){n(),c().push("/")}),[]),(0,o.jsx)("div",{children:"logout!"})}},1163:function(e,t,n){e.exports=n(880)},461:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(7294),i=n(6489);function o(e,t){void 0===t&&(t={});var n=function(e){if(e&&"j"===e[0]&&":"===e[1])return e.substr(2);return e}(e);if(function(e,t){return"undefined"===typeof t&&(t=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!t}(n,t.doNotParse))try{return JSON.parse(n)}catch(r){}return e}var u=function(){return u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},u.apply(this,arguments)},a=function(){function e(e,t){var n=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,t){return"string"===typeof e?i.Q(e,t):"object"===typeof e&&null!==e?e:{}}(e,t),new Promise((function(){n.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=i.Q(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,n){return void 0===t&&(t={}),this._updateBrowserValues(n),o(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var n={};for(var r in this.cookies)n[r]=o(this.cookies[r],e);return n},e.prototype.set=function(e,t,n){var r;"object"===typeof t&&(t=JSON.stringify(t)),this.cookies=u(u({},this.cookies),((r={})[e]=t,r)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(e,t,n)),this._emitChange({name:e,value:t,options:n})},e.prototype.remove=function(e,t){var n=t=u(u({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=u({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(e,"",n)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}(),s=r.createContext(new a),c=(s.Provider,s.Consumer,s);function f(e){var t=(0,r.useContext)(c);if(!t)throw new Error("Missing <CookiesProvider>");var n=t.getAll(),i=(0,r.useState)(n),o=i[0],u=i[1],a=(0,r.useRef)(o);return"undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement&&(0,r.useLayoutEffect)((function(){function n(){var n=t.getAll();(function(e,t,n){if(!e)return!0;for(var r=0,i=e;r<i.length;r++){var o=i[r];if(t[o]!==n[o])return!0}return!1})(e||null,n,a.current)&&u(n),a.current=n}return t.addChangeListener(n),function(){t.removeChangeListener(n)}}),[t]),[o,(0,r.useMemo)((function(){return t.set.bind(t)}),[t]),(0,r.useMemo)((function(){return t.remove.bind(t)}),[t])]}}},function(e){e.O(0,[9774,2888,179],(function(){return t=5852,e(e.s=t);var t}));var t=e.O();_N_E=t}]);