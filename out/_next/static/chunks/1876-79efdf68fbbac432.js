"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1876],{6545:function(e,t,n){n.d(t,{Mt:function(){return J},Ol:function(){return G},Qd:function(){return B},UQ:function(){return P},on:function(){return $}});var r=n(7294);function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function f(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?m(e):t}function g(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h(this,n)}}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(c){o=!0,a=c}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||E(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e){return function(e){if(Array.isArray(e))return y(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||E(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){if(e){if("string"===typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var x=function e(t){var n=this,r=t.expanded,a=void 0===r?[]:r,i=t.allowMultipleExpanded,c=void 0!==i&&i,d=t.allowZeroExpanded,s=void 0!==d&&d;o(this,e),u(this,"expanded",void 0),u(this,"allowMultipleExpanded",void 0),u(this,"allowZeroExpanded",void 0),u(this,"toggleExpanded",(function(e){return n.isItemDisabled(e)?n:n.isItemExpanded(e)?n.augment({expanded:n.expanded.filter((function(t){return t!==e}))}):n.augment({expanded:n.allowMultipleExpanded?[].concat(b(n.expanded),[e]):[e]})})),u(this,"isItemDisabled",(function(e){var t=n.isItemExpanded(e),r=1===n.expanded.length;return Boolean(t&&!n.allowZeroExpanded&&r)})),u(this,"isItemExpanded",(function(e){return-1!==n.expanded.indexOf(e)})),u(this,"getPanelAttributes",(function(e,t){var r=null!==t&&void 0!==t?t:n.isItemExpanded(e);return{role:n.allowMultipleExpanded?void 0:"region","aria-hidden":n.allowMultipleExpanded?!r:void 0,"aria-labelledby":n.getButtonId(e),id:n.getPanelId(e),hidden:!r||void 0}})),u(this,"getHeadingAttributes",(function(){return{role:"heading"}})),u(this,"getButtonAttributes",(function(e,t){var r=null!==t&&void 0!==t?t:n.isItemExpanded(e),o=n.isItemDisabled(e);return{id:n.getButtonId(e),"aria-disabled":o,"aria-expanded":r,"aria-controls":n.getPanelId(e),role:"button",tabIndex:0}})),u(this,"getPanelId",(function(e){return"accordion__panel-".concat(e)})),u(this,"getButtonId",(function(e){return"accordion__heading-".concat(e)})),u(this,"augment",(function(t){return new e(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({expanded:n.expanded,allowMultipleExpanded:n.allowMultipleExpanded,allowZeroExpanded:n.allowZeroExpanded},t))})),this.expanded=a,this.allowMultipleExpanded=c,this.allowZeroExpanded=s},w=(0,r.createContext)(null),A=function(e){d(n,e);var t=g(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return u(m(e=t.call.apply(t,[this].concat(a))),"state",new x({expanded:e.props.preExpanded,allowMultipleExpanded:e.props.allowMultipleExpanded,allowZeroExpanded:e.props.allowZeroExpanded})),u(m(e),"toggleExpanded",(function(t){e.setState((function(e){return e.toggleExpanded(t)}),(function(){e.props.onChange&&e.props.onChange(e.state.expanded)}))})),u(m(e),"isItemDisabled",(function(t){return e.state.isItemDisabled(t)})),u(m(e),"isItemExpanded",(function(t){return e.state.isItemExpanded(t)})),u(m(e),"getPanelAttributes",(function(t,n){return e.state.getPanelAttributes(t,n)})),u(m(e),"getHeadingAttributes",(function(){return e.state.getHeadingAttributes()})),u(m(e),"getButtonAttributes",(function(t,n){return e.state.getButtonAttributes(t,n)})),e}return i(n,[{key:"render",value:function(){var e=this.state,t=e.allowZeroExpanded,n=e.allowMultipleExpanded;return(0,r.createElement)(w.Provider,{value:{allowMultipleExpanded:n,allowZeroExpanded:t,toggleExpanded:this.toggleExpanded,isItemDisabled:this.isItemDisabled,isItemExpanded:this.isItemExpanded,getPanelAttributes:this.getPanelAttributes,getHeadingAttributes:this.getHeadingAttributes,getButtonAttributes:this.getButtonAttributes}},this.props.children||null)}}]),n}(r.PureComponent);u(A,"defaultProps",{allowMultipleExpanded:!1,allowZeroExpanded:!1});var I,O=function(e){d(n,e);var t=g(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return u(m(e=t.call.apply(t,[this].concat(a))),"renderChildren",(function(t){return t?e.props.children(t):null})),e}return i(n,[{key:"render",value:function(){return(0,r.createElement)(w.Consumer,null,this.renderChildren)}}]),n}(r.PureComponent),P=function(e){var t=e.className,n=void 0===t?"accordion":t,o=e.allowMultipleExpanded,a=e.allowZeroExpanded,i=e.onChange,u=e.preExpanded,l=f(e,["className","allowMultipleExpanded","allowZeroExpanded","onChange","preExpanded"]);return(0,r.createElement)(A,{preExpanded:u,allowMultipleExpanded:o,allowZeroExpanded:a,onChange:i},(0,r.createElement)("div",c({"data-accordion-component":"Accordion",className:n},l)))};!function(e){e.Accordion="Accordion",e.AccordionItem="AccordionItem",e.AccordionItemButton="AccordionItemButton",e.AccordionItemHeading="AccordionItemHeading",e.AccordionItemPanel="AccordionItemPanel"}(I||(I={}));var j=I,C=0;var D=/[\u0009\u000a\u000c\u000d\u0020]/g;function S(e){return""!==e&&!D.test(e)||(console.error('uuid must be a valid HTML5 id but was given "'.concat(e,'", ASCII whitespaces are forbidden')),!1)}var _=(0,r.createContext)(null),M=function(e){var t=e.children,n=e.uuid,o=e.accordionContext,a=e.dangerouslySetExpanded,i=function(){o.toggleExpanded(n)},u=function(e){var o=null!==a&&void 0!==a?a:e.isItemExpanded(n),u=e.isItemDisabled(n),c=e.getPanelAttributes(n,a),l=e.getHeadingAttributes(n),d=e.getButtonAttributes(n,a);return(0,r.createElement)(_.Provider,{value:{uuid:n,expanded:o,disabled:u,toggleExpanded:i,panelAttributes:c,headingAttributes:l,buttonAttributes:d}},t)};return(0,r.createElement)(O,null,u)},N=function(e){return(0,r.createElement)(O,null,(function(t){return(0,r.createElement)(M,c({},e,{accordionContext:t}))}))},k=function(e){var t=e.children,n=function(e){return e?t(e):null};return(0,r.createElement)(_.Consumer,null,n)},B=function(e){var t=e.uuid,n=e.dangerouslySetExpanded,o=e.className,a=void 0===o?"accordion__item":o,i=e.activeClassName,u=f(e,["uuid","dangerouslySetExpanded","className","activeClassName"]),l=v((0,r.useState)(function(){var e=C;return C+=1,"raa-".concat(e)}()),1)[0],d=null!==t&&void 0!==t?t:l,s=function(e){var t=e.expanded&&i?i:a;return(0,r.createElement)("div",c({"data-accordion-component":"AccordionItem",className:t},u))};return S(d.toString()),u.id&&S(u.id),(0,r.createElement)(N,{uuid:d,dangerouslySetExpanded:n},(0,r.createElement)(k,null,s))};function Z(e){return e&&(e.matches('[data-accordion-component="Accordion"]')?e:Z(e.parentElement))}function H(e){var t=Z(e);return t&&Array.from(t.querySelectorAll('[data-accordion-component="AccordionItemButton"]'))}B.displayName=j.AccordionItem;var T="End",R="Enter",L="Home",U=" ",V="Spacebar",Q="ArrowUp",q="ArrowDown",F="ArrowLeft",K="ArrowRight",W=function(e){var t=e.toggleExpanded,n=e.className,o=void 0===n?"accordion__button":n,a=f(e,["toggleExpanded","className"]);return a.id&&S(a.id),(0,r.createElement)("div",c({className:o},a,{role:"button",tabIndex:0,onClick:t,onKeyDown:function(e){var n=e.key;if(n!==R&&n!==U&&n!==V||(e.preventDefault(),t()),e.target instanceof HTMLElement)switch(n){case L:e.preventDefault(),function(e){var t=(H(e)||[])[0];t&&t.focus()}(e.target);break;case T:e.preventDefault(),function(e){var t=H(e)||[],n=t[t.length-1];n&&n.focus()}(e.target);break;case F:case Q:e.preventDefault(),function(e){var t=H(e)||[],n=t.indexOf(e);if(-1!==n){var r=t[n-1];r&&r.focus()}}(e.target);break;case K:case q:e.preventDefault(),function(e){var t=H(e)||[],n=t.indexOf(e);if(-1!==n){var r=t[n+1];r&&r.focus()}}(e.target)}},"data-accordion-component":"AccordionItemButton"}))},$=function(e){return(0,r.createElement)(k,null,(function(t){var n=t.toggleExpanded,o=t.buttonAttributes;return(0,r.createElement)(W,c({toggleExpanded:n},e,o))}))},z=function(e){d(n,e);var t=g(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return u(m(e=t.call.apply(t,[this].concat(a))),"ref",void 0),u(m(e),"setRef",(function(t){e.ref=t})),e}return i(n,[{key:"componentDidUpdate",value:function(){n.VALIDATE(this.ref)}},{key:"componentDidMount",value:function(){n.VALIDATE(this.ref)}},{key:"render",value:function(){return(0,r.createElement)("div",c({"data-accordion-component":"AccordionItemHeading"},this.props,{ref:this.setRef}))}}],[{key:"VALIDATE",value:function(e){if(void 0===e)throw new Error("ref is undefined");if(1!==e.childElementCount||!e.firstElementChild||"AccordionItemButton"!==e.firstElementChild.getAttribute("data-accordion-component"))throw new Error("AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.\n\nFrom the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):\n\n\u201cThe button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.\u201d\n\n")}}]),n}(r.PureComponent);u(z,"defaultProps",{className:"accordion__heading","aria-level":3});var G=function(e){return(0,r.createElement)(k,null,(function(t){var n=t.headingAttributes;return e.id&&S(e.id),(0,r.createElement)(z,c({},e,n))}))};G.displayName=j.AccordionItemHeading;var J=function(e){var t=e.className,n=void 0===t?"accordion__panel":t,o=e.id,a=f(e,["className","id"]),i=function(e){var t=e.panelAttributes;return o&&S(o),(0,r.createElement)("div",c({"data-accordion-component":"AccordionItemPanel",className:n},a,t))};return(0,r.createElement)(k,null,i)}}}]);