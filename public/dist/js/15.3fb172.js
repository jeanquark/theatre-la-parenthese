(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{17:function(e,t,n){"use strict";var s,r=n(0),a=n.n(r),o=(n(3),n(5)),i=n.n(o);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n,s,r,a,o){try{var i=e[a](o),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(s,r)}function d(e){return function(){var t=this,n=arguments;return new Promise(function(s,r){var a=e.apply(t,n);function o(e){c(a,s,r,o,i,"next",e)}function i(e){c(a,s,r,o,i,"throw",e)}o(void 0)})}}var u=(l(s={props:["selectedTable"],created:{}},"created",function(){var e=d(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()),l(s,"mounted",function(){var e=this;console.log("Modal mounted() lifecycle hook called"),this.$root.$on("bv::modal::shown",function(t,n){i.a.supported&&e.loadedPlan&&e.selectedTable&&e.loadedPlan.plan_seats.filter(function(t){return t.plan_table_id===e.selectedTable.id}).forEach(function(e){var t=e.svg_id.substring(e.svg_id.lastIndexOf("_")+1),n=i.a.get("".concat(t,"_group")),s=i.a.get("".concat(t,"_path")),r=i.a.get("".concat(t,"_text"));r&&r.plain(e.seat_number),s&&e.is_reserved&&(s.fill("#FF0000"),n.removeClass("seat"))})})}),l(s,"data",function(){return{selectedSeat:"",seatReserved:!1,reservationConfirmationCountdown:parseInt("30")}}),l(s,"computed",{loadedPlans:function(){return this.$store.getters["plans/plans"]},loadedPlan:function(){return this.$store.getters["plans/plans"][parseInt(this.$route.params.id)]},loadedUser:function(){return this.$store.getters["auth/user"]},loadedPlanSeats:function(){return this.$store.getters["planSeats/planSeats"]},loadedTableSeats:function(){return this.loadedPlan?this.loadedPlan.plan_seats.reduce(function(e,t){return e[t.plan_table_id]||(e[t.plan_table_id]=[]),e[t.plan_table_id].push(t),e},{})[this.selectedTable.id]:{}}}),l(s,"methods",{selectSeat:function(){var e=d(a.a.mark(function e(t){var n,s,r,o,l,c,d=this;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,console.log("selectSeat: ",t),n=t.target.id,s=n.substring(0,n.indexOf("_")),r=this.selectedTable.id,o=this.selectedTable.svg_id,l=i.a.get("".concat(s,"_group")),c=!1,l&&(c=l.hasClass("seat")),!c){e.next=16;break}return e.next=12,this.$store.dispatch("planSeats/updatePlanSeats",{planTableId:r,tableSvgId:o,seatSvgId:s});case 12:this.seatReserved=!0,this.$noty.success("La place a été ajoutée à votre panier!"),this.$store.commit("countdown/SET_COUNTDOWN",!1),setTimeout(function(){d.$store.commit("countdown/SET_COUNTDOWN",!0)},1e3);case 16:e.next=22;break;case 18:e.prev=18,e.t0=e.catch(0),console.log("error from Modal component: ",e.t0),e.t0.response&&409===e.t0.response.status?this.$noty.error("Nous sommes désolés, mais ce siège est déjà réservé."):e.t0.response&&401===e.t0.response.status?(this.$noty.warning("Veuillez vous connecter avant de réserver une place."),this.unauthenticated=!0,this.$router.push({name:"login",query:{redirect:"/reservations/".concat(this.$route.params.id)}})):this.$noty.error("Nous sommes désolés, une erreur est survenue et le siège n'a pas pu être réservé");case 22:case"end":return e.stop()}},e,this,[[0,18]])}));return function(t){return e.apply(this,arguments)}}()}),l(s,"watch",{loadedPlan:function(){console.log("[WATCHER] loadedPlan watcher called from modal!"),i.a.supported&&this.loadedPlan.plan_seats.forEach(function(e){var t=e.svg_id.substring(e.svg_id.lastIndexOf("_")+1),n=i.a.get("".concat(t,"_group"));n&&e.is_reserved&&(n.fill("#FF0000"),n.removeClass("seat"))})}}),s),f=(n(275),n(2)),h=Object(f.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-modal",{attrs:{id:"seat-modal","hide-footer":""},scopedSlots:e._u([e.selectedTable?{key:"modal-title",fn:function(){return[e._v("Réservez vos places:\n        "),n("span",{staticClass:"primary-color"},[e._v("Table "+e._s(e.selectedTable.table_number))])]},proxy:!0}:null],null,!0)},[e._v(" "),e.seatReserved?n("b-row",{staticClass:"justify-content-center"},[n("router-link",{attrs:{to:"/mon-panier"}},[e._v("Voir mon panier →")])],1):e._e(),e._v(" "),e.selectedTable?n("div",{attrs:{id:"drawing"},on:{click:function(t){return e.selectSeat(t)}}},[n("svg-vue",{attrs:{icon:"models/model_"+e.selectedTable.svg_model}})],1):e._e(),e._v(" "),n("div",[n("p",[e._v("\n            En "),n("span",{staticStyle:{color:"red"}},[n("b",[e._v("rouge")])]),e._v(": siège occupé. En "),n("b",[e._v("noir")]),e._v(": siège libre.\n        ")])]),e._v(" "),n("b-button",{staticClass:"mt-3",attrs:{block:""},on:{click:function(t){return e.$bvModal.hide("seat-modal")}}},[e._v("Fermer")])],1)},[],!1,null,"09d869de",null);t.a=h.exports},275:function(e,t,n){"use strict";var s=n(38);n.n(s).a},276:function(e,t,n){(e.exports=n(6)(!1)).push([e.i,".primary-color[data-v-09d869de] {\n  color: #9ACD32;\n}\n[data-v-09d869de] .seat:hover {\n  cursor: pointer;\n  fill: #9ACD32;\n}",""])},278:function(e,t,n){"use strict";var s=n(40);n.n(s).a},279:function(e,t,n){(e.exports=n(6)(!1)).push([e.i,"\n[data-v-4eb98bf4] .table {\n  fill: yellow;\n}\n[data-v-4eb98bf4] .table:hover {\n  cursor: pointer;\n  fill: green;\n}\n",""])},280:function(e,t,n){"use strict";var s=n(41);n.n(s).a},281:function(e,t,n){(e.exports=n(6)(!1)).push([e.i,".box[data-v-4eb98bf4] {\n  display: inline-block;\n  border: 2px solid #9ACD32;\n  margin: 1rem;\n  padding: 0.6rem 1rem;\n  border-radius: 2rem;\n  background-color: #fff;\n  color: #9ACD32;\n}\n.box[data-v-4eb98bf4]:hover {\n  background-color: #9ACD32;\n  color: #fff;\n  cursor: pointer;\n}\n.badge[data-v-4eb98bf4] {\n  color: #fff;\n  margin: 0 0.5rem;\n  padding: 0.5rem;\n}",""])},38:function(e,t,n){var s=n(276);"string"==typeof s&&(s=[[e.i,s,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(s,r);s.locals&&(e.exports=s.locals)},40:function(e,t,n){var s=n(279);"string"==typeof s&&(s=[[e.i,s,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(s,r);s.locals&&(e.exports=s.locals)},41:function(e,t,n){var s=n(281);"string"==typeof s&&(s=[[e.i,s,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(s,r);s.locals&&(e.exports=s.locals)},90:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n.n(s),a=n(1),o=n.n(a),i=(n(3),n(5)),l=n.n(i),c=n(17);function d(e,t,n,s,r,a,o){try{var i=e[a](o),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(s,r)}var u={created:function(){var e,t=(e=r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.userSeats.length<1&&this.loadedUser)){e.next=3;break}return e.next=3,this.$store.dispatch("planSeats/fetchUserSeats",{userId:this.loadedUser.id});case 3:case"end":return e.stop()}},e,this)}),function(){var t=this,n=arguments;return new Promise(function(s,r){var a=e.apply(t,n);function o(e){d(a,s,r,o,i,"next",e)}function i(e){d(a,s,r,o,i,"throw",e)}o(void 0)})});return function(){return t.apply(this,arguments)}}(),computed:{loadedUser:function(){return this.$store.getters["auth/user"]},userSeats:function(){return this.$store.getters["planSeats/userSeats"]}},methods:{clickOnTablePlan:function(e){console.log("clickOnTablePlan: ",e);var t=e.target.id;console.log("elementId: ",t),t?(this.selectedTable=t,this.showModal=!0):this.selectedTable=null}}},f=n(2),h=Object(f.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",{staticClass:"text-center my-3"},[e._v("Mes réservations")]),e._v(" "),e._m(0),e._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{type:"button"}},[e._v("Primary")]),e._v(" "),n("button",{staticClass:"btn btn-secondary",attrs:{type:"button"}},[e._v("Secondary")]),e._v(" "),n("button",{staticClass:"btn btn-light",attrs:{type:"button"}},[e._v("Light")]),e._v(" "),n("br"),n("br"),e._v("\n    userSeats: "+e._s(e.userSeats)),n("br"),e._v(" "),n("table",{staticClass:"table table-striped"},[e._m(1),e._v(" "),n("tbody",e._l(e.userSeats,function(t,s){return n("tr",{key:t.id},[n("th",{attrs:{scope:"row"}},[e._v(e._s(s+1))]),e._v(" "),n("td",[e._v(e._s(t.table_id))]),e._v(" "),n("td",[e._v(e._s(t.user_id))]),e._v(" "),n("td",[e._v(e._s(t.status))])])}),0)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"dropdown"},[t("button",{staticClass:"btn btn-dark dropdown-toggle",attrs:{type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[this._v("\n            Dropdown button\n        ")]),this._v(" "),t("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[t("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[this._v("Action")]),this._v(" "),t("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[this._v("Another action")]),this._v(" "),t("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[this._v("Something else here")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",[t("th",{attrs:{scope:"col"}},[this._v("#")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("Table")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("User")]),this._v(" "),t("th",{attrs:{scope:"col"}},[this._v("Status")])])])}],!1,null,"2664a264",null).exports,v=n(8),p=n.n(v),b=n(11),m=n.n(b);n(16);function _(e,t,n,s,r,a,o){try{var i=e[a](o),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(s,r)}function g(e){return function(){var t=this,n=arguments;return new Promise(function(s,r){var a=e.apply(t,n);function o(e){_(a,s,r,o,i,"next",e)}function i(e){_(a,s,r,o,i,"throw",e)}o(void 0)})}}var w={components:{Modal:c.a,UserReservations:h,VueCtkDateTimePicker:m.a},metaInfo:function(){return{title:"Réservation"}},layout:"frontend",created:function(){var e=g(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.$store.getters["shows/shows"].length<1&&this.$store.dispatch("shows/fetchShows");case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),mounted:function(){var e=g(r.a.mark(function e(){var t,n,s,a,o,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return 1,e.next=3,this.$store.dispatch("planTables/fetchPlanTables",{performanceId:1});case 3:for(console.log("this.planTables: ",this.planTables),console.log("this.planTables[0]: ",this.planTables[0]),t=!0,n=!1,s=void 0,e.prev=8,a=this.planTables[Symbol.iterator]();!(t=(o=a.next()).done);t=!0)i=o.value,console.log("table: ",i);e.next=16;break;case 12:e.prev=12,e.t0=e.catch(8),n=!0,s=e.t0;case 16:e.prev=16,e.prev=17,t||null==a.return||a.return();case 19:if(e.prev=19,!n){e.next=22;break}throw s;case 22:return e.finish(19);case 23:return e.finish(16);case 24:l.a.supported;case 25:case"end":return e.stop()}},e,this,[[8,12,16,24],[17,,19,23]])}));return function(){return e.apply(this,arguments)}}(),data:function(){return{showModal:!1,selectedShow:null,selectedPerformance:null,selectedDate:null,selectedTable:null,form:new p.a({performance:""})}},computed:{loading:function(){return this.$store.getters["index/loading"]},loadedShows:function(){return this.$store.getters["shows/shows"]},loadedPerformancesByShow:function(){var e=this;return this.$store.getters["performances/performances"].filter(function(t){return t.show_id===e.selectedShow.id})},loadedPerformancesByShowByDay:function(){var e=this;return this.loadedPerformancesByShow.filter(function(t){return o()(t.date).format("YYYY-MM-DD")===e.selectedDate})},loadedPerformancesDates:function(){return this.loadedPerformancesByShow.map(function(e){return o()(e.date).format("YYYY-MM-DD")})},planTables:function(){return this.$store.getters["planTables/planTables"]},nextPerformances:function(){return this.loadedPerformancesByShow.filter(function(e){return o()(e.date)>=o()()}).splice(0,2)}},methods:{listenToBroadcastedEvents:function(){this.$echo.channel("update-table-seat").listen("NewMessage",function(e){console.log("update table seat channel: ",e)})},selectShow:function(){var e=g(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.$store.commit("index/setLoading",!0),this.selectedShow=t,e.next=4,this.$store.dispatch("performances/fetchPerformancesByShow",{showId:this.selectedShow.id});case 4:this.$store.commit("index/setLoading",!1);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),selectDate:function(e){this.selectedDate=e},selectPerformance:function(e){this.selectedPerformance=e},clickOnTablePlan:function(){var e=g(r.a.mark(function e(t){var n,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,console.log("clickOnTablePlan: ",t),n=t.target.id,console.log("tableSvgId: ",n),!n){e.next=13;break}return e.next=7,this.$store.dispatch("planTables/fetchSeatsByTable",{tableSvgId:n});case 7:s=e.sent,console.log("data: ",s),this.selectedTable=s,this.showModal=!0,e.next=14;break;case 13:this.selectedTable=null;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),this.$noty.error("Une erreur est survenue. Veuillez nous excuser.");case 19:case"end":return e.stop()}},e,this,[[0,16]])}));return function(t){return e.apply(this,arguments)}}(),updateTableColor:function(e){console.log("updateTableColor: ",e);var t=e.table_svg_id,n=e.color;l.a.get(t).fill(n)}}},y=(n(278),n(280),Object(f.a)(w,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[e._v("\n\t\tloading: "+e._s(e.loading)),n("br"),n("br"),e._v("\n        selectedShow: "+e._s(e.selectedShow)),n("br"),n("br"),e._v("\n        selectedPerformance: "+e._s(e.selectedPerformance)),n("br"),n("br"),e._v("\n        selectedTable: "+e._s(e.selectedTable)),n("br"),n("br"),e._v(" "),n("h2",{staticClass:"text-center"},[e._v("Réservez vos places en ligne dès maintenant!")]),e._v(" "),n("div",{staticClass:"row justify-content-center my-5"},[e._m(0),e._v(" "),e._l(e.loadedShows,function(t){return n("div",{key:t.id},[n("span",{staticClass:"box",on:{click:function(n){return e.selectShow(t)}}},[e._v("\n\t\t\t\t\t"+e._s(t.name)+"\n\t\t\t\t")])])})],2),e._v(" "),"abc"!=e.selectedShow?n("div",{staticClass:"row justify-content-center align-items-center my-5"},[n("div",{staticClass:"col-12 my-5"},[n("h4",{staticClass:"text-center"},[e._v("Choisissez une représentation:")]),e._v(" "),n("p",[e._v("Les prochaines dates:\n\t\t\t\t\t"),e._v(" "),e.loading?n("font-awesome-icon",{attrs:{icon:"spinner",size:"lg",spin:""}}):e._l(e.nextPerformances,function(t){return n("span",{key:t.id,staticClass:"badge badge-pill badge-primary"},[e._v("\n\t\t\t\t\t\t"+e._s(e._f("moment")(t.date,"dddd, Do MMMM YYYY"))+"\n\t\t\t\t\t")])})],2)]),e._v(" "),n("div",{staticClass:"col-6 text-center"},[n("VueCtkDateTimePicker",{attrs:{label:"Choisir une date",inline:"","only-date":"",format:"YYYY-MM-DD",formatted:"YYYY-MM-DD",color:"#9ACD32","button-color":"#9ACD32","button-now-translation":"Aujourd'hui","enabled-dates":e.loadedPerformancesDates},on:{input:e.selectDate},model:{value:e.form.performance,callback:function(t){e.$set(e.form,"performance",t)},expression:"form.performance"}})],1),e._v(" "),n("div",{staticClass:"col-6 text-center"},["abc"!=e.selectedDate?n("div",[n("h4",[e._v("Représentations du jour:")]),e._v(" "),e._l(e.loadedPerformancesByShowByDay,function(t){return n("div",{key:t.id},[n("router-link",{staticClass:"box",attrs:{to:"/performances/"+t.id},on:{click:function(n){return e.selectPerformance(t)}}},[n("small",[e._v(e._s(e._f("moment")(t.date,"dddd, Do MMMM YYYY ")))]),e._v(" "),n("b",[e._v(e._s(e._f("moment")(t.date,"HH:mm")))])])],1)})],2):e._e()])]):e._e(),e._v(" "),"abc"!=e.selectedPerformance?n("div",{staticClass:"row justify-content-center my-5"},[n("div",{staticClass:"col-6",staticStyle:{border:"1px solid orange"},on:{click:function(t){return e.clickOnTablePlan(t)}}},[n("svg-vue",{attrs:{icon:"tables_plan"}})],1)]):e._e(),e._v(" "),e.showModal?n("modal",{attrs:{selectedTable:e.selectedTable},on:{updateTableColor:e.updateTableColor,closeModal:function(t){e.showModal=!1}}}):e._e()],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col-12 my-5"},[t("h4",{staticClass:"text-center"},[this._v("Choisissez un spectacle:")])])}],!1,null,"4eb98bf4",null));t.default=y.exports}}]);