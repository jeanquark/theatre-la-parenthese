(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{24:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r);function s(t,e,n,r,a,s,o){try{var i=t[s](o),c=i.value}catch(t){return void n(t)}i.done?e(c):Promise.resolve(c).then(r,a)}function o(t){return function(){var e=this,n=arguments;return new Promise(function(r,a){var o=t.apply(e,n);function i(t){s(o,r,a,i,c,"next",t)}function c(t){s(o,r,a,i,c,"throw",t)}i(void 0)})}}var i={layout:"backend",created:function(){var t=o(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(Object.entries(this.$store.getters["performances/performances"]).length<=1)){t.next=5;break}return this.$store.getters[!0],t.next=4,this.$store.dispatch("performances/fetchPerformances");case 4:this.$store.getters[!1];case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),data:function(){return{sortBy:"id",sortDesc:!0,fields:[{key:"id",label:"ID",sortable:!0},{key:"name",label:"Nom",sortable:!0},{key:"date",label:"Date",sortable:!0},{key:"updated_at",label:"Dernière modification",sortable:!0},{key:"actions",sortable:!1}]}},computed:{loading:function(){return this.$store.getters["loading/loading"]},performances:function(){return this.$store.getters["performances/performances"]},performancesArray:function(){var t=[];for(var e in this.performances)this.performances.hasOwnProperty(e)&&null!=this.performances[e]&&t.push(this.performances[e]);return t}},methods:{deletePerformance:function(){var t=o(a.a.mark(function t(e){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$bvModal.msgBoxConfirm("Etes-vous sûr de vouloir supprimer la représentation ".concat(e,"?"),{okTitle:"OK",cancelTitle:"Annuler"});case 3:if(n=t.sent,console.log("value: ",n),!n){t.next=9;break}return t.next=8,this.$store.dispatch("performances/deletePerformance",{performanceId:e});case 8:this.$noty.success("Représentation supprimée avec succès!");case 9:t.next=15;break;case 11:t.prev=11,t.t0=t.catch(0),console.log("error: ",t.t0),this.$noty.error("Une erreur est survenue et la représentation n'a pas pu être supprimée.");case 15:case"end":return t.stop()}},t,this,[[0,11]])}));return function(e){return t.apply(this,arguments)}}()}},c=(n(278),n(2)),l=Object(c.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",[n("b-breadcrumb",[n("b-breadcrumb-item",{attrs:{active:""}},[n("font-awesome-icon",{attrs:{icon:"calendar-day"}}),t._v(" Représentations")],1)],1),t._v(" "),n("h2",{staticClass:"text-center"},[t._v("Représentations")]),t._v(" "),n("b-button",{staticClass:"my-3",attrs:{variant:"primary",to:"/admin/performances/create"}},[t._v("Créer une nouvelle représentation")]),t._v(" "),t.loading?t._e():n("b-table",{staticClass:"nowrap",attrs:{responsive:"sm",items:t.performancesArray,fields:t.fields,"sort-by":t.sortBy,"sort-desc":t.sortDesc},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e}},scopedSlots:t._u([{key:"cell(name)",fn:function(e){return[n("router-link",{attrs:{to:"/admin/performances/"+e.item.id}},[t._v("\n\t\t\t\t\t"+t._s(e.item.name)+"\n\t\t\t\t")])]}},{key:"cell(date)",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t._f("moment")(e.item.date,"DD MMM YYYY"))+"\n\t\t\t")]}},{key:"cell(updated_at)",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t._f("moment")(e.item.updated_at,"from","now"))+"\n\t\t\t")]}},{key:"cell(actions)",fn:function(e){return[n("router-link",{staticClass:"btn btn-warning",staticStyle:{display:"inline-block"},attrs:{to:"/admin/performances/"+e.item.id}},[n("font-awesome-icon",{attrs:{icon:"eye"}})],1),t._v(" "),n("router-link",{staticClass:"btn btn-success",staticStyle:{display:"inline-block"},attrs:{to:"/admin/performances/"+e.item.id+"/edit"}},[n("font-awesome-icon",{attrs:{icon:"edit"}})],1),t._v(" "),n("button",{staticClass:"btn btn-danger",on:{click:function(n){return t.deletePerformance(e.item.id)}}},[n("font-awesome-icon",{attrs:{icon:"trash"}})],1)]}}],null,!1,87038704)}),t._v(" "),t.loading?n("b-row",{staticClass:"justify-content-center"},[n("b-spinner",{attrs:{variant:"primary",label:"Spinning"}})],1):t._e()],1)},[],!1,null,"578ffac8",null);e.default=l.exports},278:function(t,e,n){"use strict";var r=n(44);n.n(r).a},279:function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"\n.table.b-table > thead > tr > [aria-sort][data-v-578ffac8]:not(.b-table-sort-icon-left) {\n\t\tvertical-align: middle;\n}\n.inline-block[data-v-578ffac8] {\n\t\tdisplay: inline-block;\n}\n.nowrap[data-v-578ffac8] {\n        white-space:nowrap;\n}\n",""])},44:function(t,e,n){var r=n(279);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,a);r.locals&&(t.exports=r.locals)}}]);