(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2561],{4871:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/services-four",function(){return t(8354)}])},50:function(e,n,t){"use strict";var r=t(5893),a=t(7294),i=t(1664),o=t.n(i);function c(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function s(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function u(e,n){return!n||"object"!==d(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function f(e,n){return f=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},f(e,n)}var d=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function v(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=l(e);if(n){var a=l(this).constructor;t=Reflect.construct(r,arguments,a)}else t=r.apply(this,arguments);return u(this,t)}}var h=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&f(e,n)}(l,e);var n,t,a,i=v(l);function l(){return c(this,l),i.apply(this,arguments)}return n=l,(t=[{key:"render",value:function(){var e=this.props,n=e.pageTitle,t=e.homePageUrl,a=e.homePageText,i=e.activePageText,c=e.bgImgClass;return(0,r.jsxs)("div",{className:"page-title-area ".concat(c),children:[(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"page-title-content",children:[(0,r.jsx)("h2",{children:n}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(o(),{href:t,children:(0,r.jsx)("a",{children:a})})}),(0,r.jsx)("li",{children:i})]})]})}),(0,r.jsxs)("div",{className:"lines",children:[(0,r.jsx)("div",{className:"line"}),(0,r.jsx)("div",{className:"line"}),(0,r.jsx)("div",{className:"line"})]})]})}}])&&s(n.prototype,t),a&&s(n,a),l}(a.Component);n.Z=h},4119:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var r=t(5893),a=t(7294),i=t(986),o=t(461);function c(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function s(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,a,i=[],o=!0,c=!1;try{for(t=t.call(e);!(o=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);o=!0);}catch(s){c=!0,a=s}finally{try{o||null==t.return||t.return()}finally{if(c)throw a}}return i}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return c(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return c(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(){var e=(0,a.useState)(!0),n=e[0],t=e[1],c=(0,a.useState)(!1),l=c[0],u=c[1],f=s((0,o.Z)(["id"]),2),d=f[0];f[1];(0,a.useEffect)((function(){return"undefined"!==d.id?u(!0):u(!1),document.getElementById("navbar").classList.add("is-sticky"),function(){!1}}),[]);var v=n?"collapse navbar-collapse":"collapse navbar-collapse show",h=n?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,r.jsx)("div",{className:"main-nav",children:(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("nav",{className:"navbar navbar-expand-md navbar-light",children:[(0,r.jsx)(i.Z,{href:"/",children:(0,r.jsxs)("a",{className:"navbar-brand",children:[(0,r.jsx)("img",{src:"/images/main_logo3.png",className:"main-logo",alt:"logo"}),(0,r.jsx)("img",{src:"/images/main_logo3.png",className:"optional-logo",alt:"logo"})]})}),(0,r.jsxs)("button",{onClick:function(){t((function(e){return!e}))},className:h,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,r.jsx)("span",{className:"icon-bar top-bar"}),(0,r.jsx)("span",{className:"icon-bar middle-bar"}),(0,r.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,r.jsxs)("div",{className:v,id:"navbarSupportedContent",children:[(0,r.jsxs)("ul",{className:"navbar-nav",children:[(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Home"})})}),(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/about",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"About Us"})})}),(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/services",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Services"})})}),(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/contact",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Contact"})})}),!l&&(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/registration",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Registration"})})}),l?(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/logout",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Log Out"})})}):(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/login",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Log In"})})})]}),(0,r.jsx)("div",{className:"others-options"})]})]})})})})})}},8354:function(e,n,t){"use strict";t.r(n);var r=t(5893),a=t(7294),i=(t(1664),t(4119)),o=(t(50),t(6866));function c(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function s(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function u(e,n){return!n||"object"!==d(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function f(e,n){return f=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},f(e,n)}var d=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function v(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=l(e);if(n){var a=l(this).constructor;t=Reflect.construct(r,arguments,a)}else t=r.apply(this,arguments);return u(this,t)}}var h=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&f(e,n)}(u,e);var n,t,a,l=v(u);function u(){return c(this,u),l.apply(this,arguments)}return n=u,(t=[{key:"render",value:function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Z,{}),(0,r.jsx)("div",{}),(0,r.jsx)(o.Z,{})]})}}])&&s(n.prototype,t),a&&s(n,a),u}(a.Component);n.default=h}},function(e){e.O(0,[5637,1309,9774,2888,179],(function(){return n=4871,e(e.s=n);var n}));var n=e.O();_N_E=n}]);