import{c as p,h as g}from"./render.0197bdda.js";import{i as s,e as t,j as h,I as d,c,h as f,g as m,ab as y,L as x,a9 as v}from"./index.f20c2459.js";var C=p({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(a,{slots:r}){const{proxy:{$q:o}}=m(),e=s(h,t);if(e===t)return console.error("QPage needs to be a deep child of QLayout"),t;if(s(d,t)===t)return console.error("QPage needs to be child of QPageContainer"),t;const i=c(()=>{const n=(e.header.space===!0?e.header.size:0)+(e.footer.space===!0?e.footer.size:0);if(typeof a.styleFn=="function"){const u=e.isContainer.value===!0?e.containerHeight.value:o.screen.height;return a.styleFn(n,u)}return{minHeight:e.isContainer.value===!0?e.containerHeight.value-n+"px":o.screen.height===0?n!==0?`calc(100vh - ${n}px)`:"100vh":o.screen.height-n+"px"}}),l=c(()=>`q-page${a.padding===!0?" q-layout-padding":""}`);return()=>f("main",{class:l.value,style:i.value},g(r.default))}});const $={__name:"IndexPage",setup(a){return y({name:"IndexPage"}),(r,o)=>(x(),v(C,{class:"flex flex-center"}))}};export{$ as default};