(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-631a4b25"],{2368:function(e,n,t){"use strict";t.r(n);var c=t("7a23"),u={key:0},a={key:1,class:"farmland-info-board"},o=["onClick"],b={class:"button-board"};function r(e,n,t,r,l,j){return Object(c["u"])(),Object(c["f"])(c["a"],null,[0==r.farmland.length?(Object(c["u"])(),Object(c["f"])("div",u,"你没有耕地可以种植！")):Object(c["e"])("",!0),0!=r.farmland.length?(Object(c["u"])(),Object(c["f"])("div",a,[Object(c["g"])("div",null,"耕地面积："+Object(c["D"])(r.chosen["尺寸"]),1),Object(c["g"])("div",null,"耕地质量："+Object(c["D"])(r.chosen["质量"]),1),r.chosen.plant?(Object(c["u"])(),Object(c["f"])(c["a"],{key:0},[Object(c["g"])("div",null,"作物: "+Object(c["D"])(r.chosen.plant["名称"]),1),Object(c["g"])("div",null,"成长度: "+Object(c["D"])(r.chosen.plant["成长度"]),1)],64)):Object(c["e"])("",!0)])):Object(c["e"])("",!0),(Object(c["u"])(!0),Object(c["f"])(c["a"],null,Object(c["A"])(r.farmland,(function(e,n){return Object(c["u"])(),Object(c["f"])("div",{key:n,onClick:function(n){return r.chosen=e},class:"farmland"},null,8,o)})),128)),Object(c["g"])("div",b,[Object(c["g"])("button",{onClick:n[0]||(n[0]=function(e){return r.Manager.sow(r.you,r.chosen)})},"播种"),Object(c["g"])("button",{onClick:n[1]||(n[1]=function(e){return r.Manager.harvest(r.you,r.chosen)})},"收获")])],64)}var l={setup:function(){var e=Object(c["m"])("Manager").value,n=e.you,t=n.不动产.reduce((function(n,t){var c=e.getEstateById(t);return"耕地"==c["类型"]&&n.push(c),n}),[]),u=Object(c["z"])(t[0]);return{Manager:e,you:n,farmland:t,chosen:u}}},j=(t("e4d3"),t("d959")),s=t.n(j);const O=s()(l,[["render",r],["__scopeId","data-v-340688fc"]]);n["default"]=O},2946:function(e,n,t){},e4d3:function(e,n,t){"use strict";t("2946")}}]);
//# sourceMappingURL=chunk-631a4b25.996e717b.js.map