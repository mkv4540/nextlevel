(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[607],{4209:(e,t,s)=>{Promise.resolve().then(s.bind(s,5974))},6046:(e,t,s)=>{"use strict";var l=s(6658);s.o(l,"useParams")&&s.d(t,{useParams:function(){return l.useParams}}),s.o(l,"usePathname")&&s.d(t,{usePathname:function(){return l.usePathname}}),s.o(l,"useRouter")&&s.d(t,{useRouter:function(){return l.useRouter}})},5974:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var l=s(5155),n=s(2115),r=s(6046),a=s(2158);function i(){let e=a.A,[t,s]=(0,n.useState)(0),[i,o]=(0,n.useState)(Array(e.length).fill(null)),[c,u]=(0,n.useState)(new Set),d=(0,r.useRouter)(),h=e=>{let s=[...i];s[t]=e,o(s)},x=()=>{u(new Set([...c,t])),s(t=>Math.min(t+1,e.length-1))},m=e=>{u(new Set([...c,e])),s(e)},g=i.filter(e=>null!==e).length,b=e.length-c.size;return(0,l.jsxs)("div",{className:"flex flex-row justify-between items-start bg-gray-100 p-8 min-h-screen pt-20",children:[(0,l.jsxs)("div",{className:"w-2/3 bg-white shadow-lg rounded-lg p-6",children:[(0,l.jsxs)("h2",{className:"text-2xl font-bold mb-6",children:["Question ",t+1,": ",e[t].question]}),(0,l.jsx)("div",{className:"grid grid-cols-2 gap-4",children:e[t].options.map((e,s)=>(0,l.jsx)("button",{onClick:()=>h(s),className:"py-2 px-4 text-left rounded-lg border ".concat(i[t]===s?"bg-blue-500 text-white":"bg-gray-100 text-gray-800"," hover:bg-blue-100"),children:e},s))}),(0,l.jsxs)("div",{className:"flex justify-around mt-6",children:[(0,l.jsx)("button",{onClick:()=>s(e=>Math.max(e-1,0)),className:"py-2 px-4 bg-blue-500 text-white text-lg font-bold rounded-lg",children:"Previous"}),(0,l.jsx)("button",{onClick:()=>{u(new Set([...c,t])),x()},className:"py-2 px-4 bg-blue-700 text-white text-lg font-bold rounded-lg",children:"Mark for Answer and Next"}),(0,l.jsx)("button",{onClick:x,className:"py-2 px-4 bg-green-500 text-white text-lg font-bold rounded-lg",children:"Save and Next"})]})]}),(0,l.jsxs)("div",{className:"w-1/3 bg-white shadow-lg rounded-lg p-6 ml-4",children:[(0,l.jsx)("h3",{className:"text-xl font-bold mb-4",children:"Question Palette"}),(0,l.jsx)("div",{className:"grid grid-cols-5 gap-4 mb-6",children:e.map((e,t)=>(0,l.jsx)("button",{className:"w-10 h-10 text-lg font-bold rounded-full ".concat(null!==i[t]?"bg-blue-500 text-white":c.has(t)?"bg-yellow-400 text-white":"bg-gray-300"),onClick:()=>m(t),children:t+1},t))}),(0,l.jsxs)("div",{className:"text-sm space-y-2",children:[(0,l.jsxs)("p",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"w-4 h-4 bg-blue-500 rounded-full inline-block mr-2"}),"Answered: ",g]}),(0,l.jsxs)("p",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"w-4 h-4 bg-gray-300 rounded-full inline-block mr-2"}),"Not Answered: ",e.length-g-b]}),(0,l.jsxs)("p",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"w-4 h-4 bg-gray-200 rounded-full inline-block mr-2"}),"Not Visited: ",b]}),(0,l.jsxs)("p",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"w-4 h-4 bg-yellow-400 rounded-full inline-block mr-2"}),"Visited: ",c.size]})]}),(0,l.jsx)("button",{onClick:()=>{localStorage.setItem("quizAnswers",JSON.stringify(i)),d.push("/result")},className:"w-full py-2 px-4 bg-red-500 text-white text-lg font-bold rounded-lg mt-6",children:"Stop This Quiz"})]})]})}},2158:(e,t,s)=>{"use strict";s.d(t,{A:()=>l});let l=[{question:"What is the capital of France?",options:["Paris","London","Berlin","Madrid"],correct:0},{question:"What is 2 + 2?",options:["3","4","5","6"],correct:1},{question:"Which planet is closest to the sun?",options:["Earth","Venus","Mercury","Mars"],correct:2},{question:"What is the color of the sky?",options:["Blue","Green","Red","Yellow"],correct:0}]}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,120],()=>t(4209)),_N_E=e.O()}]);