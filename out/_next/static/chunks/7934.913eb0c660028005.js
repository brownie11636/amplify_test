"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7934],{57934:function(t,e,r){r.r(e),r.d(e,{default:function(){return m}});var o=r(99534),n=r(828),a=r(29815),s=r(85893),i=(r(5152),r(99477)),h=r(67294),c=r(22974),l=r(91359);class u extends i.Loader{constructor(t){super(t)}load(t,e,r,o){const n=this,a=new i.FileLoader(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,(function(r){try{e(n.parse(r))}catch(a){o?o(a):console.error(a),n.manager.itemError(t)}}),r,o)}parse(t){function e(t,e,r){for(let o=0,n=t.length;o<n;o++)if(t[o]!==e.getUint8(r+o))return!1;return!0}const r=function(t){if("string"===typeof t){const e=new Uint8Array(t.length);for(let r=0;r<t.length;r++)e[r]=255&t.charCodeAt(r);return e.buffer||e}return t}(t);return function(t){const r=new DataView(t);if(84+50*r.getUint32(80,!0)===r.byteLength)return!0;const o=[115,111,108,105,100];for(let n=0;n<5;n++)if(e(o,r,n))return!1;return!0}(r)?function(t){const e=new DataView(t),r=e.getUint32(80,!0);let o,n,a,s,h,c,l,u,g=!1;for(let i=0;i<70;i++)1129270351==e.getUint32(i,!1)&&82==e.getUint8(i+4)&&61==e.getUint8(i+5)&&(g=!0,s=new Float32Array(3*r*3),h=e.getUint8(i+6)/255,c=e.getUint8(i+7)/255,l=e.getUint8(i+8)/255,u=e.getUint8(i+9)/255);const f=new i.BufferGeometry,M=new Float32Array(3*r*3),y=new Float32Array(3*r*3);for(let i=0;i<r;i++){const t=84+50*i,r=e.getFloat32(t,!0),u=e.getFloat32(t+4,!0),f=e.getFloat32(t+8,!0);if(g){const r=e.getUint16(t+48,!0);0===(32768&r)?(o=(31&r)/31,n=(r>>5&31)/31,a=(r>>10&31)/31):(o=h,n=c,a=l)}for(let h=1;h<=3;h++){const c=t+12*h,l=3*i*3+3*(h-1);M[l]=e.getFloat32(c,!0),M[l+1]=e.getFloat32(c+4,!0),M[l+2]=e.getFloat32(c+8,!0),y[l]=r,y[l+1]=u,y[l+2]=f,g&&(s[l]=o,s[l+1]=n,s[l+2]=a)}}return f.setAttribute("position",new i.BufferAttribute(M,3)),f.setAttribute("normal",new i.BufferAttribute(y,3)),g&&(f.setAttribute("color",new i.BufferAttribute(s,3)),f.hasColors=!0,f.alpha=u),f}(r):function(t){const e=new i.BufferGeometry,r=/solid([\s\S]*?)endsolid/g,o=/facet([\s\S]*?)endfacet/g;let n=0;const a=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,s=new RegExp("vertex"+a+a+a,"g"),h=new RegExp("normal"+a+a+a,"g"),c=[],l=[],u=new i.Vector3;let g,f=0,M=0,y=0;for(;null!==(g=r.exec(t));){M=y;const t=g[0];for(;null!==(g=o.exec(t));){let t=0,e=0;const r=g[0];for(;null!==(g=h.exec(r));)u.x=parseFloat(g[1]),u.y=parseFloat(g[2]),u.z=parseFloat(g[3]),e++;for(;null!==(g=s.exec(r));)c.push(parseFloat(g[1]),parseFloat(g[2]),parseFloat(g[3])),l.push(u.x,u.y,u.z),t++,y++;1!==e&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+n),3!==t&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+n),n++}const r=M,a=y-M;e.addGroup(r,a,f),f++}return e.setAttribute("position",new i.Float32BufferAttribute(c,3)),e.setAttribute("normal",new i.Float32BufferAttribute(l,3)),e}("string"!==typeof(o=t)?i.LoaderUtils.decodeText(new Uint8Array(o)):o);var o}}r(22006);function g(t,e){var r="unknown";if(function(t){if(null==t)return!1;return"function"===typeof t[Symbol.iterator]}(t.inputSources)){var o=!0,n=!1,a=void 0;try{for(var s,i=t.inputSources[Symbol.iterator]();!(o=(s=i.next()).done);o=!0){var h=s.value;h&&h.handedness&&(r=h.handedness),h.gamepad&&(e[r].prev={buttons:e[r].new.buttons.slice(),axes:e[r].new.axes.slice(0)},e[r].new={buttons:h.gamepad.buttons.map((function(t){return t.value})),axes:h.gamepad.axes.slice(0)})}}catch(c){n=!0,a=c}finally{try{o||null==i.return||i.return()}finally{if(n)throw a}}}return e}var f=r(51438),M=r(52951),y=r(14924),d=function(){function t(e){if((0,f.Z)(this,t),(0,y.Z)(this,"stst",void 0),5!==e.length)throw new Error("geometry array must have 5 entries");if(0!==e[3][1]||0!==e[3][2]||0!==e[4][0]||0!==e[4][2])throw new Error("geometry 3 and 4 must be one dimensional geo[3] = [a,0,0] geo[4] = [0,b,0]");this.V1_length_x_y=Math.sqrt(Math.pow(e[1][0],2)+Math.pow(e[1][1],2)),this.V4_length_x_y_z=Math.sqrt(Math.pow(e[4][0],2)+Math.pow(e[4][1],2)+Math.pow(e[4][2],2)),this.geometry=e,this.J_initial_absolute=[];for(var r=[0,0,0],o=0;o<e.length;o++)this.J_initial_absolute.push([r[0],r[1],r[2]]),r[0]+=e[o][0],r[1]+=e[o][1],r[2]+=e[o][2];this.R_corrected=[0,0,0,0,0,0],this.R_corrected[1]-=Math.PI/2,this.R_corrected[1]+=Math.atan2(e[1][0],e[1][1]),this.R_corrected[2]-=Math.PI/2,this.R_corrected[2]-=Math.atan2(e[2][1]+e[3][1],e[2][0]+e[3][0]),this.R_corrected[2]-=Math.atan2(e[1][0],e[1][1]),this.R_corrected[4]+=Math.atan2(e[4][1],e[4][0]),this.R_corrected[4]-=Math.PI/2,this.J_now=this.J_initial_absolute,this.monitor=[0,0,0,0,0,0],this.R3Turn=0,this.R_old=this.R_corrected}return(0,M.Z)(t,[{key:"inverse",value:function(e,r,o,n,a,s){this.debug&&console.log(e,r,o,n,a,s);var i=Math.cos(n),h=Math.sin(n),c=Math.cos(a),l=Math.sin(a),u=Math.cos(s),g=Math.sin(s),f=[l,-h*c,i*c],M=[this.R_corrected[0],this.R_corrected[1],this.R_corrected[2],this.R_corrected[3],this.R_corrected[4],this.R_corrected[5]],y=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];y[5][0]=e,y[5][1]=r,y[5][2]=o,y[4][0]=e+this.V4_length_x_y_z*f[0],y[4][1]=r+this.V4_length_x_y_z*f[1],y[4][2]=o+this.V4_length_x_y_z*f[2],M[0]+=Math.asin(this.J_initial_absolute[4][2]/t.length2(y[4][2],y[4][0])),M[0]+=Math.atan2(-y[4][2],y[4][0]),this.J_initial_absolute[4][2]>t.length2(y[4][2],y[4][0])&&this.debug&&console.log("out of reach"),y[1][0]=Math.cos(M[0])*this.geometry[0][0]+Math.sin(M[0])*this.geometry[0][2],y[1][1]=this.geometry[0][1],y[1][2]=-Math.sin(M[0])*this.geometry[0][0]+Math.cos(M[0])*this.geometry[0][2];var d=[];d[0]=Math.cos(M[0])*y[4][0]+-Math.sin(M[0])*y[4][2],d[1]=y[4][1],d[2]=Math.sin(M[0])*y[4][0]+Math.cos(M[0])*y[4][2];var p=Math.pow(d[0]-this.J_initial_absolute[1][0],2)+Math.pow(d[1]-this.J_initial_absolute[1][1],2),m=t.length2(this.geometry[2][0]+this.geometry[3][0],this.geometry[2][1]+this.geometry[3][1]);M[2]+=Math.acos((-p+Math.pow(m,2)+Math.pow(this.V1_length_x_y,2))/(2*m*this.V1_length_x_y));var _=Math.sqrt(p);M[1]+=Math.atan2(d[1]-this.J_initial_absolute[1][1],d[0]-this.J_initial_absolute[1][0]),M[1]+=Math.acos((+p-Math.pow(m,2)+Math.pow(this.V1_length_x_y,2))/(2*_*this.V1_length_x_y));var w=Math.cos(M[0]),b=Math.sin(M[0]),v=this.geometry[0][0],R=this.geometry[0][1],x=this.geometry[0][2],S=Math.cos(M[1]),A=Math.sin(M[1]),T=this.geometry[1][0],I=this.geometry[1][1],J=this.geometry[1][2],P=Math.cos(M[2]),U=Math.sin(M[2]),E=this.geometry[2][0],F=this.geometry[2][1],Z=this.geometry[2][2];y[2][0]=w*v+b*x+w*S*T-w*A*I+b*J,y[2][1]=R+A*T+S*I,y[2][2]=-b*v+w*x-b*S*T+b*A*I+w*J,y[3][0]=y[2][0]+w*S*P*E-w*A*U*E-w*A*P*F-w*S*U*F+b*Z,y[3][1]=y[2][1]+A*P*E+S*U*E+S*P*F-A*U*F,y[3][2]=y[2][2]-b*S*P*E+b*A*U*E+b*A*P*F+b*S*U*F+w*Z;var V=[y[5][0]-y[4][0],y[5][1]-y[4][1],y[5][2]-y[4][2]],k=[y[3][0]-y[4][0],y[3][1]-y[4][1],y[3][2]-y[4][2]],j=t.cross(V,k),B=[10*Math.cos(M[0]+Math.PI/2),0,-10*Math.sin(M[0]+Math.PI/2)],C=(t.dot(B,j),Math.atan2(t.length3(j),t.dot(V,k)));this.monitor[0]=C,M[4]+=C;var L=t.cross(B,k);M[3]=t.angleBetween(j,B,L),this.monitor[1]=M[3],M[3]>3?this.R_old[3]-2*Math.PI*this.R3Turn<-3&&(this.R3Turn-=1):M[3]<-3&&this.R_old[3]-2*Math.PI*this.R3Turn>3&&(this.R3Turn+=1),M[3]=M[3]+2*Math.PI*this.R3Turn,Math.abs(M[3])>2*Math.PI&&(M[3]=M[3]>0?2*Math.PI:-2*Math.PI),this.monitor[2]=M[3],this.monitor[3]=this.R3Turn;var N=[-g*c,u*i-g*l*h,u*h+g*l*i];return M[5]-=Math.PI/2,M[5]-=t.angleBetween(j,N,t.cross(N,f)),this.J_now=y,this.R_old=M,M}},{key:"calculateTCP",value:function(t,e,r,o,n,a,s){var i=this.calculateCoordinates(t,e,r,o,n,a);s[0]=i[5][0],s[1]=i[5][1],s[2]=i[5][2],s[3]=i[5][3],s[4]=i[5][4],s[5]=i[5][5]}},{key:"forward",value:function(t,e,r,o,n,a){var s=Math.cos(t),i=Math.sin(t),h=this.geometry[0][0],c=this.geometry[0][1],l=this.geometry[0][2],u=Math.cos(e),g=Math.sin(e),f=this.geometry[1][0],M=this.geometry[1][1],y=this.geometry[1][2],d=Math.cos(r),p=Math.sin(r),m=this.geometry[2][0],_=this.geometry[2][1],w=this.geometry[2][2],b=Math.cos(o),v=Math.sin(o),R=this.geometry[3][0],x=this.geometry[3][1],S=this.geometry[3][2],A=Math.cos(n),T=Math.sin(n),I=this.geometry[4][0],J=this.geometry[4][1],P=this.geometry[4][2],U=Math.cos(a),E=Math.sin(a),F=[[],[],[],[],[],[]];F[0][0]=0,F[0][1]=0,F[0][2]=0,F[1][0]=F[0][0]+s*h+i*l,F[1][1]=F[0][1]+c,F[1][2]=F[0][2]+-i*h+s*l,F[2][0]=F[1][0]+s*u*f-s*g*M+i*y,F[2][1]=F[1][1]+g*f+u*M,F[2][2]=F[1][2]-i*u*f+i*g*M+s*y,F[3][0]=F[2][0]+s*u*d*m-s*g*p*m-s*g*d*_-s*u*p*_+i*w,F[3][1]=F[2][1]+g*d*m+u*p*m+u*d*_-g*p*_,F[3][2]=F[2][2]-i*u*d*m+i*g*p*m+i*g*d*_+i*u*p*_+s*w,F[4][0]=F[3][0]+s*u*d*R-s*g*p*R-s*g*d*b*x-s*u*p*b*x+i*v*x+i*b*S+s*g*d*v*S+s*u*p*v*S,F[4][1]=F[3][1]+g*d*R+u*p*R+u*d*b*x-g*p*b*x-u*d*v*S+g*p*v*S,F[4][2]=F[3][2]-i*u*d*R+i*g*p*R+i*g*d*b*x+i*u*p*b*x+s*v*x+s*b*S-i*g*d*v*S-i*u*p*v*S,F[5][0]=F[4][0]+s*u*d*A*I-s*g*p*A*I-s*g*d*b*T*I-s*u*p*b*T*I+i*v*T*I-s*g*d*b*A*J-s*u*p*b*A*J+i*v*A*J-s*u*d*T*J+s*g*p*T*J+i*b*P+s*g*d*v*P+s*u*p*v*P,F[5][1]=F[4][1]+g*d*A*I+u*p*A*I+u*d*b*T*I-g*p*b*T*I+u*d*b*A*J-g*p*b*A*J-g*d*T*J-u*p*T*J-u*d*v*P+g*p*v*P,F[5][2]=F[4][2]-i*u*d*A*I+i*g*p*A*I+i*g*d*b*T*I+i*u*p*b*T*I+s*v*T*I+i*g*d*b*A*J+i*u*p*b*A*J+s*v*A*J+i*u*d*T*J-i*g*p*T*J+s*b*P-i*g*d*v*P-i*u*p*v*P;var Z=[[s*g*d*b*A+s*u*p*b*A-i*v*A+s*u*d*T-s*g*p*T,-E*i*b-E*s*g*d*v-E*s*u*p*v+U*s*u*d*A-U*s*g*p*A-U*s*g*d*b*T-U*s*u*p*b*T+U*i*v*T,U*i*b+U*s*g*d*v+U*s*u*p*v+E*s*u*d*A-E*s*g*p*A-E*s*g*d*b*T-E*s*u*p*b*T+E*i*v*T],[-u*d*b*A+g*p*b*A+g*d*T+u*p*T,E*u*d*v-E*g*p*v+U*g*d*A+U*u*p*A+U*u*d*b*T-U*g*p*b*T,-U*u*d*v+U*g*p*v+E*g*d*A+E*u*p*A+E*u*d*b*T-E*g*p*b*T],[-i*g*d*b*A-i*u*p*b*A-s*v*A-i*u*d*T+i*g*p*T,-E*s*b+E*i*g*d*v+E*i*u*p*v-U*i*u*d*A+U*i*g*p*A+U*i*g*d*b*T+U*i*u*p*b*T+U*s*v*T,U*s*b-U*i*g*d*v-U*i*u*p*v-E*i*u*d*A+E*i*g*p*A+E*i*g*d*b*T+E*i*u*p*b*T+E*s*v*T]],V=0,k=0,j=0;return 1!==Z[2][0]||-1!==Z[2][0]?(V=Math.PI+Math.asin(Z[2][0]),k=Math.atan2(Z[2][1]/Math.cos(V),Z[2][2]/Math.cos(V)),j=Math.atan2(Z[1][0]/Math.cos(V),Z[0][0]/Math.cos(V))):(j=0,-1===Z[2][0]?(V=Math.PI/2,k=j+Math.atan2(Z[0][1],Z[0][2])):(V=-Math.PI/2,k=-j+Math.atan2(-Z[0][1],-Z[0][2]))),F[5][3]=k,F[5][4]=V,F[5][5]=j,this.debug&&(console.log("+++++++++forward KINEMATICS++++++++++"),console.log("J0 X ".concat(F[0][0]," Y ").concat(F[0][1]," Z ").concat(F[0][2])),console.log("J1 X ".concat(F[1][0]," Y ").concat(F[1][1]," Z ").concat(F[1][2])),console.log("J2 X ".concat(F[2][0]," Y ").concat(F[2][1]," Z ").concat(F[2][2])),console.log("J4 X ".concat(F[4][0]," Y ").concat(F[4][1]," Z ").concat(F[4][2])),console.log("J5 X ".concat(F[5][0]," Y ").concat(F[5][1]," Z ").concat(F[5][2])),console.log("J5 A ".concat(F[5][3]," B ").concat(F[5][4]," C ").concat(F[5][5])),console.log("---------forward KINEMATICS----------".concat(F[1][1]))),F}}],[{key:"cross",value:function(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}},{key:"dot",value:function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}},{key:"angleBetween",value:function(e,r,o){var n=t.length3(t.cross(e,r));return Math.atan2(n,this.dot(e,r))*(o[0]*e[0]+o[1]*e[1]+o[2]*e[2]>0?1:-1)}},{key:"length3",value:function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2))}},{key:"length2",value:function(t,e){return Math.sqrt(Math.pow(t,2)+Math.pow(e,2))}}]),t}(),p=(i.MathUtils.RAD2DEG,i.MathUtils.DEG2RAD);function m(t){t.armRot,(0,o.Z)(t,["armRot"]);var e=(0,l.nH)(),r=(e.controllers,e.isPresenting,e.isHandTracking,e.player,e.session),u=(e.foveation,e.referenceSpace,[.12525,.16,.0368,.1117,.06478,.119]),f=[.1,.3,.05],M=new i.Vector3(f[0],f[1],f[2]);M.multiplyScalar(2.5);var y=new d([[0,u[0],0],[0,u[1],0],[u[2],0,0],[u[3],0,0],[0,-(u[4]+.04),0]]),m=(0,l.bc)("right"),w=[0,0,-90*p,0,0,0],b=(0,h.useRef)(null),v=function(){var t=JSON.stringify({buttons:[0,0,0,0,0,0],axes:[0,0,0,0]});return{right:{new:JSON.parse(t),prev:JSON.parse(t)},left:{new:JSON.parse(t),prev:JSON.parse(t)}}}(),R=(0,h.useState)(0),x=(R[0],R[1],(0,h.useState)(0)),S=(x[0],x[1],(0,h.useState)(v)),A=S[0],T=S[1],I=(0,h.useState)(w),J=I[0],P=I[1],U=(0,h.useState)(!1),E=U[0],F=U[1],Z=(0,h.useState)(0),V=Z[0],k=Z[1],j=(0,h.useState)(null),B=j[0],C=j[1],L=(0,h.useState)(null),N=(L[0],L[1]);(0,c.A)((function(t,e){if(m){if(T(g(r,A)),A.right.new.buttons[1]>.7){A.right.prev.buttons[1]<.7&&b.current.traverse((function(t){t.isMesh&&(t.material.opacity=.6)})),A.right.new.buttons[0]>.5?V<.53&&k(V+.01):V>=.02&&k(V-.01),P(function(t,e,r,o){var n,s=new i.Vector3,h=t.rotation;t.getWorldPosition(s),s.sub(r),s.multiplyScalar(e);var c=[s.x,s.y,s.z,h.x,h.y,h.z];return(n=o).inverse.apply(n,(0,a.Z)(c))}(m.controller,.4,M,y).map((function(t,e){return t+w[e]})));var o=new i.Vector3;if(B){var s=m.controller.getWorldPosition(o).sub(B).length();N(s/e)}C(m.controller.getWorldPosition(o))}else A.right.prev.buttons[1]>.7&&b.current.traverse((function(t){t.isMesh&&(t.material.opacity=.85)}));if(A.right.new.buttons[5]!==A.right.prev.buttons[5]&&A.right.new.buttons[5]>.8){console.log("button ON!"),F(!E);var h=(0,n.Z)(E?["START","#ddaaaa"]:["WRITE","#b0bef0"],2),c=(h[0],h[1]);b.current.traverse((function(t){t.isMesh&&t.material.color.set(c)}))}}}));for(var D=[],z=0;z<7;z++)0===z?D[z]={STLUrl:"/stls/base_binary.stl",pos:[0,0,0]}:(D.push({STLUrl:"/stls/arm".concat(z-1,"_binary.stl"),pos:[0,0,0]}),z>1&&(D[z].pos=[0,u[z-2],0]));for(var q=["/stls/base_binary.stl"],G=0;G<u.length;G++)q.push("/stls/arm".concat(G,"_binary.stl"));return(0,s.jsx)("group",{position:M,scale:2.5,ref:b,children:(0,s.jsx)(_,{info:D[0],rotation:[0,-90*i.MathUtils.DEG2RAD,0],children:(0,s.jsx)(_,{info:D[1],rotation:[0,J[0],0],children:(0,s.jsx)(_,{info:D[2],rotation:[J[1],0,0],children:(0,s.jsx)(_,{info:D[3],rotation:[J[2],0,0],children:(0,s.jsx)(_,{info:D[4],rotation:[0,J[3],0],children:(0,s.jsx)(_,{info:D[5],rotation:[J[4],0,0],children:(0,s.jsx)(_,{info:D[6],rotation:[0,J[5],0]})})})})})})})})}var _=function(t){var e=t.info,r=t.children,n=t.rotation,a=((0,o.Z)(t,["info","children","rotation"]),(0,c.D)(u,e.STLUrl)),i=(0,h.useRef)();return(0,s.jsxs)("mesh",{ref:i,position:e.pos,rotation:n,children:[(0,s.jsx)("primitive",{object:a,attach:"geometry"}),(0,s.jsx)("meshPhongMaterial",{color:"#b0bef0",specular:"#111111",shininess:"200",transparent:!0,opacity:"0.85"}),r]})}},29815:function(t,e,r){r.d(e,{Z:function(){return s}});var o=r(20943);var n=r(13375);var a=r(91566);function s(t){return function(t){if(Array.isArray(t))return(0,o.Z)(t)}(t)||(0,n.Z)(t)||(0,a.Z)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);