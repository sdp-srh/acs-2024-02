import{_ as h,r as I,o as g,a as r,c as T,w as a,u as s,b as l,I as w,d as x,e as d,f as y,g as M,h as b,i as k,j as e,k as _,l as v,F as N,m as R,n as B,t as i,p as P,q as S}from"./index-CpnNPeCL.js";const C=o=>(P("data-v-c3cf69c6"),o=o(),S(),o),D={class:"ionic-table"},V=C(()=>e("thead",null,[e("tr",null,[e("th",null,"Team 1"),e("th",null,"Result"),e("th",null,"Teams 2")])],-1)),j=["src"],F=["src"],U={__name:"MatchesPage",setup(o){const c=I([]);g(async()=>{console.log("loading teams"),c.value.length===0&&m()});const m=async()=>{const n=await(await fetch("/api/match")).json();c.value=n},f=u=>{let n="";const t=u.matchResults.find(p=>p.resultTypeID==2);return t&&(n=t.pointsTeam1+" : "+t.pointsTeam2),n};return(u,n)=>(r(),T(s(B),null,{default:a(()=>[l(s(y),null,{default:a(()=>[l(s(w),null,{default:a(()=>[l(s(x),null,{default:a(()=>[d("Matches Page")]),_:1})]),_:1})]),_:1}),l(s(R),null,{default:a(()=>[l(s(M),null,{default:a(()=>[l(s(b),null,{default:a(()=>[l(s(k),{size:"12"},{default:a(()=>[e("table",D,[V,e("tbody",null,[(r(!0),_(N,null,v(c.value,t=>(r(),_("tr",{key:t.matchID},[e("td",null,[e("img",{src:t.team1.teamIconUrl,class:"team-icon"},null,8,j),d(" "+i(t.team1.teamName),1)]),e("td",null,i(f(t)),1),e("td",null,[e("img",{src:t.team2.teamIconUrl,class:"team-icon"},null,8,F),d(" "+i(t.team2.teamName),1)])]))),128))])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},z=h(U,[["__scopeId","data-v-c3cf69c6"]]);export{z as default};