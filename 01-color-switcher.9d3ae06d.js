const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(e){o=setInterval((function(){n.style.backgroundColor=r()}),1e3),t.disabled=!0}));let o=null;e.addEventListener("click",(function(){clearInterval(o),t.disabled=!1}));const r=function(){return`#${Math.floor(16777215*Math.random()).toString(16)}`};
//# sourceMappingURL=01-color-switcher.9d3ae06d.js.map