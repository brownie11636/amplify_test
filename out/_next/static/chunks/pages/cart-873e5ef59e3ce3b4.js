(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9190],{4701:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cart",function(){return n(9081)}])},50:function(e,t,n){"use strict";var a=n(5893),r=n(7294),s=n(1664),c=n.n(s);function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}function u(e,t){return!t||"object"!==h(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}var h=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function m(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=o(e);if(t){var r=o(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return u(this,n)}}var p=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(o,e);var t,n,r,s=m(o);function o(){return l(this,o),s.apply(this,arguments)}return t=o,(n=[{key:"render",value:function(){var e=this.props,t=e.pageTitle,n=e.homePageUrl,r=e.homePageText,s=e.activePageText,l=e.bgImgClass;return(0,a.jsxs)("div",{className:"page-title-area ".concat(l),children:[(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"page-title-content",children:[(0,a.jsx)("h2",{children:t}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:(0,a.jsx)(c(),{href:n,children:(0,a.jsx)("a",{children:r})})}),(0,a.jsx)("li",{children:s})]})]})}),(0,a.jsxs)("div",{className:"lines",children:[(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"})]})]})}}])&&i(t.prototype,n),r&&i(t,r),o}(r.Component);t.Z=p},4119:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var a=n(5893),r=n(7294),s=n(986),c=n(461);function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,s=[],c=!0,l=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(s.push(a.value),!t||s.length!==t);c=!0);}catch(i){l=!0,r=i}finally{try{c||null==n.return||n.return()}finally{if(l)throw r}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(){var e=(0,r.useState)(!0),t=e[0],n=e[1],l=(0,r.useState)(!1),o=l[0],u=l[1],d=i((0,c.Z)(["id"]),2),h=d[0];d[1];(0,r.useEffect)((function(){return"undefined"!==h.id?u(!0):u(!1),document.getElementById("navbar").classList.add("is-sticky"),function(){!1}}),[]);var m=t?"collapse navbar-collapse":"collapse navbar-collapse show",p=t?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,a.jsx)("div",{className:"main-nav",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("nav",{className:"navbar navbar-expand-md navbar-light",children:[(0,a.jsx)(s.Z,{href:"/",children:(0,a.jsxs)("a",{className:"navbar-brand",children:[(0,a.jsx)("img",{src:"/images/main_logo3.png",className:"main-logo",alt:"logo"}),(0,a.jsx)("img",{src:"/images/main_logo3.png",className:"optional-logo",alt:"logo"})]})}),(0,a.jsxs)("button",{onClick:function(){n((function(e){return!e}))},className:p,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,a.jsx)("span",{className:"icon-bar top-bar"}),(0,a.jsx)("span",{className:"icon-bar middle-bar"}),(0,a.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,a.jsxs)("div",{className:m,id:"navbarSupportedContent",children:[(0,a.jsxs)("ul",{className:"navbar-nav",children:[(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Home"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/about",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"About Us"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/services",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Services"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/contact",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Contact"})})}),!o&&(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/registration",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Registration"})})}),o?(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/logout",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Log Out"})})}):(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(s.Z,{href:"/login",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Log In"})})})]}),(0,a.jsx)("div",{className:"others-options"})]})]})})})})})}},9081:function(e,t,n){"use strict";n.r(t);var a=n(5893),r=n(7294),s=n(4119),c=n(50),l=n(6866);function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function d(e,t){return!t||"object"!==m(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}var m=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=u(e);if(t){var r=u(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return d(this,n)}}var f=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(d,e);var t,n,r,u=p(d);function d(){return i(this,d),u.apply(this,arguments)}return t=d,(n=[{key:"render",value:function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.Z,{}),(0,a.jsx)(c.Z,{pageTitle:"Cart",homePageUrl:"/",homePageText:"Home",activePageText:"Cart",bgImgClass:"item-bg1"}),(0,a.jsx)("div",{className:"cart-area ptb-110",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsx)("div",{className:"row",children:(0,a.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,a.jsxs)("form",{children:[(0,a.jsx)("div",{className:"cart-table table-responsive",children:(0,a.jsxs)("table",{className:"table table-bordered",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{scope:"col",children:"Product"}),(0,a.jsx)("th",{scope:"col",children:"Name"}),(0,a.jsx)("th",{scope:"col",children:"Unit Price"}),(0,a.jsx)("th",{scope:"col",children:"Quantity"}),(0,a.jsx)("th",{scope:"col",children:"Total"})]})}),(0,a.jsxs)("tbody",{children:[(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"product-thumbnail",children:(0,a.jsx)("a",{href:"/single-products",children:(0,a.jsx)("img",{src:"/images/shop/product1.jpg",alt:"item"})})}),(0,a.jsx)("td",{className:"product-name",children:(0,a.jsx)("a",{href:"/single-products",children:"White Book"})}),(0,a.jsx)("td",{className:"product-price",children:(0,a.jsx)("span",{className:"unit-amount",children:"$14.00"})}),(0,a.jsx)("td",{className:"product-quantity",children:(0,a.jsx)("div",{className:"input-counter",children:(0,a.jsx)("input",{type:"number",defaultValue:"1"})})}),(0,a.jsxs)("td",{className:"product-subtotal",children:[(0,a.jsx)("span",{className:"subtotal-amount",children:"$14.00"}),(0,a.jsx)("a",{href:"#",className:"remove",children:(0,a.jsx)("i",{className:"far fa-trash-alt"})})]})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"product-thumbnail",children:(0,a.jsx)("a",{href:"/single-products",children:(0,a.jsx)("img",{src:"/images/shop/product2.jpg",alt:"item"})})}),(0,a.jsx)("td",{className:"product-name",children:(0,a.jsx)("a",{href:"/single-products",children:"Red Side Book"})}),(0,a.jsx)("td",{className:"product-price",children:(0,a.jsx)("span",{className:"unit-amount",children:"$20.00"})}),(0,a.jsx)("td",{className:"product-quantity",children:(0,a.jsx)("div",{className:"input-counter",children:(0,a.jsx)("input",{type:"number",defaultValue:"1"})})}),(0,a.jsxs)("td",{className:"product-subtotal",children:[(0,a.jsx)("span",{className:"subtotal-amount",children:"$20.00"}),(0,a.jsx)("a",{href:"#",className:"remove",children:(0,a.jsx)("i",{className:"far fa-trash-alt"})})]})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"product-thumbnail",children:(0,a.jsx)("a",{href:"/single-products",children:(0,a.jsx)("img",{src:"/images/shop/product3.jpg",alt:"item"})})}),(0,a.jsx)("td",{className:"product-name",children:(0,a.jsx)("a",{href:"/single-products",children:"Book With Pen"})}),(0,a.jsx)("td",{className:"product-price",children:(0,a.jsx)("span",{className:"unit-amount",children:"$25.00"})}),(0,a.jsx)("td",{className:"product-quantity",children:(0,a.jsx)("div",{className:"input-counter",children:(0,a.jsx)("input",{type:"number",defaultValue:"1"})})}),(0,a.jsxs)("td",{className:"product-subtotal",children:[(0,a.jsx)("span",{className:"subtotal-amount",children:"$25.00"}),(0,a.jsx)("a",{href:"#",className:"remove",children:(0,a.jsx)("i",{className:"far fa-trash-alt"})})]})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"product-thumbnail",children:(0,a.jsx)("a",{href:"/single-products",children:(0,a.jsx)("img",{src:"/images/shop/product4.jpg",alt:"item"})})}),(0,a.jsx)("td",{className:"product-name",children:(0,a.jsx)("a",{href:"/single-products",children:"Drop Side Book"})}),(0,a.jsx)("td",{className:"product-price",children:(0,a.jsx)("span",{className:"unit-amount",children:"$10.00"})}),(0,a.jsx)("td",{className:"product-quantity",children:(0,a.jsx)("div",{className:"input-counter",children:(0,a.jsx)("input",{type:"number",defaultValue:"1"})})}),(0,a.jsxs)("td",{className:"product-subtotal",children:[(0,a.jsx)("span",{className:"subtotal-amount",children:"$10.00"}),(0,a.jsx)("a",{href:"#",className:"remove",children:(0,a.jsx)("i",{className:"far fa-trash-alt"})})]})]})]})]})}),(0,a.jsx)("div",{className:"cart-buttons",children:(0,a.jsxs)("div",{className:"row align-items-center",children:[(0,a.jsx)("div",{className:"col-lg-7 col-sm-7 col-md-7",children:(0,a.jsxs)("div",{className:"shopping-coupon-code",children:[(0,a.jsx)("input",{type:"text",className:"form-control",placeholder:"Coupon code",name:"coupon-code",id:"coupon-code"}),(0,a.jsx)("button",{type:"submit",children:"Apply Coupon"})]})}),(0,a.jsx)("div",{className:"col-lg-5 col-sm-5 col-md-5 text-right",children:(0,a.jsx)("a",{href:"#",className:"btn btn-primary",children:"Update Cart"})})]})}),(0,a.jsxs)("div",{className:"cart-totals",children:[(0,a.jsx)("h3",{children:"Cart Totals"}),(0,a.jsxs)("ul",{children:[(0,a.jsxs)("li",{children:["Subtotal ",(0,a.jsx)("span",{children:"$150.00"})]}),(0,a.jsxs)("li",{children:["Shipping ",(0,a.jsx)("span",{children:"$30.00"})]}),(0,a.jsxs)("li",{children:["Total ",(0,a.jsx)("span",{children:(0,a.jsx)("b",{children:"$180.00"})})]})]}),(0,a.jsx)("a",{href:"#",className:"btn btn-primary",children:"Proceed to Checkout"})]})]})})})})}),(0,a.jsx)(l.Z,{})]})}}])&&o(t.prototype,n),r&&o(t,r),d}(r.Component);t.default=f}},function(e){e.O(0,[5637,1309,9774,2888,179],(function(){return t=4701,e(e.s=t);var t}));var t=e.O();_N_E=t}]);