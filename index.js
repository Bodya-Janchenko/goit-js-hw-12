import{S as v,a as S,i as c}from"./assets/vendor-DFCQGEf1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const g=document.querySelector(".gallery");let P=new v(".gallery a");const p=r=>{const o=r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:t,views:n,comments:L,downloads:w})=>`
    <div class="image-card">
      <a href="${a}" target="_blank">
        <img src="${s}" alt="${e}" />
      </a>
      <div class="card-info">
        <span><strong>Likes</strong><br>${t}</span>
        <span><strong>Views</strong><br>${n}</span>
        <span><strong>Comments</strong><br>${L}</span>
        <span><strong>Downloads</strong><br>${w}</span>
      </div>
    </div>
  `).join("");g.insertAdjacentHTML("beforeend",o),P.refresh()},q=()=>{g.innerHTML=""},u=document.querySelector(".loader"),m=()=>{u.style.display="flex"},f=()=>{u.style.display="none"},d=document.querySelector(".btn-load-more"),y=()=>{d.style.display="flex"},h=()=>{d.style.display="none"};let i=1;const x=15,$=()=>{i=1},b=async r=>{try{const s=(await S.get("https://pixabay.com/api/",{params:{key:"50285738-1ed6c89d653294dbf28cfa2b7",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:x}})).data.hits;return s.length===0?(c.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):(i>1&&y(),i+=1,s)}catch(o){return console.log("The server did not return any images:",o),[]}},O=document.querySelector(".form");let l="";O.addEventListener("submit",async r=>{r.preventDefault();const o=r.currentTarget.elements["search-text"].value.trim();if(!o){c.warning({message:"Please enter a search term!",position:"topRight"});return}l=o,$(),q(),h(),m();try{const s=await b(l);p(s),s.length===15&&y()}catch{c.error({message:"Something went wrong while fetching images!",position:"topRight"})}finally{f()}});d.addEventListener("click",async()=>{m();try{const r=await b(l);p(r),r.length<15&&h()}catch{c.error({message:"Failed to load more images!",position:"topRight"})}finally{f()}});
//# sourceMappingURL=index.js.map
