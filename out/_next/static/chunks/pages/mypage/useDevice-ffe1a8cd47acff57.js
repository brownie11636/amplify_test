(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9461],{9381:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/mypage/useDevice",function(){return t(1987)}])},8192:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var i=t(7568),r=t(828),a=t(4051),s=t.n(a),c=t(5893),o=t(7294),u=(t(1163),t(461)),d=(t(3823),t(9473)),l=t(2505);t(7466).v4;function p(e){var n=e.groupID,t=(0,r.Z)((0,u.Z)(["id","nickname"]),2),a=(t[0],t[1],(0,d.v9)(l.L4),(0,o.useState)([])),p=a[0],v=a[1],f=(0,o.useState)([]),h=(f[0],f[1],(0,o.useState)("")),_=h[0],g=h[1];(0,d.v9)(l.pW);function x(){return(x=(0,i.Z)(s().mark((function e(){var t,i,r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n,e.next=3,fetch("https://localhost:3333/mypage/groupDeviceList",{method:"POST",body:JSON.stringify({group_id:t}),headers:{"Content-Type":"application/json"}});case 3:return i=e.sent,e.next=6,i.json();case 6:r=e.sent,200===(a=i.status)?(console.log(r),v(r),g("")):404===a?(console.log(a),v([]),g("\ud574\ub2f9 \uadf8\ub8f9\uc5d0\ub294 \ub4f1\ub85d\ub41c \ub514\ubc14\uc774\uc2a4\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.")):(alert("sometings wrong!"),console.log("status?",a),g("\ubb34\uc5b8\uac00 \uc5d0\ub7ec\uac00 \uc788\uc2b5\ub2c8\ub2e4."));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,o.useEffect)((function(){!function(){x.apply(this,arguments)}()}),[n]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("ul",{children:p.map((function(e){return(0,c.jsxs)("li",{value:e.device_id,children:["[device_name] ",e.device_name," - [device_type] ",e.device_type]},e.device_id)}))}),_]})})}},8280:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var i=t(7568),r=t(828),a=t(4051),s=t.n(a),c=t(5893),o=t(7294),u=(t(1163),t(461)),d=t(584),l=t.n(d),p=(t(3823),t(9473)),v=t(2505);t(7466).v4;function f(e){var n=e.setGpList,t=e.inviteCode,a=(0,r.Z)((0,u.Z)(["id","nickname"]),2),d=a[0],f=(a[1],(0,p.v9)(v.L4),(0,o.useState)([])),h=(f[0],f[1],(0,o.useState)([])),_=h[0],g=h[1],x=(0,o.useState)("");x[0],x[1],(0,p.v9)(v.pW);function m(){return m=(0,i.Z)(s().mark((function e(){var t,i,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.id,e.next=3,fetch("https://localhost:3333/mypage/groupList",{method:"POST",body:JSON.stringify({user_id:t}),headers:{"Content-Type":"application/json"}});case 3:return i=e.sent,e.next=6,i.json();case 6:r=e.sent,console.log(r),200===i.status&&(g(r),null!=n&&n(r));case 10:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}return(0,o.useEffect)((function(){!function(){m.apply(this,arguments)}()}),[]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:l().addDeviceContainer,children:(0,c.jsx)("a",{style:{paddingLeft:50,paddingTop:10,color:"black"},children:"\ub0b4\uac00 \uc18d\ud55c \uadf8\ub8f9 \ub9ac\uc2a4\ud2b8"})}),(0,c.jsx)("div",{children:(0,c.jsx)("ul",{children:_.map((function(e){return(0,c.jsxs)("li",{value:e.group_id,children:["[Master] ",e.master_nickname," - [Group Name] ",e.group_nickname,t?(0,c.jsx)("div",{onClick:function(){t(e.group_id)},children:" \ucd08\ub300 \ub9c1\ud06c \ub9cc\ub4e4\uae30"}):null]},e.group_id)}))})})]})}},7112:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var i=t(5893),r=(t(7294),t(3823)),a=t(1163),s=t(6318),c=t.n(s);function o(){var e=(0,a.useRouter)().pathname;return(0,i.jsxs)("div",{className:c().container,children:[(0,i.jsx)("div",{className:c().linkContainer,children:(0,i.jsx)(r.Z,{href:"/mypage",children:(0,i.jsx)("a",{className:"/mypage"===e?c().active:c().nonActive,children:"\ub0b4 \ub514\ubc14\uc774\uc2a4 \uad00\ub9ac"})})}),(0,i.jsx)("div",{className:c().linkContainer,children:(0,i.jsx)(r.Z,{href:"/mypage/group",children:(0,i.jsx)("a",{className:"/mypage/group_n"===e?c().active:c().nonActive,children:"\ub514\ubc14\uc774\uc2a4 \uadf8\ub8f9\uad00\ub9ac"})})}),(0,i.jsx)("div",{className:c().linkContainer,children:(0,i.jsx)(r.Z,{href:"/mypage/useDevice",children:(0,i.jsx)("a",{className:"/mypage/useDevice_n"===e?c().active:c().nonActive,children:"\ub514\ubc14\uc774\uc2a4 \uc0ac\uc6a9\ud558\uae30"})})})]})}},1987:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return l}});var i=t(1351),r=t(5893),a=t(7294),s=t(4108),c=t(8348),o=t(7112),u=t(8280),d=t(8192);function l(e){e=null!==e?e:(0,i.Z)(new TypeError("Cannot destructure undefined"));var n=(0,a.useState)(""),t=n[0],l=n[1],p=(0,a.useState)([]),v=p[0],f=p[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{}),(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"row",height:"100%",minHeight:720},children:[(0,r.jsx)(o.Z,{}),(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",height:"100%"},children:[(0,r.jsx)(u.Z,{setGpList:f}),(0,r.jsx)("select",{onChange:function(e){console.log(e.target.value),l(e.target.value)},children:v.map((function(e){return(0,r.jsx)("option",{value:e.group_id,children:e.group_nickname},e.group_id)}))}),(0,r.jsx)(d.Z,{groupID:t})]})]}),(0,r.jsx)(c.Z,{})]})}},6318:function(e){e.exports={root:"MypageNavbar_root__1ah5E",container:"MypageNavbar_container__bMn6_",linkContainer:"MypageNavbar_linkContainer__uypN2",nonActive:"MypageNavbar_nonActive__dui8L",active:"MypageNavbar_active__OCva9"}},584:function(e){e.exports={addDeviceContainer:"MypageRoot_addDeviceContainer__biRoF",addDevice:"MypageRoot_addDevice___RksP"}},7568:function(e,n,t){"use strict";function i(e,n,t,i,r,a,s){try{var c=e[a](s),o=c.value}catch(u){return void t(u)}c.done?n(o):Promise.resolve(o).then(i,r)}function r(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var s=e.apply(n,t);function c(e){i(s,r,a,c,o,"next",e)}function o(e){i(s,r,a,c,o,"throw",e)}c(void 0)}))}}t.d(n,{Z:function(){return r}})},1351:function(e,n,t){"use strict";function i(e){throw e}t.d(n,{Z:function(){return i}})}},function(e){e.O(0,[1664,853,4569,9774,2888,179],(function(){return n=9381,e(e.s=n);var n}));var n=e.O();_N_E=n}]);