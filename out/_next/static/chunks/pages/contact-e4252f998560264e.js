(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9335],{3269:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contact",function(){return n(2270)}])},2270:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return M}});var r=n(5893),c=n(7294),o=n(4119),a=n(50),s=(n(1664),n(4051)),i=n.n(s),l=n(2283),u=n(9669),f=n.n(u),d=n(6455),m=n.n(d),p=n(7630);function h(e,t,n,r,c,o,a){try{var s=e[o](a),i=s.value}catch(l){return void n(l)}s.done?t(i):Promise.resolve(i).then(r,c)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var j=n.n(p)()(m()),x={name:"",email:"",number:"",subject:"",text:""},v=function(){var e=(0,c.useState)(x),t=e[0],n=e[1],o=(0,l.cI)(),a=o.register,s=o.handleSubmit,u=o.errors,d=function(e){var r=e.target,c=r.name,o=r.value;n((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){b(e,t,n[t])}))}return e}({},e,b({},c,o))})),console.log(t)},m=function(){var e,r=(e=i().mark((function e(r){var c,o,a,s,l,u,d;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,c="".concat("https://bariton-react.envytheme.com","/api/contact"),o=t.name,a=t.email,s=t.number,l=t.subject,u=t.text,d={name:o,email:a,number:s,subject:l,text:u},e.next=6,f().post(c,d);case 6:console.log(c),n(x),j.fire({title:"Congratulations!",text:"Your message was successfully send and will back to you soon",icon:"success",timer:2e3,timerProgressBar:!0,showConfirmButton:!1}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})),function(){var t=this,n=arguments;return new Promise((function(r,c){var o=e.apply(t,n);function a(e){h(o,r,c,a,s,"next",e)}function s(e){h(o,r,c,a,s,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}();return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("form",{id:"contactForm",onSubmit:s(m),children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"col-lg-6 col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("input",{type:"text",name:"name",className:"form-control",placeholder:"Name",value:t.name,onChange:d,ref:a({required:!0})}),(0,r.jsx)("div",{className:"invalid-feedback",style:{display:"block"},children:u.name&&"Name is required."})]})}),(0,r.jsx)("div",{className:"col-lg-6 col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("input",{type:"text",name:"email",className:"form-control",placeholder:"Email",value:t.email,onChange:d,ref:a({required:!0,pattern:/^\S+@\S+$/i})}),(0,r.jsx)("div",{className:"invalid-feedback",style:{display:"block"},children:u.email&&"Email is required."})]})}),(0,r.jsx)("div",{className:"col-lg-6 col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("input",{type:"text",name:"number",className:"form-control",placeholder:"Phone",value:t.number,onChange:d,ref:a({required:!0})}),(0,r.jsx)("div",{className:"invalid-feedback",style:{display:"block"},children:u.number&&"Number is required."})]})}),(0,r.jsx)("div",{className:"col-lg-6 col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("input",{type:"text",name:"subject",className:"form-control",placeholder:"Subject",value:t.subject,onChange:d,ref:a({required:!0})}),(0,r.jsx)("div",{className:"invalid-feedback",style:{display:"block"},children:u.subject&&"Subject is required."})]})}),(0,r.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("textarea",{name:"text",className:"form-control",cols:"30",rows:"5",placeholder:"Your message",value:t.text,onChange:d,ref:a({required:!0})}),(0,r.jsx)("div",{className:"invalid-feedback",style:{display:"block"},children:u.text&&"Text body is required."})]})}),(0,r.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,r.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Send Message"})})]})})})};function y(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(e){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},N(e)}function w(e,t){return!t||"object"!==O(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e,t){return _=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_(e,t)}var O=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=N(e);if(t){var c=N(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return w(this,n)}}var P=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(a,e);var t,n,c,o=k(a);function a(){return y(this,a),o.apply(this,arguments)}return t=a,(n=[{key:"render",value:function(){return(0,r.jsx)("section",{className:"contact-area ptb-110",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("div",{className:"section-title",children:(0,r.jsx)("span",{children:"Message Us"})}),(0,r.jsx)("div",{className:"contact-form",children:(0,r.jsxs)("div",{className:"row align-items-center",children:[(0,r.jsx)("div",{className:"col-lg-5 col-md-12",children:(0,r.jsx)("div",{className:"contact-image",children:(0,r.jsx)("img",{src:"/images/contact.png",alt:"image"})})}),(0,r.jsx)("div",{className:"col-lg-7 col-md-12",children:(0,r.jsx)(v,{})})]})}),(0,r.jsx)("div",{className:"contact-info",children:(0,r.jsxs)("div",{className:"contact-info-content",children:[(0,r.jsx)("h3",{children:"Contact us by Phone Number or Email Address"}),(0,r.jsxs)("h2",{children:[(0,r.jsx)("span",{className:"number",children:"+082 010 5609 9527"}),(0,r.jsx)("span",{className:"or",children:"OR"}),(0,r.jsx)("span",{className:"email",children:"jangjun_park@portal301"})]}),(0,r.jsxs)("ul",{className:"social",children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://twitter.com/",target:"_blank",children:(0,r.jsx)("i",{className:"fab fa-twitter"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://www.youtube.com/",target:"_blank",children:(0,r.jsx)("i",{className:"fab fa-youtube"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://www.facebook.com/",target:"_blank",children:(0,r.jsx)("i",{className:"fab fa-facebook-f"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://www.linkedin.com/",target:"_blank",children:(0,r.jsx)("i",{className:"fab fa-linkedin-in"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://www.instagram.com/",target:"_blank",children:(0,r.jsx)("i",{className:"fab fa-instagram"})})})]})]})})]})})}}])&&g(t.prototype,n),c&&g(t,c),a}(c.Component),C=P,S=n(6866);function E(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}function T(e,t){return!t||"object"!==F(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function B(e,t){return B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},B(e,t)}var F=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function Z(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=q(e);if(t){var c=q(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return T(this,n)}}var I=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(i,e);var t,n,c,s=Z(i);function i(){return E(this,i),s.apply(this,arguments)}return t=i,(n=[{key:"render",value:function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Z,{}),(0,r.jsx)(a.Z,{pageTitle:"Contact",homePageUrl:"/",homePageText:"Home",activePageText:"Contact",bgImgClass:"item-bg3"}),(0,r.jsx)(C,{}),(0,r.jsx)(S.Z,{})]})}}])&&R(t.prototype,n),c&&R(t,c),i}(c.Component),M=I}},function(e){e.O(0,[5637,4407,1309,4431,9774,2888,179],(function(){return t=3269,e(e.s=t);var t}));var t=e.O();_N_E=t}]);