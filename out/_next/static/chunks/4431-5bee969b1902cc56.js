"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4431],{50:function(e,t,n){var a=n(5893),r=n(7294),s=n(1664),c=n.n(s);function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function u(e,t){return!t||"object"!==h(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}var h=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function d(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=l(e);if(t){var r=l(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return u(this,n)}}var p=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(l,e);var t,n,r,s=d(l);function l(){return o(this,l),s.apply(this,arguments)}return t=l,(n=[{key:"render",value:function(){var e=this.props,t=e.pageTitle,n=e.homePageUrl,r=e.homePageText,s=e.activePageText,o=e.bgImgClass;return(0,a.jsxs)("div",{className:"page-title-area ".concat(o),children:[(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"page-title-content",children:[(0,a.jsx)("h2",{children:t}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:(0,a.jsx)(c(),{href:n,children:(0,a.jsx)("a",{children:r})})}),(0,a.jsx)("li",{children:s})]})]})}),(0,a.jsxs)("div",{className:"lines",children:[(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"})]})]})}}])&&i(t.prototype,n),r&&i(t,r),l}(r.Component);t.Z=p},4119:function(e,t,n){var a=n(5893),r=n(7294),s=n(986);function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function f(e,t){return!t||"object"!==d(t)&&"function"!==typeof t?c(e):t}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}var d=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=u(e);if(t){var r=u(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return f(this,n)}}var m=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(f,e);var t,n,r,u=p(f);function f(){var e;return o(this,f),l(c(e=u.apply(this,arguments)),"state",{searchForm:!1}),l(c(e),"handleSearchForm",(function(){e.setState((function(e){return{searchForm:!e.searchForm}}))})),l(c(e),"_isMounted",!1),l(c(e),"state",{display:!1,collapsed:!0}),l(c(e),"toggleNavbar",(function(){e.setState({collapsed:!e.state.collapsed})})),e}return t=f,(n=[{key:"componentDidMount",value:function(){var e=document.getElementById("navbar");document.addEventListener("scroll",(function(){window.scrollY>170?e.classList.add("is-sticky"):e.classList.remove("is-sticky")}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this.state.collapsed,t=e?"collapse navbar-collapse":"collapse navbar-collapse show",n=e?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,a.jsx)("div",{className:"main-nav",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("nav",{className:"navbar navbar-expand-md navbar-light",children:[(0,a.jsx)(s.Z,{href:"/",children:(0,a.jsxs)("a",{className:"navbar-brand",children:[(0,a.jsx)("img",{src:"/images/white-logo.png",className:"main-logo",alt:"logo"}),(0,a.jsx)("img",{src:"/images/black-logo.png",className:"optional-logo",alt:"logo"})]})}),(0,a.jsxs)("button",{onClick:this.toggleNavbar,className:n,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,a.jsx)("span",{className:"icon-bar top-bar"}),(0,a.jsx)("span",{className:"icon-bar middle-bar"}),(0,a.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,a.jsxs)("div",{className:t,id:"navbarSupportedContent",children:[(0,a.jsxs)("ul",{className:"navbar-nav",children:[(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/index-4",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Home - \uc900\uc775"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/about",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"About Us"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/services",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Services"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/contact",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Contact"})})})]}),(0,a.jsxs)("div",{className:"others-options",children:[(0,a.jsxs)("div",{className:"option-item",children:[(0,a.jsx)("i",{onClick:this.handleSearchForm,className:"search-btn flaticon-search",style:{display:this.state.searchForm?"none":"block"}}),(0,a.jsx)("i",{onClick:this.handleSearchForm,className:"close-btn fas fa-times ".concat(this.state.searchForm?"active":"")}),(0,a.jsx)("div",{className:"search-overlay search-popup",style:{display:this.state.searchForm?"block":"none"},children:(0,a.jsx)("div",{className:"search-box",children:(0,a.jsxs)("form",{className:"search-form",children:[(0,a.jsx)("input",{className:"search-input",name:"search",placeholder:"Search",type:"text"}),(0,a.jsx)("button",{className:"search-button",type:"submit",children:(0,a.jsx)("i",{className:"fas fa-search"})})]})})})]}),(0,a.jsx)(s.Z,{href:"/contact",children:(0,a.jsx)("a",{className:"btn btn-primary",children:"Schedule a Demo"})})]})]})]})})})})})}}])&&i(t.prototype,n),r&&i(t,r),f}(r.Component);t.Z=m}}]);