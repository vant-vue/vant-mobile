<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="residue_box">
        <div class="top">
          <van-row type="flex" align="center">
            <van-col span="12">
              <div class="t1">我的收益</div>
            </van-col>
            <van-col span="12" class="tr">
              <van-icon @click="isDialog" class="qes" name="question" />
            </van-col>
          </van-row>
          <van-row type="flex" align="center">
            <van-col span="12">
              <div class="t2">￥{{income}}</div>
            </van-col>
            <van-col span="12" class="tr">
              <router-link :to="{path:'/recharge',query:{}}">
                <span class="t3">提现</span>
              </router-link>
            </van-col>
          </van-row>
        </div>
        <div class="content">
          <van-cell>
            <van-row class="list" type="flex" align="center">
              <van-col span="12">
                <span>时间</span>
              </van-col>
              <van-col span="6" class="tc">
                <span>项目</span>
              </van-col>
              <van-col span="6" class="tr">
                <span>金额</span>
              </van-col>
            </van-row>
          </van-cell>
		  <van-list v-model="loading"
		            :offset="0"
		            :finished="finished"
		            finished-text="没有更多了"
		            @load="onLoad">
			<van-cell  v-for="(v,k) in list"  :key="k">
				<van-row class="list" type="flex" align="center">
				  <van-col span="12">
					<span>{{v.insertTime.substring(0,16)}}</span>
				  </van-col>
				  <van-col span="6" class="tc">
					<span>{{cashTypeMap[v.cashType]}}</span>
				  </van-col>
				  <van-col span="6" class="tr">
					<span class="red">{{v.payMoney}}元</span>
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
	import {myAmount,mycashRecord} from "@/api/api";
	import {CASH_TYPE} from '@/utils/Constant'
export default {
  name: "myEarnings",
  data() {
    return {
		list: [],
		loading: false,
		finished: false,
		searchMap:{
			pageNo:1,
			type:2
		},
		income:"0.00",
		cashTypeMap:CASH_TYPE
	};
  },
  methods: {
    isDialog() {
      this.$dialog
        .alert({
          title: "提示",
          confirmButtonText: "我知道了",
          message:
            "1、我的收益由销售额的30%+中奖佣金（2%）构成，每满100元可以提现"
        })
        .then(() => {
          // on close
        });
    }, onLoad() {
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
				  this.income = res.args.income;
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
    .qes {
      font-size: 20px;
      color: #0099ff;
    }
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