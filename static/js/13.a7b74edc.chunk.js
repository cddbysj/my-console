(this["webpackJsonpmy-console"]=this["webpackJsonpmy-console"]||[]).push([[13],{621:function(e,a,t){"use strict";t.r(a);t(276);var n=t(234),r=(t(268),t(106)),l=(t(191),t(17)),c=(t(141),t(86)),m=(t(145),t(92)),u=(t(63),t(15)),i=(t(113),t(60)),o=(t(269),t(174)),s=(t(542),t(545)),E=(t(140),t(68)),p=(t(193),t(103)),d=(t(199),t(41)),f=t(112),v=t(8),y=t.n(v),b=(t(142),t(40)),A=t(235),O=t(50),g=(t(541),t(544)),N=t(0),S=t.n(N),I=t(69),h=t.n(I),k=t(620),j=t(619),C=t(618),w=t(524),H=t(538),P=t(617),q=t(528),J=t(34);var D=t(52),M=t.n(D),T=t(570),x=t.n(T).a.bind(M.a),B=g.a.TabPane;a.default=function(e){var a=Object(N.useState)("SHOW_ACTIVE"),t=Object(O.a)(a,2),v=t[0],I=t[1],D=function(e){var a=Object(N.useState)(null),t=Object(O.a)(a,2),n=t[0],r=t[1];return Object(N.useEffect)((function(){return J.a.certificates(e).onSnapshot((function(e){var a=[];e.forEach((function(e){var t=e.data(),n=t.orderId,r=t.arrivalAt,l=t.products,c=t.preparePrintAt,m=t.printDone;Object.keys(l).forEach((function(e){return a.push(Object(f.a)({},l[e],{name:e,orderId:n,arrivalAt:r,preparePrintAt:c,printDone:m}))}))})),r(a)}))}),[e]),n}(v),T=JSON.parse(localStorage.getItem("cardQueue"))||[],F=Object(N.useState)(T),L=Object(O.a)(F,2),Q=L[0],V=L[1];Object(N.useEffect)((function(){return localStorage.setItem("cardQueue",JSON.stringify(Q)),function(){return localStorage.removeItem("cardQueue")}}));return S.a.createElement(g.a,{defaultActiveKey:"plan"},S.a.createElement(B,{tab:"\u8ba1\u5212",key:"plan"},S.a.createElement("div",{className:x("noPrint","planArea")},S.a.createElement("div",{className:M.a.filter},S.a.createElement(d.a.Group,{onChange:function(e){I(e.target.value)},defaultValue:"\u672a\u6253\u5370"},S.a.createElement(d.a.Button,{value:"SHOW_ACTIVE"},"\u672a\u6253\u5370"),S.a.createElement(d.a.Button,{value:"SHOW_ALL"},"\u5168\u90e8"),S.a.createElement(d.a.Button,{value:"SHOW_COMPLETED"},"\u5df2\u6253\u5370"))),S.a.createElement("p",null,"\u4ea7\u54c1\u7684\u5408\u683c\u8bc1\u662f\u4ee5\u4e00\u4e2a\u8ba2\u5355\u4e3a\u57fa\u672c\u5355\u4f4d\uff0c\u540c\u4e00\u8ba2\u5355\u5185\u7684\u6240\u6709\u4ea7\u54c1\u5408\u683c\u8bc1\u5e94\u8be5\u540c\u65f6\u88ab\u6dfb\u52a0\u5230\u6253\u5370\u961f\u5217\uff0c\u540c\u65f6\u5b8c\u6210\u6253\u5370\uff0c\u4ee5\u53ca\u540c\u65f6\u88ab\u5220\u9664\u3002"),S.a.createElement("p",null,"\u5408\u683c\u8bc1\u4e0d\u8db3 9 \u4e2a\u65f6\uff0c\u53ef\u8003\u8651\u7528\u5e38\u89c1\u7684\u6d78\u6ca1\u5f0f\u52a0\u70ed\u5668\u5408\u683c\u8bc1\u586b\u5145\u3002"),D?S.a.createElement(o.a,{grid:{gutter:16,xl:6,md:4},dataSource:D,renderItem:function(e){return S.a.createElement(o.a.Item,null,S.a.createElement(s.a,{actions:[S.a.createElement(p.a,{title:"\u6dfb\u52a0\u5230\u6253\u5370\u5217\u8868"},S.a.createElement(k.a,{key:"plus",onClick:function(){return a=e,y.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.awrap(J.a.finishCertificatesPrint(a.orderId,!0));case 2:V((function(e){return[a].concat(Object(A.a)(e))})),b.a.success("\u5df2\u6dfb\u52a0\u5230\u6253\u5370\u5217\u8868",.5);case 4:case"end":return e.stop()}}));var a}})),S.a.createElement(p.a,{title:"\u672a\u5b8c\u6210\u7684\u529f\u80fd"},S.a.createElement(j.a,{key:"edit"})),S.a.createElement(p.a,{title:"\u672a\u5b8c\u6210\u7684\u529f\u80fd"},S.a.createElement(C.a,{key:"ellipsis"}))]},S.a.createElement("p",null,e.name),S.a.createElement("p",null,"\u6570\u91cf\uff1a",e.quantity," \u53f0"),S.a.createElement("p",null,"\u72b6\u6001\uff1a",e.printDone?S.a.createElement(E.a,{color:"#108ee9"},"\u5df2\u6253\u5370"):S.a.createElement(E.a,{color:"#f50"},"\u672a\u6253\u5370")),S.a.createElement("p",null,"\u521b\u5efa\u65e5\u671f\uff1a"),S.a.createElement("p",null,(a=e.preparePrintAt,new Date(a).toLocaleString("zh-Hans-CN"))),S.a.createElement("p",{className:M.a.ellipsis},"\u8ba2\u5355\u53f7\uff1a",e.orderId)));var a}}):S.a.createElement(i.a,null))),S.a.createElement(B,{tab:"\u9884\u89c8",key:"preview"},S.a.createElement("div",{className:x("noPrint","cardActions")},S.a.createElement(u.a.Group,null,S.a.createElement(u.a,{icon:S.a.createElement(w.a,null),type:"primary",onClick:function(){window.print()}},"\u6253\u5370"),S.a.createElement(u.a,{icon:S.a.createElement(H.a,null),type:"danger",onClick:function(){V([])}},"\u6e05\u7a7a")),S.a.createElement("p",null,S.a.createElement(P.a,null),S.a.createElement("span",null,"\u63d0\u793a\uff1a\u5c06\u9f20\u6807\u60ac\u505c\u5728\u5408\u683c\u8bc1\u5361\u7247\u53f3\u4e0a\u89d2\uff0c\u53ef\u4ee5\u5220\u9664\u8be5\u5408\u683c\u8bc1\u6240\u5c5e\u8ba2\u5355\u6240\u6709\u5408\u683c\u8bc1"))),Q.length?S.a.createElement("div",{className:M.a.cardArea},Q.map((function(e){return Array.from(new Array(e.quantity)).map((function(a,t){return S.a.createElement("div",{key:"".concat(e.name,"-").concat(e.arrivalAt,"-").concat(t)},S.a.createElement("div",{className:M.a.container},S.a.createElement("section",{className:M.a.cardHeader},S.a.createElement("p",{className:M.a.title},S.a.createElement("span",null,"SEMEM"),S.a.createElement(u.a,{ghost:!0,className:M.a.noPriFnt,icon:S.a.createElement(q.a,null),onClick:function(){return a=e.name,console.log("remove card"),void V((function(e){return e.filter((function(e){return e.name!==a}))}));var a}})),S.a.createElement("p",null,"HQS"===e.model?e.name.slice(0,3):e.model," ","Heater"),S.a.createElement("p",null,"\u68c0\u9a8c\u5408\u683c\u8bc1\u660e\u4e66")),S.a.createElement("section",{className:M.a.cardBody},S.a.createElement("p",null,"\u540d\u79f0\uff1a",S.a.createElement("span",{className:M.a.productName},e.name)),S.a.createElement("p",null,"\u68c0\u9a8c\u5458\uff1a",S.a.createElement(E.a,{color:"red"},"0306")),S.a.createElement("p",null,"\u68c0\u9a8c\u65e5\u671f\uff1a",e.arrivalAt),S.a.createElement("p",null,"\u672c\u4ea7\u54c1\u7ecf\u68c0\u9a8c\u5408\u683c\uff0c\u7b26\u5408\u6807\u51c6\uff0c\u51c6\u4e88\u51fa\u5382\u3002")),S.a.createElement("section",{className:M.a.cardFooter},S.a.createElement("p",{className:M.a.seal},S.a.createElement(E.a,{color:"red"},"\u897f\u95e8\u673a\u7535\u54c1\u8d28\u68c0\u9a8c\u4e2d\u5fc3")),S.a.createElement("p",null,"\u6e56\u5357\u897f\u95e8\u673a\u7535\u79d1\u6280\u6709\u9650\u516c\u53f8"))))}))}))):S.a.createElement(m.a,null)),S.a.createElement(B,{tab:"\u586b\u5145",key:"fill"},S.a.createElement(l.a,{onFinish:function(e){console.log("received values: ",e);var a=e.arrivalAt;V((function(t){return[Object(f.a)({},e,{arrivalAt:a.format("YYYY-MM")})].concat(Object(A.a)(t))})),b.a.success("\u6dfb\u52a0\u5408\u683c\u8bc1\u6210\u529f",.5)},layout:"inline",initialValues:{name:"HJ-50C",quantity:1,model:"HJ",arrivalAt:h()()}},S.a.createElement(l.a.Item,{name:"name",label:"\u4ea7\u54c1\u540d\u79f0",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4ea7\u54c1\u540d\u79f0"}]},S.a.createElement(c.a,{allowClear:!0,autoFocus:!0})),S.a.createElement(l.a.Item,{name:"quantity",label:"\u6570\u91cf",rules:[{required:!0,message:"\u8bf7\u6307\u5b9a\u6570\u91cf"}]},S.a.createElement(r.a,{min:1,max:9})),S.a.createElement(l.a.Item,{name:"model",label:"\u7ed3\u6784\u5f62\u5f0f",rules:[{required:!0,message:"\u8bf7\u6307\u5b9a\u7ed3\u6784"}]},S.a.createElement(c.a,null)),S.a.createElement(l.a.Item,{name:"arrivalAt",label:"\u68c0\u9a8c\u65e5\u671f",rules:[{required:!0,message:"\u8bf7\u6307\u5b9a\u68c0\u9a8c\u65e5\u671f"}]},S.a.createElement(n.a,null)),S.a.createElement(l.a.Item,null,S.a.createElement(u.a,{htmlType:"submit",type:"primary"},"\u6dfb\u52a0")))))}}}]);
//# sourceMappingURL=13.a7b74edc.chunk.js.map