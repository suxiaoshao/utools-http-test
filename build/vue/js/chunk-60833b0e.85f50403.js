(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60833b0e"],{"2a1e":function(t,o,s){},e1ef:function(t,o,s){"use strict";var i=s("2a1e"),e=s.n(i);e.a},e4bb:function(t,o,s){"use strict";s.r(o);var i=function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("q-scroll-area",{staticClass:"history"},[s("div",{staticClass:"row"},t._l(t.historyList,(function(o,i){return s("div",{key:i,staticClass:"col-4 col-md-3 col-lg-2"},[s("q-card",{staticClass:"my-card",attrs:{flat:"",bordered:""}},[s("q-card-section",[s("div",{staticClass:"text-h5 text-center"},[t._v(t._s(o._id))]),s("q-tooltip",[s("div",{staticClass:"text-subtitle2"},[t._v("host : "+t._s(o.data.host))]),s("div",{staticClass:"text-subtitle2"},[t._v("path : "+t._s(o.data.path))]),s("div",{staticClass:"text-subtitle2"},[t._v("method : "+t._s(o.data.method))])])],1),s("q-card-actions",{staticClass:"my-action",attrs:{align:"around"}},[s("q-btn",{attrs:{flat:"",round:""},on:{click:function(o){return t.readHistory(i)}}},[s("import-icon"),s("q-tooltip",[t._v("读取到工作区")])],1),s("q-btn",{attrs:{flat:"",round:""},on:{click:function(o){return t.deleteHistory(i)}}},[s("delete-icon"),s("q-tooltip",[t._v("删除此历史")])],1)],1)],1)],1)})),0)])},e=[],a=(s("d3b7"),s("25f0"),s("2b0e")),n=s("2a19"),r=s("2c57"),c=s("aaa7"),l=a["a"].extend({name:"History",data:function(){return{historyList:[]}},methods:{deleteHistory:function(t){var o=this.historyList[t]._id,s=window.utools.db.remove(o);s.ok||n["a"].create({message:"删除失败",color:"red-5",position:"top",caption:s.error.toString()}),this.historyList=window.utools.db.allDocs()},readHistory:function(t){var o=this.historyList[t].data;this.webData.readFromWebHistory(o),this.webHistory.readFromHistoryItem(o),this.$router.push({name:"Home"})}},mounted:function(){this.historyList=window.utools.db.allDocs()},components:{"delete-icon":r["a"],"import-icon":c["a"]}}),d=l,u=(s("e1ef"),s("2877")),h=s("fe09"),b=Object(u["a"])(d,i,e,!1,null,"b4253bc6",null);o["default"]=b.exports;b.options.components=Object.assign(Object.create(b.options.components||null),b.options.components||{},{QScrollArea:h["l"],QCard:h["b"],QCardSection:h["d"],QTooltip:h["u"],QCardActions:h["c"],QBtn:h["a"]})}}]);