<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="bind_box">
        <van-field v-model="phone"
                   label="手机号"
                   placeholder="请输入手机号"
                   :error-message="errmsg" @focus="getFocus"/>
        <van-field v-model="code"
                   center
                   clearable
				   maxlength="6"
                   label="短信验证码"
                   placeholder="请输入短信验证码"
				   :error-message="codeerrmsg">
          <van-button slot="button"
                      size="small"
                      color="#cccccc"
                      type="primary" @click="sendMsg">{{smsBtnTxt}}</van-button>
        </van-field>
        <div class="btn">
          <van-button type="primary"
                      color="#FF9900"
                      block @click="bdPhone">绑定</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import { Toast } from 'vant';
	import {bdPhone,getPhoneCode} from "@/api/api";
	import {isMobile} from "@/utils/validate";
export default {
  name: "bind_tel",
  data() {
    return {
      phone: "",
	  errmsg:"",
	  smsBtnTxt:"发送验证码",
	  isDjs:false,
	  code:"",
	  secondTimer:60,
	  codeerrmsg:"",
	  checkPhone:""
    };
  },
  methods: {
	  sendMsg(){
		  if(this.isDjs){
			  return;
		  }
		  if(!isMobile(this.phone)){//
			   this.errmsg="手机号格式错误";
			   return;
		  }
		  getPhoneCode()
		    .then(res => {
		      if (res.flag) {
		        //调用成功
		        this.isDjs=true;
				this.checkPhone = this.phone;
		        this.codeTimer();
		      }
		    })
		    .catch(err => {
		      // 加载状态结束
		    });
		  
	  },getFocus(){
		  this.errmsg="";
	  },codeTimer(){
		if(this.secondTimer <= 0){
			this.isDjs=false;
			this.smsBtnTxt="发送验证码";
			this.secondTimer = 60;
			return;
		}
		this.secondTimer--;
		this.smsBtnTxt = this.secondTimer + "s后获取";
		setTimeout(() => {
			this.codeTimer();
		}, 1000);
	},bdPhone(){
		if(!isMobile(this.phone)){//
			   this.errmsg="手机号格式错误";
			   return;
		}
		if(this.code==''){
			this.codeerrmsg="请输入验证码";
			return;
		}
		if(this.checkPhone!=this.phone){
			this.errmsg="更换手机号请重新发送验证码";
			return;
		}
		let map = {
			phone:this.phone,
			code:this.code
		}
		bdPhone(map)
		  .then(res => {
		    if (res.flag) {
		      //调用成功
		      Toast.success('绑定成功');
			  setTimeout(() => {
			  	this.$router.push({ path: "/user" });
			  }, 800);
		    }
		  })
		  .catch(err => {
		    // 加载状态结束
		  });
		
	}
  }
};
</script>
<style lang="less" scoped>
.bind_box {
  padding-top: 10px;
  .btn {
    box-sizing: border-box;
    padding: 30px 20px 0;
  }
}
</style>