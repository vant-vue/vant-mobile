(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["bind_tel"],{"61f7":function(e,t,s){"use strict";function n(e){return/^1[0-9]{10}$/.test(e)}function c(e){return/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(e)}s.d(t,"b",(function(){return n})),s.d(t,"a",(function(){return c}))},"66f1":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"main_box"},[s("div",{staticClass:"bind_box"},[s("van-field",{attrs:{label:"手机号",placeholder:"请输入手机号","error-message":e.errmsg},on:{focus:e.getFocus},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),s("van-field",{attrs:{center:"",clearable:"",maxlength:"6",label:"短信验证码",placeholder:"请输入短信验证码","error-message":e.codeerrmsg},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}},[s("van-button",{attrs:{slot:"button",size:"small",color:"#cccccc",type:"primary"},on:{click:e.sendMsg},slot:"button"},[e._v(e._s(e.smsBtnTxt))])],1),s("div",{staticClass:"btn"},[s("van-button",{attrs:{type:"primary",color:"#FF9900",block:""},on:{click:e.bdPhone}},[e._v("绑定")])],1)],1)])])},c=[],o=(s("b403"),s("e096")),i=s("4ec3"),r=s("61f7"),a={name:"bind_tel",data:function(){return{phone:"",errmsg:"",smsBtnTxt:"发送验证码",isDjs:!1,code:"",secondTimer:60,codeerrmsg:"",checkPhone:""}},methods:{sendMsg:function(){var e=this;this.isDjs||(Object(r["b"])(this.phone)?Object(i["l"])().then((function(t){t.flag&&(e.isDjs=!0,e.checkPhone=e.phone,e.codeTimer())})).catch((function(e){})):this.errmsg="手机号格式错误")},getFocus:function(){this.errmsg=""},codeTimer:function(){var e=this;if(this.secondTimer<=0)return this.isDjs=!1,this.smsBtnTxt="发送验证码",void(this.secondTimer=60);this.secondTimer--,this.smsBtnTxt=this.secondTimer+"s后获取",setTimeout((function(){e.codeTimer()}),1e3)},bdPhone:function(){var e=this;if(Object(r["b"])(this.phone))if(""!=this.code)if(this.checkPhone==this.phone){var t={phone:this.phone,code:this.code};Object(i["c"])(t).then((function(t){t.flag&&(o["a"].success("绑定成功"),setTimeout((function(){e.$router.push({path:"/user"})}),800))})).catch((function(e){}))}else this.errmsg="更换手机号请重新发送验证码";else this.codeerrmsg="请输入验证码";else this.errmsg="手机号格式错误"}}},h=a,u=(s("7e6b"),s("5511")),l=Object(u["a"])(h,n,c,!1,null,"ddfb9ed0",null);t["default"]=l.exports},"7e6b":function(e,t,s){"use strict";var n=s("fc03"),c=s.n(n);c.a},fc03:function(e,t,s){}}]);