(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5834],{6739:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/single-products",function(){return a(9410)}])},50:function(e,s,a){"use strict";var t=a(5893),r=a(7294),n=a(1664),i=a.n(n);function c(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}function l(e,s){for(var a=0;a<s.length;a++){var t=s[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}function d(e,s){return!s||"object"!==u(s)&&"function"!==typeof s?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):s}function m(e,s){return m=Object.setPrototypeOf||function(e,s){return e.__proto__=s,e},m(e,s)}var u=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function f(e){var s=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,t=o(e);if(s){var r=o(this).constructor;a=Reflect.construct(t,arguments,r)}else a=t.apply(this,arguments);return d(this,a)}}var p=function(e){!function(e,s){if("function"!==typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),s&&m(e,s)}(o,e);var s,a,r,n=f(o);function o(){return c(this,o),n.apply(this,arguments)}return s=o,(a=[{key:"render",value:function(){var e=this.props,s=e.pageTitle,a=e.homePageUrl,r=e.homePageText,n=e.activePageText,c=e.bgImgClass;return(0,t.jsxs)("div",{className:"page-title-area ".concat(c),children:[(0,t.jsx)("div",{className:"container",children:(0,t.jsxs)("div",{className:"page-title-content",children:[(0,t.jsx)("h2",{children:s}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:(0,t.jsx)(i(),{href:a,children:(0,t.jsx)("a",{children:r})})}),(0,t.jsx)("li",{children:n})]})]})}),(0,t.jsxs)("div",{className:"lines",children:[(0,t.jsx)("div",{className:"line"}),(0,t.jsx)("div",{className:"line"}),(0,t.jsx)("div",{className:"line"})]})]})}}])&&l(s.prototype,a),r&&l(s,r),o}(r.Component);s.Z=p},4119:function(e,s,a){"use strict";a.d(s,{Z:function(){return o}});var t=a(5893),r=a(7294),n=a(986),i=a(461);function c(e,s){(null==s||s>e.length)&&(s=e.length);for(var a=0,t=new Array(s);a<s;a++)t[a]=e[a];return t}function l(e,s){return function(e){if(Array.isArray(e))return e}(e)||function(e,s){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var t,r,n=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(t=a.next()).done)&&(n.push(t.value),!s||n.length!==s);i=!0);}catch(l){c=!0,r=l}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return n}}(e,s)||function(e,s){if(!e)return;if("string"===typeof e)return c(e,s);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(a);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return c(e,s)}(e,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(){var e=(0,r.useState)(!0),s=e[0],a=e[1],c=(0,r.useState)(!1),o=c[0],d=c[1],m=l((0,i.Z)(["id"]),2),u=m[0];m[1];(0,r.useEffect)((function(){return"undefined"!==u.id?d(!0):d(!1),document.getElementById("navbar").classList.add("is-sticky"),function(){!1}}),[]);var f=s?"collapse navbar-collapse":"collapse navbar-collapse show",p=s?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,t.jsx)("div",{className:"main-nav",children:(0,t.jsx)("div",{className:"container",children:(0,t.jsxs)("nav",{className:"navbar navbar-expand-md navbar-light",children:[(0,t.jsx)(n.Z,{href:"/",children:(0,t.jsxs)("a",{className:"navbar-brand",children:[(0,t.jsx)("img",{src:"/images/main_logo3.png",className:"main-logo",alt:"logo"}),(0,t.jsx)("img",{src:"/images/main_logo3.png",className:"optional-logo",alt:"logo"})]})}),(0,t.jsxs)("button",{onClick:function(){a((function(e){return!e}))},className:p,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,t.jsx)("span",{className:"icon-bar top-bar"}),(0,t.jsx)("span",{className:"icon-bar middle-bar"}),(0,t.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,t.jsxs)("div",{className:f,id:"navbarSupportedContent",children:[(0,t.jsxs)("ul",{className:"navbar-nav",children:[(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(n.Z,{href:"/",activeClassName:"active",children:(0,t.jsx)("a",{className:"nav-link",children:"Home"})})}),(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(n.Z,{href:"/about",activeClassName:"active",children:(0,t.jsx)("a",{className:"nav-link",children:"About Us"})})}),(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(n.Z,{href:"/services",activeClassName:"active",children:(0,t.jsx)("a",{className:"nav-link",children:"Services"})})}),(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(n.Z,{href:"/contact",activeClassName:"active",children:(0,t.jsx)("a",{className:"nav-link",children:"Contact"})})}),!o&&(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(n.Z,{href:"/registration",activeClassName:"active",children:(0,t.jsx)("a",{className:"nav-link",children:"Registration"})})}),o?(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(n.Z,{href:"/logout",activeClassName:"active",children:(0,t.jsx)("a",{className:"nav-link",children:"Log Out"})})}):(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(n.Z,{href:"/login",activeClassName:"active",children:(0,t.jsx)("a",{className:"nav-link",children:"Log In"})})})]}),(0,t.jsx)("div",{className:"others-options"})]})]})})})})})}},9410:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return A}});var t=a(5893),r=a(7294),n=a(4119),i=a(50),c=a(6866);function l(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}function o(e,s){for(var a=0;a<s.length;a++){var t=s[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}function m(e,s){return!s||"object"!==f(s)&&"function"!==typeof s?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):s}function u(e,s){return u=Object.setPrototypeOf||function(e,s){return e.__proto__=s,e},u(e,s)}var f=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function p(e){var s=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,t=d(e);if(s){var r=d(this).constructor;a=Reflect.construct(t,arguments,r)}else a=t.apply(this,arguments);return m(this,a)}}var h=function(e){!function(e,s){if("function"!==typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),s&&u(e,s)}(i,e);var s,a,r,n=p(i);function i(){return l(this,i),n.apply(this,arguments)}return s=i,(a=[{key:"render",value:function(){return(0,t.jsx)("div",{className:"related-products",children:(0,t.jsxs)("div",{className:"container",children:[(0,t.jsx)("div",{className:"section-title",children:(0,t.jsxs)("div",{className:"content",children:[(0,t.jsx)("span",{children:"Our Shop"}),(0,t.jsx)("h2",{children:"Related Products"}),(0,t.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."})]})}),(0,t.jsxs)("div",{className:"row",children:[(0,t.jsx)("div",{className:"col-lg-4 col-sm-6",children:(0,t.jsxs)("div",{className:"single-product-box",children:[(0,t.jsxs)("div",{className:"product-image",children:[(0,t.jsxs)("a",{href:"/single-products",children:[(0,t.jsx)("img",{src:"/images/shop/product1.jpg",alt:"image"}),(0,t.jsx)("img",{src:"/images/shop/product-hover1.jpg",alt:"image"})]}),(0,t.jsxs)("a",{href:"/cart",className:"add-to-cart-btn",children:["Add To Cart ",(0,t.jsx)("i",{className:"fas fa-cart-plus"})]})]}),(0,t.jsxs)("div",{className:"product-content",children:[(0,t.jsx)("h3",{children:(0,t.jsx)("a",{href:"/single-products",children:"White Book"})}),(0,t.jsxs)("div",{className:"price",children:[(0,t.jsx)("span",{className:"new",children:"$8.50"}),(0,t.jsx)("span",{className:"old",children:"$12.50"})]}),(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"})]})]})]})}),(0,t.jsx)("div",{className:"col-lg-4 col-sm-6",children:(0,t.jsxs)("div",{className:"single-product-box",children:[(0,t.jsxs)("div",{className:"product-image",children:[(0,t.jsxs)("a",{href:"/single-products",children:[(0,t.jsx)("img",{src:"/images/shop/product2.jpg",alt:"image"}),(0,t.jsx)("img",{src:"/images/shop/product-hover2.jpg",alt:"image"})]}),(0,t.jsxs)("a",{href:"/cart",className:"add-to-cart-btn",children:["Add To Cart ",(0,t.jsx)("i",{className:"fas fa-cart-plus"})]}),(0,t.jsx)("div",{className:"sale-btn",children:"Sale!"})]}),(0,t.jsxs)("div",{className:"product-content",children:[(0,t.jsx)("h3",{children:(0,t.jsx)("a",{href:"/single-products",children:"Red Side Book"})}),(0,t.jsxs)("div",{className:"price",children:[(0,t.jsx)("span",{className:"new",children:"$12.50"}),(0,t.jsx)("span",{className:"old",children:"$20.50"})]}),(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star-half-alt"})]})]})]})}),(0,t.jsx)("div",{className:"col-lg-4 col-sm-6",children:(0,t.jsxs)("div",{className:"single-product-box",children:[(0,t.jsxs)("div",{className:"product-image",children:[(0,t.jsxs)("a",{href:"/single-products",children:[(0,t.jsx)("img",{src:"/images/shop/product3.jpg",alt:"image"}),(0,t.jsx)("img",{src:"/images/shop/product-hover3.jpg",alt:"image"})]}),(0,t.jsxs)("a",{href:"/cart",className:"add-to-cart-btn",children:["Add To Cart ",(0,t.jsx)("i",{className:"fas fa-cart-plus"})]})]}),(0,t.jsxs)("div",{className:"product-content",children:[(0,t.jsx)("h3",{children:(0,t.jsx)("a",{href:"/single-products",children:"Book With Pen"})}),(0,t.jsxs)("div",{className:"price",children:[(0,t.jsx)("span",{className:"new",children:"$8.50"}),(0,t.jsx)("span",{className:"old",children:"$12.50"})]}),(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"far fa-star"})]})]})]})})]})]})})}}])&&o(s.prototype,a),r&&o(s,r),i}(r.Component);function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}function v(e,s){for(var a=0;a<s.length;a++){var t=s[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function g(e,s,a){return s in e?Object.defineProperty(e,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[s]=a,e}function N(e){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},N(e)}function b(e,s){return!s||"object"!==w(s)&&"function"!==typeof s?j(e):s}function y(e,s){return y=Object.setPrototypeOf||function(e,s){return e.__proto__=s,e},y(e,s)}var w=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function _(e){var s=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,t=N(e);if(s){var r=N(this).constructor;a=Reflect.construct(t,arguments,r)}else a=t.apply(this,arguments);return b(this,a)}}var O=function(e){!function(e,s){if("function"!==typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),s&&y(e,s)}(i,e);var s,a,r,n=_(i);function i(){var e;return x(this,i),g(j(e=n.apply(this,arguments)),"openTabSection",(function(e,s){var a,t,r;for(t=document.getElementsByClassName("tabs_item"),a=0;a<t.length;a++)t[a].classList.remove("animate__fadeInUp"),t[a].style.display="none";for(r=document.getElementsByTagName("li"),a=0;a<r.length;a++)r[a].className=r[a].className.replace("current","");document.getElementById(s).style.display="block",document.getElementById(s).className+=" animate__fadeInUp animate__animated",e.currentTarget.className+="current"})),e}return s=i,(a=[{key:"render",value:function(){var e=this;return(0,t.jsx)("div",{className:"tab products-details-tab",children:(0,t.jsxs)("div",{className:"row",children:[(0,t.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,t.jsxs)("ul",{className:"tabs",children:[(0,t.jsxs)("li",{className:"current",onClick:function(s){return e.openTabSection(s,"tab1")},children:[(0,t.jsx)("div",{className:"dot"})," Description"]}),(0,t.jsxs)("li",{onClick:function(s){return e.openTabSection(s,"tab2")},children:[(0,t.jsx)("div",{className:"dot"})," Additional information"]}),(0,t.jsxs)("li",{onClick:function(s){return e.openTabSection(s,"tab3")},children:[(0,t.jsx)("div",{className:"dot"})," Reviews"]})]})}),(0,t.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,t.jsxs)("div",{className:"tab_content",children:[(0,t.jsx)("div",{id:"tab1",className:"tabs_item",children:(0,t.jsx)("div",{className:"products-details-tab-content",children:(0,t.jsx)("p",{children:"Design inspiration lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.  Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Nulla libero. Vivamus pharetra posuere sapien."})})}),(0,t.jsx)("div",{id:"tab2",className:"tabs_item",children:(0,t.jsx)("div",{className:"products-details-tab-content",children:(0,t.jsxs)("ul",{className:"additional-information",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{children:"Brand:"})," ThemeForest"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{children:"Color:"})," Brown"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{children:"Size:"})," Large, Medium"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{children:"Weight:"})," 27 kg"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{children:"Dimensions:"})," 16 x 22 x 123 cm"]})]})})}),(0,t.jsx)("div",{id:"tab3",className:"tabs_item",children:(0,t.jsx)("div",{className:"products-details-tab-content",children:(0,t.jsxs)("div",{className:"product-review-form",children:[(0,t.jsx)("h3",{children:"Customer Reviews"}),(0,t.jsxs)("div",{className:"review-title",children:[(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"far fa-star"})]}),(0,t.jsx)("p",{children:"Based on 3 reviews"}),(0,t.jsx)("a",{href:"#",className:"btn btn-primary",children:"Write a Review"})]}),(0,t.jsxs)("div",{className:"review-comments",children:[(0,t.jsxs)("div",{className:"review-item",children:[(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"far fa-star"})]}),(0,t.jsx)("h3",{children:"Good"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Admin"})," on ",(0,t.jsx)("strong",{children:"Sep 21, 2019"})]}),(0,t.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}),(0,t.jsx)("a",{href:"#",className:"review-report-link",children:"Report as Inappropriate"})]}),(0,t.jsxs)("div",{className:"review-item",children:[(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"far fa-star"})]}),(0,t.jsx)("h3",{children:"Good"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Admin"})," on ",(0,t.jsx)("strong",{children:"Sep 21, 2019"})]}),(0,t.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}),(0,t.jsx)("a",{href:"#",className:"review-report-link",children:"Report as Inappropriate"})]}),(0,t.jsxs)("div",{className:"review-item",children:[(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"far fa-star"})]}),(0,t.jsx)("h3",{children:"Good"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Admin"})," on ",(0,t.jsx)("strong",{children:"Sep 21, 2019"})]}),(0,t.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}),(0,t.jsx)("a",{href:"#",className:"review-report-link",children:"Report as Inappropriate"})]})]}),(0,t.jsxs)("div",{className:"review-form",children:[(0,t.jsx)("h3",{children:"Write a Review"}),(0,t.jsx)("form",{children:(0,t.jsxs)("div",{className:"row",children:[(0,t.jsx)("div",{className:"col-lg-6 col-md-6",children:(0,t.jsxs)("div",{className:"form-group",children:[(0,t.jsx)("label",{children:"Name"}),(0,t.jsx)("input",{type:"text",id:"name",name:"name",placeholder:"Enter your name",className:"form-control"})]})}),(0,t.jsx)("div",{className:"col-lg-6 col-md-6",children:(0,t.jsxs)("div",{className:"form-group",children:[(0,t.jsx)("label",{children:"Email"}),(0,t.jsx)("input",{type:"email",id:"email",name:"email",placeholder:"Enter your email",className:"form-control"})]})}),(0,t.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,t.jsxs)("div",{className:"form-group",children:[(0,t.jsx)("label",{children:"Review Title"}),(0,t.jsx)("input",{type:"text",id:"review-title",name:"review-title",placeholder:"Enter your review a title",className:"form-control"})]})}),(0,t.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,t.jsxs)("div",{className:"form-group",children:[(0,t.jsx)("label",{children:"Body of Review (1500)"}),(0,t.jsx)("textarea",{name:"review-body",id:"review-body",cols:"30",rows:"7",placeholder:"Write your comments here",className:"form-control"})]})}),(0,t.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,t.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Submit Review"})})]})})]})]})})})]})})]})})}}])&&v(s.prototype,a),r&&v(s,r),i}(r.Component);function S(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}function R(e,s){for(var a=0;a<s.length;a++){var t=s[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}function k(e,s){return!s||"object"!==T(s)&&"function"!==typeof s?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):s}function C(e,s){return C=Object.setPrototypeOf||function(e,s){return e.__proto__=s,e},C(e,s)}var T=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function E(e){var s=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,t=P(e);if(s){var r=P(this).constructor;a=Reflect.construct(t,arguments,r)}else a=t.apply(this,arguments);return k(this,a)}}var B=function(e){!function(e,s){if("function"!==typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),s&&C(e,s)}(o,e);var s,a,r,l=E(o);function o(){return S(this,o),l.apply(this,arguments)}return s=o,(a=[{key:"render",value:function(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.Z,{}),(0,t.jsx)(i.Z,{pageTitle:"Single Products",homePageUrl:"/",homePageText:"Home",activePageText:"Single Products",bgImgClass:"item-bg1"}),(0,t.jsxs)("section",{className:"product-details-area ptb-110",children:[(0,t.jsx)("div",{className:"container",children:(0,t.jsxs)("div",{className:"row align-items-center",children:[(0,t.jsx)("div",{className:"col-lg-6 col-md-12",children:(0,t.jsx)("div",{className:"product-details-image",children:(0,t.jsx)("img",{src:"/images/shop/product4.jpg",alt:"image"})})}),(0,t.jsx)("div",{className:"col-lg-6 col-md-12",children:(0,t.jsxs)("div",{className:"product-details-desc",children:[(0,t.jsx)("h3",{children:"Red Side Book"}),(0,t.jsxs)("div",{className:"price",children:[(0,t.jsx)("span",{className:"new-price",children:"$14.00"}),(0,t.jsx)("span",{className:"old-price",children:"$20.00"})]}),(0,t.jsxs)("div",{className:"product-review",children:[(0,t.jsxs)("div",{className:"rating",children:[(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star"}),(0,t.jsx)("i",{className:"fas fa-star-half-alt"})]}),(0,t.jsx)("a",{href:"#",className:"rating-count",children:"3 reviews"})]}),(0,t.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."}),(0,t.jsxs)("div",{className:"product-add-to-cart",children:[(0,t.jsx)("div",{className:"input-counter",children:(0,t.jsx)("input",{type:"number",defaultValue:"0"})}),(0,t.jsxs)("button",{type:"submit",className:"btn btn-primary",children:[(0,t.jsx)("i",{className:"fas fa-cart-plus"})," Add to Cart"]})]}),(0,t.jsxs)("div",{className:"buy-checkbox-btn",children:[(0,t.jsxs)("div",{className:"item",children:[(0,t.jsx)("input",{className:"inp-cbx",id:"cbx",type:"checkbox"}),(0,t.jsxs)("label",{className:"cbx",htmlFor:"cbx",children:[(0,t.jsx)("span",{children:(0,t.jsx)("svg",{width:"12px",height:"10px",viewBox:"0 0 12 10",children:(0,t.jsx)("polyline",{points:"1.5 6 4.5 9 10.5 1"})})}),(0,t.jsx)("span",{children:"I agree with the terms and conditions"})]})]}),(0,t.jsx)("div",{className:"item",children:(0,t.jsx)("a",{href:"#",className:"btn btn-light",children:"Buy it now!"})})]}),(0,t.jsxs)("div",{className:"custom-payment-options",children:[(0,t.jsx)("span",{children:"Guaranteed safe checkout:"}),(0,t.jsxs)("div",{className:"payment-methods",children:[(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("img",{src:"/images/payment/payment1.svg",alt:"image"})}),(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("img",{src:"/images/payment/payment2.svg",alt:"image"})}),(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("img",{src:"/images/payment/payment3.svg",alt:"image"})}),(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("img",{src:"/images/payment/payment4.svg",alt:"image"})}),(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("img",{src:"/images/payment/payment5.svg",alt:"image"})}),(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("img",{src:"/images/payment/payment6.svg",alt:"image"})}),(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("img",{src:"/images/payment/payment7.svg",alt:"image"})})]})]})]})}),(0,t.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,t.jsx)(O,{})})]})}),(0,t.jsx)(h,{})]}),(0,t.jsx)(c.Z,{})]})}}])&&R(s.prototype,a),r&&R(s,r),o}(r.Component),A=B}},function(e){e.O(0,[5637,1309,9774,2888,179],(function(){return s=6739,e(e.s=s);var s}));var s=e.O();_N_E=s}]);