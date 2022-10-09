"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8043],{8043:function(e,t,n){n.r(t),n.d(t,{Basic:function(){return h},Donut:function(){return x},HighContrast:function(){return p},Silver:function(){return f},SkinWrap:function(){return s},White:function(){return m},composeTwo:function(){return c},useAngleUpdater:function(){return u}});var a=n(7294),r=function(){return r=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},r.apply(this,arguments)},i=function(){function e(e,t){var n=this;this.handleOnMouseDown=function(e){n.addWindowEventListeners("mouse");var t=e.pageX,a=e.pageY,r=e.clientX,i=e.clientY;n.updateAreaLocation({pageX:t,pageY:a,clientX:r,clientY:i}),n.updateAngleValue(t,a)},this.handleOnMouseMove=function(e){if(n.isInteracting){var t=e.pageX,a=e.pageY;n.updateAngleValue(t,a)}},this.handleOnMouseUp=function(){n.removeWindowEventListeners("mouse")},this.handleOnTouchStart=function(e){if(n.addWindowEventListeners("touch"),"changedTouches"in e&&1===e.changedTouches.length){var t=e.changedTouches[0],a=t.pageX,r=t.pageY,i=t.clientX,o=t.clientY;n.updateAreaLocation({pageX:a,pageY:r,clientX:i,clientY:o}),n.updateAngleValue(a,r)}},this.handleOnTouchMove=function(e){if(n.isInteracting&&"changedTouches"in e&&1===e.changedTouches.length){var t=e.changedTouches[0],a=t.pageX,r=t.pageY;n.updateAngleValue(a,r)}},this.handleOnTouchEnd=function(){n.removeWindowEventListeners("touch")},this.handleOnFocus=function(){n.isInteracting=!0},this.handleOnBlur=function(){n.isInteracting=!1},this.handleOnKeyDown=function(e){var t=e.key||{38:"ArrowUp",40:"ArrowDown"}[e.keyCode];"ArrowUp"===t&&n.value+n.step<=n.max?(n.value+=n.step,n.angle=n.angleFromValue(n.value)):"ArrowDown"===t&&n.value-n.step>=n.min&&(n.value-=n.step,n.angle=n.angleFromValue(n.value))},this.onAngleChange=t.onAngleChange,this.onValueChange=t.onValueChange,this.onInteractionChange=t.onInteractionChange,this._locationX=0,this._locationY=0,this.refElement=e,this._isInteracting=!1,this.windowEventListeners={mouse:[["mousemove",this.handleOnMouseMove],["mouseup",this.handleOnMouseUp]],touch:[["touchmove",this.handleOnTouchMove],["touchend",this.handleOnTouchEnd]]},this.updateFromProps(t)}return e.prototype.updateFromProps=function(e){if(e.max<=e.min||e.max<e.min+e.step)throw new Error("Max value should be bigger or equal to min+step value.");if(this.min=e.min,this.max=e.max,this.step=e.step,this.diameter=e.diameter,this.onAngleChange=e.onAngleChange||this.onAngleChange,this.onValueChange=e.onValueChange||this.onValueChange,this.onInteractionChange=e.onInteractionChange||this.onInteractionChange,this.spaceMaxFromZero=void 0===e.spaceMaxFromZero||e.spaceMaxFromZero,e.jumpLimit&&(this.jumpLimit=e.jumpLimit),e.value!==this.value&&(e.min>this.value||e.value<e.min?this.value=e.min:e.max<this.value||e.value>e.max?this.value=e.max:this.value=e.value,this.angle=this.angleFromValue(this.value)),this.value%this.step||(this.max-this.min)%this.step)throw new Error("Value and (max - min) should be divisible by step.")},Object.defineProperty(e.prototype,"angle",{get:function(){return this._angle},set:function(e){this._angle!==e&&(this._angle=e,this.onAngleChange&&this.onAngleChange(this._angle))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._value},set:function(e){var t=this.getValueWithinJumpLimit(e);this._value!==t&&(this._value=t,this.onValueChange&&this.onValueChange(this._value))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isInteracting",{get:function(){return this._isInteracting},set:function(e){this._isInteracting!==e&&(this._isInteracting=e,this.onInteractionChange&&this.onInteractionChange(this._isInteracting))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"numSteps",{get:function(){return(this.max-this.min)/this.step},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"valsDistribution",{get:function(){return this.spaceMaxFromZero?360/(this.numSteps+1):360/this.numSteps},enumerable:!1,configurable:!0}),e.prototype.getValueWithinJumpLimit=function(e){if(!this.jumpLimit)return e;var t=Math.max(this.step,Math.ceil((this.max-this.min)*this.jumpLimit));return Math.abs(e-this.value)>t?e>.9*this.max&&this.value<this.min+.1*this.max?this.min:e<this.min+.1*this.max&&this.value>.9*this.max?this.max:this.value:e},e.prototype.getComputedTransformXY=function(e){if(!window.getComputedStyle||!e)return{x:0,y:0,scaleX:1,scaleY:1};var t=window.getComputedStyle(e),n=t.transform||t.webkitTransform;if(!n)return{x:0,y:0,scaleX:1,scaleY:1};var a=n.match(/^matrix3d\((.+)\)$/);if(a){var r=parseFloat(a[1].split(", ")[0]),i=parseFloat(a[1].split(", ")[5]);return{x:parseFloat(a[1].split(", ")[12]),y:parseFloat(a[1].split(", ")[13]),scaleX:r,scaleY:i}}var o=(a=n.match(/^matrix\((.+)\)$/))?parseFloat(a[1].split(", ")[0]):1,l=a?parseFloat(a[1].split(", ")[3]):1;return{x:a?parseFloat(a[1].split(", ")[4]):0,y:a?parseFloat(a[1].split(", ")[5]):0,scaleX:o,scaleY:l}},e.prototype.updateAreaLocation=function(e){for(var t=this.diameter/2,n=0,a=0,r=this.refElement.current,i=this.getComputedTransformXY(r);r;){if("BODY"===r.tagName.toUpperCase()){var o=r.scrollLeft||document.documentElement.scrollLeft,l=r.scrollTop||document.documentElement.scrollTop;n+=r.offsetLeft-o+r.clientLeft,a+=r.offsetTop-l+r.clientTop}else n+=r.offsetLeft-r.scrollLeft+r.clientLeft,a+=r.offsetTop-r.scrollTop+r.clientTop;n+=i.x,a+=i.y,r=r.offsetParent,i=this.getComputedTransformXY(r)}this._locationX=n+t,this._locationY=a+t,this._locationX+=e.pageX-e.clientX,this._locationY+=e.pageY-e.clientY},e.prototype.calcDegreeOfRotation=function(e,t){var n=Math.atan2(e-this._locationX,t-this._locationY);return Math.abs(n*(180/Math.PI)-180)},e.prototype.valueFromAngle=function(e){var t=this,n=e/(this.numSteps*this.valsDistribution),a=this.numSteps*this.step,r=this.min+n*a;return r>this.max+this.step/2?this.min:Array.from(new Array(this.numSteps+1)).map((function(e,n){return t.min+n*t.step})).reduce((function(e,t){return Math.abs(t-r)<Math.abs(e-r)?t:e}))},e.prototype.angleFromValue=function(e){return Math.ceil((e-this.min)/this.step*this.valsDistribution)},e.prototype.updateAngleValue=function(e,t){var n=this;requestAnimationFrame((function(){var a=n.calcDegreeOfRotation(e,t);n.value=n.valueFromAngle(a),n.angle=n.angleFromValue(n.value)}))},e.prototype.addWindowEventListeners=function(e){this.isInteracting=!0,this.windowEventListeners[e].forEach((function(e){var t=e[0],n=e[1];window.addEventListener(t,n)}))},e.prototype.removeWindowEventListeners=function(e){this.isInteracting=!1,this.windowEventListeners[e].forEach((function(e){var t=e[0],n=e[1];window.removeEventListener(t,n)}))},e}();function o(e){return console&&console.error(e.error),a.createElement("div",{style:{width:e.diameter+"px",height:e.diameter+"px",borderRadius:e.diameter/2+"px",position:"relative",outline:"none",boxSizing:"border-box",overflow:"hidden"}},a.createElement("div",{style:{fontSize:"22px",fontWeight:"bold",color:"red",textAlign:"center",width:"100%",height:"100%",position:"absolute",zIndex:999,paddingTop:"calc(50% - 0.5em)",background:"rgba(0, 0, 0, 0.2)",pointerEvents:"none"}},"\ud83d\udca3"),e.children)}function l(e){var t=function(e){var t=(0,a.useRef)(null),n=(0,a.useRef)(null),r=null;try{n.current?n.current.updateFromProps(e):n.current=new i(t,e)}catch(o){r=o}return[t,n.current,r]}(e),n=t[0],l=t[1],s=t[2],c={width:e.diameter+"px",height:e.diameter+"px",borderRadius:e.diameter/2+"px",position:"relative",outline:"none",boxSizing:"border-box",overflow:"hidden"},u=e.knobStyle||{},h=r(r({},c),u),p=a.createElement("div",{ref:n,onMouseDown:l&&l.handleOnMouseDown,onTouchStart:l&&l.handleOnTouchStart,onKeyDown:l&&l.handleOnKeyDown,onFocus:l&&l.handleOnFocus,onBlur:l&&l.handleOnBlur,style:h,tabIndex:0,"aria-valuenow":e.value,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuetext":e.ariaValueText,"aria-labelledby":e.ariaLabelledBy},e.children);return s?a.createElement(o,{error:s,diameter:e.diameter},p):p}function s(e){var t=e.style||{},n=r(r({},{position:"relative",outline:"none",boxSizing:"border-box"}),t);return a.createElement("div",{style:n},e.children)}function c(e,t){return function(){for(var n=[],a=0;a<arguments.length;a++)n[a]=arguments[a];e.apply(void 0,n),t&&t.apply(void 0,n)}}function u(e){var t=(0,a.useRef)(0),n=(0,a.useState)(0),r=n[0],i=n[1];return(0,a.useEffect)((function(){i(t.current)}),[t.current,e]),[r,function(e){t.current=e}]}function h(e){var t=u(e.value),n=t[0],i=t[1],o=(0,a.useState)(!1),h=o[0],p=o[1],m=e.theme||{},d=m.activeColor||"#a1dca8",f=m.defaultColor||"#3f3f3f",g=m.gradientStart||"#f9f9f9",x=m.gradientEnd||"#eaeced",v=m.notchAndText||"#3f3f3f",b=h?d:f,y=c(i,e.onAngleChange),E=c(p,e.onInteractionChange);return a.createElement(s,{style:e.style},a.createElement(l,{diameter:e.diameter,value:e.value,min:e.min,max:e.max,step:e.step,jumpLimit:e.jumpLimit,spaceMaxFromZero:e.spaceMaxFromZero,ariaLabelledBy:e.ariaLabelledBy,ariaValueText:e.ariaValueText,knobStyle:r({cursor:"pointer"},e.knobStyle),onAngleChange:y,onInteractionChange:E,onValueChange:e.onValueChange},a.createElement(a.Fragment,null,a.createElement("svg",{viewBox:"0 0 166.56 166.56",transform:"rotate("+n+")",style:{transform:"rotate("+n+"deg)"}},a.createElement("defs",null,a.createElement("linearGradient",{id:"a"},a.createElement("stop",{offset:"0",stopColor:g,stopOpacity:"1"}),a.createElement("stop",{offset:"1",stopColor:x,stopOpacity:"1"})),a.createElement("filter",{id:"b",width:"1.11",height:"1.11",x:"-0.055",y:"-0.055",colorInterpolationFilters:"sRGB"},a.createElement("feGaussianBlur",{stdDeviation:"3.45"})),a.createElement("linearGradient",{id:"c",x1:"140.985",x2:"63.122",y1:"98.751",y2:"202.317",gradientTransform:"translate(-75.643 -328.104)",gradientUnits:"userSpaceOnUse",xlinkHref:"#a"})),a.createElement("g",{fillOpacity:"1",transform:"translate(-21.72 -65.22)"},a.createElement("circle",{cx:"105",cy:"148.5",r:"75",fill:"#ccc",stroke:"none",strokeDasharray:"none",strokeMiterlimit:"4",strokeOpacity:"1",strokeWidth:"17.106",filter:"url(#b)",opacity:"1"}),a.createElement("circle",{cx:"29.357",cy:"-179.604",r:"70",fill:"url(#c)",stroke:b,strokeDasharray:"none",strokeMiterlimit:"4",strokeOpacity:"1",strokeWidth:"1",opacity:"1",transform:"rotate(135.448)"}),a.createElement("circle",{cx:"105.083",cy:"88.628",r:"4.443",fill:v,stroke:"#b1b1b1",strokeDasharray:"none",strokeMiterlimit:"4",strokeOpacity:"1",strokeWidth:"0.551",opacity:"1"}))),a.createElement("div",{style:{width:"100%",textAlign:"center",fontSize:Math.ceil(e.diameter/4)+"px",position:"absolute",top:"calc(50% - 0.6em)",userSelect:"none",color:v}},e.value))),e.children)}function p(e){var t=u(e.value),n=t[0],i=t[1],o=(0,a.useState)(!1),h=o[0],p=o[1],m=e.theme||{},d=m.activeColor||"#b56a7a",f=m.defaultColor||"#100",g=h?d:f,x=c(i,e.onAngleChange),v=c(p,e.onInteractionChange);return a.createElement(s,{style:e.style},a.createElement(l,{diameter:e.diameter,value:e.value,min:e.min,max:e.max,step:e.step,jumpLimit:e.jumpLimit,spaceMaxFromZero:e.spaceMaxFromZero,ariaLabelledBy:e.ariaLabelledBy,ariaValueText:e.ariaValueText,knobStyle:r({cursor:"pointer"},e.knobStyle),onAngleChange:x,onInteractionChange:v,onValueChange:e.onValueChange},a.createElement(a.Fragment,null,a.createElement("svg",{viewBox:"0 0 100 100",transform:"rotate("+n+")",style:{transform:"rotate("+n+"deg)"}},a.createElement("path",{fill:g,d:"M50 0A50 50 0 000 50a50 50 0 0050 50 50 50 0 0050-50A50 50 0 0050 0zm0 2a48 48 0 0148 48 48 48 0 01-48 48A48 48 0 012 50 48 48 0 0150 2z"}),a.createElement("path",{fill:g,d:"M50 4A46 46 0 004 50a46 46 0 0046 46 46 46 0 0046-46A46 46 0 0050 4zm0 2.141a4.276 4.276 0 014.276 4.277A4.276 4.276 0 0150 14.694a4.276 4.276 0 01-4.276-4.276A4.276 4.276 0 0150 6.141z"})),a.createElement("div",{style:{width:"100%",textAlign:"center",fontSize:Math.ceil(e.diameter/3)+"px",fontWeight:"bold",position:"absolute",top:"calc(50% - 0.6em)",userSelect:"none",color:"#fff"}},e.value))),e.children)}function m(e){var t=u(e.value),n=t[0],i=t[1],o=(0,a.useState)(!1),h=o[0],p=o[1],m=e.theme||{},d=m.activeNotchColor||"#b56a7a",f=m.defaultNotchColor||"#f7f7f7",g=m.activeTextColor||"#b56a7a",x=m.defaultTextColor||"#100",v=h?g:x,b=Math.ceil((e.max-e.min)/e.step),y=Math.min(b,36),E=Math.ceil(n/Math.ceil(360/y)),w=c(i,e.onAngleChange),C=c(p,e.onInteractionChange);return a.createElement(s,{style:e.style},a.createElement(l,{diameter:e.diameter,value:e.value,min:e.min,max:e.max,step:e.step,jumpLimit:e.jumpLimit,spaceMaxFromZero:e.spaceMaxFromZero,ariaLabelledBy:e.ariaLabelledBy,ariaValueText:e.ariaValueText,knobStyle:r({cursor:"pointer"},e.knobStyle),onAngleChange:w,onInteractionChange:C,onValueChange:e.onValueChange},a.createElement(a.Fragment,null,a.createElement("svg",{viewBox:"0 0 62.463 62.463"},a.createElement("defs",null,a.createElement("linearGradient",{id:"prefix__c"},a.createElement("stop",{offset:0,stopColor:"#fff"}),a.createElement("stop",{offset:1,stopColor:"#b0b0b0"})),a.createElement("linearGradient",{id:"prefix__a"},a.createElement("stop",{offset:0,stopColor:"#939393"}),a.createElement("stop",{offset:1,stopColor:"#f0f0f0",stopOpacity:0})),a.createElement("linearGradient",{id:"prefix__b"},a.createElement("stop",{offset:0,stopColor:"#b0b0b0"}),a.createElement("stop",{offset:1,stopColor:"#fdfdfd"})),a.createElement("linearGradient",{gradientTransform:"matrix(.84848 0 0 .84848 -25.569 29.664)",gradientUnits:"userSpaceOnUse",y2:136.304,x2:200.519,y1:175.459,x1:244.552,id:"prefix__e",xlinkHref:"#prefix__b"}),a.createElement("linearGradient",{gradientUnits:"userSpaceOnUse",y2:196.319,x2:143.659,y1:184.184,x1:133.863,id:"prefix__d",xlinkHref:"#prefix__c"})),a.createElement("g",{transform:"translate(-131.196 -134.336)"},a.createElement("g",{transform:"translate(-442.372 -663.575) scale(4.37185)"},a.createElement("circle",{cx:138.339,cy:189.655,r:7.144,fill:v}),a.createElement("path",{d:"M138.34 182.511a7.144 7.144 0 00-7.144 7.144 7.144 7.144 0 007.143 7.144 7.144 7.144 0 007.144-7.144 7.144 7.144 0 00-7.144-7.144zm0 .53a6.615 6.615 0 016.614 6.614 6.615 6.615 0 01-6.615 6.614 6.615 6.615 0 01-6.614-6.614 6.615 6.615 0 016.614-6.615z",fill:"url(#prefix__d)"}),a.createElement("circle",{cx:138.339,cy:189.655,r:6.35,fill:"#fff"})),a.createElement("circle",{r:14.583,cy:192.949,cx:149.253,fill:"none"}),a.createElement("circle",{cy:165.567,cx:162.427,fill:"#f0f0f0",r:27.151})),a.createElement("g",{transform:"translate(31.2315 31.2315) scale(0.45) rotate(-90)"},Array.from(new Array(y)).map((function(e,t){var n=t*(2*Math.PI/y),r=1+62.463*Math.cos(n),i=4+62.463*Math.sin(n),o=r-1,l=i-4,s=E>t?d:f,c="notch_"+t;return a.createElement("rect",{key:c,id:"r"+t,fill:s,width:2,height:8,x:r,y:i,transform:"rotate("+(t*Math.ceil(360/y)+90)+" "+o+" "+l+")"})})))),a.createElement("div",{style:{width:"100%",textAlign:"center",fontSize:Math.ceil(e.diameter/4)+"px",position:"absolute",top:"calc(50% - 0.6em)",userSelect:"none",color:v}},e.value))),e.children)}var d="metal-"+(new Date).getTime();function f(e){var t=u(e.value),n=t[0],i=t[1],o=(0,a.useState)(d+"-bgr"),h=o[0],p=o[1],m=c(i,e.onAngleChange),f=c((function(e){p(e?d+"-bgr-active":d+"-bgr")}),e.onInteractionChange);return a.createElement(s,{style:e.style},a.createElement(l,{diameter:e.diameter+28,value:e.value,min:e.min,max:e.max,step:e.step,jumpLimit:e.jumpLimit,spaceMaxFromZero:e.spaceMaxFromZero,ariaLabelledBy:e.ariaLabelledBy,ariaValueText:e.ariaValueText,knobStyle:r({cursor:"pointer"},e.knobStyle),onAngleChange:m,onInteractionChange:f,onValueChange:e.onValueChange},a.createElement(a.Fragment,null,a.createElement("style",{type:"text/css"},"."+d+"-bgr, ."+d+"-bgr-active {\n                        position: absolute;\n                        z-index:1;\n                        outline: none;\n\n                        background-color: hsl(0,0%,90%);\n                        box-shadow: inset hsla(0,0%,15%,  1) 0  0px 0px 4px, /* border */\n                        inset hsla(0,0%,15%, .8) 0 -1px 5px 4px, /* soft SD */\n                        inset hsla(0,0%,0%, .25) 0 -1px 0px 7px, /* bottom SD */\n                        inset hsla(0,0%,100%,.7) 0  2px 1px 7px, /* top HL */\n\n                        hsla(0,0%, 0%,.15) 0 -5px 6px 4px, /* outer SD */\n                        hsla(0,0%,100%,.5) 0  5px 6px 4px; /* outer HL */ \n\n                        transition: color .2s;\n                    }\n                    \n                    ."+d+"-bgr-active {\n                        color: hsl(210, 100%, 40%);\n                        text-shadow: hsla(210,100%,20%,.3) 0 -1px 0, hsl(210,100%,85%) 0 2px 1px, hsla(200,100%,80%,1) 0 0 5px, hsla(210,100%,50%,.6) 0 0 20px;\n                        box-shadow: \n                            inset hsla(208, 79%, 28%,  1) 0  0px 0px 4px, /* border */\n                            inset hsla(208,100%,15%, .4) 0 -1px 5px 4px, /* soft SD */\n                            inset hsla(208,100%,20%,.25) 0 -1px 0px 7px, /* bottom SD */\n                            inset hsla(208,100%,100%,.7) 0  2px 1px 7px, /* top HL */\n\n                            hsla(208,100%,75%, .8) 0  0px 3px 2px, /* outer SD */\n                            hsla(208,50%,40%, .25) 0 -5px 6px 4px, /* outer SD */\n                            hsla(208,80%,95%,   1) 0  5px 6px 4px; /* outer HL */\n                    }\n\n                    ."+d+"-rot {\n                        position: absolute;\n                        z-index: 2;\n                        top: 7px;\n                        left: 7px;\n                        background-image: -webkit-radial-gradient(  50%   0%,  8% 50%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),\n                        -webkit-radial-gradient(  50% 100%, 12% 50%, hsla(0,0%,100%,.6) 0%, hsla(0,0%,100%,0) 100%),\n                        -webkit-radial-gradient(   0%  50%, 50%  7%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),\n                        -webkit-radial-gradient( 100%  50%, 50%  5%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),\n\n                        -webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   3%, hsla(0,0%,  0%,.1) 3.5%),\n                        -webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%,.1) 7.5%),\n                        -webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.2) 2.2%),\n\n                        -webkit-radial-gradient( 50% 50%, 200% 50%, hsla(0,0%,90%,1) 5%, hsla(0,0%,85%,1) 30%, hsla(0,0%,60%,1) 100%);\n                    }\n\n\n                    ."+d+"-rot:before, ."+d+'-rot:after {\n                        content: "";\n                        top: 0;\n                        left: 0;\n                        position: absolute;\n                        width: inherit;\n                        height: inherit;\n                        border-radius: inherit;\n\n                        /* fake conical gradients */\n                        background-image: -webkit-radial-gradient(  50%   0%, 10% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),\n                        -webkit-radial-gradient(  50% 100%, 10% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),\n                        -webkit-radial-gradient(   0%  50%, 50% 10%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),\n                        -webkit-radial-gradient( 100%  50%, 50% 06%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%);\n                    }\n                    .'+d+"-rot:before { transform: rotate( 65deg); }\n                    ."+d+"-rot:after { transform: rotate(-65deg); }\n                    \n                    ."+d+"-notch {\n                        position: absolute;\n                        width: 10px;\n                        height: 10px;\n                        background: black;\n                        border-radius: 5px;\n                        top: 5px;\n                    }\n                    ."+d+"-text {\n                        width: 100%;\n                        text-align: center;\n                        font-weight: bold;\n                        position: absolute;\n                        top: calc(50% - 0.6em);\n                        user-select: none;\n                        z-index: 3;\n                        color: #262626;\n                        text-shadow: -1px -1px 1px #111, 1px 1px 2px #fff;\n                    }"),a.createElement("div",{style:{position:"relative",width:e.diameter,height:e.diameter,userSelect:"none",margin:"14px 0 0 14px"}},a.createElement("div",{className:h,style:{width:e.diameter+"px",height:e.diameter+"px",borderRadius:e.diameter/2+"px"}}),a.createElement("div",{className:d+"-rot",style:{width:e.diameter-14+"px",height:e.diameter-14+"px",lineHeight:e.diameter-14+"px",borderRadius:(e.diameter-14)/2+"px",transform:"rotate("+n+"deg)"}},a.createElement("div",{className:d+"-notch",style:{left:(e.diameter-24)/2+"px"}})),a.createElement("div",{className:d+"-text",style:{fontSize:Math.ceil(e.diameter/4)+"px"}},e.value)))),e.children)}var g="donut-"+(new Date).getTime();function x(e){var t=u(e.value),n=t[0],i=t[1],o=(0,a.useState)(g+"-center"),h=o[0],p=o[1],m=c(i,e.onAngleChange),d=c((function(e){p(e?g+"-center-active":g+"-center")}),e.onInteractionChange),f=e.theme||{},x=f.donutColor||"#1BA098",v=f.bgrColor||"#e1e1e1",b=f.maxedBgrColor||"#051622",y=f.centerColor||"#fff",E=f.centerFocusedColor||"#F7F4E9",w=f.donutThickness||30,C=v;e.value===e.max&&(C=b);var k=C,S=x,M=x,L=90,A=n;return n<180&&(k=x,S=C,M=C,L=n+90,A=0),a.createElement(s,{style:e.style},a.createElement(l,{diameter:e.diameter,value:e.value,min:e.min,max:e.max,step:e.step,jumpLimit:e.jumpLimit,spaceMaxFromZero:e.spaceMaxFromZero,ariaLabelledBy:e.ariaLabelledBy,ariaValueText:e.ariaValueText,knobStyle:r({cursor:"pointer"},e.knobStyle),onAngleChange:m,onInteractionChange:d,onValueChange:e.onValueChange},a.createElement(a.Fragment,null,a.createElement("style",{type:"text/css"},"."+g+" {\n                      position: relative;\n                      border-radius: 50%;\n                      overflow: hidden;\n                    }\n                    ."+g+"-slice-one, ."+g+"-slice-two {\n                      position: absolute;\n                      top: 0;\n                      left: 0;\n                      width: 100%;\n                      height: 100%;\n                    }\n                    ."+g+"-center, ."+g+"-center-active {\n                      position: absolute;\n                      border-radius: 50%;\n                    }\n                    ."+g+"-center {\n                      background: "+y+";\n                    }\n                    ."+g+"-center-active {\n                      background: "+E+";\n                    }\n                    ."+g+"-center span {\n                      display: block;\n                      text-align: center;\n                    }\n                    ."+g+"-text {\n                        width: 100%;\n                        text-align: center;\n                        font-weight: bold;\n                        position: absolute;\n                        top: calc(50% - 0.6em);\n                        user-select: none;\n                        z-index: 3;\n                    }"),a.createElement("div",{style:{position:"relative",width:e.diameter,height:e.diameter,userSelect:"none"}},a.createElement("div",{className:g,style:{width:e.diameter+"px",height:e.diameter+"px",background:k}},a.createElement("div",{className:g+"-slice-one",style:{clip:"rect(0 "+e.diameter+"px "+e.diameter/2+"px 0)",transform:"rotate("+L+"deg)",background:S}}),a.createElement("div",{className:g+"-slice-two",style:{clip:"rect(0 "+e.diameter/2+"px "+e.diameter+"px 0)",transform:"rotate("+A+"deg)",background:M}}),a.createElement("div",{className:h,style:{top:w+"px",left:w+"px",width:e.diameter-2*w+"px",height:e.diameter-2*w+"px"}})),a.createElement("div",{className:g+"-text",style:{color:x,fontSize:Math.ceil(e.diameter/4)+"px"}},e.value)))),e.children)}t.default=l}}]);