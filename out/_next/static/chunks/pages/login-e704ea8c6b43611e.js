(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3459],{7156:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return t(8814)}])},50:function(e,n,t){"use strict";var r=t(5893),a=t(7294),i=t(1664),s=t.n(i);function l(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}function u(e,n){return!n||"object"!==f(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function d(e,n){return d=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},d(e,n)}var f=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function h(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=c(e);if(n){var a=c(this).constructor;t=Reflect.construct(r,arguments,a)}else t=r.apply(this,arguments);return u(this,t)}}var m=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&d(e,n)}(c,e);var n,t,a,i=h(c);function c(){return l(this,c),i.apply(this,arguments)}return n=c,(t=[{key:"render",value:function(){var e=this.props,n=e.pageTitle,t=e.homePageUrl,a=e.homePageText,i=e.activePageText,l=e.bgImgClass;return(0,r.jsxs)("div",{className:"page-title-area ".concat(l),children:[(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"page-title-content",children:[(0,r.jsx)("h2",{children:n}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(s(),{href:t,children:(0,r.jsx)("a",{children:a})})}),(0,r.jsx)("li",{children:i})]})]})}),(0,r.jsxs)("div",{className:"lines",children:[(0,r.jsx)("div",{className:"line"}),(0,r.jsx)("div",{className:"line"}),(0,r.jsx)("div",{className:"line"})]})]})}}])&&o(n.prototype,t),a&&o(n,a),c}(a.Component);n.Z=m},4119:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var r=t(5893),a=t(7294),i=t(986),s=t(461),l=t(9473),o=t(6166);function c(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function u(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,a,i=[],s=!0,l=!1;try{for(t=t.call(e);!(s=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);s=!0);}catch(o){l=!0,a=o}finally{try{s||null==t.return||t.return()}finally{if(l)throw a}}return i}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return c(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return c(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(){var e=(0,l.I0)(),n=(0,l.v9)(o.h5),t=(0,l.v9)(o.L4),c=(0,a.useState)(!0),d=c[0],f=c[1],h=u((0,s.Z)(["id","nickname"]),2),m=h[0];h[1];(0,a.useEffect)((function(){return"undefined"!==m.id?(console.log("cookies.id",m.id),e((0,o.Q2)(!0)),e((0,o.vm)(m.id)),e((0,o.ng)(m.nickname))):(console.log("cookies.id",m.id),e((0,o.Q2)(!1)),e((0,o.vm)("")),e((0,o.ng)(""))),document.getElementById("navbar").classList.add("is-sticky"),function(){!1}}),[]);var v=d?"collapse navbar-collapse":"collapse navbar-collapse show",g=d?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{id:"navbar",className:"navbar-area",children:(0,r.jsx)("div",{className:"main-nav",children:(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("nav",{className:"navbar navbar-expand-md navbar-light",children:[(0,r.jsx)(i.Z,{href:"/",children:(0,r.jsxs)("a",{className:"navbar-brand",children:[(0,r.jsx)("img",{src:"/images/main_logo3.png",className:"main-logo",alt:"logo"}),(0,r.jsx)("img",{src:"/images/main_logo3.png",className:"optional-logo",alt:"logo"})]})}),(0,r.jsxs)("button",{onClick:function(){f((function(e){return!e}))},className:g,type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[(0,r.jsx)("span",{className:"icon-bar top-bar"}),(0,r.jsx)("span",{className:"icon-bar middle-bar"}),(0,r.jsx)("span",{className:"icon-bar bottom-bar"})]}),(0,r.jsxs)("div",{className:v,id:"navbarSupportedContent",children:[(0,r.jsxs)("ul",{className:"navbar-nav",children:[(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Home"})})}),(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/about",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"About Us"})})}),(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/services",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Services"})})}),(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/contact",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Contact"})})}),n?(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/mypage",activeClassName:"active",children:(0,r.jsxs)("a",{className:"nav-link",children:[t,"\ub2d8"]})})}):(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/registration",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Registration"})})}),n?(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/logout",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Log Out"})})}):(0,r.jsx)("li",{className:"nav-item",children:(0,r.jsx)(i.Z,{href:"/login",activeClassName:"active",children:(0,r.jsx)("a",{className:"nav-link",children:"Log In"})})})]}),(0,r.jsx)("div",{className:"others-options"})]})]})})})})})}},8814:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return b}});var r=t(5893),a=t(7294),i=t(4119),s=t(6866),l=t(4051),o=t.n(l),c=t(1163),u=t(461),d=t(4314),f=t.n(d),h=t(986);function m(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function v(e,n,t,r,a,i,s){try{var l=e[i](s),o=l.value}catch(c){return void t(c)}l.done?n(o):Promise.resolve(o).then(r,a)}function g(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var i=e.apply(n,t);function s(e){v(i,r,a,s,l,"next",e)}function l(e){v(i,r,a,s,l,"throw",e)}s(void 0)}))}}function p(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,a,i=[],s=!0,l=!1;try{for(t=t.call(e);!(s=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);s=!0);}catch(o){l=!0,a=o}finally{try{s||null==t.return||t.return()}finally{if(l)throw a}}return i}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return m(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return m(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(){var e=(0,c.useRouter)(),n=p((0,u.Z)(["id"]),2),t=(n[0],n[1]),i=(0,a.useState)("\uc774\uba54\uc77c\uacfc \ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694"),s=i[0],l=i[1],d=(0,a.useState)("black"),m=d[0],v=d[1],x=(0,a.useState)(""),j=x[0],b=x[1],y=(0,a.useState)(""),_=y[0],N=y[1];function w(){return(w=g(o().mark((function n(){var r,a,i;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("loginSubmit func"),n.next=3,fetch("https://localhost:3333/login/session",{method:"POST",body:JSON.stringify({email:j,password:_}),headers:{"Content-Type":"application/json"}});case 3:return r=n.sent,n.next=6,r.json();case 6:a=n.sent,200===(i=r.status)?(console.log(a),t("id",a.id,{maxAge:2e3}),t("nickname",a.nickname,{maxAge:2e3}),e.push("/")):400===i?(l("\uc798\ubabb\ub41c \ube44\ubc00\ubc88\ud638\uc785\ub2c8\ub2e4."),v("red")):404===i?(l("\uc720\uc800\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4"),v("red")):500===i?(l("\uc11c\ubc84\uc5d0 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4"),v("red")):(l("\uc54c \uc218 \uc5c6\ub294 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4"),v("red"));case 9:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,r.jsx)("div",{className:f().wrap,children:(0,r.jsxs)("div",{className:f().login,children:[(0,r.jsx)("h1",{children:"Welcome to Portal301 !"}),(0,r.jsxs)("div",{className:f().login_sns,children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"",children:(0,r.jsx)("i",{className:"fab fa-instagram"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"",children:(0,r.jsx)("i",{className:"fab fa-facebook-f"})})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"",children:(0,r.jsx)("i",{className:"fab fa-twitter"})})})]}),(0,r.jsxs)("div",{className:f().login_id,children:[(0,r.jsx)("h4",{children:"E-mail"}),(0,r.jsx)("input",{value:j,onChange:function(e){b(e.target.value)},type:"email",placeholder:"Email"})]}),(0,r.jsxs)("div",{className:f().login_id,children:[(0,r.jsx)("h4",{children:"Password"}),(0,r.jsx)("input",{value:_,onChange:function(e){N(e.target.value)},type:"password",placeholder:"Password"})]}),(0,r.jsxs)("div",{className:f().submit,children:[(0,r.jsx)("span",{style:{color:m},children:s}),(0,r.jsx)("br",{}),(0,r.jsx)("input",{type:"submit",value:"submit",onClick:function(){return w.apply(this,arguments)}})]}),(0,r.jsxs)("div",{className:f().login_etc,children:[(0,r.jsx)(h.Z,{href:"/",activeClassName:"active",children:(0,r.jsx)("a",{style:{marginRight:10},children:"Forgot Password?"})}),(0,r.jsx)(h.Z,{href:"/registration",activeClassName:"active",children:(0,r.jsx)("a",{children:"Create New Account"})})]})]})})}var j=t(50);function b(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Z,{}),(0,r.jsx)(j.Z,{pageTitle:"Sign-In",homePageUrl:"/",homePageText:"Home",activePageText:"Sign-In",bgImgClass:"item-bg1"}),(0,r.jsx)(x,{}),(0,r.jsx)(s.Z,{})]})}},4314:function(e){e.exports={root:"login2_root__y0aVy",a:"login2_a__FI_Tp",li:"login2_li__GcEX5",wrap:"login2_wrap__3mn_i",login:"login2_login__dsv_Z",h2:"login2_h2__JK8l1",login_sns:"login2_login_sns__54AbR",login_id:"login2_login_id__cRZz6",login_pw:"login2_login_pw__Bd3_V",login_etc:"login2_login_etc__DrUMC",submit:"login2_submit__B_3VZ"}}},function(e){e.O(0,[5637,1309,9774,2888,179],(function(){return n=7156,e(e.s=n);var n}));var n=e.O();_N_E=n}]);