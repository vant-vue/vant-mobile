<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="residue_box">
        <van-row class="top"
                 type="flex"
                 align="center">
          <van-col span="12">
            <div class="t1">我的余额</div>
            <div class="t2">￥{{amount}}</div>
          </van-col>
          <van-col span="12"
                   class="tr">
            <router-link :to="{path:'/recharge',query:{}}">
              <span class="t3">充值</span>
            </router-link>
          </van-col>
        </van-row>
        <div class="content">
			<van-list v-model="loading"
			          :offset="0"
			          :finished="finished"
			          finished-text="没有更多了"
			          @load="onLoad">
			  <van-cell v-for="(v,k) in list">
				<van-row class="list"
						 type="flex"
						 align="center">
				  <van-col span="12">
					<span>{{v.insertTime.substring(0,16)}}</span>
				  </van-col>
				  <van-col span="6"
						   class="tc">
					<span>{{cashTypeMap[v.cashType]}}</span>
				  </van-col>
				  <van-col span="6"
						   class="tr">
					<span :class="{'red':v.cashType!=1,'green':v.cashType==1}">{{v.payMoney}}元</span>
				  </van-col>
				</van-row>
			  </van-cell>
		  </van-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mycashRecord,myAmount} from "@/api/api";
import {CASH_TYPE} from '@/utils/Constant'
export default {
  name: "residue",
  data() {
    return {
		list: [],
		loading: false,
		finished: false,
		searchMap:{
			pageNo:1,
			type:1
		},
		amount:"0.00",
		cashTypeMap:CASH_TYPE
	};
  },
  methods: {
	  onLoad() {
	    // 异步更新数据
	    setTimeout(() => {
		 let map = this.seachMap;
	      mycashRecord(map)
	        .then(res => {
	          if (res.flag) {
	            //调用成功
	            if (res.list && res.list.length > 0) {
	              for (let i = 0; i < res.list.length; i++) {
	                this.list.push(res.list[i]);
	              }
	              // 加载状态结束
	              this.loading = false;
	              // 数据全部加载完成
	              if (res.list.length < 10) {
	                this.finished = true;
	              } else {
	                this.pageNo++;
	              }
	            } else {
	              // 加载状态结束
	              this.loading = false;
	              this.finished = true;
	            }
	          }
	        })
	        .catch(err => {
	          // 加载状态结束
	          this.loading = false;
	          this.finished = true;
	        });
	    }, 500);
	},loadAmount(){
		myAmount()
		  .then(res => {
			  if(res.flag){
				  this.amount = res.args.amount;
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
.residue_box {
  padding-top: 10px;
  .top {
    padding: 10px;
    background: #ffffff;
    font-size: 14px;
    .t1 {
      padding: 0 0 8px 5px;
    }
    .t2 {
      font-size: 32px;
      font-weight: bold;
    }
    .t3 {
      padding: 5px 15px;
      background: #ff9900;
      color: #ffffff;
      border-radius: 30px;
    }
  }
  .content {
    padding-top: 10px;
    .van-cell {
      border-bottom: 1px solid #f5f5f5;
    }
    .red {
      color: #ff0000;
    }
    .green {
      color: #009900;
    }
  }
}
</style>