(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{110:function(t,e,n){"use strict";n.r(e);var r=n(0),s=n.n(r),a=(n(3),n(8)),o=n.n(a);function u(t,e,n,r,s,a,o){try{var u=t[a](o),i=u.value}catch(t){return void n(t)}u.done?e(i):Promise.resolve(i).then(r,s)}var i={metaInfo:function(){return{title:"Accueil"}},layout:"frontend",created:function(){var t,e=(t=s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.page){t.next=4;break}return console.log("FetchPageBySlug"),t.next=4,this.$store.dispatch("pages/fetchPageBySlug",{pageSlug:this.$route.path.substring(1)});case 4:case"end":return t.stop()}},t,this)}),function(){var e=this,n=arguments;return new Promise(function(r,s){var a=t.apply(e,n);function o(t){u(a,r,s,o,i,"next",t)}function i(t){u(a,r,s,o,i,"throw",t)}o(void 0)})});return function(){return e.apply(this,arguments)}}(),mounted:function(){},data:function(){return{pageSlug:"accueil",form:new o.a({message:""})}},computed:{pages:function(){return this.$store.getters["pages/pages"]},page:function(){return Object.values(this.$store.getters["pages/pages"]).find(function(t){return"accueil"===t.slug})}},methods:{}},c=n(2),p=Object(c.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("b-container",[this.page?e("b-row",{attrs:{"no-gutters":""}},[e("b-col",{attrs:{cols:"12"},domProps:{innerHTML:this._s(this.page.content)}})],1):this._e()],1)},[],!1,null,"fec0c438",null);e.default=p.exports}}]);