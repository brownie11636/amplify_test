(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5959],{7115:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/services-three",function(){return i(9095)}])},50:function(e,n,i){"use strict";var s=i(5893),r=i(7294),a=i(1664),c=i.n(a);function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function l(e,n){for(var i=0;i<n.length;i++){var s=n[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}function d(e,n){return!n||"object"!==u(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function m(e,n){return m=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},m(e,n)}var u=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function h(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,s=o(e);if(n){var r=o(this).constructor;i=Reflect.construct(s,arguments,r)}else i=s.apply(this,arguments);return d(this,i)}}var f=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&m(e,n)}(o,e);var n,i,r,a=h(o);function o(){return t(this,o),a.apply(this,arguments)}return n=o,(i=[{key:"render",value:function(){var e=this.props,n=e.pageTitle,i=e.homePageUrl,r=e.homePageText,a=e.activePageText,t=e.bgImgClass;return(0,s.jsxs)("div",{className:"page-title-area ".concat(t),children:[(0,s.jsx)("div",{className:"container",children:(0,s.jsxs)("div",{className:"page-title-content",children:[(0,s.jsx)("h2",{children:n}),(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:(0,s.jsx)(c(),{href:i,children:(0,s.jsx)("a",{children:r})})}),(0,s.jsx)("li",{children:a})]})]})}),(0,s.jsxs)("div",{className:"lines",children:[(0,s.jsx)("div",{className:"line"}),(0,s.jsx)("div",{className:"line"}),(0,s.jsx)("div",{className:"line"})]})]})}}])&&l(n.prototype,i),r&&l(n,r),o}(r.Component);n.Z=f},4119:function(e,n,i){"use strict";i.d(n,{Z:function(){return m}});var s=i(5893),r=i(7294),a=i(986),c=i(461),t=i(9473),l=i(6166);function o(e,n){(null==n||n>e.length)&&(n=e.length);for(var i=0,s=new Array(n);i<n;i++)s[i]=e[i];return s}function d(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var i=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var s,r,a=[],c=!0,t=!1;try{for(i=i.call(e);!(c=(s=i.next()).done)&&(a.push(s.value),!n||a.length!==n);c=!0);}catch(l){t=!0,r=l}finally{try{c||null==i.return||i.return()}finally{if(t)throw r}}return a}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return o(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(i);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return o(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(){var e=(0,t.I0)(),n=(0,t.v9)(l.h5),i=(0,t.v9)(l.L4),o=(0,r.useState)(!0),m=o[0],u=o[1],h=d((0,c.Z)(["id","nickname"]),2),f=h[0];h[1];(0,r.useEffect)((function(){return"undefined"!==f.id?(console.log("cookies.id",f.id),e((0,l.Q2)(!0)),e((0,l.vm)(f.id)),e((0,l.ng)(f.nickname))):(console.log("cookies.id",f.id),e((0,l.Q2)(!1)),e((0,l.vm)("")),e((0,l.ng)(""))),document.getElementById("navbar").classList.add("is-sticky"),function(){!1}}),[]);var v=m?"collapse navbar-collapse":"collapse navbar-collapse show",x=m?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,s.jsx)("div",{className:"main-nav",children:(0,s.jsx)("div",{className:"container",children:(0,s.jsxs)("nav",{className:"navbar navbar-expand-md navbar-light",children:[(0,s.jsx)(a.Z,{href:"/",children:(0,s.jsxs)("a",{className:"navbar-brand",children:[(0,s.jsx)("img",{src:"/images/main_logo3.png",className:"main-logo",alt:"logo"}),(0,s.jsx)("img",{src:"/images/main_logo3.png",className:"optional-logo",alt:"logo"})]})}),(0,s.jsxs)("button",{onClick:function(){u((function(e){return!e}))},className:x,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,s.jsx)("span",{className:"icon-bar top-bar"}),(0,s.jsx)("span",{className:"icon-bar middle-bar"}),(0,s.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,s.jsxs)("div",{className:v,id:"navbarSupportedContent",children:[(0,s.jsxs)("ul",{className:"navbar-nav",children:[(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/",activeClassName:"active",children:(0,s.jsx)("a",{className:"nav-link",children:"Home"})})}),(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/about",activeClassName:"active",children:(0,s.jsx)("a",{className:"nav-link",children:"About Us"})})}),(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/services",activeClassName:"active",children:(0,s.jsx)("a",{className:"nav-link",children:"Services"})})}),(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/contact",activeClassName:"active",children:(0,s.jsx)("a",{className:"nav-link",children:"Contact"})})}),n?(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/mypage",activeClassName:"active",children:(0,s.jsxs)("a",{className:"nav-link",children:[i,"\ub2d8"]})})}):(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/registration",activeClassName:"active",children:(0,s.jsx)("a",{className:"nav-link",children:"Registration"})})}),n?(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/logout",activeClassName:"active",children:(0,s.jsx)("a",{className:"nav-link",children:"Log Out"})})}):(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(a.Z,{href:"/login",activeClassName:"active",children:(0,s.jsx)("a",{className:"nav-link",children:"Log In"})})})]}),(0,s.jsx)("div",{className:"others-options"})]})]})})})})})}},9095:function(e,n,i){"use strict";i.r(n);var s=i(5893),r=i(7294),a=i(1664),c=i.n(a),t=i(4119),l=i(50),o=i(6866);function d(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function m(e,n){for(var i=0;i<n.length;i++){var s=n[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function h(e,n){return!n||"object"!==v(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function f(e,n){return f=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},f(e,n)}var v=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function x(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,s=u(e);if(n){var r=u(this).constructor;i=Reflect.construct(s,arguments,r)}else i=s.apply(this,arguments);return h(this,i)}}var j=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&f(e,n)}(u,e);var n,i,r,a=x(u);function u(){return d(this,u),a.apply(this,arguments)}return n=u,(i=[{key:"render",value:function(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.Z,{}),(0,s.jsx)(l.Z,{pageTitle:"Services Three",homePageUrl:"/",homePageText:"Home",activePageText:"Services Three",bgImgClass:"item-bg1"}),(0,s.jsx)("div",{className:"main-services-area ptb-110",children:(0,s.jsx)("div",{className:"container",children:(0,s.jsxs)("div",{className:"row",children:[(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-robot-1"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Robotic Process Automation"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-neural"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Machine Learning"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-machine-learning"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Cognitive Engagement"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-income"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Data Analysts"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-automatic"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Automatic Optimization"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-locked"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Security & Surveillance"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-molecular"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Healthcare & Manufacturing"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-gear"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"Software Engineers"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})}),(0,s.jsx)("div",{className:"col-lg-4 col-sm-6 col-md-6",children:(0,s.jsxs)("div",{className:"single-main-services-box",children:[(0,s.jsx)("div",{className:"icon",children:(0,s.jsx)("i",{className:"flaticon-ceo"})}),(0,s.jsx)("h3",{children:(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{children:"IT Professionals"})})}),(0,s.jsx)("p",{children:"Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam."}),(0,s.jsx)(c(),{href:"/service-details",children:(0,s.jsx)("a",{className:"link-btn",children:"Read More"})})]})})]})})}),(0,s.jsx)(o.Z,{})]})}}])&&m(n.prototype,i),r&&m(n,r),u}(r.Component);n.default=j}},function(e){e.O(0,[5637,1309,9774,2888,179],(function(){return n=7115,e(e.s=n);var n}));var n=e.O();_N_E=n}]);