(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{330:function(n,e,t){"use strict";var r=t(65);t.n(r).a},331:function(n,e,t){(n.exports=t(6)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/* >>>.table th {\r\n\t\tvertical-align: middle;\r\n\t}\r\n\t>>>.table td {\r\n\t\tvertical-align: middle;\r\n\t} */\r\n/* .nowrap {\r\n        white-space:nowrap;\r\n    } */\n.disabled[data-v-482e4788]:hover {\r\n    cursor: not-allowed;\n}\r\n",""])},65:function(n,e,t){var r=t(331);"string"==typeof r&&(r=[[n.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};t(7)(r,a);r.locals&&(n.exports=r.locals)},95:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r);function s(n){return function(n){if(Array.isArray(n)){for(var e=0,t=new Array(n.length);e<n.length;e++)t[e]=n[e];return t}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(n,e,t,r,a,s,o){try{var i=n[s](o),c=i.value}catch(n){return void t(n)}i.done?e(c):Promise.resolve(c).then(r,a)}function i(n){return function(){var e=this,t=arguments;return new Promise(function(r,a){var s=n.apply(e,t);function i(n){o(s,r,a,i,c,"next",n)}function c(n){o(s,r,a,i,c,"throw",n)}i(void 0)})}}var c={layout:"frontend",created:function(){var n=i(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}(),mounted:function(){var n=i(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(!this.authUser){n.next=4;break}if(!(this.$store.getters["planSeats/userSeats"].length<1)){n.next=4;break}return n.next=4,this.$store.dispatch("planSeats/fetchUserSeats",{userId:this.authUser.id});case 4:case"end":return n.stop()}},n,this)}));return function(){return n.apply(this,arguments)}}(),data:function(){return{iban:"1234 5678 9012 3456",postal_account:"01-23456-78",fields:[{key:"seat_number",label:"N° de place",sortable:!0},{key:"table.plan.performance.date",label:"Date",sortable:!0},{key:"status",label:"Statut",sortable:!0},{key:"price",label:"Prix",sortable:!0},{key:"show_details",label:"Détails",sortable:!1},{key:"actions",label:"Actions",sortable:!1}],loading:!1}},computed:{authUser:function(){return this.$store.getters["auth/user"]},userSeats:function(){return this.$store.getters["planSeats/userSeats"]},shoppingCart:function(){return[].concat(s(this.$store.getters["shoppingCart/shoppingCart"]),s(this.userSeats))},totalPrice:function(){return this.shoppingCart.reduce(function(n,e){return n+(e.price||0)},0)/100},preReservations:function(){return this.shoppingCart.filter(function(n){return"pre_reservation"===n.status})}},methods:{formattedStatus:function(n){switch(n){case"pre_reservation":return"Pré-reservation";case"confirmation_pending":return"En attente de réception du paiement";case"reservation_confirmed":return"Réservation confirmée";case"reservation_rejected":return"Réservation rejetée";default:return"Status non spécifié"}},deletePlanSeatPreReservation:function(){var n=i(a.a.mark(function n(e){var t;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,this.$bvModal.msgBoxConfirm("Etes-vous sûr de vouloir supprimer la pré-réservation de la place N° ".concat(e.seat_number,"?"),{okTitle:"OK",cancelTitle:"Annuler"});case 3:if(t=n.sent,console.log("value: ",t),!t){n.next=10;break}return console.log("deletePlanSeatReservation: ",e.id),n.next=9,this.$store.dispatch("planSeats/deletePlanSeatPreReservation",{planSeatId:e.id});case 9:this.$noty.success("La réservation a été annulée avec succès.");case 10:n.next=16;break;case 12:n.prev=12,n.t0=n.catch(0),console.log("error: ",n.t0),this.$noty.error("Nous sommes désolés. Une erreur est survenue et l'opération n'a pas pu être complétée.");case 16:case"end":return n.stop()}},n,this,[[0,12]])}));return function(e){return n.apply(this,arguments)}}(),deletePlanSeatConfirmedReservation:function(){var n=i(a.a.mark(function n(e){var t;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,this.$bvModal.msgBoxConfirm("Etes-vous sûr de vouloir supprimer la réservation de la place N° ".concat(e.seat_number,"?"),{okTitle:"OK",cancelTitle:"Annuler"});case 3:if(t=n.sent,console.log("value: ",t),!t){n.next=10;break}return console.log("deleteReservation: ",e.id),n.next=9,this.$store.dispatch("planSeats/deletePlanSeatConfirmedReservation",{planSeatId:e.id});case 9:this.$noty.success("La réservation a été annulée avec succès.");case 10:n.next=16;break;case 12:n.prev=12,n.t0=n.catch(0),console.log("error: ",n.t0),this.$noty.error("Nous sommes désolés. Une erreur est survenue et l'opération n'a pas pu être complétée.");case 16:case"end":return n.stop()}},n,this,[[0,12]])}));return function(e){return n.apply(this,arguments)}}(),confirmPlanSeatReservation:function(){var n=i(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,this.loading=!0,n.next=4,this.$store.dispatch("planSeats/confirmPlanSeatReservation",{shoppingCart:this.shoppingCart});case 4:this.loading=!1,this.$noty.success("Votre pré-réservation a été confirmée. Vous allez recevoir un e-mail de confirmation."),n.next=13;break;case 8:n.prev=8,n.t0=n.catch(0),console.log("error: ",n.t0),this.loading=!1,this.$noty.error("Nous sommes désolés. Une erreur est survenue et l'opération n'a pas pu être complétée.");case 13:case"end":return n.stop()}},n,this,[[0,8]])}));return function(){return n.apply(this,arguments)}}()}},l=(t(330),t(2)),u=Object(l.a)(c,function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("b-container",[t("h1",{staticClass:"text-center mb-4"},[n._v("Mon panier")]),n._v(" "),n.preReservations.length>0&&n.authUser?t("b-alert",{attrs:{show:"",variant:"info"}},[n._v("\n            Vous avez "+n._s(n.preReservations.length)+" billets en pré-réservation. Veuillez confirmer votre réservation en appuyant sur le bouton correspondant.\n        ")]):n._e(),n._v(" "),n.preReservations.length>0&&!n.authUser?t("b-alert",{attrs:{show:"",variant:"info"}},[n._v(n._s(n.preReservations.length)+" billets en pré-réservation. Veuillez d'abord vous connecter/enregistrer, puis confirmer votre réservation.\n            "),t("router-link",{attrs:{to:"/login"}},[n._v("Login →")])],1):n._e(),n._v(" "),n.shoppingCart.length>0?t("b-table",{attrs:{items:n.shoppingCart,fields:n.fields,striped:"",responsive:"sm"},scopedSlots:n._u([{key:"cell(seat_number)",fn:function(e){return[t("b",{staticClass:"text-info"},[n._v(n._s(e.item.seat_number))])]}},{key:"cell(table.plan.performance.date)",fn:function(e){return[e.item.table.plan?t("span",[n._v("\n                    "+n._s(n._f("moment")(e.item.table.plan.performance.date,"dddd Do MMM YYYY HH:mm"))+"\n                ")]):n._e()]}},{key:"cell(status)",fn:function(e){return[n._v("\n                "+n._s(n.formattedStatus(e.item.status))+"\n            ")]}},{key:"cell(price)",fn:function(e){return[e.item.price?t("span",[n._v("\n                    "+n._s(parseInt(e.item.price)/100)+" CHF\n                ")]):t("span",[t("i",[n._v("Non spécifié")])])]}},{key:"cell(actions)",fn:function(e){return["pre_reservation"===e.item.status?t("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(t){return n.deletePlanSeatPreReservation(e.item)}}},[n._v("Annuler ma pré-réservation")]):n._e(),n._v(" "),"confirmation_pending"===e.item.status?t("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(t){return n.deletePlanSeatConfirmedReservation(e.item)}}},[n._v("Supprimer ma réservation")]):n._e()]}},{key:"cell(show_details)",fn:function(e){return[t("b-button",{staticClass:"mr-2",attrs:{size:"sm"},on:{click:e.toggleDetails}},[n._v(" "+n._s(e.detailsShowing?"Cacher":"Montrer")+" détails ")])]}},{key:"row-details",fn:function(e){return[t("b-card",[t("b-row",{staticClass:"mb-2"},[t("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[t("b",[n._v("Spectacle:")])]),n._v(" "),t("b-col",[n._v(n._s(e.item.table.plan.performance.name))])],1),n._v(" "),t("b-row",{staticClass:"mb-2"},[t("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[t("b",[n._v("Lieu:")])]),n._v(" "),t("b-col",[n._v(n._s(e.item.table.plan.performance.location))])],1),n._v(" "),t("b-row",{staticClass:"mb-2"},[t("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[t("b",[n._v("Dernière modification:")])]),n._v(" "),t("b-col",[n._v(n._s(n._f("moment")(e.item.updated_at,"from","now")))])],1),n._v(" "),t("b-row",{staticClass:"justify-content-center mb-2"},[t("b-button",{attrs:{size:"sm"},on:{click:e.toggleDetails}},[n._v("Cacher détails")])],1)],1)]}}],null,!1,934943636)},[n._v(" "),n._v(" "),n._v(" "),n._v(" "),n._v(" "),n._v(" "),t("template",{slot:"bottom-row"},[t("td",{attrs:{colspan:"3"}},[t("b",[n._v("Total restant à payer")])]),n._v(" "),t("td",[t("b",[n._v(n._s(n.totalPrice)+" CHF")])]),n._v(" "),t("td",{attrs:{colspan:"2"}})])],2):t("b-alert",{attrs:{show:"",variant:"info"}},[n._v("Aucune réservation effectuée pour le moment.")]),n._v(" "),t("div",[t("b-row",{staticClass:"justify-content-center my-4"},[t("b-button",{attrs:{variant:"primary",disabled:!n.authUser||n.preReservations.length<1||n.loading},on:{click:n.confirmPlanSeatReservation}},[n._v("Confirmer "+n._s(n.preReservations.length>1?"mes pré-réservations":"ma pré-réservation")+" "),t("font-awesome-icon",{attrs:{icon:"check-circle",size:"1x"}})],1)],1),n._v(" "),t("br"),t("br"),n._v(" "),n.authUser?t("b-row",{staticClass:"justify-content-center my-2"},[t("b-card",{staticClass:"mb-2",staticStyle:{"max-width":"20rem"},attrs:{title:"Nos coordonnées bancaires:",tag:"article"}},[t("b-card-text",[t("p",[n._v("\n                            Théatre la parenthèse"),t("br"),n._v("\n                            Compte postal: "+n._s(n.postal_account)+" "),t("br"),n._v("\n                            IBAN: "+n._s(n.iban)+"\n                        ")])])],1)],1):n._e()],1)],1)},[],!1,null,"482e4788",null);e.default=u.exports}}]);