(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["game"],{"095c":function(t,a,e){"use strict";var s=e("d880"),n=e.n(s);n.a},2551:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("van-tabs",{attrs:{swipeable:""},on:{change:t.onTabChange},model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},t._l(t.tabList,(function(a,s){return e("van-tab",{key:s,attrs:{index:s}},[e("div",{attrs:{slot:"title"},slot:"title"},[e("span",[t._v(t._s(a))])]),e("div",{staticClass:"main_box"},[e("div",{staticClass:"filter_box"},[e("van-row",{attrs:{type:"flex",align:"center"}},[e("van-col",{attrs:{span:"19"}},[e("van-button",{staticClass:"btn",attrs:{icon:"calender-o",size:"small",plain:"",hairline:"",color:"#323232",block:""},on:{click:function(a){t.show=!0}}},[e("van-icon",{staticClass:"left",attrs:{name:"arrow-left"},on:{click:function(a){return a.stopPropagation(),t.pOrN("prev")}}}),e("span",[t._v(t._s(t.date))]),e("van-icon",{staticClass:"right",class:{"van-col-right-disabled":1==t.isMax},attrs:{name:"arrow"},on:{click:function(a){return a.stopPropagation(),t.pOrN("next")}}})],1)],1),e("van-col",{staticClass:"tr",attrs:{span:"5"}},[e("van-button",{attrs:{icon:"filter-o",size:"small",color:"linear-gradient(to right, #4bb0ff, #6149f6)"},on:{click:t.showLname}},[t._v("筛选")])],1)],1)],1),t._l(t.list,(function(a,s){return e("router-link",{directives:[{name:"show",rawName:"v-show",value:1==t.lNameMap[a.league_name_short],expression:"lNameMap[v.league_name_short]==1"}],key:s,attrs:{to:{path:"/focusGame",query:{}}}},[e("div",{staticClass:"list_box"},[e("van-cell",[e("van-row",{staticClass:"r_it1",attrs:{type:"flex",align:"center"}},[e("van-col",{attrs:{span:"12"}},[t._v(t._s(a.league_name_short)+" "+t._s(a.plan_day)+t._s(a.plan_number))]),e("van-col",{staticClass:"tr",attrs:{span:"12"}},[t._v(t._s(a.match_start_time.substring(5,16)))])],1),e("van-row",{staticClass:"r_it2 tc",attrs:{type:"flex",align:"center"}},[e("van-col",{attrs:{span:"8"}},[e("img",{attrs:{src:1==a.match_type?a.hImg:a.aImg,onerror:t.errorImg.h,alt:""}}),e("div",[t._v(t._s(1==a.match_type?a.home_team_short:a.visiting_team_short))])]),e("van-col",{attrs:{span:"8"}},[e("div",{staticClass:"vs"},[t._v(t._s(a.full_score?a.full_score:"VS"))]),a.full_score?e("div",{staticClass:"end"},[t._v("已结束")]):t._e(),a.hasRecCount&&a.hasRecCount>0?e("div",{staticClass:"rec"},[t._v(t._s(a.hasRecCount)+"个推荐")]):t._e()]),e("van-col",{attrs:{span:"8"}},[e("img",{attrs:{src:1==a.match_type?a.aImg:a.hImg,onerror:t.errorImg.a,alt:""}}),e("div",[t._v(t._s(1==a.match_type?a.visiting_team_short:a.home_team_short))])])],1)],1)],1)])}))],2)])})),1),e("Footer"),e("van-calendar",{attrs:{"show-confirm":!1,"min-date":t.minDate,"max-date":t.maxDate,"default-date":t.defualtDate},on:{confirm:t.onConfirm},model:{value:t.show,callback:function(a){t.show=a},expression:"show"}}),e("van-overlay",{attrs:{show:t.show_overlay},on:{click:function(a){t.show=!1}}},[e("div",{staticClass:"wrapper",on:{click:function(t){t.stopPropagation()}}},[e("div",{staticClass:"block"},[e("div",{staticClass:"content"},[e("van-row",{staticClass:"z_row",attrs:{type:"flex",align:"center"}},[e("van-col",{staticClass:"checked",attrs:{span:"12"},on:{click:t.selectAll}},[t._v("全选")]),e("van-col",{attrs:{span:"12"},on:{click:t.selectFan}},[t._v("反选")])],1),e("van-row",{staticClass:"x_row",attrs:{gutter:"20"}},t._l(t.lNameMap,(function(a,s){return e("van-col",{key:s,attrs:{span:"8"}},[e("div",{class:{checked:1==a},on:{click:function(a){return t.clickLname(s)}}},[t._v(t._s(s))])])})),1)],1),e("div",{staticClass:"btn_box"},[e("van-row",{staticClass:"btn",attrs:{type:"flex",align:"center"}},[e("van-col",{staticClass:"checked",attrs:{span:"12"},on:{click:t.removeLname}},[t._v("取消")]),e("van-col",{attrs:{span:"12"},on:{click:t.sureLname}},[t._v("确定")])],1)],1)])])])],1)},n=[],i=(e("4045"),e("b3f9"),e("3e5e"),e("4ec3")),o=e("ca00"),c={name:"game",components:{},data:function(){return{active:0,tabList:["足球","篮球"],typeMap:["football","basketball"],show:!1,isMax:1,show_overlay:!1,date:this.formatDate(new Date),minDate:Object(o["e"])(-180,new Date),maxDate:new Date,defualtDate:new Date,errorImg:{h:"this.src='https://m.lycf888.com/pt/img/logo-h.png'",a:"this.src='https://m.lycf888.com/pt/img/logo-a.png'"},list:[],serachMap:{sport:"football"},dateMap:{},lNameMap:{},showlNameMap:{}}},methods:{onTabChange:function(t){this.serachMap.sport=this.typeMap[t],this.loadMatch()},week:function(t){var a=new Array(7);return a[0]="星期天",a[1]="星期一",a[2]="星期二",a[3]="星期三",a[4]="星期四",a[5]="星期五",a[6]="星期六",a[new Date(t).getDay()]},formatDate:function(t){var a=new Date(t),e=Object(o["i"])(a,"yyyy-MM-dd")+" "+this.week(t);return e},onConfirm:function(t){this.show=!1,this.date=this.formatDate(t),this.serachMap.date=this.date.split(" ")[0],-1!=this.date.indexOf(Object(o["i"])(this.maxDate,"yyyy-MM-dd"))?this.isMax=1:this.isMax=0,this.loadMatch()},loadMatch:function(){var t=this,a=this.serachMap;Object(i["k"])(a).then((function(a){if(a.flag){var e=a.args.dateArr;if(t.dateMap.next=e[2],t.dateMap.prev=e[0],t.dateMap.week=e[3],t.dateMap.now=e[1],t.lNameMap={},a.list&&a.list.length>0)for(var s in t.list=a.list,t.list){var n=t.list[s];t.lNameMap[n.league_name_short]=1,n.hImg="/static/teamlogo/png/"+n.home_team_id+".png",n.aImg="/static/teamlogo/png/"+n.visiting_team_id+".png"}}})).catch((function(t){}))},selectAll:function(){var t=this.lNameMap;if(t)for(var a in t)t[a]=1;this.$forceUpdate()},selectFan:function(){var t=this.lNameMap;if(t)for(var a in t)t[a]?t[a]=0:t[a]=1;this.$forceUpdate()},clickLname:function(t){var a=this.lNameMap;1==a[t]?a[t]=0:a[t]=1,this.$forceUpdate()},removeLname:function(){this.show_overlay=!1,this.lNameMap=Object(o["b"])(this.showlNameMap)},showLname:function(){this.show_overlay=!0,this.showlNameMap=Object(o["b"])(this.lNameMap)},sureLname:function(){this.show_overlay=!1},pOrN:function(t){"next"==t&&-1!=this.date.indexOf(Object(o["i"])(this.maxDate,"yyyy-MM-dd"))||"prev"==t&&-1!=this.date.indexOf(Object(o["i"])(this.minDate,"yyyy-MM-dd"))||this.dateMap[t]&&(this.serachMap.date=this.dateMap[t],this.date=this.formatDate(Object(o["g"])(this.serachMap.date)),-1!=this.date.indexOf(Object(o["i"])(this.maxDate,"yyyy-MM-dd"))?this.isMax=1:this.isMax=0,console.log(this.isMax),this.loadMatch())}},mounted:function(){this.loadMatch()}},r=c,l=(e("095c"),e("5511")),h=Object(l["a"])(r,s,n,!1,null,null,null);a["default"]=h.exports},d880:function(t,a,e){}}]);
//# sourceMappingURL=game.4e594d68.js.map