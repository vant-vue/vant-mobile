<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="store_box">
        <van-row class="list_box"
                 type="flex"
                 align="center" v-for="(v,k) in list" :key="k">
          <van-col span="12">
            <div class="t1">{{v.user_name}}</div>
            <div class="t2">店主姓名：{{v.store_name}}</div>
            <div class="t3" v-if="v.cash_amount">店内余额：{{v.cash_amount}}元</div>
          </van-col>
          <van-col span="12"
                   class="tr" @click="switchS(v.business_id)">
            <span class="t4">切换彩店</span>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import {storeList,switchStore} from "@/api/api";
export default {
  name: "switch_store",
  data() {
    return {
		list:[]
	};
  },
  methods: {
	  loadList(){
		  storeList().then(res => {
		    if (res.flag) {
		      //调用成功
		      this.list = res.list;
		    }
		  })
		  .catch(err => {
		    console.log(err);
		  });
	  },
	  switchS(businessId){
		  switchStore({"businessId":businessId}).then(res => {
		    if (res.flag) {
		      //调用成功
		     Toast.success('切换成功');
		     setTimeout(() => {
		     	this.$router.push({ path: "/home" });
		     }, 800);
		    }
		  })
		  .catch(err => {
		    console.log(err);
		  });
	  }
  }, mounted() {
    this.loadList();
  }
};
</script>
<style lang="less" scoped>
.store_box {
  font-size: 14px;
  padding: 10px 0;
  .list_box {
    background: #ffffff;
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;
    .t1 {
      font-size: 16px;
      font-weight: bold;
    }
    .t4 {
      padding: 5px 10px;
      color: #ffffff;
      background: #ff9900;
      border-radius: 8px;
    }
  }
}
</style>