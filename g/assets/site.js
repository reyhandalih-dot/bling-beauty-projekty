
(()=>{const d=document,b=d.querySelector('.burger'),m=d.querySelector('.mmenu');
if(b)b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);m.classList.toggle('open',!o);d.body.style.overflow=o?'':'hidden'});
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce||!window.gsap)return;
gsap.registerPlugin(ScrollTrigger);const ease='expo.out';
// hero entrance – once, from visible defaults
const tl=gsap.timeline({defaults:{ease,duration:1.2}});
d.querySelectorAll('[data-split]').forEach(el=>{el.innerHTML=[...el.textContent].map(c=>c===' '?' ':`<span>${c}</span>`).join('')});
tl.from('[data-split] span',{yPercent:110,opacity:0,stagger:.045,duration:1.1},0)
  .from('[data-enter]',{y:28,opacity:0,stagger:.08},.15)
  .from('[data-reveal]',{clipPath:'inset(100% 0 0 0)',duration:1.4,ease:'expo.inOut'},.05)
  .from('[data-pop]',{scale:.6,opacity:0,duration:.9,ease:'back.out(1.6)'},.6);
// moment: word highlight (F)
const w=d.querySelector('[data-words]');
if(w){w.classList.add('armed');const spans=w.querySelectorAll('span');ScrollTrigger.create({trigger:w,start:'top 75%',end:'bottom 45%',scrub:true,onUpdate:s=>{const n=Math.round(s.progress*spans.length);spans.forEach((x,i)=>x.classList.toggle('on',i<n))}})}
// moment: photo develops (G)
const dv=d.querySelector('[data-develop]');
if(dv){gsap.fromTo(dv,{clipPath:'inset(18% 22% 18% 22% round 999px)',filter:'saturate(0) blur(6px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',filter:'saturate(1) blur(0px)',ease:'none',scrollTrigger:{trigger:dv.closest('section'),start:'top 70%',end:'center 50%',scrub:true}})}
// moment: cursor peek (H)
const pk=d.querySelector('.peek');
if(pk&&matchMedia('(hover:hover)').matches){const img=pk.querySelector('img'),x=gsap.quickTo(pk,'x',{duration:.5,ease:'power3'}),y=gsap.quickTo(pk,'y',{duration:.5,ease:'power3'});
 d.querySelectorAll('[data-peek]').forEach(a=>{a.addEventListener('mouseenter',()=>{img.src=a.dataset.peek;gsap.to(pk,{opacity:1,scale:1,duration:.4,ease})});a.addEventListener('mouseleave',()=>gsap.to(pk,{opacity:0,scale:.85,duration:.3}))});
 addEventListener('mousemove',ev=>{x(ev.clientX+150);y(ev.clientY)})}
})();
