(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[602],{4714:(e,s,t)=>{Promise.resolve().then(t.bind(t,5013))},6046:(e,s,t)=>{"use strict";var n=t(6658);t.o(n,"useParams")&&t.d(s,{useParams:function(){return n.useParams}}),t.o(n,"usePathname")&&t.d(s,{usePathname:function(){return n.usePathname}}),t.o(n,"useRouter")&&t.d(s,{useRouter:function(){return n.useRouter}})},5013:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});var n=t(5155),a=t(2115),i=t(6046);function r(){let e=[{question:"What is the capital of France?",options:["Paris","London","Berlin","Madrid"],correct:0},{question:"What is 2 + 2?",options:["3","4","5","6"],correct:1},{question:"Which planet is closest to the sun?",options:["Earth","Venus","Mercury","Mars"],correct:2},{question:"What is the largest ocean?",options:["Atlantic","Indian","Pacific","Arctic"],correct:2},{question:"Who wrote 'Hamlet'?",options:["Shakespeare","Dickens","Hemingway","Austen"],correct:0},{question:"What is the speed of light?",options:["300,000 km/s","150,000 km/s","400,000 km/s","100,000 km/s"],correct:0},{question:"What is the chemical symbol for water?",options:["H2O","CO2","NaCl","O2"],correct:0},{question:"Who discovered gravity?",options:["Einstein","Newton","Galileo","Tesla"],correct:1},{question:"Which country has the largest population?",options:["USA","India","China","Brazil"],correct:2},{question:"What is the smallest prime number?",options:["1","2","3","5"],correct:1}],[s,t]=(0,a.useState)(0),[r,o]=(0,a.useState)(Array(10).fill(null)),c=(0,i.useRouter)(),l=e=>{let t=[...r];t[s]=e,o(t)},u=e=>{t(e)},h=r.filter(e=>null!==e).length,m=0===s?10:10-s-1,d=r.filter(e=>null===e).length-m;return(0,n.jsxs)("div",{className:"quiz-page",children:[(0,n.jsxs)("div",{className:"quiz-card",children:[(0,n.jsx)("h2",{className:"quiz-heading",children:"Question"}),(0,n.jsxs)("div",{className:"question-container",children:[(0,n.jsx)("h3",{children:e[s].question}),(0,n.jsx)("div",{className:"options",children:e[s].options.map((e,t)=>(0,n.jsx)("button",{className:"option-button ".concat(r[s]===t?"selected":""),onClick:()=>l(t),children:e},t))}),(0,n.jsxs)("div",{className:"navigation-buttons",children:[(0,n.jsx)("button",{onClick:()=>t(e=>Math.max(e-1,0)),className:"nav-button",children:"Previous"}),(0,n.jsx)("button",{onClick:()=>t(e=>Math.min(e+1,9)),className:"nav-button",children:"Next"}),(0,n.jsx)("button",{className:"mark-next-button",children:"Mark for Answer and Next"}),(0,n.jsx)("button",{className:"save-next-button",children:"Save and Next"})]})]})]}),(0,n.jsxs)("div",{className:"question-palette",children:[(0,n.jsx)("h2",{className:"palette-heading",children:"Question Palette"}),(0,n.jsx)("div",{className:"palette-buttons",children:e.map((e,t)=>(0,n.jsx)("button",{className:"palette-button ".concat(null!==r[t]?"answered":t===s?"current":"not-visited"),onClick:()=>u(t),children:t+1},t))}),(0,n.jsxs)("div",{className:"summary-row",children:[(0,n.jsxs)("div",{className:"summary-left",children:[(0,n.jsxs)("div",{className:"summary-item",children:["Answered: ",h]}),(0,n.jsxs)("div",{className:"summary-item",children:["Not Answered: ",d]})]}),(0,n.jsxs)("div",{className:"summary-right",children:[(0,n.jsxs)("div",{className:"summary-item",children:["Not Visited: ",m]}),(0,n.jsxs)("div",{className:"summary-item",children:["Marked for Review: ",0]})]})]}),(0,n.jsx)("button",{className:"finish-button",onClick:()=>{localStorage.setItem("quizAnswers",JSON.stringify(r)),c.push("/result")},children:"Finish"})]})]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[441,517,120],()=>s(4714)),_N_E=e.O()}]);