
import * as T from './three.bundle.min.js';
const host=document.querySelector('.pearl-stage');
function fail(){document.documentElement.classList.add('no-gl')}
try{
 const cv=document.createElement('canvas');const gl=cv.getContext('webgl2')||cv.getContext('webgl');if(!gl)throw 0;
 const r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'low-power'});
 r.setPixelRatio(Math.min(devicePixelRatio,2));r.toneMapping=T.ACESFilmicToneMapping;r.outputColorSpace=T.SRGBColorSpace;
 host.appendChild(cv);
 const sc=new T.Scene(),cam=new T.PerspectiveCamera(35,1,.1,100);cam.position.set(0,0,12);
 const pm=new T.PMREMGenerator(r);sc.environment=pm.fromScene(new T.RoomEnvironment(),.04).texture;
 sc.add(new T.AmbientLight(0xffffff,.4));const k=new T.DirectionalLight(0xffe0ea,2.2);k.position.set(4,6,8);sc.add(k);
 const pearl=new T.MeshPhysicalMaterial({color:0xf9c3d5,roughness:.16,metalness:0,clearcoat:1,clearcoatRoughness:.06,iridescence:.85,iridescenceIOR:1.35,sheen:.6,sheenColor:new T.Color(0xffd9e6)});
 const hot=new T.MeshPhysicalMaterial({color:0xe0457b,roughness:.1,metalness:.15,clearcoat:1,clearcoatRoughness:.04,iridescence:.4});
 const gem=new T.MeshPhysicalMaterial({color:0xffb3cf,roughness:.05,metalness:.35,clearcoat:1,iridescence:1,iridescenceIOR:1.6,flatShading:true});
 const g=new T.Group();sc.add(g);const sp=new T.SphereGeometry(1,64,64);
 const P=[[-2.5,2.3,.5,.62,pearl],[-2.9,-.5,1.2,.4,pearl],[-2.1,-2.5,.2,.8,hot],[2.6,2.6,.4,.48,hot],[2.8,.2,1.4,.72,pearl],[2.2,-2.4,.8,.38,pearl],[-.5,3.2,-.6,.3,pearl],[1,-3.2,1.6,.28,hot]];
 const items=P.map(([x,y,z,s,m])=>{const o=new T.Mesh(sp,m);o.position.set(x,y,z);o.scale.setScalar(s);o.userData={y,ph:Math.random()*6.28};g.add(o);return o});
 [[-1.6,1.1,2.4,.48],[1.9,-1,2.6,.42]].forEach(([x,y,z,s])=>{const o=new T.Mesh(new T.OctahedronGeometry(1,0),gem);o.position.set(x,y,z);o.scale.set(s,s*1.35,s);o.userData={y,ph:Math.random()*6.28,spin:1};g.add(o);items.push(o)});
 function size(){const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
 size();addEventListener('resize',size);
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const clk=new T.Clock();let tx=0,ty=0,vis=true;
 addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5)*.35;ty=(e.clientY/innerHeight-.5)*.25});
 new IntersectionObserver(([en])=>{vis=en.isIntersecting}).observe(host);
 function frame(){const t=clk.getElapsedTime();items.forEach(o=>{o.position.y=o.userData.y+Math.sin(t*.8+o.userData.ph)*.18;if(o.userData.spin)o.rotation.y=t*.5});
  g.rotation.y+=(tx-g.rotation.y)*.05;g.rotation.x+=(ty-g.rotation.x)*.05;r.render(sc,cam)}
 if(reduce)frame();else r.setAnimationLoop(()=>{if(vis)frame()});
}catch(e){fail()}
