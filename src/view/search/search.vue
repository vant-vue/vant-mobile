<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="search_box">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round">
          <div slot="action" @click="onSearch">
            <div class="btn">搜索</div>
          </div>
        </van-search>
      </div>
      <!-- 列表 有数据-->
      <van-list
        v-if="list&&list.length>0"
        v-model="loading"
        :offset="0"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
       <div class="list_game_box" v-for="(v,k) in list" :key="k">
             <router-link :to="{path:'/recommend_detail',query:{}}">
               <van-cell>
                 <van-row class="top" type="flex" align="center">
                   <van-col span="20">
                     <img :src="v.header_img" alt />
                     <span class="tit_one">{{v.nick_name}}</span>
                     <span class="tit_two" v-if="v.near_ten_win>=5">近10中{{v.near_ten_win}}</span>
                     <span class="tit_two" v-if="v.this_red_count>=3">{{v.this_red_count}}连红</span>
                   </van-col>
                   <van-col span="4" class="tr">
                     <div class="tit_three">{{v.seven_near_win_rate}}%</div>
                     <div class="tit_four">命中率</div>
                   </van-col>
                 </van-row>
                 <van-row class="mid" type="flex" align="center">
                   <van-col span="24">
                     <span class="tit_one">{{v.l_abbr}}</span>
                     <span class="tit_two">{{v.title.length>15?v.title.substring(0,15)+'...':v.title}}</span>
                   </van-col>
                 </van-row>
                 <van-row class="fot" type="flex" align="center">
                   <van-col span="12">
                     <span class="tit_one">
                       <van-icon name="eye-o" />
                       <span>{{v.view_times?v.view_times:0}}</span>
                     </span>
                     <span class="tit_two">
                       <van-icon name="underway-o" />
                       <span>{{v.pub_time.substring(11,16)}}</span>
                     </span>
                   </van-col>
                   <van-col span="12" class="tr">
                     <span class="tit_three" v-if="v.no_win_back">不中退款</span>
					 <span class="tit_three" v-if="!v.is_free&&v.payMoney">v.payMoney</span>
                     <span class="tit_four" v-if="v.is_free">免费</span>
                   </van-col>
                 </van-row>
               </van-cell>
             </router-link>
           </div>
      </van-list>
      <!-- 列表 无数据-->
      <div v-else-if="list.length==0" class="no_data">
        <img src="@/assets/common/no_data.png" alt />
        <div>没有内容</div>
      </div>
    </div>
  </div>
</template>
<script>
import { todayList } from "@/api/api";
export default {
  name: "search",
  data() {
    return {
      value: "",
      list: [],
      loading: false,
      finished: false,
	  seachMap: {
	    pageNo: 1,
	    pageSize: 10,
		search:""
	  }
    };
  },
  methods: {
    onSearch(){
		this.seachMap.search = this.value;
		this.list = [];
		this.seachMap.pageNo = 1;
		this.onLoad();
	},
    onLoad() {
      // 异步更新数据
     // 异步更新数据
     setTimeout(() => {
       let map = this.seachMap;
       todayList(map)
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
                 this.seachMap.pageNo++;
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
    }
  }
};
</script>
<style lang="less" scoped>
.search_box {
  .btn {
    padding: 3px 20px;
    border-radius: 5px;
    background: #ff9900;
    color: #ffffff;
  }
}
.list_game_box {
  border-top: 2px solid #f5f5f5;
  .top {
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .tit_one {
      font-size: 14px;
      margin-left: 8px;
    }
    .tit_two {
      font-size: 12px;
      margin-left: 8px;
      background: #ff0000;
      color: #fff;
      padding: 1px 5px;
      border-radius: 30px;
    }
    .tit_three {
      font-size: 14px;
      font-weight: bold;
      color: #ff0000;
    }
    .tit_four {
      font-size: 10px;
      color: #ff0000;
    }
  }
  .mid {
    padding-bottom: 10px;
    .tit_one {
      font-size: 10px;
      background: #0066ff;
      color: #fff;
      padding: 1px 5px;
      border-radius: 30px;
    }
    .tit_two {
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .fot {
    font-size: 14px;
    color: #999;
    .tit_one {
      margin-right: 10px;
    }
    .tit_three {
      font-weight: bold;
      color: #ff0000;
    }
    .van-icon {
      vertical-align: middle;
      margin-right: 6px;
    }
  }
}
.no_data {
  position: absolute;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  text-align: center;
  font-size: 14px;
  color: #e4e4e4;
}
</style>