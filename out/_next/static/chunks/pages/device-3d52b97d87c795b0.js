(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7201],{6489:function(e,t){"use strict";t.Q=function(e,t){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var r={},i=t||{},s=e.split(";"),a=i.decode||n,u=0;u<s.length;u++){var c=s[u],f=c.indexOf("=");if(!(f<0)){var l=c.substring(0,f).trim();if(void 0==r[l]){var p=c.substring(f+1,c.length).trim();'"'===p[0]&&(p=p.slice(1,-1)),r[l]=o(p,a)}}}return r},t.q=function(e,t,n){var o=n||{},s=o.encode||r;if("function"!==typeof s)throw new TypeError("option encode is invalid");if(!i.test(e))throw new TypeError("argument name is invalid");var a=s(t);if(a&&!i.test(a))throw new TypeError("argument val is invalid");var u=e+"="+a;if(null!=o.maxAge){var c=o.maxAge-0;if(isNaN(c)||!isFinite(c))throw new TypeError("option maxAge is invalid");u+="; Max-Age="+Math.floor(c)}if(o.domain){if(!i.test(o.domain))throw new TypeError("option domain is invalid");u+="; Domain="+o.domain}if(o.path){if(!i.test(o.path))throw new TypeError("option path is invalid");u+="; Path="+o.path}if(o.expires){if("function"!==typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");u+="; Expires="+o.expires.toUTCString()}o.httpOnly&&(u+="; HttpOnly");o.secure&&(u+="; Secure");if(o.sameSite){switch("string"===typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:u+="; SameSite=Strict";break;case"lax":u+="; SameSite=Lax";break;case"strict":u+="; SameSite=Strict";break;case"none":u+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return u};var n=decodeURIComponent,r=encodeURIComponent,i=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function o(e,t){try{return t(e)}catch(n){return e}}},8503:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/device",function(){return n(5210)}])},3538:function(e,t,n){"use strict";var r=n(1438),i=n(2951),o=n(8029),s=n(5950),a=n(5893),u=n(7294),c=n(1664),f=n.n(c),l=function(e){(0,o.Z)(n,e);var t=(0,s.Z)(n);function n(){return(0,r.Z)(this,n),t.apply(this,arguments)}return(0,i.Z)(n,[{key:"render",value:function(){var e=this.props,t=e.pageTitle,n=e.homePageUrl,r=e.homePageText,i=e.activePageText,o=e.bgImgClass;return(0,a.jsxs)("div",{className:"page-title-area ".concat(o),children:[(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"page-title-content",children:[(0,a.jsx)("h2",{children:t}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:(0,a.jsx)(f(),{href:n,children:(0,a.jsx)("a",{children:r})})}),(0,a.jsx)("li",{children:i})]})]})}),(0,a.jsxs)("div",{className:"lines",children:[(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"})]})]})}}]),n}(u.Component);t.Z=l},5210:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(1438),i=n(2951),o=n(8029),s=n(5950),a=n(5893),u=n(7294),c=n(4108),f=n(3538),l=n(8348),p=n(7568),d=n(4051),h=n.n(d),m=(n(1664),n(5697)),v=n.n(m);function g(e){var t=e.type,n=(e.id,e.coverImage),r=e.title,i=e.summary,o=e.genres;return"movie"===t?(0,a.jsxs)("div",{children:[(0,a.jsx)("img",{src:n,alt:r}),(0,a.jsx)("h2",{}),(0,a.jsx)("p",{children:i.length>235?"".concat(i.slice(0,233),"..."):i}),(0,a.jsx)("ul",{children:o.map((function(e){return(0,a.jsx)("li",{children:e},e)}))})]}):"detail"==t?(0,a.jsxs)("div",{children:[(0,a.jsx)("img",{src:n,alt:r}),(0,a.jsx)("h2",{})]}):(0,a.jsx)("h1",{children:"somethings wrong!"})}g.prototype={type:v().string,id:v().number.isRequired,coverImage:v().string.isRequired,title:v().string.isRequired,summary:v().string.isRequired,genres:v().arrayOf(v().string).isRequired};var y=g,x=function(){var e=(0,u.useState)(!0),t=e[0],n=e[1],r=(0,u.useState)([]),i=r[0],o=r[1],s=function(){var e=(0,p.Z)(h().mark((function e(){var t;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");case 2:return e.next=4,e.sent.json();case 4:t=e.sent,o(t.data.movies),n(!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){s()}),[]),console.log(i),(0,a.jsx)("div",{children:t?(0,a.jsx)("h1",{children:"loading..."}):(0,a.jsx)("div",{children:i.map((function(e){return(0,a.jsx)(y,{type:"movie",id:e.id,coverImage:e.medium_cover_image,title:e.title,summary:e.summary,genres:e.genres},e.id)}))})})},w=function(e){(0,o.Z)(n,e);var t=(0,s.Z)(n);function n(){return(0,r.Z)(this,n),t.apply(this,arguments)}return(0,i.Z)(n,[{key:"render",value:function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.Z,{}),(0,a.jsx)(f.Z,{pageTitle:"Device List",homePageUrl:"/",homePageText:"Home",activePageText:"Device",bgImgClass:"item-bg1"}),(0,a.jsx)(x,{}),(0,a.jsx)(l.Z,{})]})}}]),n}(u.Component),j=w},1163:function(e,t,n){e.exports=n(387)},2703:function(e,t,n){"use strict";var r=n(414);function i(){}function o(){}o.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,o,s){if(s!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:i};return n.PropTypes=n,n}},5697:function(e,t,n){e.exports=n(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},461:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(7294),i=n(6489);function o(e,t){void 0===t&&(t={});var n=function(e){if(e&&"j"===e[0]&&":"===e[1])return e.substr(2);return e}(e);if(function(e,t){return"undefined"===typeof t&&(t=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!t}(n,t.doNotParse))try{return JSON.parse(n)}catch(r){}return e}var s=function(){return s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},s.apply(this,arguments)},a=function(){function e(e,t){var n=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,t){return"string"===typeof e?i.Q(e,t):"object"===typeof e&&null!==e?e:{}}(e,t),new Promise((function(){n.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=i.Q(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,n){return void 0===t&&(t={}),this._updateBrowserValues(n),o(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var n={};for(var r in this.cookies)n[r]=o(this.cookies[r],e);return n},e.prototype.set=function(e,t,n){var r;"object"===typeof t&&(t=JSON.stringify(t)),this.cookies=s(s({},this.cookies),((r={})[e]=t,r)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(e,t,n)),this._emitChange({name:e,value:t,options:n})},e.prototype.remove=function(e,t){var n=t=s(s({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=s({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.q(e,"",n)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}(),u=r.createContext(new a),c=(u.Provider,u.Consumer,u);function f(e){var t=(0,r.useContext)(c);if(!t)throw new Error("Missing <CookiesProvider>");var n=t.getAll(),i=(0,r.useState)(n),o=i[0],s=i[1],a=(0,r.useRef)(o);return"undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement&&(0,r.useLayoutEffect)((function(){function n(){var n=t.getAll();(function(e,t,n){if(!e)return!0;for(var r=0,i=e;r<i.length;r++){var o=i[r];if(t[o]!==n[o])return!0}return!1})(e||null,n,a.current)&&s(n),a.current=n}return t.addChangeListener(n),function(){t.removeChangeListener(n)}}),[t]),[o,(0,r.useMemo)((function(){return t.set.bind(t)}),[t]),(0,r.useMemo)((function(){return t.remove.bind(t)}),[t])]}},943:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,{Z:function(){return r}})},7568:function(e,t,n){"use strict";function r(e,t,n,r,i,o,s){try{var a=e[o](s),u=a.value}catch(c){return void n(c)}a.done?t(u):Promise.resolve(u).then(r,i)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var s=e.apply(t,n);function a(e){r(s,i,o,a,u,"next",e)}function u(e){r(s,i,o,a,u,"throw",e)}a(void 0)}))}}n.d(t,{Z:function(){return i}})},3375:function(e,t,n){"use strict";function r(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,{Z:function(){return r}})},9534:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}n.d(t,{Z:function(){return r}})},828:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(3375);var i=n(1566);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||(0,r.Z)(e,t)||(0,i.Z)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1566:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(943);function i(e,t){if(e){if("string"===typeof e)return(0,r.Z)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,r.Z)(e,t):void 0}}}},function(e){e.O(0,[1664,4569,9774,2888,179],(function(){return t=8503,e(e.s=t);var t}));var t=e.O();_N_E=t}]);