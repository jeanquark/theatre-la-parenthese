(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{118:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(8),l=a.n(r),i=(a(3),a(5)),o=a.n(i);a(257);function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},s=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),s.forEach(function(t){d(e,t,a[t])})}return e}function d(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function b(e,t,a,s,n,r,l){try{var i=e[r](l),o=i.value}catch(e){return void a(e)}i.done?t(o):Promise.resolve(o).then(s,n)}function u(e){return function(){var t=this,a=arguments;return new Promise(function(s,n){var r=e.apply(t,a);function l(e){b(r,s,n,l,i,"next",e)}function i(e){b(r,s,n,l,i,"throw",e)}l(void 0)})}}var p={components:{TableDetailsModal:a(71).a},created:function(){var e=u(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),mounted:function(){var e=u(n.a.mark(function e(){var t,a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=parseInt(this.$route.params.id),this.planId=t,console.log("planId: ",t),a="plan_".concat(t,".svg"),console.log("planSVG: ",a),!(this.$store.getters["tables/tables"].length<1)){e.next=9;break}return e.next=9,this.$store.dispatch("tables/fetchTables");case 9:return e.next=11,this.$store.dispatch("plans/fetchPlanById",{planId:t});case 11:this.svgFile=this.plan.svg_plan,10,o.a.select(".table").each(function(e){console.log("i: ",e);var t=this.select("circle").first().attr("r");this.draggable({minX:-(o()("tables_plan").viewbox().width/2-t),maxX:o()("tables_plan").viewbox().width/2+t,minY:-(o()("tables_plan").viewbox().height/2-t),maxY:o()("tables_plan").viewbox().height/2+t})}),this.loadingSvg=!1,e.next=22;break;case 17:e.prev=17,e.t0=e.catch(0),console.log("error: ",e.t0),this.loadingSvg=!1,this.$noty.error("Le plan de table n'a pas pu être récupéré.");case 22:case"end":return e.stop()}},e,this,[[0,17]])}));return function(){return e.apply(this,arguments)}}(),data:function(){return{form:new l.a({}),loadingSvg:!0,planId:"",selectedTable:null,newTable:{},newTablesSVGArray:[],tablesArray:[],newTablesArray:[],deletedTablesArray:[],svgFile:null}},computed:{loading:function(){return this.$store.getters["loading/loading"]},plan:function(){return this.$store.getters["plans/plans"][parseInt(this.$route.params.id)]},tables:function(){return this.$store.getters["tables/tables"]},planTables:function(){return this.$store.getters["planTables/planTables"]}},methods:{capitalize:function(e){return"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1)},formattedTableNumber:function(e){return("0"+e).slice(-2)},clickOnTablesPlan:function(){var e=u(n.a.mark(function e(t){var a,s,r,l,i,c,d,b,u,p=this;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:try{if(a=t.target.id,s=a.substring(0,a.indexOf("_")),this.selectedTable&&this.selectedTable.svg_id&&o.a.get("".concat(this.selectedTable.svg_id,"_table")).attr("stroke",null),s&&"tables_plan"!=a){if(r=o.a.get("".concat(s,"_group")),l=r.select("circle").first().attr("r"),r.draggable({minX:-(o()("tables_plan").viewbox().width/2-l),maxX:o()("tables_plan").viewbox().width/2+l,minY:-(o()("tables_plan").viewbox().height/2-l),maxY:o()("tables_plan").viewbox().height/2+l}),i=this.newTablesArray.find(function(e){return e.svg_id===s}))for(this.selectedTable=i,c=o.a.select("#model_".concat(this.selectedTable.svg_model)).first(),d=1;d<=parseInt(this.selectedTable.total_seats);d++)b=("0"+d).slice(-2),c.select("#seat".concat(b,"_group")).first().fill("#000000"),c.select("#seat".concat(b,"_group")).first().removeClass("seat"),c.select("#seat".concat(b,"_text")).first().plain("");else this.selectedTable=this.plan.plan_tables.find(function(e){return e.svg_id===s}),this.selectedTable.seats=this.plan.plan_seats.filter(function(e){return e.plan_table_id===p.selectedTable.id}),u=o.a.select("#model_".concat(this.selectedTable.svg_model)).first(),o.a.supported&&u&&this.selectedTable.seats&&this.selectedTable.seats.forEach(function(e){var t=e.svg_id.match(/seat\d*/gm)[0];u.select("#".concat(t,"_text")).first().plain(e.seat_number);var a=u.select("#".concat(t,"_group")).first();e.is_reserved?(a.fill("#FF0000"),a.removeClass("seat")):a.fill("#000000")});this.selectedTable&&o.a.get("".concat(s,"_table")).attr("stroke","#FF0000").attr("stroke-width",1)}else this.selectedTable=null}catch(e){console.log("error: ",e),this.$noty.error("La table n'a pas pu être trouvée dans la base de données.")}case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),addTableModal:function(){var e=u(n.a.mark(function e(t){var a,s,r,l,i,d=this;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(console.log("addTableModal: ",t),this.newTable=c({},t,{seats:[]}),a=0;a<t.total_seats;a++)this.newTable.seats.push({seat_number:this.formattedTableNumber(a+1),price:3e3});s="01",r=o()("tables_plan").svg(),l=r.match(/data-table-number="\d+"/g),i=[],l&&(l.forEach(function(e){return i.push(parseInt(e.match(/\d+/g)[0]))}),console.log("array: ",i),s=i.reduce(function(e,t){return e>t?d.formattedTableNumber(parseInt(e)+1):d.formattedTableNumber(parseInt(t)+1)},s)),this.newTable.table_number=s,this.$bvModal.show("table-details");case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),addTable:function(){var e=u(n.a.mark(function e(){var t,a,s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=Math.random().toString(36).substr(2,9),this.newTable.svg_id=t,this.newTable.plan_id=parseInt(this.$route.params.id),this.newTablesArray.push(this.newTable),a=this.newTable.r/2,"circle"===this.newTable.svg_type&&((s=o()("tables_plan").group().attr({id:"".concat(t,"_group")}).draggable({minX:-(o()("tables_plan").viewbox().width/2-a),maxX:o()("tables_plan").viewbox().width/2+a,minY:-(o()("tables_plan").viewbox().height/2-a),maxY:o()("tables_plan").viewbox().height/2+a}).addClass("table")).circle(this.newTable.r).attr({cx:o()("tables_plan").viewbox().width/2,cy:o()("tables_plan").viewbox().height/2,id:"".concat(t,"_table"),"data-svg-model":this.newTable.svg_model,"data-total-seats":this.newTable.total_seats,"data-table-number":this.newTable.table_number}),s.text("").attr({id:"".concat(t,"_text")}).tspan(this.newTable.table_number).attr({id:"".concat(t,"_span")}).font({family:"Helvetica",size:10,dx:o()("tables_plan").viewbox().width/2-6,dy:o()("tables_plan").viewbox().height/2+3,fill:"#9ACD32"}),this.newTablesSVGArray.push({id:t,tableSVGId:t,svg:o.a.get("".concat(t,"_table")).svg()})),"path"==this.newTable.svg_type&&o()("tables_plan").path(this.newTable.d).attr({id:t,"data-svg-model":this.newTable.svg_model,"data-total-seats":this.newTable.total_seats}).draggable().addClass("table");case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updatePlan:function(){var e=u(n.a.mark(function e(){var t,a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("updatePlan"),this.$store.commit("loading/SET_LOADING",!0,{root:!0}),this.selectedTable&&this.selectedTable.svg_id&&o.a.get("".concat(this.selectedTable.svg_id,"_table")).attr("stroke",null),t=this.plan.svg_id,a=o()("tables_plan").svg().replace('xmlns:svgjs="http://svgjs.com/svgjs"',""),this.form.plan_seats=this.plan.plan_seats,this.form.planSvgId=t,this.form.newPlanSVG=a,this.form.newTablesArray=this.newTablesArray,this.form.deletedTablesArray=this.deletedTablesArray,console.log("form: ",this.form),e.next=14,this.$store.dispatch("plans/updatePlan",this.form);case 14:this.$store.commit("loading/SET_LOADING",!1,{root:!0}),this.$noty.success("Le plan de salle a été mis à jour avec succès!"),setTimeout(function(){window.location.href="../../plans"},1e3),e.next=25;break;case 19:e.prev=19,e.t0=e.catch(0),console.log("error: ",e.t0),this.$store.commit("loading/SET_LOADING",!1,{root:!0}),console.log("error: ",e.t0),this.$noty.error("Une erreur est apparue et le plan de salle n'a pas pu être mis à jour. Vous aller être redirigé vers la page des plans.");case 25:case"end":return e.stop()}},e,this,[[0,19]])}));return function(){return e.apply(this,arguments)}}(),deleteTable:function(){var e=u(n.a.mark(function e(){var t=this;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!this.selectedTable.seats){e.next=6;break}if(!(this.selectedTable.seats.filter(function(e){return 1==e.is_reserved}).length>0)){e.next=6;break}return this.$noty.error("Un ou plusieurs sièges de cette table sont réservés. Veuillez supprimer les réservations avant de pouvoir supprimer cette table."),e.abrupt("return");case 6:this.newTablesArray=this.newTablesArray.filter(function(e){return e.svg_id!==t.selectedTable.svg_id}),this.deletedTablesArray.push(this.selectedTable),o.a.get("".concat(this.selectedTable.svg_id,"_group")).remove(),this.selectedTable=null,this.$noty.success("La table a été supprimée avec succès!"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),e.t0.response&&e.t0.response.status&&409===e.t0.response.satus?this.$noty.error("La table n'a pas pu être supprimée car au moins l'un de ses sièges est réservé."):this.$noty.error("Nous sommes désolés. Une erreur est survenue et la table n'a pas pu être supprimée.");case 16:case"end":return e.stop()}},e,this,[[0,13]])}));return function(){return e.apply(this,arguments)}}()}},h=(a(317),a(2)),m=Object(h.a)(p,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-container",[a("b-breadcrumb",[a("b-breadcrumb-item",{staticClass:"navigation",attrs:{to:"/admin/plans"}},[a("font-awesome-icon",{attrs:{icon:"chair"}}),e._v(" "),a("span",[e._v("Plans de salle")])],1),e._v(" "),a("b-breadcrumb-item",{attrs:{active:""}},[e._v("Editer")])],1),e._v(" "),a("h2",{staticClass:"text-center"},[e._v("\n        Editer plan de salle "),e.plan?a("span",[e._v(e._s(e.plan.id))]):e._e()]),e._v(" "),e.plan&&e.plan.performance&&e.plan.performance.date?a("h4",{staticClass:"text-center"},[e._v(e._s(e._f("moment")(e.plan.performance.date,"dddd Do MMM YYYY HH:mm")))]):e._e(),e._v(" "),e.loadingSvg?a("b-row",{staticClass:"justify-content-center mt-5"},[a("b-spinner",{attrs:{variant:"primary",label:"Spinning"}})],1):e._e(),e._v(" "),!e.loadingSvg&&e.svgFile?a("b-row",{staticClass:"justify-content-center my-3"},e._l(e.tables,function(t){return a("b-col",{key:t.id,attrs:{cols:"12",sm:"4",md:"2"}},[a("b-card",{staticClass:"available-table",attrs:{"img-src":"/images/svg/models/model_"+t.svg_id+".svg","img-alt":"Image","img-top":""},on:{click:function(a){return e.addTableModal(t)}}},[a("b-card-text",{staticClass:"text-center"},[e._v(e._s(t.name))])],1)],1)}),1):e._e(),e._v(" "),!e.loadingSvg&&e.svgFile?a("b-row",{staticClass:"justify-content-center my-3"},[e.plan&&e.plan.svg_id?a("b-col",{attrs:{cols:"12",md:"8"},on:{click:function(t){return e.clickOnTablesPlan(t)}}},[a("div",{ref:"svgFile",staticClass:"primary-border",domProps:{innerHTML:e._s(e.svgFile)}})]):e._e(),e._v(" "),a("b-col",{staticClass:"my-4",attrs:{cols:"8",md:"8"}},[e.selectedTable?a("div",[a("h4",{staticClass:"text-center"},[e._v("Table sélectionnée: "+e._s(e.selectedTable.table_number))])]):e._e(),e._v(" "),a("b-row",{staticClass:"justify-content-center"},[a("b-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("svg-vue",{directives:[{name:"show",rawName:"v-show",value:e.selectedTable&&"table_round_4_seats"===e.selectedTable.svg_model,expression:"selectedTable && selectedTable.svg_model === 'table_round_4_seats'"}],attrs:{id:"model_table_round_4_seats",icon:"models/model_table_round_4_seats"}}),e._v(" "),a("svg-vue",{directives:[{name:"show",rawName:"v-show",value:e.selectedTable&&"table_round_6_seats"===e.selectedTable.svg_model,expression:"selectedTable && selectedTable.svg_model === 'table_round_6_seats'"}],attrs:{id:"model_table_round_6_seats",icon:"models/model_table_round_6_seats"}}),e._v(" "),a("svg-vue",{directives:[{name:"show",rawName:"v-show",value:e.selectedTable&&"table_round_8_seats"===e.selectedTable.svg_model,expression:"selectedTable && selectedTable.svg_model === 'table_round_8_seats'"}],attrs:{id:"model_table_round_8_seats",icon:"models/model_table_round_8_seats"}})],1),e._v(" "),e.selectedTable?a("b-col",{attrs:{cols:"12",sm:"6",md:"6","align-self":"center"}},[e._v("\n                    En "),a("b",[e._v("noir")]),e._v(": siège libre, en "),a("span",{staticStyle:{color:"#ff0000"}},[a("b",[e._v("rouge")])]),e._v(": siège réservé."),a("br"),e._v(" "),a("ul",e._l(e.selectedTable.seats,function(t,s){return a("li",{key:s},[e._v("Place n°"+e._s(t.seat_number)+", prix: "+e._s(t.price))])}),0),e._v(" "),e._l(e.selectedTable.seats,function(t,s){return a("b-row",{key:s,attrs:{"no-gutters":""}},[a("b-col",{staticClass:"px-2",attrs:{cols:"6"}},[a("b-form-group",{attrs:{label:"N° siège"}},[a("b-form-input",{model:{value:t.seat_number,callback:function(a){e.$set(t,"seat_number",a)},expression:"seat['seat_number']"}})],1)],1),e._v(" "),a("b-col",{staticClass:"px-2",attrs:{cols:"6"}},[a("b-form-group",{attrs:{label:"Prix du siège"}},[a("b-form-input",{attrs:{type:"number"},model:{value:t.price,callback:function(a){e.$set(t,"price",a)},expression:"seat['price']"}})],1)],1)],1)})],2):e._e()],1)],1)],1):e._e(),e._v(" "),e.svgFile?a("b-row",{staticClass:"justify-content-center my-2"},[a("b-button",{attrs:{size:"sm",variant:"danger",disabled:!e.selectedTable},on:{click:e.deleteTable}},[e._v("Supprimer la table sélectionnée")])],1):e._e(),e._v(" "),e.svgFile?a("b-row",{staticClass:"justify-content-center my-2"},[a("b-button",{attrs:{variant:"primary",disabled:e.loading},on:{click:e.updatePlan}},[e.loading?a("b-spinner",{attrs:{small:"",type:"grow"}}):e._e(),e._v("\n            Editer le plan ")],1),a("br")],1):e._e(),e._v(" "),a("table-details-modal",{attrs:{newTable:e.newTable},on:{addTable:e.addTable}})],1)},[],!1,null,"f05f44a6",null);t.default=m.exports},257:function(e,t){(function(){function e(e){e.remember("_draggable",this),this.el=e}e.prototype.init=function(e,t){var a=this;this.constraint=e,this.value=t,this.el.on("mousedown.drag",function(e){a.start(e)}),this.el.on("touchstart.drag",function(e){a.start(e)})},e.prototype.transformPoint=function(e,t){var a=(e=e||window.event).changedTouches&&e.changedTouches[0]||e;return this.p.x=a.clientX-(t||0),this.p.y=a.clientY,this.p.matrixTransform(this.m)},e.prototype.getBBox=function(){var e=this.el.bbox();return this.el instanceof SVG.Nested&&(e=this.el.rbox()),(this.el instanceof SVG.G||this.el instanceof SVG.Use||this.el instanceof SVG.Nested)&&(e.x=this.el.x(),e.y=this.el.y()),e},e.prototype.start=function(e){if("click"!=e.type&&"mousedown"!=e.type&&"mousemove"!=e.type||1==(e.which||e.buttons)){var t=this;if(this.el.fire("beforedrag",{event:e,handler:this}),!this.el.event().defaultPrevented){e.preventDefault(),e.stopPropagation(),this.parent=this.parent||this.el.parent(SVG.Nested)||this.el.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=this.el.node.getScreenCTM().inverse();var a,s=this.getBBox();if(this.el instanceof SVG.Text)switch(a=this.el.node.getComputedTextLength(),this.el.attr("text-anchor")){case"middle":a/=2;break;case"start":a=0}this.startPoints={point:this.transformPoint(e,a),box:s,transform:this.el.transform()},SVG.on(window,"mousemove.drag",function(e){t.drag(e)}),SVG.on(window,"touchmove.drag",function(e){t.drag(e)}),SVG.on(window,"mouseup.drag",function(e){t.end(e)}),SVG.on(window,"touchend.drag",function(e){t.end(e)}),this.el.fire("dragstart",{event:e,p:this.startPoints.point,m:this.m,handler:this})}}},e.prototype.drag=function(e){var t=this.getBBox(),a=this.transformPoint(e),s=this.startPoints.box.x+a.x-this.startPoints.point.x,n=this.startPoints.box.y+a.y-this.startPoints.point.y,r=this.constraint,l=a.x-this.startPoints.point.x,i=a.y-this.startPoints.point.y;if(this.el.fire("dragmove",{event:e,p:a,m:this.m,handler:this}),this.el.event().defaultPrevented)return a;if("function"==typeof r){var o=r.call(this.el,s,n,this.m);"boolean"==typeof o&&(o={x:o,y:o}),!0===o.x?this.el.x(s):!1!==o.x&&this.el.x(o.x),!0===o.y?this.el.y(n):!1!==o.y&&this.el.y(o.y)}else"object"==typeof r&&(null!=r.minX&&s<r.minX?l=(s=r.minX)-this.startPoints.box.x:null!=r.maxX&&s>r.maxX-t.width&&(l=(s=r.maxX-t.width)-this.startPoints.box.x),null!=r.minY&&n<r.minY?i=(n=r.minY)-this.startPoints.box.y:null!=r.maxY&&n>r.maxY-t.height&&(i=(n=r.maxY-t.height)-this.startPoints.box.y),null!=r.snapToGrid&&(s-=s%r.snapToGrid,n-=n%r.snapToGrid,l-=l%r.snapToGrid,i-=i%r.snapToGrid),this.el instanceof SVG.G?this.el.matrix(this.startPoints.transform).transform({x:l,y:i},!0):this.el.move(s,n));return a},e.prototype.end=function(e){var t=this.drag(e);this.el.fire("dragend",{event:e,p:t,m:this.m,handler:this}),SVG.off(window,"mousemove.drag"),SVG.off(window,"touchmove.drag"),SVG.off(window,"mouseup.drag"),SVG.off(window,"touchend.drag")},SVG.extend(SVG.Element,{draggable:function(t,a){"function"!=typeof t&&"object"!=typeof t||(a=t,t=!0);var s=this.remember("_draggable")||new e(this);return(t=void 0===t||t)?s.init(a||{},t):(this.off("mousedown.drag"),this.off("touchstart.drag")),this}})}).call(this)},317:function(e,t,a){"use strict";var s=a(59);a.n(s).a},318:function(e,t,a){(e.exports=a(6)(!1)).push([e.i,"[data-v-f05f44a6] .table:hover {\n  cursor: -webkit-grab;\n  cursor: grab;\n  fill: #9ACD32;\n}\n[data-v-f05f44a6] .table:active {\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n.available-table[data-v-f05f44a6] {\n  font-size: 0.8rem;\n}\n.available-table[data-v-f05f44a6]:hover {\n  cursor: pointer;\n  background: #9ACD32;\n}\n.disabled[data-v-f05f44a6]:hover {\n  cursor: not-allowed;\n}\n.circle[data-v-f05f44a6]:hover {\n  /*cursor: grab;*/\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n  fill: yellow;\n}\n.circle[data-v-f05f44a6]:active {\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n.primary-border[data-v-f05f44a6] {\n  border: 2px solid #9ACD32;\n}",""])},59:function(e,t,a){var s=a(318);"string"==typeof s&&(s=[[e.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a(7)(s,n);s.locals&&(e.exports=s.locals)},71:function(e,t,a){"use strict";var s={props:["newTable"],data:function(){return{}}},n=a(2),r=Object(n.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-modal",{ref:"modal",attrs:{size:"lg",id:"table-details",title:"Détails de la nouvelle table"},on:{ok:function(t){return e.$emit("addTable")}}},[a("b-row",{attrs:{"no-gutters":""}},[a("b-col",{staticClass:"px-3",attrs:{cols:"12",md:"6"}},[a("b-form-group",{attrs:{label:"Numéro de table","label-for":"table-number-input","invalid-feedback":"Name is required"}},[a("b-form-input",{attrs:{id:"table-number-input",required:""},model:{value:e.newTable.table_number,callback:function(t){e.$set(e.newTable,"table_number",t)},expression:"newTable.table_number"}})],1)],1),e._v(" "),a("b-col",{staticClass:"px-3",attrs:{cols:"12",md:"6"}},[a("b-form-group",{attrs:{label:"Nombre de sièges"}},[a("b-form-input",{attrs:{readonly:""},model:{value:e.newTable.total_seats,callback:function(t){e.$set(e.newTable,"total_seats",t)},expression:"newTable.total_seats"}})],1)],1)],1),e._v(" "),a("b-row",{attrs:{"no-gutters":""}},e._l(e.newTable.seats,function(t,s){return a("b-col",{key:s,staticClass:"px-3",attrs:{cols:"12",md:"6"}},[a("b-row",{attrs:{"no-gutters":"","align-v":"center"}},[a("b-col",{staticClass:"px-1",attrs:{cols:"6"}},[a("b-form-group",{attrs:{label:"N° siège "+(s+1),description:(e.newTable.seats[s].price/100).toFixed(2)+" CHF","label-for":""}},[a("b-form-input",{attrs:{id:""},model:{value:e.newTable.seats[s].seat_number,callback:function(t){e.$set(e.newTable.seats[s],"seat_number",t)},expression:"newTable.seats[index]['seat_number']"}})],1)],1),e._v(" "),a("b-col",{staticClass:"px-1",attrs:{cols:"6"}},[a("b-form-group",{attrs:{label:"Prix siège "+(s+1)+" (centimes)","label-for":"",description:"= "+(e.newTable.seats[s].price/100).toFixed(2)+" CHF"}},[a("b-form-input",{attrs:{id:"",type:"number",required:""},model:{value:e.newTable.seats[s].price,callback:function(t){e.$set(e.newTable.seats[s],"price",t)},expression:"newTable.seats[index]['price']"}})],1)],1)],1)],1)}),1)],1)},[],!1,null,"b3a452fc",null);t.a=r.exports}}]);