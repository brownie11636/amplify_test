(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9763],{1551:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],i=!0,u=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(l){u=!0,o=l}finally{try{i||null==n.return||n.return()}finally{if(u)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,i=(a=n(7294))&&a.__esModule?a:{default:a},u=n(1003),l=n(880),c=n(9246);var d={};function f(e,t,n,r){if(e&&u.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;d[t+"%"+n+(o?"%"+o:"")]=!0}}var s=function(e){var t,n=!1!==e.prefetch,r=l.useRouter(),a=i.default.useMemo((function(){var t=o(u.resolveHref(r,e.href,!0),2),n=t[0],a=t[1];return{href:n,as:e.as?u.resolveHref(r,e.as):a||n}}),[r,e.href,e.as]),s=a.href,p=a.as,m=i.default.useRef(s),v=i.default.useRef(p),h=e.children,b=e.replace,y=e.shallow,g=e.scroll,E=e.locale;"string"===typeof h&&(h=i.default.createElement("a",null,h));var x=(t=i.default.Children.only(h))&&"object"===typeof t&&t.ref,w=o(c.useIntersection({rootMargin:"200px"}),3),A=w[0],I=w[1],O=w[2],j=i.default.useCallback((function(e){v.current===p&&m.current===s||(O(),v.current=p,m.current=s),A(e),x&&("function"===typeof x?x(e):"object"===typeof x&&(x.current=e))}),[p,x,s,O,A]);i.default.useEffect((function(){var e=I&&n&&u.isLocalURL(s),t="undefined"!==typeof E?E:r&&r.locale,o=d[s+"%"+p+(t?"%"+t:"")];e&&!o&&f(r,s,p,{locale:t})}),[p,s,I,E,n,r]);var P={ref:j,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,i,l){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(n))&&(e.preventDefault(),t[o?"replace":"push"](n,r,{shallow:a,locale:l,scroll:i}))}(e,r,s,p,b,y,g,E)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),u.isLocalURL(s)&&f(r,s,p,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var C="undefined"!==typeof E?E:r&&r.locale,S=r&&r.isLocaleDomain&&u.getDomainLocale(p,C,r&&r.locales,r&&r.domainLocales);P.href=S||u.addBasePath(u.addLocale(p,C,r&&r.defaultLocale))}return i.default.cloneElement(t,P)};t.default=s,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],i=!0,u=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(l){u=!0,o=l}finally{try{i||null==n.return||n.return()}finally{if(u)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,r=e.disabled||!u,d=a.useRef(),f=o(a.useState(!1),2),s=f[0],p=f[1],m=o(a.useState(t?t.current:null),2),v=m[0],h=m[1],b=a.useCallback((function(e){d.current&&(d.current(),d.current=void 0),r||s||e&&e.tagName&&(d.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=c.find((function(e){return e.root===n.root&&e.margin===n.margin}));r?t=l.get(r):(t=l.get(n),c.push(n));if(t)return t;var o=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return l.set(n,t={id:n,observer:a,elements:o}),t}(n),o=r.id,a=r.observer,i=r.elements;return i.set(e,t),a.observe(e),function(){if(i.delete(e),a.unobserve(e),0===i.size){a.disconnect(),l.delete(o);var t=c.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&c.splice(t,1)}}}(e,(function(e){return e&&p(e)}),{root:v,rootMargin:n}))}),[r,v,n,s]),y=a.useCallback((function(){p(!1)}),[]);return a.useEffect((function(){if(!u&&!s){var e=i.requestIdleCallback((function(){return p(!0)}));return function(){return i.cancelIdleCallback(e)}}}),[s]),a.useEffect((function(){t&&h(t.current)}),[t]),[b,s,y]};var a=n(7294),i=n(4686),u="undefined"!==typeof IntersectionObserver;var l=new Map,c=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},1664:function(e,t,n){e.exports=n(1551)},1163:function(e,t,n){e.exports=n(880)},6545:function(e,t,n){"use strict";n.d(t,{Mt:function(){return J},Ol:function(){return G},Qd:function(){return R},UQ:function(){return j},on:function(){return F}});var r=n(7294);function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}function s(e,t){return s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},s(e,t)}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?m(e):t}function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=f(e);if(t){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return v(this,n)}}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(l){o=!0,a=l}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||g(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e){return function(e){if(Array.isArray(e))return E(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||g(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){if(e){if("string"===typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(e,t):void 0}}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var x=function e(t){var n=this,r=t.expanded,a=void 0===r?[]:r,i=t.allowMultipleExpanded,l=void 0!==i&&i,d=t.allowZeroExpanded,f=void 0!==d&&d;o(this,e),u(this,"expanded",void 0),u(this,"allowMultipleExpanded",void 0),u(this,"allowZeroExpanded",void 0),u(this,"toggleExpanded",(function(e){return n.isItemDisabled(e)?n:n.isItemExpanded(e)?n.augment({expanded:n.expanded.filter((function(t){return t!==e}))}):n.augment({expanded:n.allowMultipleExpanded?[].concat(y(n.expanded),[e]):[e]})})),u(this,"isItemDisabled",(function(e){var t=n.isItemExpanded(e),r=1===n.expanded.length;return Boolean(t&&!n.allowZeroExpanded&&r)})),u(this,"isItemExpanded",(function(e){return-1!==n.expanded.indexOf(e)})),u(this,"getPanelAttributes",(function(e,t){var r=null!==t&&void 0!==t?t:n.isItemExpanded(e);return{role:n.allowMultipleExpanded?void 0:"region","aria-hidden":n.allowMultipleExpanded?!r:void 0,"aria-labelledby":n.getButtonId(e),id:n.getPanelId(e),hidden:!r||void 0}})),u(this,"getHeadingAttributes",(function(){return{role:"heading"}})),u(this,"getButtonAttributes",(function(e,t){var r=null!==t&&void 0!==t?t:n.isItemExpanded(e),o=n.isItemDisabled(e);return{id:n.getButtonId(e),"aria-disabled":o,"aria-expanded":r,"aria-controls":n.getPanelId(e),role:"button",tabIndex:0}})),u(this,"getPanelId",(function(e){return"accordion__panel-".concat(e)})),u(this,"getButtonId",(function(e){return"accordion__heading-".concat(e)})),u(this,"augment",(function(t){return new e(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({expanded:n.expanded,allowMultipleExpanded:n.allowMultipleExpanded,allowZeroExpanded:n.allowZeroExpanded},t))})),this.expanded=a,this.allowMultipleExpanded=l,this.allowZeroExpanded=f},w=(0,r.createContext)(null),A=function(e){d(n,e);var t=h(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return u(m(e=t.call.apply(t,[this].concat(a))),"state",new x({expanded:e.props.preExpanded,allowMultipleExpanded:e.props.allowMultipleExpanded,allowZeroExpanded:e.props.allowZeroExpanded})),u(m(e),"toggleExpanded",(function(t){e.setState((function(e){return e.toggleExpanded(t)}),(function(){e.props.onChange&&e.props.onChange(e.state.expanded)}))})),u(m(e),"isItemDisabled",(function(t){return e.state.isItemDisabled(t)})),u(m(e),"isItemExpanded",(function(t){return e.state.isItemExpanded(t)})),u(m(e),"getPanelAttributes",(function(t,n){return e.state.getPanelAttributes(t,n)})),u(m(e),"getHeadingAttributes",(function(){return e.state.getHeadingAttributes()})),u(m(e),"getButtonAttributes",(function(t,n){return e.state.getButtonAttributes(t,n)})),e}return i(n,[{key:"render",value:function(){var e=this.state,t=e.allowZeroExpanded,n=e.allowMultipleExpanded;return(0,r.createElement)(w.Provider,{value:{allowMultipleExpanded:n,allowZeroExpanded:t,toggleExpanded:this.toggleExpanded,isItemDisabled:this.isItemDisabled,isItemExpanded:this.isItemExpanded,getPanelAttributes:this.getPanelAttributes,getHeadingAttributes:this.getHeadingAttributes,getButtonAttributes:this.getButtonAttributes}},this.props.children||null)}}]),n}(r.PureComponent);u(A,"defaultProps",{allowMultipleExpanded:!1,allowZeroExpanded:!1});var I,O=function(e){d(n,e);var t=h(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return u(m(e=t.call.apply(t,[this].concat(a))),"renderChildren",(function(t){return t?e.props.children(t):null})),e}return i(n,[{key:"render",value:function(){return(0,r.createElement)(w.Consumer,null,this.renderChildren)}}]),n}(r.PureComponent),j=function(e){var t=e.className,n=void 0===t?"accordion":t,o=e.allowMultipleExpanded,a=e.allowZeroExpanded,i=e.onChange,u=e.preExpanded,c=p(e,["className","allowMultipleExpanded","allowZeroExpanded","onChange","preExpanded"]);return(0,r.createElement)(A,{preExpanded:u,allowMultipleExpanded:o,allowZeroExpanded:a,onChange:i},(0,r.createElement)("div",l({"data-accordion-component":"Accordion",className:n},c)))};!function(e){e.Accordion="Accordion",e.AccordionItem="AccordionItem",e.AccordionItemButton="AccordionItemButton",e.AccordionItemHeading="AccordionItemHeading",e.AccordionItemPanel="AccordionItemPanel"}(I||(I={}));var P=I,C=0;var S=/[\u0009\u000a\u000c\u000d\u0020]/g;function M(e){return""!==e&&!S.test(e)||(console.error('uuid must be a valid HTML5 id but was given "'.concat(e,'", ASCII whitespaces are forbidden')),!1)}var _=(0,r.createContext)(null),D=function(e){var t=e.children,n=e.uuid,o=e.accordionContext,a=e.dangerouslySetExpanded,i=function(){o.toggleExpanded(n)},u=function(e){var o=null!==a&&void 0!==a?a:e.isItemExpanded(n),u=e.isItemDisabled(n),l=e.getPanelAttributes(n,a),c=e.getHeadingAttributes(n),d=e.getButtonAttributes(n,a);return(0,r.createElement)(_.Provider,{value:{uuid:n,expanded:o,disabled:u,toggleExpanded:i,panelAttributes:l,headingAttributes:c,buttonAttributes:d}},t)};return(0,r.createElement)(O,null,u)},k=function(e){return(0,r.createElement)(O,null,(function(t){return(0,r.createElement)(D,l({},e,{accordionContext:t}))}))},N=function(e){var t=e.children,n=function(e){return e?t(e):null};return(0,r.createElement)(_.Consumer,null,n)},R=function(e){var t=e.uuid,n=e.dangerouslySetExpanded,o=e.className,a=void 0===o?"accordion__item":o,i=e.activeClassName,u=p(e,["uuid","dangerouslySetExpanded","className","activeClassName"]),c=b((0,r.useState)(function(){var e=C;return C+=1,"raa-".concat(e)}()),1)[0],d=null!==t&&void 0!==t?t:c,f=function(e){var t=e.expanded&&i?i:a;return(0,r.createElement)("div",l({"data-accordion-component":"AccordionItem",className:t},u))};return M(d.toString()),u.id&&M(u.id),(0,r.createElement)(k,{uuid:d,dangerouslySetExpanded:n},(0,r.createElement)(N,null,f))};function L(e){return e&&(e.matches('[data-accordion-component="Accordion"]')?e:L(e.parentElement))}function B(e){var t=L(e);return t&&Array.from(t.querySelectorAll('[data-accordion-component="AccordionItemButton"]'))}R.displayName=P.AccordionItem;var H="End",T="Enter",Z="Home",U=" ",K="Spacebar",V="ArrowUp",$="ArrowDown",q="ArrowLeft",Q="ArrowRight",z=function(e){var t=e.toggleExpanded,n=e.className,o=void 0===n?"accordion__button":n,a=p(e,["toggleExpanded","className"]);return a.id&&M(a.id),(0,r.createElement)("div",l({className:o},a,{role:"button",tabIndex:0,onClick:t,onKeyDown:function(e){var n=e.key;if(n!==T&&n!==U&&n!==K||(e.preventDefault(),t()),e.target instanceof HTMLElement)switch(n){case Z:e.preventDefault(),function(e){var t=(B(e)||[])[0];t&&t.focus()}(e.target);break;case H:e.preventDefault(),function(e){var t=B(e)||[],n=t[t.length-1];n&&n.focus()}(e.target);break;case q:case V:e.preventDefault(),function(e){var t=B(e)||[],n=t.indexOf(e);if(-1!==n){var r=t[n-1];r&&r.focus()}}(e.target);break;case Q:case $:e.preventDefault(),function(e){var t=B(e)||[],n=t.indexOf(e);if(-1!==n){var r=t[n+1];r&&r.focus()}}(e.target)}},"data-accordion-component":"AccordionItemButton"}))},F=function(e){return(0,r.createElement)(N,null,(function(t){var n=t.toggleExpanded,o=t.buttonAttributes;return(0,r.createElement)(z,l({toggleExpanded:n},e,o))}))},W=function(e){d(n,e);var t=h(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return u(m(e=t.call.apply(t,[this].concat(a))),"ref",void 0),u(m(e),"setRef",(function(t){e.ref=t})),e}return i(n,[{key:"componentDidUpdate",value:function(){n.VALIDATE(this.ref)}},{key:"componentDidMount",value:function(){n.VALIDATE(this.ref)}},{key:"render",value:function(){return(0,r.createElement)("div",l({"data-accordion-component":"AccordionItemHeading"},this.props,{ref:this.setRef}))}}],[{key:"VALIDATE",value:function(e){if(void 0===e)throw new Error("ref is undefined");if(1!==e.childElementCount||!e.firstElementChild||"AccordionItemButton"!==e.firstElementChild.getAttribute("data-accordion-component"))throw new Error("AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.\n\nFrom the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):\n\n\u201cThe button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.\u201d\n\n")}}]),n}(r.PureComponent);u(W,"defaultProps",{className:"accordion__heading","aria-level":3});var G=function(e){return(0,r.createElement)(N,null,(function(t){var n=t.headingAttributes;return e.id&&M(e.id),(0,r.createElement)(W,l({},e,n))}))};G.displayName=P.AccordionItemHeading;var J=function(e){var t=e.className,n=void 0===t?"accordion__panel":t,o=e.id,a=p(e,["className","id"]),i=function(e){var t=e.panelAttributes;return o&&M(o),(0,r.createElement)("div",l({"data-accordion-component":"AccordionItemPanel",className:n},a,t))};return(0,r.createElement)(N,null,i)}}}]);