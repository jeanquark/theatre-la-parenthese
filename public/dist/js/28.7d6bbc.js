(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{111:function(e,t,r){"use strict";r.r(t);var n=r(0),s=r.n(n),a=r(3),o=r.n(a),i=r(10),u=r.n(i);function c(e,t,r,n,s,a,o){try{var i=e[a](o),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,s)}function p(e){return function(){var t=this,r=arguments;return new Promise(function(n,s){var a=e.apply(t,r);function o(e){c(a,n,s,o,i,"next",e)}function i(e){c(a,n,s,o,i,"throw",e)}o(void 0)})}}var h={metaInfo:function(){return{title:"Accueil"}},layout:"frontend",created:function(){var e=p(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.$store.getters["pages/pages"][this.pageSlug]){e.next=5;break}return this.$store.commit("loading/SET_LOADING",!0),e.next=4,this.$store.dispatch("pages/fetchPageBySlug",this.pageSlug);case 4:this.$store.commit("loading/SET_LOADING",!1);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),mounted:function(){},data:function(){return{pageSlug:"accueil",form:new u.a({message:""})}},computed:{loadedUser:function(){return this.$store.getters["auth/user"]},pages:function(){return this.$store.getters["pages/pages"]},page:function(){return this.pages[this.pageSlug]},check:function(){return this.$store.getters["auth/check"]},token:function(){return this.$store.getters["auth/token"]}},methods:{updateUserRole:function(){var e=p(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$store.dispatch("users/updateUser",{user:{id:this.loadedUser.id,role:"admin"}});case 3:t=e.sent,console.log("abc: ",t),this.$noty.success("Utilisateur mis à jour avec succès!"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),this.$noty.error("Une erreur est survenue et l'utilisateur n'a pas pu être mis à jour.");case 11:case"end":return e.stop()}},e,this,[[0,8]])}));return function(){return e.apply(this,arguments)}}(),deleteReservations:function(){var e=p(s.a.mark(function e(){var t,r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.get("/api/plan-seats/delete-reservations");case 3:t=e.sent,r=t.data,console.log("data: ",r),this.$noty.success("Les entrées ont bien été effacées."),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("error: ",e.t0),this.$noty.error("Une erreur est survenue et les entrées n'ont pas pu être effacées.");case 13:case"end":return e.stop()}},e,this,[[0,9]])}));return function(){return e.apply(this,arguments)}}()}},l=r(2),f=Object(l.a)(h,function(){var e=this.$createElement,t=this._self._c||e;return t("b-container",[t("b-row",[this.pages[this.pageSlug]?t("div",{domProps:{innerHTML:this._s(this.pages[this.pageSlug].content)}}):this._e()])],1)},[],!1,null,"335a1c9a",null);t.default=f.exports}}]);