(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9396],{7077:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/privacy-policy",function(){return n(1301)}])},50:function(e,t,n){"use strict";var a=n(5893),r=n(7294),i=n(1664),o=n.n(i);function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}function u(e,t){return!t||"object"!==d(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e,t){return m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},m(e,t)}var d=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=c(e);if(t){var r=c(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return u(this,n)}}var h=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(c,e);var t,n,r,i=p(c);function c(){return s(this,c),i.apply(this,arguments)}return t=c,(n=[{key:"render",value:function(){var e=this.props,t=e.pageTitle,n=e.homePageUrl,r=e.homePageText,i=e.activePageText,s=e.bgImgClass;return(0,a.jsxs)("div",{className:"page-title-area ".concat(s),children:[(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"page-title-content",children:[(0,a.jsx)("h2",{children:t}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:(0,a.jsx)(o(),{href:n,children:(0,a.jsx)("a",{children:r})})}),(0,a.jsx)("li",{children:i})]})]})}),(0,a.jsxs)("div",{className:"lines",children:[(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"}),(0,a.jsx)("div",{className:"line"})]})]})}}])&&l(t.prototype,n),r&&l(t,r),c}(r.Component);t.Z=h},4119:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var a=n(5893),r=n(7294),i=n(986),o=n(461),s=n(9473),l=n(6166);function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,i=[],o=!0,s=!1;try{for(n=n.call(e);!(o=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);o=!0);}catch(l){s=!0,r=l}finally{try{o||null==n.return||n.return()}finally{if(s)throw r}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(){var e=(0,s.I0)(),t=(0,s.v9)(l.h5),n=(0,s.v9)(l.L4),c=(0,r.useState)(!0),m=c[0],d=c[1],p=u((0,o.Z)(["id","nickname"]),2),h=p[0];p[1];(0,r.useEffect)((function(){return"undefined"!==h.id?(console.log("cookies.id",h.id),e((0,l.Q2)(!0)),e((0,l.vm)(h.id)),e((0,l.ng)(h.nickname))):(console.log("cookies.id",h.id),e((0,l.Q2)(!1)),e((0,l.vm)("")),e((0,l.ng)(""))),document.getElementById("navbar").classList.add("is-sticky"),function(){!1}}),[]);var f=m?"collapse navbar-collapse":"collapse navbar-collapse show",v=m?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,a.jsx)("div",{className:"main-nav",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("nav",{className:"navbar navbar-expand-md navbar-light",children:[(0,a.jsx)(i.Z,{href:"/",children:(0,a.jsxs)("a",{className:"navbar-brand",children:[(0,a.jsx)("img",{src:"/images/main_logo3.png",className:"main-logo",alt:"logo"}),(0,a.jsx)("img",{src:"/images/main_logo3.png",className:"optional-logo",alt:"logo"})]})}),(0,a.jsxs)("button",{onClick:function(){d((function(e){return!e}))},className:v,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,a.jsx)("span",{className:"icon-bar top-bar"}),(0,a.jsx)("span",{className:"icon-bar middle-bar"}),(0,a.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,a.jsxs)("div",{className:f,id:"navbarSupportedContent",children:[(0,a.jsxs)("ul",{className:"navbar-nav",children:[(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Home"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/about",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"About Us"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/services",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Services"})})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/contact",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Contact"})})}),t?(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/mypage",activeClassName:"active",children:(0,a.jsxs)("a",{className:"nav-link",children:[n,"\ub2d8"]})})}):(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/registration",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Registration"})})}),t?(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/logout",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Log Out"})})}):(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(i.Z,{href:"/login",activeClassName:"active",children:(0,a.jsx)("a",{className:"nav-link",children:"Log In"})})})]}),(0,a.jsx)("div",{className:"others-options"})]})]})})})})})}},1301:function(e,t,n){"use strict";n.r(t);var a=n(5893),r=n(7294),i=(n(1664),n(4119)),o=n(50),s=n(6866);function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function m(e,t){return!t||"object"!==p(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}var p=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=u(e);if(t){var r=u(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return m(this,n)}}var f=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(m,e);var t,n,r,u=h(m);function m(){return l(this,m),u.apply(this,arguments)}return t=m,(n=[{key:"render",value:function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.Z,{}),(0,a.jsx)(o.Z,{pageTitle:"Privacy Policy",homePageUrl:"/",homePageText:"Home",activePageText:"Privacy Policy"}),(0,a.jsx)("div",{className:"text-container ptb-110",children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("h4",{children:"What is lorem ipsum?"}),(0,a.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}),(0,a.jsx)("h4",{children:"Where does it come from?"}),(0,a.jsx)("p",{children:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..".'}),(0,a.jsx)("p",{children:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla"}),(0,a.jsx)("h4",{children:"Where can I get some?"}),(0,a.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."}),(0,a.jsx)("p",{children:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected."}),(0,a.jsx)("p",{children:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"})]})}),(0,a.jsx)(s.Z,{})]})}}])&&c(t.prototype,n),r&&c(t,r),m}(r.Component);t.default=f}},function(e){e.O(0,[5637,1309,9774,2888,179],(function(){return t=7077,e(e.s=t);var t}));var t=e.O();_N_E=t}]);