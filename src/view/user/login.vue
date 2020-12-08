<template>
  <div>
    <!-- <Header></Header> -->
   正在登录中...
  </div>
</template>

<script>
import {wxConst} from '@/utils/Constant'
import {getUserId} from '@/utils/cookie'
export default {
  name: "login",
  components: {},
  data() {
    return {
		
	};
  },
  methods: {
	 checkLogin(){//校验登录
		const localStr = getUserId("localStorage");
		if(!localStr){
			var url =wxConst.wx_config.url.recdit_url;
			var wxUrl = wxConst.wx_config.url.wx_login;
			wxUrl = wxUrl + "?appid=" + wxConst.wx_config.appid+"&redirect_uri="+wxConst.wx_config.url.wx_back_url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state=BINDWX_02"+url;
			window.location.href = wxUrl;
		}else{
			this.$router.push({ path: "/home" });
		}
	 } 
  },mounted() {
	 this.checkLogin();
  }
};
</script>

