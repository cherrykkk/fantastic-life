(function(e){function t(t){for(var r,a,i=t[0],u=t[1],s=t[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&d.push(c[a][0]),c[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==c[i]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},c={app:0},o=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2252d49f":"22900e7c","chunk-2d22d1f3":"e3b89c3f","chunk-4c71649e":"e2f1904b"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-2252d49f":1,"chunk-4c71649e":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2252d49f":"4321556e","chunk-2d22d1f3":"31d6cfe0","chunk-4c71649e":"da202def"}[e]+".css",c=u.p+r,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var s=o[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===c))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){s=d[i],l=s.getAttribute("data-href");if(l===r||l===c)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),n(o)},f.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}c[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"06df":function(e,t,n){},"256f":function(e){e.exports=JSON.parse('{"survived_month":0,"sex":{"random_type":"disperse","range":["男","女"]},"healthy":{"random_type":"integer","range":[30,100]},"consititution":{"random_type":"integer","range":[3,9]},"intelligence":{"random_type":"integer","range":[3,9]},"appearance":{"random_type":"integer","range":[3,9]}}')},"3a76":function(e,t,n){"use strict";n.d(t,"a",(function(){return A}));n("d3b7");function r(){this.world=null,this.society=null,this.theMainCharacterId=null,this.survived_month=0}var a=n("1da1");n("96cf");function c(){}var o=n("b85c");function i(){this.yourLife=null,this.namesArr=[],this.characters=[],this.npcs=[]}n("4d90"),n("b680");var u=n("7399");function s(){this.surname=null,this.givenName=null,this.characterId=null,this.body=null,this.relationships=[],this.familyId=null,this.events=[]}function l(){Object.assign(this,d)}var d={survived_month:0,sex:null,healthy:100,consititution:0,intelligence:0,appearance:0,walkAble:!1},f=n("256f");function h(){var e=new l;return b(f,e),e}function b(e,t){for(var n in e)if(e[n].random_type){if("integer"==e[n].random_type){var r=e[n].range[0],a=e[n].range[1];t[n]=Math.floor(r+Math.random()*(a-r))}}else t[n]=e[n]}function v(e){var t=new s;Object.assign(t,u),t.body=h();var n=e.namesArr,r=n.pop();return t.surname=r.surname,t.givenName=r.givenName,t.characterId=Date.now()+(100*Math.random()).toFixed(0).padStart(2,"0"),console.log("当前角色ID",t.characterId),t}function p(){var e=new i;return new Promise((function(t,n){m(e).then((function(){g(e),t(e)}))}))}function m(e){return new Promise((function(t,n){var r=e.namesArr;fetch("../api/getRandom_npc.php?times=999").then((function(e){return e.json()})).then((function(e){var n,a=Object(o["a"])(e);try{for(a.s();!(n=a.n()).done;){var c=n.value,i={surname:c.surname,givenName:c.givenName,sex:c.sex};r.push(i)}}catch(u){a.e(u)}finally{a.f()}t()}))}))}function g(e){for(var t=0;t<10;t++){var n=v(e);e.characters.push(n)}}function y(){return O.apply(this,arguments)}function O(){return O=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=new c,e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)}))),O.apply(this,arguments)}n("7db0");function j(e){var t=e.body;t.survived_month++}function w(e,t){j(t),k(e,t),I(e,t),B(e,t)}function k(e,t){var n,r=Object(o["a"])(t.relationships);try{for(r.s();!(n=r.n()).done;)n.value}catch(c){r.e(c)}finally{r.f()}var a=_.sample(e.society.characters);L(e,t,a)}function L(e,t,n){var r=t.relationships.find((function(e){return e.characterId==n.characterId}));if(r){C(e,r.characterId);r.level++}else if(t.characterId==n.characterId);else{var a={characterId:n.characterId,level:1};t.relationships.push(a)}if(t.relationships.length>0&&Math.random()>.5){var c=_.sample(t.relationships);c.level--}}function I(e,t){var n=18;if(!(t.body.survived_month<12*n)){var r,a=(t.body.survived_month-12*n)/4,c=Object(o["a"])(t.relationships);try{for(c.s();!(r=c.n()).done;){var i=r.value;if(i.level>10-a){var u=C(e,i.characterId);t.events.push({message:t.surname+t.givenName+"想要和"+u.surname+u.givenName+"结婚"}),u.events.push({message:u.surname+u.givenName+"收到了"+t.surname+t.givenName+"的求爱"})}}}catch(s){c.e(s)}finally{c.f()}}}function B(e,t){}function C(e,t){var n=e.society.characters.find((function(e){return e.characterId==t}));return n||"找不到id为".concat(t,"的角色")}function N(e){if(e.survived_month<600){var t=v(e.society);e.society.characters.push(t)}console.log("当前人数"+e.society.characters.length);var n,r=Object(o["a"])(e.society.characters);try{for(r.s();!(n=r.n()).done;){var a=n.value;w(e,a)}}catch(c){r.e(c)}finally{r.f()}}function S(e){N(e)}function x(){var e=new r;return new Promise((function(t,n){e.world=y(),p().then((function(n){console.log("society done"),e.society=n,t(e)}))}))}var A={newGame:x,monthGame:S,getCharacterById:C}},"45db":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),a={key:0};function c(e,t,n,c,o,i){var u=Object(r["B"])("layout");return Object(r["u"])(),Object(r["f"])(r["a"],null,[c.globalState.gameLoaded?Object(r["e"])("",!0):(Object(r["u"])(),Object(r["f"])("div",a,"加载中 ")),c.globalState.gameLoaded?(Object(r["u"])(),Object(r["d"])(u,{key:1})):Object(r["e"])("",!0)],64)}var o={class:"layout"};function i(e,t,n,a,c,i){var u=Object(r["B"])("router-view");return Object(r["u"])(),Object(r["f"])("div",o,[Object(r["i"])(u)])}n("b0c0");var u=n("c280"),s=n.n(u),l={key:0,class:"button-bar"},d={class:"main-button-bar"},f=["onClick"],h={key:0,class:"second-button-bar"},b=["onClick"],v={key:1,class:"button-bar-hidden"};function p(e,t,n,a,c,o){return Object(r["u"])(),Object(r["f"])("div",null,[a.shown?(Object(r["u"])(),Object(r["f"])("div",l,[Object(r["g"])("div",d,[(Object(r["u"])(!0),Object(r["f"])(r["a"],null,Object(r["A"])(a.buttonList,(function(e,t){return Object(r["u"])(),Object(r["f"])("div",{key:t},[e.show?(Object(r["u"])(),Object(r["f"])("button",{key:0,onClick:function(t){return a.clickButton(e)}},Object(r["D"])(e.name),9,f)):Object(r["e"])("",!0)])})),128))]),a.state.actionEdit?(Object(r["u"])(),Object(r["f"])("div",h,[Object(r["g"])("button",{onClick:t[0]||(t[0]=function(e){return a.state.actionEdit=!1})},"返回"),(Object(r["u"])(!0),Object(r["f"])(r["a"],null,Object(r["A"])(a.secondButtonList,(function(e,t){return Object(r["u"])(),Object(r["f"])("button",{key:t,onClick:function(t){return a.clickButton(e)},class:Object(r["o"])({actived:a.secondButtonActived==e.name})},Object(r["D"])(e.name),11,b)})),128))])):Object(r["e"])("",!0)])):Object(r["e"])("",!0),a.shown?Object(r["e"])("",!0):(Object(r["u"])(),Object(r["f"])("div",v,[Object(r["g"])("img",{src:s.a,onClick:t[1]||(t[1]=function(e){return a.shown=!0})})]))])}n("b85c"),n("7db0");var m=n("6c02"),g={props:[],setup:function(){var e=Object(r["z"])(!0);return{shown:e,state:state,buttonList:buttonList,secondButtonList:secondButtonList,clickButton:clickButton,secondButtonActived:secondButtonActived}}};n("a505");var y=n("6b0d"),O=n.n(y);const j=O()(g,[["render",p],["__scopeId","data-v-662f0f87"]]);var w=j,k={name:"Layout",components:{ButtonsDesk:w},setup:function(){var e=Object(r["y"])({bodyWidth:0,usableWidth:0,mobile:!1,safeWidth:1190}),t=Object(r["z"])(null),n=function(e){t.value=e};Object(r["w"])("getCurrentLife",(function(){return t.value})),Object(r["w"])("setCurrentLife",n),Object(r["w"])("resizeSymbol",e),Object(r["q"])((function(){window.addEventListener("resize",a),a()})),Object(r["s"])((function(){console.log("mounted")}));var a=function(){e.bodyWidth=document.body.clientWidth,e.usableWidth=e.bodyWidth>e.safeWidth?e.safeWidth:e.bodyWidth,e.mobile=e.bodyWidth<600}}};n("bbfe");const _=O()(k,[["render",i],["__scopeId","data-v-1611711c"]]);var L=_,I=n("3a76"),B={components:{Layout:L},setup:function(){var e=Object(r["z"])(I["a"].newGame()),t=Object(r["y"])({gameLoaded:!1});return e.value.then((function(n){e.value=n,t.gameLoaded=!0})),Object(r["w"])("globalState",t),Object(r["w"])("game",e),{globalState:t}}};n("f0f8");const C=O()(B,[["render",c]]);var N=C,S=(n("d3b7"),n("3ca3"),n("ddb0"),"god-view"),x=[{path:"/",component:function(){return"god-view"==S?n.e("chunk-2d22d1f3").then(n.bind(null,"f5c1")):n.e("chunk-4c71649e").then(n.bind(null,"9aa3"))}},{path:"/god-view",component:function(){return n.e("chunk-2d22d1f3").then(n.bind(null,"f5c1"))},children:[{path:"characters",name:"characters",component:function(){return n.e("chunk-2252d49f").then(n.bind(null,"e117"))}}]}],A=Object(m["a"])({history:Object(m["b"])(),routes:x}),P=A,E=n("5502"),W=Object(E["a"])({state:{},mutations:{},actions:{},modules:{}});n("2ef0");Object(r["c"])(N).use(W).use(P).mount("#app")},7399:function(e){e.exports=JSON.parse('{"surname":"无可","givenName":"奉告","body":null,"intercourse":null,"familyId":null}')},"7a3a":function(e,t,n){},a505:function(e,t,n){"use strict";n("45db")},bbfe:function(e,t,n){"use strict";n("7a3a")},c280:function(e,t,n){e.exports=n.p+"img/pullOut.98c4a9b5.svg"},f0f8:function(e,t,n){"use strict";n("06df")}});
//# sourceMappingURL=app.07c185d1.js.map