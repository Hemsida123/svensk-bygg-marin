(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const toggle=$('.menu-toggle'),menu=$('#mobile-menu');
function setMenu(open){if(!menu)return;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Stäng meny':'Öppna meny');document.body.classList.toggle('menu-open',open);if(open)$('a',menu)?.focus();else toggle.focus();}
toggle?.addEventListener('click',()=>setMenu(menu.hidden));
menu?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(menu&&!menu.hidden){if(e.key==='Escape')setMenu(false);if(e.key==='Tab'){const fs=[toggle,...$$('a,button',menu)],first=fs[0],last=fs.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}});
matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches&&menu&&!menu.hidden)setMenu(false)});
let ticking=false;function scrolled(){document.body.classList.toggle('scrolled',scrollY>15);ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(scrolled);ticking=true}},{passive:true});scrolled();
$$('[data-explorer]').forEach(root=>{const buttons=$$('[data-select]',root),panels=$$('[data-panel]',root),pictures=$$('[data-picture]',root);buttons.forEach((b,i)=>{b.addEventListener('click',()=>{buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));panels.forEach(x=>x.hidden=x.dataset.panel!==b.dataset.select);pictures.forEach(x=>x.hidden=x.dataset.picture!==b.dataset.select)});b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();buttons[(i+(e.key==='ArrowRight'?1:buttons.length-1))%buttons.length].focus()}})})});
const dialog=$('.lightbox'),links=$$('.gallery-open');let current=0,opener;
function showImage(){const l=links[current],img=$('img',dialog);img.src=l.href;img.alt=l.dataset.caption;$('.lightbox-caption',dialog).textContent=l.dataset.caption;$('.lightbox-counter',dialog).textContent=(current+1)+' / '+links.length;}
links.forEach((a,i)=>a.addEventListener('click',e=>{if(!dialog?.showModal)return;e.preventDefault();current=i;opener=a;showImage();dialog.showModal();document.body.style.overflow='hidden'}));
$('.lightbox-close')?.addEventListener('click',()=>dialog.close());$$('[data-dir]',dialog||document).forEach(b=>b.addEventListener('click',()=>{current=(current+Number(b.dataset.dir)+links.length)%links.length;showImage()}));dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){current=(current+(e.key==='ArrowRight'?1:links.length-1))%links.length;showImage()}});dialog?.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus()});
$$('[data-widget]').forEach(b=>b.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src=b.dataset.widget;frame.title='Kundomdömen från Reco';frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';b.parentElement.append(frame);b.hidden=true}));
})();
