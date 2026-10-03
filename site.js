(function(){
var S=window.SITE=window.SITE||{};
var TH=window.THEMES={
charcoal:{n:'Charcoal Orange',bg:'#131417',card:'#1b1c21',ink:'#f3f1ee',mute:'#a4a7b0',or:'#ff6b1a',bl:'#1ea7ff',on:'#ffffff'},
midnight:{n:'Midnight Blue',bg:'#0a1124',card:'#121b36',ink:'#eef3ff',mute:'#9aa8c7',or:'#4f8cff',bl:'#22d3ee',on:'#ffffff'},
purple:{n:'Slate Purple',bg:'#16131f',card:'#201b2e',ink:'#f2eefb',mute:'#a59cbd',or:'#b36bff',bl:'#ff6bb5',on:'#ffffff'},
emerald:{n:'Emerald Dark',bg:'#0c1512',card:'#14211c',ink:'#ecf6f1',mute:'#93aba2',or:'#2ee6a6',bl:'#f5c542',on:'#05261b'}};
function rgb(h){h=h.replace('#','');return parseInt(h.slice(0,2),16)+','+parseInt(h.slice(2,4),16)+','+parseInt(h.slice(4,6),16)}
window.applyTheme=function(id){var t=TH[id]||TH.charcoal,r=document.documentElement.style;['bg','card','ink','mute','or','bl','on'].forEach(function(k){r.setProperty('--'+k,t[k])});r.setProperty('--orgb',rgb(t.or));r.setProperty('--blrgb',rgb(t.bl));r.setProperty('--bgrgb',rgb(t.bg))};
applyTheme(S.theme);
var E=window.esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var IM=window.safeImg=function(p){return /^(uploads|assets)\/[\w.\/-]+$/.test(p||'')||/^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+\/=]+$/.test(p||'')?p:''};
var UR=function(u){u=String(u||'').trim();return /^(https?:\/\/|mailto:)/i.test(u)?u:'#'};
var SL=function(s){return /^[a-z0-9-]+$/.test(s||'')?s:'link'};
var PAL=['var(--or),var(--bg)','var(--bl),var(--bg)','var(--or),var(--bl)','var(--bl),var(--or)'];
var sv=function(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>'};
var IC={s:['<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m10 9 5 3-5 3z"/>','<rect x="7" y="2" width="10" height="20" rx="2"/><path d="m11 9 3 2-3 2z"/>','<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>','<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M12 18v-5M10 15l2-2 2 2"/>'],
a:['<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>','<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>','<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>'],
c:{long:'<path d="M8 5v14l11-7z"/>',short:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',grade:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h9M12 8h9"/>'}};
window.CATS={long:'YouTube Long Form',short:'Short Form Reels',grade:'Color Grading & Sound Design'};
function ph(o,i,ic){var im=IM(o.img);return '<div class="ph"'+(im?'':' style="background:linear-gradient(135deg,'+PAL[i%4]+')"')+'>'+(im?'<img src="'+im+'" alt="'+E(o.t)+'" loading="lazy">':ic)+'</div>'}
var R={
featured:function(L){return L.map(function(o,i){return '<article class="thumb rv">'+ph(o,i,'')+'<div class="cap"><h3>'+E(o.t)+'</h3><small>'+E(o.g)+'</small></div></article>'}).join('')},
services:function(L){return L.map(function(o,i){return '<article class="svc rv"><div class="svi"><div class="ic">'+sv(IC.s[o.i]||IC.s[0])+'</div><h3>'+E(o.t)+'</h3><p>'+E(o.d)+'</p><div class="price">'+(o.p?'<small>Starting at</small><strong>$'+E(o.p)+'</strong><span>'+E(o.u)+'</span>':'<small>Contact for pricing</small>')+'</div></div></article>'}).join('')},
awards:function(L){return L.map(function(o){return '<div data-solo><article class="awc rv"><div class="awi"><div class="ic">'+sv(IC.a[o.i]||IC.a[0])+'</div><div>'+(o.y?'<span class="yr">'+E(o.y)+'</span>':'')+'<h3>'+E(o.t)+'</h3>'+(o.g?'<p class="by">Given by '+E(o.g)+'</p>':'')+'<p>'+E(o.d)+'</p></div></div></article></div>'}).join('')},
projects:function(L){return L.map(function(o,i){var c=CATS[o.c]?o.c:'long';return '<article class="pcard rv" data-cat="'+c+'" tabindex="0" role="button"><div class="pc"><div class="pt">'+ph(o,i,sv(IC.c[c]))+'</div><div class="pb"><span class="tg">'+E(CATS[c])+'</span><h3>'+E(o.t)+'</h3><p>'+E(o.d)+'</p></div></div></article>'}).join('')},
socials:function(L){return L.map(function(o){return '<a class="soc" href="'+E(UR(o.u))+'" target="_blank" rel="noopener" aria-label="'+E(o.n)+'"><img src="https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/'+SL(o.s)+'.svg" alt="">'+E(o.n)+'</a>'}).join('')},
csocs:function(L){return L.filter(function(o){return o.c}).map(function(o){return '<a href="'+E(UR(o.u))+'" aria-label="'+E(o.n)+'" target="_blank" rel="noopener"><img src="https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/'+SL(o.s)+'.svg" alt=""></a>'}).join('')}};
window.renderSite=function(){
document.querySelectorAll('[data-list]').forEach(function(el){var k=el.dataset.list,L=S[k=='csocs'?'socials':k];if(Array.isArray(L))el.innerHTML=R[k](L)});
document.querySelectorAll('[data-t]').forEach(function(el){var v=S.t&&S.t[el.dataset.t];if(typeof v=='string')el.textContent=v});
document.querySelectorAll('[data-n]').forEach(function(el){var v=S.n&&S.n[el.dataset.n];if(v!==undefined&&v!==''&&!isNaN(v)){el.dataset.to=v;var b=el.closest('.skill');if(b)b.querySelector('.bar').style.setProperty('--w',Math.max(0,Math.min(100,v))+'%')}});
document.querySelectorAll('[data-img]').forEach(function(el){var p=IM(S.img&&S.img[el.dataset.img]);if(p)el.src=p});
var C=S.contact||{};
document.querySelectorAll('[data-c]').forEach(function(el){var b=el.querySelector('b');if(el.dataset.c=='email'&&/^[^\s<>"']+@[^\s<>"']+$/.test(C.email||'')){el.href='mailto:'+C.email;b.textContent=C.email}
if(el.dataset.c=='wa'&&C.whatsapp){b.textContent=C.whatsapp;var d=String(C.whatsapp).replace(/\D/g,'');if(d.length>=8){el.style.cursor='pointer';el.onclick=function(){window.open('https://wa.me/'+d,'_blank','noopener')}}}})};
})();
