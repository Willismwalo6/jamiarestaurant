(()=>{
const WA='254710214058',GA_ID='G-XXXXXXXXXX',$=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)],kes=n=>'KES '+n.toLocaleString('en-KE');
document.documentElement.classList.add('js');
const wa=t=>window.open(`https://wa.me/${WA}?text=${encodeURIComponent(t)}`,'_blank','noopener');
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
// nav
const nav=$('.nav'),bg=$('.burger');
bg&&bg.addEventListener('click',()=>{nav.classList.add('open');bg.setAttribute('aria-expanded','true')});
$$('.nav .x,.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');bg&&bg.setAttribute('aria-expanded','false')}));
// open/closed (Nairobi time)
const h=new Date(Date.now()+new Date().getTimezoneOffset()*6e4+108e5).getHours(),open=h>=8&&h<23;
$$('[data-open]').forEach(e=>{e.classList.toggle('off',!open);e.lastChild.textContent=open?' Open now · 8AM – 11PM':' Closed now · opens 8AM'});
// hero slider
const sl=$$('.slide'),dt=$$('.dots button');let i=0,tm;
if(sl.length){const go=n=>{sl[i].classList.remove('on');dt[i].classList.remove('on');i=(n+sl.length)%sl.length;sl[i].classList.add('on');dt[i].classList.add('on')};
const rdy=n=>{const m=sl[(n+sl.length)%sl.length].querySelector('img');return m.complete&&m.naturalWidth?Promise.resolve():new Promise(r=>{m.addEventListener('load',r,{once:true});m.addEventListener('error',r,{once:true})})};
addEventListener('load',()=>sl.forEach(s=>{const m=s.querySelector('img');m.loading='eager';m.decode&&m.decode().catch(()=>{})}));
const run=()=>{clearInterval(tm);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)tm=setInterval(()=>rdy(i+1).then(()=>go(i+1)),5500)};
dt.forEach((d,n)=>d.addEventListener('click',()=>{rdy(n).then(()=>{go(n);run()})}));run();document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(tm):run())}
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((e,n)=>{e.style.setProperty('--d',(n%4)*.09+'s');io.observe(e)});
// dialogs: legal + lightbox
$$('[data-modal]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.modal).showModal()));
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d||e.target.closest('[data-close]'))d.close()})});
const lb=$('#lb'),zs=$$('img[data-zoom]');let z=0;
const show=n=>{z=(n+zs.length)%zs.length;const s=zs[z];$('img',lb).src=s.src;$('img',lb).alt=s.alt};
zs.forEach((im,n)=>im.addEventListener('click',()=>{show(n);lb.showModal()}));
$('.lb-n.p')?.addEventListener('click',e=>{e.stopPropagation();show(z-1)});$('.lb-n.n')?.addEventListener('click',e=>{e.stopPropagation();show(z+1)});
lb?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(z-1);if(e.key==='ArrowRight')show(z+1)});
// cookies + analytics (loads only after consent)
const ck=$('.ck'),ga=()=>{if(GA_ID.includes('X')||window.gtag)return;const s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',GA_ID,{anonymize_ip:true})};
const c=ls.get('jm-ck');if(c==='yes')ga();else if(!c)setTimeout(()=>ck.classList.add('show'),1200);
$$('[data-ck]').forEach(b=>b.addEventListener('click',()=>{ls.set('jm-ck',b.dataset.ck);ck.classList.remove('show');if(b.dataset.ck==='yes')ga()}));
// look: classic / evening
const tg=$('.tg'),root=document.documentElement,applyTh=t=>{t==='evening'?root.dataset.theme='evening':delete root.dataset.theme;tg&&(tg.setAttribute('aria-pressed',String(t==='evening')),tg.setAttribute('aria-label',t==='evening'?'Switch to classic look':'Switch to evening look'))};
applyTh(ls.get('jm-th','classic'));tg&&tg.addEventListener('click',()=>{const t=root.dataset.theme==='evening'?'classic':'evening';ls.set('jm-th',t);applyTh(t)});
// validation helper
const need=(f,rules)=>{let ok=true;$$('.er',f).forEach(e=>e.textContent='');for(const[n,msg,re]of rules){const el=f.elements[n];const bad=!el.value.trim()||(re&&!re.test(el.value.trim()));if(bad){ok=false;el.closest('label,div').querySelector('.er').textContent=msg}}if(!ok)$('.er:not(:empty)',f)?.scrollIntoView({block:'center',behavior:'smooth'});return ok};
const ph=/^(\+?254|0)?[17]\d{8}$/;
// ===== menu + cart =====
const menu=$('#menu');
if(menu){
 const cards=$$('.card',menu),cart=ls.get('jm-cart',{}),info={};
 cards.forEach(c=>info[c.dataset.id]={n:c.dataset.name,p:+c.dataset.price});
 const priced=cards.some(c=>+c.dataset.price>0);let cat='all',q='';
 const filt=()=>{let k=0;cards.forEach(c=>{const v=(cat==='all'||c.dataset.cat===cat)&&(!q||c.textContent.toLowerCase().includes(q));c.hidden=!v;if(v)k++});$('#none').hidden=k>0};
 $$('.chip').forEach(b=>b.addEventListener('click',()=>{$$('.chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.cat;filt();history.replaceState(null,'','#'+cat)}));
 $('#q').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();filt()});
 const h0=location.hash.slice(1);if(h0)$(`.chip[data-cat="${h0}"]`)?.click();
 const zones=[...$('#zone').options].slice(1);
 const fee=()=>$('input[name=type]:checked').value==='Delivery'?(+$('#zone').selectedOptions[0]?.dataset.fee||0):0;
 const sub=()=>Object.entries(cart).reduce((s,[id,n])=>s+info[id].p*n,0),cnt=()=>Object.values(cart).reduce((s,n)=>s+n,0);
 const sync=()=>{ls.set('jm-cart',cart);cards.forEach(c=>{const n=cart[c.dataset.id]||0;c.classList.toggle('sel',n>0);$('.qty b',c).textContent=n});
  $('.cartbar').classList.toggle('show',cnt()>0);$('#cn').textContent=cnt()+(cnt()===1?' item':' items');$('#cs').textContent=priced?kes(sub()):'Prices on WhatsApp';
  const L=$('#lines');L.innerHTML=Object.entries(cart).map(([id,n])=>`<div class="ln"><div><b>${info[id].n}</b><small>${priced?kes(info[id].p)+' each':'Price confirmed on WhatsApp'}</small></div><div class="qty" data-id="${id}"><button type="button" data-d="-1" aria-label="Remove one ${info[id].n}">−</button><b>${n}</b><button type="button" data-d="1" aria-label="Add one ${info[id].n}">+</button></div></div>`).join('')||'<p class="empty">Your order is empty. Add something tasty from the menu.</p>';
  const d=$('input[name=type]:checked').value==='Delivery';$('#dl').hidden=!d;$('#t-sub').textContent=priced?kes(sub()):'Confirmed on WhatsApp';$('#t-fee').textContent=d?kes(fee()):'Pickup · free';$('#t-tot').textContent=priced?kes(sub()+fee()):(d?kes(fee())+' + food':'Food total on WhatsApp')};
 document.addEventListener('click',e=>{const b=e.target.closest('[data-d],.add');if(!b)return;const id=(b.closest('[data-id]')||{dataset:{}}).dataset.id;if(!id)return;const d=b.classList.contains('add')?1:+b.dataset.d;cart[id]=Math.max(0,(cart[id]||0)+d);if(!cart[id])delete cart[id];sync()});
 $('.cartbar .btn').addEventListener('click',()=>$('#cart').showModal());
 $$('input[name=type],#zone').forEach(e=>e.addEventListener('change',sync));
 $('#of').addEventListener('submit',e=>{e.preventDefault();const f=e.target,d=f.elements.type.value==='Delivery';
  if(!cnt()){$('#lines').scrollIntoView();return}
  const rules=[['name','Please enter your name.'],['phone','Enter a valid phone number, e.g. 0712 345 678.',ph]];if(d)rules.push(['zone','Choose your delivery area.'],['addr','Enter your delivery address.']);
  if(!need(f,rules))return;
  const L=Object.entries(cart).map(([id,n])=>`${n} x ${info[id].n}${priced?' - '+kes(info[id].p*n):''}`).join('\n');
  wa(`*New order - Jamia Food Mart & Coffee Lounge*\n\n*Customer:* ${f.elements.name.value}\n*Phone:* ${f.phone.value}\n*Order type:* ${f.type.value}\n`+(d?`*Delivery area:* ${f.zone.selectedOptions[0].text}\n*Address:* ${f.addr.value}\n`:'')+`\n*Items*\n${L}\n\n*Subtotal:* ${priced?kes(sub()):'To be confirmed on WhatsApp'}\n*Delivery fee:* ${d?kes(fee()):'None (pickup)'}\n*TOTAL:* ${priced?kes(sub()+fee()):(d?kes(fee())+' delivery + food (to be confirmed)':'Food total to be confirmed')}\n\n*Payment:* ${f.pay.value}`+(f.note.value?`\n*Notes:* ${f.note.value}`:''))});
 const vw=$$('.vw'),setV=v=>{vw.forEach(x=>{x.classList.toggle('on',x.dataset.v===v);x.setAttribute('aria-pressed',x.dataset.v===v)});$('.cards',menu).classList.toggle('list',v==='list')};
 vw.forEach(b=>b.addEventListener('click',()=>{setV(b.dataset.v);ls.set('jm-v',b.dataset.v)}));setV(ls.get('jm-v','grid'));
 sync();filt();
}
// ===== reservation =====
const rf=$('#rf');
if(rf){const d=rf.elements.date;d.min=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
 rf.addEventListener('submit',e=>{e.preventDefault();if(!need(rf,[['name','Please enter your name.'],['phone','Enter a valid phone number, e.g. 0712 345 678.',ph],['date','Choose a date.'],['time','Choose a time.']]))return;
  const dt=new Date(rf.date.value+'T00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  wa(`*Table reservation - Jamia Food Mart & Coffee Lounge*\n\n*Name:* ${rf.elements.name.value}\n*Phone:* ${rf.phone.value}\n*Date:* ${dt}\n*Time:* ${rf.time.value}\n*Guests:* ${rf.guests.value}`+(rf.note.value?`\n*Requests:* ${rf.note.value}`:''));$('#ok').hidden=false})}
})();
