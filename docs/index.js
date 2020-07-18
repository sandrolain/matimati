function t(t,e,r,o){return new(r||(r=Promise))((function(n,a){function i(t){try{c(o.next(t))}catch(t){a(t)}}function l(t){try{c(o.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(i,l)}c((o=o.apply(t,e||[])).next())}))}class e{constructor(t){this.node=t}$(t){return this.node.querySelector(t)}$$(t){return Array.from(this.node.querySelectorAll(t))}on(t,e,r,o){("string"==typeof t?this.node.querySelector(t):t).addEventListener(e,r,o)}delegate(t,e,r,o,n){("string"==typeof t?this.node.querySelector(t):t).addEventListener(e,t=>{const e=t.target;e&&e.matches(r)&&o.call(e,t)},n)}dispatch(t,e,r=!1){const o=new CustomEvent(t,{detail:e,bubbles:r,composed:!0,cancelable:!0});return this.node.dispatchEvent(o)}when(t){return new Promise(e=>{const r=o=>{this.node.removeEventListener(t,r),e(o)};this.node.addEventListener(t,r)})}empty(){for(const t of Array.from(this.node.childNodes))t instanceof HTMLStyleElement&&t.classList.contains("htna-scoped-style")||this.node.removeChild(t)}append(t){if("string"==typeof t){const e=document.createElement("template");e.innerHTML=t,this.node.appendChild(e.content.cloneNode(!0))}else t instanceof HTMLTemplateElement?this.node.appendChild(t.content.cloneNode(!0)):(t instanceof HTMLElement||t instanceof DocumentFragment)&&this.node.appendChild(t)}}let r=0;const o=new Map,n={JSON:t=>JSON.parse(t),CSVString:t=>t.split(","),CSVNumber:t=>t.split(",").map(t=>Number(t)),CSVDate:t=>t.split(",").map(t=>new Date(t)),Entries:t=>t.split(";").map(t=>{const e=t.split(":");return[e.shift(),e.join(":")]}),RichData:t=>o.get(t),Date:t=>new Date(t),Boolean:Boolean,String:String,Number:Number},a=new Map;a.set(n.JSON,(function(t){return JSON.stringify(t)})),a.set(n.CSVString,(function(t){return t.join(",")})),a.set(n.CSVNumber,(function(t){return t.map(t=>String(t)).join(",")})),a.set(n.CSVDate,(function(t){return t.map(t=>t.toISOString()).join(",")})),a.set(n.Entries,(function(t){return t.map(t=>t.join(":")).join(";")})),a.set(n.RichData,(function(t,e){const n=(t=>t&&!!t.match(/^\$htna[0-9]+\$$/))(e)?e:`$htna${++r}$`;return o.set(n,t),n})),a.set(n.Date,(function(t){return t.toISOString()})),a.set(n.Boolean,(function(t,e,r){return t?r:null}));const i=new Map;i.set(Boolean,(function(t){return null!==t}));class l{constructor(t,e,r){this.elementNode=t,this.attributesSchema=e,this.toDispatchAttributes=r}getMap(){const t=this.elementNode.attributes,e=new Map;for(let r=0,o=t.length;r<o;r++){const o=t[r].name;e.set(o,this.get(o))}return e}setMap(t){for(const[e,r]of t)this.set(e,r)}has(t){return this.elementNode.hasAttribute(t)}get(t){const e=this.elementNode.getAttribute(t),r=this.attributesSchema[t];if(r){const o=i.get(r);return o?o(e,t):null!==e?r(e):null}return e}set(t,e){const r=this.attributesSchema[t];r&&a.has(r)&&(e=a.get(r)(e,this.elementNode.getAttribute(t),t)),null!==e?this.elementNode.setAttribute(t,e.toString()):this.elementNode.removeAttribute(t)}remove(t){this.elementNode.removeAttribute(t)}getDispatchName(t){let e=this.toDispatchAttributes[t];return e?(!0===e&&(e=`${t}-changed`),e):null}}class c{constructor(t){this.elementNode=t}get(t){return this.elementNode.querySelector(`*[slot="${t}"]`)}getAll(t){return this.elementNode.querySelectorAll(`*[slot="${t}"]`)}append(t,e,r="div"){const o=document.createElement(r);return o.setAttribute("slot",t),["string","number"].includes(typeof e)?(e=document.createTextNode(e.toString()),o.appendChild(e)):o.appendChild(e),this.elementNode.appendChild(o),o}replace(t,e,r="div"){return this.remove(t),this.append(t,e,r)}remove(t){const e=this.get(t);return e&&this.elementNode.removeChild(e),e}}class s{static add(t,e,r){if(window.customElements.get(t))throw new Error(`"${t}" element already defined`);const o={};r&&(o.extends=r),window.customElements.define(t,e,o)}static exists(t){return!!window.customElements.get(t)}static get(t){return window.customElements.get(t)}static upgrade(t){window.customElements.upgrade(t)}}class u{constructor(t){this.node=t}removeAllStyles(){const t=this.node.querySelectorAll('style, link[rel="stylesheet"]');for(const e of Array.from(t))e.parentElement.removeChild(e)}addStyle(t){const e=document.createElement("style");e.classList.add("htna-scoped-style"),e.setAttribute("type","text/css"),e.innerHTML=t,this.node.appendChild(e)}addExternalStyle(t){const e=document.createElement("link");e.classList.add("htna-scoped-style"),e.setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("href",t),this.node.appendChild(e)}}class d extends HTMLElement{constructor(){super(),this.controllerResult={},this.defaultAttributes=new Map,this.initiated=!1;const t=this.constructor.config,r={},o=[],n={};if(t.attributesSchema)for(const e in t.attributesSchema){const a=t.attributesSchema[e];a.type&&(r[e]=a.type),a.property&&o.push(e),void 0!==a.value&&this.defaultAttributes.set(e,a.value),n[e]=a.dispatchEvent||!1}!1!==t.shadow&&(this.shadow=this.attachShadow({mode:t.shadow||"closed"})),this.access=Object.freeze({element:this,shadow:this.shadow?new e(this.shadow):null,light:new e(this),attributes:new l(this,r,n),style:this.shadow?new u(this.shadow):new u(this),slot:new c(this)});const a=this.access.attributes;for(const t of o){const e=t.replace(/-\D/g,(function(t){return t.charAt(1).toUpperCase()}));Object.defineProperty(this,e,{get:()=>a.get(t),set:e=>a.set(t,e)})}}static get observedAttributes(){if(!this.observedAttributesArray&&(this.observedAttributesArray=[],this.config.attributesSchema))for(const t in this.config.attributesSchema)this.config.attributesSchema[t].observed&&this.observedAttributesArray.push(t);return this.observedAttributesArray}defineProperties(t){for(const e in t)Object.defineProperty(this,e,t[e])}appendRender(t){const e=t(this.access);this.access.shadow?this.access.shadow.append(e):this.access.light.append(e)}appendStyle(t){this.access.style.addStyle(t)}connectedCallback(){if(!this.initiated){this.initiated=!0;const t=this.constructor.config,e=this.access.attributes;this.defaultAttributes.forEach((t,r)=>{e.has(r)||e.set(r,t)}),this.afterAttributesInit(),t.render&&this.appendRender(t.render),t.style&&this.appendStyle(t.style),t.controller&&(this.controllerResult=t.controller(this.access)||{},this.controllerResult.properties&&this.defineProperties(this.controllerResult.properties)),window.customElements.upgrade(this)}if(this.controllerResult.listeners)for(const t in this.controllerResult.listeners)this.addEventListener(t,this.controllerResult.listeners[t]);if(this.controllerResult.mutationObserverCallback){this.mutationObserver=new MutationObserver(this.controllerResult.mutationObserverCallback);const t=this.controllerResult.mutationObserverInit||{attributes:!0,childList:!0,subtree:!0,characterData:!0};this.mutationObserver.observe(this,t)}this.afterMutationObserverInit(),this.controllerResult.connectedCallback&&this.controllerResult.connectedCallback()}afterAttributesInit(){}afterMutationObserverInit(){}disconnectedCallback(){if(this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=null),this.controllerResult.listeners)for(const t in this.controllerResult.listeners)this.removeEventListener(t,this.controllerResult.listeners[t]);this.controllerResult.disconnectedCallback&&this.controllerResult.disconnectedCallback()}adoptedCallback(){this.controllerResult.adoptedCallback&&this.controllerResult.adoptedCallback()}attributeChangedCallback(t,e,r){this.controllerResult.attributeChangedCallback&&("function"==typeof this.controllerResult.attributeChangedCallback?this.controllerResult.attributeChangedCallback(t,e,r):this.controllerResult.attributeChangedCallback[t]&&this.controllerResult.attributeChangedCallback[t](t,e,r));const o=this.access.attributes.getDispatchName(t);o&&this.access.light.dispatch(o,{name:t,value:r,oldValue:e})}static register(t=this.config.elementName){const e=s.get(t);if(e){if(e!==this)throw new Error(`"${t}" element already registered with another class`)}else s.add(t,this)}}class p extends d{constructor(){super(),this.formInputType="text";const t=this.constructor.config;t.formInputType&&(this.formInputType=t.formInputType)}static get observedAttributes(){return["name","value",...super.observedAttributes]}afterAttributesInit(){this.updateFormInputValue()}afterMutationObserverInit(){this.startFormInputRadioObserver()}disconnectedCallback(){"radio"===this.formInputType&&this.stopFormInputRadioObserver(),super.disconnectedCallback()}attributeChangedCallback(t,e,r){"name"!==t&&"value"!==t&&"checked"!==t||this.updateFormInputValue(),super.attributeChangedCallback(t,e,r)}getFormInput(){let t=this.querySelector("input.htna-form-input");return t||(t=document.createElement("input"),"checkbox"===this.formInputType||"radio"===this.formInputType?(t.style.display="none",t.setAttribute("type",this.formInputType)):t.setAttribute("type","hidden"),t.classList.add("htna-form-input"),t.addEventListener("change",()=>{this.updateChangeFormInputValue()}),this.appendChild(t)),t}updateChangeFormInputValue(){const t=this.getFormInput();if("checkbox"===this.formInputType||"radio"===this.formInputType)t.checked?this.setAttribute("checked","checked"):this.removeAttribute("checked");else{const e=t.value;this.getAttribute("value")!==e&&this.setAttribute("value",e)}}updateFormInputValue(){const t=this.getFormInput();t.setAttribute("value",this.getAttribute("value")),t.setAttribute("name",this.getAttribute("name")),"checkbox"!==this.formInputType&&"radio"!==this.formInputType||(t.checked=!!this.access.attributes.get("checked"))}startFormInputRadioObserver(){const t=this.getFormInput();let e=t.checked;const r=()=>{e!==t.checked&&(e=t.checked,this.updateChangeFormInputValue()),this.formInputChangeITV=requestAnimationFrame(r)};this.formInputChangeITV=requestAnimationFrame(r)}stopFormInputRadioObserver(){this.formInputChangeITV&&(cancelAnimationFrame(this.formInputChangeITV),this.formInputChangeITV=null)}}function h(t){var e;return(e=class extends d{}).config=t,e}function m(t,e,r,o){return new(r||(r=Promise))((function(n,a){function i(t){try{c(o.next(t))}catch(t){a(t)}}function l(t){try{c(o.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(i,l)}c((o=o.apply(t,e||[])).next())}))}function g(t,e){return t.decodeAudioData(e)}class v{constructor(t,e){this.context=t,this.audioBuffer=e}play(t=0,e=0,r){this.stop(),this.audioSource=function(t,e){const r=t.createBufferSource();return r.buffer=e,r.connect(t.destination),r}(this.context,this.audioBuffer),this.audioSource.start(t,e,r)}stop(){this.audioSource&&this.audioSource.stop()}static createFromURL(t,e){return m(this,void 0,void 0,(function*(){const r=yield function(t,e){return m(this,void 0,void 0,(function*(){const r=yield fetch(e);if(!r.ok)throw new Error(`Cannot load audio file "${e}"`);return g(t,yield r.arrayBuffer())}))}(t,e);return new v(t,r)}))}static createFromArrayBuffer(t,e){return m(this,void 0,void 0,(function*(){const r=yield g(t,e);return new v(t,r)}))}}const b=/^([0-1][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{3}))?)?$/,f=/^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;function y(t){let e=0,r=0,o=0,n=0;if(t instanceof Date)e=t.getHours(),r=t.getMinutes(),o=t.getSeconds(),n=t.getMilliseconds();else if(t instanceof Array)e=t[0]||0,r=t[1]||0,o=t[2]||0,n=t[3]||0;else if("number"==typeof t)n=t%1e3,o=(t=Math.floor(t/1e3))%60,r=(t=Math.floor(t/60))%60,e=Math.floor(t/60);else if("string"==typeof t){const a=t.match(b);a&&(e=parseInt(a[1],10),r=parseInt(a[2],10),o=parseInt(a[3]||"0",10),n=parseInt(a[4]||"0",10))}return[e,r,o,n]}function w(t){const[e,r,o,n]=y(t),a=new Date;return(e>0||r>0||o>0||n>0)&&(a.setHours(e),a.setMinutes(r),a.setSeconds(o),a.setMilliseconds(n)),a}function x(t,e){const[r,o,n,a]=y(e);return t.setHours(r),t.setMinutes(o),t.setSeconds(n),t.setMilliseconds(a),t}function k(t,e,r){return t.getTime()<e.getTime()?new Date(e.getTime()):t.getTime()>r.getTime()?new Date(r.getTime()):new Date(t)}function S(t){let e=0,r=0,o=0;if(t instanceof Date)e=t.getFullYear(),r=t.getMonth()+1,o=t.getDate();else if(t instanceof Array)e=t[0]||0,r=t[1]||0,o=t[2]||0;else if("string"==typeof t){const n=t.match(f);n&&(e=parseInt(n[1],10),r=parseInt(n[2],10),o=parseInt(n[3],10))}return[e,r,o]}function C(t){const[e,r,o]=S(t),n=new Date;return(e>0||r>0||o>0)&&(n.setFullYear(e),n.setMonth(r-1),n.setDate(o)),n}function A(t,e){const[r,o,n]=S(e);return t.setFullYear(r),t.setMonth(o-1),t.setDate(n),t}function $(t){return`${t.getFullYear()}-${(t.getMonth()+1).toString().padStart(2,"0")}-${t.getDate().toString().padStart(2,"0")}`}function I(t,e=!1,r=!1){return`${t.getHours().toString().padStart(2,"0")}:${t.getMinutes().toString().padStart(2,"0")}${e?`:${t.getSeconds().toString().padStart(2,"0")}${r?`.${t.getMilliseconds().toString().padStart(9,"0")}`:""}`:""}`}function M(t,e,r,o,n=document){const a=n.createElement(t,o);if(e&&function(t,e){if(t)if(t instanceof Map||t instanceof Array||t instanceof Set)t.forEach(e);else if("object"==typeof t)for(const r in t)e.call(t,t[r],r)}(e,(t,e)=>{"function"==typeof t?a.addEventListener(e,t):a.setAttribute(e,String(t))}),r)for(let t of r)["string","number"].includes(typeof t)?(t=document.createTextNode(t.toString()),a.appendChild(t)):t instanceof Node?a.appendChild(t):Array.isArray(t)&&(t=M(t[0],t[1],t[2],t[3],n),a.appendChild(t));return a}h({elementName:"htna-paginator",render:()=>'<div id="cnt">\n    <button id="first"></button>\n    <button id="prev"></button>\n    <div id="pages"></div>\n    <button id="next"></button>\n    <button id="last"></button>\n    <select id="per-page" class="hidden"></select>\n  </div>',style:"\n    #cnt {\n      display: flex;\n    }\n    #pages {\n      display: flex;\n    }\n    .page.active {\n      font-weight: bold;\n    }\n    #per-page.hidden {\n      display: none;\n    }\n  ",attributesSchema:{page:{type:Number,observed:!0,property:!0,value:1},"total-pages":{type:Number,observed:!0,property:!0,value:10},"max-pages":{type:Number,observed:!0,property:!0,value:5},"per-page":{type:Number,observed:!0,property:!0,value:10},"per-page-options":{type:n.CSVNumber,observed:!0,property:!0,value:[10,25,50,100]},"first-lbl":{observed:!0,property:!0,value:"<<"},"prev-lbl":{observed:!0,property:!0,value:"<"},"next-lbl":{observed:!0,property:!0,value:">"},"last-lbl":{observed:!0,property:!0,value:">>"}},controller:({shadow:t,light:e,attributes:r})=>{const o=t.$("#first"),n=t.$("#prev"),a=t.$("#next"),i=t.$("#last"),l=t.$("#per-page"),c=()=>{o.innerText=r.get("first-lbl")||"",n.innerText=r.get("prev-lbl")||"",a.innerText=r.get("next-lbl")||"",i.innerText=r.get("last-lbl")||""},s=()=>{const t=r.get("per-page-options")||[],o=r.get("per-page")||t[0];if(t&&t.length>0){const r=[];for(const e of t)r.push(`<option value="${e}"${o===e?" selected":""}>${e}</option>`);l.innerHTML=r.join(""),l.classList.remove("hidden"),e.dispatch("change:per-page",{perPage:o,perPageOptions:t})}else l.classList.add("hidden")},u=()=>{const o=r.get("max-pages")||0,n=r.get("page")||1,a=r.get("total-pages")||1,i=[],l=function({currentPage:t,pages:e,numBadges:r=5}){const o=r-2;if(e<=r)return Array.from({length:e}).map((t,e)=>e+1);const n=Array.from({length:r-1});if(t<=o)return[...n.map((t,e)=>e+1),null,e];if(t>e-o)return[1,null,...n.map((t,r)=>e-r).reverse()];n.pop();const a=Math.floor(n.length/2);return[1,null,...n.map((e,r)=>t-a+r),null,e]}({currentPage:n,pages:a,numBadges:o});for(const t of l)null===t?i.push('<span class="spacer">…</span>'):i.push(`<button class="page${n===t?" active":""}" data-page="${t}">${t}</button>`);t.$("#pages").innerHTML=i.join(""),e.dispatch("change:page",{page:n,totalPages:a})};return o.addEventListener("click",()=>{r.set("page",1)}),n.addEventListener("click",()=>{const t=r.get("page")||1,e=Math.max(t-1,1);r.set("page",e)}),a.addEventListener("click",()=>{const t=r.get("page")||1,e=r.get("total-pages")||1,o=Math.min(t+1,e);r.set("page",o)}),i.addEventListener("click",()=>{const t=r.get("total-pages")||1;r.set("page",t)}),t.delegate("#pages","click",".page",(function(){const t=this.dataset.page;r.set("page",t)})),l.addEventListener("change",()=>{r.set("per-page",l.value)}),{connectedCallback:()=>{c(),u(),s()},attributeChangedCallback:{page:u,"total-pages":u,"max-pages":u,"first-lbl":c,"prev-lbl":c,"next-lbl":c,"last-lbl":c,"per-page":s,"per-page-options":s}}}});function T(t){const e=document.createElement("textarea");return e.innerHTML=t,e.value}function N(t,e){const r=e.split(/[.[]/);for(;r.length>0&&t;){let e=r.shift();0!==e.length&&(e.match(/[0-9]\]$/)&&(e=parseInt(e.replace("]",""),10)),t=t[e])}return t}class E{constructor(t,e){this.tokens=t,this.values=e}template(t={}){const e=this.html(t),r=document.createElement("template");return r.innerHTML=e,r}html(t={}){const e=[],r=this.tokens.length;for(let o=0;o<r;o++){e.push(this.tokens[o]);const r=this.values[o];if(null!=r){const o=typeof r;let n;"function"===o?n=r(t):"number"===o?n=t[r]:"string"===o&&(n=N(t,r)),null!=n&&e.push(n)}}return e.join("")}}h({elementName:"htna-table",render:()=>"<table>\n    <thead></thead>\n    <tbody></tbody>\n    <tfoot></tfoot>\n  </table>",style:"\n    thead:empty,\n    tbody:empty,\n    tfoot:empty {\n      display: none;\n    }\n  ",attributesSchema:{header:{type:n.RichData,observed:!0,property:!0,value:{}},footer:{type:n.RichData,observed:!0,property:!0,value:{}},data:{type:n.RichData,observed:!0,property:!0,value:[]},sort:{type:n.String,observed:!0,property:!0}},controller:({shadow:t,element:e,attributes:r})=>{let o;const n=t=>{const r=(()=>{if(!o){o=document.createDocumentFragment();for(const t of Array.from(e.childNodes))o.appendChild(t.cloneNode(!0))}return o})().querySelector(t);return r?r.innerHTML:""},a=(t,e)=>function(t,...e){return"string"==typeof t&&([t,e]=function(t){const e=[],r=[];let o=t.indexOf("${");for(;o>-1;){let n=0;const a=t.substring(0,o);e.push(a);for(let e=0,a=(t=t.substring(o+2)).length;e<a;e++){const o=t[e];if("}"===o){if(0===n){const o=t.substring(0,e);r.push(T(o)),t=t.substring(e+1);break}n--}else"{"===o&&n++}o=t.indexOf("${")}return e.push(t),[e,r]}(t),e=e.map(t=>new Function(`return ${t};`)())),new E(t,e)}(t).html(e),i=()=>{const e=n("thead"),o=r.get("header");t.$("thead").innerHTML=a(e,o)},l=()=>{const e=n("tbody");let o=r.get("data");const i=r.get("sort"),l=[];i&&(o=o.slice(),o.sort((t,e)=>N(t,i)<N(e,i)?-1:1)),o.forEach(t=>{l.push(a(e,t))}),t.$("tbody").innerHTML=l.join("")},c=()=>{const e=n("tfoot"),o=r.get("footer");t.$("tfoot").innerHTML=a(e,o)},s=()=>{i(),l(),c()};return{connectedCallback:()=>{s()},attributeChangedCallback:{header:i,footer:c,data:l,sort:l},mutationObserverCallback:()=>{o=null,s()}}}});const L=new Date,D=new Date;A(L,[1900,1,1]),x(L,[0,0,0,0]),A(D,[2999,12,31]),x(D,[23,59,59,999]);h({elementName:"htna-date-range",render:()=>'<div id="range">\n<div class="row" id="from">\n  <label for="from"><slot name="from"></slot></label>\n  <div class="row-date"><input id="from-date" type="date" placeholder="YYYY-MM-DD" pattern="^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$" id="from-date-fld" /></div>\n  <div class="row-time"><input id="from-time" type="time" placeholder="HH:MM" pattern="^[0-2][0-9]:[0-5][0-9]$" id="from-time-fld" /></div>\n</div>\n<div class="row" id="to">\n  <label for="to"><slot name="to"></slot></label>\n  <div class="row-date"><input id="to-date" type="date" placeholder="YYYY-MM-DD" pattern="^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$" id="from-date-fld" /></div>\n  <div class="row-time"><input id="to-time" type="time" placeholder="HH:MM" pattern="^[0-2][0-9]:[0-5][0-9]$" id="from-time-fld" /></div>\n</div>\n</div>',style:"\n#range {\n  height: 1em;\n  position: relative;\n}\n.row {\n  width: 100%;\n  display: flex;\n}\nlabel {\n  width: 50px;\n}\ninput {\n  flex: 1;\n}\noutput {\n  width: 50px;\n  text-align: right;\n}\n  ",attributesSchema:{min:{type:n.Date,observed:!0,property:!0,value:L},max:{type:n.Date,observed:!0,property:!0,value:D},value:{type:n.CSVDate,observed:!0,property:!0,value:[new Date,new Date]}},controller:({light:t,shadow:e,attributes:r})=>{const o=e.$("#from-date"),n=e.$("#from-time"),a=e.$("#to-date"),i=e.$("#to-time"),l=function(e="from"){const l=r.get("value"),c=r.get("min"),s=r.get("max"),u=C(o.value),d=w(n.value),p=C(a.value),h=w(i.value),m=x(u,d),g=x(p,h);let v=k(m,c,s),b=k(g,c,s);"to"===e?v=function(...t){return new Date(t.sort((t,e)=>t.getTime()-e.getTime()).shift().getTime())}(v,b):b=function(...t){return new Date(t.sort((t,e)=>t.getTime()-e.getTime()).pop().getTime())}(v,b),v.getTime()!==m.getTime()&&(o.value=$(v),n.value=I(v)),b.getTime()!==g.getTime()&&(a.value=$(b),i.value=I(b)),l[0].getTime()===v.getTime()&&l[1].getTime()===b.getTime()||(r.set("value",[v,b]),t.dispatch("change"))},c=()=>{const t=r.get("value");t&&(o.value=$(t[0]),n.value=I(t[0]),a.value=$(t[1]),i.value=I(t[1]))},s=function(){const t=r.get("step");n.step=(t||60).toString(),i.step=(t||60).toString(),l()};return o.addEventListener("input",()=>{l("from")}),n.addEventListener("input",()=>{l("from")}),a.addEventListener("input",()=>{l("to")}),i.addEventListener("input",()=>{l("to")}),{connectedCallback:()=>{c(),s()},attributeChangedCallback:{step:s,min:s,max:s,value:()=>{c(),l()}}}}});const F={elementName:"htna-label-checkbox",formInputType:"checkbox",render:()=>'<label id="cnt" class="selectable"><input type="checkbox" id="input" /><span id="label"><slot name="label"></slot></span></label>',style:'\n:host {\n  display: content;\n}\n  :host,:root{--neutral-color-hue:240;--neutral-color-sat:10%;--neutral-color-000:#000;--neutral-color-100:hsl(var(--neutral-color-hue),var(--neutral-color-sat),10%);--neutral-color-200:hsl(var(--neutral-color-hue),var(--neutral-color-sat),20%);--neutral-color-300:hsl(var(--neutral-color-hue),var(--neutral-color-sat),30%);--neutral-color-400:hsl(var(--neutral-color-hue),var(--neutral-color-sat),40%);--neutral-color-500:hsl(var(--neutral-color-hue),var(--neutral-color-sat),50%);--neutral-color-600:hsl(var(--neutral-color-hue),var(--neutral-color-sat),60%);--neutral-color-700:hsl(var(--neutral-color-hue),var(--neutral-color-sat),70%);--neutral-color-800:hsl(var(--neutral-color-hue),var(--neutral-color-sat),80%);--neutral-color-900:hsl(var(--neutral-color-hue),var(--neutral-color-sat),90%);--neutral-color-950:hsl(var(--neutral-color-hue),var(--neutral-color-sat),95%);--neutral-color-970:hsl(var(--neutral-color-hue),var(--neutral-color-sat),97%);--neutral-color-999:#fff;--primary-color-hue:240;--primary-color-sat:80%;--primary-color-100:hsl(calc(var(--primary-color-hue) + 20),var(--primary-color-sat),10%);--primary-color-200:hsl(calc(var(--primary-color-hue) + 15),var(--primary-color-sat),20%);--primary-color-300:hsl(calc(var(--primary-color-hue) + 10),var(--primary-color-sat),30%);--primary-color-400:hsl(calc(var(--primary-color-hue) + 5),var(--primary-color-sat),40%);--primary-color-500:hsl(calc(var(--primary-color-hue)),var(--primary-color-sat),50%);--primary-color-600:hsl(calc(var(--primary-color-hue) - 5),var(--primary-color-sat),60%);--primary-color-700:hsl(calc(var(--primary-color-hue) - 10),var(--primary-color-sat),70%);--primary-color-800:hsl(calc(var(--primary-color-hue) - 15),var(--primary-color-sat),80%);--primary-color-900:hsl(calc(var(--primary-color-hue) - 20),var(--primary-color-sat),90%);--primary-color-950:hsl(calc(var(--primary-color-hue) - 25),var(--primary-color-sat),95%);--primary-color-970:hsl(calc(var(--primary-color-hue) - 25),var(--primary-color-sat),97%);--accent-color-hue:320;--accent-color-sat:80%;--accent-color-100:hsl(calc(var(--accent-color-hue) - 20),var(--accent-color-sat),10%);--accent-color-200:hsl(calc(var(--accent-color-hue) - 15),var(--accent-color-sat),20%);--accent-color-300:hsl(calc(var(--accent-color-hue) - 10),var(--accent-color-sat),30%);--accent-color-400:hsl(calc(var(--accent-color-hue) - 5),var(--accent-color-sat),40%);--accent-color-500:hsl(calc(var(--accent-color-hue)),var(--accent-color-sat),50%);--accent-color-600:hsl(calc(var(--accent-color-hue) + 5),var(--accent-color-sat),60%);--accent-color-700:hsl(calc(var(--accent-color-hue) + 10),var(--accent-color-sat),70%);--accent-color-800:hsl(calc(var(--accent-color-hue) + 15),var(--accent-color-sat),80%);--accent-color-900:hsl(calc(var(--accent-color-hue) + 20),var(--accent-color-sat),90%);--accent-color-950:hsl(calc(var(--accent-color-hue) + 25),var(--accent-color-sat),95%);--critical-color-hue:10;--critical-color-sat:100%;--critical-color-100:hsl(calc(var(--critical-color-hue) - 20),var(--critical-color-sat),10%);--critical-color-200:hsl(calc(var(--critical-color-hue) - 15),var(--critical-color-sat),20%);--critical-color-300:hsl(calc(var(--critical-color-hue) - 10),var(--critical-color-sat),30%);--critical-color-400:hsl(calc(var(--critical-color-hue) - 5),var(--critical-color-sat),40%);--critical-color-500:hsl(calc(var(--critical-color-hue)),var(--critical-color-sat),50%);--critical-color-600:hsl(calc(var(--critical-color-hue) + 5),var(--critical-color-sat),60%);--critical-color-700:hsl(calc(var(--critical-color-hue) + 10),var(--critical-color-sat),70%);--critical-color-800:hsl(calc(var(--critical-color-hue) + 15),var(--critical-color-sat),80%);--critical-color-900:hsl(calc(var(--critical-color-hue) + 20),var(--critical-color-sat),90%);--critical-color-950:hsl(calc(var(--critical-color-hue) + 25),var(--critical-color-sat),95%);--warning-color-hue:50;--warning-color-sat:70%;--warning-color-100:hsl(calc(var(--warning-color-hue) - 20),var(--warning-color-sat),10%);--warning-color-200:hsl(calc(var(--warning-color-hue) - 15),var(--warning-color-sat),20%);--warning-color-300:hsl(calc(var(--warning-color-hue) - 10),var(--warning-color-sat),30%);--warning-color-400:hsl(calc(var(--warning-color-hue) - 5),var(--warning-color-sat),40%);--warning-color-500:hsl(calc(var(--warning-color-hue)),var(--warning-color-sat),50%);--warning-color-600:hsl(calc(var(--warning-color-hue) + 5),var(--warning-color-sat),60%);--warning-color-700:hsl(calc(var(--warning-color-hue) + 10),var(--warning-color-sat),70%);--warning-color-800:hsl(calc(var(--warning-color-hue) + 15),var(--warning-color-sat),80%);--warning-color-900:hsl(calc(var(--warning-color-hue) + 20),var(--warning-color-sat),90%);--warning-color-950:hsl(calc(var(--warning-color-hue) + 25),var(--warning-color-sat),95%);--confirm-color-hue:100;--confirm-color-sat:50%;--confirm-color-100:hsl(calc(var(--confirm-color-hue) - 20),var(--confirm-color-sat),10%);--confirm-color-200:hsl(calc(var(--confirm-color-hue) - 15),var(--confirm-color-sat),20%);--confirm-color-300:hsl(calc(var(--confirm-color-hue) - 10),var(--confirm-color-sat),30%);--confirm-color-400:hsl(calc(var(--confirm-color-hue) - 5),var(--confirm-color-sat),40%);--confirm-color-500:hsl(calc(var(--confirm-color-hue)),var(--confirm-color-sat),50%);--confirm-color-600:hsl(calc(var(--confirm-color-hue) + 5),var(--confirm-color-sat),60%);--confirm-color-700:hsl(calc(var(--confirm-color-hue) + 10),var(--confirm-color-sat),70%);--confirm-color-800:hsl(calc(var(--confirm-color-hue) + 15),var(--confirm-color-sat),80%);--confirm-color-900:hsl(calc(var(--confirm-color-hue) + 20),var(--confirm-color-sat),90%);--confirm-color-950:hsl(calc(var(--confirm-color-hue) + 25),var(--confirm-color-sat),95%);--opacity-000:0;--opacity-100:0.1;--opacity-200:0.2;--opacity-300:0.3;--opacity-400:0.4;--opacity-500:0.5;--opacity-600:0.6;--opacity-700:0.7;--opacity-800:0.8;--opacity-900:0.9;--opacity-999:1;--size-000:0px;--size-100:12px;--size-200:14px;--size-300:16px;--size-400:20px;--size-500:24px;--size-600:30px;--size-700:36px;--size-800:48px;--size-900:60px;--size-999:72px;--transition-time:200ms;--transition-easing:ease;--font-family-sans:Verdana,Geneva,Tahoma,sans-serif;--font-family-mono:monospace;--golden-ratio:1.61803;--pi:3.14159}\n  :host,:root{--base-font-family:var(--font-family-sans);--base-font-size:16px;--base-font-weight:400;--base-line-height:1.5em;--base-text-color:var(--neutral-color-200);--base-bg-color:var(--neutral-color-999)}body,html{padding:0;margin:0}:host,:root{font-family:var(--base-font-family);font-size:var(--base-font-size);font-weight:var(--base-font-weight);line-height:var(--base-line-height);color:var(--base-text-color);touch-action:manipulation;-webkit-tap-highlight-color:transparent}body{font-weight:inherit;line-height:inherit;color:inherit;background-color:var(--base-bg-color)}*,body{font-family:inherit;font-size:inherit}*{box-sizing:border-box}:focus{outline:1px dotted var(--primary-color-800)}\n  :host,:root{--input-line-height:1em;--input-y-padding:0.75em;--input-x-padding:1.25em;--input-border-width:1px;--input-normal-color:var(--neutral-color-700);--input-focus-color:var(--primary-color-700);--input-text-color:var(--neutral-color-000);--input-bg-color:var(--neutral-color-950);--input-placeholder-color:var(--neutral-color-600)}input::placeholder,textarea::placeholder{color:var(--input-placeholder-color)}input:not([type=checkbox]):not([type=radio]),textarea{-webkit-appearance:none;height:calc(var(--input-line-height) + var(--input-y-padding)*2 + var(--input-border-width)*2);line-height:var(--input-line-height);padding:var(--input-y-padding) var(--input-x-padding);background-color:var(--input-bg-color);background-image:none;border:none;border-bottom:var(--input-border-width) solid var(--input-normal-color);padding-bottom:calc(var(--input-x-padding) - var(input-border-width));color:var(--input-text-color);border-radius:0;box-shadow:none;font-size:inherit}textarea{height:auto}input:not([type=checkbox]):not([type=radio]):focus,textarea:focus{border-color:var(--input-focus-color)}input.invalid:not([type=checkbox]):not([type=radio]),input:invalid:not([type=checkbox]):not([type=radio]),textarea.invalid,textarea:invalid{--input-normal-color:var(--critical-color-700);--input-focus-color:var(--critical-color-600)}input[type=checkbox],input[type=radio]{-webkit-appearance:none;appearance:none;display:inline-block;border:var(--input-border-width) solid var(--input-normal-color);position:relative;width:calc(var(--input-y-padding)*2);height:calc(var(--input-y-padding)*2);background-color:var(--input-bg-color)}input[type=checkbox]:focus,input[type=radio]:focus{border-color:var(--input-focus-color)}input[type=checkbox]{border-radius:0}input[type=radio]{border-radius:50%}input[type=checkbox]:after,input[type=radio]:after{content:"";position:absolute;left:calc(var(--input-border-width)*2);top:calc(var(--input-border-width)*2);width:calc(100% - var(--input-border-width)*4);height:calc(100% - var(--input-border-width)*4);background-color:var(--input-focus-color);opacity:0;transform:scale(.5);transition-property:opacity,transform;transition-timing-function:var(--transition-easing);transition-duration:var(--transition-time)}input[type=radio]:after{border-radius:50%}input[type=checkbox]:checked,input[type=radio]:checked{border-color:var(--input-focus-color)}input[type=checkbox]:checked:after,input[type=radio]:checked:after{opacity:1;transform:scale(1)}input.accent,textarea.accent{--input-focus-color:var(--accent-color-600)}\n  :host,:root{--selectable-y-padding:0.50em;--selectable-x-padding:1.25em;--selectable-bg-color:var(--neutral-color-999);--selectable-hover-color:var(--primary-color-950);--selectable-hr-height:1px;--selectable-hr-color:var(--neutral-color-900)}.selectable{display:flex;flex-direction:row;background-color:var(--selectable-bg-color);line-height:calc(var(--input-y-padding)*2);padding:var(--selectable-y-padding) var(--selectable-x-padding);align-items:center;position:relative}.selectable:hover{background-color:var(--selectable-hover-color)}.selectable>input{vertical-align:middle;margin-right:var(--selectable-x-padding)}.selectable .selectable-label,.selectable>span{display:block}.selectable:not(:last-child):after{content:"";display:block;position:absolute;bottom:0;left:var(--selectable-x-padding);right:var(--selectable-x-padding);height:var(--selectable-hr-height);background-color:var(--selectable-hr-color)}\n\n  ',attributesSchema:{name:{type:n.String,observed:!0,property:!0,value:""},value:{type:n.String,observed:!0,property:!0,value:""},checked:{type:Boolean,observed:!0,property:!0,value:!1}},controller:({light:t,shadow:e,attributes:r})=>{const o=e.$("#cnt"),n=e.$("#input"),a=()=>{const e=n.checked,a=r.get("checked");e!==a&&(n.checked=a,o.classList.toggle("checked",a),t.dispatch("change"))};return n.addEventListener("input",()=>{const e=r.get("checked"),o=n.checked;e!==o&&(r.set("checked",o),t.dispatch("change"))}),{connectedCallback:()=>{a()},attributeChangedCallback:a}}};(class extends p{}).config=Object.assign(Object.assign({},F),{elementName:"htna-label-radio",formInputType:"radio",render:()=>'<label id="cnt" class="selectable"><input type="radio" id="input" /><span id="label"><slot name="label"></slot></span></label>'});h({elementName:"htna-number-range",render:()=>'<div id="range">\n<div class="range-row"><label for="range-from"><slot name="from"></slot></label><input type="range" id="range-from" min="0" max="100" /><output for="range-from"></output></div>\n<div class="range-row"><label for="range-to"><slot name="to"></slot></label><input type="range" id="range-to" min="0" max="100" /><output for="range-to"></output></div>\n</div>',style:"\n:host {\n  display: inline-block;\n  --line-height: 1.5em;\n}\n#range {\n  position: relative;\n}\n.range-row {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  line-height: var(--line-height);\n  height: var(--line-height);\n}\nlabel {\n  width: 50px;\n  height: 100%;\n}\ninput {\n  flex: 1;\n  height: 100%;\n}\noutput {\n  width: 50px;\n  height: 100%;\n  text-align: right;\n}\n  ",attributesSchema:{step:{type:n.Number,observed:!0,property:!0,value:1},min:{type:n.Number,observed:!0,property:!0,value:0},max:{type:n.Number,observed:!0,property:!0,value:100},value:{type:n.CSVNumber,observed:!0,property:!0,value:[0,0]}},controller:({light:t,shadow:e,attributes:r})=>{const o=e.$("#range-from"),n=e.$("#range-to"),a=e.$('output[for="range-from"'),i=e.$('output[for="range-to"'),l=function(e="from"){const l=r.get("value"),c=r.get("min"),s=r.get("max"),u=Number(o.value),d=Number(n.value);let p=Math.max(Math.min(u,s),c),h=Math.max(Math.min(d,s),c);"to"===e?p=Math.min(h,p):h=Math.max(h,p),p!==u&&(o.value=p.toString()),h!==d&&(n.value=p.toString()),l[0]===p&&l[1]===h||(r.set("value",[p,h]),t.dispatch("change")),a.value=o.value,i.value=n.value},c=()=>{const t=r.get("value");t&&(o.value=t[0].toString(),n.value=t[1].toString())},s=function(){const t=r.get("min"),e=r.get("max"),a=r.get("step");o.min=t||0,o.max=e||100,o.step=a||1,n.min=t||0,n.max=e||100,n.step=a||1,l()};return o.addEventListener("input",()=>{l("from")}),n.addEventListener("input",()=>{l("to")}),{connectedCallback:()=>{c(),s()},attributeChangedCallback:{step:s,min:s,max:s,value:()=>{c(),l()}}}}});const R=h({elementName:"htna-mati-button",render:()=>'<button type="button" part="button"><span><slot></slot></span></button>',style:"\n  :host {\n    display: inline-block;\n  }\n  button {\n    position: relative;\n    padding: 0.25em 0.5em;\n    border-radius: 0.5em;\n    box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.2) inset;\n    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));\n    color: #FFFFFF;\n    font-size: 20px;\n    font-family: \"Arial Black\", Arial, sans-serif;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n    text-transform: uppercase;\n    border: none;\n    font-weight: bold;\n    line-height: 1em;\n    text-align: center;\n    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5), 0px 2px 6px rgba(0, 0, 0, 0.2);\n  }\n  button::before {\n    content: '';\n    display: block;\n    position: absolute;\n    bottom: 1px;\n    right: 1px;\n    left: 1px;\n    top: 60%;\n    border-radius: 0.2em 0.2em 0.4em 0.4em;\n    background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));\n    filter: blur(0.2em);\n  }\n  button::after {\n    content: '';\n    display: block;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    left: 1px;\n    bottom: 50%;\n    border-radius: calc(0.5em - 1px) calc(0.5em - 1px) 0.2em 0.2em;\n    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));\n  }\n  button:focus {\n    outline: none;\n  }\n  button:active {\n    filter: brightness(110%) contrast(110%);\n    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.2);\n  }\n  ",attributesSchema:{color:{type:String,observed:!0,property:!0,value:"#FF0099"},size:{type:String,observed:!0,property:!0,value:"16px"},font:{type:String,observed:!0,property:!0,value:'"Arial Black", Arial, sans-serif'}},controller:({shadow:t,attributes:e})=>{const r=t.$("button"),o=()=>{r.style.backgroundColor=e.get("color"),r.style.fontSize=e.get("size"),r.style.fontFamily=e.get("font")};return{connectedCallback:o,attributeChangedCallback:o}}});h({elementName:"htna-modal-overlay",render:()=>'<div id="overlay"><div id="overlay-wrp"><div id="overlay-cnt"><slot></slot></div></div></div>',style:"\n  :host {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 99999;\n    width: 100%;\n    height: 100%;\n  }\n  #overlay {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n  }\n  #overlay.blurred {\n    backdrop-filter: blur(4px);\n  }\n  #overlay-wrp {\n    min-width: 100%;\n    min-height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n  #overlay-cnt {\n\n  }\n  ",attributesSchema:{background:{type:String,observed:!0,property:!0,value:"rgba(0, 0, 0, 0.8)"},padding:{type:String,observed:!0,property:!0,value:"5vh"}},controller:({element:t,light:e,shadow:r,attributes:o})=>{const n=r.$("#overlay"),a=r.$("#overlay-cnt"),i=()=>{n.style.backgroundColor=o.get("background")||"transparent",a.style.padding=o.get("padding")};return e.on(t,"scroll",t=>{t.stopPropagation()}),e.on(t,"click",r=>{r.target===t&&e.dispatch("dismiss")}),{connectedCallback:i,attributeChangedCallback:{background:i,padding:i}}}}),h({elementName:"htna-overlay",render:()=>'<div id="overlay"><slot></slot></div>',style:"\n  :host {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 99999;\n    width: 100%;\n    height: 100%;\n  }\n  #overlay {\n    width: 100%;\n    height: 100%;\n  }\n  ",attributesSchema:{background:{type:String,observed:!0,property:!0,value:"transparent"}},controller:({element:t,light:e,shadow:r,attributes:o})=>{const n=r.$("#overlay"),a=()=>{n.style.backgroundColor=o.get("background")||"transparent"};return e.on(t,"scroll",t=>{t.stopPropagation()}),e.on(t,"click",t=>{t.target===n&&e.dispatch("dismiss")}),{connectedCallback:a,attributeChangedCallback:{background:a,padding:a}}}});R.register();const O=M("div",{id:"letters"}),z=M("div",{id:"numbers"}),V=M("div",{id:"words"}),H=M("div",{id:"app"},[O,z,V]),P=new AudioContext,j={},B="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(","),Y="A,E,I,O,U".split(",");for(let e=0,r=B.length;e<r;e++){const r=B[e];t(void 0,void 0,void 0,(function*(){j[r]=yield v.createFromURL(P,`./sounds/${r}.mp3`)})),O.appendChild(M("htna-mati-button",{size:"40px",font:"Itim",color:Y.includes(r)?"#FF0099":"#0066FF",click:()=>{j[r].play()}},[r]))}for(let e=1;e<=10;e++){(()=>{t(void 0,void 0,void 0,(function*(){j[e.toString()]=yield v.createFromURL(P,`./sounds/${e}.mp3`)}))})();const r=36*(e-1);z.appendChild(M("htna-mati-button",{size:"40px",font:"Itim",color:`hsl(${r}deg, 100%, 50%)`,click:()=>{j[e.toString()].play()}},[e.toString()]))}const q="MATILDE,LUDOVICA,MAMMA,PAPÀ,CIAO,PAPPA,ACQUA,SI,NO".split(",");for(let e=0,r=q.length;e<r;e++){const r=q[e];t(void 0,void 0,void 0,(function*(){j[r]=yield v.createFromURL(P,`./sounds/${r}.mp3`)})),V.appendChild(M("htna-mati-button",{size:"40px",font:"Itim",color:"#FF6600",click:()=>{j[r].play()}},[r]))}document.body.appendChild(H);
