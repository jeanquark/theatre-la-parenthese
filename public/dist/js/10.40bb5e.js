(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{25:function(t,e,r){"use strict";r.r(e);var n=r(0),s=r.n(n);function i(t,e,r,n,s,i,a){try{var o=t[i](a),u=o.value}catch(t){return void r(t)}o.done?e(u):Promise.resolve(u).then(n,s)}function a(t){return function(){var e=this,r=arguments;return new Promise(function(n,s){var a=t.apply(e,r);function o(t){i(a,n,s,o,u,"next",t)}function u(t){i(a,n,s,o,u,"throw",t)}o(void 0)})}}var o={layout:"backend",created:function(){var t=a(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.$store.getters["users/users"].length<1)){t.next=5;break}return this.$store.commit("loading/SET_LOADING",!0),t.next=4,this.$store.dispatch("users/fetchUsers");case 4:this.$store.commit("loading/SET_LOADING",!1);case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),data:function(){return{sortBy:"id",sortDesc:!0,fields:[{key:"id",label:"ID",sortable:!0},{key:"email",label:"Email",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"updated_at",label:"Dernière modification",sortable:!0},{key:"actions",sortable:!1}]}},computed:{loading:function(){return this.$store.getters["loading/loading"]},users:function(){return this.$store.getters["users/users"]}},methods:{updateUserRole:function(){var t=a(s.a.mark(function t(e,r){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("updateUserRole: ",e,r),t.next=4,this.$store.dispatch("users/updateUser",{user:e,newRole:r});case 4:this.$noty.success("Utilisateur mis à jour avec succès!"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("error: ",t.t0),this.$noty.error("Une erreur est survenue et l'utilisateur n'a pas pu être mis à jour.");case 11:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e,r){return t.apply(this,arguments)}}(),deleteUser:function(){var t=a(s.a.mark(function t(e){var r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$bvModal.msgBoxConfirm("Etes-vous sûr de vouloir supprimer l utilisateur ".concat(e,"?"),{okTitle:"OK",cancelTitle:"Annuler"});case 3:if(r=t.sent,console.log("value: ",r),!r){t.next=9;break}return t.next=8,this.$store.dispatch("users/deleteUser",{userId:e});case 8:this.$noty.success("Utilisateur supprimée avec succès!");case 9:t.next=15;break;case 11:t.prev=11,t.t0=t.catch(0),console.log("error: ",t.t0),this.$noty.error("Une erreur est survenue et l'utilisateur n'a pas pu être supprimé.");case 15:case"end":return t.stop()}},t,this,[[0,11]])}));return function(e){return t.apply(this,arguments)}}()}},u=(r(327),r(2)),c=Object(u.a)(o,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",[r("b-breadcrumb",[r("b-breadcrumb-item",{attrs:{active:""}},[r("font-awesome-icon",{attrs:{icon:"users"}}),t._v(" Utilisateurs")],1)],1),t._v(" "),r("h2",{staticClass:"text-center"},[t._v("Utilisateurs")]),t._v(" "),r("b-button",{staticClass:"my-3",attrs:{variant:"primary",to:"/admin/users/create"}},[t._v("Créer un nouvel utilistateur")]),t._v(" "),t.loading?t._e():r("b-table",{staticClass:"nowrap",attrs:{responsive:"sm",items:t.users,fields:t.fields,"sort-by":t.sortBy,"sort-desc":t.sortDesc},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e}},scopedSlots:t._u([{key:"cell(role)",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.item.roles[0].name)+"\n\t\t\t")]}},{key:"cell(updated_at)",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t._f("moment")(e.item.updated_at,"from","now"))+"\n\t\t\t")]}},{key:"cell(actions)",fn:function(e){return["user"===e.item.roles[0].slug?r("b-button",{attrs:{variant:"info"},on:{click:function(r){return t.updateUserRole(e.item,"admin")}}},[t._v("\n\t    \t\t\tDevenir Admin\n\t    \t\t")]):t._e(),t._v(" "),"admin"===e.item.roles[0].slug?r("b-button",{attrs:{variant:"info"},on:{click:function(r){return t.updateUserRole(e.item,"user")}}},[t._v("\n\t    \t\t\tDevenir Utilisateur\n\t    \t\t")]):t._e(),t._v(" "),r("router-link",{staticClass:"btn btn-warning",staticStyle:{display:"inline-block"},attrs:{to:"/admin/users/"+e.item.id}},[r("font-awesome-icon",{attrs:{icon:"eye"}})],1),t._v(" "),r("router-link",{staticClass:"btn btn-success",staticStyle:{display:"inline-block"},attrs:{to:"/admin/users/"+e.item.id+"/edit"}},[r("font-awesome-icon",{attrs:{icon:"edit"}})],1),t._v(" "),r("b-button",{attrs:{variant:"danger"},on:{click:function(r){return t.deleteUser(e.item.id)}}},[r("font-awesome-icon",{attrs:{icon:"trash"}})],1)]}}],null,!1,1893920854)}),t._v(" "),t.loading?r("b-row",{staticClass:"justify-content-center"},[r("b-spinner",{attrs:{variant:"primary",label:"Spinning"}})],1):t._e()],1)},[],!1,null,"30785167",null);e.default=c.exports},327:function(t,e,r){"use strict";var n=r(64);r.n(n).a},328:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,"\n.table.b-table > thead > tr > [aria-sort][data-v-30785167]:not(.b-table-sort-icon-left) {\n\t\tvertical-align: middle;\n}\n.inline-block[data-v-30785167] {\n\t\tdisplay: inline-block;\n}\n.nowrap[data-v-30785167] {\n        white-space:nowrap;\n}\n",""])},64:function(t,e,r){var n=r(328);"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r(7)(n,s);n.locals&&(t.exports=n.locals)}}]);