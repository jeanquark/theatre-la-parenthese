(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{91:function(r,t,o){"use strict";o.r(t);var s=o(0),a=o.n(s),n=o(8),e=o.n(n);function i(r,t,o,s,a,n,e){try{var i=r[n](e),c=i.value}catch(r){return void o(r)}i.done?t(c):Promise.resolve(c).then(s,a)}var c={scrollToTop:!1,metaInfo:function(){return{title:this.$t("settings")}},data:function(){return{form:new e.a({password:"",password_confirmation:""})}},methods:{update:function(){var r,t=(r=a.a.mark(function r(){return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.form.patch("/api/settings/password");case 2:this.form.reset();case 3:case"end":return r.stop()}},r,this)}),function(){var t=this,o=arguments;return new Promise(function(s,a){var n=r.apply(t,o);function e(r){i(n,s,a,e,c,"next",r)}function c(r){i(n,s,a,e,c,"throw",r)}e(void 0)})});return function(){return t.apply(this,arguments)}}()}},m=o(2),d=Object(m.a)(c,function(){var r=this,t=r.$createElement,o=r._self._c||t;return o("card",{attrs:{title:r.$t("your_password")}},[o("form",{on:{submit:function(t){return t.preventDefault(),r.update(t)},keydown:function(t){return r.form.onKeydown(t)}}},[o("alert-success",{attrs:{form:r.form,message:r.$t("password_updated")}}),r._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-md-3 col-form-label text-md-right"},[r._v(r._s(r.$t("new_password")))]),r._v(" "),o("div",{staticClass:"col-md-7"},[o("input",{directives:[{name:"model",rawName:"v-model",value:r.form.password,expression:"form.password"}],staticClass:"form-control",class:{"is-invalid":r.form.errors.has("password")},attrs:{type:"password",name:"password"},domProps:{value:r.form.password},on:{input:function(t){t.target.composing||r.$set(r.form,"password",t.target.value)}}}),r._v(" "),o("has-error",{attrs:{form:r.form,field:"password"}})],1)]),r._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-md-3 col-form-label text-md-right"},[r._v(r._s(r.$t("confirm_password")))]),r._v(" "),o("div",{staticClass:"col-md-7"},[o("input",{directives:[{name:"model",rawName:"v-model",value:r.form.password_confirmation,expression:"form.password_confirmation"}],staticClass:"form-control",class:{"is-invalid":r.form.errors.has("password_confirmation")},attrs:{type:"password",name:"password_confirmation"},domProps:{value:r.form.password_confirmation},on:{input:function(t){t.target.composing||r.$set(r.form,"password_confirmation",t.target.value)}}}),r._v(" "),o("has-error",{attrs:{form:r.form,field:"password_confirmation"}})],1)]),r._v(" "),o("div",{staticClass:"form-group row"},[o("div",{staticClass:"col-md-9 ml-md-auto"},[o("v-button",{attrs:{loading:r.form.busy,type:"success"}},[r._v("\n          "+r._s(r.$t("update"))+"\n        ")])],1)])],1)])},[],!1,null,null,null);t.default=d.exports}}]);