var Ah=0,Dl=1,Eh=2;var Pi=1,Ch=2,xs=3,gi=0,ke=1,Ae=2,kn=0,vs=1,_r=2,Nl=3,Ul=4,Rh=5;var Ii=100,Ph=101,Ih=102,Lh=103,Dh=104,Nh=200,Uh=201,Fh=202,Oh=203,Fl=204,Ol=205,Bh=206,zh=207,Vh=208,kh=209,Gh=210,Hh=211,Wh=212,Xh=213,qh=214,ca=0,ha=1,ua=2,is=3,da=4,fa=5,pa=6,ma=7,Ya=0,Yh=1,Zh=2,wn=0,Bl=1,zl=2,Vl=3,kl=4,Gl=5,Hl=6,Wl=7;var Xl=300,_i=301,Li=302,Za=303,Ja=304,xr=306,ga=1e3,Rn=1001,_a=1002,Ve=1003,Jh=1004;var vr=1005;var Ge=1006,$a=1007;var xi=1008;var en=1009,ql=1010,Yl=1011,ys=1012,Ka=1013,Tn=1014,mn=1015,hn=1016,ja=1017,Qa=1018,Ms=1020,Zl=35902,Jl=35899,$l=1021,Kl=1022,gn=1023,Ln=1026,vi=1027,to=1028,eo=1029,yi=1030,no=1031;var io=1033,yr=33776,Mr=33777,Sr=33778,br=33779,so=35840,ro=35841,ao=35842,oo=35843,lo=36196,co=37492,ho=37496,uo=37488,fo=37489,wr=37490,po=37491,mo=37808,go=37809,_o=37810,xo=37811,vo=37812,yo=37813,Mo=37814,So=37815,bo=37816,wo=37817,To=37818,Ao=37819,Eo=37820,Co=37821,Ro=36492,Po=36494,Io=36495,Lo=36283,Do=36284,Tr=36285,No=36286;var Ws=2300,xa=2301,oa=2302,Ml=2303,Sl=2400,bl=2401,wl=2402;var $h=3200;var Uo=0,Kh=1,ei="",we="srgb",Xs="srgb-linear",qs="linear",pe="srgb";var la=7680;var jh=519,Qh=512,tu=513,eu=514,Fo=515,nu=516,iu=517,Oo=518,su=519,jl=35044;var Ql="300 es",Sn=2e3,ss=2001;function ud(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function dd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ys(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ru(){let i=Ys("canvas");return i.style.display="block",i}var Gc={},rs=null;function Zs(...i){let t="THREE."+i.shift();rs?rs("log",t,...i):console.log(t,...i)}function au(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Xt(...i){i=au(i);let t="THREE."+i.shift();if(rs)rs("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Zt(...i){i=au(i);let t="THREE."+i.shift();if(rs)rs("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ai(...i){let t=i.join(" ");t in Gc||(Gc[t]=!0,Xt(...i))}function ou(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var lu={[ca]:ha,[ua]:pa,[da]:ma,[is]:fa,[ha]:ca,[pa]:ua,[ma]:da,[fa]:is},Dn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hc=1234567,Vs=Math.PI/180,as=180/Math.PI;function In(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[i&255]+We[i>>8&255]+We[i>>16&255]+We[i>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function ee(i,t,e){return Math.max(t,Math.min(e,i))}function tc(i,t){return(i%t+t)%t}function fd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function pd(i,t,e){return i!==t?(e-i)/(t-i):0}function ks(i,t,e){return(1-e)*i+e*t}function md(i,t,e,n){return ks(i,t,1-Math.exp(-e*n))}function gd(i,t=1){return t-Math.abs(tc(i,t*2)-t)}function _d(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function xd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function vd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function yd(i,t){return i+Math.random()*(t-i)}function Md(i){return i*(.5-Math.random())}function Sd(i){i!==void 0&&(Hc=i);let t=Hc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bd(i){return i*Vs}function wd(i){return i*as}function Td(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ad(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ed(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cd(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:Xt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Mn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ss={DEG2RAD:Vs,RAD2DEG:as,generateUUID:In,clamp:ee,euclideanModulo:tc,mapLinear:fd,inverseLerp:pd,lerp:ks,damp:md,pingpong:gd,smoothstep:_d,smootherstep:xd,randInt:vd,randFloat:yd,randFloatSpread:Md,seededRandom:Sd,degToRad:bd,radToDeg:wd,isPowerOfTwo:Td,ceilPowerOfTwo:Ad,floorPowerOfTwo:Ed,setQuaternionFromProperEuler:Cd,normalize:me,denormalize:Mn},ac=class ac{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ac.prototype.isVector2=!0;var mt=ac,Nn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(d!==v||l!==u||c!==p||h!==g){let m=l*u+c*p+h*g+d*v;m<0&&(u=-u,p=-p,g=-g,v=-v,m=-m);let f=1-o;if(m<.9995){let b=Math.acos(m),T=Math.sin(b);f=Math.sin(f*b)/T,o=Math.sin(o*b)/T,l=l*f+u*o,c=c*f+p*o,h=h*f+g*o,d=d*f+v*o}else{l=l*f+u*o,c=c*f+p*o,h=h*f+g*o,d=d*f+v*o;let b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-o*p,t[e+2]=c*g+h*p+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},oc=class oc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Jo.copy(this).projectOnVector(t),this.sub(Jo)}reflect(t){return this.sub(Jo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};oc.prototype.isVector3=!0;var C=oc,Jo=new C,Wc=new Nn,lc=class lc{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],b=s[1],T=s[4],x=s[7],A=s[2],M=s[5],E=s[8];return r[0]=a*v+o*b+l*A,r[3]=a*m+o*T+l*M,r[6]=a*f+o*x+l*E,r[1]=c*v+h*b+d*A,r[4]=c*m+h*T+d*M,r[7]=c*f+h*x+d*E,r[2]=u*v+p*b+g*A,r[5]=u*m+p*T+g*M,r[8]=u*f+p*x+g*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,p=c*r-a*l,g=e*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=p*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ai("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($o.makeScale(t,e)),this}rotate(t){return Ai("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($o.makeRotation(-t)),this}translate(t,e){return Ai("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($o.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};lc.prototype.isMatrix3=!0;var $t=lc,$o=new $t,Xc=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rd(){let i={enabled:!0,workingColorSpace:Xs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pe&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(s.r=ns(s.r),s.g=ns(s.g),s.b=ns(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?qs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ai("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ai("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xs]:{primaries:t,whitePoint:n,transfer:qs,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:t,whitePoint:n,transfer:pe,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:we}}}),i}var re=Rd();function $n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ns(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Bi,va=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Bi===void 0&&(Bi=Ys("canvas")),Bi.width=t.width,Bi.height=t.height;let s=Bi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Bi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ys("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=$n(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($n(e[n]/255)*255):e[n]=$n(e[n]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Pd=0,os=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=In(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ko(s[a].image)):r.push(Ko(s[a]))}else r=Ko(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ko(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?va.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}var Id=0,jo=new C,Ke=class i extends Dn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Rn,s=Rn,r=Ge,a=xi,o=gn,l=en,c=i.DEFAULT_ANISOTROPY,h=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=In(),this.name="",this.source=new os(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jo).x}get height(){return this.source.getSize(jo).y}get depth(){return this.source.getSize(jo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ga:t.x=t.x-Math.floor(t.x);break;case Rn:t.x=t.x<0?0:1;break;case _a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ga:t.y=t.y-Math.floor(t.y);break;case Rn:t.y=t.y<0?0:1;break;case _a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Xl;Ke.DEFAULT_ANISOTROPY=1;var cc=class cc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,x=(p+1)/2,A=(f+1)/2,M=(h+u)/4,E=(d+v)/4,_=(g+m)/4;return T>x&&T>A?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=M/n,r=E/n):x>A?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=M/s,r=_/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=E/r,s=_/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-v)/b,this.z=(u-h)/b,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};cc.prototype.isVector4=!0;var ve=cc,ya=class extends Dn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ge,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ke(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ge,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new os(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qe=class extends ya{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Js=class extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ma=class extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var qa=class qa{constructor(t,e,n,s,r,a,o,l,c,h,d,u,p,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,p,g,v,m)}set(t,e,n,s,r,a,o,l,c,h,d,u,p,g,v,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qa().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/zi.setFromMatrixColumn(t,0).length(),r=1/zi.setFromMatrixColumn(t,1).length(),a=1/zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,p=a*d,g=o*h,v=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,p=l*d,g=c*h,v=c*d;e[0]=u+v*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,p=l*d,g=c*h,v=c*d;e[0]=u-v*o,e[4]=-a*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,p=a*d,g=o*h,v=o*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,p=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-u*d,e[8]=g*d+p,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-v*d}else if(t.order==="XZY"){let u=a*l,p=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=a*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ld,t,Dd)}lookAt(t,e,n){let s=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ri.crossVectors(n,rn),ri.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ri.crossVectors(n,rn)),ri.normalize(),Nr.crossVectors(rn,ri),s[0]=ri.x,s[4]=Nr.x,s[8]=rn.x,s[1]=ri.y,s[5]=Nr.y,s[9]=rn.y,s[2]=ri.z,s[6]=Nr.z,s[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],b=n[3],T=n[7],x=n[11],A=n[15],M=s[0],E=s[4],_=s[8],w=s[12],R=s[1],N=s[5],I=s[9],F=s[13],L=s[2],O=s[6],V=s[10],W=s[14],j=s[3],k=s[7],D=s[11],H=s[15];return r[0]=a*M+o*R+l*L+c*j,r[4]=a*E+o*N+l*O+c*k,r[8]=a*_+o*I+l*V+c*D,r[12]=a*w+o*F+l*W+c*H,r[1]=h*M+d*R+u*L+p*j,r[5]=h*E+d*N+u*O+p*k,r[9]=h*_+d*I+u*V+p*D,r[13]=h*w+d*F+u*W+p*H,r[2]=g*M+v*R+m*L+f*j,r[6]=g*E+v*N+m*O+f*k,r[10]=g*_+v*I+m*V+f*D,r[14]=g*w+v*F+m*W+f*H,r[3]=b*M+T*R+x*L+A*j,r[7]=b*E+T*N+x*O+A*k,r[11]=b*_+T*I+x*V+A*D,r[15]=b*w+T*F+x*W+A*H,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],v=t[7],m=t[11],f=t[15],b=l*p-c*u,T=o*p-c*d,x=o*u-l*d,A=a*p-c*h,M=a*u-l*h,E=a*d-o*h;return e*(v*b-m*T+f*x)-n*(g*b-m*A+f*M)+s*(g*T-v*A+f*E)-r*(g*x-v*M+m*E)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],v=t[13],m=t[14],f=t[15],b=e*o-n*a,T=e*l-s*a,x=e*c-r*a,A=n*l-s*o,M=n*c-r*o,E=s*c-r*l,_=h*v-d*g,w=h*m-u*g,R=h*f-p*g,N=d*m-u*v,I=d*f-p*v,F=u*f-p*m,L=b*F-T*I+x*N+A*R-M*w+E*_;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/L;return t[0]=(o*F-l*I+c*N)*O,t[1]=(s*I-n*F-r*N)*O,t[2]=(v*E-m*M+f*A)*O,t[3]=(u*M-d*E-p*A)*O,t[4]=(l*R-a*F-c*w)*O,t[5]=(e*F-s*R+r*w)*O,t[6]=(m*x-g*E-f*T)*O,t[7]=(h*E-u*x+p*T)*O,t[8]=(a*I-o*R+c*_)*O,t[9]=(n*R-e*I-r*_)*O,t[10]=(g*M-v*x+f*b)*O,t[11]=(d*x-h*M-p*b)*O,t[12]=(o*w-a*N-l*_)*O,t[13]=(e*N-n*w+s*_)*O,t[14]=(v*T-g*A-m*b)*O,t[15]=(h*A-d*T+u*b)*O,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,p=r*h,g=r*d,v=a*h,m=a*d,f=o*d,b=l*c,T=l*h,x=l*d,A=n.x,M=n.y,E=n.z;return s[0]=(1-(v+f))*A,s[1]=(p+x)*A,s[2]=(g-T)*A,s[3]=0,s[4]=(p-x)*M,s[5]=(1-(u+f))*M,s[6]=(m+b)*M,s[7]=0,s[8]=(g+T)*E,s[9]=(m-b)*E,s[10]=(1-(u+v))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=zi.set(s[0],s[1],s[2]).length(),o=zi.set(s[4],s[5],s[6]).length(),l=zi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),xn.copy(this);let c=1/a,h=1/o,d=1/l;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,e.setFromRotationMatrix(xn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Sn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s),g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===Sn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===ss)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Sn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s),g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===Sn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===ss)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};qa.prototype.isMatrix4=!0;var le=qa,zi=new C,xn=new le,Ld=new C(0,0,0),Dd=new C(1,1,1),ri=new C,Nr=new C,rn=new C,Yc=new le,Zc=new Nn,Kn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Kn.DEFAULT_ORDER="XYZ";var ls=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Nd=0,Jc=new C,Vi=new Nn,Wn=new le,Ur=new C,Rs=new C,Ud=new C,Fd=new Nn,$c=new C(1,0,0),Kc=new C(0,1,0),jc=new C(0,0,1),Qc={type:"added"},Od={type:"removed"},ki={type:"childadded",child:null},Qo={type:"childremoved",child:null},De=class i extends Dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new C,e=new Kn,n=new Nn,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new $t}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vi.setFromAxisAngle(t,e),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(t,e){return Vi.setFromAxisAngle(t,e),this.quaternion.premultiply(Vi),this}rotateX(t){return this.rotateOnAxis($c,t)}rotateY(t){return this.rotateOnAxis(Kc,t)}rotateZ(t){return this.rotateOnAxis(jc,t)}translateOnAxis(t,e){return Jc.copy(t).applyQuaternion(this.quaternion),this.position.add(Jc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($c,t)}translateY(t){return this.translateOnAxis(Kc,t)}translateZ(t){return this.translateOnAxis(jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ur.copy(t):Ur.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Rs,Ur,this.up):Wn.lookAt(Ur,Rs,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),Vi.setFromRotationMatrix(Wn),this.quaternion.premultiply(Vi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Zt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qc),ki.child=t,this.dispatchEvent(ki),ki.child=null):Zt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Od),Qo.child=t,this.dispatchEvent(Qo),Qo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qc),ki.child=t,this.dispatchEvent(ki),ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,t,Ud),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,Fd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};De.DEFAULT_UP=new C(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ae=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},Bd={type:"move"},cs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},Fr={h:0,s:0,l:0};function tl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var ft=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=tc(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=tl(a,r,t+1/3),this.g=tl(a,r,t),this.b=tl(a,r,t-1/3)}return re.colorSpaceToWorking(this,s),this}setStyle(t,e=we){function n(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){let n=cu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$n(t.r),this.g=$n(t.g),this.b=$n(t.b),this}copyLinearToSRGB(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return re.workingToColorSpace(Xe.copy(this),t),Math.round(ee(Xe.r*255,0,255))*65536+Math.round(ee(Xe.g*255,0,255))*256+Math.round(ee(Xe.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(Xe.copy(this),e);let n=Xe.r,s=Xe.g,r=Xe.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=we){re.workingToColorSpace(Xe.copy(this),t);let e=Xe.r,n=Xe.g,s=Xe.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ai),this.setHSL(ai.h+t,ai.s+e,ai.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ai),t.getHSL(Fr);let n=ks(ai.h,Fr.h,e),s=ks(ai.s,Fr.s,e),r=ks(ai.l,Fr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Xe=new ft;ft.NAMES=cu;var Un=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ft(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ei=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},vn=new C,Xn=new C,el=new C,qn=new C,Gi=new C,Hi=new C,th=new C,nl=new C,il=new C,sl=new C,rl=new ve,al=new ve,ol=new ve,Jn=class i{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),vn.subVectors(t,e),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){vn.subVectors(s,e),Xn.subVectors(n,e),el.subVectors(t,e);let a=vn.dot(vn),o=vn.dot(Xn),l=vn.dot(el),c=Xn.dot(Xn),h=Xn.dot(el),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qn.x),l.addScaledVector(a,qn.y),l.addScaledVector(o,qn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return rl.setScalar(0),al.setScalar(0),ol.setScalar(0),rl.fromBufferAttribute(t,e),al.fromBufferAttribute(t,n),ol.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(rl,r.x),a.addScaledVector(al,r.y),a.addScaledVector(ol,r.z),a}static isFrontFacing(t,e,n,s){return vn.subVectors(n,e),Xn.subVectors(t,e),vn.cross(Xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),vn.cross(Xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Gi.subVectors(s,n),Hi.subVectors(r,n),nl.subVectors(t,n);let l=Gi.dot(nl),c=Hi.dot(nl);if(l<=0&&c<=0)return e.copy(n);il.subVectors(t,s);let h=Gi.dot(il),d=Hi.dot(il);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Gi,a);sl.subVectors(t,r);let p=Gi.dot(sl),g=Hi.dot(sl);if(g>=0&&p<=g)return e.copy(r);let v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Hi,o);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return th.subVectors(r,s),o=(d-h)/(d-h+(p-g)),e.copy(s).addScaledVector(th,o);let f=1/(m+v+u);return a=v*f,o=u*f,e.copy(n).addScaledVector(Gi,a).addScaledVector(Hi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Fn=class{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,yn):yn.fromBufferAttribute(r,a),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Or.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox)),Or.applyMatrix4(t.matrixWorld),this.union(Or)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ps),Br.subVectors(this.max,Ps),Wi.subVectors(t.a,Ps),Xi.subVectors(t.b,Ps),qi.subVectors(t.c,Ps),oi.subVectors(Xi,Wi),li.subVectors(qi,Xi),Si.subVectors(Wi,qi);let e=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Si.z,Si.y,oi.z,0,-oi.x,li.z,0,-li.x,Si.z,0,-Si.x,-oi.y,oi.x,0,-li.y,li.x,0,-Si.y,Si.x,0];return!ll(e,Wi,Xi,qi,Br)||(e=[1,0,0,0,1,0,0,0,1],!ll(e,Wi,Xi,qi,Br))?!1:(zr.crossVectors(oi,li),e=[zr.x,zr.y,zr.z],ll(e,Wi,Xi,qi,Br))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Yn=[new C,new C,new C,new C,new C,new C,new C,new C],yn=new C,Or=new Fn,Wi=new C,Xi=new C,qi=new C,oi=new C,li=new C,Si=new C,Ps=new C,Br=new C,zr=new C,bi=new C;function ll(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){bi.fromArray(i,r);let o=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=t.dot(bi),c=e.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Le=new C,Vr=new mt,zd=0,je=class extends Dn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jl,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Vr.fromBufferAttribute(this,e),Vr.applyMatrix3(t),this.setXY(e,Vr.x,Vr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Mn(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Mn(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Mn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Mn(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var $s=class extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ks=class extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Qt=class extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}},Vd=new Fn,Is=new C,cl=new C,jn=class{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Vd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);let e=Is.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Is,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(cl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(cl)),this.expandByPoint(Is.copy(t.center).sub(cl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},kd=0,dn=new le,hl=new De,Yi=new C,an=new Fn,Ls=new Fn,Be=new C,_e=class i extends Dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ud(t)?Ks:$s)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,n){return dn.makeTranslation(t,e,n),this.applyMatrix4(dn),this}scale(t,e,n){return dn.makeScale(t,e,n),this.applyMatrix4(dn),this}lookAt(t){return hl.lookAt(t),hl.updateMatrix(),this.applyMatrix4(hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Qt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){let n=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(an.min,Ls.min),an.expandByPoint(Be),Be.addVectors(an.max,Ls.max),an.expandByPoint(Be)):(an.expandByPoint(Ls.min),an.expandByPoint(Ls.max))}an.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Be.fromBufferAttribute(o,c),l&&(Yi.fromBufferAttribute(t,c),Be.add(Yi)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new je(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new C,l[_]=new C;let c=new C,h=new C,d=new C,u=new mt,p=new mt,g=new mt,v=new C,m=new C;function f(_,w,R){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,R),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,R),h.sub(c),d.sub(c),p.sub(u),g.sub(u);let N=1/(p.x*g.y-g.x*p.y);isFinite(N)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(N),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(N),o[_].add(v),o[w].add(v),o[R].add(v),l[_].add(m),l[w].add(m),l[R].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let _=0,w=b.length;_<w;++_){let R=b[_],N=R.start,I=R.count;for(let F=N,L=N+I;F<L;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let T=new C,x=new C,A=new C,M=new C;function E(_){A.fromBufferAttribute(s,_),M.copy(A);let w=o[_];T.copy(w),T.sub(A.multiplyScalar(A.dot(w))).normalize(),x.crossVectors(M,w);let N=x.dot(l[_])<0?-1:1;a.setXYZW(_,T.x,T.y,T.z,N)}for(let _=0,w=b.length;_<w;++_){let R=b[_],N=R.start,I=R.count;for(let F=N,L=N+I;F<L;F+=3)E(t.getX(F+0)),E(t.getX(F+1)),E(t.getX(F+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,d=new C;if(t)for(let u=0,p=t.count;u<p;u+=3){let g=t.getX(u+0),v=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new je(u,h,d)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Sa=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=jl,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},Je=new C,js=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix4(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyNormalMatrix(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.transformDirection(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Mn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Mn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Mn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Mn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Zs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new je(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Zs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ul=new C,Gd=new C,Hd=new $t,$e=class{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ul.subVectors(n,e).cross(Gd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(ul),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Hd.getNormalMatrix(t),s=this.coplanarPoint(ul).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Wd=0,On=class extends Dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=In(),this.name="",this.type="Material",this.blending=vs,this.side=gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fl,this.blendDst=Ol,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=la,this.stencilZFail=la,this.stencilZPass=la,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new $e().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new mt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new mt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Bn=class extends On{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Zi,Ds=new C,Ji=new C,$i=new C,Ki=new mt,Ns=new mt,hu=new le,kr=new C,Us=new C,Gr=new C,eh=new mt,dl=new mt,nh=new mt,Qn=class extends De{constructor(t=new Bn){if(super(),this.isSprite=!0,this.type="Sprite",Zi===void 0){Zi=new _e;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Sa(e,5);Zi.setIndex([0,1,2,0,2,3]),Zi.setAttribute("position",new js(n,3,0,!1)),Zi.setAttribute("uv",new js(n,2,3,!1))}this.geometry=Zi,this.material=t,this.center=new mt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Zt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ji.setFromMatrixScale(this.matrixWorld),hu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),$i.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ji.multiplyScalar(-$i.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Hr(kr.set(-.5,-.5,0),$i,a,Ji,s,r),Hr(Us.set(.5,-.5,0),$i,a,Ji,s,r),Hr(Gr.set(.5,.5,0),$i,a,Ji,s,r),eh.set(0,0),dl.set(1,0),nh.set(1,1);let o=t.ray.intersectTriangle(kr,Us,Gr,!1,Ds);if(o===null&&(Hr(Us.set(-.5,.5,0),$i,a,Ji,s,r),dl.set(0,1),o=t.ray.intersectTriangle(kr,Gr,Us,!1,Ds),o===null))return;let l=t.ray.origin.distanceTo(Ds);l<t.near||l>t.far||e.push({distance:l,point:Ds.clone(),uv:Jn.getInterpolation(Ds,kr,Us,Gr,eh,dl,nh,new mt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Hr(i,t,e,n,s,r){Ki.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ns.x=r*Ki.x-s*Ki.y,Ns.y=s*Ki.x+r*Ki.y):Ns.copy(Ki),i.copy(t),i.x+=Ns.x,i.y+=Ns.y,i.applyMatrix4(hu)}var Zn=new C,fl=new C,Wr=new C,Xr=new C,hs=class{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){fl.copy(t).add(e).multiplyScalar(.5),Wr.copy(e).sub(t).normalize(),Xr.copy(this.origin).sub(fl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Wr),o=Xr.dot(this.direction),l=-Xr.dot(Wr),c=Xr.lengthSq(),h=Math.abs(1-a*a),d,u,p,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let v=1/h;d*=v,u*=v,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(fl).addScaledVector(Wr,u),p}intersectSphere(t,e){if(t.radius<0)return null;Zn.subVectors(t.center,this.origin);let n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,p=t.z-a.z,g=e.x-a.x,v=e.y-a.y,m=e.z-a.z,f=n.x-a.x,b=n.y-a.y,T=n.z-a.z,x=Math.abs(l),A=Math.abs(c),M=Math.abs(h),E,_,w,R,N,I,F,L,O,V,W,j;if(x>=A&&x>=M?(w=l,I=d,O=g,j=f,l>=0?(E=c,_=h,R=u,N=p,F=v,L=m,V=b,W=T):(E=h,_=c,R=p,N=u,F=m,L=v,V=T,W=b)):A>=M?(w=c,I=u,O=v,j=b,c>=0?(E=h,_=l,R=p,N=d,F=m,L=g,V=T,W=f):(E=l,_=h,R=d,N=p,F=g,L=m,V=f,W=T)):(w=h,I=p,O=m,j=T,h>=0?(E=l,_=c,R=d,N=u,F=g,L=v,V=f,W=b):(E=c,_=l,R=u,N=d,F=v,L=g,V=b,W=f)),w===0)return null;let k=E/w,D=_/w,H=1/w,pt=R-k*I,dt=N-D*I,at=F-k*O,ht=L-D*O,Dt=V-k*j,Y=W-D*j,J=Dt*ht-Y*at,ct=pt*Y-dt*Dt,Nt=at*dt-ht*pt;if(s){if(J<0||ct<0||Nt<0)return null}else if((J<0||ct<0||Nt<0)&&(J>0||ct>0||Nt>0))return null;let ut=J+ct+Nt;if(ut===0)return null;let gt=H*(J*I+ct*O+Nt*j);return(ut>0?gt<0:gt>0)?null:this.at(gt/ut,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ce=class extends On{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ih=new le,wi=new hs,qr=new jn,sh=new C,Yr=new C,Zr=new C,Jr=new C,pl=new C,$r=new C,rh=new C,Kr=new C,ce=class extends De{constructor(t=new _e,e=new Ce){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){$r.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(pl.fromBufferAttribute(d,t),a?$r.addScaledVector(pl,h):$r.addScaledVector(pl.sub(e),h))}e.add($r)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(r),wi.copy(t.ray).recast(t.near),!(qr.containsPoint(wi.origin)===!1&&(wi.intersectSphere(qr,sh)===null||wi.origin.distanceToSquared(sh)>(t.far-t.near)**2))&&(ih.copy(r).invert(),wi.copy(t.ray).applyMatrix4(ih),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,wi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,A=T;x<A;x+=3){let M=o.getX(x),E=o.getX(x+1),_=o.getX(x+2);s=jr(this,f,t,n,c,h,d,M,E,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let b=o.getX(m),T=o.getX(m+1),x=o.getX(m+2);s=jr(this,a,t,n,c,h,d,b,T,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,A=T;x<A;x+=3){let M=x,E=x+1,_=x+2;s=jr(this,f,t,n,c,h,d,M,E,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let b=m,T=m+1,x=m+2;s=jr(this,a,t,n,c,h,d,b,T,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Xd(i,t,e,n,s,r,a,o){let l;if(t.side===ke?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===gi,o),l===null)return null;Kr.copy(o),Kr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Kr);return c<e.near||c>e.far?null:{distance:c,point:Kr.clone(),object:i}}function jr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Yr),i.getVertexPosition(l,Zr),i.getVertexPosition(c,Jr);let h=Xd(i,t,e,n,Yr,Zr,Jr,rh);if(h){let d=new C;Jn.getBarycoord(rh,Yr,Zr,Jr,d),s&&(h.uv=Jn.getInterpolatedAttribute(s,o,l,c,d,new mt)),r&&(h.uv1=Jn.getInterpolatedAttribute(r,o,l,c,d,new mt)),a&&(h.normal=Jn.getInterpolatedAttribute(a,o,l,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new C,materialIndex:0};Jn.getNormal(Yr,Zr,Jr,u.normal),h.face=u,h.barycoord=d}return h}var Qs=class extends Ke{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ve,h=Ve,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var tr=class extends je{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ji=new le,ah=new le,Qr=[],oh=new Fn,qd=new le,Fs=new ce,Os=new jn,er=class extends ce{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new tr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,qd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ji),oh.copy(t.boundingBox).applyMatrix4(ji),this.boundingBox.union(oh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ji),Os.copy(t.boundingSphere).applyMatrix4(ji),this.boundingSphere.union(Os)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Fs.geometry=this.geometry,Fs.material=this.material,Fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Os.copy(this.boundingSphere),Os.applyMatrix4(n),t.ray.intersectsSphere(Os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ji),ah.multiplyMatrices(n,ji),Fs.matrixWorld=ah,Fs.raycast(t,Qr);for(let a=0,o=Qr.length;a<o;a++){let l=Qr[a];l.instanceId=r,l.object=this,e.push(l)}Qr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new tr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qs(new Float32Array(s*this.count),s,this.count,to,mn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ti=new jn,Yd=new mt(.5,.5),ta=new C,us=class{constructor(t=new $e,e=new $e,n=new $e,s=new $e,r=new $e,a=new $e){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Sn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],v=r[9],m=r[10],f=r[11],b=r[12],T=r[13],x=r[14],A=r[15];if(s[0].setComponents(c-a,p-h,f-g,A-b).normalize(),s[1].setComponents(c+a,p+h,f+g,A+b).normalize(),s[2].setComponents(c+o,p+d,f+v,A+T).normalize(),s[3].setComponents(c-o,p-d,f-v,A-T).normalize(),n)s[4].setComponents(l,u,m,x).normalize(),s[5].setComponents(c-l,p-u,f-m,A-x).normalize();else if(s[4].setComponents(c-l,p-u,f-m,A-x).normalize(),e===Sn)s[5].setComponents(c+l,p+u,f+m,A+x).normalize();else if(e===ss)s[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(t){Ti.center.set(0,0,0);let e=Yd.distanceTo(t.center);return Ti.radius=.7071067811865476+e,Ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ta.x=s.normal.x>0?t.max.x:t.min.x,ta.y=s.normal.y>0?t.max.y:t.min.y,ta.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ta)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var zn=class extends On{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ba=new C,wa=new C,lh=new le,Bs=new hs,ea=new jn,ml=new C,ch=new C,hi=class extends De{constructor(t=new _e,e=new zn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ba.fromBufferAttribute(e,s-1),wa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ba.distanceTo(wa);t.setAttribute("lineDistance",new Qt(n,1))}else Xt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(s),ea.radius+=r,t.ray.intersectsSphere(ea)===!1)return;lh.copy(s).invert(),Bs.copy(t.ray).applyMatrix4(lh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let f=h.getX(v),b=h.getX(v+1),T=na(this,t,Bs,l,f,b,v);T&&e.push(T)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(p),f=na(this,t,Bs,l,v,m,g-1);f&&e.push(f)}}else{let p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let f=na(this,t,Bs,l,v,v+1,v);f&&e.push(f)}if(this.isLineLoop){let v=na(this,t,Bs,l,g-1,p,g-1);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function na(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(ba.fromBufferAttribute(o,s),wa.fromBufferAttribute(o,r),e.distanceSqToSegment(ba,wa,ml,ch)>n)return;ml.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ml);if(!(c<t.near||c>t.far))return{distance:c,point:ch.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var hh=new C,uh=new C,ds=class extends hi{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)hh.fromBufferAttribute(e,s),uh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+hh.distanceTo(uh);t.setAttribute("lineDistance",new Qt(n,1))}else Xt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var nr=class extends Ke{constructor(t=[],e=_i,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},bn=class extends Ke{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ui=class extends Ke{constructor(t,e,n=Tn,s,r,a,o=Ve,l=Ve,c,h=Ln,d=1){if(h!==Ln&&h!==vi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new os(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ta=class extends ui{constructor(t,e=Tn,n=_i,s,r,a=Ve,o=Ve,l,c=Ln){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ir=class extends Ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Re=class i extends _e{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(h,3)),this.setAttribute("uv",new Qt(d,2));function g(v,m,f,b,T,x,A,M,E,_,w){let R=x/E,N=A/_,I=x/2,F=A/2,L=M/2,O=E+1,V=_+1,W=0,j=0,k=new C;for(let D=0;D<V;D++){let H=D*N-F;for(let pt=0;pt<O;pt++){let dt=pt*R-I;k[v]=dt*b,k[m]=H*T,k[f]=L,c.push(k.x,k.y,k.z),k[v]=0,k[m]=0,k[f]=M>0?1:-1,h.push(k.x,k.y,k.z),d.push(pt/E),d.push(1-D/_),W+=1}}for(let D=0;D<_;D++)for(let H=0;H<E;H++){let pt=u+H+O*D,dt=u+H+O*(D+1),at=u+(H+1)+O*(D+1),ht=u+(H+1)+O*D;l.push(pt,dt,ht),l.push(dt,at,ht),j+=6}o.addGroup(p,j,w),p+=j,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var se=class i extends _e{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],g=0,v=[],m=n/2,f=0;b(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Qt(d,3)),this.setAttribute("normal",new Qt(u,3)),this.setAttribute("uv",new Qt(p,2));function b(){let x=new C,A=new C,M=0,E=(e-t)/n;for(let _=0;_<=r;_++){let w=[],R=_/r,N=R*(e-t)+t;for(let I=0;I<=s;I++){let F=I/s,L=F*l+o,O=Math.sin(L),V=Math.cos(L);A.x=N*O,A.y=-R*n+m,A.z=N*V,d.push(A.x,A.y,A.z),x.set(O,E,V).normalize(),u.push(x.x,x.y,x.z),p.push(F,1-R),w.push(g++)}v.push(w)}for(let _=0;_<s;_++)for(let w=0;w<r;w++){let R=v[w][_],N=v[w+1][_],I=v[w+1][_+1],F=v[w][_+1];(t>0||w!==0)&&(h.push(R,N,F),M+=3),(e>0||w!==r-1)&&(h.push(N,I,F),M+=3)}c.addGroup(f,M,0),f+=M}function T(x){let A=g,M=new mt,E=new C,_=0,w=x===!0?t:e,R=x===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,m*R,0),u.push(0,R,0),p.push(.5,.5),g++;let N=g;for(let I=0;I<=s;I++){let L=I/s*l+o,O=Math.cos(L),V=Math.sin(L);E.x=w*V,E.y=m*R,E.z=w*O,d.push(E.x,E.y,E.z),u.push(0,R,0),M.x=O*.5+.5,M.y=V*.5*R+.5,p.push(M.x,M.y),g++}for(let I=0;I<s;I++){let F=A+I,L=N+I;x===!0?h.push(L,L+1,F):h.push(L+1,L,F),_+=3}c.addGroup(f,_,x===!0?1:2),f+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ti=class i extends se{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var on=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,p=(a-h)/u;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new mt:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new C,s=[],r=[],a=[],o=new C,l=new le;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ee(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(ee(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},fs=class extends on{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new mt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*d+this.aX,c=u*d+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Aa=class extends fs{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ec(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,p*=h,s(a,o,u,p)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var dh=new C,fh=new C,gl=new ec,_l=new ec,xl=new ec,Qe=class extends on{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(fh.subVectors(s[0],s[1]).add(s[0]),c=fh);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(dh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=dh),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),gl.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,v,m),_l.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,v,m),xl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(gl.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),_l.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),xl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(gl.calc(l),_l.calc(l),xl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ph(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Zd(i,t){let e=1-i;return e*e*t}function Jd(i,t){return 2*(1-i)*i*t}function $d(i,t){return i*i*t}function Gs(i,t,e,n){return Zd(i,t)+Jd(i,e)+$d(i,n)}function Kd(i,t){let e=1-i;return e*e*e*t}function jd(i,t){let e=1-i;return 3*e*e*i*t}function Qd(i,t){return 3*(1-i)*i*i*t}function tf(i,t){return i*i*i*t}function Hs(i,t,e,n,s){return Kd(i,t)+jd(i,e)+Qd(i,n)+tf(i,s)}var sr=class extends on{constructor(t=new mt,e=new mt,n=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new mt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hs(t,s.x,r.x,a.x,o.x),Hs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ea=class extends on{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hs(t,s.x,r.x,a.x,o.x),Hs(t,s.y,r.y,a.y,o.y),Hs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},rr=class extends on{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ca=class extends on{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ar=class extends on{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Gs(t,s.x,r.x,a.x),Gs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},or=class extends on{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Gs(t,s.x,r.x,a.x),Gs(t,s.y,r.y,a.y),Gs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},lr=class extends on{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(ph(o,l.x,c.x,h.x,d.x),ph(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new mt().fromArray(s))}return this}},Ra=Object.freeze({__proto__:null,ArcCurve:Aa,CatmullRomCurve3:Qe,CubicBezierCurve:sr,CubicBezierCurve3:Ea,EllipseCurve:fs,LineCurve:rr,LineCurve3:Ca,QuadraticBezierCurve:ar,QuadraticBezierCurve3:or,SplineCurve:lr}),Pa=class extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ra[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Ra[s.type]().fromJSON(s))}return this}},cr=class extends Pa{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new rr(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new ar(this.currentPoint.clone(),new mt(t,e),new mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new sr(this.currentPoint.clone(),new mt(t,e),new mt(n,s),new mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new lr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new fs(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ln=class extends cr{constructor(t){super(t),this.uuid=In(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new cr().fromJSON(s))}return this}};function ef(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=uu(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=of(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,d=l;for(let u=e;u<s;u+=e){let p=i[u],g=i[u+1];p<o&&(o=p),g<l&&(l=g),p>h&&(h=p),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return hr(r,a,e,o,l,c,0),a}function uu(i,t,e,n,s){let r;if(s===xf(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=mh(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=mh(a/n|0,i[a],i[a+1],r);return r&&ps(r,r.next)&&(dr(r),r=r.next),r}function Ci(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ps(e,e.next)||Ee(e.prev,e,e.next)===0)){if(dr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function hr(i,t,e,n,s,r,a){if(!i)return;!a&&r&&df(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?sf(i,n,s,r):nf(i)){t.push(l.i,i.i,c.i),dr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=rf(Ci(i),t),hr(i,t,e,n,s,r,2)):a===2&&af(i,t,e,n,s,r):hr(Ci(i),t,e,n,s,r,1);break}}}function nf(i){let t=i.prev,e=i,n=i.next;if(Ee(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),p=Math.max(o,l,c),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=p&&zs(s,o,r,l,a,c,g.x,g.y)&&Ee(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function sf(i,t,e,n){let s=i.prev,r=i,a=i.next;if(Ee(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,p=Math.min(o,l,c),g=Math.min(h,d,u),v=Math.max(o,l,c),m=Math.max(h,d,u),f=Tl(p,g,t,e,n),b=Tl(v,m,t,e,n),T=i.prevZ,x=i.nextZ;for(;T&&T.z>=f&&x&&x.z<=b;){if(T.x>=p&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==a&&zs(o,h,l,d,c,u,T.x,T.y)&&Ee(T.prev,T,T.next)>=0||(T=T.prevZ,x.x>=p&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&zs(o,h,l,d,c,u,x.x,x.y)&&Ee(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;T&&T.z>=f;){if(T.x>=p&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==a&&zs(o,h,l,d,c,u,T.x,T.y)&&Ee(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;x&&x.z<=b;){if(x.x>=p&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&zs(o,h,l,d,c,u,x.x,x.y)&&Ee(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function rf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!ps(n,s)&&fu(n,e,e.next,s)&&ur(n,s)&&ur(s,n)&&(t.push(n.i,e.i,s.i),dr(e),dr(e.next),e=i=s),e=e.next}while(e!==i);return Ci(e)}function af(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&mf(a,o)){let l=pu(a,o);a=Ci(a,a.next),l=Ci(l,l.next),hr(a,t,e,n,s,r,0),hr(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function of(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=uu(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(pf(c))}s.sort(lf);for(let r=0;r<s.length;r++)e=cf(s[r],e);return e}function lf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function cf(i,t){let e=hf(i,t);if(!e)return t;let n=pu(e,i);return Ci(n,n.next),Ci(e,e.next)}function hf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(ps(i,e))return e;do{if(ps(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&du(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);ur(e,i)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&uf(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function uf(i,t){return Ee(i.prev,i,t.prev)<0&&Ee(t.next,i,i.next)<0}function df(i,t,e,n){let s=i;do s.z===0&&(s.z=Tl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ff(s)}function ff(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Tl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function pf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function du(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function zs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&du(i,t,e,n,s,r,a,o)}function mf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!gf(i,t)&&(ur(i,t)&&ur(t,i)&&_f(i,t)&&(Ee(i.prev,i,t.prev)||Ee(i,t.prev,t))||ps(i,t)&&Ee(i.prev,i,i.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ps(i,t){return i.x===t.x&&i.y===t.y}function fu(i,t,e,n){let s=sa(Ee(i,t,e)),r=sa(Ee(i,t,n)),a=sa(Ee(e,n,i)),o=sa(Ee(e,n,t));return!!(s!==r&&a!==o||s===0&&ia(i,e,t)||r===0&&ia(i,n,t)||a===0&&ia(e,i,n)||o===0&&ia(e,t,n))}function ia(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function sa(i){return i>0?1:i<0?-1:0}function gf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&fu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ur(i,t){return Ee(i.prev,i,i.next)<0?Ee(i,t,i.next)>=0&&Ee(i,i.prev,t)>=0:Ee(i,t,i.prev)<0||Ee(i,i.next,t)<0}function _f(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function pu(i,t){let e=Al(i.i,i.x,i.y),n=Al(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function mh(i,t,e,n){let s=Al(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function dr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Al(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function xf(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var El=class{static triangulate(t,e,n=2){return ef(t,e,n)}},Pn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];gh(t),_h(n,t);let a=t.length;e.forEach(gh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,_h(n,e[l]);let o=El.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function gh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function _h(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Vn=class i extends _e{constructor(t=new ln([new mt(.5,.5),new mt(-.5,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Qt(s,3)),this.setAttribute("uv",new Qt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,f=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:vf,T,x=!1,A,M,E,_;if(f){T=f.getSpacedPoints(h),x=!0,u=!1;let et=f.isCatmullRomCurve3?f.closed:!1;A=f.computeFrenetFrames(h,et),M=new C,E=new C,_=new C}u||(m=0,p=0,g=0,v=0);let w=o.extractPoints(c),R=w.shape,N=w.holes;if(!Pn.isClockWise(R)){R=R.reverse();for(let et=0,$=N.length;et<$;et++){let st=N[et];Pn.isClockWise(st)&&(N[et]=st.reverse())}}function F(et){let st=10000000000000001e-36,ot=et[0];for(let _t=1;_t<=et.length;_t++){let zt=_t%et.length,Pt=et[zt],Wt=Pt.x-ot.x,qt=Pt.y-ot.y,U=Wt*Wt+qt*qt,ue=Math.max(Math.abs(Pt.x),Math.abs(Pt.y),Math.abs(ot.x),Math.abs(ot.y)),ne=st*ue*ue;if(U<=ne){et.splice(zt,1),_t--;continue}ot=Pt}}F(R),N.forEach(F);let L=N.length,O=R;for(let et=0;et<L;et++){let $=N[et];R=R.concat($)}function V(et,$,st){return $||Zt("ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector($,st)}let W=R.length;function j(et,$,st){let ot,_t,zt,Pt=et.x-$.x,Wt=et.y-$.y,qt=st.x-et.x,U=st.y-et.y,ue=Pt*Pt+Wt*Wt,ne=Pt*U-Wt*qt;if(Math.abs(ne)>Number.EPSILON){let P=Math.sqrt(ue),y=Math.sqrt(qt*qt+U*U),G=$.x-Wt/P,Z=$.y+Pt/P,tt=st.x-U/y,xt=st.y+qt/y,vt=((tt-G)*U-(xt-Z)*qt)/(Pt*U-Wt*qt);ot=G+Pt*vt-et.x,_t=Z+Wt*vt-et.y;let nt=ot*ot+_t*_t;if(nt<=2)return new mt(ot,_t);zt=Math.sqrt(nt/2)}else{let P=!1;Pt>Number.EPSILON?qt>Number.EPSILON&&(P=!0):Pt<-Number.EPSILON?qt<-Number.EPSILON&&(P=!0):Math.sign(Wt)===Math.sign(U)&&(P=!0),P?(ot=-Wt,_t=Pt,zt=Math.sqrt(ue)):(ot=Pt,_t=Wt,zt=Math.sqrt(ue/2))}return new mt(ot/zt,_t/zt)}let k=[];for(let et=0,$=O.length,st=$-1,ot=et+1;et<$;et++,st++,ot++)st===$&&(st=0),ot===$&&(ot=0),k[et]=j(O[et],O[st],O[ot]);let D=[],H,pt=k.concat();for(let et=0,$=L;et<$;et++){let st=N[et];H=[];for(let ot=0,_t=st.length,zt=_t-1,Pt=ot+1;ot<_t;ot++,zt++,Pt++)zt===_t&&(zt=0),Pt===_t&&(Pt=0),H[ot]=j(st[ot],st[zt],st[Pt]);D.push(H),pt=pt.concat(H)}let dt;if(m===0)dt=Pn.triangulateShape(O,N);else{let et=[],$=[];for(let st=0;st<m;st++){let ot=st/m,_t=p*Math.cos(ot*Math.PI/2),zt=g*Math.sin(ot*Math.PI/2)+v;for(let Pt=0,Wt=O.length;Pt<Wt;Pt++){let qt=V(O[Pt],k[Pt],zt);ct(qt.x,qt.y,-_t),ot===0&&et.push(qt)}for(let Pt=0,Wt=L;Pt<Wt;Pt++){let qt=N[Pt];H=D[Pt];let U=[];for(let ue=0,ne=qt.length;ue<ne;ue++){let P=V(qt[ue],H[ue],zt);ct(P.x,P.y,-_t),ot===0&&U.push(P)}ot===0&&$.push(U)}}dt=Pn.triangulateShape(et,$)}let at=dt.length,ht=g+v;for(let et=0;et<W;et++){let $=u?V(R[et],pt[et],ht):R[et];x?(E.copy(A.normals[0]).multiplyScalar($.x),M.copy(A.binormals[0]).multiplyScalar($.y),_.copy(T[0]).add(E).add(M),ct(_.x,_.y,_.z)):ct($.x,$.y,0)}for(let et=1;et<=h;et++)for(let $=0;$<W;$++){let st=u?V(R[$],pt[$],ht):R[$];x?(E.copy(A.normals[et]).multiplyScalar(st.x),M.copy(A.binormals[et]).multiplyScalar(st.y),_.copy(T[et]).add(E).add(M),ct(_.x,_.y,_.z)):ct(st.x,st.y,d/h*et)}for(let et=m-1;et>=0;et--){let $=et/m,st=p*Math.cos($*Math.PI/2),ot=g*Math.sin($*Math.PI/2)+v;for(let _t=0,zt=O.length;_t<zt;_t++){let Pt=V(O[_t],k[_t],ot);ct(Pt.x,Pt.y,d+st)}for(let _t=0,zt=N.length;_t<zt;_t++){let Pt=N[_t];H=D[_t];for(let Wt=0,qt=Pt.length;Wt<qt;Wt++){let U=V(Pt[Wt],H[Wt],ot);x?ct(U.x,U.y+T[h-1].y,T[h-1].x+st):ct(U.x,U.y,d+st)}}}Dt(),Y();function Dt(){let et=s.length/3;if(u){let $=0,st=W*$;for(let ot=0;ot<at;ot++){let _t=dt[ot];Nt(_t[2]+st,_t[1]+st,_t[0]+st)}$=h+m*2,st=W*$;for(let ot=0;ot<at;ot++){let _t=dt[ot];Nt(_t[0]+st,_t[1]+st,_t[2]+st)}}else{for(let $=0;$<at;$++){let st=dt[$];Nt(st[2],st[1],st[0])}for(let $=0;$<at;$++){let st=dt[$];Nt(st[0]+W*h,st[1]+W*h,st[2]+W*h)}}n.addGroup(et,s.length/3-et,0)}function Y(){let et=s.length/3,$=0;J(O,$),$+=O.length;for(let st=0,ot=N.length;st<ot;st++){let _t=N[st];J(_t,$),$+=_t.length}n.addGroup(et,s.length/3-et,1)}function J(et,$){let st=et.length;for(;--st>=0;){let ot=st,_t=st-1;_t<0&&(_t=et.length-1);for(let zt=0,Pt=h+m*2;zt<Pt;zt++){let Wt=W*zt,qt=W*(zt+1),U=$+ot+Wt,ue=$+_t+Wt,ne=$+_t+qt,P=$+ot+qt;ut(U,ue,ne,P)}}}function ct(et,$,st){l.push(et),l.push($),l.push(st)}function Nt(et,$,st){gt(et),gt($),gt(st);let ot=s.length/3,_t=b.generateTopUV(n,s,ot-3,ot-2,ot-1);Ht(_t[0]),Ht(_t[1]),Ht(_t[2])}function ut(et,$,st,ot){gt(et),gt($),gt(ot),gt($),gt(st),gt(ot);let _t=s.length/3,zt=b.generateSideWallUV(n,s,_t-6,_t-3,_t-2,_t-1);Ht(zt[0]),Ht(zt[1]),Ht(zt[3]),Ht(zt[1]),Ht(zt[2]),Ht(zt[3])}function gt(et){s.push(l[et*3+0]),s.push(l[et*3+1]),s.push(l[et*3+2])}function Ht(et){r.push(et.x),r.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return yf(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ra[s.type]().fromJSON(s)),new i(n,t.options)}},vf={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new mt(r,a),new mt(o,l),new mt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],p=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new mt(a,1-l),new mt(c,1-d),new mt(u,1-g),new mt(v,1-f)]:[new mt(o,1-l),new mt(h,1-d),new mt(p,1-g),new mt(m,1-f)]}};function yf(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ne=class i extends _e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,p=[],g=[],v=[],m=[];for(let f=0;f<h;f++){let b=f*u-a;for(let T=0;T<c;T++){let x=T*d-r;g.push(x,-b,0),v.push(0,0,1),m.push(T/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<o;b++){let T=b+c*f,x=b+c*(f+1),A=b+1+c*(f+1),M=b+1+c*f;p.push(T,x,M),p.push(x,A,M)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(v,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var ms=class i extends _e{constructor(t=new ln([new mt(0,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Qt(s,3)),this.setAttribute("normal",new Qt(r,3)),this.setAttribute("uv",new Qt(a,2));function c(h){let d=s.length/3,u=h.extractPoints(e),p=u.shape,g=u.holes;Pn.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=g.length;m<f;m++){let b=g[m];Pn.isClockWise(b)===!0&&(g[m]=b.reverse())}let v=Pn.triangulateShape(p,g);for(let m=0,f=g.length;m<f;m++){let b=g[m];p=p.concat(b)}for(let m=0,f=p.length;m<f;m++){let b=p[m];s.push(b.x,b.y,0),r.push(0,0,1),a.push(b.x,b.y)}for(let m=0,f=v.length;m<f;m++){let b=v[m],T=b[0]+d,x=b[1]+d,A=b[2]+d;n.push(T,x,A),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Mf(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];n.push(a)}return new i(n,t.curveSegments)}};function Mf(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var Te=class i extends _e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new C,u=new C,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){let b=[],T=f/n,x=a+T*o,A=t*Math.cos(x),M=Math.sqrt(t*t-A*A),E=0;f===0&&a===0?E=.5/e:f===n&&l===Math.PI&&(E=-.5/e);for(let _=0;_<=e;_++){let w=_/e,R=s+w*r;d.x=-M*Math.cos(R),d.y=A,d.z=M*Math.sin(R),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(w+E,1-T),b.push(c++)}h.push(b)}for(let f=0;f<n;f++)for(let b=0;b<e;b++){let T=h[f][b+1],x=h[f][b],A=h[f+1][b],M=h[f+1][b+1];(f!==0||a>0)&&p.push(T,x,M),(f!==n-1||l<Math.PI)&&p.push(x,A,M)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(v,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var gs=class i extends _e{constructor(t=new or(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,l=new C,c=new mt,h=new C,d=[],u=[],p=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Qt(d,3)),this.setAttribute("normal",new Qt(u,3)),this.setAttribute("uv",new Qt(p,2));function v(){for(let T=0;T<e;T++)m(T);m(r===!1?e:0),b(),f()}function m(T){h=t.getPointAt(T/e,h);let x=a.normals[T],A=a.binormals[T];for(let M=0;M<=s;M++){let E=M/s*Math.PI*2,_=Math.sin(E),w=-Math.cos(E);l.x=w*x.x+_*A.x,l.y=w*x.y+_*A.y,l.z=w*x.z+_*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function f(){for(let T=1;T<=e;T++)for(let x=1;x<=s;x++){let A=(s+1)*(T-1)+(x-1),M=(s+1)*T+(x-1),E=(s+1)*T+x,_=(s+1)*(T-1)+x;g.push(A,M,_),g.push(M,E,_)}}function b(){for(let T=0;T<=e;T++)for(let x=0;x<=s;x++)c.x=T/e,c.y=x/s,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Ra[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Di(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(xh(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(xh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ye(i){let t={};for(let e=0;e<i.length;e++){let n=Di(i[e]);for(let s in n)t[s]=n[s]}return t}function xh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Sf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}var Bo={clone:Di,merge:Ye},bf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ue=class extends On{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bf,this.fragmentShader=wf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Di(t.uniforms),this.uniformsGroups=Sf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new ft().setHex(s.value);break;case"v2":this.uniforms[n].value=new mt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ve().fromArray(s.value);break;case"m3":this.uniforms[n].value=new $t().fromArray(s.value);break;case"m4":this.uniforms[n].value=new le().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ia=class extends Ue{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var tn=class extends On{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uo,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Ya,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},La=class extends On{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Da=class extends On{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Qi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function vl(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var di=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Na=class extends di{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sl,endingEnd:Sl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case bl:r=t,o=2*e-n;break;case wl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case bl:a=t,l=2*n-e;break;case wl:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),v=g*g,m=v*g,f=-u*m+2*u*v-u*g,b=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*g+1,T=(-1-p)*m+(1.5+p)*v+.5*g,x=p*m-p*v;for(let A=0;A!==o;++A)r[A]=f*a[h+A]+b*a[c+A]+T*a[l+A]+x*a[d+A];return r}},Ua=class extends di{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Fa=class extends di{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Oa=class extends di{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(s-e),v=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*v+a[l+m]*g;return r}let u=o*2,p=t-1;for(let g=0;g!==o;++g){let v=a[c+g],m=a[l+g],f=p*u+g*2,b=d[f],T=d[f+1],x=t*u+g*2,A=h[x],M=h[x+1],E=Af(n,e,b,A,s);r[g]=mu(E,v,T,M,m)}return r}};function mu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Tf(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Af(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=mu(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Tf(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var cn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qi(e,this.TimeBufferType),this.values=Qi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Qi(t.times,Array),values:Qi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),vl(t.settings)&&(n.settings={inTangents:Qi(t.settings.inTangents,Array),outTangents:Qi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Na(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Oa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ws:e=this.InterpolantFactoryMethodDiscrete;break;case xa:e=this.InterpolantFactoryMethodLinear;break;case oa:e=this.InterpolantFactoryMethodSmooth;break;case Ml:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Xt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ws;case this.InterpolantFactoryMethodLinear:return xa;case this.InterpolantFactoryMethodSmooth:return oa;case this.InterpolantFactoryMethodBezier:return Ml}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;vl(this.settings)&&(vh(this.settings.inTangents,t),vh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Zt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Zt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Zt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Zt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&dd(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Zt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===oa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,u=d-n,p=d+n;for(let g=0;g!==n;++g){let v=e[d+g];if(v!==e[u+g]||v!==e[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let p=0;p!==n;++p)e[u+p]=e[d+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,vl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function vh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=xa;var fi=class extends cn{constructor(t,e,n){super(t,e,n)}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=Ws;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ba=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}};Ba.prototype.ValueTypeName="color";var za=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}};za.prototype.ValueTypeName="number";var Va=class extends di{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Nn.slerpFlat(r,0,a,c-o,a,c,l);return r}},fr=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Va(this.times,this.values,this.getValueSize(),t)}};fr.prototype.ValueTypeName="quaternion";fr.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends cn{constructor(t,e,n){super(t,e,n)}};pi.prototype.ValueTypeName="string";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=Ws;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var ka=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}};ka.prototype.ValueTypeName="vector";var Ga=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},gu=new Ga,Ha=class{constructor(t){this.manager=t!==void 0?t:gu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ha.DEFAULT_MATERIAL_NAME="__DEFAULT";var _s=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ft(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},fn=class extends _s{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},yl=new le,yh=new C,Mh=new C,pr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new us,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;yh.setFromMatrixPosition(t.matrixWorld),e.position.copy(yh),Mh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Mh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){yl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(yl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===ss||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(yl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ra=new C,aa=new Nn,Cn=new C,mr=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ra,aa,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ra,aa,Cn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ra,aa,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ra,aa,Cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ci=new C,Sh=new mt,bh=new mt,ze=class extends mr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=as*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return as*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,Sh,bh),e.subVectors(bh,Sh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Cl=class extends pr{constructor(){super(new ze(90,1,.5,500)),this.isPointLightShadow=!0}},Ri=class extends _s{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Cl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},mi=class extends mr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Rl=class extends pr{constructor(){super(new mi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},pn=class extends _s{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Rl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var ts=-90,es=1,Wa=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ze(ts,es,t,e);s.layers=this.layers,this.add(s);let r=new ze(ts,es,t,e);r.layers=this.layers,this.add(r);let a=new ze(ts,es,t,e);a.layers=this.layers,this.add(a);let o=new ze(ts,es,t,e);o.layers=this.layers,this.add(o);let l=new ze(ts,es,t,e);l.layers=this.layers,this.add(l);let c=new ze(ts,es,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Xa=class extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var ic="\\[\\]\\.:\\/",Ef=new RegExp("["+ic+"]","g"),sc="[^"+ic+"]",Cf="[^"+ic.replace("\\.","")+"]",Rf=/((?:WC+[\/:])*)/.source.replace("WC",sc),Pf=/(WCOD+)?/.source.replace("WCOD",Cf),If=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",sc),Lf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",sc),Df=new RegExp("^"+Rf+Pf+If+Lf+"$"),Nf=["material","materials","bones","map"],Pl=class{constructor(t,e,n){let s=n||be.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},be=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ef,"")}static parseTrackName(t){let e=Df.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Nf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Zt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Zt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Zt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Zt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Zt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Zt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};be.Composite=Pl;be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};be.prototype.GetterByBindingType=[be.prototype._getValue_direct,be.prototype._getValue_array,be.prototype._getValue_arrayElement,be.prototype._getValue_toArray];be.prototype.SetterByBindingTypeAndVersioning=[[be.prototype._setValue_direct,be.prototype._setValue_direct_setNeedsUpdate,be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[be.prototype._setValue_array,be.prototype._setValue_array_setNeedsUpdate,be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[be.prototype._setValue_arrayElement,be.prototype._setValue_arrayElement_setNeedsUpdate,be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[be.prototype._setValue_fromArray,be.prototype._setValue_fromArray_setNeedsUpdate,be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var tx=new Float32Array(1);var wh=new le,gr=class{constructor(t,e,n=0,s=1/0){this.ray=new hs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ls,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Zt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return wh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wh),this}intersectObject(t,e=!0,n=[]){return Il(t,this,n,e),n.sort(Th),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Il(t[s],this,n,e);return n.sort(Th),n}};function Th(i,t){return i.distance-t.distance}function Il(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Il(r[a],t,e,!0)}}var hc=class hc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};hc.prototype.isMatrix2=!0;var Ll=hc;function rc(i,t,e,n){let s=Uf(n);switch(e){case $l:return i*t;case to:return i*t/s.components*s.byteLength;case eo:return i*t/s.components*s.byteLength;case yi:return i*t*2/s.components*s.byteLength;case no:return i*t*2/s.components*s.byteLength;case Kl:return i*t*3/s.components*s.byteLength;case gn:return i*t*4/s.components*s.byteLength;case io:return i*t*4/s.components*s.byteLength;case yr:case Mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Sr:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ro:case oo:return Math.max(i,16)*Math.max(t,8)/4;case so:case ao:return Math.max(i,8)*Math.max(t,8)/2;case lo:case co:case uo:case fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ho:case wr:case po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case go:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case _o:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case xo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case vo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case yo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case So:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case bo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case To:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Co:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ro:case Po:case Io:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Lo:case Do:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Tr:case No:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Uf(i){switch(i){case en:case ql:return{byteLength:1,components:1};case ys:case Yl:case hn:return{byteLength:2,components:1};case ja:case Qa:return{byteLength:2,components:4};case Tn:case Ka:case mn:return{byteLength:4,components:1};case Zl:case Jl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Bu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Of(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){let g=d[u],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){let v=d[p];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Bf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Yf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$f=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Kf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,op=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,up=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,_p=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ep=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Pp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Np=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Fp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Op=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,kp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Zp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,em=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,im=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,am=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,om=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,um=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_m=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ym=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Sm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Am=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Em=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Im=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Dm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Bm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,km=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ym=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ig=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ag=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,og=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ug=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Bf,alphahash_pars_fragment:zf,alphamap_fragment:Vf,alphamap_pars_fragment:kf,alphatest_fragment:Gf,alphatest_pars_fragment:Hf,aomap_fragment:Wf,aomap_pars_fragment:Xf,batching_pars_vertex:qf,batching_vertex:Yf,begin_vertex:Zf,beginnormal_vertex:Jf,bsdfs:$f,iridescence_fragment:Kf,bumpmap_pars_fragment:jf,clipping_planes_fragment:Qf,clipping_planes_pars_fragment:tp,clipping_planes_pars_vertex:ep,clipping_planes_vertex:np,color_fragment:ip,color_pars_fragment:sp,color_pars_vertex:rp,color_vertex:ap,common:op,cube_uv_reflection_fragment:lp,defaultnormal_vertex:cp,displacementmap_pars_vertex:hp,displacementmap_vertex:up,emissivemap_fragment:dp,emissivemap_pars_fragment:fp,colorspace_fragment:pp,colorspace_pars_fragment:mp,envmap_fragment:gp,envmap_common_pars_fragment:_p,envmap_pars_fragment:xp,envmap_pars_vertex:vp,envmap_physical_pars_fragment:Pp,envmap_vertex:yp,fog_vertex:Mp,fog_pars_vertex:Sp,fog_fragment:bp,fog_pars_fragment:wp,gradientmap_pars_fragment:Tp,lightmap_pars_fragment:Ap,lights_lambert_fragment:Ep,lights_lambert_pars_fragment:Cp,lights_pars_begin:Rp,lights_toon_fragment:Ip,lights_toon_pars_fragment:Lp,lights_phong_fragment:Dp,lights_phong_pars_fragment:Np,lights_physical_fragment:Up,lights_physical_pars_fragment:Fp,lights_fragment_begin:Op,lights_fragment_maps:Bp,lights_fragment_end:zp,lightprobes_pars_fragment:Vp,logdepthbuf_fragment:kp,logdepthbuf_pars_fragment:Gp,logdepthbuf_pars_vertex:Hp,logdepthbuf_vertex:Wp,map_fragment:Xp,map_pars_fragment:qp,map_particle_fragment:Yp,map_particle_pars_fragment:Zp,metalnessmap_fragment:Jp,metalnessmap_pars_fragment:$p,morphinstance_vertex:Kp,morphcolor_vertex:jp,morphnormal_vertex:Qp,morphtarget_pars_vertex:tm,morphtarget_vertex:em,normal_fragment_begin:nm,normal_fragment_maps:im,normal_pars_fragment:sm,normal_pars_vertex:rm,normal_vertex:am,normalmap_pars_fragment:om,clearcoat_normal_fragment_begin:lm,clearcoat_normal_fragment_maps:cm,clearcoat_pars_fragment:hm,iridescence_pars_fragment:um,opaque_fragment:dm,packing:fm,premultiplied_alpha_fragment:pm,project_vertex:mm,dithering_fragment:gm,dithering_pars_fragment:_m,roughnessmap_fragment:xm,roughnessmap_pars_fragment:vm,shadowmap_pars_fragment:ym,shadowmap_pars_vertex:Mm,shadowmap_vertex:Sm,shadowmask_pars_fragment:bm,skinbase_vertex:wm,skinning_pars_vertex:Tm,skinning_vertex:Am,skinnormal_vertex:Em,specularmap_fragment:Cm,specularmap_pars_fragment:Rm,tonemapping_fragment:Pm,tonemapping_pars_fragment:Im,transmission_fragment:Lm,transmission_pars_fragment:Dm,uv_pars_fragment:Nm,uv_pars_vertex:Um,uv_vertex:Fm,worldpos_vertex:Om,background_vert:Bm,background_frag:zm,backgroundCube_vert:Vm,backgroundCube_frag:km,cube_vert:Gm,cube_frag:Hm,depth_vert:Wm,depth_frag:Xm,distance_vert:qm,distance_frag:Ym,equirect_vert:Zm,equirect_frag:Jm,linedashed_vert:$m,linedashed_frag:Km,meshbasic_vert:jm,meshbasic_frag:Qm,meshlambert_vert:tg,meshlambert_frag:eg,meshmatcap_vert:ng,meshmatcap_frag:ig,meshnormal_vert:sg,meshnormal_frag:rg,meshphong_vert:ag,meshphong_frag:og,meshphysical_vert:lg,meshphysical_frag:cg,meshtoon_vert:hg,meshtoon_frag:ug,points_vert:dg,points_frag:fg,shadow_vert:pg,shadow_frag:mg,sprite_vert:gg,sprite_frag:_g},Tt={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Hn={basic:{uniforms:Ye([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Ye([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new ft(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Ye([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Ye([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Ye([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new ft(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Ye([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Ye([Tt.points,Tt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Ye([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Ye([Tt.common,Tt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Ye([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Ye([Tt.sprite,Tt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:Ye([Tt.common,Tt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:Ye([Tt.lights,Tt.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Hn.physical={uniforms:Ye([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var zo={r:0,b:0,g:0},xg=new le,zu=new $t;zu.set(-1,0,0,0,1,0,0,0,1);function vg(i,t,e,n,s,r){let a=new ft(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function p(b){let T=b.isScene===!0?b.background:null;if(T&&T.isTexture){let x=b.backgroundBlurriness>0;T=t.get(T,x)}return T}function g(b){let T=!1,x=p(b);x===null?m(a,o):x&&x.isColor&&(m(x,1),T=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(b,T){let x=p(T);x&&(x.isCubeTexture||x.mapping===xr)?(c===void 0&&(c=new ce(new Re(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:Di(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,M,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(xg.makeRotationFromEuler(T.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(zu),c.material.toneMapped=re.getTransfer(x.colorSpace)!==pe,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ce(new Ne(2,2),new Ue({name:"BackgroundMaterial",uniforms:Di(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=re.getTransfer(x.colorSpace)!==pe,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,T){b.getRGB(zo,nc(i)),e.buffers.color.setClear(zo.r,zo.g,zo.b,T,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,T=1){a.set(b),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:v,dispose:f}}function yg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(N,I,F,L,O){let V=!1,W=d(N,L,F,I);r!==W&&(r=W,c(r.object)),V=p(N,L,F,O),V&&g(N,L,F,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,x(N,I,F,L),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function d(N,I,F,L){let O=L.wireframe===!0,V=n[I.id];V===void 0&&(V={},n[I.id]=V);let W=N.isInstancedMesh===!0?N.id:0,j=V[W];j===void 0&&(j={},V[W]=j);let k=j[F.id];k===void 0&&(k={},j[F.id]=k);let D=k[O];return D===void 0&&(D=u(l()),k[O]=D),D}function u(N){let I=[],F=[],L=[];for(let O=0;O<e;O++)I[O]=0,F[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:L,object:N,attributes:{},index:null}}function p(N,I,F,L){let O=r.attributes,V=I.attributes,W=0,j=F.getAttributes();for(let k in j)if(j[k].location>=0){let H=O[k],pt=V[k];if(pt===void 0&&(k==="instanceMatrix"&&N.instanceMatrix&&(pt=N.instanceMatrix),k==="instanceColor"&&N.instanceColor&&(pt=N.instanceColor)),H===void 0||H.attribute!==pt||pt&&H.data!==pt.data)return!0;W++}return r.attributesNum!==W||r.index!==L}function g(N,I,F,L){let O={},V=I.attributes,W=0,j=F.getAttributes();for(let k in j)if(j[k].location>=0){let H=V[k];H===void 0&&(k==="instanceMatrix"&&N.instanceMatrix&&(H=N.instanceMatrix),k==="instanceColor"&&N.instanceColor&&(H=N.instanceColor));let pt={};pt.attribute=H,H&&H.data&&(pt.data=H.data),O[k]=pt,W++}r.attributes=O,r.attributesNum=W,r.index=L}function v(){let N=r.newAttributes;for(let I=0,F=N.length;I<F;I++)N[I]=0}function m(N){f(N,0)}function f(N,I){let F=r.newAttributes,L=r.enabledAttributes,O=r.attributeDivisors;F[N]=1,L[N]===0&&(i.enableVertexAttribArray(N),L[N]=1),O[N]!==I&&(i.vertexAttribDivisor(N,I),O[N]=I)}function b(){let N=r.newAttributes,I=r.enabledAttributes;for(let F=0,L=I.length;F<L;F++)I[F]!==N[F]&&(i.disableVertexAttribArray(F),I[F]=0)}function T(N,I,F,L,O,V,W){W===!0?i.vertexAttribIPointer(N,I,F,O,V):i.vertexAttribPointer(N,I,F,L,O,V)}function x(N,I,F,L){v();let O=L.attributes,V=F.getAttributes(),W=I.defaultAttributeValues;for(let j in V){let k=V[j];if(k.location>=0){let D=O[j];if(D===void 0&&(j==="instanceMatrix"&&N.instanceMatrix&&(D=N.instanceMatrix),j==="instanceColor"&&N.instanceColor&&(D=N.instanceColor)),D!==void 0){let H=D.normalized,pt=D.itemSize,dt=t.get(D);if(dt===void 0)continue;let at=dt.buffer,ht=dt.type,Dt=dt.bytesPerElement,Y=ht===i.INT||ht===i.UNSIGNED_INT||D.gpuType===Ka;if(D.isInterleavedBufferAttribute){let J=D.data,ct=J.stride,Nt=D.offset;if(J.isInstancedInterleavedBuffer){for(let ut=0;ut<k.locationSize;ut++)f(k.location+ut,J.meshPerAttribute);N.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ut=0;ut<k.locationSize;ut++)m(k.location+ut);i.bindBuffer(i.ARRAY_BUFFER,at);for(let ut=0;ut<k.locationSize;ut++)T(k.location+ut,pt/k.locationSize,ht,H,ct*Dt,(Nt+pt/k.locationSize*ut)*Dt,Y)}else{if(D.isInstancedBufferAttribute){for(let J=0;J<k.locationSize;J++)f(k.location+J,D.meshPerAttribute);N.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let J=0;J<k.locationSize;J++)m(k.location+J);i.bindBuffer(i.ARRAY_BUFFER,at);for(let J=0;J<k.locationSize;J++)T(k.location+J,pt/k.locationSize,ht,H,pt*Dt,pt/k.locationSize*J*Dt,Y)}}else if(W!==void 0){let H=W[j];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(k.location,H);break;case 3:i.vertexAttrib3fv(k.location,H);break;case 4:i.vertexAttrib4fv(k.location,H);break;default:i.vertexAttrib1fv(k.location,H)}}}}b()}function A(){w();for(let N in n){let I=n[N];for(let F in I){let L=I[F];for(let O in L){let V=L[O];for(let W in V)h(V[W].object),delete V[W];delete L[O]}}delete n[N]}}function M(N){if(n[N.id]===void 0)return;let I=n[N.id];for(let F in I){let L=I[F];for(let O in L){let V=L[O];for(let W in V)h(V[W].object),delete V[W];delete L[O]}}delete n[N.id]}function E(N){for(let I in n){let F=n[I];for(let L in F){let O=F[L];if(O[N.id]===void 0)continue;let V=O[N.id];for(let W in V)h(V[W].object),delete V[W];delete O[N.id]}}}function _(N){for(let I in n){let F=n[I],L=N.isInstancedMesh===!0?N.id:0,O=F[L];if(O!==void 0){for(let V in O){let W=O[V];for(let j in W)h(W[j].object),delete W[j];delete O[V]}delete F[L],Object.keys(F).length===0&&delete n[I]}}}function w(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:M,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function Mg(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Sg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==gn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let _=E===hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==en&&E!==mn&&!_&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Xt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:x,maxSamples:A,samples:M}}function bg(i){let t=this,e=null,n=0,s=!1,r=!1,a=new $e,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){let g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let b=r?0:n,T=b*4,x=f.clippingState||null;l.value=x,x=h(g,u,T,p);for(let A=0;A!==T;++A)x[A]=e[A];f.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let f=p+v*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,x=p;T!==v;++T,x+=4)a.copy(d[T]).applyMatrix4(b,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}var ws=4,wg=6,Tg=20,Ag=256,Ar=new mi,_u=new ft,uc=null,dc=0,fc=0,pc=!1,Eg=new C,Ni=new C,ko=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Eg}=r;uc=this._renderer.getRenderTarget(),dc=this._renderer.getActiveCubeFace(),fc=this._renderer.getActiveMipmapLevel(),pc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(uc,dc,fc),this._renderer.xr.enabled=pc,t.scissorTest=!1,bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===_i||t.mapping===Li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),uc=this._renderer.getRenderTarget(),dc=this._renderer.getActiveCubeFace(),fc=this._renderer.getActiveMipmapLevel(),pc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ge,minFilter:Ge,generateMipmaps:!1,type:hn,format:gn,colorSpace:Xs,depthBuffer:!1},s=xu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Cg(r)),this._blurMaterial=Pg(r,t,e),this._ggxMaterial=Rg(r,t,e)}return s}_compileMaterial(t){let e=new ce(new _e,t);this._renderer.compile(e,Ar)}_sceneToCubeUV(t,e,n,s,r){let l=new ze(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(_u),d.toneMapping=wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ce(new Re,new Ce({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,f=!1,b=t.background;b?b.isColor&&(m.color.copy(b),t.background=null,f=!0):(m.color.copy(_u),f=!0);for(let T=0;T<6;T++){let x=T%3;x===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):x===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));let A=this._cubeSize;bs(s,x*A,T>2?A:0,A,A),d.setRenderTarget(s),f&&d.render(v,l),d.render(t,l)}d.toneMapping=p,d.autoClear=u,t.background=b}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===_i||t.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;bs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ar)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,p=d*u,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-ws?n-g+ws:0),f=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-e,bs(r,m,f,3*v,2*v),s.setRenderTarget(r),s.render(o,Ar),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,bs(t,m,f,3*v,2*v),s.setRenderTarget(t),s.render(o,Ar)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-ws?s-this._lodMax+ws:0),u=4*(this._cubeSize-h);bs(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Ar)}};function Cg(i){let t=[],e=[],n=i,s=i-ws+1+wg;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,p=3,g=new Float32Array(p*u*d),v=new Float32Array(p*u*d);for(let f=0;f<d;f++){let b=f%3*2/3-1,T=f>2?0:-1,x=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];g.set(x,p*u*f);for(let A=0;A<u;A++){let M=h[A*2]*2-1,E=h[A*2+1]*2-1;f===0?Ni.set(1,E,M):f===1?Ni.set(-M,1,-E):f===2?Ni.set(-M,E,1):f===3?Ni.set(-1,E,-M):f===4?Ni.set(-M,-1,E):Ni.set(M,E,-1),Ni.toArray(v,(f*u+A)*p)}}let m=new _e;m.setAttribute("position",new je(g,p)),m.setAttribute("outputDirection",new je(v,p)),e.push(new ce(m,null)),n>ws&&n--}return{lodMeshes:e,sizeLods:t}}function xu(i,t,e){let n=new qe(i,t,e);return n.texture.mapping=xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Rg(i,t,e){return new Ue({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ag,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ho(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Pg(i,t,e){return new Ue({name:"SphericalGaussianBlur",defines:{SAMPLES:Tg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ho(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function vu(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function yu(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Ho(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Go=class extends qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new nr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Re(5,5,5),r=new Ue({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:kn});r.uniforms.tEquirect.value=e;let a=new ce(s,r),o=e.minFilter;return e.minFilter===xi&&(e.minFilter=Ge),new Wa(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Ig(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===Za||p===Ja)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new Go(g.height);return v.fromEquirectangularTexture(i,u),t.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let p=u.mapping,g=p===Za||p===Ja,v=p===_i||p===Li;if(g||v){let m=e.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new ko(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let b=u.image;return g&&b&&b.height>0||v&&b&&l(b)?(n===null&&(n=new ko(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===Za?u.mapping=_i:p===Ja&&(u.mapping=Li),u}function l(u){let p=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&p++;return p===g}function c(u){let p=u.target;p.removeEventListener("dispose",c);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Lg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ai("WebGLRenderer: "+n+" extension not supported."),s}}}function Dg(i,t,e,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let p in u)t.update(u[p],i.ARRAY_BUFFER)}function c(d){let u=[],p=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(p!==null){let b=p.array;v=p.version;for(let T=0,x=b.length;T<x;T+=3){let A=b[T+0],M=b[T+1],E=b[T+2];u.push(A,M,M,E,E,A)}}else{let b=g.array;v=g.version;for(let T=0,x=b.length/3-1;T<x;T+=3){let A=T+0,M=T+1,E=T+2;u.push(A,M,M,E,E,A)}}let m=new(g.count>=65535?Ks:$s)(u,1);m.version=v;let f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Ng(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,d*a,p),e.update(u,n,p))}function h(d,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let v=0;for(let m=0;m<p;m++)v+=u[m];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Ug(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Zt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Fg(i,t,e){let n=new WeakMap,s=new ve;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let w=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),v===!0&&(T=3);let x=o.attributes.position.count*T,A=1;x>t.maxTextureSize&&(A=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let M=new Float32Array(x*A*4*d),E=new Js(M,x,A,d);E.type=mn,E.needsUpdate=!0;let _=T*4;for(let R=0;R<d;R++){let N=m[R],I=f[R],F=b[R],L=x*A*4*R;for(let O=0;O<N.count;O++){let V=O*_;p===!0&&(s.fromBufferAttribute(N,O),M[L+V+0]=s.x,M[L+V+1]=s.y,M[L+V+2]=s.z,M[L+V+3]=0),g===!0&&(s.fromBufferAttribute(I,O),M[L+V+4]=s.x,M[L+V+5]=s.y,M[L+V+6]=s.z,M[L+V+7]=0),v===!0&&(s.fromBufferAttribute(F,O),M[L+V+8]=s.x,M[L+V+9]=s.y,M[L+V+10]=s.z,M[L+V+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:E,size:new mt(x,A)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Og(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Bg={[Bl]:"LINEAR_TONE_MAPPING",[zl]:"REINHARD_TONE_MAPPING",[Vl]:"CINEON_TONE_MAPPING",[kl]:"ACES_FILMIC_TONE_MAPPING",[Hl]:"AGX_TONE_MAPPING",[Wl]:"NEUTRAL_TONE_MAPPING",[Gl]:"CUSTOM_TONE_MAPPING"};function zg(i,t,e,n,s,r){let a=new qe(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new _e;c.setAttribute("position",new Qt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Qt([0,2,0,0,2,0],2));let h=new Ia({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ce(c,h),u=new mi(-1,1,1,-1,0,1),p=null,g=null,v=!1,m,f=null,b=[],T=!1;this.setSize=function(x,A){a.setSize(x,A),o!==null&&o.setSize(x,A),l!==null&&l.setSize(x,A);for(let M=0;M<b.length;M++){let E=b[M];E.setSize&&E.setSize(x,A)}},this.setEffects=function(x){b=x,T=b.length>0&&b[0].isRenderPass===!0;let A=a.width,M=a.height;b.length>0&&o===null&&(o=new qe(A,M,{type:hn,depthBuffer:!1,stencilBuffer:!1}),l=new qe(A,M,{type:hn,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<b.length;E++){let _=b[E];_.setSize&&_.setSize(A,M)}},this.begin=function(x,A){if(v||x.toneMapping===wn&&b.length===0)return!1;if(f=A,A!==null){let M=A.width,E=A.height;(a.width!==M||a.height!==E)&&this.setSize(M,E)}return T===!1&&x.setRenderTarget(a),m=x.toneMapping,x.toneMapping=wn,!0},this.hasRenderPass=function(){return T},this.end=function(x,A){x.toneMapping=m,v=!0;let M=a,E=o;for(let _=0;_<b.length;_++){let w=b[_];w.enabled!==!1&&(w.render(x,E,M,A),w.needsSwap!==!1&&(M=E,E=E===o?l:o))}if(p!==x.outputColorSpace||g!==x.toneMapping){p=x.outputColorSpace,g=x.toneMapping,h.defines={},re.getTransfer(p)===pe&&(h.defines.SRGB_TRANSFER="");let _=Bg[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,x.setRenderTarget(f),x.render(d,u),f=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Vu=new Ke,_c=new ui(1,1),ku=new Js,Gu=new Ma,Hu=new nr,Mu=[],Su=[],bu=new Float32Array(16),wu=new Float32Array(9),Tu=new Float32Array(4);function Es(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Mu[s];if(r===void 0&&(r=new Float32Array(s),Mu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Wo(i,t){let e=Su[t];e===void 0&&(e=new Int32Array(t),Su[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function Gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function Hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function Wg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Tu.set(n),i.uniformMatrix2fv(this.addr,!1,Tu),Oe(e,n)}}function Xg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;wu.set(n),i.uniformMatrix3fv(this.addr,!1,wu),Oe(e,n)}}function qg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;bu.set(n),i.uniformMatrix4fv(this.addr,!1,bu),Oe(e,n)}}function Yg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function $g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function Kg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function Qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function t0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function e0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_c.compareFunction=e.isReversedDepthBuffer()?Oo:Fo,r=_c):r=Vu,e.setTexture2D(t||r,s)}function n0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Gu,s)}function i0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Hu,s)}function s0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ku,s)}function r0(i){switch(i){case 5126:return Vg;case 35664:return kg;case 35665:return Gg;case 35666:return Hg;case 35674:return Wg;case 35675:return Xg;case 35676:return qg;case 5124:case 35670:return Yg;case 35667:case 35671:return Zg;case 35668:case 35672:return Jg;case 35669:case 35673:return $g;case 5125:return Kg;case 36294:return jg;case 36295:return Qg;case 36296:return t0;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return s0}}function a0(i,t){i.uniform1fv(this.addr,t)}function o0(i,t){let e=Es(t,this.size,2);i.uniform2fv(this.addr,e)}function l0(i,t){let e=Es(t,this.size,3);i.uniform3fv(this.addr,e)}function c0(i,t){let e=Es(t,this.size,4);i.uniform4fv(this.addr,e)}function h0(i,t){let e=Es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function u0(i,t){let e=Es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function d0(i,t){let e=Es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function f0(i,t){i.uniform1iv(this.addr,t)}function p0(i,t){i.uniform2iv(this.addr,t)}function m0(i,t){i.uniform3iv(this.addr,t)}function g0(i,t){i.uniform4iv(this.addr,t)}function _0(i,t){i.uniform1uiv(this.addr,t)}function x0(i,t){i.uniform2uiv(this.addr,t)}function v0(i,t){i.uniform3uiv(this.addr,t)}function y0(i,t){i.uniform4uiv(this.addr,t)}function M0(i,t,e){let n=this.cache,s=t.length,r=Wo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=_c:a=Vu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function S0(i,t,e){let n=this.cache,s=t.length,r=Wo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Gu,r[a])}function b0(i,t,e){let n=this.cache,s=t.length,r=Wo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Hu,r[a])}function w0(i,t,e){let n=this.cache,s=t.length,r=Wo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ku,r[a])}function T0(i){switch(i){case 5126:return a0;case 35664:return o0;case 35665:return l0;case 35666:return c0;case 35674:return h0;case 35675:return u0;case 35676:return d0;case 5124:case 35670:return f0;case 35667:case 35671:return p0;case 35668:case 35672:return m0;case 35669:case 35673:return g0;case 5125:return _0;case 36294:return x0;case 36295:return v0;case 36296:return y0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return S0;case 35680:case 36300:case 36308:case 36293:return b0;case 36289:case 36303:case 36311:case 36292:return w0}}var xc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=r0(e.type)}},vc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=T0(e.type)}},yc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},mc=/(\w+)(\])?(\[|\.)?/g;function Au(i,t){i.seq.push(t),i.map[t.id]=t}function A0(i,t,e){let n=i.name,s=n.length;for(mc.lastIndex=0;;){let r=mc.exec(n),a=mc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Au(e,c===void 0?new xc(o,i,t):new vc(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new yc(o),Au(e,d)),e=d}}}var Ts=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);A0(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Eu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var E0=37297,C0=0;function R0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Cu=new $t;function P0(i){re._getMatrix(Cu,re.workingColorSpace,i);let t=`mat3( ${Cu.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case qs:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ru(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+R0(i.getShaderSource(t),o)}else return r}function I0(i,t){let e=P0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var L0={[Bl]:"Linear",[zl]:"Reinhard",[Vl]:"Cineon",[kl]:"ACESFilmic",[Hl]:"AgX",[Wl]:"Neutral",[Gl]:"Custom"};function D0(i,t){let e=L0[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Vo=new C;function N0(){re.getLuminanceCoefficients(Vo);let i=Vo.x.toFixed(4),t=Vo.y.toFixed(4),e=Vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function U0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function F0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function O0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Cr(i){return i!==""}function Pu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Iu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var B0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mc(i){return i.replace(B0,V0)}var z0=new Map;function V0(i,t){let e=te[t];if(e===void 0){let n=z0.get(t);if(n!==void 0)e=te[n],Xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Mc(e)}var k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lu(i){return i.replace(k0,G0)}function G0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Du(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var H0={[Pi]:"SHADOWMAP_TYPE_PCF",[xs]:"SHADOWMAP_TYPE_VSM"};function W0(i){return H0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var X0={[_i]:"ENVMAP_TYPE_CUBE",[Li]:"ENVMAP_TYPE_CUBE",[xr]:"ENVMAP_TYPE_CUBE_UV"};function q0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":X0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Y0={[Li]:"ENVMAP_MODE_REFRACTION"};function Z0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Y0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var J0={[Ya]:"ENVMAP_BLENDING_MULTIPLY",[Yh]:"ENVMAP_BLENDING_MIX",[Zh]:"ENVMAP_BLENDING_ADD"};function $0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":J0[i.combine]||"ENVMAP_BLENDING_NONE"}function K0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function j0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=W0(e),c=q0(e),h=Z0(e),d=$0(e),u=K0(e),p=U0(e),g=F0(r),v=s.createProgram(),m,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Cr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Cr).join(`
`),f.length>0&&(f+=`
`)):(m=[Du(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),f=[Du(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==wn?"#define TONE_MAPPING":"",e.toneMapping!==wn?te.tonemapping_pars_fragment:"",e.toneMapping!==wn?D0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,I0("linearToOutputTexel",e.outputColorSpace),N0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cr).join(`
`)),a=Mc(a),a=Pu(a,e),a=Iu(a,e),o=Mc(o),o=Pu(o,e),o=Iu(o,e),a=Lu(a),o=Lu(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=b+m+a,x=b+f+o,A=Eu(s,s.VERTEX_SHADER,T),M=Eu(s,s.FRAGMENT_SHADER,x);s.attachShader(v,A),s.attachShader(v,M),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(N){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(v)||"",F=s.getShaderInfoLog(A)||"",L=s.getShaderInfoLog(M)||"",O=I.trim(),V=F.trim(),W=L.trim(),j=!0,k=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,M);else{let D=Ru(s,A,"vertex"),H=Ru(s,M,"fragment");Zt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+O+`
`+D+`
`+H)}else O!==""?Xt("WebGLProgram: Program Info Log:",O):(V===""||W==="")&&(k=!1);k&&(N.diagnostics={runnable:j,programLog:O,vertexShader:{log:V,prefix:m},fragmentShader:{log:W,prefix:f}})}s.deleteShader(A),s.deleteShader(M),_=new Ts(s,v),w=O0(s,v)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,E0)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=C0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=M,this}var Q0=0,Sc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new bc(t),e.set(t,n)),n}},bc=class{constructor(t){this.id=Q0++,this.code=t,this.usedTimes=0}};function t_(i){return i===yi||i===wr||i===Tr}function e_(i,t,e,n,s,r){let a=new ls,o=new Sc,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,w,R,N,I,F){let L=N.fog,O=I.geometry,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?N.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,j=t.get(_.envMap||V,W),k=j&&j.mapping===xr?j.image.height:null,D=p[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Xt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let H=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,pt=H!==void 0?H.length:0,dt=0;O.morphAttributes.position!==void 0&&(dt=1),O.morphAttributes.normal!==void 0&&(dt=2),O.morphAttributes.color!==void 0&&(dt=3);let at,ht,Dt,Y;if(D){let ye=Hn[D];at=ye.vertexShader,ht=ye.fragmentShader}else{at=_.vertexShader,ht=_.fragmentShader;let ye=o.getVertexShaderStage(_),de=o.getFragmentShaderStage(_);o.update(_,ye,de),Dt=ye.id,Y=de.id}let J=i.getRenderTarget(),ct=i.state.buffers.depth.getReversed(),Nt=I.isInstancedMesh===!0,ut=I.isBatchedMesh===!0,gt=!!_.map,Ht=!!_.matcap,et=!!j,$=!!_.aoMap,st=!!_.lightMap,ot=!!_.bumpMap&&_.wireframe===!1,_t=!!_.normalMap,zt=!!_.displacementMap,Pt=!!_.emissiveMap,Wt=!!_.metalnessMap,qt=!!_.roughnessMap,U=_.anisotropy>0,ue=_.clearcoat>0,ne=_.dispersion>0,P=_.retroreflectivity>0,y=_.iridescence>0,G=_.sheen>0,Z=_.transmission>0,tt=U&&!!_.anisotropyMap,xt=ue&&!!_.clearcoatMap,vt=ue&&!!_.clearcoatNormalMap,nt=ue&&!!_.clearcoatRoughnessMap,rt=y&&!!_.iridescenceMap,yt=y&&!!_.iridescenceThicknessMap,Vt=G&&!!_.sheenColorMap,wt=G&&!!_.sheenRoughnessMap,Mt=!!_.specularMap,kt=!!_.specularColorMap,Yt=!!_.specularIntensityMap,Kt=Z&&!!_.transmissionMap,z=Z&&!!_.thicknessMap,St=!!_.gradientMap,it=!!_.alphaMap,bt=_.alphaTest>0,Rt=!!_.alphaHash,lt=!!_.extensions,Gt=wn;_.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Gt=i.toneMapping);let Ot={shaderID:D,shaderType:_.type,shaderName:_.name,vertexShader:at,fragmentShader:ht,defines:_.defines,customVertexShaderID:Dt,customFragmentShaderID:Y,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:ut,batchingColor:ut&&I._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&I.instanceColor!==null,instancingMorph:Nt&&I.morphTexture!==null,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:re.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:gt,matcap:Ht,envMap:et,envMapMode:et&&j.mapping,envMapCubeUVHeight:k,aoMap:$,lightMap:st,bumpMap:ot,normalMap:_t,displacementMap:zt,emissiveMap:Pt,normalMapObjectSpace:_t&&_.normalMapType===Kh,normalMapTangentSpace:_t&&_.normalMapType===Uo,packedNormalMap:_t&&_.normalMapType===Uo&&t_(_.normalMap.format),metalnessMap:Wt,roughnessMap:qt,anisotropy:U,anisotropyMap:tt,clearcoat:ue,clearcoatMap:xt,clearcoatNormalMap:vt,clearcoatRoughnessMap:nt,dispersion:ne,retroreflection:P,iridescence:y,iridescenceMap:rt,iridescenceThicknessMap:yt,sheen:G,sheenColorMap:Vt,sheenRoughnessMap:wt,specularMap:Mt,specularColorMap:kt,specularIntensityMap:Yt,transmission:Z,transmissionMap:Kt,thicknessMap:z,gradientMap:St,opaque:_.transparent===!1&&_.blending===vs&&_.alphaToCoverage===!1,alphaMap:it,alphaTest:bt,alphaHash:Rt,combine:_.combine,mapUv:gt&&g(_.map.channel),aoMapUv:$&&g(_.aoMap.channel),lightMapUv:st&&g(_.lightMap.channel),bumpMapUv:ot&&g(_.bumpMap.channel),normalMapUv:_t&&g(_.normalMap.channel),displacementMapUv:zt&&g(_.displacementMap.channel),emissiveMapUv:Pt&&g(_.emissiveMap.channel),metalnessMapUv:Wt&&g(_.metalnessMap.channel),roughnessMapUv:qt&&g(_.roughnessMap.channel),anisotropyMapUv:tt&&g(_.anisotropyMap.channel),clearcoatMapUv:xt&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:vt&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:wt&&g(_.sheenRoughnessMap.channel),specularMapUv:Mt&&g(_.specularMap.channel),specularColorMapUv:kt&&g(_.specularColorMap.channel),specularIntensityMapUv:Yt&&g(_.specularIntensityMap.channel),transmissionMapUv:Kt&&g(_.transmissionMap.channel),thicknessMapUv:z&&g(_.thicknessMap.channel),alphaMapUv:it&&g(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(_t||U),vertexNormals:!!O.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!O.attributes.uv&&(gt||it),fog:!!L,useFog:_.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||O.attributes.normal===void 0&&_t===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ct,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:dt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Gt,decodeVideoTexture:gt&&_.map.isVideoTexture===!0&&re.getTransfer(_.map.colorSpace)===pe,decodeVideoTextureEmissive:Pt&&_.emissiveMap.isVideoTexture===!0&&re.getTransfer(_.emissiveMap.colorSpace)===pe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ae,flipSided:_.side===ke,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:lt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&_.extensions.multiDraw===!0||ut)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ot.vertexUv1s=l.has(1),Ot.vertexUv2s=l.has(2),Ot.vertexUv3s=l.has(3),l.clear(),Ot}function m(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)w.push(R),w.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(f(w,_),b(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function f(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function b(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function T(_){let w=p[_.type],R;if(w){let N=Hn[w];R=Bo.clone(N.uniforms)}else R=_.uniforms;return R}function x(_,w){let R=h.get(w);return R!==void 0?++R.usedTimes:(R=new j0(i,w,_,s),c.push(R),h.set(w,R)),R}function A(_){if(--_.usedTimes===0){let w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function M(_){o.remove(_)}function E(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:T,acquireProgram:x,releaseProgram:A,releaseShaderCache:M,programs:c,dispose:E}}function n_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function i_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Nu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Uu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,v,m,f){let b=i[t];return b===void 0?(b={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:f},i[t]=b):(b.id=u.id,b.object=u,b.geometry=p,b.material=g,b.materialVariant=a(u),b.groupOrder=v,b.renderOrder=u.renderOrder,b.z=m,b.group=f),t++,b}function l(u,p,g,v,m,f,b){b.reversedDepth===!0&&(m=-m);let T=o(u,p,g,v,m,f);g.transmission>0?n.push(T):g.transparent===!0?s.push(T):e.push(T)}function c(u,p,g,v,m,f){let b=o(u,p,g,v,m,f);g.transmission>0?n.unshift(b):g.transparent===!0?s.unshift(b):e.unshift(b)}function h(u,p){e.length>1&&e.sort(u||i_),n.length>1&&n.sort(p||Nu),s.length>1&&s.sort(p||Nu)}function d(){for(let u=t,p=i.length;u<p;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function s_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Uu,i.set(n,[a])):s>=r.length?(a=new Uu,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function r_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new C,color:new ft};break;case"SpotLight":e={position:new C,direction:new C,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":e={color:new ft,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function a_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var o_=0;function l_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function c_(i){let t=new r_,e=a_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let s=new C,r=new le,a=new le;function o(c){let h=0,d=0,u=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,b=0,T=0,x=0,A=0,M=0,E=0,_=0,w=0,R=0;c.sort(l_);for(let I=0,F=c.length;I<F;I++){let L=c[I],O=L.color,V=L.intensity,W=L.distance,j=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===yi?j=L.shadow.map.texture:j=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*V,d+=O.g*V,u+=O.b*V;else if(L.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(L.sh.coefficients[k],V);R++}else if(L.isSunLight){let k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let D=L.shadow,H=e.get(L);H.shadowIntensity=D.intensity,H.shadowBias=D.bias,H.shadowNormalBias=D.normalBias,H.shadowRadius=D.radius,H.shadowMapSize.copy(D.mapSize).multiply(D.getFrameExtents()),n.sunShadow[g]=H,n.sunShadowMap[g]=j;let pt=D.getViewportCount();for(let dt=0;dt<pt;dt++)n.sunShadowMatrix[v+dt]=D.getMatrix(dt),n.sunShadowCascade[v+dt]=D._cascadeData[dt];v+=pt,g++}n.sun[p]=k,p++}else if(L.isDirectionalLight){let k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let D=L.shadow,H=e.get(L);H.shadowIntensity=D.intensity,H.shadowBias=D.bias,H.shadowNormalBias=D.normalBias,H.shadowRadius=D.radius,H.shadowMapSize=D.mapSize,n.directionalShadow[m]=H,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=L.shadow.matrix,A++}n.directional[m]=k,m++}else if(L.isSpotLight){let k=t.get(L);k.position.setFromMatrixPosition(L.matrixWorld),k.color.copy(O).multiplyScalar(V),k.distance=W,k.coneCos=Math.cos(L.angle),k.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),k.decay=L.decay,n.spot[b]=k;let D=L.shadow;if(L.map&&(n.spotLightMap[_]=L.map,_++,D.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[b]=D.matrix,L.castShadow){let H=e.get(L);H.shadowIntensity=D.intensity,H.shadowBias=D.bias,H.shadowNormalBias=D.normalBias,H.shadowRadius=D.radius,H.shadowMapSize=D.mapSize,n.spotShadow[b]=H,n.spotShadowMap[b]=j,E++}b++}else if(L.isRectAreaLight){let k=t.get(L);k.color.copy(O).multiplyScalar(V),k.halfWidth.set(L.width*.5,0,0),k.halfHeight.set(0,L.height*.5,0),n.rectArea[T]=k,T++}else if(L.isPointLight){let k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),k.distance=L.distance,k.decay=L.decay,L.castShadow){let D=L.shadow,H=e.get(L);H.shadowIntensity=D.intensity,H.shadowBias=D.bias,H.shadowNormalBias=D.normalBias,H.shadowRadius=D.radius,H.shadowMapSize=D.mapSize,H.shadowCameraNear=D.camera.near,H.shadowCameraFar=D.camera.far,n.pointShadow[f]=H,n.pointShadowMap[f]=j,n.pointShadowMatrix[f]=L.shadow.matrix,M++}n.point[f]=k,f++}else if(L.isHemisphereLight){let k=t.get(L);k.skyColor.copy(L.color).multiplyScalar(V),k.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[x]=k,x++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Tt.LTC_FLOAT_1,n.rectAreaLTC2=Tt.LTC_FLOAT_2):(n.rectAreaLTC1=Tt.LTC_HALF_1,n.rectAreaLTC2=Tt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let N=n.hash;(N.sunLength!==p||N.directionalLength!==m||N.pointLength!==f||N.spotLength!==b||N.rectAreaLength!==T||N.hemiLength!==x||N.numSunShadows!==g||N.numDirectionalShadows!==A||N.numPointShadows!==M||N.numSpotShadows!==E||N.numSpotMaps!==_||N.numLightProbes!==R)&&(n.sun.length=p,n.directional.length=m,n.spot.length=b,n.rectArea.length=T,n.point.length=f,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+_-w,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,N.sunLength=p,N.directionalLength=m,N.pointLength=f,N.spotLength=b,N.rectAreaLength=T,N.hemiLength=x,N.numSunShadows=g,N.numDirectionalShadows=A,N.numPointShadows=M,N.numSpotShadows=E,N.numSpotMaps=_,N.numLightProbes=R,n.version=o_++)}function l(c,h){let d=0,u=0,p=0,g=0,v=0,m=0,f=h.matrixWorldInverse;for(let b=0,T=c.length;b<T;b++){let x=c[b];if(x.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(f),d++}else if(x.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(f),u++}else if(x.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(f),A.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(f),g++}else if(x.isRectAreaLight){let A=n.rectArea[v];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(f),a.identity(),r.copy(x.matrixWorld),r.premultiply(f),a.extractRotation(r),A.halfWidth.set(x.width*.5,0,0),A.halfHeight.set(0,x.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){let A=n.point[p];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(f),p++}else if(x.isHemisphereLight){let A=n.hemi[m];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:n}}function Fu(i){let t=new c_(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function h_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Fu(i),t.set(s,[o])):r>=a.length?(o=new Fu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var u_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,d_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,f_=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],p_=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Ou=new le,Er=new C,gc=new C;function m_(i,t,e){let n=new us,s=new mt,r=new mt,a=new ve,o=new La,l=new Da,c={},h=e.maxTextureSize,d={[gi]:ke,[ke]:gi,[Ae]:Ae},u=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:u_,fragmentShader:d_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new _e;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ce(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pi;let f=this.type;this.render=function(M,E,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===Ch&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Pi);let w=i.getRenderTarget(),R=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),I=i.state;I.setBlending(kn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let F=f!==this.type;F&&E.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=M.length;L<O;L++){let V=M[L],W=V.shadow;if(W===void 0){Xt("WebGLShadowMap:",V,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let j=W.getFrameExtents();s.multiply(j),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,W.mapSize.y=r.y));let k=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=k,W.map===null||F===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===xs){if(V.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new qe(s.x,s.y,{format:yi,type:hn,minFilter:Ge,magFilter:Ge,generateMipmaps:!1}),W.map.texture.name=V.name+".shadowMap",W.map.depthTexture=new ui(s.x,s.y,mn),W.map.depthTexture.name=V.name+".shadowMapDepth",W.map.depthTexture.format=Ln,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve}else V.isPointLight?(W.map=new Go(s.x),W.map.depthTexture=new Ta(s.x,Tn)):(W.map=new qe(s.x,s.y),W.map.depthTexture=new ui(s.x,s.y,Tn)),W.map.depthTexture.name=V.name+".shadowMap",W.map.depthTexture.format=Ln,this.type===Pi?(W.map.depthTexture.compareFunction=k?Oo:Fo,W.map.depthTexture.minFilter=Ge,W.map.depthTexture.magFilter=Ge):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let D=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();V.isPointLight!==!0&&W.updateMatrices(V,_);for(let H=0;H<D;H++){let pt=W.getCamera(H);if(V.isPointLight){let dt=W.camera,at=W.matrix,ht=V.distance||dt.far;ht!==dt.far&&(dt.far=ht,dt.updateProjectionMatrix()),Er.setFromMatrixPosition(V.matrixWorld),dt.position.copy(Er),gc.copy(dt.position),gc.add(f_[H]),dt.up.copy(p_[H]),dt.lookAt(gc),dt.updateMatrixWorld(),at.makeTranslation(-Er.x,-Er.y,-Er.z),Ou.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Ou,dt.coordinateSystem,dt.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,H),i.clear();else{H===0&&(i.setRenderTarget(W.map),i.clear());let dt=W.getViewport(H);a.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),I.viewport(a)}n=W.getFrustum(H),x(E,_,pt,V,this.type)}W.isPointLightShadow!==!0&&this.type===xs&&b(W,_),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(w,R,N)};function b(M,E){let _=t.update(v);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null?M.mapPass=new qe(s.x,s.y,{format:yi,type:hn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(E,null,_,u,v,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value.set(M.map.width,M.map.height),p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(E,null,_,p,v,null)}function T(M,E,_,w){let R=null,N=_.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(N!==void 0)R=N;else if(R=_.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let I=R.uuid,F=E.uuid,L=c[I];L===void 0&&(L={},c[I]=L);let O=L[F];O===void 0&&(O=R.clone(),L[F]=O,E.addEventListener("dispose",A)),R=O}if(R.visible=E.visible,R.wireframe=E.wireframe,w===xs?R.side=E.shadowSide!==null?E.shadowSide:E.side:R.side=E.shadowSide!==null?E.shadowSide:d[E.side],R.alphaMap=E.alphaMap,R.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,R.map=E.map,R.clipShadows=E.clipShadows,R.clippingPlanes=E.clippingPlanes,R.clipIntersection=E.clipIntersection,R.displacementMap=E.displacementMap,R.displacementScale=E.displacementScale,R.displacementBias=E.displacementBias,R.wireframeLinewidth=E.wireframeLinewidth,R.linewidth=E.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let I=i.properties.get(R);I.light=_}return R}function x(M,E,_,w,R){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&R===xs)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,M.matrixWorld);let F=t.update(M),L=M.material;if(Array.isArray(L)){let O=F.groups;for(let V=0,W=O.length;V<W;V++){let j=O[V],k=L[j.materialIndex];if(k&&k.visible){let D=T(M,k,w,R);M.onBeforeShadow(i,M,E,_,F,D,j),i.renderBufferDirect(_,null,F,D,M,j),M.onAfterShadow(i,M,E,_,F,D,j)}}}else if(L.visible){let O=T(M,L,w,R);M.onBeforeShadow(i,M,E,_,F,O,null),i.renderBufferDirect(_,null,F,O,M,null),M.onAfterShadow(i,M,E,_,F,O,null)}}let I=M.children;for(let F=0,L=I.length;F<L;F++)x(I[F],E,_,w,R)}function A(M){M.target.removeEventListener("dispose",A);for(let _ in c){let w=c[_],R=M.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function g_(i,t){function e(){let z=!1,St=new ve,it=null,bt=new ve(0,0,0,0);return{setMask:function(Rt){it!==Rt&&!z&&(i.colorMask(Rt,Rt,Rt,Rt),it=Rt)},setLocked:function(Rt){z=Rt},setClear:function(Rt,lt,Gt,Ot,ye){ye===!0&&(Rt*=Ot,lt*=Ot,Gt*=Ot),St.set(Rt,lt,Gt,Ot),bt.equals(St)===!1&&(i.clearColor(Rt,lt,Gt,Ot),bt.copy(St))},reset:function(){z=!1,it=null,bt.set(-1,0,0,0)}}}function n(){let z=!1,St=!1,it=null,bt=null,Rt=null;return{setReversed:function(lt){if(St!==lt){let Gt=t.get("EXT_clip_control");lt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT),St=lt;let Ot=Rt;Rt=null,this.setClear(Ot)}},getReversed:function(){return St},setTest:function(lt){lt?J(i.DEPTH_TEST):ct(i.DEPTH_TEST)},setMask:function(lt){it!==lt&&!z&&(i.depthMask(lt),it=lt)},setFunc:function(lt){if(St&&(lt=lu[lt]),bt!==lt){switch(lt){case ca:i.depthFunc(i.NEVER);break;case ha:i.depthFunc(i.ALWAYS);break;case ua:i.depthFunc(i.LESS);break;case is:i.depthFunc(i.LEQUAL);break;case da:i.depthFunc(i.EQUAL);break;case fa:i.depthFunc(i.GEQUAL);break;case pa:i.depthFunc(i.GREATER);break;case ma:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=lt}},setLocked:function(lt){z=lt},setClear:function(lt){Rt!==lt&&(Rt=lt,St&&(lt=1-lt),i.clearDepth(lt))},reset:function(){z=!1,it=null,bt=null,Rt=null,St=!1}}}function s(){let z=!1,St=null,it=null,bt=null,Rt=null,lt=null,Gt=null,Ot=null,ye=null;return{setTest:function(de){z||(de?J(i.STENCIL_TEST):ct(i.STENCIL_TEST))},setMask:function(de){St!==de&&!z&&(i.stencilMask(de),St=de)},setFunc:function(de,_n,An){(it!==de||bt!==_n||Rt!==An)&&(i.stencilFunc(de,_n,An),it=de,bt=_n,Rt=An)},setOp:function(de,_n,An){(lt!==de||Gt!==_n||Ot!==An)&&(i.stencilOp(de,_n,An),lt=de,Gt=_n,Ot=An)},setLocked:function(de){z=de},setClear:function(de){ye!==de&&(i.clearStencil(de),ye=de)},reset:function(){z=!1,St=null,it=null,bt=null,Rt=null,lt=null,Gt=null,Ot=null,ye=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},p=new WeakMap,g=[],v=null,m=!1,f=null,b=null,T=null,x=null,A=null,M=null,E=null,_=new ft(0,0,0),w=0,R=!1,N=null,I=null,F=null,L=null,O=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,j=0,k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(k)[1]),W=j>=1):k.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),W=j>=2);let D=null,H={},pt=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),at=new ve().fromArray(pt),ht=new ve().fromArray(dt);function Dt(z,St,it,bt){let Rt=new Uint8Array(4),lt=i.createTexture();i.bindTexture(z,lt),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<it;Gt++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,Rt):i.texImage2D(St+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Rt);return lt}let Y={};Y[i.TEXTURE_2D]=Dt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(is),ot(!1),_t(Dl),J(i.CULL_FACE),$(kn);function J(z){h[z]!==!0&&(i.enable(z),h[z]=!0)}function ct(z){h[z]!==!1&&(i.disable(z),h[z]=!1)}function Nt(z,St){return u[z]!==St?(i.bindFramebuffer(z,St),u[z]=St,z===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=St),z===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=St),!0):!1}function ut(z,St){let it=g,bt=!1;if(z){it=p.get(St),it===void 0&&(it=[],p.set(St,it));let Rt=z.textures;if(it.length!==Rt.length||it[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,Gt=Rt.length;lt<Gt;lt++)it[lt]=i.COLOR_ATTACHMENT0+lt;it.length=Rt.length,bt=!0}}else it[0]!==i.BACK&&(it[0]=i.BACK,bt=!0);bt&&i.drawBuffers(it)}function gt(z){return v!==z?(i.useProgram(z),v=z,!0):!1}let Ht={[Ii]:i.FUNC_ADD,[Ph]:i.FUNC_SUBTRACT,[Ih]:i.FUNC_REVERSE_SUBTRACT};Ht[Lh]=i.MIN,Ht[Dh]=i.MAX;let et={[Nh]:i.ZERO,[Uh]:i.ONE,[Fh]:i.SRC_COLOR,[Fl]:i.SRC_ALPHA,[Gh]:i.SRC_ALPHA_SATURATE,[Vh]:i.DST_COLOR,[Bh]:i.DST_ALPHA,[Oh]:i.ONE_MINUS_SRC_COLOR,[Ol]:i.ONE_MINUS_SRC_ALPHA,[kh]:i.ONE_MINUS_DST_COLOR,[zh]:i.ONE_MINUS_DST_ALPHA,[Hh]:i.CONSTANT_COLOR,[Wh]:i.ONE_MINUS_CONSTANT_COLOR,[Xh]:i.CONSTANT_ALPHA,[qh]:i.ONE_MINUS_CONSTANT_ALPHA};function $(z,St,it,bt,Rt,lt,Gt,Ot,ye,de){if(z===kn){m===!0&&(ct(i.BLEND),m=!1);return}if(m===!1&&(J(i.BLEND),m=!0),z!==Rh){if(z!==f||de!==R){if((b!==Ii||A!==Ii)&&(i.blendEquation(i.FUNC_ADD),b=Ii,A=Ii),de)switch(z){case vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _r:i.blendFunc(i.ONE,i.ONE);break;case Nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ul:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Zt("WebGLState: Invalid blending: ",z);break}else switch(z){case vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _r:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Nl:Zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ul:Zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Zt("WebGLState: Invalid blending: ",z);break}T=null,x=null,M=null,E=null,_.set(0,0,0),w=0,f=z,R=de}return}Rt=Rt||St,lt=lt||it,Gt=Gt||bt,(St!==b||Rt!==A)&&(i.blendEquationSeparate(Ht[St],Ht[Rt]),b=St,A=Rt),(it!==T||bt!==x||lt!==M||Gt!==E)&&(i.blendFuncSeparate(et[it],et[bt],et[lt],et[Gt]),T=it,x=bt,M=lt,E=Gt),(Ot.equals(_)===!1||ye!==w)&&(i.blendColor(Ot.r,Ot.g,Ot.b,ye),_.copy(Ot),w=ye),f=z,R=!1}function st(z,St){z.side===Ae?ct(i.CULL_FACE):J(i.CULL_FACE);let it=z.side===ke;St&&(it=!it),ot(it),z.blending===vs&&z.transparent===!1?$(kn):$(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);let bt=z.stencilWrite;o.setTest(bt),bt&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Pt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function ot(z){N!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),N=z)}function _t(z){z!==Ah?(J(i.CULL_FACE),z!==I&&(z===Dl?i.cullFace(i.BACK):z===Eh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ct(i.CULL_FACE),I=z}function zt(z){z!==F&&(W&&i.lineWidth(z),F=z)}function Pt(z,St,it){z?(J(i.POLYGON_OFFSET_FILL),(L!==St||O!==it)&&(L=St,O=it,a.getReversed()&&(St=-St),i.polygonOffset(St,it))):ct(i.POLYGON_OFFSET_FILL)}function Wt(z){z?J(i.SCISSOR_TEST):ct(i.SCISSOR_TEST)}function qt(z){z===void 0&&(z=i.TEXTURE0+V-1),D!==z&&(i.activeTexture(z),D=z)}function U(z,St,it){it===void 0&&(D===null?it=i.TEXTURE0+V-1:it=D);let bt=H[it];bt===void 0&&(bt={type:void 0,texture:void 0},H[it]=bt),(bt.type!==z||bt.texture!==St)&&(D!==it&&(i.activeTexture(it),D=it),i.bindTexture(z,St||Y[z]),bt.type=z,bt.texture=St)}function ue(){let z=H[D];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function ne(){try{i.compressedTexImage2D(...arguments)}catch(z){Zt("WebGLState:",z)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(z){Zt("WebGLState:",z)}}function y(){try{i.texSubImage2D(...arguments)}catch(z){Zt("WebGLState:",z)}}function G(){try{i.texSubImage3D(...arguments)}catch(z){Zt("WebGLState:",z)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(z){Zt("WebGLState:",z)}}function tt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){Zt("WebGLState:",z)}}function xt(){try{i.texStorage2D(...arguments)}catch(z){Zt("WebGLState:",z)}}function vt(){try{i.texStorage3D(...arguments)}catch(z){Zt("WebGLState:",z)}}function nt(){try{i.texImage2D(...arguments)}catch(z){Zt("WebGLState:",z)}}function rt(){try{i.texImage3D(...arguments)}catch(z){Zt("WebGLState:",z)}}function yt(z){return d[z]!==void 0?d[z]:i.getParameter(z)}function Vt(z,St){d[z]!==St&&(i.pixelStorei(z,St),d[z]=St)}function wt(z){at.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),at.copy(z))}function Mt(z){ht.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),ht.copy(z))}function kt(z,St){let it=c.get(St);it===void 0&&(it=new WeakMap,c.set(St,it));let bt=it.get(z);bt===void 0&&(bt=i.getUniformBlockIndex(St,z.name),it.set(z,bt))}function Yt(z,St){let bt=c.get(St).get(z);l.get(St)!==bt&&(i.uniformBlockBinding(St,bt,z.__bindingPointIndex),l.set(St,bt))}function Kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},D=null,H={},u={},p=new WeakMap,g=[],v=null,m=!1,f=null,b=null,T=null,x=null,A=null,M=null,E=null,_=new ft(0,0,0),w=0,R=!1,N=null,I=null,F=null,L=null,O=null,at.set(0,0,i.canvas.width,i.canvas.height),ht.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:ct,bindFramebuffer:Nt,drawBuffers:ut,useProgram:gt,setBlending:$,setMaterial:st,setFlipSided:ot,setCullFace:_t,setLineWidth:zt,setPolygonOffset:Pt,setScissorTest:Wt,activeTexture:qt,bindTexture:U,unbindTexture:ue,compressedTexImage2D:ne,compressedTexImage3D:P,texImage2D:nt,texImage3D:rt,pixelStorei:Vt,getParameter:yt,updateUBOMapping:kt,uniformBlockBinding:Yt,texStorage2D:xt,texStorage3D:vt,texSubImage2D:y,texSubImage3D:G,compressedTexSubImage2D:Z,compressedTexSubImage3D:tt,scissor:wt,viewport:Mt,reset:Kt}}function __(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,h=new WeakMap,d=new Set,u,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(P,y){return g?new OffscreenCanvas(P,y):Ys("canvas")}function m(P,y,G){let Z=1,tt=ne(P);if((tt.width>G||tt.height>G)&&(Z=G/Math.max(tt.width,tt.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let xt=Math.floor(Z*tt.width),vt=Math.floor(Z*tt.height);u===void 0&&(u=v(xt,vt));let nt=y?v(xt,vt):u;return nt.width=xt,nt.height=vt,nt.getContext("2d").drawImage(P,0,0,xt,vt),Xt("WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+xt+"x"+vt+")."),nt}else return"data"in P&&Xt("WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),P;return P}function f(P){return P.generateMipmaps}function b(P){i.generateMipmap(P)}function T(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(P,y,G,Z,tt,xt=!1){if(P!==null){if(i[P]!==void 0)return i[P];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let vt;Z&&(vt=t.get("EXT_texture_norm16"),vt||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let nt=y;if(y===i.RED&&(G===i.FLOAT&&(nt=i.R32F),G===i.HALF_FLOAT&&(nt=i.R16F),G===i.UNSIGNED_BYTE&&(nt=i.R8),G===i.UNSIGNED_SHORT&&vt&&(nt=vt.R16_EXT),G===i.SHORT&&vt&&(nt=vt.R16_SNORM_EXT)),y===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(nt=i.R8UI),G===i.UNSIGNED_SHORT&&(nt=i.R16UI),G===i.UNSIGNED_INT&&(nt=i.R32UI),G===i.BYTE&&(nt=i.R8I),G===i.SHORT&&(nt=i.R16I),G===i.INT&&(nt=i.R32I)),y===i.RG&&(G===i.FLOAT&&(nt=i.RG32F),G===i.HALF_FLOAT&&(nt=i.RG16F),G===i.UNSIGNED_BYTE&&(nt=i.RG8),G===i.UNSIGNED_SHORT&&vt&&(nt=vt.RG16_EXT),G===i.SHORT&&vt&&(nt=vt.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(nt=i.RG8UI),G===i.UNSIGNED_SHORT&&(nt=i.RG16UI),G===i.UNSIGNED_INT&&(nt=i.RG32UI),G===i.BYTE&&(nt=i.RG8I),G===i.SHORT&&(nt=i.RG16I),G===i.INT&&(nt=i.RG32I)),y===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(nt=i.RGB8UI),G===i.UNSIGNED_SHORT&&(nt=i.RGB16UI),G===i.UNSIGNED_INT&&(nt=i.RGB32UI),G===i.BYTE&&(nt=i.RGB8I),G===i.SHORT&&(nt=i.RGB16I),G===i.INT&&(nt=i.RGB32I)),y===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(nt=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(nt=i.RGBA16UI),G===i.UNSIGNED_INT&&(nt=i.RGBA32UI),G===i.BYTE&&(nt=i.RGBA8I),G===i.SHORT&&(nt=i.RGBA16I),G===i.INT&&(nt=i.RGBA32I)),y===i.RGB&&(G===i.UNSIGNED_SHORT&&vt&&(nt=vt.RGB16_EXT),G===i.SHORT&&vt&&(nt=vt.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(nt=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(nt=i.R11F_G11F_B10F)),y===i.RGBA){let rt=xt?qs:re.getTransfer(tt);G===i.FLOAT&&(nt=i.RGBA32F),G===i.HALF_FLOAT&&(nt=i.RGBA16F),G===i.UNSIGNED_BYTE&&(nt=rt===pe?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&vt&&(nt=vt.RGBA16_EXT),G===i.SHORT&&vt&&(nt=vt.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(nt=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(nt=i.RGB5_A1)}return(nt===i.R16F||nt===i.R32F||nt===i.RG16F||nt===i.RG32F||nt===i.RGBA16F||nt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function A(P,y){let G;return P?y===null||y===Tn||y===Ms?G=i.DEPTH24_STENCIL8:y===mn?G=i.DEPTH32F_STENCIL8:y===ys&&(G=i.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Tn||y===Ms?G=i.DEPTH_COMPONENT24:y===mn?G=i.DEPTH_COMPONENT32F:y===ys&&(G=i.DEPTH_COMPONENT16),G}function M(P,y){return f(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ve&&P.minFilter!==Ge?Math.log2(Math.max(y.width,y.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?y.mipmaps.length:1}function E(P){let y=P.target;y.removeEventListener("dispose",E),w(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&d.delete(y)}function _(P){let y=P.target;y.removeEventListener("dispose",_),N(y)}function w(P){let y=n.get(P);if(y.__webglInit===void 0)return;let G=P.source,Z=p.get(G);if(Z){let tt=Z[y.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&R(P),Object.keys(Z).length===0&&p.delete(G)}n.remove(P)}function R(P){let y=n.get(P);i.deleteTexture(y.__webglTexture);let G=P.source,Z=p.get(G);delete Z[y.__cacheKey],a.memory.textures--}function N(P){let y=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let tt=0;tt<y.__webglFramebuffer[Z].length;tt++)i.deleteFramebuffer(y.__webglFramebuffer[Z][tt]);else i.deleteFramebuffer(y.__webglFramebuffer[Z]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)i.deleteFramebuffer(y.__webglFramebuffer[Z]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)y.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[Z]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let G=P.textures;for(let Z=0,tt=G.length;Z<tt;Z++){let xt=n.get(G[Z]);xt.__webglTexture&&(i.deleteTexture(xt.__webglTexture),a.memory.textures--),n.remove(G[Z])}n.remove(P)}let I=0;function F(){I=0}function L(){return I}function O(P){I=P}function V(){let P=I;return P>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),I+=1,P}function W(P){let y=[];return y.push(P.wrapS),y.push(P.wrapT),y.push(P.wrapR||0),y.push(P.magFilter),y.push(P.minFilter),y.push(P.anisotropy),y.push(P.internalFormat),y.push(P.format),y.push(P.type),y.push(P.generateMipmaps),y.push(P.premultiplyAlpha),y.push(P.flipY),y.push(P.unpackAlignment),y.push(P.colorSpace),y.join()}function j(P,y){let G=n.get(P);if(P.isVideoTexture&&U(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&G.__version!==P.version){let Z=P.image;if(Z===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{ct(G,P,y);return}}else P.isExternalTexture&&(G.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+y)}function k(P,y){let G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){ct(G,P,y);return}else P.isExternalTexture&&(G.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+y)}function D(P,y){let G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){ct(G,P,y);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+y)}function H(P,y){let G=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&G.__version!==P.version){Nt(G,P,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+y)}let pt={[ga]:i.REPEAT,[Rn]:i.CLAMP_TO_EDGE,[_a]:i.MIRRORED_REPEAT},dt={[Ve]:i.NEAREST,[Jh]:i.NEAREST_MIPMAP_NEAREST,[vr]:i.NEAREST_MIPMAP_LINEAR,[Ge]:i.LINEAR,[$a]:i.LINEAR_MIPMAP_NEAREST,[xi]:i.LINEAR_MIPMAP_LINEAR},at={[Qh]:i.NEVER,[su]:i.ALWAYS,[tu]:i.LESS,[Fo]:i.LEQUAL,[eu]:i.EQUAL,[Oo]:i.GEQUAL,[nu]:i.GREATER,[iu]:i.NOTEQUAL};function ht(P,y){if(y.type===mn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ge||y.magFilter===$a||y.magFilter===vr||y.magFilter===xi||y.minFilter===Ge||y.minFilter===$a||y.minFilter===vr||y.minFilter===xi)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,pt[y.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,pt[y.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,pt[y.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,dt[y.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,dt[y.minFilter]),y.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,at[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ve||y.minFilter!==vr&&y.minFilter!==xi||y.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Dt(P,y){let G=!1;P.__webglInit===void 0&&(P.__webglInit=!0,y.addEventListener("dispose",E));let Z=y.source,tt=p.get(Z);tt===void 0&&(tt={},p.set(Z,tt));let xt=W(y);if(xt!==P.__cacheKey){tt[xt]===void 0&&(tt[xt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),tt[xt].usedTimes++;let vt=tt[P.__cacheKey];vt!==void 0&&(tt[P.__cacheKey].usedTimes--,vt.usedTimes===0&&R(y)),P.__cacheKey=xt,P.__webglTexture=tt[xt].texture}return G}function Y(P,y,G){return Math.floor(Math.floor(P/G)/y)}function J(P,y,G,Z){let xt=P.updateRanges;if(xt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,G,Z,y.data);else{xt.sort((Vt,wt)=>Vt.start-wt.start);let vt=0;for(let Vt=1;Vt<xt.length;Vt++){let wt=xt[vt],Mt=xt[Vt],kt=wt.start+wt.count,Yt=Y(Mt.start,y.width,4),Kt=Y(wt.start,y.width,4);Mt.start<=kt+1&&Yt===Kt&&Y(Mt.start+Mt.count-1,y.width,4)===Yt?wt.count=Math.max(wt.count,Mt.start+Mt.count-wt.start):(++vt,xt[vt]=Mt)}xt.length=vt+1;let nt=e.getParameter(i.UNPACK_ROW_LENGTH),rt=e.getParameter(i.UNPACK_SKIP_PIXELS),yt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Vt=0,wt=xt.length;Vt<wt;Vt++){let Mt=xt[Vt],kt=Math.floor(Mt.start/4),Yt=Math.ceil(Mt.count/4),Kt=kt%y.width,z=Math.floor(kt/y.width),St=Yt,it=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Kt),e.pixelStorei(i.UNPACK_SKIP_ROWS,z),e.texSubImage2D(i.TEXTURE_2D,0,Kt,z,St,it,G,Z,y.data)}P.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,nt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(i.UNPACK_SKIP_ROWS,yt)}}function ct(P,y,G){let Z=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=i.TEXTURE_3D);let tt=Dt(P,y),xt=y.source;e.bindTexture(Z,P.__webglTexture,i.TEXTURE0+G);let vt=n.get(xt);if(xt.version!==vt.__version||tt===!0){if(e.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let it=re.getPrimaries(re.workingColorSpace),bt=y.colorSpace===ei?null:re.getPrimaries(y.colorSpace),Rt=y.colorSpace===ei||it===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let rt=m(y.image,!1,s.maxTextureSize);rt=ue(y,rt);let yt=r.convert(y.format,y.colorSpace),Vt=r.convert(y.type),wt=x(y.internalFormat,yt,Vt,y.normalized,y.colorSpace,y.isVideoTexture);ht(Z,y);let Mt,kt=y.mipmaps,Yt=y.isVideoTexture!==!0,Kt=vt.__version===void 0||tt===!0,z=xt.dataReady,St=M(y,rt);if(y.isDepthTexture)wt=A(y.format===vi,y.type),Kt&&(Yt?e.texStorage2D(i.TEXTURE_2D,1,wt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,wt,rt.width,rt.height,0,yt,Vt,null));else if(y.isDataTexture)if(kt.length>0){Yt&&Kt&&e.texStorage2D(i.TEXTURE_2D,St,wt,kt[0].width,kt[0].height);for(let it=0,bt=kt.length;it<bt;it++)Mt=kt[it],Yt?z&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,Mt.width,Mt.height,yt,Vt,Mt.data):e.texImage2D(i.TEXTURE_2D,it,wt,Mt.width,Mt.height,0,yt,Vt,Mt.data);y.generateMipmaps=!1}else Yt?(Kt&&e.texStorage2D(i.TEXTURE_2D,St,wt,rt.width,rt.height),z&&J(y,rt,yt,Vt)):e.texImage2D(i.TEXTURE_2D,0,wt,rt.width,rt.height,0,yt,Vt,rt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Yt&&Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,wt,kt[0].width,kt[0].height,rt.depth);for(let it=0,bt=kt.length;it<bt;it++)if(Mt=kt[it],y.format!==gn)if(yt!==null)if(Yt){if(z)if(y.layerUpdates.size>0){let Rt=rc(Mt.width,Mt.height,y.format,y.type);for(let lt of y.layerUpdates){let Gt=Mt.data.subarray(lt*Rt/Mt.data.BYTES_PER_ELEMENT,(lt+1)*Rt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,lt,Mt.width,Mt.height,1,yt,Gt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,Mt.width,Mt.height,rt.depth,yt,Mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,it,wt,Mt.width,Mt.height,rt.depth,0,Mt.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?z&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,Mt.width,Mt.height,rt.depth,yt,Vt,Mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,it,wt,Mt.width,Mt.height,rt.depth,0,yt,Vt,Mt.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Yt&&Kt&&e.texStorage2D(i.TEXTURE_2D,St,wt,kt[0].width,kt[0].height);for(let it=0,bt=kt.length;it<bt;it++)Mt=kt[it],y.format!==gn?yt!==null?Yt?z&&e.compressedTexSubImage2D(i.TEXTURE_2D,it,0,0,Mt.width,Mt.height,yt,Mt.data):e.compressedTexImage2D(i.TEXTURE_2D,it,wt,Mt.width,Mt.height,0,Mt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?z&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,Mt.width,Mt.height,yt,Vt,Mt.data):e.texImage2D(i.TEXTURE_2D,it,wt,Mt.width,Mt.height,0,yt,Vt,Mt.data)}else if(y.isDataArrayTexture)if(Yt){if(Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,wt,rt.width,rt.height,rt.depth),z)if(y.layerUpdates.size>0){let it=rc(rt.width,rt.height,y.format,y.type);for(let bt of y.layerUpdates){let Rt=rt.data.subarray(bt*it/rt.data.BYTES_PER_ELEMENT,(bt+1)*it/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,bt,rt.width,rt.height,1,yt,Vt,Rt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,yt,Vt,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,wt,rt.width,rt.height,rt.depth,0,yt,Vt,rt.data);else if(y.isData3DTexture)Yt?(Kt&&e.texStorage3D(i.TEXTURE_3D,St,wt,rt.width,rt.height,rt.depth),z&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,yt,Vt,rt.data)):e.texImage3D(i.TEXTURE_3D,0,wt,rt.width,rt.height,rt.depth,0,yt,Vt,rt.data);else if(y.isFramebufferTexture){if(Kt)if(Yt)e.texStorage2D(i.TEXTURE_2D,St,wt,rt.width,rt.height);else{let it=rt.width,bt=rt.height;for(let Rt=0;Rt<St;Rt++)e.texImage2D(i.TEXTURE_2D,Rt,wt,it,bt,0,yt,Vt,null),it>>=1,bt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let it=i.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),rt.parentNode!==it){it.appendChild(rt),d.add(y),it.onpaint=bt=>{let Rt=bt.changedElements;for(let lt of d)Rt.includes(lt.image)&&(lt.needsUpdate=!0)},it.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,rt);else{let Rt=i.RGBA,lt=i.RGBA,Gt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Rt,lt,Gt,rt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(kt.length>0){if(Yt&&Kt){let it=ne(kt[0]);e.texStorage2D(i.TEXTURE_2D,St,wt,it.width,it.height)}for(let it=0,bt=kt.length;it<bt;it++)Mt=kt[it],Yt?z&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,yt,Vt,Mt):e.texImage2D(i.TEXTURE_2D,it,wt,yt,Vt,Mt);y.generateMipmaps=!1}else if(Yt){if(Kt){let it=ne(rt);e.texStorage2D(i.TEXTURE_2D,St,wt,it.width,it.height)}z&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,yt,Vt,rt)}else e.texImage2D(i.TEXTURE_2D,0,wt,yt,Vt,rt);f(y)&&b(Z),vt.__version=xt.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function Nt(P,y,G){if(y.image.length!==6)return;let Z=Dt(P,y),tt=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+G);let xt=n.get(tt);if(tt.version!==xt.__version||Z===!0){e.activeTexture(i.TEXTURE0+G);let vt=re.getPrimaries(re.workingColorSpace),nt=y.colorSpace===ei?null:re.getPrimaries(y.colorSpace),rt=y.colorSpace===ei||vt===nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);let yt=y.isCompressedTexture||y.image[0].isCompressedTexture,Vt=y.image[0]&&y.image[0].isDataTexture,wt=[];for(let lt=0;lt<6;lt++)!yt&&!Vt?wt[lt]=m(y.image[lt],!0,s.maxCubemapSize):wt[lt]=Vt?y.image[lt].image:y.image[lt],wt[lt]=ue(y,wt[lt]);let Mt=wt[0],kt=r.convert(y.format,y.colorSpace),Yt=r.convert(y.type),Kt=x(y.internalFormat,kt,Yt,y.normalized,y.colorSpace),z=y.isVideoTexture!==!0,St=xt.__version===void 0||Z===!0,it=tt.dataReady,bt=M(y,Mt);ht(i.TEXTURE_CUBE_MAP,y);let Rt;if(yt){z&&St&&e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Kt,Mt.width,Mt.height);for(let lt=0;lt<6;lt++){Rt=wt[lt].mipmaps;for(let Gt=0;Gt<Rt.length;Gt++){let Ot=Rt[Gt];y.format!==gn?kt!==null?z?it&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt,0,0,Ot.width,Ot.height,kt,Ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt,Kt,Ot.width,Ot.height,0,Ot.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt,0,0,Ot.width,Ot.height,kt,Yt,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt,Kt,Ot.width,Ot.height,0,kt,Yt,Ot.data)}}}else{if(Rt=y.mipmaps,z&&St){Rt.length>0&&bt++;let lt=ne(wt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Kt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(Vt){z?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,wt[lt].width,wt[lt].height,kt,Yt,wt[lt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Kt,wt[lt].width,wt[lt].height,0,kt,Yt,wt[lt].data);for(let Gt=0;Gt<Rt.length;Gt++){let ye=Rt[Gt].image[lt].image;z?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt+1,0,0,ye.width,ye.height,kt,Yt,ye.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt+1,Kt,ye.width,ye.height,0,kt,Yt,ye.data)}}else{z?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,kt,Yt,wt[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Kt,kt,Yt,wt[lt]);for(let Gt=0;Gt<Rt.length;Gt++){let Ot=Rt[Gt];z?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt+1,0,0,kt,Yt,Ot.image[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Gt+1,Kt,kt,Yt,Ot.image[lt])}}}f(y)&&b(i.TEXTURE_CUBE_MAP),xt.__version=tt.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function ut(P,y,G,Z,tt,xt){let vt=r.convert(G.format,G.colorSpace),nt=r.convert(G.type),rt=x(G.internalFormat,vt,nt,G.normalized,G.colorSpace),yt=n.get(y),Vt=n.get(G);if(Vt.__renderTarget=y,!yt.__hasExternalTextures){let wt=Math.max(1,y.width>>xt),Mt=Math.max(1,y.height>>xt);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,xt,rt,wt,Mt,y.depth,0,vt,nt,null):e.texImage2D(tt,xt,rt,wt,Mt,0,vt,nt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),qt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,tt,Vt.__webglTexture,0,Wt(y)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,tt,Vt.__webglTexture,xt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(P,y,G){if(i.bindRenderbuffer(i.RENDERBUFFER,P),y.depthBuffer){let Z=y.depthTexture,tt=Z&&Z.isDepthTexture?Z.type:null,xt=A(y.stencilBuffer,tt),vt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;qt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt(y),xt,y.width,y.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt(y),xt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,xt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,P)}else{let Z=y.textures;for(let tt=0;tt<Z.length;tt++){let xt=Z[tt],vt=r.convert(xt.format,xt.colorSpace),nt=r.convert(xt.type),rt=x(xt.internalFormat,vt,nt,xt.normalized,xt.colorSpace);qt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt(y),rt,y.width,y.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt(y),rt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,rt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ht(P,y,G){let Z=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let tt=n.get(y.depthTexture);if(tt.__renderTarget=y,(!tt.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Z){if(tt.__webglInit===void 0&&(tt.__webglInit=!0,y.depthTexture.addEventListener("dispose",E)),tt.__webglTexture===void 0){tt.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),ht(i.TEXTURE_CUBE_MAP,y.depthTexture);let yt=r.convert(y.depthTexture.format),Vt=r.convert(y.depthTexture.type),wt;y.depthTexture.format===Ln?wt=i.DEPTH_COMPONENT24:y.depthTexture.format===vi&&(wt=i.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,wt,y.width,y.height,0,yt,Vt,null)}}else j(y.depthTexture,0);let xt=tt.__webglTexture,vt=Wt(y),nt=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,rt=y.depthTexture.format===vi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===Ln)qt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,nt,xt,0,vt):i.framebufferTexture2D(i.FRAMEBUFFER,rt,nt,xt,0);else if(y.depthTexture.format===vi)qt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,nt,xt,0,vt):i.framebufferTexture2D(i.FRAMEBUFFER,rt,nt,xt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function et(P){let y=n.get(P),G=P.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==P.depthTexture){let Z=P.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Z){let tt=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",tt)};Z.addEventListener("dispose",tt),y.__depthDisposeCallback=tt}y.__boundDepthTexture=Z}if(P.depthTexture&&!y.__autoAllocateDepthBuffer)if(G)for(let Z=0;Z<6;Z++)Ht(y.__webglFramebuffer[Z],P,Z);else{let Z=P.texture.mipmaps;Z&&Z.length>0?Ht(y.__webglFramebuffer[0],P,0):Ht(y.__webglFramebuffer,P,0)}else if(G){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=i.createRenderbuffer(),gt(y.__webglDepthbuffer[Z],P,!1);else{let tt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=y.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,xt),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,xt)}}else{let Z=P.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),gt(y.__webglDepthbuffer,P,!1);else{let tt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,xt),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,xt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function $(P,y,G){let Z=n.get(P);y!==void 0&&ut(Z.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&et(P)}function st(P){let y=P.texture,G=n.get(P),Z=n.get(y);P.addEventListener("dispose",_);let tt=P.textures,xt=P.isWebGLCubeRenderTarget===!0,vt=tt.length>1;if(vt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=y.version,a.memory.textures++),xt){G.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer[nt]=[];for(let rt=0;rt<y.mipmaps.length;rt++)G.__webglFramebuffer[nt][rt]=i.createFramebuffer()}else G.__webglFramebuffer[nt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer=[];for(let nt=0;nt<y.mipmaps.length;nt++)G.__webglFramebuffer[nt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(vt)for(let nt=0,rt=tt.length;nt<rt;nt++){let yt=n.get(tt[nt]);yt.__webglTexture===void 0&&(yt.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&qt(P)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let nt=0;nt<tt.length;nt++){let rt=tt[nt];G.__webglColorRenderbuffer[nt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[nt]);let yt=r.convert(rt.format,rt.colorSpace),Vt=r.convert(rt.type),wt=x(rt.internalFormat,yt,Vt,rt.normalized,rt.colorSpace,P.isXRRenderTarget===!0),Mt=Wt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,wt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,G.__webglColorRenderbuffer[nt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),gt(G.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(xt){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),ht(i.TEXTURE_CUBE_MAP,y);for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0)for(let rt=0;rt<y.mipmaps.length;rt++)ut(G.__webglFramebuffer[nt][rt],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,rt);else ut(G.__webglFramebuffer[nt],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);f(y)&&b(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let nt=0,rt=tt.length;nt<rt;nt++){let yt=tt[nt],Vt=n.get(yt),wt=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(wt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(wt,Vt.__webglTexture),ht(wt,yt),ut(G.__webglFramebuffer,P,yt,i.COLOR_ATTACHMENT0+nt,wt,0),f(yt)&&b(wt)}e.unbindTexture()}else{let nt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(nt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,Z.__webglTexture),ht(nt,y),y.mipmaps&&y.mipmaps.length>0)for(let rt=0;rt<y.mipmaps.length;rt++)ut(G.__webglFramebuffer[rt],P,y,i.COLOR_ATTACHMENT0,nt,rt);else ut(G.__webglFramebuffer,P,y,i.COLOR_ATTACHMENT0,nt,0);f(y)&&b(nt),e.unbindTexture()}P.depthBuffer&&et(P)}function ot(P){let y=P.textures;for(let G=0,Z=y.length;G<Z;G++){let tt=y[G];if(f(tt)){let xt=T(P),vt=n.get(tt).__webglTexture;e.bindTexture(xt,vt),b(xt),e.unbindTexture()}}}let _t=[],zt=[];function Pt(P){if(P.samples>0){if(qt(P)===!1){let y=P.textures,G=P.width,Z=P.height,tt=i.COLOR_BUFFER_BIT,xt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=n.get(P),nt=y.length>1;if(nt)for(let yt=0;yt<y.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);let rt=P.texture.mipmaps;rt&&rt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let yt=0;yt<y.length;yt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),nt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,vt.__webglColorRenderbuffer[yt]);let Vt=n.get(y[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,G,Z,0,0,G,Z,tt,i.NEAREST),l===!0&&(_t.length=0,zt.length=0,_t.push(i.COLOR_ATTACHMENT0+yt),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(_t.push(xt),zt.push(xt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,zt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),nt)for(let yt=0;yt<y.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,vt.__webglColorRenderbuffer[yt]);let Vt=n.get(y[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Wt(P){return Math.min(s.maxSamples,P.samples)}function qt(P){let y=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function U(P){let y=a.render.frame;h.get(P)!==y&&(h.set(P,y),P.update())}function ue(P,y){let G=P.colorSpace,Z=P.format,tt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||G!==Xs&&G!==ei&&(re.getTransfer(G)===pe?(Z!==gn||tt!==en)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Zt("WebGLTextures: Unsupported texture color space:",G)),y}function ne(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=k,this.setTexture3D=D,this.setTextureCube=H,this.rebindTextures=$,this.setupRenderTarget=st,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function x_(i,t){function e(n,s=ei){let r,a=re.getTransfer(s);if(n===en)return i.UNSIGNED_BYTE;if(n===ja)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ql)return i.BYTE;if(n===Yl)return i.SHORT;if(n===ys)return i.UNSIGNED_SHORT;if(n===Ka)return i.INT;if(n===Tn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===hn)return i.HALF_FLOAT;if(n===$l)return i.ALPHA;if(n===Kl)return i.RGB;if(n===gn)return i.RGBA;if(n===Ln)return i.DEPTH_COMPONENT;if(n===vi)return i.DEPTH_STENCIL;if(n===to)return i.RED;if(n===eo)return i.RED_INTEGER;if(n===yi)return i.RG;if(n===no)return i.RG_INTEGER;if(n===io)return i.RGBA_INTEGER;if(n===yr||n===Mr||n===Sr||n===br)if(a===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===so||n===ro||n===ao||n===oo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===so)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ao)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lo||n===co||n===ho||n===uo||n===fo||n===wr||n===po)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lo||n===co)return a===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ho)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===uo)return r.COMPRESSED_R11_EAC;if(n===fo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wr)return r.COMPRESSED_RG11_EAC;if(n===po)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===mo||n===go||n===_o||n===xo||n===vo||n===yo||n===Mo||n===So||n===bo||n===wo||n===To||n===Ao||n===Eo||n===Co)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===mo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===go)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_o)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===So)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===To)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ao)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Eo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Co)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ro||n===Po||n===Io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ro)return a===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Po)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lo||n===Do||n===Tr||n===No)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Lo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Do)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===No)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var v_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ir(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ue({vertexShader:v_,fragmentShader:y_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ce(new Ne(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tc=class extends Dn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null,v=typeof XRWebGLBinding<"u",m=new wc,f={},b=e.getContextAttributes(),T=null,x=null,A=[],M=[],E=new mt,_=null,w=null,R=new ze;R.viewport=new ve;let N=new ze;N.viewport=new ve;let I=[R,N],F=new Xa,L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let J=A[Y];return J===void 0&&(J=new cs,A[Y]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Y){let J=A[Y];return J===void 0&&(J=new cs,A[Y]=J),J.getGripSpace()},this.getHand=function(Y){let J=A[Y];return J===void 0&&(J=new cs,A[Y]=J),J.getHandSpace()};function V(Y){let J=M.indexOf(Y.inputSource);if(J===-1)return;let ct=A[J];ct!==void 0&&(ct.update(Y.inputSource,Y.frame,c||a),ct.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",j);for(let Y=0;Y<A.length;Y++){let J=M[Y];J!==null&&(M[Y]=null,A[Y].disconnect(J))}L=null,O=null,m.reset();for(let Y in f)delete f[Y];if(t.setRenderTarget(T),p=null,u=null,d=null,s=null,x=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(E.width,E.height,!1),w!==null){let Y=w.camera;Y.fov=w.fov,Y.zoom=w.zoom,Y.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",W),s.addEventListener("inputsourceschange",j),b.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,Nt=null,ut=null;b.depth&&(ut=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=b.stencil?vi:Ln,Nt=b.stencil?Ms:Tn);let gt={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(gt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new qe(u.textureWidth,u.textureHeight,{format:gn,type:en,depthTexture:new ui(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ct={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new qe(p.framebufferWidth,p.framebufferHeight,{format:gn,type:en,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(Y){for(let J=0;J<Y.removed.length;J++){let ct=Y.removed[J],Nt=M.indexOf(ct);Nt>=0&&(M[Nt]=null,A[Nt].disconnect(ct))}for(let J=0;J<Y.added.length;J++){let ct=Y.added[J],Nt=M.indexOf(ct);if(Nt===-1){for(let gt=0;gt<A.length;gt++)if(gt>=M.length){M.push(ct),Nt=gt;break}else if(M[gt]===null){M[gt]=ct,Nt=gt;break}if(Nt===-1)break}let ut=A[Nt];ut&&ut.connect(ct)}}let k=new C,D=new C;function H(Y,J,ct){k.setFromMatrixPosition(J.matrixWorld),D.setFromMatrixPosition(ct.matrixWorld);let Nt=k.distanceTo(D),ut=J.projectionMatrix.elements,gt=ct.projectionMatrix.elements,Ht=ut[14]/(ut[10]-1),et=ut[14]/(ut[10]+1),$=(ut[9]+1)/ut[5],st=(ut[9]-1)/ut[5],ot=(ut[8]-1)/ut[0],_t=(gt[8]+1)/gt[0],zt=Ht*ot,Pt=Ht*_t,Wt=Nt/(-ot+_t),qt=Wt*-ot;if(J.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(qt),Y.translateZ(Wt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ut[10]===-1)Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let U=Ht+Wt,ue=et+Wt,ne=zt-qt,P=Pt+(Nt-qt),y=$*et/ue*U,G=st*et/ue*U;Y.projectionMatrix.makePerspective(ne,P,y,G,U,ue),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function pt(Y,J){J===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(J.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let J=Y.near,ct=Y.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ct=m.depthFar)),F.near=N.near=R.near=J,F.far=N.far=R.far=ct,(L!==F.near||O!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,O=F.far),F.layers.mask=Y.layers.mask|6,R.layers.mask=F.layers.mask&-5,N.layers.mask=F.layers.mask&-3;let Nt=Y.parent,ut=F.cameras;pt(F,Nt);for(let gt=0;gt<ut.length;gt++)pt(ut[gt],Nt);ut.length===2?H(F,R,N):F.projectionMatrix.copy(R.projectionMatrix),w===null&&Y.isPerspectiveCamera&&(w={camera:Y,fov:Y.fov,zoom:Y.zoom}),dt(Y,F,Nt)};function dt(Y,J,ct){ct===null?Y.matrix.copy(J.matrixWorld):(Y.matrix.copy(ct.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(J.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=as*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return f[Y]};let at=null;function ht(Y,J){if(h=J.getViewerPose(c||a),g=J,h!==null){let ct=h.views;p!==null&&(t.setRenderTargetFramebuffer(x,p.framebuffer),t.setRenderTarget(x));let Nt=!1;ct.length!==F.cameras.length&&(F.cameras.length=0,Nt=!0);for(let et=0;et<ct.length;et++){let $=ct[et],st=null;if(p!==null)st=p.getViewport($);else{let _t=d.getViewSubImage(u,$);st=_t.viewport,et===0&&(t.setRenderTargetTextures(x,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(x))}let ot=I[et];ot===void 0&&(ot=new ze,ot.layers.enable(et),ot.viewport=new ve,I[et]=ot),ot.matrix.fromArray($.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray($.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(st.x,st.y,st.width,st.height),et===0&&(F.matrix.copy(ot.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Nt===!0&&F.cameras.push(ot)}let ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let et=d.getDepthInformation(ct[0]);et&&et.isValid&&et.texture&&m.init(et,s.renderState)}if(ut&&ut.includes("camera-access")&&v){t.state.unbindTexture(),d=n.getBinding();for(let et=0;et<ct.length;et++){let $=ct[et].camera;if($){let st=f[$];st||(st=new ir,f[$]=st);let ot=d.getCameraImage($);st.sourceTexture=ot}}}}for(let ct=0;ct<A.length;ct++){let Nt=M[ct],ut=A[ct];Nt!==null&&ut!==void 0&&ut.update(Nt,J,c||a)}at&&at(Y,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let Dt=new Bu;Dt.setAnimationLoop(ht),this.setAnimationLoop=function(Y){at=Y},this.dispose=function(){}}},M_=new le,Wu=new $t;Wu.set(-1,0,0,0,1,0,0,0,1);function S_(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,nc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,b,T,x){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,b,T):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ke&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ke&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let b=t.get(f),T=b.envMap,x=b.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(M_.makeRotationFromEuler(x)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Wu),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,b,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=T*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ke&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let b=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function b_(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){let M=A.program;n.uniformBlockBinding(x,M)}function c(x,A){let M=s[x.id];M===void 0&&(m(x),M=h(x),s[x.id]=M,x.addEventListener("dispose",b));let E=A.program;n.updateUBOMapping(x,E);let _=t.render.frame;r[x.id]!==_&&(u(x),r[x.id]=_)}function h(x){let A=d();x.__bindingPointIndex=A;let M=i.createBuffer(),E=x.__size,_=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,E,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,M),M}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Zt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let A=s[x.id],M=x.uniforms,E=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let _=0,w=M.length;_<w;_++){let R=M[_];if(Array.isArray(R))for(let N=0,I=R.length;N<I;N++)p(R[N],_,N,E);else p(R,_,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,A,M,E){if(v(x,A,M,E)===!0){let _=x.__offset,w=x.value;if(Array.isArray(w)){let R=0;for(let N=0;N<w.length;N++){let I=w[N],F=f(I);g(I,x.__data,R),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(R+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,x.__data)}}function g(x,A,M){typeof x=="number"||typeof x=="boolean"?A[0]=x:x.isMatrix3?(A[0]=x.elements[0],A[1]=x.elements[1],A[2]=x.elements[2],A[3]=0,A[4]=x.elements[3],A[5]=x.elements[4],A[6]=x.elements[5],A[7]=0,A[8]=x.elements[6],A[9]=x.elements[7],A[10]=x.elements[8],A[11]=0):ArrayBuffer.isView(x)?A.set(new x.constructor(x.buffer,x.byteOffset,A.length)):x.toArray(A,M)}function v(x,A,M,E){let _=x.value,w=A+"_"+M;if(E[w]===void 0)return typeof _=="number"||typeof _=="boolean"?E[w]=_:ArrayBuffer.isView(_)?E[w]=_.slice():E[w]=_.clone(),!0;{let R=E[w];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return E[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function m(x){let A=x.uniforms,M=0,E=16;for(let w=0,R=A.length;w<R;w++){let N=Array.isArray(A[w])?A[w]:[A[w]];for(let I=0,F=N.length;I<F;I++){let L=N[I],O=Array.isArray(L.value)?L.value:[L.value];for(let V=0,W=O.length;V<W;V++){let j=O[V],k=f(j),D=M%E,H=D%k.boundary,pt=D+H;M+=H,pt!==0&&E-pt<k.storage&&(M+=E-pt),L.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=k.storage}}}let _=M%E;return _>0&&(M+=E-_),x.__size=M,x.__cache={},this}function f(x){let A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(A.boundary=16,A.storage=x.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",x),A}function b(x){let A=x.target;A.removeEventListener("dispose",b);let M=a.indexOf(A.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function T(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}var w_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gn=null;function T_(){return Gn===null&&(Gn=new Qs(w_,16,16,yi,hn),Gn.name="DFG_LUT",Gn.minFilter=Ge,Gn.magFilter=Ge,Gn.wrapS=Rn,Gn.wrapT=Rn,Gn.generateMipmaps=!1,Gn.needsUpdate=!0),Gn}var As=class{constructor(t={}){let{canvas:e=ru(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=en}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let v=p,m=new Set([io,no,eo]),f=new Set([en,Tn,ys,Ms,ja,Qa]),b=new Uint32Array(4),T=new Int32Array(4),x=new C,A=null,M=null,E=[],_=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,N=!1,I=null,F=null,L=null,O=null;this._outputColorSpace=we;let V=0,W=0,j=null,k=-1,D=null,H=new ve,pt=new ve,dt=null,at=new ft(0),ht=0,Dt=e.width,Y=e.height,J=1,ct=null,Nt=null,ut=new ve(0,0,Dt,Y),gt=new ve(0,0,Dt,Y),Ht=!1,et=new us,$=!1,st=!1,ot=new le,_t=new C,zt=new ve,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wt=!1;function qt(){return j===null?J:1}let U=n;function ue(S,B){return e.getContext(S,B)}let ne,P,y,G,Z,tt,xt,vt,nt,rt,yt,Vt,wt,Mt,kt,Yt,Kt,z,St,it,bt,Rt,lt;try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ye,!1),e.addEventListener("webglcontextrestored",de,!1),e.addEventListener("webglcontextcreationerror",_n,!1),U===null){let B="webgl2";if(U=ue(B,S),U===null)throw ue(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Gt()}catch(S){throw e.removeEventListener("webglcontextlost",ye,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",_n,!1),Zt("WebGLRenderer: "+S.message),S}function Gt(){ne=new Lg(U),ne.init(),bt=new x_(U,ne),P=new Sg(U,ne,t,bt),y=new g_(U,ne),P.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),F=U.createFramebuffer(),L=U.createFramebuffer(),O=U.createFramebuffer(),G=new Ug(U),Z=new n_,tt=new __(U,ne,y,Z,P,bt,G),xt=new Ig(R),vt=new Of(U),Rt=new yg(U,vt),nt=new Dg(U,vt,G,Rt),rt=new Og(U,nt,vt,Rt,G),z=new Fg(U,P,tt),kt=new bg(Z),yt=new e_(R,xt,ne,P,Rt,kt),Vt=new S_(R,Z),wt=new s_,Mt=new h_(ne),Kt=new vg(R,xt,y,rt,g,l),Yt=new m_(R,rt,P),lt=new b_(U,G,P,y),St=new Mg(U,ne,G),it=new Ng(U,ne,G),G.programs=yt.programs,R.capabilities=P,R.extensions=ne,R.properties=Z,R.renderLists=wt,R.shadowMap=Yt,R.state=y,R.info=G}v!==en&&(w=new zg(v,e.width,e.height,o,s,r));let Ot=new Tc(R,U);this.xr=Ot,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let S=ne.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ne.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(S){S!==void 0&&(J=S,this.setSize(Dt,Y,!1))},this.getSize=function(S){return S.set(Dt,Y)},this.setSize=function(S,B,K=!0){if(Ot.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}Dt=S,Y=B,e.width=Math.floor(S*J),e.height=Math.floor(B*J),K===!0&&(e.style.width=S+"px",e.style.height=B+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(Dt*J,Y*J).floor()},this.setDrawingBufferSize=function(S,B,K){Dt=S,Y=B,J=K,e.width=Math.floor(S*K),e.height=Math.floor(B*K),this.setViewport(0,0,S,B)},this.setEffects=function(S){if(v===en){Zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let B=0;B<S.length;B++)if(S[B].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(H)},this.getViewport=function(S){return S.copy(ut)},this.setViewport=function(S,B,K,X){S.isVector4?ut.set(S.x,S.y,S.z,S.w):ut.set(S,B,K,X),y.viewport(H.copy(ut).multiplyScalar(J).round())},this.getScissor=function(S){return S.copy(gt)},this.setScissor=function(S,B,K,X){S.isVector4?gt.set(S.x,S.y,S.z,S.w):gt.set(S,B,K,X),y.scissor(pt.copy(gt).multiplyScalar(J).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(S){y.setScissorTest(Ht=S)},this.setOpaqueSort=function(S){ct=S},this.setTransparentSort=function(S){Nt=S},this.getClearColor=function(S){return S.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor(...arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,K=!0){let X=0;if(S){let q=!1;if(j!==null){let Et=j.texture.format;q=m.has(Et)}if(q){let Et=j.texture.type,Lt=f.has(Et),At=Kt.getClearColor(),Ut=Kt.getClearAlpha(),Bt=At.r,jt=At.g,ie=At.b;Lt?(b[0]=Bt,b[1]=jt,b[2]=ie,b[3]=Ut,U.clearBufferuiv(U.COLOR,0,b)):(T[0]=Bt,T[1]=jt,T[2]=ie,T[3]=Ut,U.clearBufferiv(U.COLOR,0,T))}else X|=U.COLOR_BUFFER_BIT}B&&(X|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(X|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&U.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),I=S},this.dispose=function(){e.removeEventListener("webglcontextlost",ye,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",_n,!1),Kt.dispose(),wt.dispose(),Mt.dispose(),Z.dispose(),xt.dispose(),rt.dispose(),Rt.dispose(),lt.dispose(),yt.dispose(),Ot.dispose(),Ot.removeEventListener("sessionstart",Dc),Ot.removeEventListener("sessionend",Nc),Mi.stop()};function ye(S){S.preventDefault(),Zs("WebGLRenderer: Context Lost."),N=!0}function de(){Zs("WebGLRenderer: Context Restored."),N=!1;let S=G.autoReset,B=Yt.enabled,K=Yt.autoUpdate,X=Yt.needsUpdate,q=Yt.type;Gt(),G.autoReset=S,Yt.enabled=B,Yt.autoUpdate=K,Yt.needsUpdate=X,Yt.type=q}function _n(S){Zt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function An(S){let B=S.target;B.removeEventListener("dispose",An),sd(B)}function sd(S){rd(S),Z.remove(S)}function rd(S){let B=Z.get(S).programs;B!==void 0&&(B.forEach(function(K){yt.releaseProgram(K)}),S.isShaderMaterial&&yt.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,K,X,q,Et){B===null&&(B=Pt);let Lt=q.isMesh&&q.matrixWorld.determinantAffine()<0,At=ld(S,B,K,X,q);y.setMaterial(X,Lt);let Ut=K.index,Bt=1;if(X.wireframe===!0){if(Ut=nt.getWireframeAttribute(K),Ut===void 0)return;Bt=2}let jt=K.drawRange,ie=K.attributes.position,Ft=jt.start*Bt,fe=(jt.start+jt.count)*Bt;Et!==null&&(Ft=Math.max(Ft,Et.start*Bt),fe=Math.min(fe,(Et.start+Et.count)*Bt)),Ut!==null?(Ft=Math.max(Ft,0),fe=Math.min(fe,Ut.count)):ie!=null&&(Ft=Math.max(Ft,0),fe=Math.min(fe,ie.count));let Ie=fe-Ft;if(Ie<0||Ie===1/0)return;Rt.setup(q,X,At,K,Ut);let Se,xe=St;if(Ut!==null&&(Se=vt.get(Ut),xe=it,xe.setIndex(Se)),q.isMesh)X.wireframe===!0?(y.setLineWidth(X.wireframeLinewidth*qt()),xe.setMode(U.LINES)):xe.setMode(U.TRIANGLES);else if(q.isLine){let He=X.linewidth;He===void 0&&(He=1),y.setLineWidth(He*qt()),q.isLineSegments?xe.setMode(U.LINES):q.isLineLoop?xe.setMode(U.LINE_LOOP):xe.setMode(U.LINE_STRIP)}else q.isPoints?xe.setMode(U.POINTS):q.isSprite&&xe.setMode(U.TRIANGLES);if(q.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))xe.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let He=q._multiDrawStarts,It=q._multiDrawCounts,Ze=q._multiDrawCount,oe=Ut?vt.get(Ut).bytesPerElement:1,un=Z.get(X).currentProgram.getUniforms();for(let En=0;En<Ze;En++)un.setValue(U,"_gl_DrawID",En),xe.render(He[En]/oe,It[En])}else if(q.isInstancedMesh)xe.renderInstances(Ft,Ie,q.count);else if(K.isInstancedBufferGeometry){let He=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,It=Math.min(K.instanceCount,He);xe.renderInstances(Ft,Ie,It)}else xe.render(Ft,Ie)};function Lc(S,B,K,X){I!==null&&S.isNodeMaterial&&I.setObject(X,S),$===!0&&kt.setState(S,K,!1),S.transparent===!0&&S.side===Ae&&S.forceSinglePass===!1?(S.side=ke,S.needsUpdate=!0,Dr(S,B,X),S.side=gi,S.needsUpdate=!0,Dr(S,B,X),S.side=Ae):Dr(S,B,X)}this.compile=function(S,B,K=null){K===null&&(K=S),I!==null&&I.renderStart(S,B,K),M=Mt.get(K),M.init(B),_.push(M),K.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),S!==K&&S.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),M.setupLights(),I!==null&&I.updateLights(M.state.lightsArray),st=this.localClippingEnabled,$=kt.init(this.clippingPlanes,st),$===!0&&kt.setGlobalState(this.clippingPlanes,B),I!==null&&Yt.render(M.state.shadowsArray,K,B);let X=new Set;return S.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let Et=q.material;if(Et)if(Array.isArray(Et))for(let Lt=0;Lt<Et.length;Lt++){let At=Et[Lt];Lc(At,K,B,q),X.add(At)}else Lc(Et,K,B,q),X.add(Et)}),M=_.pop(),I!==null&&I.renderEnd(),X},this.compileAsync=function(S,B,K=null){let X=this.compile(S,B,K);return new Promise(q=>{function Et(){if(X.forEach(function(Lt){let Ut=Z.get(Lt).currentProgram;(Ut===void 0||Ut.isReady())&&X.delete(Lt)}),X.size===0){q(S);return}setTimeout(Et,10)}ne.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let Yo=null;function ad(S){Yo&&Yo(S)}function Dc(){Mi.stop()}function Nc(){Mi.start()}let Mi=new Bu;Mi.setAnimationLoop(ad),typeof self<"u"&&Mi.setContext(self),this.setAnimationLoop=function(S){Yo=S,Ot.setAnimationLoop(S),S===null?Mi.stop():Mi.start()},Ot.addEventListener("sessionstart",Dc),Ot.addEventListener("sessionend",Nc),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){Zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;I!==null&&I.renderStart(S,B);let K=Ot.enabled===!0&&Ot.isPresenting===!0,X=w!==null&&(j===null||K)&&w.begin(R,j);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ot.enabled===!0&&Ot.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ot.cameraAutoUpdate===!0&&Ot.updateCamera(B),B=Ot.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,B,j),M=Mt.get(S,_.length),M.init(B),M.state.textureUnits=tt.getTextureUnits(),_.push(M),ot.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),et.setFromProjectionMatrix(ot,Sn,B.reversedDepth),st=this.localClippingEnabled,$=kt.init(this.clippingPlanes,st),A=wt.get(S,E.length),A.init(),E.push(A),Ot.enabled===!0&&Ot.isPresenting===!0){let Lt=R.xr.getDepthSensingMesh();Lt!==null&&Zo(Lt,B,-1/0,R.sortObjects)}Zo(S,B,0,R.sortObjects),A.finish(),I!==null&&I.updateLights(M.state.lightsArray),R.sortObjects===!0&&A.sort(ct,Nt),Wt=Ot.enabled===!1||Ot.isPresenting===!1||Ot.hasDepthSensing()===!1,Wt&&Kt.addToRenderList(A,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$===!0&&kt.beginShadows();let q=M.state.shadowsArray;if(Yt.render(q,S,B),$===!0&&kt.endShadows(),(X&&w.hasRenderPass())===!1){let Lt=A.opaque,At=A.transmissive;if(M.setupLights(),B.isArrayCamera){let Ut=B.cameras;if(At.length>0)for(let Bt=0,jt=Ut.length;Bt<jt;Bt++){let ie=Ut[Bt];Fc(Lt,At,S,ie)}Wt&&Kt.render(S);for(let Bt=0,jt=Ut.length;Bt<jt;Bt++){let ie=Ut[Bt];Uc(A,S,ie,ie.viewport)}}else At.length>0&&Fc(Lt,At,S,B),Wt&&Kt.render(S),Uc(A,S,B)}j!==null&&W===0&&(tt.updateMultisampleRenderTarget(j),tt.updateRenderTargetMipmap(j)),X&&w.end(R),S.isScene===!0&&S.onAfterRender(R,S,B),Rt.resetDefaultState(),k=-1,D=null,_.pop(),_.length>0?(M=_[_.length-1],tt.setTextureUnits(M.state.textureUnits),$===!0&&kt.setGlobalState(R.clippingPlanes,M.state.camera)):M=null,E.pop(),E.length>0?A=E[E.length-1]:A=null,I!==null&&I.renderEnd()};function Zo(S,B,K,X){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)K=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLightProbeGrid)M.pushLightProbeGrid(S);else if(S.isLight)M.pushLight(S),S.castShadow&&M.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(et)){X&&zt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ot);let Lt=rt.update(S),At=S.material;At.visible&&A.push(S,Lt,At,K,zt.z,null,B)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(et))){let Lt=rt.update(S),At=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),zt.copy(S.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),zt.copy(Lt.boundingSphere.center)),zt.applyMatrix4(S.matrixWorld).applyMatrix4(ot)),Array.isArray(At)){let Ut=Lt.groups;for(let Bt=0,jt=Ut.length;Bt<jt;Bt++){let ie=Ut[Bt],Ft=At[ie.materialIndex];Ft&&Ft.visible&&A.push(S,Lt,Ft,K,zt.z,ie,B)}}else At.visible&&A.push(S,Lt,At,K,zt.z,null,B)}}let Et=S.children;for(let Lt=0,At=Et.length;Lt<At;Lt++)Zo(Et[Lt],B,K,X)}function Uc(S,B,K,X){let{opaque:q,transmissive:Et,transparent:Lt}=S;M.setupLightsView(K),$===!0&&kt.setGlobalState(R.clippingPlanes,K),X&&y.viewport(H.copy(X)),q.length>0&&Lr(q,B,K),Et.length>0&&Lr(Et,B,K),Lt.length>0&&Lr(Lt,B,K),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Fc(S,B,K,X){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[X.id]===void 0){let Ft=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[X.id]=new qe(1,1,{generateMipmaps:!0,type:Ft?hn:en,minFilter:xi,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:re.workingColorSpace})}let Et=M.state.transmissionRenderTarget[X.id],Lt=X.viewport||H;Et.setSize(Lt.z*R.transmissionResolutionScale,Lt.w*R.transmissionResolutionScale);let At=R.getRenderTarget(),Ut=R.getActiveCubeFace(),Bt=R.getActiveMipmapLevel();R.setRenderTarget(Et),R.getClearColor(at),ht=R.getClearAlpha(),ht<1&&R.setClearColor(16777215,.5),R.clear(),Wt&&Kt.render(K);let jt=R.toneMapping;R.toneMapping=wn;let ie=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),M.setupLightsView(X),$===!0&&kt.setGlobalState(R.clippingPlanes,X),Lr(S,K,X),tt.updateMultisampleRenderTarget(Et),tt.updateRenderTargetMipmap(Et),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let fe=0,Ie=B.length;fe<Ie;fe++){let Se=B[fe],{object:xe,geometry:He,material:It,group:Ze}=Se;if(It.side===Ae&&xe.layers.test(X.layers)){let oe=It.side;It.side=ke,It.needsUpdate=!0,Oc(xe,K,X,He,It,Ze),It.side=oe,It.needsUpdate=!0,Ft=!0}}Ft===!0&&(tt.updateMultisampleRenderTarget(Et),tt.updateRenderTargetMipmap(Et))}R.setRenderTarget(At,Ut,Bt),R.setClearColor(at,ht),ie!==void 0&&(X.viewport=ie),R.toneMapping=jt}function Lr(S,B,K){let X=B.isScene===!0?B.overrideMaterial:null;for(let q=0,Et=S.length;q<Et;q++){let Lt=S[q],{object:At,geometry:Ut,group:Bt}=Lt,jt=Lt.material;jt.allowOverride===!0&&X!==null&&(jt=X),At.layers.test(K.layers)&&Oc(At,B,K,Ut,jt,Bt)}}function Oc(S,B,K,X,q,Et){I!==null&&q.isNodeMaterial&&I.setObject(S,q),S.onBeforeRender(R,B,K,X,q,Et),S.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),q.onBeforeRender(R,B,K,X,S,Et),q.transparent===!0&&q.side===Ae&&q.forceSinglePass===!1?(q.side=ke,q.needsUpdate=!0,R.renderBufferDirect(K,B,X,q,S,Et),q.side=gi,q.needsUpdate=!0,R.renderBufferDirect(K,B,X,q,S,Et),q.side=Ae):R.renderBufferDirect(K,B,X,q,S,Et),S.onAfterRender(R,B,K,X,q,Et)}function Dr(S,B,K){B.isScene!==!0&&(B=Pt);let X=Z.get(S),q=M.state.lights,Et=M.state.shadowsArray,Lt=q.state.version,At=yt.getParameters(S,q.state,Et,B,K,M.state.lightProbeGridArray),Ut=yt.getProgramCacheKey(At),Bt=X.programs;X.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?B.environment:null,X.fog=B.fog;let jt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;X.envMap=xt.get(S.envMap||X.environment,jt),X.envMapRotation=X.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,Bt===void 0&&(S.addEventListener("dispose",An),Bt=new Map,X.programs=Bt);let ie=Bt.get(Ut);if(ie!==void 0){if(X.currentProgram===ie&&X.lightsStateVersion===Lt)return zc(S,At),ie}else At.uniforms=yt.getUniforms(S),I!==null&&S.isNodeMaterial&&I.build(S,K,At),S.onBeforeCompile(At,R),ie=yt.acquireProgram(At,Ut),Bt.set(Ut,ie),X.uniforms=At.uniforms;let Ft=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ft.clippingPlanes=kt.uniform),zc(S,At),X.needsLights=hd(S),X.lightsStateVersion=Lt,X.needsLights&&(Ft.ambientLightColor.value=q.state.ambient,Ft.lightProbe.value=q.state.probe,Ft.sunLights.value=q.state.sun,Ft.sunLightShadows.value=q.state.sunShadow,Ft.directionalLights.value=q.state.directional,Ft.directionalLightShadows.value=q.state.directionalShadow,Ft.spotLights.value=q.state.spot,Ft.spotLightShadows.value=q.state.spotShadow,Ft.rectAreaLights.value=q.state.rectArea,Ft.ltc_1.value=q.state.rectAreaLTC1,Ft.ltc_2.value=q.state.rectAreaLTC2,Ft.pointLights.value=q.state.point,Ft.pointLightShadows.value=q.state.pointShadow,Ft.hemisphereLights.value=q.state.hemi,Ft.sunShadowMatrix.value=q.state.sunShadowMatrix,Ft.sunShadowCascade.value=q.state.sunShadowCascade,Ft.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ft.spotLightMatrix.value=q.state.spotLightMatrix,Ft.spotLightMap.value=q.state.spotLightMap,Ft.pointShadowMatrix.value=q.state.pointShadowMatrix),X.lightProbeGrid=M.state.lightProbeGridArray.length>0,X.currentProgram=ie,X.uniformsList=null,ie}function Bc(S){if(S.uniformsList===null){let B=S.currentProgram.getUniforms();S.uniformsList=Ts.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function zc(S,B){let K=Z.get(S);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.batchingColor=B.batchingColor,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function od(S,B){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;x.setFromMatrixPosition(B.matrixWorld);for(let K=0,X=S.length;K<X;K++){let q=S[K];if(q.texture!==null&&q.boundingBox.containsPoint(x))return q}return null}function ld(S,B,K,X,q){B.isScene!==!0&&(B=Pt),tt.resetTextureUnits();let Et=B.fog,Lt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?B.environment:null,At=j===null?R.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:re.workingColorSpace,Ut=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Bt=xt.get(X.envMap||Lt,Ut),jt=X.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ie=!!K.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ft=!!K.morphAttributes.position,fe=!!K.morphAttributes.normal,Ie=!!K.morphAttributes.color,Se=wn;X.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Se=R.toneMapping);let xe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,He=xe!==void 0?xe.length:0,It=Z.get(X),Ze=M.state.lights;if($===!0&&(st===!0||S!==D)){let Me=S===D&&X.id===k;kt.setState(X,S,Me)}let oe=!1;X.version===It.__version?(It.needsLights&&It.lightsStateVersion!==Ze.state.version||It.outputColorSpace!==At||q.isBatchedMesh&&It.batching===!1||!q.isBatchedMesh&&It.batching===!0||q.isBatchedMesh&&It.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&It.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&It.instancing===!1||!q.isInstancedMesh&&It.instancing===!0||q.isSkinnedMesh&&It.skinning===!1||!q.isSkinnedMesh&&It.skinning===!0||q.isInstancedMesh&&It.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&It.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&It.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&It.instancingMorph===!1&&q.morphTexture!==null||It.envMap!==Bt||X.fog===!0&&It.fog!==Et||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==kt.numPlanes||It.numIntersection!==kt.numIntersection)||It.vertexAlphas!==jt||It.vertexTangents!==ie||It.morphTargets!==Ft||It.morphNormals!==fe||It.morphColors!==Ie||It.toneMapping!==Se||It.morphTargetsCount!==He||!!It.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,It.__version=X.version);let un=It.currentProgram;oe===!0&&(un=Dr(X,B,q),I&&X.isNodeMaterial&&I.onUpdateProgram(X,un,It));let En=!1,ni=!1,Fi=!1,ge=un.getUniforms(),Pe=It.uniforms;if(y.useProgram(un.program)&&(En=!0,ni=!0,Fi=!0),X.id!==k&&(k=X.id,ni=!0),It.needsLights){let Me=od(M.state.lightProbeGridArray,q);It.lightProbeGrid!==Me&&(It.lightProbeGrid=Me,ni=!0)}if(En||D!==S){y.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ge.setValue(U,"projectionMatrix",S.projectionMatrix),ge.setValue(U,"viewMatrix",S.matrixWorldInverse);let si=ge.map.cameraPosition;si!==void 0&&si.setValue(U,_t.setFromMatrixPosition(S.matrixWorld)),P.logarithmicDepthBuffer&&ge.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ge.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),D!==S&&(D=S,ni=!0,Fi=!0)}if(It.needsLights&&(Ze.state.sunShadowMap.length>0&&ge.setValue(U,"sunShadowMap",Ze.state.sunShadowMap,tt),Ze.state.directionalShadowMap.length>0&&ge.setValue(U,"directionalShadowMap",Ze.state.directionalShadowMap,tt),Ze.state.spotShadowMap.length>0&&ge.setValue(U,"spotShadowMap",Ze.state.spotShadowMap,tt),Ze.state.pointShadowMap.length>0&&ge.setValue(U,"pointShadowMap",Ze.state.pointShadowMap,tt)),q.isSkinnedMesh){ge.setOptional(U,q,"bindMatrix"),ge.setOptional(U,q,"bindMatrixInverse");let Me=q.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),ge.setValue(U,"boneTexture",Me.boneTexture,tt))}q.isBatchedMesh&&(ge.setOptional(U,q,"batchingTexture"),ge.setValue(U,"batchingTexture",q._matricesTexture,tt),ge.setOptional(U,q,"batchingIdTexture"),ge.setValue(U,"batchingIdTexture",q._indirectTexture,tt),ge.setOptional(U,q,"batchingColorTexture"),q._colorsTexture!==null&&ge.setValue(U,"batchingColorTexture",q._colorsTexture,tt));let ii=K.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&z.update(q,K,un),(ni||It.receiveShadow!==q.receiveShadow)&&(It.receiveShadow=q.receiveShadow,ge.setValue(U,"receiveShadow",q.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&B.environment!==null&&(Pe.envMapIntensity.value=B.environmentIntensity),Pe.dfgLUT!==void 0&&(Pe.dfgLUT.value=T_()),ni){if(ge.setValue(U,"toneMappingExposure",R.toneMappingExposure),It.needsLights&&cd(Pe,Fi),Et&&X.fog===!0&&Vt.refreshFogUniforms(Pe,Et),Vt.refreshMaterialUniforms(Pe,X,J,Y,M.state.transmissionRenderTarget[S.id]),It.needsLights&&It.lightProbeGrid){let Me=It.lightProbeGrid;Pe.probesSH.value=Me.texture,Pe.probesMin.value.copy(Me.boundingBox.min),Pe.probesMax.value.copy(Me.boundingBox.max),Pe.probesResolution.value.copy(Me.resolution)}Ts.upload(U,Bc(It),Pe,tt)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ts.upload(U,Bc(It),Pe,tt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ge.setValue(U,"center",q.center),ge.setValue(U,"modelViewMatrix",q.modelViewMatrix),ge.setValue(U,"normalMatrix",q.normalMatrix),ge.setValue(U,"modelMatrix",q.matrixWorld),X.uniformsGroups!==void 0){let Me=X.uniformsGroups;for(let si=0,Oi=Me.length;si<Oi;si++){let kc=Me[si];lt.update(kc,un),lt.bind(kc,un)}}return un}function cd(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.sunLights.needsUpdate=B,S.sunLightShadows.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function hd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(S,B,K){let X=Z.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Z.get(S.texture).__webglTexture=B,Z.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:K,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){let K=Z.get(S);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,K=0){j=S,V=B,W=K;let X=null,q=!1,Et=!1;if(S){let At=Z.get(S);if(At.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(U.FRAMEBUFFER,At.__webglFramebuffer),H.copy(S.viewport),pt.copy(S.scissor),dt=S.scissorTest,y.viewport(H),y.scissor(pt),y.setScissorTest(dt),k=-1;return}else if(At.__webglFramebuffer===void 0)tt.setupRenderTarget(S);else if(At.__hasExternalTextures)tt.rebindTextures(S,Z.get(S.texture).__webglTexture,Z.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let jt=S.depthTexture;if(At.__boundDepthTexture!==jt){if(jt!==null&&Z.has(jt)&&(S.width!==jt.image.width||S.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");tt.setupDepthRenderbuffer(S)}}let Ut=S.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Et=!0);let Bt=Z.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Bt[B])?X=Bt[B][K]:X=Bt[B],q=!0):S.samples>0&&tt.useMultisampledRTT(S)===!1?X=Z.get(S).__webglMultisampledFramebuffer:Array.isArray(Bt)?X=Bt[K]:X=Bt,H.copy(S.viewport),pt.copy(S.scissor),dt=S.scissorTest}else H.copy(ut).multiplyScalar(J).floor(),pt.copy(gt).multiplyScalar(J).floor(),dt=Ht;if(K!==0&&(X=F),y.bindFramebuffer(U.FRAMEBUFFER,X)&&y.drawBuffers(S,X),y.viewport(H),y.scissor(pt),y.setScissorTest(dt),q){let At=Z.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,At.__webglTexture,K)}else if(Et){let At=B;for(let Ut=0;Ut<S.textures.length;Ut++){let Bt=Z.get(S.textures[Ut]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ut,Bt.__webglTexture,K,At)}}else if(S!==null&&K!==0){let At=Z.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,At.__webglTexture,K)}k=-1};function Vc(S){let B=Z.get(S);return(B.__readFormat!==S.format||B.__readType!==S.type)&&(B.__readFormat=S.format,B.__readType=S.type,B.__formatReadable=P.textureFormatReadable(S.format),B.__typeReadable=P.textureTypeReadable(S.type)),B}this.readRenderTargetPixels=function(S,B,K,X,q,Et,Lt,At=0){if(!(S&&S.isWebGLRenderTarget)){Zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ut=Ut[Lt]),Ut){y.bindFramebuffer(U.FRAMEBUFFER,Ut);try{let Bt=S.textures[At],jt=Bt.format,ie=Bt.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+At);let Ft=Vc(Bt);if(Ft.__formatReadable===!1){Zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ft.__typeReadable===!1){Zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-X&&K>=0&&K<=S.height-q&&U.readPixels(B,K,X,q,bt.convert(jt),bt.convert(ie),Et)}finally{let Bt=j!==null?Z.get(j).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(S,B,K,X,q,Et,Lt,At=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ut=Ut[Lt]),Ut)if(B>=0&&B<=S.width-X&&K>=0&&K<=S.height-q){y.bindFramebuffer(U.FRAMEBUFFER,Ut);let Bt=S.textures[At],jt=Bt.format,ie=Bt.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+At);let Ft=Vc(Bt);if(Ft.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ft.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let fe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,fe),U.bufferData(U.PIXEL_PACK_BUFFER,Et.byteLength,U.STREAM_READ),U.readPixels(B,K,X,q,bt.convert(jt),bt.convert(ie),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Ie=j!==null?Z.get(j).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Ie);let Se=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ou(U,Se,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,fe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Et),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(fe),U.deleteSync(Se),Et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,K=0){let X=Math.pow(2,-K),q=Math.floor(S.image.width*X),Et=Math.floor(S.image.height*X),Lt=B!==null?B.x:0,At=B!==null?B.y:0;tt.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,K,0,0,Lt,At,q,Et),y.unbindTexture()},this.copyTextureToTexture=function(S,B,K=null,X=null,q=0,Et=0){let Lt,At,Ut,Bt,jt,ie,Ft,fe,Ie,Se=S.isCompressedTexture?S.mipmaps[Et]:S.image;if(K!==null)Lt=K.max.x-K.min.x,At=K.max.y-K.min.y,Ut=K.isBox3?K.max.z-K.min.z:1,Bt=K.min.x,jt=K.min.y,ie=K.isBox3?K.min.z:0;else{let Pe=Math.pow(2,-q);Lt=Math.floor(Se.width*Pe),At=Math.floor(Se.height*Pe),S.isDataArrayTexture?Ut=Se.depth:S.isData3DTexture?Ut=Math.floor(Se.depth*Pe):Ut=1,Bt=0,jt=0,ie=0}X!==null?(Ft=X.x,fe=X.y,Ie=X.z):(Ft=0,fe=0,Ie=0);let xe=bt.convert(B.format),He=bt.convert(B.type),It;B.isData3DTexture?(tt.setTexture3D(B,0),It=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(tt.setTexture2DArray(B,0),It=U.TEXTURE_2D_ARRAY):(tt.setTexture2D(B,0),It=U.TEXTURE_2D),y.activeTexture(U.TEXTURE0),y.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),y.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),y.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);let Ze=y.getParameter(U.UNPACK_ROW_LENGTH),oe=y.getParameter(U.UNPACK_IMAGE_HEIGHT),un=y.getParameter(U.UNPACK_SKIP_PIXELS),En=y.getParameter(U.UNPACK_SKIP_ROWS),ni=y.getParameter(U.UNPACK_SKIP_IMAGES);y.pixelStorei(U.UNPACK_ROW_LENGTH,Se.width),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Se.height),y.pixelStorei(U.UNPACK_SKIP_PIXELS,Bt),y.pixelStorei(U.UNPACK_SKIP_ROWS,jt),y.pixelStorei(U.UNPACK_SKIP_IMAGES,ie);let Fi=S.isDataArrayTexture||S.isData3DTexture,ge=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){let Pe=Z.get(S),ii=Z.get(B),Me=Z.get(Pe.__renderTarget),si=Z.get(ii.__renderTarget);y.bindFramebuffer(U.READ_FRAMEBUFFER,Me.__webglFramebuffer),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let Oi=0;Oi<Ut;Oi++)Fi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Z.get(S).__webglTexture,q,ie+Oi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Z.get(B).__webglTexture,Et,Ie+Oi)),U.blitFramebuffer(Bt,jt,Lt,At,Ft,fe,Lt,At,U.DEPTH_BUFFER_BIT,U.NEAREST);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(q!==0||S.isRenderTargetTexture||Z.has(S)){let Pe=Z.get(S),ii=Z.get(B);y.bindFramebuffer(U.READ_FRAMEBUFFER,L),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,O);for(let Me=0;Me<Ut;Me++)Fi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.__webglTexture,q,ie+Me):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pe.__webglTexture,q),ge?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ii.__webglTexture,Et,Ie+Me):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ii.__webglTexture,Et),q!==0?U.blitFramebuffer(Bt,jt,Lt,At,Ft,fe,Lt,At,U.COLOR_BUFFER_BIT,U.NEAREST):ge?U.copyTexSubImage3D(It,Et,Ft,fe,Ie+Me,Bt,jt,Lt,At):U.copyTexSubImage2D(It,Et,Ft,fe,Bt,jt,Lt,At);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ge?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(It,Et,Ft,fe,Ie,Lt,At,Ut,xe,He,Se.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(It,Et,Ft,fe,Ie,Lt,At,Ut,xe,Se.data):U.texSubImage3D(It,Et,Ft,fe,Ie,Lt,At,Ut,xe,He,Se):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Et,Ft,fe,Lt,At,xe,He,Se.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Et,Ft,fe,Se.width,Se.height,xe,Se.data):U.texSubImage2D(U.TEXTURE_2D,Et,Ft,fe,Lt,At,xe,He,Se);y.pixelStorei(U.UNPACK_ROW_LENGTH,Ze),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,oe),y.pixelStorei(U.UNPACK_SKIP_PIXELS,un),y.pixelStorei(U.UNPACK_SKIP_ROWS,En),y.pixelStorei(U.UNPACK_SKIP_IMAGES,ni),Et===0&&B.generateMipmaps&&U.generateMipmap(It),y.unbindTexture()},this.initRenderTarget=function(S){Z.get(S).__webglFramebuffer===void 0&&tt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?tt.setTextureCube(S,0):S.isData3DTexture?tt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?tt.setTexture2DArray(S,0):tt.setTexture2D(S,0),y.unbindTexture()},this.resetState=function(){V=0,W=0,j=null,y.reset(),Rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}};var Rr=class i extends ce{constructor(t,e={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;let n=this,s=e.color!==void 0?new ft(e.color):new ft(8355711),r=e.textureWidth||512,a=e.textureHeight||512,o=e.clipBias||0,l=e.shader||i.ReflectorShader,c=e.multisample!==void 0?e.multisample:4,h=new $e,d=new C,u=new C,p=new C,g=new le,v=new C(0,0,-1),m=new ve,f=new C,b=new C,T=new ve,x=new le,A=new qe(r,a,{samples:c,type:hn}),M=new Ue({name:l.name!==void 0?l.name:"unspecified",uniforms:Bo.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});M.uniforms.tDiffuse.value=A.texture,M.uniforms.color.value=s,M.uniforms.textureMatrix.value=x,this.material=M,this.onBeforeRender=function(E,_,w){let R=this.getReflectionCamera(w);if(u.setFromMatrixPosition(n.matrixWorld),p.setFromMatrixPosition(w.matrixWorld),g.extractRotation(n.matrixWorld),d.set(0,0,1),d.applyMatrix4(g),f.subVectors(u,p),f.dot(d)>0===!0&&this.forceUpdate===!1)return;f.reflect(d).negate(),f.add(u),g.extractRotation(w.matrixWorld),v.set(0,0,-1),v.applyMatrix4(g),v.add(p),b.subVectors(u,v),b.reflect(d).negate(),b.add(u),R.position.copy(f),R.up.set(0,1,0),R.up.applyMatrix4(g),R.up.reflect(d),R.lookAt(b),R.far=w.far,R.updateMatrixWorld(),R.projectionMatrix.copy(w.projectionMatrix),x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),x.multiply(R.projectionMatrix),x.multiply(R.matrixWorldInverse),x.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(d,u),h.applyMatrix4(R.matrixWorldInverse),m.set(h.normal.x,h.normal.y,h.normal.z,h.constant);let I=R.projectionMatrix;R.isOrthographicCamera?(T.x=(Math.sign(m.x)+I.elements[8])/I.elements[0],T.y=(Math.sign(m.y)+I.elements[9])/I.elements[5],T.z=-w.far,T.w=1):(T.x=(Math.sign(m.x)+I.elements[8])/I.elements[0],T.y=(Math.sign(m.y)+I.elements[9])/I.elements[5],T.z=-1,T.w=(1+I.elements[10])/I.elements[14]),m.multiplyScalar(2/m.dot(T)),I.elements[2]=m.x,I.elements[6]=m.y,R.isOrthographicCamera?(I.elements[10]=m.z-o,I.elements[14]=m.w-1):(I.elements[10]=m.z+1-o,I.elements[14]=m.w),n.visible=!1;let F=E.getRenderTarget(),L=E.xr.enabled,O=E.shadowMap.autoUpdate;E.xr.enabled=!1,E.shadowMap.autoUpdate=!1,E.setRenderTarget(A),E.state.buffers.depth.setMask(!0),E.autoClear===!1&&E.clear(),E.render(_,R),E.xr.enabled=L,E.shadowMap.autoUpdate=O,E.setRenderTarget(F);let V=w.viewport;V!==void 0&&E.state.viewport(V),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return A},this.dispose=function(){A.dispose(),n.material.dispose()},this.getReflectionCamera=function(E){let _=this._reflectionCameras.get(E);return _===void 0&&(_=E.clone(),this._reflectionCameras.set(E,_)),_}}};Rr.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Pr=i=>new tn({color:i});function Ui(i,t,e,n=36,s=20,r=0){let a=new _e,o=[],l=new Float32Array((n+1)*(s+1)*3);function c(d=()=>0){for(let u=0;u<=n;u++){let p=u/n*(t.length-1),g=Math.min(t.length-2,Math.floor(p)),v=p-g,m=t[g].map((f,b)=>{let T=t[g+1][b],x=t[Math.max(0,g-1)][b],A=t[Math.min(t.length-1,g+2)][b];return .5*(2*f+(-x+T)*v+(2*x-5*f+4*T-A)*v*v+(-x+3*f-3*T+A)*v*v*v)});m[2]=Math.max(0,m[2]),m[3]=Math.max(0,m[3]);for(let f=0;f<=s;f++){let b=f/s*Math.PI*2,T=1+r*Math.sin(b*13+m[0]*27),x=(u*(s+1)+f)*3;l[x]=m[0],l[x+1]=m[1]+Math.cos(b)*m[2]*T+d(m[0],b),l[x+2]=Math.sin(b)*m[3]*T}}a.attributes.position.needsUpdate=!0,a.computeVertexNormals()}for(let d=0;d<n;d++)for(let u=0;u<s;u++){let p=d*(s+1)+u;o.push(p,p+1,p+s+1,p+1,p+s+2,p+s+1)}a.setAttribute("position",new Qt(l,3)),l=a.attributes.position.array,a.setIndex(o),c();let h=new ce(a,e);return i.add(h),{mesh:h,write:c}}function A_(i,t,e=.2){let n=new hi(new _e().setFromPoints(new Qe(t.map(s=>new C(...s))).getPoints(12)),new zn({color:"#a8ada3",transparent:!0,opacity:e}));return i.add(n),n}function Ac(i,t,e=n=>.075+.13*(1-n)**2){let n=new _e,s=15,r=10,a=new Float32Array((s+1)*(r+1)*3),o=[];n.setAttribute("position",new Qt(a,3)),a=n.attributes.position.array;for(let p=0;p<s;p++)for(let g=0;g<r;g++){let v=p*(r+1)+g;o.push(v,v+1,v+r+1,v+1,v+r+2,v+r+1)}n.setIndex(o);let l=new ce(n,t);i.add(l);let c=new C,h=new C,d=new C(0,0,1),u=new C;return p=>{let g=new Qe(p);for(let v=0;v<=s;v++){let m=v/s,f=g.getPoint(m);g.getTangent(m,u),c.crossVectors(u,d).normalize(),h.crossVectors(u,c).normalize();let b=e(m);for(let T=0;T<=r;T++){let x=T/r*Math.PI*2,A=(v*(r+1)+T)*3;a[A]=f.x+b*(c.x*Math.cos(x)+h.x*Math.sin(x)),a[A+1]=f.y+b*(c.y*Math.cos(x)+h.y*Math.sin(x)),a[A+2]=f.z+b*(c.z*Math.cos(x)+h.z*Math.sin(x))}}n.attributes.position.needsUpdate=!0,n.computeVertexNormals()}}function Xu(){let i=new ae,t=Pr("#272e2c"),e=Pr("#343836"),n=Ui(i,[[-1.5,1.27,0,0],[-1.28,1.34,.42,.38],[-.93,1.35,.56,.43],[-.45,1.4,.46,.37],[.05,1.4,.43,.36],[.55,1.41,.54,.4],[.95,1.48,.52,.37],[1.2,1.56,.25,.25],[1.29,1.58,0,0]],t,56,24,.017),s=new ae;i.add(s);let r=Ac(i,t,g=>.29-.07*g);Ui(s,[[-.48,-.3,0,0],[-.34,-.2,.41,.37],[-.1,-.16,.48,.39],[.16,-.12,.39,.34],[.31,-.06,.27,.24],[.43,-.08,.13,.16],[.49,-.1,0,0]],t,40,24,.02),Ui(s,[[-.3,.035,0,0],[-.19,.09,.26,.27],[.03,.09,.28,.29],[.22,.04,.21,.24],[.4,-.07,.1,.16],[.48,-.1,0,0]],t,30,20,.006);let a=[],o=[];for(let g of[-1,1]){let v=new ln;v.moveTo(-.145,0),v.quadraticCurveTo(-.13,.14,-.08,.28),v.quadraticCurveTo(-.055,.3,-.015,.25),v.quadraticCurveTo(.045,.16,.13,.02),v.closePath();let m=new ce(new Vn(v,{depth:.055,bevelEnabled:!0,bevelThickness:.02,bevelSize:.025,bevelSegments:2,steps:1}),t);m.position.set(-.13,.25,g*.23),m.rotation.set(g*.27,g*.12,-.18),s.add(m),o.push(m);let f=new ce(new Vn(v,{depth:.005,bevelEnabled:!1}),e);f.scale.set(.61,.64,.3),f.position.set(.008,.045,g>0?.067:-.018),m.add(f);let b=new ae;b.position.set(.205,.065,g*.237),b.rotation.y=g*.22,s.add(b);let T=new ln;T.moveTo(-.068,0),T.quadraticCurveTo(0,.045,.067,.012),T.quadraticCurveTo(.01,-.042,-.068,0);let x=new ce(new Vn(T,{depth:.007,bevelEnabled:!1}),Pr("#889387"));b.add(x),Ui(b,[[-.009,0,0,0],[-.006,0,.033,.007],[.006,0,.031,.007],[.01,0,0,0]],Pr("#141b19"),6,8).mesh.position.set(.018,0,g*.012),Ui(b,[[-.005,0,0,0],[0,0,.008,.006],[.005,0,0,0]],new Ce({color:"#c2c9b7"}),4,6).mesh.position.set(.029,.018,g*.02),a.push(b);for(let E=0;E<4;E++)A_(s,[[.34,-.12,g*.15],[.48,-.1-E*.025,g*.36],[.59,-.08-E*.057,g*.6]],.13)}Ui(s,[[.43,-.1,0,0],[.46,-.105,.029,.058],[.49,-.11,0,0]],Pr("#1b211f"),8,10);let l=[[-1.02,-.29,0,!0],[.83,-.29,.23,!1],[-1.02,.29,.5,!0],[.83,.29,.73,!1]].map(([g,v,m,f])=>{let b=Ui(i,[[-.18,0,0,0],[-.1,.06,.073,.115],[.06,.065,.08,.12],[.22,.055,.04,.075],[.24,.05,0,0]],t,15,12);return{x:g,z:v,phase:m,hind:f,skin:Ac(i,t),paw:b.mesh,planted:null,lift:null,stance:!1}}),c=[new C(-1.27,1.43,0),new C(-1.8,1.4,.1),new C(-2.38,1.72,.14),new C(-2.66,2.2,.05)],h=Ac(i,t,g=>.006+.16*(1-g)**.65),d=new C(.47,-.19,0),u=-1/0;function p({phase:g=0,moving:v=0,lower:m=0,s:f=0,tailUp:b=0,attention:T=0}){let x=Math.abs(f-u)>.3;u=f;let A=Math.sin(g*Math.PI*2),M=Math.sin(f*1.7)*.008;n.write(_=>M+v*.035*Math.sin(g*Math.PI*2-_*2)),s.position.set(1.25+m*.42,1.91-m*1.3+v*A*.025,0),s.rotation.set(0,Math.sin(f*.63)*.027,-m*.35+T*.3),r([new C(.84,1.47,0),new C(1.1,1.65-m*.5,0),s.position.clone().add(new C(-.23,-.19,0))]);let E=Math.max(0,1-Math.abs(f%8.1-5.3)/.15);a.forEach(_=>_.scale.y=1-E*.94),o.forEach((_,w)=>{_.rotation.z=-.18+Math.sin(f*.6+w*2)*.035,_.rotation.y=(w?1:-1)*(.12+T*.14)}),i.updateMatrixWorld(!0);for(let _ of l){let w=((g+_.phase)%1+1)%1,R=w<.69,N=i.localToWorld(new C(_.x+.28,.06,_.z));(x||!_.planted||R&&!_.stance)&&(_.planted=N.clone()),!R&&_.stance&&(_.lift=_.planted.clone());let I;if(R)I=i.worldToLocal(_.planted.clone()),(Math.abs(I.x-_.x)>.85||Math.abs(I.z-_.z)>.48)&&(_.planted=N.clone(),I=i.worldToLocal(N.clone()));else{let V=(w-.69)/.31,W=V*V*(3-2*V);I=i.worldToLocal((_.lift||N).clone().lerp(N,W)),I.y+=Math.sin(V*Math.PI)*.17*v}v||(I.set(_.x,.06,_.z),_.planted=i.localToWorld(I.clone()));let F=new C(_.x,1.38+v*Math.sin((g+_.phase)*Math.PI*2)*.045,_.z*.8),L=F.clone().lerp(I,.43).add(new C(_.hind?.23:-.1,0,0)),O=I.clone().add(new C(_.hind?-.18:-.01,.3,0));_.skin([F,L,O,I]),_.paw.position.copy(I),_.stance=R}c[1].set(-1.8,1.42+b*.5,Math.sin(f*.65)*.07),c[2].set(-2.35,1.68+b*.7,.1+Math.sin(f*.65-.5)*.14),c[3].set(-2.58,2.08+b*.5,.08+Math.sin(f*.65-.9)*.17),h(c)}return{root:i,head:s,mouth:d,pose:p}}var sn={skyTop:"#c3c7c1",skyLow:"#c9c6bd",fog:"#c9c6bd",mass:"#66706b",woods:"#68736d",ground:"#717b75",water:"#7d8781",near:"#2f3935",lamp:"#ecd3a0",green:"#a7c9a0",swan:"#dcdad2"},Cc=(i=>()=>(i=i*16807%2147483647)/2147483647)(7),Ct=(i,t)=>i+(t-i)*Cc(),Cs=i=>Math.max(0,Math.min(1,i)),he=(i,t,e)=>{let n=Cs((i-t)/(e-t));return n*n*(3-2*n)};function Rc(i,t=sn.skyTop,e=sn.skyLow){let n=new Ue({side:ke,depthWrite:!1,fog:!1,uniforms:{top:{value:new ft(t)},low:{value:new ft(e)}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 low; varying vec3 vP; void main(){ float t = smoothstep(-0.02, 0.45, vP.y); gl_FragColor = vec4(mix(low, top, t), 1.0);
#include <colorspace_fragment>
}`}),s=new ce(new Te(900,24,16),n);return i.add(s),s}function td(i,t=900,e=sn.water){let n={name:"ShadowWater",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null},uTime:{value:0},uTint:{value:new ft(e)},uFog:{value:new ft(sn.fog)},uCam:{value:new C}},vertexShader:`uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW;
      void main(){ vUv = textureMatrix * vec4(position,1.0); vW = (modelMatrix * vec4(position,1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform sampler2D tDiffuse; uniform float uTime; uniform vec3 uTint; uniform vec3 uFog; uniform vec3 uCam;
      varying vec4 vUv; varying vec3 vW;
      void main(){
        vec4 uv = vUv;
        float w = sin(vW.z * 1.1 + uTime * 1.2) * 0.6 + sin(vW.z * 2.7 - uTime * 0.8 + vW.x * 0.15) * 0.4;
        uv.x += w * 0.010 * uv.w; uv.y += w * 0.004 * uv.w;
        vec3 refl = texture2DProj(tDiffuse, uv).rgb;
        float d = length(vW - uCam);
        float glint = 0.0 * smoothstep(0.82, 1.0, sin(vW.x * 0.9 + uTime * 0.5) * sin(vW.z * 3.1 + uTime * 0.9)) * smoothstep(140.0, 40.0, d) * 0.25;
        vec3 c = mix(uTint, refl, 0.58) + glint;
        c = mix(c, uFog, smoothstep(40.0, 300.0, d) * 0.9);
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`},s=new Rr(new Ne(t,t),{shader:n,textureWidth:1024,textureHeight:576,clipBias:.003,multisample:0});return s.rotation.x=-Math.PI/2,i.add(s),s}var Jt=(i,t={})=>new tn({color:new ft(i),...t});function Q(i,t,e,n,s,r,a=1,o=1,l=1){let c=new ce(t,e);return c.position.set(n,s,r),c.scale.set(a,o,l),i.add(c),c}function Pc(i,t,e=sn.woods){let n=Jt(e),s=new Te(1,14,10);for(let[r,a,o]of t){let l=2+Math.floor(Cc()*3);for(let c=0;c<l;c++)Q(i,s,n,r+Ct(-o,o),o*Ct(.35,.6),a+Ct(-o,o)*.6,o*Ct(1,1.5),o*Ct(.6,.85),o*Ct(.8,1.2))}}function qu(i,t,e,n=9,s=900,r=[8,22]){let a=new Ce({color:new ft(e)}),o=new Te(1,18,10);for(let l=0;l<n;l++)Q(i,o,a,-s/2+(l+Ct(0,1))*s/n,0,t+Ct(-30,30),Ct(60,120),Ct(...r),Ct(30,60))}function Ir(i="#e2dfd6"){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,i),n.addColorStop(1,"rgba(226,223,214,0)"),e.fillStyle=n,e.fillRect(0,0,128,128);let s=new bn(t);return s.colorSpace=we,s}function qo(i,t,e=.32){let n=Ir();return t.map(([s,r,a,o,l])=>{let c=new Qn(new Bn({map:n,transparent:!0,opacity:e,depthWrite:!1,fog:!0}));return c.position.set(s,r,a),c.scale.set(o,l,1),c.userData.x0=s,c.userData.speed=Ct(.3,.8),c.userData.phase=Ct(0,6),i.add(c),c})}function E_(i,t,e,n,s,r,a=sn.near){let o=new Ce({color:new ft(a),side:Ae,fog:!1}),l=[];for(let c=0;c<r;c++){let h=Ss.degToRad(Ct(n,s)),d=e+Ct(-4,4),u=Ct(2.2,6),p=new ti(.045,u,3,1,!0);p.translate(0,u/2,0);let g=new ce(p,o);g.position.set(t.x+Math.sin(h)*d,-.2,t.z+Math.cos(h)*d),g.rotation.z=Ct(-.12,.12),g.userData={base:g.rotation.z,amp:Ct(.02,.05),speed:Ct(.6,1.2),phase:Ct(0,6)},i.add(g),l.push(g)}return l}function Ec(i,t,e=sn.lamp,n=[.35,.6]){let s=new Ne(...n);return t.map(([r,a,o],l)=>{let c=new Ce({color:new ft(e),transparent:!0,opacity:.6,fog:!1}),h=Q(i,s,c,r,a,o);return h.userData={speed:.25+l*.05,phase:l*1.7},h})}function ed(i,t,e=3){let n=new _e;n.setAttribute("position",new Qt([-.5,.15,0,0,0,0,0,0,0,.5,.15,0],3));let s=new zn({color:new ft("#4b5450")});return Array.from({length:e},(r,a)=>{let o=new ds(n,s);return o.userData={r:Ct(8,16),h:t.y+Ct(4,10),speed:Ct(.12,.2)*(a%2?1:-1),phase:Ct(0,6),centre:t},i.add(o),o})}function C_(i){i.fog=new Un(sn.fog,40,300),Rc(i),i.add(new fn(new ft("#d6d3ca"),new ft("#59625d"),1.5));let t=new pn(new ft("#efe0c8"),.55);t.position.set(-60,30,-120),i.add(t);let e=td(i);qu(i,-330,"#8a938d",10,1100,[10,22]),qu(i,-200,"#7a847e",8,800,[4,9]),Q(i,new Re(900,1,292),Jt(sn.ground),0,-.3,-122);let n=new ae,s=Jt(sn.mass),r=Jt("#56615c"),a=new Re(1,1,1);Q(n,a,s,-23,2.9,-4.5,26,5.8,9),Q(n,a,s,23,2.9,-4.5,26,5.8,9),Q(n,a,s,0,4.6,-6,20,9.2,13);let o=Q(n,new se(1,1,1,3),s,0,9.9,-.6,7.4,1.4,1.6);o.rotation.set(Math.PI/2,0,Math.PI/2),o.scale.set(1.3,13.5,.75),Q(n,new se(3.3,3.4,3.2,16),s,0,10.8,-6),Q(n,new Te(3.35,24,12,0,Math.PI*2,0,Math.PI/2),r,0,12.4,-6,1,1.18,1);let l=n.children[n.children.length-1],c=new ae;c.position.set(0,12.4,-6),c.scale.set(1,1.18,1),c.visible=!1,n.add(c),Q(c,new Te(3.35,24,12,Math.PI/2+.55,Math.PI*2-1.1,.5,Math.PI/2-.5),r,0,0,0),Q(c,new Te(3.2,20,10,0,Math.PI*2,.5,Math.PI/2-.5),new tn({color:new ft("#2b312e"),side:ke}),0,0,0);let h=[],d=(at,ht)=>(at.userData.fall={at:ht,y:at.position.y,h:at.scale.y*(at.geometry.parameters.height||1),tilt:Ct(-.5,.5)},h.push(at),at);d(Q(n,new se(.75,.8,1.6,10),s,0,16.6,-6),17),d(Q(n,new Te(.8,12,8,0,Math.PI*2,0,Math.PI/2),r,0,17.4,-6),16.6),d(Q(n,new se(.06,.06,1.8,4),r,0,18.6,-6),16.2);for(let at of[-33,-31.6,-25,-17,-15.6,15.6,17,25,31.6,33])d(Q(n,a,s,at,6.6,-6,.7,1.8,.7),Ct(5,22));for(let at of[-8.6,-7.3,7.3,8.6])d(Q(n,a,s,at,10.2,-9,.7,2.2,.7),Ct(8,21));Q(n,new se(1.1,1.1,1.2,12),s,32,6.4,-4.5),Q(n,new Te(1.1,12,8,0,Math.PI*2,0,Math.PI/2),r,32,7,-4.5,1,1.2,1);for(let at of[-34,-28,-20,-12,-6.8,6.8,12,20,28,34])d(Q(n,a,s,at,6.2,-.3,.3,.8,.3),Ct(4,20));let u=[],p=Jt("#4b564f"),g=new Te(1,8,6);for(let[at,ht,Dt,Y]of[[-31,.1,5,5],[-22.5,.1,3.5,9],[-13,.1,4.6,7],[11.5,.1,3.2,12],[21,.1,5.2,6],[33.5,.1,4,10],[-8.5,1,7.5,8],[6.8,1,8.4,11],[-2,1,4.5,15]])for(let J=0;J<14;J++){let ct=J/13,Nt=Ct(.35,.7)*(1-ct*.4),ut=Q(n,g,p,at+Ct(-1.1,1.1)*(1-ct*.5),ct*Dt+.3,ht,Nt,Nt*.8,.25);ut.userData={r:Nt,at:Y+ct*7},ut.scale.setScalar(.001),u.push(ut)}let v=new ae;Q(v,a,s,0,2.7,0,4.6,5.4,8);let m=new ln;m.moveTo(-2.5,0),m.lineTo(0,2.6),m.lineTo(2.5,0),m.lineTo(-2.5,0),Q(v,new Vn(m,{depth:8.2,bevelEnabled:!1}),r,0,5.4,-4.1),Q(v,a,s,0,8.9,4.1,.16,1.7,.16),Q(v,a,s,0,9.25,4.1,.9,.16,.16);let f=Ec(v,[[0,2.9,4.05]],"#e8b088",[.5,1.5])[0];v.position.set(-41.5,.2,-4),i.add(v),n.position.y=.2,i.add(n);let b=Ec(n,[[-3.4,3,.55],[-1.2,3,.55],[1.2,3,.55],[3.4,3,.55],[-18,2.4,.05],[14,2.4,.05],[0,7,.55]]);Pc(i,[[-56,-8,4],[-66,-16,5],[-80,-6,4],[-46,-26,5],[54,-8,4],[66,-18,5],[80,-8,4],[46,-28,5],[-104,-20,6],[104,-22,6],[-22,-32,5],[22,-34,5],[-4,-46,6],[-140,-40,8],[140,-44,8],[-180,-70,10],[180,-70,10]]);let T=qo(i,[[-30,1.2,8,60,3],[30,1,4,70,3.5],[0,1.6,-2,90,4],[-60,1.4,-10,80,4],[60,1.2,14,50,2.5]]),x=R_(i,0,12.5),A=new Qe([new C(-150,0,19),new C(-95,0,20.5),new C(-55,0,20),new C(-28,0,17.5),new C(-14,0,15.6),new C(-9.5,0,15.2)]);Q(i,nd(A.getSpacedPoints(80),[[-1.3,.24],[1.3,.24]]),Jt("#8d938b",{side:Ae}),0,0,0);let M=P_();i.add(M.group);let E=new Qe([new C(4.5,0,3.4),new C(-2,0,3.6),new C(-7.4,0,7.2),new C(-8.6,0,13.2),new C(-5.6,0,19.4),new C(.5,0,21),new C(6.6,0,18.6),new C(8.8,0,12.4),new C(6.4,0,6.6),new C(.5,0,4.2),new C(-6.5,0,6.4),new C(-11.5,0,13.6),new C(-16,0,15.8),new C(-28,0,17.5),new C(-55,0,20),new C(-95,0,20.5),new C(-150,0,19)]),_=at=>.12*he(at,2,8)+.22*he(at,4,16)+.66*he(at,13,22),w=I_(i,E,_),R={},N=new ft(sn.mass),I=new ft(sn.mass),F=new ft("#5c6560"),L=new ln;L.moveTo(-90,2),L.bezierCurveTo(-62,-3,-40,0,-24,-7),L.bezierCurveTo(-12,-12,-6,-24,-3,-64),L.lineTo(-90,-64),L.lineTo(-90,2);let O=Q(i,new ms(L,32),Jt("#68726b"),0,.3,74);O.rotation.x=-Math.PI/2;let V=[],W=new Ce({color:new ft("#46504a"),side:Ae});for(let at=0;at<90;at++){let ht=Ct(.5,1.5),Dt=new ti(.05,ht,3,1,!0);Dt.translate(0,ht/2,0);let Y=Ct(-48,-10),J=74+Ct(3,24)+Math.max(0,Y+24)*1.6,ct=Q(i,Dt,W,Y,.3,J);ct.rotation.z=Ct(-.2,.2),ct.userData={base:ct.rotation.z,phase:Ct(0,6)},V.push(ct)}let j=L_();j.position.set(-18,.3,88),j.rotation.y=.2,i.add(j);let k=new Ce({color:new ft(sn.swan),fog:!0}),D=new ae;[0,1.4].forEach(at=>Q(D,new Te(.35,8,6),k,at,.18,0,1.4,.5,.7)),D.position.set(20,0,26),i.add(D),D_(i,24,52);let H=new C(0,6.5,-4),pt=E_(i,new C(-4,0,178),96,-30,-6,26),dt=ed(i,new C(0,14,-6));return{target:H,radius:165,height:4.2,fov:23,water:e,still:28,motion:R,tick(at,ht,Dt,Y={x:0,y:0}){let J=_(ht),ct=(_(ht+.025)-_(Math.max(0,ht-.025)))/.05;w.tick(ht,J,ct,Y),Object.assign(R,{distance:J*E.getLength(),speed:ct*E.getLength(),x:M.group.position.x/70,moving:J>0&&J<.995});let Nt=J*E.getLength(),ut=(Math.sin(Nt*3.7)+.4*Math.sin(Nt*8.3))*.012*Math.min(1,ct*28);M.group.position.copy(E.getPointAt(J)).setY(.24+ut),M.group.rotation.x=Math.sin(Nt*2.1)*.009*Math.min(1,ct*28),M.group.position.z+=Y.x*.15*Math.sin(J*Math.PI);let gt=E.getTangentAt(J);M.group.rotation.y=Math.atan2(-gt.z,gt.x),M.group.visible=J<.995;for(let $ of M.wheels)$.rotation.z=-J*E.getLength()/(.36*1.5);for(let $ of h){let st=$.userData.fall,ot=he(ht,st.at,st.at+1.8);$.position.y=st.y-ot*(st.h+.8),$.rotation.z=st.tilt*ot,$.visible=ot<1}let Ht=ht>17.2;l.visible=!Ht,c.visible=Ht;for(let $ of u)$.scale.set($.userData.r,$.userData.r*.8,.25).multiplyScalar(Math.max(.001,he(ht,$.userData.at,$.userData.at+2.5)));s.color.copy(I).lerp(F,he(ht,3,26));let et=1-he(ht,6,22);b.forEach(($,st)=>{$.visible=he(ht,6+st*2.2,7+st*2.2)<1}),f.material.opacity=.55+.25*he(ht,10,24)+Math.sin(ht*2.3)*.04+Math.sin(ht*5.1)*.02,x.tick(ht,1-he(ht,15,22)),D.position.set(20-ht*.22,0,26+Math.sin(ht*.1)*.6);for(let $ of V)$.rotation.z=$.userData.base+Math.sin(ht*.9+$.userData.phase+$.position.x*.1)*.06+Y.x*.035;e.material.uniforms.uTime.value=at;for(let $ of b)$.material.opacity=.45+.35*Math.sin(at*$.userData.speed+$.userData.phase)**2;for(let $ of T)$.position.x=$.userData.x0+Math.sin(at*.05*$.userData.speed+$.userData.phase)*12+Y.x*2;for(let $ of pt)$.rotation.z=$.userData.base+Math.sin(at*$.userData.speed+$.userData.phase)*$.userData.amp;for(let $ of dt){let st=$.userData,ot=at*st.speed+st.phase;$.position.set(st.centre.x+Math.cos(ot)*st.r,st.h+Math.sin(ot*2)*.6,st.centre.z+Math.sin(ot)*st.r*.6),$.scale.y=1+Math.sin(at*9+st.phase)*.8}},camUniform:e.material.uniforms.uCam}}function R_(i,t,e){let n=Jt("#77807a"),s=new ae;Q(s,new se(5.6,5.8,.7,40),n,0,.55,0),Q(s,new se(5.2,5.2,.1,40),new Ce({color:new ft("#a6aea8")}),0,.86,0),Q(s,new se(1.1,1.5,2.2,12),n,0,1.7,0),Q(s,new se(.42,.55,1.5,8),n,0,3.4,0),Q(s,new Te(1.15,16,12),n,0,5,0);for(let o of[0,1.57,3.14,4.71])Q(s,new Te(.5,8,6),n,Math.cos(o)*2.4,1.2,Math.sin(o)*2.4,1,.7,1);s.position.set(t,0,e),i.add(s);let r=Ir("#e9ece6"),a=Array.from({length:46},(o,l)=>{let c=new Qn(new Bn({map:r,transparent:!0,opacity:0,depthWrite:!1}));return c.userData={phase:l/46,a:l*2.4,jet:l%5},i.add(c),c});return{tick(o,l=1){for(let c of a){let h=c.userData,d=(o*.55+h.phase)%1;if(h.jet===0)c.position.set(t+Math.cos(h.a)*d*1.2,6.2+d*3.4-d*d*3.2,e+Math.sin(h.a)*d*.9);else{let u=h.jet*1.57+.78,p=1.6+d*2.8;c.position.set(t+Math.cos(u)*p,1.4+d*2.6-d*d*2.7,e+Math.sin(u)*p)}c.scale.setScalar(.5+d*.9),c.material.opacity=.34*Math.sin(d*Math.PI)*l}}}}function P_(){let i=new ae,t=Jt("#28302d"),e=Jt("#47504b"),n=new Re(1,1,1),s=new ln;s.moveTo(-1.42,.38),s.lineTo(1.43,.38),s.lineTo(1.43,.84),s.quadraticCurveTo(.7,.95,.11,.9),s.lineTo(-.03,.59),s.lineTo(-.63,.59),s.quadraticCurveTo(-.8,1.04,-1.29,.94),s.closePath();let r=new Vn(s,{depth:.78,bevelEnabled:!0,bevelThickness:.045,bevelSize:.045,bevelSegments:3,steps:1});Q(i,r,t,0,0,-.39),Q(i,n,e,1.44,.65,0,.045,.46,.61);for(let l of[-.41,.41]){let c=Xo([new C(.05,.89,l),new C(-.08,1.35,l)],"#66726b");i.add(c);let h=[];for(let d=0;d<=18;d++){let u=d/18*Math.PI;h.push(new C(-.86+Math.cos(u)*.49,.4+Math.sin(u)*.48,l*1.25))}i.add(new ce(new gs(new Qe(h),18,.055,6,!1),t))}let a=Q(i,new Ne(.8,.43),new Ce({color:"#a3b2aa",transparent:!0,opacity:.17,side:Ae}),-.015,1.12,0);a.rotation.y=Math.PI/2,a.rotation.x=.2,Q(i,n,e,-.68,.76,0,.14,.26,.67).rotation.z=-.1;let o=[];for(let[l,c]of[[.95,.5],[.95,-.5],[-.85,.5],[-.85,-.5]]){let h=new ae;Q(h,new se(.36,.36,.1,18),Jt("#1f2523"),0,0,0).rotation.x=Math.PI/2;for(let d=0;d<4;d++)Q(h,n,e,0,0,Math.sign(c)*.06,.6,.03,.02).rotation.z=d*Math.PI/4;h.position.set(l,.36,c),i.add(h),o.push(h),Q(i,new se(.42,.42,.16,12,1,!0,0,Math.PI),t,l,.4,c).rotation.set(Math.PI/2,0,0)}return i.scale.setScalar(1.5),{group:i,wheels:o}}function I_(i,t,e){let n=[],s=[],r=[];for(let d=0;d<=180;d++){let u=d/180,p=t.getPointAt(u),g=t.getTangentAt(u),v=new C(-g.z,0,g.x);for(let m of[-.73,.73])for(let f of[-.045,.045]){let b=p.clone().addScaledVector(v,m+f);n.push(b.x,.285,b.z),s.push(u)}if(d<180)for(let m of[0,2]){let f=d*4+m;r.push(f,f+4,f+1,f+1,f+4,f+5)}}let o=new _e;o.setAttribute("position",new Qt(n,3)),o.setAttribute("along",new Qt(s,1)),o.setIndex(r);let l={head:{value:0}},c=new Ue({transparent:!0,depthWrite:!1,side:Ae,uniforms:l,vertexShader:"attribute float along; varying float progress; void main(){progress=along;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform float head; varying float progress; void main(){float age=head-progress; float a=smoothstep(0.,.008,age)*(1.-smoothstep(.08,.2,age));gl_FragColor=vec4(.16,.18,.16,a*.23);}"});i.add(new ce(o,c));let h=Ic(i,12,"#b1aea0");return{tick(d,u,p,g){l.head.value=Math.max(0,u-.002);for(let v=0;v<h.length;v++){let m=(d+v*.31)%3.7,f=d-m,b=e(Math.max(0,f)),T=f>2&&b<.995&&p>.001,x=h[v],A=t.getPointAt(b),M=t.getTangentAt(b);x.position.copy(A).addScaledVector(M,-1.5-m*.18),x.position.x+=Math.sin(v*2.4)*m*.22,x.position.z+=Math.cos(v*1.7)*m*.16,x.position.x+=(g?.x||0)*m*.3,x.position.y=.36+m*.22,x.scale.setScalar(.25+m*.7),x.material.opacity=T?Math.sin(m/3.7*Math.PI)*.12*Math.min(1,p*25):0}}}}function L_(){let i=new ae,t=Jt("#5d5950"),e=new Te(1,14,10);Q(i,e,t,0,.42,0,.34,.42,.3),Q(i,e,t,0,.98,.02,.24,.23,.22);for(let n of[-.17,.17])Q(i,e,t,n,1.2,.02,.08,.08,.05),Q(i,e,t,n*1.6,.5,-.1,.1,.2,.1),Q(i,e,t,n*.9,.12,-.25,.12,.1,.2);return i.scale.setScalar(.85),i}function D_(i,t,e){let n=new ae,s=Jt(sn.near);Q(n,new Te(1,14,6,0,Math.PI*2,Math.PI/2,Math.PI/2),s,0,.25,0,.9,.4,2.4);let r=Q(n,new Re(.06,.06,3.2),s,0,.5,0);return r.rotation.y=1.3,n.position.set(t,0,e),i.add(n),n}function N_(){let i=document.createElement("canvas");i.width=i.height=512;let t=i.getContext("2d"),e=(r=>()=>(r=r*16807%2147483647)/2147483647)(17),n=t.createRadialGradient(256,256,90,256,256,360);n.addColorStop(0,"rgba(196,190,174,.03)"),n.addColorStop(1,"rgba(196,190,174,.16)"),t.fillStyle=n,t.fillRect(0,0,512,512);for(let r=0;r<420;r++)t.fillStyle=`rgba(210,205,190,${e()*.1})`,t.fillRect(e()*512,e()*512,1+e(),1+e());for(let r=0;r<12;r++){let a=e()*512,o=e()*512,l=1.5+e()*2.5;t.strokeStyle="rgba(220,214,198,.12)",t.lineWidth=1,t.beginPath(),t.ellipse(a,o,l,l*1.3,0,0,7),t.stroke()}let s=new bn(i);return s.colorSpace=we,s}function U_(i){let t=new ae,e=Jt(i),n=new Te(1,14,10),s=Q(t,new se(.24,.2,1.25,12),e,0,.85,0);Q(t,new se(.2,.27,.5,12),e,0,1.6,0),Q(t,n,e,0,1.98,0,.13,.15,.14),Q(t,n,e,-.08,2.05,0,.1,.09,.09);let r=[-1,1].map(o=>Q(t,new se(.05,.04,.3,6),e,0,.15,o*.07)),a=new ae;return a.position.set(0,1.7,.26),t.add(a),Q(a,new se(.045,.04,.62,6),e,0,-.31,0),Q(a,new se(.075,.075,.3,10),Jt("#6a5e4c"),0,-.7,0),{group:t,legs:r,arm:a,dress:s}}function F_(i){i.background=new ft("#1d2423"),i.fog=new Un("#1d2423",12,70),i.add(new fn(new ft("#5d6b67"),new ft("#121716"),.7));let t=new ft("#ddc8a6"),e=new Ri(t,120,26,1.6);e.position.set(3.2,6.6,-14),i.add(e);let n=td(i,300,"#2a3231");n.material.uniforms.uFog.value.set("#1d2423");let s=Jt("#2e3735"),r=new Re(1,1,1);for(let M=0;M<9;M++){let E=-M*12;Q(i,r,s,-8.5,10,E,5,20+M%3*3,11.6),Q(i,r,s,8.5,10,E-5,5,20+(M+1)%3*3,11.6)}Ec(i,[[-5.95,7.5,-8],[5.95,10.5,-25],[-5.95,4.6,-33],[5.95,6,-52],[-5.95,9,-61]],"#bdae94",[1.1,1.6]).forEach((M,E)=>{M.rotation.y=E%2?-Math.PI/2:Math.PI/2,M.material.opacity=.32}),Q(i,r,Jt("#1f2625"),5.4,7.1,-14,1.6,.12,.12);let o=new Qn(new Bn({map:Ir("#e9d9bd"),transparent:!0,opacity:.7,depthWrite:!1}));o.position.copy(e.position),o.scale.set(2.6,2.6,1),i.add(o);let l=300,c=[];for(let M=0;M<l;M++)c.push([3.2+Ct(-1,1)*Ct(1,4.5),Ct(0,9),-14+Ct(-1,1)*Ct(1,6),Ct(.85,1.15)]);let h=new _e;h.setAttribute("position",new Qt(new Float32Array(l*6),3));let d=h.attributes.position.array,u=new Float32Array(l*6);c.forEach(([M,,E],_)=>{let w=Math.max(0,1-Math.hypot(M-3.2,E+14)/5.5)**1.6;u.set([w,w*.92,w*.78,w*.4,w*.37,w*.3],_*6)}),h.setAttribute("color",new Qt(u,3));let p=new ds(h,new zn({vertexColors:!0,transparent:!0,opacity:.45,fog:!1,blending:_r,depthWrite:!1}));p.frustumCulled=!1,i.add(p);let g=Array.from({length:14},(M,E)=>{let _=Q(i,new se(1,1,.01,20,1,!0),new Ce({color:new ft("#c9b48d"),transparent:!0,opacity:0,side:Ae}),0,.03,0);return _.userData={x:Ct(-2,5.5),z:Ct(-18,-9),phase:E/14},_});for(let[M,E,_,w]of[[-5.3,8.5,-11,"#7b625d"],[5.3,11,-30,"#5f6f68"],[-5.3,9.5,-46,"#7d705f"]])Q(i,r,Jt("#1d2322"),M,E,_,.3,4.2,1.3),Q(i,r,new Ce({color:new ft(w),transparent:!0,opacity:.42}),M+(M<0?.17:-.17),E,_,.02,3.8,1.1);let v=U_("#2a2e2e");i.add(v.group);let m=new ce(new Ne(1,1),new Ce({map:N_(),transparent:!0,depthWrite:!1,fog:!1}));i.add(m);let f=new Qn(new Bn({map:Ir("#e4ddc9"),transparent:!0,opacity:.5,depthWrite:!1,fog:!1}));i.add(f);let b=qo(i,[[1,1.2,-20,26,3],[0,2,-40,34,5]],.12),T=new C,x={},A=0;return{target:new C(.8,4,-22),radius:30,height:3.4,fov:34,yaw:12,pitch:[2,7],water:n,still:16,motion:x,tick(M,E,_,w={x:0,y:0}){A=E,n.material.uniforms.uTime.value=M*.6+E*.25,e.intensity=120+Math.sin(E*13.1)*2+Math.sin(E*3.7)*3;for(let F=0;F<l;F++){let[L,O,V,W]=c[F],j=9-(9-O+E*7*W)%9;d.set([L+w.x*.2,j,V,L-.02+w.x*.3,j-.32,V],F*6)}h.attributes.position.needsUpdate=!0;for(let F of g){let L=F.userData,O=(E*.7+L.phase)%1;F.position.set(L.x+Math.floor(E*.7+L.phase)*1.7%5,.03,L.z),F.scale.set(.05+O*.45,1,.05+O*.45),F.material.opacity=.35*(1-O)}let R=Cs((E-1.5)/13),N=R*R*(3-2*R)*.7+R*.3;v.group.position.set(Yu(6.4,-1.5,N),0,Yu(-9,-24,N)),v.group.rotation.y=Math.atan2(15,-1.5-6.4)*-1+Math.PI/2*0,v.group.lookAt(v.group.position.x-7.9,0,v.group.position.z-15),v.group.visible=E>1.4&&R<1;let I=Math.sin(E*5.2);Object.assign(x,{rain:.5,phase:E*5.2/(Math.PI*2),moving:v.group.visible?1:0,x:v.group.position.x/8}),v.legs[0].position.x=I*.06,v.legs[1].position.x=-I*.06,v.dress.rotation.z=I*.03,v.arm.rotation.z=Math.sin(E*5.2+1)*.08;for(let F of b)F.position.x=F.userData.x0+Math.sin(E*.05+F.userData.phase)*2},camUniform:{value:{copy(M){T.copy(M),m.position.copy(M).lerp(new C(.8,4,-22),.055),m.lookAt(M);let E=m.position.distanceTo(M);m.scale.set(E*1.6,E*.95,1),f.position.copy(m.position).add(new C(.3*E*.1,(.12-A*.02%.3)*E,0)),f.scale.set(E*.012,E*.02,1),n.material.uniforms.uCam.value.copy(M)}}}}}var Yu=(i,t,e)=>i+(t-i)*e;function nn(i,t=!0,e=!0){return i.traverse(n=>{n.isMesh&&(n.castShadow=t,n.receiveShadow=e)}),i}function nd(i,t){let e=[],n=[],s=i.length,r=t.length;for(let o=0;o<s;o++){let l=i[o],c=i[Math.min(s-1,o+1)],h=i[Math.max(0,o-1)],d=c.x-h.x,u=c.z-h.z,p=Math.hypot(d,u)||1,g=-u/p,v=d/p;for(let[m,f]of t)e.push(l.x+g*m,f,l.z+v*m)}for(let o=0;o<s-1;o++)for(let l=0;l<r-1;l++){let c=o*r+l,h=c+1,d=c+r,u=d+1;n.push(c,d,h,h,d,u)}let a=new _e;return a.setAttribute("position",new Qt(e,3)),a.setIndex(n),a.computeVertexNormals(),a}function Xo(i,t,e=1){let n=new _e().setFromPoints(i);return new hi(n,new zn({color:new ft(t),transparent:e<1,opacity:e}))}function Ic(i,t=18,e="#d8d6ce"){let n=Ir(e);return Array.from({length:t},()=>{let s=new Qn(new Bn({map:n,transparent:!0,opacity:0,depthWrite:!1}));return s.userData.age=99,i.add(s),s})}function O_(i="#2f3633",t=1.7){let e=new ae,n=Jt(i);return Q(e,new se(t*.1,t*.15,t*.62,8),n,0,t*.31,0),Q(e,new Te(t*.085,8,6),n,0,t*.72,0),e}function B_(i){i.fog=new Un("#cbc9c0",25,210),Rc(i,"#cdcec8","#cbc9c0"),i.add(new fn(new ft("#dcd9d0"),new ft("#5a635d"),1.35));let t=new pn(new ft("#efe2cb"),.5);t.position.set(-40,30,60),i.add(t),Q(i,new Ne(1400,1400),Jt("#8e968d"),0,0,0).rotation.x=-Math.PI/2;let e=new Qe([new C(-340,0,-70),new C(-160,0,-30),new C(0,0,-18),new C(160,0,-24),new C(340,0,-62)]),n=e.getSpacedPoints(160);Q(i,nd(n,[[-11,0],[-2.2,6],[2.2,6],[11,0]]),Jt("#5c665f"),0,0,0);let s=(p,g)=>n.map((v,m)=>{let f=n[Math.min(n.length-1,m+1)],b=n[Math.max(0,m-1)],T=f.x-b.x,x=f.z-b.z,A=Math.hypot(T,x);return new C(v.x-x/A*p,g,v.z+T/A*p)});i.add(Xo(s(-.7,6.08),"#3c4440")),i.add(Xo(s(.7,6.08),"#3c4440"));let r=Jt("#3e4642"),a=[];for(let p=.02;p<1;p+=.045){let g=e.getPointAt(p),v=e.getTangentAt(p),m=v.z,f=-v.x,b=g.x+m*2,T=g.z+f*2;Q(i,new se(.09,.12,7,5),r,b,9.5,T),Q(i,new Re(1.6,.1,.1),r,b,12.6,T).rotation.y=Math.atan2(v.x,v.z)+Math.PI/2,a.push(new C(b,12.6,T))}let o=[];for(let p=0;p<a.length-1;p++){let g=a[p],v=a[p+1],m=[];for(let f=0;f<=8;f++){let b=g.clone().lerp(v,f/8);b.y-=Math.sin(Math.PI*f/8)*.7,m.push(b)}o.push(i.add(Xo(m,"#4a524e",.7)).children.at(-1))}let l=O_("#2c3330",1.7),c=e.getPointAt(.53),h=e.getTangentAt(.53),d=new C(-h.z,0,h.x).normalize(),u=p=>p<=2.2?6:Math.max(0,6*(11-p)/8.8);return i.add(l),Pc(i,[[62,2,4],[84,8,5],[104,0,4],[130,12,6]],"#5f6a62"),Q(i,new Re(5,3.2,4),Jt("#646d67"),95,1.6,10),Q(i,new ti(3.6,2.2,4),Jt("#59625c"),95,4.3,10).rotation.y=Math.PI/4,i.rotation.y=.62,{target:new C(-14,4,-4),radius:70,height:2.6,fov:32,yaw:24,pitch:[2,12],still:20,tick(p,g,v,m={x:0,y:0}){o.forEach((x,A)=>{x.position.y=Math.sin(g*.8+A*.7)*.03+m.y*.035,x.position.z=m.x*.06});let f=he(g,1.5,16),b=15-f*14.4,T=f>0&&f<1;l.position.copy(c).addScaledVector(d,b).setY(u(b)+(T?Math.abs(Math.sin(g*3.6))*.06:0)),l.rotation.z=T&&b>2.2?-.18:0}}}var z_=new C(0,1,0),V_=new C(0,0,1);function Zu(i,t,e){let n=new C().subVectors(e,t);i.position.copy(t).add(e).multiplyScalar(.5),i.scale.y=Math.max(.001,n.length()),i.quaternion.setFromUnitVectors(z_,n.normalize())}function Ju(i,t,e,n,s,r){let a=((t+i.phase)%1+1)%1;if(a<s)return[i.x+e*(.5-a/s)*r,0];let o=(a-s)/(1-s),l=o*o*(3-2*o);return[i.x+e*(l-.5)*r,Math.sin(Math.PI*o)*n*r]}function id(i="#7c8880"){let t=new ae,e=new ae,n=new ae;e.position.set(-.6,.1,0),n.position.set(.6,-.1,0),t.add(e),e.add(n);let s=Jt(i),r=Jt("#8c958a"),a=Jt("#263332"),o=new Te(1,20,14);Q(n,o,s,-.22,.62,0,.91,.48,.43);let l=new ae;l.position.set(.46,.65,0),n.add(l),Q(l,o,s,0,0,0,.51,.37,.34),Q(l,o,s,.39,-.12,0,.37,.19,.23),Q(l,o,a,.71,-.12,0,.065,.045,.07);for(let p of[-1,1])Q(l,o,s,-.14,.34,p*.22,.22,.28,.085),Q(l,o,r,-.12,.355,p*.265,.155,.21,.026),Q(l,o,a,.27,.1,p*.285,.065,.07,.038),Q(l,o,Jt("#cedbd4"),.29,.125,p*.313,.018,.019,.014);let c=new ae;c.position.set(-.98,.43,0),n.add(c),c.add(new ce(new gs(new Qe([new C(0,0,0),new C(-.42,-.15,.07),new C(-.82,-.18,.25),new C(-1.07,-.11,.22)]),20,.026,5,!1),s));let h=[[-.58,-.24,.5,1],[.58,-.23,.75,0],[-.58,.28,0,1],[.58,.27,.25,0]].map(([p,g,v,m])=>({x:p,z:g,phase:v,hind:m,upper:Q(n,new se(.06,.075,1,8),s,0,0,0),lower:Q(n,new se(.035,.05,1,8),s,0,0,0),paw:Q(n,o,r,0,0,0,.14,.05,.085)})),d=new C;function u({phase:p=0,moving:g=0,sit:v=0,paws:m="hold",s:f=0,hang:b=0,look:T=0}){e.rotation.z=v*.95-b*.3,l.rotation.z=-v*.55+T;for(let x of h){let A=new C(x.x,.4,x.z),M;if(b>0)M=new C(x.x+.08,.4-.3+Math.sin(f*1.7+x.phase*6)*.02,x.z*.9);else if(!x.hind&&v>.01){let _=m==="groom"?1:0,w=f*7+(x.z>0?0:Math.PI),R=new C(.66+_*(.18+Math.cos(w)*.06),.36+_*(.12+Math.sin(w)*.07),x.z*.45),[N,I]=Ju(x,p,.3,.12,.62,g);M=new C(N,.05+I,x.z).lerp(R,v)}else{let[_,w]=Ju(x,p,.3,.12,.62,g);d.set(_,.05+w,x.z).sub(e.position).applyAxisAngle(V_,-e.rotation.z).sub(n.position),M=d.clone()}let E=A.clone().lerp(M,.52);E.x+=x.hind?.08:-.065,Zu(x.upper,A,E),Zu(x.lower,E,M),x.paw.position.copy(M)}c.rotation.z=Math.sin(f*1.3)*.05*g-b*.9}return{root:t,head:l,inner:n,pose:u,tail:c,legs:h}}function k_(i){i.fog=new Un("#c1bcb0",7,42),Rc(i,"#bcbcb4","#c8c0b1"),i.add(new fn(new ft("#d7d1c3"),new ft("#4d534e"),1.5));let t=new pn(new ft("#f0d9b9"),1.2);t.position.set(14,7,-30),i.add(t);let e=new Ne(160,160,160,80),n=e.attributes.position;for(let w=0;w<n.count;w++)n.setZ(w,Math.sin(n.getX(w)*2.1)*.06+Math.sin(n.getY(w)*.7)*.04);e.computeVertexNormals(),Q(i,e,Jt("#857f70"),0,0,0).rotation.x=-Math.PI/2,Q(i,new Re(200,2.4,1.6),Jt("#6c706a"),0,1.2,-34),Pc(i,[[-14,-40,3],[6,-42,4],[24,-39,3],[-34,-44,5]],"#6a6f69");let s=new ti(.018,.5,3,1,!0);s.translate(0,.25,0);let r=new Ce({color:new ft("#6f6b5d"),side:Ae}),a={value:0};r.onBeforeCompile=w=>{w.uniforms.uBreeze=a,w.vertexShader=`uniform float uBreeze;
`+w.vertexShader,w.vertexShader=w.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
transformed.x += sin(uBreeze*1.4+instanceMatrix[3].x*.4+instanceMatrix[3].z)*position.y*.08;`)};let o=new er(s,r,1100),l=new De,c=0;for(let w=0;w<1100;w++){let R=Ct(-16,14),N=Ct(-24,6);N>-3.2&&N<1.4&&R>-11&&R<4||N>1.4&&Math.abs(R-.4)<1+(N-1.4)*.6||(l.position.set(R,0,N),l.scale.set(1,Ct(.5,1.5),1),l.rotation.z=Ct(-.12,.12),l.updateMatrix(),o.setMatrixAt(c++,l.matrix))}o.count=c,i.add(o),Q(i,new Te(.62,14,8),Jt("#6a6352"),2.6,.05,-.3,1.2,.55,1),Q(i,new Te(.2,10,8),Jt("#2e2b25"),2.05,.14,.05,.6,.7,.5);for(let w=0;w<26;w++)Q(i,s,Jt("#7c745f"),2.6+Ct(-.7,.7),.1,-.3+Ct(-.55,.55)).rotation.set(Ct(-1.2,1.2),0,Ct(-1.2,1.2));let h=id();h.root.scale.setScalar(.3),i.add(h.root);let d=Xu();d.root.scale.setScalar(.72),i.add(d.root);let u=new pn("#aebbb4",.48);u.position.set(4,5,12),i.add(u);let p=new C(1.75,0,.15),g=new C(1.15,0,.2),v=new C(-5,0,-2.6),m=new C(-.75,0,.1),f=new C(-10,0,-11),b=Math.atan2(-(m.z-v.z),m.x-v.x),T=Math.atan2(-(f.z-m.z),f.x-m.x)-Math.PI*2,x=v.distanceTo(m),A=m.distanceTo(f),M=new C,E=ed(i,new C(-4,7,-22)),_={};return{target:new C(.35,.62,-.4),radius:9.6,height:.8,fov:30,yaw:16,pitch:[2,6],still:12.6,traveller:h.root,motion:_,tick(w,R,N,I={x:0,y:0}){a.value=R+I.x*.7;let F=Cs((R-2.2)/19.8),L=Cs((R-31)/13),O=F*(2-F),V=L*L,W=F<1?O:1,j=he(R,29,31.5),k=b+(T-b)*j;d.root.position.copy(v).lerp(m,W).lerp(f,V),d.root.rotation.y=k;let D=W*x+V*A+Math.abs(T-b)*j*.5,H=Math.min(1,(F>0&&F<1?1-F**3:0)+(L>0?Math.min(1,L*6):0)+(j>0&&j<1?.45:0)),pt=he(R,22,25)-he(R,28,30)*.82,dt=D/.9/.72;d.pose({phase:dt,moving:H,lower:pt,s:R,tailUp:he(R,29,31),attention:(1-he(R,2,4))*.5}),Object.assign(_,{phase:dt,moving:H,x:d.root.position.x/12}),d.root.updateMatrixWorld(!0),d.head.localToWorld(M.copy(d.mouth));let at=he(R,3.8,6.4),ht=p.clone().lerp(g,at),Dt=he(R,27,28);if(Dt<=0){h.root.position.copy(ht),h.root.rotation.set(0,Math.PI+Math.sin(R*.6)*.15*(1-at),0);let Y=1-he(R,3.1,3.7)+he(R,7.2,8.2)*(1-he(R,26,27));h.pose({phase:at*(p.distanceTo(g)/.3)/.3,moving:at>0&&at<1?1:0,sit:Y,paws:R<3.4?"groom":"hold",s:R,look:Y>.5?Math.sin(R*3.1)*.04:Math.max(0,Math.sin(R*2.3))**8*.2})}else{let Y=new C(0,.3,0);h.root.position.copy(ht).lerp(M.clone().sub(Y),Dt),h.root.rotation.set(0,Math.PI+Dt*(k+Math.PI/2-Math.PI),0),h.pose({s:R,hang:Dt,sit:0})}h.root.visible=!document.querySelector('.memory-mouse[data-transfer="true"]');for(let Y of E){let J=Y.userData,ct=R*J.speed*4+J.phase;Y.position.set(J.centre.x+Math.cos(ct)*J.r*.5+I.x*.35,J.h-I.y*.16,J.centre.z+Math.sin(ct)*J.r*.3),Y.scale.y=1+Math.sin(R*9+J.phase)*.8}}}}function G_(){let i=document.createElement("canvas");i.width=64,i.height=256;let t=i.getContext("2d"),e=(s=>()=>(s=s*16807%2147483647)/2147483647)(5);t.fillStyle="#c9c2b1",t.fillRect(0,0,64,256);for(let s=0;s<256;s+=2+e()*2)t.fillStyle=`rgba(60,58,52,${.12+e()*.2})`,t.fillRect(0,s,64,.8);let n=new bn(i);return n.colorSpace=we,n}function H_(){let i=document.createElement("canvas");i.width=512,i.height=680;let t=i.getContext("2d"),e=(r=>()=>(r=r*16807%2147483647)/2147483647)(11);t.fillStyle="#ddd7c7",t.fillRect(0,0,512,680),t.strokeStyle="rgba(46,52,58,.62)",t.lineWidth=1.6,t.lineCap="round",t.lineJoin="round";let n=(r,a,o)=>{t.beginPath();for(let l=0;l<=o;l+=1.4){let c=a+Math.sin(l*.62+e()*.5)*3.4-(e()<.05?8:0);l?t.lineTo(r+l,c):t.moveTo(r,c)}t.stroke()};n(340,74,96);for(let r=0;r<8;r++){let a=58+r%2*22,o=150+r*60;for(;a<430;){let l=22+e()*60;if(a+l>456)break;n(a,o,l),a+=l+13+e()*8}}let s=new bn(i);return s.colorSpace=we,s.anisotropy=4,s}function W_(i){i.background=new ft("#2f3533"),i.fog=new Un("#2f3533",16,60),i.add(new fn(new ft("#8a8d86"),new ft("#232826"),.9));let t=new Ri(new ft("#f0d5a8"),300,44,2);t.position.set(-3.4,9.5,-1.6),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.radius=5,t.shadow.bias=-.002,i.add(t),Q(i,new ti(1.7,1.5,24,1,!0),new Ce({color:new ft("#262b29"),side:Ae}),-3.4,10.5,-1.6),nn(Q(i,new Re(30,1,17),Jt("#4c514c"),0,-.5,0),!1,!0),nn(Q(i,new Ne(70,34),Jt("#3b413d"),0,7,-9),!1,!0);let e=Jt("#cfc9b9"),n=new tn({map:H_(),side:Ae}),s=G_(),r=new tn({map:s}),a=nn(Q(i,new Re(4.3,1.3,5.7),[r,r,e,e,r,r],1.2,.65,.3));a.rotation.y=.03;let o=new Re(4.2,.02,5.6);for(let b=0;b<5;b++)nn(Q(i,o,n,1.2+Ct(-.18,.18),1.31+b*.025,.3+Ct(-.18,.18))).rotation.y=Ct(-.08,.08);nn(Q(i,new se(.42,.5,.7,16),Jt("#2b302e"),5.6,.35,-1.4)),nn(Q(i,new se(.045,.03,3.2,8),Jt("#262a28"),5.2,.08,1.4)).rotation.set(0,.45,Math.PI/2);let c=4.2,h=5.6,d=new Ne(c,h,16,20);d.rotateX(-Math.PI/2);let u=d.attributes.position.array.slice(),p=nn(new ce(d,n));i.add(p);let g=1.31+5*.025+.01;function v(b,T,x){let A=d.attributes.position;for(let M=0;M<A.count;M++){let E=u[M*3],_=u[M*3+2],w=((E+c/2)/c+(_+h/2)/h)/2,R=b*Math.max(0,(w-.32)/.68)**2.2*1.9+T*(Math.sin(E*1.25+x*2.1)*.07+Math.sin(_*1.05-x*1.6)*.06);A.setY(M,R)}A.needsUpdate=!0,d.computeVertexNormals()}let m={},f=qo(i,Array.from({length:10},()=>[Ct(-5,2),Ct(2,7),Ct(-3,2),.1,.1]),.45);return{target:new C(1.3,1.3,.3),radius:14.5,height:3.6,fov:34,yaw:36,pitch:[12,26],shadows:!0,still:24,motion:m,tick(b,T,x,A={x:0,y:0}){t.intensity=300+Math.sin(T*5.3)*5+Math.sin(T*1.7)*9;let M=he(T,4,9)*(1-he(T,12.5,16.5)),E=he(T,8,12)*(1-he(T,13,19)),_=he(T,13,19.5),w=M*.5+E;Object.assign(m,{paper:w*(1-_),settle:_,x:.3}),v(M*(1-E*.55)+Math.max(0,A.y)*.12,w*(1-_),T),p.position.set(1.2+_*.34+E*.3+A.x*.12,g+E*.55+Math.sin(T*1.3)*.04*E,.3+_*.16+E*.1),p.rotation.set(Math.sin(T*1.1)*.03*E,.02+_*.09+E*.07*Math.sin(T*.8),Math.sin(T*.9)*.025*E),f.forEach((R,N)=>{R.position.y=2+(T*.09+N*.37)%6,R.position.x=R.userData.x0+Math.sin(T*.4+N)*.22+w*.2+A.x*.35,R.position.z=Math.sin(T*.23+N)*.2+A.y*.2})}}}function $u(i=.3){let t=new ln;return t.moveTo(0,-i),t.quadraticCurveTo(i*.75,-i*.15,0,i),t.quadraticCurveTo(-i*.75,-i*.15,0,-i),new ms(t,5)}function Ku(i,t,e,n){let s=new ae,r=new Re(1,1,1),a=.24,o=.16,l=c=>n*c;Q(s,r,i,l(t/2),e-a/2,0,t,a,o),Q(s,r,i,l(t/2),a/2,0,t,a,o),Q(s,r,i,l(a/2),e/2,0,a,e,o),Q(s,r,i,l(t-a/2),e/2,0,a,e,o);for(let c of[.36,.64])Q(s,r,i,l(t*c),e/2,0,.09,e,.09);for(let c of[.2,.44,.68,.86])Q(s,r,i,l(t/2),e*c,0,t,.09,.09);return Q(s,r,i,l(t/2),e*.56,0,t*.28+.09,.09,.09),Q(s,r,i,l(t*.36),e*.5,0,.09,e*.12,.09),nn(s)}function X_(i){let t=document.createElement("canvas");t.width=4,t.height=128;let e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,128);i.forEach((r,a)=>n.addColorStop(a/(i.length-1),r)),e.fillStyle=n,e.fillRect(0,0,4,128);let s=new bn(t);return s.colorSpace=we,s}function q_(i=!0){let t=document.createElement("canvas");t.width=256,t.height=320;let e=t.getContext("2d");if(e.fillStyle="#d9d3c4",e.fillRect(0,0,256,320),e.fillStyle="rgba(64,62,56,.28)",i)for(let s=0;s<9;s++)for(let r=0;r<14;r++)(s*7+r*3)%11&&e.fillRect(212-s*22,26+r*19,9,9);let n=new bn(t);return n.colorSpace=we,n}function Y_(i){i.background=new ft("#383d3a"),i.fog=new Un("#383d3a",28,70),i.add(new fn(new ft("#a3aaa3"),new ft("#383c38"),1.7));let t=new pn(new ft("#cdbfa5"),.3);t.position.set(6,6,30),i.add(t);let e=new ft("#e8d8c0"),n=new ft("#ddc9b0"),s=new pn(e.clone(),3.6);s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.radius=3,s.shadow.bias=-4e-4,Object.assign(s.shadow.camera,{left:-26,right:26,top:26,bottom:-26,near:1,far:150}),s.target.position.set(2,0,0),i.add(s,s.target);let r=Jt("#939891"),a=Jt("#575249"),o=Jt("#7a776c");nn(Q(i,new Ne(80,50),o,0,0,15),!1,!0).rotation.x=-Math.PI/2,Q(i,new Ne(160,60),Jt("#a29f94",{fog:!1}),0,-.05,-40).rotation.x=-Math.PI/2;let l=new Re(1,1,1),c=new ae;Q(c,l,r,-18,11,0,26,22,.8),Q(c,l,r,18,11,0,26,22,.8),Q(c,l,r,0,1.5,0,10,3,.8),Q(c,l,r,0,16.5,0,10,11,.8),Q(c,l,a,0,2.95,.45,10.6,.25,.5),c.position.z=-10,i.add(nn(c)),Q(i,new Ne(140,70),new Ce({map:X_(["#bdbcb4","#cfcabd","#d5cdbe"]),fog:!1}),0,12,-46);let h=new ae,d=Jt("#3e3a33"),u=(k,D,H,pt,dt)=>{let at=Math.hypot(H-k,pt-D),ht=Q(h,new se(dt*.7,dt,at,6),d,(k+H)/2,(D+pt)/2,0);ht.rotation.z=Math.atan2(k-H,pt-D)};u(-17,3,-11,6.5,.5),u(-11,6.5,-6,8.6,.36),u(-6,8.6,-1.5,10.8,.26),u(-1.5,10.8,3.5,12.2,.17),u(-6,8.6,-3,7.2,.14),u(-3,7.2,.5,7.6,.09),u(-1.5,10.8,.5,14.5,.11);let p=$u(.36),g=new tn({color:new ft("#a09577"),side:Ae}),v=[];for(let k=0;k<60;k++){let D=Cc(),H=Q(h,p,g,-7+D*11+Ct(-1.4,1.4),7.6+D*4.6+Ct(-1.4,1.4),Ct(-1.5,1.5));H.rotation.set(Ct(0,3),Ct(0,3),Ct(0,3)),H.userData={r:H.rotation.clone(),phase:Ct(0,6)},v.push(H)}h.position.set(0,0,-17),i.add(nn(h,!0,!1));let m=Jt("#45584e"),f=Ku(m,5,8,1),b=Ku(m,5,8,-1);f.position.set(-5,3,-9.5),b.position.set(5,3,-9.5),i.add(f,b);let T=document.createElement("canvas");T.width=128,T.height=128;let x=T.getContext("2d");x.fillStyle="#9b9e86",x.fillRect(0,0,128,128),x.strokeStyle="rgba(224,216,179,.2)",x.lineWidth=2;for(let k=0;k<144;k+=16)for(let D=0;D<144;D+=16)x.beginPath(),x.ellipse(k,D,6,6,0,0,Math.PI*2),x.stroke();let A=new bn(T);A.colorSpace=we;let M=new tn({map:A,transparent:!0,opacity:.32,side:Ae,depthWrite:!1});for(let[k,D]of[[f,1],[b,-1]])Q(k,new Ne(4.5,1.1),M,D*2.5,7.25,-.02);let E=new ae;Q(E,l,a,0,1.75,0,7.4,.28,3.8);for(let[k,D]of[[-3.3,-1.5],[3.3,-1.5],[-3.3,1.5],[3.3,1.5]])Q(E,l,a,k,.8,D,.32,1.6,.32);let _=new tn({map:q_()});for(let k of[-1,1]){let D=Q(E,new Re(1.7,.05,2.3),_,k*.86,2,.1);D.rotation.z=-k*.07}Q(E,l,Jt("#57524a"),0,1.92,.1,3.6,.06,2.4);let w=Q(E,new se(.34,.3,.52,18),Jt("#b9bdb0"),2.7,2.15,.7),R=Q(E,new se(.35,.35,.025,24),Jt("#43584f"),2.7,2.42,.7);Q(E,new se(.28,.28,.012,20),Jt("#554737"),2.7,2.438,.7),Q(E,new se(.5,.5,.04,18),Jt("#a9ac9b"),2.7,1.91,.7),E.position.set(4.2,0,-3.6),E.rotation.y=-.1,i.add(nn(E));let N=Ic(i,9,"#e6dfcf"),I=Array.from({length:8},(k,D)=>{let H=nn(Q(i,p,g,0,0,0),!0,!1);return H.userData={x:Ct(-14,10),z:Ct(-24,-13),phase:D/8,speed:Ct(.05,.08),spin:Ct(.6,1.4)},H}),F=new C(.3,10.3,-9.2),L=new C(3.55,2.07,-3.3),O=nn(Q(i,$u(.62),new tn({color:new ft("#b5a37e"),side:Ae}),0,0,0),!0,!1),V=qo(i,Array.from({length:22},()=>[Ct(-4,6),Ct(2,9),Ct(-9,3),.09,.09]),.55);V.forEach(k=>{k.userData.y0=k.position.y,k.userData.z0=k.position.z});let W={},j=0;return{target:new C(1.8,3.8,-3.6),radius:18.5,height:4.6,fov:38,yaw:18,pitch:[12,21],shadows:!0,still:22,motion:W,tick(k,D,H,pt={x:0,y:0}){let dt=.15+.1*Math.sin(D*.4);b.rotation.y=.95+Math.sin(D*.5)*.025+Math.sin(D*1.3)*.008+pt.x*.035,f.rotation.y=0;let at=he(D,4,26);s.position.set(-7,31-at*6,-56),s.intensity=3.6-at*1.1,s.color.copy(e).lerp(n,at),h.rotation.z=Math.sin(D*.7)*.012+dt*Math.sin(D*2.3)*.05,h.rotation.x=dt*.04;for(let ut of v){let gt=ut.userData;ut.rotation.x=gt.r.x+Math.sin(D*(1.2+dt*4)+gt.phase)*(.08+dt*.4)}for(let ut of I){let gt=ut.userData,Ht=(D*gt.speed+gt.phase)%1;ut.position.set(gt.x+Math.sin(D*.5+gt.phase*6)*1.4+dt*6*Ht,15-Ht*15,gt.z),ut.rotation.set(D*gt.spin+gt.phase*6,D*.7*gt.spin,D*.4)}let ht=Cs((D-2.5)/17.5),Dt=ht*ht*(3-2*ht),Y=ht>=1,J=Math.sin((D-2.5)*1.15),ct=1-he(D,15,20);O.visible=D>2.5,O.position.copy(F).lerp(L,Dt),O.position.x=F.x+(L.x-F.x)*Dt**1.8+J*.8*ct,O.position.y+=(1-Math.abs(J))*.12*ct,O.position.z+=Math.cos((D-2.5)*.55)*.5*ct,O.position.x+=pt.x*.55*ct,O.position.z+=pt.y*.3*ct;let Nt=he(D,17.5,20);Object.assign(W,{leaf:O.visible?(1-Nt)*(.45+.25*Math.abs(J)):0,x:O.position.x/10}),O.rotation.set((-.35+Math.cos((D-2.5)*1.15)*.45)*(1-Nt)-Math.PI/2*Nt,.45+Math.sin((D-2.5)*.4)*.35*ct,-J*.55*ct);for(let ut of V){let gt=ut.userData;ut.position.y=gt.y0+Math.sin(D*.21+gt.phase)*.6-dt*.5,ut.position.z=gt.z0+Math.sin(D*.13+gt.phase)*.7+dt*2.2*Math.sin(gt.phase+D)+pt.y*.3,ut.position.x=gt.x0+pt.x*.45+Math.sin(D*.3+gt.phase)*.15,ut.material.opacity=.5*(1-at*.5)}if(D-j>.9||D<j){j=D;let ut=N.find(gt=>gt.userData.age>5)||N[0];ut.position.set(6.9,2.6,-3.2),ut.userData.born=D,ut.userData.age=0}for(let ut of N){let gt=ut.userData.age=D-ut.userData.born;if(!(gt>=0&&gt<5)){ut.material.opacity=0;continue}ut.position.y=2.6+gt*.32,ut.position.x=6.9+Math.sin(gt*1.3+D*.4)*.18*gt+dt*gt*.3+pt.x*gt*.14,ut.scale.setScalar(.35+gt*.22),ut.material.opacity=.22*(1-gt/5)*(1-he(D,14,24)*.7)}}}}var ju={"art-waugh2":C_,"art-burns":k_,"art-nalan":Y_,"art-pushkin":W_,"art-wong":F_,"art-thackeray":B_};function Z_(i,t){let e=i.querySelector("svg"),n=document.createElement("canvas");n.className="mv-world";let s;try{s=new As({canvas:n,antialias:!0,alpha:!1,powerPreference:"low-power"})}catch{return}s.setPixelRatio(Math.min(devicePixelRatio,1.5)),s.outputColorSpace=we;let r=new Ei,a=t(r),o=new Ri("#dec7a1",0,Math.max(12,a.radius*.7),2);r.add(o);let l=new C,c=new C;a.shadows&&(s.shadowMap.enabled=!0,s.shadowMap.type=Pi);let h=new ze(a.fov,16/9,.5,2e3);i.insertBefore(n,e),e.style.display="none",e.pauseAnimations?.(),i.dataset.world="3d";let d=i.closest("[data-scene]")?.dataset.scene,u=matchMedia("(prefers-reduced-motion: reduce)"),p=!1,g=null,v=!1,m=!1,f=0,b=0,T=0,x=0,A=performance.now(),M={x:0,y:0},E=Ss.degToRad(a.yaw??24),[_,w]=a.pitch??[1.5,11],R=Ss.degToRad((_+w)/2),N=0,I=R;function F(){let D=i.clientWidth||1120,H=Math.round(D*9/16);s.setSize(D,H,!1),n.style.width="100%",n.style.height="auto",h.aspect=D/H,h.updateProjectionMatrix()}function L(D){let H=parseFloat(i.style.getPropertyValue("--look-x"))||0,pt=parseFloat(i.style.getPropertyValue("--look-y"))||0,dt=parseFloat(i.style.getPropertyValue("--pass"))||.5,at=D?1-Math.exp(-D/4.5):0;N+=(H*E*.3+(dt-.5)*.06-N)*at,I+=(R-pt*Ss.degToRad(5)-I)*at;let ht=a.radius,Dt=a.target;h.position.set(Dt.x+Math.sin(N)*ht,a.height+Math.sin(I)*ht*.5,Dt.z+Math.cos(N)*ht),h.lookAt(Dt),a.camUniform?.value.copy(h.position)}function O(D){L(D),a.tick(f*.12,b,D,M),d&&window.memoryGestures?.set(d,a.motion||{});let H=Number(i.style.getPropertyValue("--candle-light"))||0;o.intensity=H*Math.min(90,a.radius*1.4),H&&(l.set(Number(i.style.getPropertyValue("--candle-x"))||0,Number(i.style.getPropertyValue("--candle-y"))||0,.5).unproject(h).sub(h.position).normalize(),h.getWorldDirection(c),o.position.copy(h.position).addScaledVector(l,a.radius*.78/Math.max(.3,l.dot(c)))),s.render(r,h)}function V(D){let H=T?Math.min(.1,(D-T)/1e3):0;T=D;let pt=window.memoryMotion?.pointer?.(),dt=pt?.present&&!u.matches?1:0,at=1-Math.exp(-H/1.6);M.x+=((pt?.x||0)*dt-M.x)*at,M.y+=((pt?.y||0)*dt-M.y)*at;let ht=window.memoryTimeline?.sceneTime?.(d),Dt=ht==null?H:Math.max(0,Math.min(.1,ht-b));b=ht??b+H,f=ht??f+H,O(Dt),x++,D-A>2e3&&(i.dataset.fps=(x*1e3/(D-A)).toFixed(1),x=0,A=D)}function W(D){g=null,p&&(V(D),g=requestAnimationFrame(W))}function j(){if(m)return;let D=i.dataset.state,H=i.getBoundingClientRect(),pt=H.bottom>0&&H.top<innerHeight,dt=D==="present"&&pt&&!u.matches&&!v;dt&&!p&&(p=!0,T=0,x=0,A=performance.now(),g=requestAnimationFrame(W)),!dt&&p&&(p=!1,cancelAnimationFrame(g),g=null),D==="set"&&k()}function k(){if(m)return;m=!0,window.memoryGestures?.clear(d),s.render(r,h);let D=new Image;D.className="mv-world",D.alt="",D.src=n.toDataURL("image/jpeg",.92),D.width=n.width,D.height=n.height,n.replaceWith(D),i.dataset.world="print",r.traverse(H=>{H.geometry?.dispose(),H.material&&[].concat(H.material).forEach(pt=>{pt.map?.dispose(),pt.dispose()})}),s.dispose(),s.forceContextLoss()}i._world={camera:h,world:a,travellerPosition(){if(!a.traveller)return null;a.traveller.updateWorldMatrix(!0,!1);let D=a.traveller.getWorldPosition(new C).project(h),H=i.getBoundingClientRect();return{x:H.left+(D.x+1)*H.width/2,y:H.top+(1-D.y)*H.height/2-9}},seek(D){v=!0,j(),b=D,f=D,T=0,O(0)},resume(){v=!1,j()}},F(),u.matches&&(b=f=a.still??0),O(0),new MutationObserver(j).observe(i,{attributes:!0,attributeFilter:["data-state"]}),addEventListener("scroll",()=>{m||j()},{passive:!0}),u.addEventListener("change",j),addEventListener("resize",()=>{m||(F(),p||s.render(r,h))}),addEventListener("memory-scene-start",D=>{D.detail?.id===d&&b<3&&(b=0)}),j()}var J_=matchMedia("(prefers-reduced-motion: reduce)");for(let i of document.querySelectorAll('.memory-essay[data-visuals="living"] .memory-art')){let t=Object.keys(ju).find(s=>i.classList.contains(s));if(!t)continue;let e=()=>{i.dataset.state!=="present"&&!(J_.matches&&i.dataset.state==="set")||(n.disconnect(),Z_(i,ju[t]))},n=new MutationObserver(e);n.observe(i,{attributes:!0,attributeFilter:["data-state"]}),e()}function $_(i,t){return new Ue({transparent:!0,depthWrite:!1,uniforms:{...i,uColour:{value:new ft(t)}},vertexShader:`attribute float along; uniform float uHead; varying float vAlong; varying float vDepth;
      void main(){ vAlong = along; vec3 p = position;
        float placed = clamp((uHead - along) / .014, 0., 1.);
        p.y += (1. - placed) * .9;
        vec4 mv = modelViewMatrix * vec4(p, 1.); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform float uHead; uniform float uTail; uniform vec3 uColour; uniform vec3 uFog; uniform vec2 uFogRange;
      varying float vAlong; varying float vDepth;
      void main(){
        float a = smoothstep(uTail - .05, uTail + .02, vAlong) * clamp((uHead - vAlong) / .014, 0., 1.);
        if (a <= 0.) discard;
        vec3 c = mix(uColour, uFog, smoothstep(uFogRange.x, uFogRange.y, vDepth));
        gl_FragColor = vec4(c, a);
        #include <colorspace_fragment>
      }`})}function K_(i,t){let e=new ae,n=new Re(1,1,1),s=Q(e,new se(.42,.42,2.1,16),i,.45,.78,0);s.rotation.z=Math.PI/2,Q(e,n,i,-.95,.95,0,.9,1.05,1),Q(e,n,t,-.95,1.52,0,1.05,.08,1.12),Q(e,new se(.13,.16,.5,10),t,1.15,1.35,0),Q(e,new Te(.2,10,8),i,.3,1.2,0,1,.7,1),Q(e,n,t,.1,.3,0,2.9,.26,.9);let r=[];for(let o of[-.8,.05,.85])for(let l of[-.47,.47]){let c=Q(e,new se(.3,.3,.08,14),t,o,.3,l);c.rotation.x=Math.PI/2,r.push(c)}let a=[-.5,.5].map(o=>Q(e,n,i,.02,.3,o*1.06,1.7,.05,.03));return{group:e,wheels:r,rods:a,chimney:new C(1.15,1.7,0)}}function Qu(i,t,e,n=3){let s=new ae,r=new Re(1,1,1);Q(s,r,i,0,.82,0,n,.9,1),Q(s,r,t,0,1.33,0,n+.1,.12,1.08);for(let o=0;o<5;o++)for(let l of[-.505,.505])Q(s,new Ne(.32,.28),e,-n/2+.45+o*(n-.9)/4,.95,l).rotation.y=l>0?0:Math.PI;let a=[];for(let o of[-n/2+.5,n/2-.5])for(let l of[-.45,.45]){let c=Q(s,new se(.22,.22,.07,12),t,o,.22,l);c.rotation.x=Math.PI/2,a.push(c)}return{group:s,wheels:a}}function j_(){if(!document.querySelector(".art-thackeray"))return;let t=matchMedia("(prefers-reduced-motion: reduce)"),e="waiting",n,s,r=null,a=!1,o=0,l=0,c=42,h={running:!1,progress:0,front:0,speed:0,pace:0,x:0,depth:1,steaming:!1},d=()=>dispatchEvent(new Event("memory-train-finished"));function u(I){if(e!=="waiting")return;if(t.matches){e="done",d();return}c=I,n=document.createElement("div"),n.className="memory-train",n.setAttribute("aria-hidden","true");let F=document.createElement("canvas");try{s=new As({canvas:F,alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{e="done",d();return}e="running",n.append(F),document.body.append(n),s.setPixelRatio(Math.min(devicePixelRatio,1.5)),s.outputColorSpace=we,s.setClearColor(0,0),_(),R()}let p,g,v,m,f,b,T,x=0,A=new gr,M=new $e(new C(0,1,0),0);function E(I,F){return A.setFromCamera(new mt(I*2-1,1-F*2),g),A.ray.intersectPlane(M,new C)||new C}function _(){p=new Ei;let I=new ft(getComputedStyle(document.body).backgroundColor||"#efede6");g=new ze(36,innerWidth/innerHeight,1,600),g.position.set(0,19,36),g.lookAt(0,0,-4),g.updateMatrixWorld(),g.updateProjectionMatrix(),s.setSize(innerWidth,innerHeight,!1),p.add(new fn(new ft("#dfe2dc"),new ft("#59625d"),1.6));let F=new pn(new ft("#efe6d6"),1.1);F.position.set(-20,40,10),p.add(F);let L=.27,O=.5,V=[[L,O],[L-.07,O-.11],[Math.max(.05,L-.17),O-.02],[Math.max(.07,L-.13),O+.2],[L+.02,.86],[.36,.92],[.56,.93],[.74,.91],[.88,.89],[1,.95],[1.14,1.12]];v=new Qe(V.map(([Ht,et])=>E(Ht,et)),!1,"centripetal"),m=v.getLength(),b={uHead:{value:0},uTail:{value:-1},uFog:{value:I},uFogRange:{value:new mt(30,110)}};let W=Math.round(m*9),j=.52,k=[],D=[],H=[],pt=[],dt=[],at=[];for(let Ht=0;Ht<=W;Ht++){let et=Ht/W,$=v.getPointAt(et),st=v.getTangentAt(et),ot=-st.z,_t=st.x;for(let zt of[-1,1])for(let Pt of[-.045,.045])k.push($.x+ot*(zt*j+Pt),.08,$.z+_t*(zt*j+Pt)),D.push(et);if(Ht<W)for(let zt of[0,2]){let Pt=Ht*4+zt,Wt=Pt+1,qt=Pt+4,U=qt+1;H.push(Pt,qt,Wt,Wt,qt,U)}}for(let Ht=0,et=Math.round(m/.62);Ht<=et;Ht++){let $=Ht/et,st=v.getPointAt($),ot=v.getTangentAt($),_t=-ot.z,zt=ot.x,Pt=pt.length/3;for(let[Wt,qt]of[[-.8,-.1],[-.8,.1],[.8,-.1],[.8,.1]])pt.push(st.x+_t*Wt+ot.x*qt,.03,st.z+zt*Wt+ot.z*qt),dt.push($);at.push(Pt,Pt+1,Pt+2,Pt+1,Pt+3,Pt+2)}let ht=(Ht,et,$,st)=>{let ot=new _e;ot.setAttribute("position",new Qt(Ht,3)),ot.setAttribute("along",new Qt(et,1)),ot.setIndex($);let _t=new ce(ot,$_(b,st));return _t.material.side=Ae,p.add(_t),_t};ht(pt,dt,at,"#8d8f88"),ht(k,D,H,"#4a524e");let Dt=Jt("#46504b",{transparent:!0}),Y=Jt("#2e3532",{transparent:!0}),J=new Ce({color:new ft("#e3cfa4"),transparent:!0,opacity:.55}),ct=K_(Dt,Y),Nt=Qu(Dt,Y,new Ce({visible:!1}),1.5),ut=[0,1,2].map(()=>Qu(Dt,Y,J));f=[[ct,2.9],[Nt,1.6],...ut.map(Ht=>[Ht,3.05])];let gt=0;for(let[Ht,et]of f)Ht.offset=(gt+et/2)*.78,gt+=et+.22,p.add(Ht.group),Ht.group.scale.setScalar(.78);gt*=.78,f.length_=gt,T=Ic(p,34,"#b9bdb6")}function w(I){if(r=null,e!=="running")return;let F=l?Math.min(.1,(I-l)/1e3):0;l=I;let L=o;!a&&!document.hidden&&(o=window.memoryTimeline?.sceneTime?.("thackeray")??o+F);let O=Math.max(0,Math.min(.1,o-L)),V=Math.min(1,o/c);n.dataset.progress=V.toFixed(3);let W=he(o,0,c*.8),j=Cs((o-c*.12)/(c*.88)),D=j*j*(3-2*j)*(m+f.length_+4);b.uHead.value=Math.max(W*1.02,(D+3)/m),b.uTail.value=(D-f.length_-5)/m;let H=f[0][0];for(let[at]of f){let ht=D-at.offset;if(at.group.visible=ht>0&&ht<m,!at.group.visible)continue;let Dt=ht/m,Y=v.getPointAt(Dt),J=v.getTangentAt(Dt);at.group.position.copy(Y).setY(.1),at.group.rotation.y=Math.atan2(-J.z,J.x);for(let ct of at.wheels)ct.rotation.y=-ht*2.2}H.rods.forEach((at,ht)=>{let Dt=-D*2.2+ht*Math.PI/2;at.position.x=.02+Math.cos(Dt)*.18,at.position.y=.3+Math.sin(Dt)*.18});let pt=j>0&&j<1;if(pt&&H.group.visible&&o-x>.22){x=o;let at=T.find(ht=>ht.userData.age>5)||T[0];H.group.updateMatrixWorld(!0),H.group.localToWorld(at.position.copy(H.chimney)),at.userData.born=o,at.userData.age=0,at.userData.drift=Ct(-.3,.3)}for(let at of T){let ht=at.userData.age=o-(at.userData.born??-99);if(!(ht>=0&&ht<5)){at.material.opacity=0;continue}at.position.y+=O*.9,at.position.x+=O*(at.userData.drift+(window.memoryMotion?.pointer?.().x||0)*.3),at.scale.setScalar(.6+ht*1.2),at.material.opacity=.42*Math.min(1,ht*3)*(1-ht/5)}let dt=h.front;if(h.running=!0,h.progress=V,h.front=D,h.speed=F?(D-dt)/F:h.speed,h.pace=Math.min(1,h.speed/((m+f.length_+4)*1.5/(c*.88))),h.steaming=pt&&H.group.visible,H.group.visible){let at=H.group.position.clone().project(g);h.x=at.x,h.depth=Math.min(1.6,Math.max(.2,1-at.z*0+(H.group.position.z+20)/60))}if(s.render(p,g),V>=1){N();return}r=requestAnimationFrame(w)}function R(){l=0,e==="running"&&r===null&&(r=requestAnimationFrame(w))}function N(){if(e!=="running")return;e="done",h.running=!1,h.speed=h.pace=0,h.steaming=!1,r!==null&&cancelAnimationFrame(r),r=null;let I=n;I.animate([{opacity:getComputedStyle(I).opacity},{opacity:0}],{duration:900,fill:"forwards"}).finished.then(()=>{I.remove(),p.traverse(F=>{F.geometry?.dispose(),F.material?.dispose?.()}),s.dispose(),s.forceContextLoss()}),d()}addEventListener("memory-scene-start",I=>{I.detail?.id==="thackeray"&&u(I.detail.duration/1e3)}),addEventListener("memory-scene-skip",I=>{I.detail?.id==="thackeray"&&(e==="waiting"?(e="done",d()):N())}),document.addEventListener("visibilitychange",R),document.addEventListener("toggle",I=>{I.target.matches?.(".memory-world-dialog")&&(a=I.target.open,R())},!0),t.addEventListener("change",()=>{t.matches&&e==="running"&&N()}),addEventListener("resize",()=>{e==="running"&&(g.aspect=innerWidth/innerHeight,g.updateProjectionMatrix(),s.setSize(innerWidth,innerHeight,!1))}),window.memoryTrain={start:u,seek(I){o=I,l=0},state:()=>({...h})}}j_();function Q_(){let i=document.querySelector("body > .memory-mouse");if(!i)return;let t=document.createElement("canvas"),e;try{e=new As({canvas:t,alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return}e.setPixelRatio(Math.min(devicePixelRatio,2)),e.setSize(50,37.5,!1),e.outputColorSpace=we,e.setClearColor(0,0),t.className="memory-mouse-volume";let n=new Ei,s=new mi(-2.7,2.7,2.025,-2.025,.1,30);s.position.set(.7,2.5,7),s.lookAt(0,.65,0),n.add(new fn("#d4ded7","#39464a",1.5));let r=new pn("#d1e0db",2.1);r.position.set(-3,5,4),n.add(r);let a=id(),o=a.root,{tail:l,legs:c}=a;n.add(o),i.append(t),i.dataset.dimension="3d";let h=-1/0,d=0,u=!1,p=null,g=new C,v=new C(0,1,0),m=new C(1,0,0).applyQuaternion(s.quaternion),f=new C(0,1,0).applyQuaternion(s.quaternion),b=m.x*f.z-m.z*f.x;function T(M,E,_){let w=new C().subVectors(_,E);M.position.copy(E).add(_).multiplyScalar(.5),M.scale.y=w.length(),M.quaternion.setFromUnitVectors(v,w.normalize())}let x=({phase:M=0,moving:E=0,heading:_,groundX:w,groundY:R,depthScale:N=1,jump:I=0,crouch:F=0,seconds:L=0}={})=>{if(w!==void 0){if(p){let V=(w-p.x)*5.4/(50*N),W=-(R-p.y)*5.4/(50*N);g.x+=(V*f.z-m.z*W)/b,g.z+=(m.x*W-V*f.x)/b}p={x:w,y:R}}let O=_!==void 0?_:d;d+=Math.atan2(Math.sin(O-d),Math.cos(O-d))*.12,o.rotation.y=d+Math.sin(L*.35)*.055,o.rotation.z=I*.17*(Math.cos(d)<0?-1:1),o.scale.y=1-F*.14;for(let V of c){let W=(M+V.phase)%1,j=W<.62,k=new C(V.x+.24,.05,V.z).applyAxisAngle(v,o.rotation.y).add(g);(!V.planted||j&&!V.wasStance)&&(V.planted=k.clone()),!j&&V.wasStance&&(V.lift=V.planted.clone());let D;if(j)D=V.planted.clone().sub(g).applyAxisAngle(v,-o.rotation.y),(Math.abs(D.x-V.x)>.65||Math.abs(D.z-V.z)>.4)&&(V.planted=k.clone(),D=k.clone().sub(g).applyAxisAngle(v,-o.rotation.y));else{let dt=(W-.62)/.38,at=dt*dt*(3-2*dt);D=(V.lift||k).clone().lerp(k,at).sub(g).applyAxisAngle(v,-o.rotation.y),D.y=.05+Math.sin(dt*Math.PI)*.12}I>0&&(D.x=V.x+.15,D.y+=I*.2);let H=new C(V.x,.4,V.z),pt=H.clone().lerp(D,.52);pt.x-=.065,T(V.upper,H,pt),T(V.lower,pt,D),V.paw.position.copy(D),V.wasStance=j}l.rotation.y=Math.sin(L*1.1)*.035*E,e.render(n,s)};x(),i.querySelector("svg").style.display="none";let A=M=>{u||performance.now()-h<1e3/30||(h=performance.now(),x(M.detail))};addEventListener("memory-mouse-frame",A),addEventListener("memory-mouse-transferred",()=>{if(u)return;e.render(n,s);let M=new Image;M.className=t.className,M.alt="",M.src=t.toDataURL("image/png"),t.replaceWith(M),u=!0,removeEventListener("memory-mouse-frame",A),n.traverse(E=>{E.geometry?.dispose(),E.material&&E.material.dispose()}),e.dispose(),e.forceContextLoss()},{once:!0})}Q_();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
