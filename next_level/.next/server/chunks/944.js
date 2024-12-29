"use strict";exports.id=944,exports.ids=[944],exports.modules={21944:(e,t,s)=>{s.r(t),s.d(t,{createOrReadKeyless:()=>L});var i,n,r,l,a,o,c,u,d,h,p,f,m,k,y,S,g,w,b,v=s(54245),K=Object.getOwnPropertyNames;let M=((e,t)=>function(){return t||(0,e[K(e)[0]])((t={exports:{}}).exports,t),t.exports})({"src/runtime/node/safe-node-apis.js"(e,t){let{existsSync:i,writeFileSync:n,readFileSync:r,appendFileSync:l,mkdirSync:a,rmSync:o}=s(73024),c=s(76760);t.exports={fs:{existsSync:i,writeFileSync:n,readFileSync:r,appendFileSync:l,mkdirSync:a,rmSync:o},path:c}}})();var O=s(32723),C=s(49586);s(22195),s(94927);var V=s(39938),T=s(42909),E=s(35716),x=class{constructor(){(0,E.VK)(this,r),(0,E.VK)(this,i,"clerk_telemetry_throttler"),(0,E.VK)(this,n,864e5)}isEventThrottled(e){var t;if(!(0,E.S7)(this,r,o))return!1;let s=Date.now(),c=(0,E.jq)(this,r,l).call(this,e),u=null==(t=(0,E.S7)(this,r,a))?void 0:t[c];if(!u){let e={...(0,E.S7)(this,r,a),[c]:s};localStorage.setItem((0,E.S7)(this,i),JSON.stringify(e))}if(u&&s-u>(0,E.S7)(this,n)){let e=(0,E.S7)(this,r,a);delete e[c],localStorage.setItem((0,E.S7)(this,i),JSON.stringify(e))}return!!u}};i=new WeakMap,n=new WeakMap,r=new WeakSet,l=function(e){let{sk:t,pk:s,payload:i,...n}=e,r={...i,...n};return JSON.stringify(Object.keys({...i,...n}).sort().map(e=>r[e]))},a=function(){let e=localStorage.getItem((0,E.S7)(this,i));return e?JSON.parse(e):{}},o=function(){if("undefined"==typeof window)return!1;let e=window.localStorage;if(!e)return!1;try{let t="test";return e.setItem(t,t),e.removeItem(t),!0}catch(t){return t instanceof DOMException&&("QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e.length>0&&e.removeItem((0,E.S7)(this,i)),!1}};var j={samplingRate:1,maxBufferSize:5,endpoint:"https://clerk-telemetry.com"},R=class{constructor(e){var t,s,i,n,r,l;(0,E.VK)(this,f),(0,E.VK)(this,c),(0,E.VK)(this,u),(0,E.VK)(this,d,{}),(0,E.VK)(this,h,[]),(0,E.VK)(this,p),(0,E.OV)(this,c,{maxBufferSize:null!=(t=e.maxBufferSize)?t:j.maxBufferSize,samplingRate:null!=(s=e.samplingRate)?s:j.samplingRate,disabled:null!=(i=e.disabled)&&i,debug:null!=(n=e.debug)&&n,endpoint:j.endpoint}),e.clerkVersion||"undefined"!=typeof window?(0,E.S7)(this,d).clerkVersion=null!=(r=e.clerkVersion)?r:"":(0,E.S7)(this,d).clerkVersion="",(0,E.S7)(this,d).sdk=e.sdk,(0,E.S7)(this,d).sdkVersion=e.sdkVersion,(0,E.S7)(this,d).publishableKey=null!=(l=e.publishableKey)?l:"";let a=(0,T.q5)(e.publishableKey);a&&((0,E.S7)(this,d).instanceType=a.instanceType),e.secretKey&&((0,E.S7)(this,d).secretKey=e.secretKey.substring(0,16)),(0,E.OV)(this,u,new x)}get isEnabled(){var e;return!("development"!==(0,E.S7)(this,d).instanceType||(0,E.S7)(this,c).disabled||"undefined"!=typeof process&&(0,V.zz)(process.env.CLERK_TELEMETRY_DISABLED))&&("undefined"==typeof window||null==(e=null==window?void 0:window.navigator)||!e.webdriver)}get isDebug(){return(0,E.S7)(this,c).debug||"undefined"!=typeof process&&(0,V.zz)(process.env.CLERK_TELEMETRY_DEBUG)}record(e){let t=(0,E.jq)(this,f,b).call(this,e.event,e.payload);(0,E.jq)(this,f,g).call(this,t.event,t),(0,E.jq)(this,f,m).call(this,t,e.eventSamplingRate)&&((0,E.S7)(this,h).push(t),(0,E.jq)(this,f,y).call(this))}};c=new WeakMap,u=new WeakMap,d=new WeakMap,h=new WeakMap,p=new WeakMap,f=new WeakSet,m=function(e,t){return this.isEnabled&&!this.isDebug&&(0,E.jq)(this,f,k).call(this,e,t)},k=function(e,t){let s=Math.random();return!(0,E.S7)(this,u).isEventThrottled(e)&&s<=(0,E.S7)(this,c).samplingRate&&(void 0===t||s<=t)},y=function(){if("undefined"==typeof window){(0,E.jq)(this,f,S).call(this);return}if((0,E.S7)(this,h).length>=(0,E.S7)(this,c).maxBufferSize){(0,E.S7)(this,p)&&("undefined"!=typeof cancelIdleCallback?cancelIdleCallback:clearTimeout)((0,E.S7)(this,p)),(0,E.jq)(this,f,S).call(this);return}(0,E.S7)(this,p)||("requestIdleCallback"in window?(0,E.OV)(this,p,requestIdleCallback(()=>{(0,E.jq)(this,f,S).call(this)})):(0,E.OV)(this,p,setTimeout(()=>{(0,E.jq)(this,f,S).call(this)},0)))},S=function(){fetch(new URL("/v1/event",(0,E.S7)(this,c).endpoint),{method:"POST",body:JSON.stringify({events:(0,E.S7)(this,h)}),headers:{"Content-Type":"application/json"}}).catch(()=>void 0).then(()=>{(0,E.OV)(this,h,[])}).catch(()=>void 0)},g=function(e,t){this.isDebug&&(void 0!==console.groupCollapsed?(console.groupCollapsed("[clerk/telemetry]",e),console.log(t),console.groupEnd()):console.log("[clerk/telemetry]",e,t))},w=function(){let e={name:(0,E.S7)(this,d).sdk,version:(0,E.S7)(this,d).sdkVersion};return"undefined"!=typeof window&&window.Clerk&&(e={...e,...window.Clerk.constructor.sdkMetadata}),e},b=function(e,t){var s,i;let n=(0,E.jq)(this,f,w).call(this);return{event:e,cv:null!=(s=(0,E.S7)(this,d).clerkVersion)?s:"",it:null!=(i=(0,E.S7)(this,d).instanceType)?i:"",sdk:n.name,sdkv:n.version,...(0,E.S7)(this,d).publishableKey?{pk:(0,E.S7)(this,d).publishableKey}:{},...(0,E.S7)(this,d).secretKey?{sk:(0,E.S7)(this,d).secretKey}:{},payload:t}},(0,C.C)(O.nr);var q=s(17998);let _={secretKey:q.rB,publishableKey:q.At,apiUrl:q.H$,apiVersion:q.mG,userAgent:"@clerk/nextjs@6.9.6",proxyUrl:q.Rg,domain:q.V2,isSatellite:q.fS,sdkMetadata:q.tm,telemetry:{disabled:q.nN,debug:q.Mh}},D=e=>(function(e){let t={...e},s=(0,O.y3)(t),i=(0,O.Bs)({options:t,apiClient:s}),n=new R({...e.telemetry,publishableKey:t.publishableKey,secretKey:t.secretKey,...t.sdkMetadata?{sdk:t.sdkMetadata.name,sdkVersion:t.sdkMetadata.version}:{}});return{...s,...i,telemetry:n}})({..._,...e}),I=".clerk",N="clerk.lock",A=(...e)=>{if(!M.path)throw"Clerk: fsModule.path is missing. This is an internal error. Please contact Clerk's support.";return M.path.join(process.cwd(),I,...e)},z=".tmp",B=()=>A(z,"keyless.json"),W=()=>A(z,"README.md"),P=!1,J=e=>`
\x1b[35m
[Clerk]:\x1b[0m You are running on keyless mode.
You can \x1b[35mclaim your keys\x1b[0m by visiting ${e.claimUrl}
`;async function L(){if(!M.fs)throw"Clerk: fsModule.fs is missing. This is an internal error. Please contact Clerk's support.";let{existsSync:e,writeFileSync:t,mkdirSync:s,rmSync:i}=M.fs;if(P||e(N))return;P=!0,t(N,"This file can be deleted. Please delete this file and refresh your application",{encoding:"utf8",mode:"0777",flag:"w"});let n=B(),r=W();s(A(z),{recursive:!0}),function(){if(!M.fs)throw"Clerk: fsModule.fs is missing. This is an internal error. Please contact Clerk's support.";let{existsSync:e,writeFileSync:t,readFileSync:s,appendFileSync:i}=M.fs;if(!M.path)throw"Clerk: fsModule.path is missing. This is an internal error. Please contact Clerk's support.";let n=M.path.join(process.cwd(),".gitignore");e(n)||t(n,""),s(n,"utf-8").includes(I+"/")||i(n,`
${I}/
`)}();let l=function(){if(!M.fs)throw"Clerk: fsModule.fs is missing. This is an internal error. Please contact Clerk's support.";let{readFileSync:e}=M.fs;try{let t;let s=B();try{t=e(s,{encoding:"utf-8"})||"{}"}catch{t="{}"}return JSON.parse(t)}catch{return}}();if((null==l?void 0:l.publishableKey)&&(null==l?void 0:l.secretKey))return P=!1,i(N,{force:!0,recursive:!0}),v.v.logOnce(J(l)),l;let a=D({}),o=await a.__experimental_accountlessApplications.createAccountlessApplication();return v.v.logOnce(J(o)),t(n,JSON.stringify(o),{encoding:"utf8",mode:"0777",flag:"w"}),t(r,`
## DO NOT COMMIT
This directory is auto-generated from \`@clerk/nextjs\` because you are running on Keyless mode. Avoid committing the \`.clerk/\` directory as it includes the secret key of the unclaimed instance.
  `,{encoding:"utf8",mode:"0777",flag:"w"}),i(N,{force:!0,recursive:!0}),P=!1,o}}};