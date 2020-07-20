(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{101:function(t,e,r){"use strict";r.r(e);var s=r(0),a=r.n(s),o=r(8),n=r.n(o);function i(t,e,r,s,a,o,n){try{var i=t[o](n),l=i.value}catch(t){return void r(t)}i.done?e(l):Promise.resolve(l).then(s,a)}var l={metaInfo:function(){return{title:"S'enregistrer"}},middleware:"guest",components:{},layout:"frontend",data:function(){return{form:new n.a({firstname:"John",lastname:"Doe",email:"john.doe@example.com",password:"secret",password_confirmation:"secre"}),mustVerifyEmail:!1}},computed:{loading:function(){return this.$store.getters["loading/loading"]}},methods:{register:function(){var t,e=(t=a.a.mark(function t(){var e,r,s,o,n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,this.$store.commit("loading/SET_LOADING",!0),t.next=4,this.form.post("/api/register");case 4:if(e=t.sent,r=e.data,this.$noty.success("Enregistrement avec succès!"),!r.status){t.next=12;break}this.$store.commit("loading/SET_LOADING",!1),this.mustVerifyEmail=!0,t.next=23;break;case 12:return t.next=14,this.form.post("/api/login");case 14:return s=t.sent,o=s.data.token,this.$store.dispatch("auth/saveToken",{token:o}),t.next=19,this.$store.dispatch("auth/updateUser",{user:r});case 19:return t.next=21,this.$store.dispatch("auth/fetchUser");case 21:this.$store.commit("loading/SET_LOADING",!1),this.$router.push({name:"accueil"});case 23:t.next=32;break;case 25:t.prev=25,t.t0=t.catch(0),console.log("error: ",t.t0),this.$store.commit("loading/SET_LOADING",!1),this.$noty.error("Une erreur est survenue et l'enregistrement a échoué."),n=t.t0.message,console.log("message: ",n);case 32:case"end":return t.stop()}},t,this,[[0,25]])}),function(){var e=this,r=arguments;return new Promise(function(s,a){var o=t.apply(e,r);function n(t){i(o,s,a,n,l,"next",t)}function l(t){i(o,s,a,n,l,"throw",t)}n(void 0)})});return function(){return e.apply(this,arguments)}}()}},m=r(2),c=Object(m.a)(l,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",[r("b-row",{staticClass:"justify-content-center"},[r("b-col",{attrs:{cols:"12",md:"6"}},[r("b-card",[r("b-card-body",[r("b-card-title",{staticClass:"text-center mb-4"},[t._v("\n                        S'enregistrer\n                    ")]),t._v(" "),r("b-card-text",[r("b-form",{on:{submit:function(e){return e.preventDefault(),t.register(e)}}},[r("b-row",[r("b-col",{staticClass:"text-right col-form-label",attrs:{cols:"4",md:"4"}},[r("label",[t._v("Prénom")])]),t._v(" "),r("b-col",{attrs:{cols:"8",md:"8"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.firstname,expression:"form.firstname"}],staticClass:"form-control",class:{"is-invalid":t.form.errors.has("firstname")},attrs:{type:"text",name:"firstname"},domProps:{value:t.form.firstname},on:{input:function(e){e.target.composing||t.$set(t.form,"firstname",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.form,field:"firstname"}})],1)],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"text-right col-form-label",attrs:{cols:"4",md:"4"}},[r("label",[t._v("Nom")])]),t._v(" "),r("b-col",{attrs:{cols:"8",md:"8"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.lastname,expression:"form.lastname"}],staticClass:"form-control",class:{"is-invalid":t.form.errors.has("lastname")},attrs:{type:"text",name:"lastname"},domProps:{value:t.form.lastname},on:{input:function(e){e.target.composing||t.$set(t.form,"lastname",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.form,field:"lastname"}})],1)],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"text-right col-form-label",attrs:{cols:"4",md:"4"}},[r("label",[t._v("E-mail")])]),t._v(" "),r("b-col",{attrs:{cols:"8",md:"8"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"form-control",class:{"is-invalid":t.form.errors.has("email")},attrs:{type:"email",name:"email"},domProps:{value:t.form.email},on:{input:function(e){e.target.composing||t.$set(t.form,"email",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.form,field:"email"}})],1)],1),t._v(" "),r("b-row",{attrs:{"align-v":"center"}},[r("b-col",{staticClass:"text-right col-form-label",attrs:{cols:"6",md:"4"}},[r("label",[t._v("Mot de passe")])]),t._v(" "),r("b-col",{attrs:{cols:"6",md:"8"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"form-control",class:{"is-invalid":t.form.errors.has("password")},attrs:{type:"password",name:"password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.form,field:"password"}})],1)],1),t._v(" "),r("b-row",{attrs:{"align-v":"center"}},[r("b-col",{staticClass:"text-right col-form-label",attrs:{cols:"6",md:"4"}},[r("label",[t._v("Confirmer mot de passe")])]),t._v(" "),r("b-col",{attrs:{cols:"6",md:"8"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password_confirmation,expression:"form.password_confirmation"}],staticClass:"form-control",class:{"is-invalid":t.form.errors.has("password_confirmation")},attrs:{type:"password",name:"password_confirmation"},domProps:{value:t.form.password_confirmation},on:{input:function(e){e.target.composing||t.$set(t.form,"password_confirmation",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.form,field:"password_confirmation"}})],1)],1),t._v(" "),r("b-row",{staticClass:"justify-content-center my-2"},[r("b-button",{attrs:{type:"submit",disabled:t.loading}},[t.loading?r("b-spinner",{attrs:{small:"",variant:"primary",label:"Spinning"}}):t._e(),t._v("\n                                    S'enregistrer\n                                ")],1)],1),t._v(" "),r("b-row",{staticClass:"justify-content-center my-2"},[r("router-link",{staticClass:"m-2",attrs:{to:{name:"login"}}},[t._v("Aller au login →")])],1)],1)],1)],1)],1)],1)],1)],1)},[],!1,null,null,null);e.default=c.exports}}]);