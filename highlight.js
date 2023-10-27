var it=Object.create;var Ee=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var st=Object.getOwnPropertyNames;var ot=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var lt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ut=(e,t,r,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let f of st(t))!ct.call(e,f)&&f!==r&&Ee(e,f,{get:()=>t[f],enumerable:!(l=at(t,f))||l.enumerable});return e};var dt=(e,t,r)=>(r=e!=null?it(ot(e)):{},ut(t||!e||!e.__esModule?Ee(r,"default",{value:e,enumerable:!0}):r,e));var Pe=lt((cn,Ue)=>{function Ae(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],l=typeof r;(l==="object"||l==="function")&&!Object.isFrozen(r)&&Ae(r)}),e}var Z=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function xe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function I(e,...t){let r=Object.create(null);for(let l in e)r[l]=e[l];return t.forEach(function(l){for(let f in l)r[f]=l[f]}),r}var gt="</span>",me=e=>!!e.scope,bt=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((l,f)=>`${l}${"_".repeat(f+1)}`)].join(" ")}return`${t}${e}`},ne=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=xe(t)}openNode(t){if(!me(t))return;let r=bt(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){me(t)&&(this.buffer+=gt)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Ne=(e={})=>{let t={children:[]};return Object.assign(t,e),t},re=class e{constructor(){this.rootNode=Ne(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Ne({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(l=>this._walk(t,l)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},ie=class extends re{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let l=t.root;r&&(l.scope=`language:${r}`),this.add(l)}toHTML(){return new ne(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function P(e){return e?typeof e=="string"?e:e.source:null}function Te(e){return D("(?=",e,")")}function pt(e){return D("(?:",e,")*")}function ft(e){return D("(?:",e,")?")}function D(...e){return e.map(r=>P(r)).join("")}function _t(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function se(...e){return"("+(_t(e).capture?"":"?:")+e.map(l=>P(l)).join("|")+")"}function Re(e){return new RegExp(e.toString()+"|").exec("").length-1}function ht(e,t){let r=e&&e.exec(t);return r&&r.index===0}var Et=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function oe(e,{joinWith:t}){let r=0;return e.map(l=>{r+=1;let f=r,E=P(l),s="";for(;E.length>0;){let a=Et.exec(E);if(!a){s+=E;break}s+=E.substring(0,a.index),E=E.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?s+="\\"+String(Number(a[1])+f):(s+=a[0],a[0]==="("&&r++)}return s}).map(l=>`(${l})`).join(t)}var mt=/\b\B/,ve="[a-zA-Z]\\w*",ce="[a-zA-Z_]\\w*",Me="\\b\\d+(\\.\\d+)?",Ie="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",ke="\\b(0b[01]+)",Nt="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",wt=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=D(t,/.*\b/,e.binary,/\b.*/)),I({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,l)=>{r.index!==0&&l.ignoreMatch()}},e)},z={begin:"\\\\[\\s\\S]",relevance:0},St={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[z]},yt={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[z]},Ot={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},j=function(e,t,r={}){let l=I({scope:"comment",begin:e,end:t,contains:[]},r);l.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let f=se("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return l.contains.push({begin:D(/[ ]+/,"(",f,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),l},At=j("//","$"),xt=j("/\\*","\\*/"),Tt=j("#","$"),Rt={scope:"number",begin:Me,relevance:0},vt={scope:"number",begin:Ie,relevance:0},Mt={scope:"number",begin:ke,relevance:0},It={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[z,{begin:/\[/,end:/\]/,relevance:0,contains:[z]}]},kt={scope:"title",begin:ve,relevance:0},Ct={scope:"title",begin:ce,relevance:0},Dt={begin:"\\.\\s*"+ce,relevance:0},Lt=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},W=Object.freeze({__proto__:null,APOS_STRING_MODE:St,BACKSLASH_ESCAPE:z,BINARY_NUMBER_MODE:Mt,BINARY_NUMBER_RE:ke,COMMENT:j,C_BLOCK_COMMENT_MODE:xt,C_LINE_COMMENT_MODE:At,C_NUMBER_MODE:vt,C_NUMBER_RE:Ie,END_SAME_AS_BEGIN:Lt,HASH_COMMENT_MODE:Tt,IDENT_RE:ve,MATCH_NOTHING_RE:mt,METHOD_GUARD:Dt,NUMBER_MODE:Rt,NUMBER_RE:Me,PHRASAL_WORDS_MODE:Ot,QUOTE_STRING_MODE:yt,REGEXP_MODE:It,RE_STARTERS_RE:Nt,SHEBANG:wt,TITLE_MODE:kt,UNDERSCORE_IDENT_RE:ce,UNDERSCORE_TITLE_MODE:Ct});function Bt(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Ut(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Pt(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Bt,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function zt(e,t){Array.isArray(e.illegal)&&(e.illegal=se(...e.illegal))}function Ht(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function $t(e,t){e.relevance===void 0&&(e.relevance=1)}var Ft=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(l=>{delete e[l]}),e.keywords=r.keywords,e.begin=D(r.beforeMatch,Te(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},Gt=["of","and","for","in","not","or","if","then","parent","list","value"],Kt="keyword";function Ce(e,t,r=Kt){let l=Object.create(null);return typeof e=="string"?f(r,e.split(" ")):Array.isArray(e)?f(r,e):Object.keys(e).forEach(function(E){Object.assign(l,Ce(e[E],t,E))}),l;function f(E,s){t&&(s=s.map(a=>a.toLowerCase())),s.forEach(function(a){let u=a.split("|");l[u[0]]=[E,Wt(u[0],u[1])]})}}function Wt(e,t){return t?Number(t):Zt(e)?0:1}function Zt(e){return Gt.includes(e.toLowerCase())}var we={},C=e=>{console.error(e)},Se=(e,...t)=>{console.log(`WARN: ${e}`,...t)},L=(e,t)=>{we[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),we[`${e}/${t}`]=!0)},q=new Error;function De(e,t,{key:r}){let l=0,f=e[r],E={},s={};for(let a=1;a<=t.length;a++)s[a+l]=f[a],E[a+l]=!0,l+=Re(t[a-1]);e[r]=s,e[r]._emit=E,e[r]._multi=!0}function qt(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw C("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),q;if(typeof e.beginScope!="object"||e.beginScope===null)throw C("beginScope must be object"),q;De(e,e.begin,{key:"beginScope"}),e.begin=oe(e.begin,{joinWith:""})}}function jt(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw C("skip, excludeEnd, returnEnd not compatible with endScope: {}"),q;if(typeof e.endScope!="object"||e.endScope===null)throw C("endScope must be object"),q;De(e,e.end,{key:"endScope"}),e.end=oe(e.end,{joinWith:""})}}function Qt(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Xt(e){Qt(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),qt(e),jt(e)}function Yt(e){function t(s,a){return new RegExp(P(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,u){u.position=this.position++,this.matchIndexes[this.matchAt]=u,this.regexes.push([u,a]),this.matchAt+=Re(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(u=>u[1]);this.matcherRe=t(oe(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let u=this.matcherRe.exec(a);if(!u)return null;let w=u.findIndex((U,Q)=>Q>0&&U!==void 0),m=this.matchIndexes[w];return u.splice(0,w),Object.assign(u,m)}}class l{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let u=new r;return this.rules.slice(a).forEach(([w,m])=>u.addRule(w,m)),u.compile(),this.multiRegexes[a]=u,u}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,u){this.rules.push([a,u]),u.type==="begin"&&this.count++}exec(a){let u=this.getMatcher(this.regexIndex);u.lastIndex=this.lastIndex;let w=u.exec(a);if(this.resumingScanAtSamePosition()&&!(w&&w.index===this.lastIndex)){let m=this.getMatcher(0);m.lastIndex=this.lastIndex+1,w=m.exec(a)}return w&&(this.regexIndex+=w.position+1,this.regexIndex===this.count&&this.considerAll()),w}}function f(s){let a=new l;return s.contains.forEach(u=>a.addRule(u.begin,{rule:u,type:"begin"})),s.terminatorEnd&&a.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&a.addRule(s.illegal,{type:"illegal"}),a}function E(s,a){let u=s;if(s.isCompiled)return u;[Ut,Ht,Xt,Ft].forEach(m=>m(s,a)),e.compilerExtensions.forEach(m=>m(s,a)),s.__beforeBegin=null,[Pt,zt,$t].forEach(m=>m(s,a)),s.isCompiled=!0;let w=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),w=s.keywords.$pattern,delete s.keywords.$pattern),w=w||/\w+/,s.keywords&&(s.keywords=Ce(s.keywords,e.case_insensitive)),u.keywordPatternRe=t(w,!0),a&&(s.begin||(s.begin=/\B|\b/),u.beginRe=t(u.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(u.endRe=t(u.end)),u.terminatorEnd=P(u.end)||"",s.endsWithParent&&a.terminatorEnd&&(u.terminatorEnd+=(s.end?"|":"")+a.terminatorEnd)),s.illegal&&(u.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(m){return Vt(m==="self"?s:m)})),s.contains.forEach(function(m){E(m,u)}),s.starts&&E(s.starts,a),u.matcher=f(u),u}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=I(e.classNameAliases||{}),E(e)}function Le(e){return e?e.endsWithParent||Le(e.starts):!1}function Vt(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return I(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Le(e)?I(e,{starts:e.starts?I(e.starts):null}):Object.isFrozen(e)?I(e):e}var Jt="11.9.0",ae=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},te=xe,ye=I,Oe=Symbol("nomatch"),en=7,Be=function(e){let t=Object.create(null),r=Object.create(null),l=[],f=!0,E="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:ie};function u(n){return a.noHighlightRe.test(n)}function w(n){let c=n.className+" ";c+=n.parentNode?n.parentNode.className:"";let b=a.languageDetectRe.exec(c);if(b){let _=v(b[1]);return _||(Se(E.replace("{}",b[1])),Se("Falling back to no-highlight mode for this block.",n)),_?b[1]:"no-highlight"}return c.split(/\s+/).find(_=>u(_)||v(_))}function m(n,c,b){let _="",N="";typeof c=="object"?(_=n,b=c.ignoreIllegals,N=c.language):(L("10.7.0","highlight(lang, code, ...args) has been deprecated."),L("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),N=n,_=c),b===void 0&&(b=!0);let A={code:_,language:N};$("before:highlight",A);let M=A.result?A.result:U(A.language,A.code,b);return M.code=A.code,$("after:highlight",M),M}function U(n,c,b,_){let N=Object.create(null);function A(i,o){return i.keywords[o]}function M(){if(!d.keywords){S.addText(h);return}let i=0;d.keywordPatternRe.lastIndex=0;let o=d.keywordPatternRe.exec(h),g="";for(;o;){g+=h.substring(i,o.index);let p=T.case_insensitive?o[0].toLowerCase():o[0],y=A(d,p);if(y){let[R,nt]=y;if(S.addText(g),g="",N[p]=(N[p]||0)+1,N[p]<=en&&(K+=nt),R.startsWith("_"))g+=o[0];else{let rt=T.classNameAliases[R]||R;x(o[0],rt)}}else g+=o[0];i=d.keywordPatternRe.lastIndex,o=d.keywordPatternRe.exec(h)}g+=h.substring(i),S.addText(g)}function F(){if(h==="")return;let i=null;if(typeof d.subLanguage=="string"){if(!t[d.subLanguage]){S.addText(h);return}i=U(d.subLanguage,h,!0,he[d.subLanguage]),he[d.subLanguage]=i._top}else i=X(h,d.subLanguage.length?d.subLanguage:null);d.relevance>0&&(K+=i.relevance),S.__addSublanguage(i._emitter,i.language)}function O(){d.subLanguage!=null?F():M(),h=""}function x(i,o){i!==""&&(S.startScope(o),S.addText(i),S.endScope())}function be(i,o){let g=1,p=o.length-1;for(;g<=p;){if(!i._emit[g]){g++;continue}let y=T.classNameAliases[i[g]]||i[g],R=o[g];y?x(R,y):(h=R,M(),h=""),g++}}function pe(i,o){return i.scope&&typeof i.scope=="string"&&S.openNode(T.classNameAliases[i.scope]||i.scope),i.beginScope&&(i.beginScope._wrap?(x(h,T.classNameAliases[i.beginScope._wrap]||i.beginScope._wrap),h=""):i.beginScope._multi&&(be(i.beginScope,o),h="")),d=Object.create(i,{parent:{value:d}}),d}function fe(i,o,g){let p=ht(i.endRe,g);if(p){if(i["on:end"]){let y=new Z(i);i["on:end"](o,y),y.isMatchIgnored&&(p=!1)}if(p){for(;i.endsParent&&i.parent;)i=i.parent;return i}}if(i.endsWithParent)return fe(i.parent,o,g)}function Ye(i){return d.matcher.regexIndex===0?(h+=i[0],1):(ee=!0,0)}function Ve(i){let o=i[0],g=i.rule,p=new Z(g),y=[g.__beforeBegin,g["on:begin"]];for(let R of y)if(R&&(R(i,p),p.isMatchIgnored))return Ye(o);return g.skip?h+=o:(g.excludeBegin&&(h+=o),O(),!g.returnBegin&&!g.excludeBegin&&(h=o)),pe(g,i),g.returnBegin?0:o.length}function Je(i){let o=i[0],g=c.substring(i.index),p=fe(d,i,g);if(!p)return Oe;let y=d;d.endScope&&d.endScope._wrap?(O(),x(o,d.endScope._wrap)):d.endScope&&d.endScope._multi?(O(),be(d.endScope,i)):y.skip?h+=o:(y.returnEnd||y.excludeEnd||(h+=o),O(),y.excludeEnd&&(h=o));do d.scope&&S.closeNode(),!d.skip&&!d.subLanguage&&(K+=d.relevance),d=d.parent;while(d!==p.parent);return p.starts&&pe(p.starts,i),y.returnEnd?0:o.length}function et(){let i=[];for(let o=d;o!==T;o=o.parent)o.scope&&i.unshift(o.scope);i.forEach(o=>S.openNode(o))}let G={};function _e(i,o){let g=o&&o[0];if(h+=i,g==null)return O(),0;if(G.type==="begin"&&o.type==="end"&&G.index===o.index&&g===""){if(h+=c.slice(o.index,o.index+1),!f){let p=new Error(`0 width match regex (${n})`);throw p.languageName=n,p.badRule=G.rule,p}return 1}if(G=o,o.type==="begin")return Ve(o);if(o.type==="illegal"&&!b){let p=new Error('Illegal lexeme "'+g+'" for mode "'+(d.scope||"<unnamed>")+'"');throw p.mode=d,p}else if(o.type==="end"){let p=Je(o);if(p!==Oe)return p}if(o.type==="illegal"&&g==="")return 1;if(J>1e5&&J>o.index*3)throw new Error("potential infinite loop, way more iterations than matches");return h+=g,g.length}let T=v(n);if(!T)throw C(E.replace("{}",n)),new Error('Unknown language: "'+n+'"');let tt=Yt(T),V="",d=_||tt,he={},S=new a.__emitter(a);et();let h="",K=0,k=0,J=0,ee=!1;try{if(T.__emitTokens)T.__emitTokens(c,S);else{for(d.matcher.considerAll();;){J++,ee?ee=!1:d.matcher.considerAll(),d.matcher.lastIndex=k;let i=d.matcher.exec(c);if(!i)break;let o=c.substring(k,i.index),g=_e(o,i);k=i.index+g}_e(c.substring(k))}return S.finalize(),V=S.toHTML(),{language:n,value:V,relevance:K,illegal:!1,_emitter:S,_top:d}}catch(i){if(i.message&&i.message.includes("Illegal"))return{language:n,value:te(c),illegal:!0,relevance:0,_illegalBy:{message:i.message,index:k,context:c.slice(k-100,k+100),mode:i.mode,resultSoFar:V},_emitter:S};if(f)return{language:n,value:te(c),illegal:!1,relevance:0,errorRaised:i,_emitter:S,_top:d};throw i}}function Q(n){let c={value:te(n),illegal:!1,relevance:0,_top:s,_emitter:new a.__emitter(a)};return c._emitter.addText(n),c}function X(n,c){c=c||a.languages||Object.keys(t);let b=Q(n),_=c.filter(v).filter(ge).map(O=>U(O,n,!1));_.unshift(b);let N=_.sort((O,x)=>{if(O.relevance!==x.relevance)return x.relevance-O.relevance;if(O.language&&x.language){if(v(O.language).supersetOf===x.language)return 1;if(v(x.language).supersetOf===O.language)return-1}return 0}),[A,M]=N,F=A;return F.secondBest=M,F}function ze(n,c,b){let _=c&&r[c]||b;n.classList.add("hljs"),n.classList.add(`language-${_}`)}function Y(n){let c=null,b=w(n);if(u(b))return;if($("before:highlightElement",{el:n,language:b}),n.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",n);return}if(n.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(n)),a.throwUnescapedHTML))throw new ae("One of your code blocks includes unescaped HTML.",n.innerHTML);c=n;let _=c.textContent,N=b?m(_,{language:b,ignoreIllegals:!0}):X(_);n.innerHTML=N.value,n.dataset.highlighted="yes",ze(n,b,N.language),n.result={language:N.language,re:N.relevance,relevance:N.relevance},N.secondBest&&(n.secondBest={language:N.secondBest.language,relevance:N.secondBest.relevance}),$("after:highlightElement",{el:n,result:N,text:_})}function He(n){a=ye(a,n)}let $e=()=>{H(),L("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function Fe(){H(),L("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let ue=!1;function H(){if(document.readyState==="loading"){ue=!0;return}document.querySelectorAll(a.cssSelector).forEach(Y)}function Ge(){ue&&H()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",Ge,!1);function Ke(n,c){let b=null;try{b=c(e)}catch(_){if(C("Language definition for '{}' could not be registered.".replace("{}",n)),f)C(_);else throw _;b=s}b.name||(b.name=n),t[n]=b,b.rawDefinition=c.bind(null,e),b.aliases&&de(b.aliases,{languageName:n})}function We(n){delete t[n];for(let c of Object.keys(r))r[c]===n&&delete r[c]}function Ze(){return Object.keys(t)}function v(n){return n=(n||"").toLowerCase(),t[n]||t[r[n]]}function de(n,{languageName:c}){typeof n=="string"&&(n=[n]),n.forEach(b=>{r[b.toLowerCase()]=c})}function ge(n){let c=v(n);return c&&!c.disableAutodetect}function qe(n){n["before:highlightBlock"]&&!n["before:highlightElement"]&&(n["before:highlightElement"]=c=>{n["before:highlightBlock"](Object.assign({block:c.el},c))}),n["after:highlightBlock"]&&!n["after:highlightElement"]&&(n["after:highlightElement"]=c=>{n["after:highlightBlock"](Object.assign({block:c.el},c))})}function je(n){qe(n),l.push(n)}function Qe(n){let c=l.indexOf(n);c!==-1&&l.splice(c,1)}function $(n,c){let b=n;l.forEach(function(_){_[b]&&_[b](c)})}function Xe(n){return L("10.7.0","highlightBlock will be removed entirely in v12.0"),L("10.7.0","Please use highlightElement now."),Y(n)}Object.assign(e,{highlight:m,highlightAuto:X,highlightAll:H,highlightElement:Y,highlightBlock:Xe,configure:He,initHighlighting:$e,initHighlightingOnLoad:Fe,registerLanguage:Ke,unregisterLanguage:We,listLanguages:Ze,getLanguage:v,registerAliases:de,autoDetection:ge,inherit:ye,addPlugin:je,removePlugin:Qe}),e.debugMode=function(){f=!1},e.safeMode=function(){f=!0},e.versionString=Jt,e.regex={concat:D,lookahead:Te,either:se,optional:ft,anyNumberOfTimes:pt};for(let n in W)typeof W[n]=="object"&&Ae(W[n]);return Object.assign(e,W),e},B=Be({});B.newInstance=()=>Be({});Ue.exports=B;B.HighlightJS=B;B.default=B});var tn=dt(Pe());var nn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],rn=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],an=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"];var dn=[].concat(an,nn,rn);function le(){le.warned||(le.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ruby" instead of "highlight.js/lib/languages/ruby.js"'))}le();var mn=["align-content","align-items","align-self","all","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","content-visibility","counter-increment","counter-reset","cue","cue-after","cue-before","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-smoothing","font-stretch","font-style","font-synthesis","font-variant","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","inline-size","isolation","justify-content","left","letter-spacing","line-break","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-wrap","overflow-x","overflow-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","pause","pause-after","pause-before","perspective","perspective-origin","pointer-events","position","quotes","resize","rest","rest-after","rest-before","right","row-gap","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","speak","speak-as","src","tab-size","table-layout","text-align","text-align-all","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-transform","text-underline-position","top","transform","transform-box","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index"].reverse();var sn=[["javascript",javascript],["css",scss],["scss",scss],["bash",bash],["php",php],["sql",sql],["json",json],["yaml",yaml],["powershell",bash]];hljs.registerLanguage("prisma",ruby);sn.forEach(([e,t])=>{hljs.registerLanguage(e,t)});hljs.registerLanguage("svelte",function(e){return{subLanguage:"xml",contains:[e.COMMENT("<!--","-->",{relevance:10}),{begin:/^(\s*)(<script(\s*context="module")?>)/gm,end:/^(\s*)(<\/script>)/gm,subLanguage:"javascript",excludeBegin:!0,excludeEnd:!0,contains:[{begin:/^(\s*)(\$:)/gm,end:/(\s*)/gm,className:"keyword"}]},{begin:/^(\s*)(<style.*>)/gm,end:/^(\s*)(<\/style>)/gm,subLanguage:"css",excludeBegin:!0,excludeEnd:!0},{begin:/\{/gm,end:/\}/gm,subLanguage:"javascript",contains:[{begin:/[\{]/,end:/[\}]/,skip:!0},{begin:/([#:\/@])(if|else|each|await|then|catch|debug|html)/gm,className:"keyword",relevance:10}]}]}});hljs.highlightAll();var export_HighlightJS=tn.default;export{export_HighlightJS as HighlightJS};
