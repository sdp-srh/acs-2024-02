import{_ as p,r as h,o as m,a as c,c as g,w as e,u as t,b as n,I,d as w,e as r,f as b,g as v,h as x,i as y,j as a,k as i,l as B,F as P,m as k,n as N,t as s,p as S,q as T}from"./index-CpnNPeCL.js";const C=o=>(S("data-v-840167a0"),o=o(),T(),o),H={class:"ionic-table"},V=C(()=>a("thead",null,[a("tr",null,[a("th",null,"#"),a("th",null,"Team"),a("th",null,"Points"),a("th",null,"Goals"),a("th",null,"Matches")])],-1)),j=["src"],D={__name:"HomePage",setup(o){const u=h([]);m(async()=>{console.log("loading ranking"),u.value.length===0&&_()});const _=async()=>{const d=await(await fetch("/api/ranking")).json();u.value=d};return(f,d)=>(c(),g(t(N),null,{default:e(()=>[n(t(b),null,{default:e(()=>[n(t(I),null,{default:e(()=>[n(t(w),null,{default:e(()=>[r("1. Bundesliga Page")]),_:1})]),_:1})]),_:1}),n(t(k),null,{default:e(()=>[n(t(v),null,{default:e(()=>[n(t(x),null,{default:e(()=>[n(t(y),{size:"12"},{default:e(()=>[a("table",H,[V,a("tbody",null,[(c(!0),i(P,null,B(u.value,l=>(c(),i("tr",{key:l.teamInfoId},[a("td",null,s(l.rank),1),a("td",null,[a("img",{src:l.teamIconUrl,class:"team-icon"},null,8,j),r(" "+s(l.teamName),1)]),a("td",null,s(l.points),1),a("td",null,s(l.goalDiff),1),a("td",null,s(l.matches),1)]))),128))])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},G=p(D,[["__scopeId","data-v-840167a0"]]);export{G as default};