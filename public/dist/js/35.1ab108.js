(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{116:function(t,e,r){"use strict";r.r(e);var n=r(0),s=r.n(n);function a(t,e,r,n,s,a,o){try{var i=t[a](o),c=i.value}catch(t){return void r(t)}i.done?e(c):Promise.resolve(c).then(n,s)}var o={layout:"backend",created:function(){var t,e=(t=s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.memberId=parseInt(this.$route.params.id),!(this.$store.getters["members/members"].length<1)){t.next=4;break}return t.next=4,this.$store.dispatch("members/fetchMembers");case 4:case"end":return t.stop()}},t,this)}),function(){var e=this,r=arguments;return new Promise(function(n,s){var o=t.apply(e,r);function i(t){a(o,n,s,i,c,"next",t)}function c(t){a(o,n,s,i,c,"throw",t)}i(void 0)})});return function(){return e.apply(this,arguments)}}(),data:function(){return{memberId:"",sortBy:"id",sortDesc:!0,fields:[{key:"id",label:"ID",sortable:!1},{key:"firstname",label:"Prénom",sortable:!1},{key:"lastname",label:"Nom",sortable:!1},{key:"email",label:"E-mail",sortable:!1},{key:"phone",label:"Téléphone",sortable:!1},{key:"created_at",label:"Date de création",sortable:!1},{key:"updated_at",label:"Dernière modification",sortable:!1}]}},computed:{loading:function(){return this.$store.getters["loading/loading"]},members:function(){return this.$store.getters["members/members"]},member:function(){var t=this;return this.$store.getters["members/members"].find(function(e){return e.id===t.memberId})},memberArray:function(){var t=[];return t.push(this.member),t}}},i=r(2),c=Object(i.a)(o,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",[r("b-breadcrumb",[r("b-breadcrumb-item",{staticClass:"navigation",attrs:{to:"/admin/members"}},[r("font-awesome-icon",{attrs:{icon:"id-card-alt"}}),t._v(" "),r("span",[t._v("Membres")])],1),t._v(" "),r("b-breadcrumb-item",{attrs:{active:""}},[t._v("Montrer")])],1),t._v(" "),r("h2",{staticClass:"text-center"},[t._v("Membre "+t._s(t.member.firstname)+" "+t._s(t.member.lastname))]),t._v(" "),r("b-row",{staticClass:"justify-content-center"},[r("b-col",{attrs:{cols:"12"}},[t.loading?t._e():r("b-table",{staticClass:"nowrap",attrs:{responsive:"sm",items:t.memberArray,fields:t.fields,"sort-by":t.sortBy,"sort-desc":t.sortDesc,stacked:!0},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e}},scopedSlots:t._u([{key:"cell(created_at)",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(t._f("moment")(e.item.created_at,"Do MMMM YYYY"))+"\n\t\t\t\t\t")]}},{key:"cell(updated_at)",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(t._f("moment")(e.item.updated_at,"from","now"))+"\n\t\t\t\t\t")]}}],null,!1,3781165326)})],1)],1)],1)},[],!1,null,"80cf48ae",null);e.default=c.exports}}]);