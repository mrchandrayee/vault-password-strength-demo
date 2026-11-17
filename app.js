(() => {
const $=s=>document.querySelector(s);
const input=$("#password"),card=$("#lockCard"),visual=$("#lockVisual"),name=$("#tierName"),time=$("#crackTime"),entropy=$("#entropy"),message=$("#message"),meter=[...document.querySelectorAll(".meter i")];
const MARK=[0,1,2,3,4];
let currentTier=0,show=false;
const labels=[
 {name:"No lock at all",time:"The door is standing open.",bits:"0 bits of entropy"},
 {name:"A bent paperclip",time:"Cracked instantly.",bits:"",msg:"That's not a lock. That's a suggestion."},
 {name:"A padlock",time:"Cracked in 2 seconds.",bits:"",msg:"A little resistance. Not much."},
 {name:"A deadbolt",time:"Cracked in 5 days.",bits:"",msg:"Now we're getting somewhere."},
 {name:"A bank vault",time:"Cracked in 3 thousand years.",bits:"",msg:"Wait for the last lock!"}
];
function lockSVG(t){
 if(t===0)return `<svg viewBox="0 0 150 150" aria-hidden="true"><rect x="43" y="20" width="64" height="110" rx="9" fill="#53616c" opacity=".35"/><rect x="48" y="24" width="55" height="102" rx="6" fill="url(#door)"/><path d="M74 25v100" stroke="#81909b" stroke-width="2"/><circle cx="91" cy="75" r="3" fill="#a6b0b6"/><defs><linearGradient id="door" x2="1" y2="1"><stop stop-color="#63717c"/><stop offset=".5" stop-color="#283641"/><stop offset="1" stop-color="#17232d"/></linearGradient></defs></svg>`;
 if(t===1)return `<svg viewBox="0 0 150 150"><rect x="34" y="16" width="82" height="118" rx="8" fill="#25313b" stroke="#697681" stroke-width="2"/><path d="M53 52V31Q53 13 75 13Q97 13 97 31V52" fill="none" stroke="#d0d5d5" stroke-width="8" stroke-linecap="round"/><rect x="48" y="48" width="54" height="66" rx="7" fill="#4a5963" stroke="#9ba6aa" stroke-width="2"/><circle cx="75" cy="76" r="7" fill="#1a2730"/><path d="M75 82v13" stroke="#18242d" stroke-width="5"/><path d="M20 25h10M120 25h10" stroke="#e65d4c" stroke-width="4"/></svg>`;
 if(t===2)return `<svg viewBox="0 0 150 150"><rect x="24" y="12" width="102" height="126" rx="9" fill="#29333d" stroke="#d18a37" stroke-width="3"/><path d="M48 58V38Q48 12 75 12Q102 12 102 38V58" fill="none" stroke="#aeb8bd" stroke-width="12" stroke-linecap="round"/><rect x="39" y="52" width="72" height="70" rx="8" fill="#6a7880" stroke="#d2a45d" stroke-width="3"/><circle cx="75" cy="81" r="9" fill="#27333b"/><path d="M75 90v16" stroke="#26313a" stroke-width="6"/><path d="M18 75h14M118 75h14" stroke="#e4a24d" stroke-width="5"/></svg>`;
 if(t===3)return `<svg viewBox="0 0 150 150"><rect x="12" y="16" width="126" height="118" rx="12" fill="#303a42" stroke="#d8c044" stroke-width="4"/><rect x="25" y="29" width="100" height="92" rx="7" fill="#1c2933" stroke="#8f9a9d" stroke-width="2"/><circle cx="75" cy="75" r="34" fill="#69777d" stroke="#b9c0bc" stroke-width="5"/><circle cx="75" cy="75" r="25" fill="#34434b" stroke="#aab4b6" stroke-width="3"/><circle cx="75" cy="75" r="9" fill="#111b24" stroke="#b7c0c1" stroke-width="3"/><path d="M75 42v13M75 95v13M42 75h13M95 75h13M52 52l9 9M89 89l9 9M98 52l-9 9M61 89l-9 9" stroke="#d4dadd" stroke-width="5" stroke-linecap="round"/><circle cx="75" cy="17" r="4" fill="#c5d0d0"/></svg>`;
}
function getEntropy(value){
 if(!value.length)return 0;
 // Match the source demo's simplified character-pool estimate:
 // use an illustrative 60-character pool for a passphrase-like input.
 const pool=60; // illustrative pool used by the screen-demo sample
 return value.length*Math.log2(pool);
}
function tierFor(bits){return bits<30?1:bits<50?2:bits<70?3:4}
function crackEstimate(bits,tier){
 if(tier===1)return "Cracked instantly.";
 if(tier===2)return "Cracked in 2 seconds.";
 if(tier===3)return "Cracked in 5 days.";
 if(bits>=70)return "Cracked in 3 thousand years.";
 return "Cracked in 4 years.";
}
function update(){
 const value=input.value;
 if(!value){currentTier=0;card.className="lock-card tier-0";visual.innerHTML=lockSVG(0);name.textContent=labels[0].name;time.textContent=labels[0].time;entropy.textContent=labels[0].bits;meter.forEach(x=>x.classList.remove("on"));message.textContent="Your password is the key. Let's see what it can hold.";return}
 const bits=getEntropy(value),tier=tierFor(bits);
 currentTier=tier;card.className=`lock-card tier-${tier}`;visual.innerHTML=lockSVG(tier);name.textContent=labels[tier].name;time.textContent=crackEstimate(bits,tier);entropy.textContent=`${Math.round(bits)} bits of entropy`;meter.forEach((x,i)=>x.classList.toggle("on",i<tier));message.textContent=tier===4?"Wait for the last lock!":labels[tier].msg;
}
input.addEventListener("input",update);
$("#toggleVisibility").onclick=()=>{show=!show;input.type=show?"text":"password";$("#toggleVisibility").setAttribute("aria-label",show?"Hide password":"Show password");input.focus()};
function suggest(){const words=["moth","lantern","velvet","orbit","cedar","harbor","quiet","meadow","copper","comet","willow","marble"];let chosen=[];while(chosen.length<3){let w=words[Math.floor(Math.random()*words.length)];if(!chosen.includes(w))chosen.push(w)}input.value=chosen.join("-");input.type="text";show=true;$("#toggleVisibility").setAttribute("aria-label","Hide password");update();input.focus();toast("A strong passphrase was suggested")}
$("#suggest").onclick=suggest;
function toast(s){let t=$("#toast");t.textContent=s;t.classList.add("show");clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove("show"),1800)}
input.value="moth-lantern";update();
})();