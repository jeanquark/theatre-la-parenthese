(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{101:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=(n(3),n(60));function i(t,e,n,r,a,o,i){try{var s=t[o](i),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,a)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(r,a){var o=t.apply(e,n);function s(t){i(o,r,a,s,c,"next",t)}function c(t){i(o,r,a,s,c,"throw",t)}s(void 0)})}}var c={components:{ckeditor:n.n(o).a.component},created:function(){var t=s(a.a.mark(function t(){var e;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.$route.params.id,this.pageSlug=e,console.log("pageSlug: ",e),this.$store.getters["pages/pages"][e]){t.next=6;break}return t.next=6,this.$store.dispatch("pages/fetchPageBySlug",e);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),mounted:function(){this.updatedPage={slug:this.pageSlug,title:this.page?this.page.title:"",content:this.page?this.page.content:""}},data:function(){return{editorData:"<p>Content of the editor.</p>",editorConfig:{extraPlugins:["justify","image2"],filebrowserBrowseUrl:"/ckfinder/browser",filebrowserUploadUrl:"/userfiles"},updatedPage:{}}},computed:{loading:function(){return this.$store.getters["loading/loading"]},pages:function(){return this.$store.getters["pages/pages"]},page:function(){return this.$store.getters["pages/pages"][this.pageSlug]}},methods:{updatePage:function(){var t=s(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("updatePage: ",this.updatedPage),this.$store.commit("loading/SET_LOADING",!0),t.next=5,this.$store.dispatch("pages/updatePage",this.updatedPage);case 5:this.$store.commit("loading/SET_LOADING",!1),this.$noty.success("Contenu mis à jour avec succès."),this.$router.push("/admin/pages"),t.next=15;break;case 10:t.prev=10,t.t0=t.catch(0),console.log("error: ",t.t0),this.$store.commit("loading/SET_LOADING",!1),this.$noty.error("Une erreur est survenue et le contenu n'a pas pu être mis à jour.");case 15:case"end":return t.stop()}},t,this,[[0,10]])}));return function(){return t.apply(this,arguments)}}()}},u=(n(272),n(2)),l=Object(u.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",[n("b-breadcrumb",[n("b-breadcrumb-item",{staticClass:"navigation",attrs:{to:"/admin/pages"}},[n("font-awesome-icon",{attrs:{icon:"file-alt"}}),t._v(" "),n("span",[t._v("Pages")])],1),t._v(" "),n("b-breadcrumb-item",{attrs:{active:""}},[t._v("Editer")])],1),t._v(" "),n("h2",{staticClass:"text-center mb-3"},[t._v("Editer le contenu de la page "),t.page?n("span",{staticClass:"primary-color"},[t._v('"'+t._s(t.page.title)+'"')]):t._e(),t._v(":")]),t._v(" "),t.updatedPage&&t.updatedPage.content?n("ckeditor",{attrs:{config:t.editorConfig},model:{value:t.updatedPage.content,callback:function(e){t.$set(t.updatedPage,"content",e)},expression:"updatedPage['content']"}}):t._e(),t._v(" "),n("b-row",{staticClass:"justify-content-center my-2"},[n("b-button",{attrs:{variant:"primary",disabled:t.loading},on:{click:t.updatePage}},[t.loading?n("b-spinner",{attrs:{small:"",type:"grow"}}):t._e(),t._v("\n                Editer le contenu\n            ")],1)],1)],1)},[],!1,null,"a9dbbe3e",null);e.default=l.exports},272:function(t,e,n){"use strict";var r=n(41);n.n(r).a},273:function(t,e,n){(t.exports=n(6)(!1)).push([t.i,".primary-color[data-v-a9dbbe3e] {\n  color: #9ACD32;\n}",""])},41:function(t,e,n){var r=n(273);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,a);r.locals&&(t.exports=r.locals)},60:function(t,e,n){window,t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){function n(t,e){t.onload=function(){this.onerror=this.onload=null,e(null,t)},t.onerror=function(){this.onerror=this.onload=null,e(new Error("Failed to load "+this.src),t)}}t.exports=function(t,e,r){var a=document.head||document.getElementsByTagName("head")[0],o=document.createElement("script");"function"==typeof e&&(r=e,e={}),e=e||{},r=r||function(){},o.type=e.type||"text/javascript",o.charset=e.charset||"utf8",o.async=!("async"in e&&!e.async),o.src=t,e.attrs&&function(t,e){for(var n in e)t.setAttribute(n,e[n])}(o,e.attrs),e.text&&(o.text=""+e.text),("onload"in o?n:function(t,e){t.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,e(null,t))}})(o,r),o.onload||n(o,r),a.appendChild(o)}},function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r);let o;function i(t){if("CKEDITOR"in window)return Promise.resolve(CKEDITOR);if(t.length<1)throw new TypeError("CKEditor URL must be a non-empty string.");return o||(o=i.scriptLoader(t).then(t=>(o=void 0,t))),o}i.scriptLoader=(t=>new Promise((e,n)=>{a()(t,t=>t?n(t):window.CKEDITOR?void e(CKEDITOR):n(new Error("Script loaded from editorUrl doesn't provide CKEDITOR namespace.")))}));var s={name:"ckeditor",render(t){return t("div",{},[t(this.tagName)])},props:{value:{type:String,default:""},type:{type:String,default:"classic",validator:t=>["classic","inline"].includes(t)},editorUrl:{type:String,default:"https://cdn.ckeditor.com/4.13.1/standard-all/ckeditor.js"},config:{type:Object,default:()=>{}},tagName:{type:String,default:"textarea"},readOnly:{type:Boolean,default:null}},mounted(){i(this.editorUrl).then(()=>{if(this.$_destroyed)return;const t=this.config||{};null!==this.readOnly&&(t.readOnly=this.readOnly);const e="inline"===this.type?"inline":"replace",n=this.$el.firstElementChild,r=this.instance=CKEDITOR[e](n,t);r.on("instanceReady",()=>{const t=this.value;r.fire("lockSnapshot"),r.setData(t,{callback:()=>{this.$_setUpEditorEvents();const e=r.getData();t!==e?(this.$once("input",()=>{this.$emit("ready",r)}),this.$emit("input",e)):this.$emit("ready",r),r.fire("unlockSnapshot")}})})})},beforeDestroy(){this.instance&&this.instance.destroy(),this.$_destroyed=!0},watch:{value(t){this.instance.getData()!==t&&this.instance.setData(t)},readOnly(t){this.instance.setReadOnly(t)}},methods:{$_setUpEditorEvents(){const t=this.instance;t.on("change",e=>{const n=t.getData();this.value!==n&&this.$emit("input",n,e,t)}),t.on("focus",e=>{this.$emit("focus",e,t)}),t.on("blur",e=>{this.$emit("blur",e,t)})}}};const c={install(t){t.component("ckeditor",s)},component:s};e.default=c}]).default}}]);