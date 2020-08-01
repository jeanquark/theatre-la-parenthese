(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{17:function(e,t,n){"use strict";var a,r=n(0),s=n.n(r),o=(n(3),n(5)),l=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n,a,r,s,o){try{var l=e[s](o),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(a,r)}function d(e){return function(){var t=this,n=arguments;return new Promise(function(a,r){var s=e.apply(t,n);function o(e){c(s,a,r,o,l,"next",e)}function l(e){c(s,a,r,o,l,"throw",e)}o(void 0)})}}var u=(i(a={props:["selectedTable"],created:{}},"created",function(){var e=d(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()),i(a,"mounted",function(){var e=this;console.log("Modal mounted() lifecycle hook called"),this.$root.$on("bv::modal::shown",function(t,n){l.a.supported&&e.loadedPlan&&e.selectedTable&&e.loadedPlan.plan_seats.filter(function(t){return t.plan_table_id===e.selectedTable.id}).forEach(function(e){var t=e.svg_id.substring(e.svg_id.lastIndexOf("_")+1),n=l.a.get("".concat(t,"_group")),a=l.a.get("".concat(t,"_path")),r=l.a.get("".concat(t,"_text"));r&&r.plain(e.seat_number),a&&e.is_reserved&&(a.fill("#FF0000"),n.removeClass("seat"))})})}),i(a,"data",function(){return{selectedSeat:"",seatReserved:!1,reservationConfirmationCountdown:parseInt(Object({MIX_ACTIVATE_WEBSOCKETS:"false",MIX_PUSHER_APP_CLUSTER:"eu",MIX_PUSHER_APP_KEY:"3729cc9a955256058e8e",MIX_TINYMCE_KEY:"mvp9jqgiu38hcoig0dkgzvr5v0520jvl6lghgeyi4slwrogf",NODE_ENV:"production"}).MIX_RESERVATION_COUNTDOWN||720)}}),i(a,"computed",{loadedPlans:function(){return this.$store.getters["plans/plans"]},loadedPlan:function(){return this.$store.getters["plans/plans"][parseInt(this.$route.params.id)]},loadedUser:function(){return this.$store.getters["auth/user"]},loadedPlanSeats:function(){return this.$store.getters["planSeats/planSeats"]},loadedTableSeats:function(){return this.loadedPlan?this.loadedPlan.plan_seats.reduce(function(e,t){return e[t.plan_table_id]||(e[t.plan_table_id]=[]),e[t.plan_table_id].push(t),e},{})[this.selectedTable.id]:{}}}),i(a,"methods",{selectSeat:function(){var e=d(s.a.mark(function e(t){var n,a,r,o,i,c,d=this;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,console.log("selectSeat: ",t),n=t.target.id,a=n.substring(0,n.indexOf("_")),r=this.selectedTable.id,o=this.selectedTable.svg_id,i=l.a.get("".concat(a,"_group")),c=!1,i&&(c=i.hasClass("seat")),!c){e.next=16;break}return e.next=12,this.$store.dispatch("planSeats/updatePlanSeats",{planTableId:r,tableSvgId:o,seatSvgId:a});case 12:this.seatReserved=!0,this.$noty.success("La place a été ajoutée à votre panier!"),this.$store.commit("countdown/SET_COUNTDOWN",!1),setTimeout(function(){d.$store.commit("countdown/SET_COUNTDOWN",!0)},1e3);case 16:e.next=22;break;case 18:e.prev=18,e.t0=e.catch(0),console.log("error from Modal component: ",e.t0),e.t0.response&&409===e.t0.response.status?this.$noty.error("Nous sommes désolés, mais ce siège est déjà réservé."):e.t0.response&&401===e.t0.response.status?(this.$noty.warning("Veuillez vous connecter avant de réserver une place."),this.unauthenticated=!0,this.$router.push({name:"login",query:{redirect:"/reservations/".concat(this.$route.params.id)}})):this.$noty.error("Nous sommes désolés, une erreur est survenue et le siège n'a pas pu être réservé");case 22:case"end":return e.stop()}},e,this,[[0,18]])}));return function(t){return e.apply(this,arguments)}}()}),i(a,"watch",{loadedPlan:function(){console.log("[WATCHER] loadedPlan watcher called from modal!"),l.a.supported&&this.loadedPlan.plan_seats.forEach(function(e){var t=e.svg_id.substring(e.svg_id.lastIndexOf("_")+1),n=l.a.get("".concat(t,"_group"));n&&e.is_reserved&&(n.fill("#FF0000"),n.removeClass("seat"))})}}),a),p=(n(275),n(2)),v=Object(p.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-modal",{attrs:{id:"seat-modal","hide-footer":""},scopedSlots:e._u([e.selectedTable?{key:"modal-title",fn:function(){return[e._v("Réservez vos places:\n        "),n("span",{staticClass:"primary-color"},[e._v("Table "+e._s(e.selectedTable.table_number))])]},proxy:!0}:null],null,!0)},[e._v(" "),e.seatReserved?n("b-row",{staticClass:"justify-content-center"},[n("router-link",{attrs:{to:"/mon-panier"}},[e._v("Voir mon panier →")])],1):e._e(),e._v(" "),e.selectedTable?n("div",{attrs:{id:"drawing"},on:{click:function(t){return e.selectSeat(t)}}},[n("svg-vue",{attrs:{icon:"models/model_"+e.selectedTable.svg_model}})],1):e._e(),e._v(" "),n("div",[n("p",[e._v("\n            En "),n("span",{staticStyle:{color:"red"}},[n("b",[e._v("rouge")])]),e._v(": siège occupé. En "),n("b",[e._v("noir")]),e._v(": siège libre.\n        ")])]),e._v(" "),n("b-button",{staticClass:"mt-3",attrs:{block:""},on:{click:function(t){return e.$bvModal.hide("seat-modal")}}},[e._v("Fermer")])],1)},[],!1,null,"09d869de",null);t.a=v.exports},275:function(e,t,n){"use strict";var a=n(38);n.n(a).a},276:function(e,t,n){(e.exports=n(6)(!1)).push([e.i,".primary-color[data-v-09d869de] {\n  color: #9ACD32;\n}\n[data-v-09d869de] .seat:hover {\n  cursor: pointer;\n  fill: #9ACD32;\n}",""])},333:function(e,t,n){"use strict";var a=n(67);n.n(a).a},334:function(e,t,n){(e.exports=n(6)(!1)).push([e.i,"[data-v-27873e01] .table:hover {\n  cursor: pointer;\n  fill: #9ACD32;\n}\n.primary-border[data-v-27873e01] {\n  border: 2px solid #9ACD32;\n}",""])},38:function(e,t,n){var a=n(276);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(a,r);a.locals&&(e.exports=a.locals)},67:function(e,t,n){var a=n(334);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(a,r);a.locals&&(e.exports=a.locals)},93:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a);n(3);function s(e,t,n,a,r,s,o){try{var l=e[s](o),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(a,r)}function o(e){return function(){var t=this,n=arguments;return new Promise(function(a,r){var o=e.apply(t,n);function l(e){s(o,a,r,l,i,"next",e)}function i(e){s(o,a,r,l,i,"throw",e)}l(void 0)})}}var l={components:{Modal:n(17).a},layout:"frontend",created:function(){var e=o(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),mounted:function(){var e=o(r.a.mark(function e(){var t,n,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=parseInt(this.$route.params.id),console.log("performanceId: ",t),this.$store.getters["performances/performances"][t]){e.next=6;break}return e.next=6,this.$store.dispatch("performances/fetchPerformanceById",{performanceId:t});case 6:return e.next=8,this.$store.dispatch("plans/fetchPlanById",{planId:t});case 8:n=e.sent,a=n.svgPlan,this.svgFile=a,this.listenToBroadcastedEvents(),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),console.log("error: ",e.t0),this.$noty.error("Une erreur est survenue sur cette page. Si l'erreur persiste, veuillez contacter le webmaster.");case 18:case"end":return e.stop()}},e,this,[[0,14]])}));return function(){return e.apply(this,arguments)}}(),data:function(){return{showModal:!1,selectedPlan:{},selectedTable:{},svgFile:null}},computed:{loadedPerformances:function(){return this.$store.getters["performances/performances"]},loadedPerformance:function(){return this.$store.getters["performances/performances"][parseInt(this.$route.params.id)]},loadedPlans:function(){return this.$store.getters["plans/plans"]},loadedPlan:function(){return this.$store.getters["plans/plans"][parseInt(this.$route.params.id)]},planTables:function(){return this.loadedPlan.plan_tables},loadedPlanSeats:function(){return this.$store.getters["planSeats/planSeats"]},loadedTableSeats:function(){return this.loadedPlan?this.loadedPlan.plan_seats.reduce(function(e,t){return e[t.plan_table_id]||(e[t.plan_table_id]=[]),e[t.plan_table_id].push(t),e},{}):{}}},methods:{listenToBroadcastedEvents:function(){var e=this;this.$echo.channel("update-table-seat").listen("UpdateTableSeat",function(t){console.log("{EVENT BROADCAST] update table seat channel: ",t);var n=t.updatedSeat;e.$store.commit("plans/UPDATE_PLAN",n,{root:!0})})},clickOnTablePlan:function(){var e=o(r.a.mark(function e(t){var n,a,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:try{console.log("clickOnTablePlan: ",t),n=t.target.id,a=n.substring(0,n.indexOf("_")),console.log("tableSvgId: ",a),s=SVG.get("".concat(a,"_group")),console.log("element: ",s),s&&s.hasClass("table")?(this.selectedTable=this.loadedPlan.plan_tables.find(function(e){return e.svg_id===a}),this.showModal=!0,this.$bvModal.show("seat-modal")):this.selectedTable=null}catch(e){console.log("error: ",e),this.$noty.error("Une erreur est survenue. Veuillez nous excuser.")}case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),updateTableColor:function(e){console.log("updateTableColor: ",e);var t=e.table_svg_id,n=e.color;SVG.get(t).fill(n)}},watch:{loadedPlan:function(){if(console.log("[WATCHER] loadedPlan watcher called from reservation page!"),SVG.supported){var e=!0,t=!1,n=void 0;try{for(var a,r=this.planTables[Symbol.iterator]();!(e=(a=r.next()).done);e=!0){var s=a.value;console.log("table: ",s);var o=s.svg_id;console.log("tableSvgId: ",o);var l=SVG.select("".concat(o,"_group")).first();console.log("tableElement: ",l)}}catch(e){t=!0,n=e}finally{try{e||null==r.return||r.return()}finally{if(t)throw n}}}},loadedPlan2:function(){if(console.log("[WATCHER] loadedPlan watcher called from reservation page!"),SVG.supported){var e=0;for(var t in this.loadedTableSeats){this.loadedPlan.plan_tables[e].total_seats;var n=this.loadedPlan.plan_tables[e].svg_id,a=!0,r=!1,s=void 0;try{for(var o,l=this.loadedTableSeats[t][Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var i=o.value;console.log("tableSvgId: ",n),console.log("seat: ",i);var c=SVG.get("".concat(n,"_group"));console.log("tableElement: ",c)}}catch(e){r=!0,s=e}finally{try{a||null==l.return||l.return()}finally{if(r)throw s}}e++}}}}},i=(n(333),n(2)),c=Object(i.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-container",[n("b-row",{staticClass:"justify-content-center"},[e._v("\n        loadedPlan: "+e._s(e.loadedPlan)),n("br"),n("br"),e._v(" "),e._v("\n        loadedTableSeats: "+e._s(e.loadedTableSeats)),n("br"),n("br"),e._v("\n        planTables: "+e._s(e.planTables)),n("br"),n("br"),e._v(" "),n("b-col",{attrs:{cols:"12"}},[n("h3",{staticClass:"text-center"},[e._v("Représentation du ")]),e._v(" "),n("br"),e._v(" "),e.loadedPerformance?n("h3",{staticClass:"text-center"},[e._v(e._s(e._f("moment")(e.loadedPerformance.date,"dddd Do MMMM YYYY [à] HH:mm")))]):e._e()]),e._v(" "),e.loadedPerformance&&e.loadedPerformance.plan&&e.svgFile?n("b-col",{staticClass:"my-5",attrs:{cols:"12",md:"6"},on:{click:function(t){return e.clickOnTablePlan(t)}}},[n("div",{ref:"svgFile",staticClass:"primary-border",domProps:{innerHTML:e._s(e.svgFile)}})]):n("b-col",{staticClass:"d-flex justify-content-center my-5",attrs:{cols:"12"}},[n("b-spinner",{staticStyle:{width:"3rem",height:"3rem"},attrs:{variant:"primary",label:"spinning"}})],1)],1)],1)},[],!1,null,"27873e01",null);t.default=c.exports}}]);