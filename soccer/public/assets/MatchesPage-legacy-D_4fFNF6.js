System.register(["./index-legacy-CoAkh36u.js"],(function(t,e){"use strict";var a,l,c,n,u,s,d,i,o,m,r,f,h,g,p,v,_,b,y,x,I,w,T,j;return{setters:[t=>{a=t._,l=t.r,c=t.o,n=t.a,u=t.c,s=t.w,d=t.u,i=t.b,o=t.I,m=t.d,r=t.e,f=t.f,h=t.g,g=t.h,p=t.i,v=t.j,_=t.k,b=t.l,y=t.F,x=t.m,I=t.n,w=t.t,T=t.p,j=t.q}],execute:function(){var e=document.createElement("style");e.textContent=".ionic-table[data-v-c3cf69c6]{width:100%;border-collapse:collapse}.ionic-table th[data-v-c3cf69c6],.ionic-table td[data-v-c3cf69c6]{text-align:left;padding:8px;border:1px solid #e0e0e0}.ionic-table th[data-v-c3cf69c6]{background-color:#f0f0f0}.team-icon[data-v-c3cf69c6]{height:1.2em;width:auto;vertical-align:middle}\n",document.head.appendChild(e);const k={class:"ionic-table"},C=(t=>(T("data-v-c3cf69c6"),t=t(),j(),t))((()=>v("thead",null,[v("tr",null,[v("th",null,"Team 1"),v("th",null,"Result"),v("th",null,"Teams 2")])],-1))),D=["src"],M=["src"];t("default",a({__name:"MatchesPage",setup(t){const e=l([]);c((async()=>{console.log("loading teams"),0===e.value.length&&a()}));const a=async()=>{const t=await fetch("/api/match"),a=await t.json();e.value=a},T=t=>{let e="";const a=t.matchResults.find((t=>2==t.resultTypeID));return a&&(e=a.pointsTeam1+" : "+a.pointsTeam2),e};return(t,a)=>(n(),u(d(I),null,{default:s((()=>[i(d(f),null,{default:s((()=>[i(d(o),null,{default:s((()=>[i(d(m),null,{default:s((()=>[r("Matches Page")])),_:1})])),_:1})])),_:1}),i(d(x),null,{default:s((()=>[i(d(h),null,{default:s((()=>[i(d(g),null,{default:s((()=>[i(d(p),{size:"12"},{default:s((()=>[v("table",k,[C,v("tbody",null,[(n(!0),_(y,null,b(e.value,(t=>(n(),_("tr",{key:t.matchID},[v("td",null,[v("img",{src:t.team1.teamIconUrl,class:"team-icon"},null,8,D),r(" "+w(t.team1.teamName),1)]),v("td",null,w(T(t)),1),v("td",null,[v("img",{src:t.team2.teamIconUrl,class:"team-icon"},null,8,M),r(" "+w(t.team2.teamName),1)])])))),128))])])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}))}},[["__scopeId","data-v-c3cf69c6"]]))}}}));