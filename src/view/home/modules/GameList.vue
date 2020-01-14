<template>
  <div class="tab_box">
    <van-tabs v-model="active" swipeable @change="onTabChange">
      <van-tab v-for="(item,index) in tabList" :key="index" :index="index">
        <div slot="title">
          <span :class="{'tab_cl':active==index}">{{item}}</span>
        </div>
        <!-- 列表 -->
        <van-list
          v-model="loading"
          :offset="0"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list_game_box" v-for="(v,k) in list">
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
                    <span class="tit_four" v-if="v.is_free">免费</span>
                  </van-col>
                </van-row>
              </van-cell>
            </router-link>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { todayList} from "@/api/api";
export default {
  name: "GameList",
  data() {
    return {
      active: 2,
      tabList: ["关注", "推荐", "二串", "总进球", "半全场", "单关", "篮球"],
      list: [],
      loading: false,
      finished: false,
	  seachMap:{
		  pageNo:1,
		  pageSize:10,
		  recommendType:1,
		  isTop:0,
		  isAttention:0
	  }
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
		 let map = this.seachMap;
		 todayList(map).then(res => {
		   if(res.flag){//调用成功
		 	  if(res.list&&res.list.length>0){
				  for(let i=0;i<res.list.length;i++){
					  this.list.push(res.list[i]);
				  }
				  // 加载状态结束
				  this.loading = false;
				  // 数据全部加载完成
				  if (res.list.length < 10) {
				    this.finished = true;
				  }else{
					  this.seachMap.pageNo++;
				  }
			  }else{
				  // 加载状态结束
				  this.loading = false;
				  this.finished = true;
			  }
			 
		   }
		 }).catch(err=>{
		    // 加载状态结束
		    this.loading = false;
		     this.finished = true;
		 });
      }, 500);
    },
    onTabChange(tab) {
	  if(this.active==1){
		  this.seachMap.recommendType = null;
		  this.seachMap.isTop =1;
		   this.seachMap.isAttention =0;
	  }else if(this.active==0){
	  		  this.seachMap.recommendType = null;
	  		  this.seachMap.isAttention =1;
			  this.seachMap.isTop =0;
	  }else{
		  this.seachMap.isAttention =0;
		  this.seachMap.isTop =0;
		  this.seachMap.recommendType = this.active;
	  }
	  this.loading = false;
	  this.finished = false;
	  this.onLoad();
    }
  }
};
</script>
<style lang="less" scoped>
.tab_box {
  margin: 10px 0;
  .tab_cl {
    border-radius: 30px;
    padding: 2px 8px;
    background: #ff0000;
    color: #fff;
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
      font-size: 12px;
      color: #fff;
      background: #FF9900;
      padding:2px 10px;
      border-radius: 30px;
      margin-right:10px; 
    }
    .tit_four {
      font-weight: bold;
      color: #ff0000;
    }
    .van-icon {
      vertical-align: middle;
      margin-right: 6px;
    }
  }
}
</style>