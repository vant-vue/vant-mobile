<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="tab_box">
        <van-tabs v-model="active" swipeable @change="onTabChange">
          <van-tab v-for="(item,index) in tabList" :key="index" :index="index">
            <div slot="title">
              <span>{{item}}</span>
            </div>
            <div class="latey">
              <span :class="{'checked':searchMap.day==3}" @click="onChangeDay(3)">{{searchMap.orderBy=='red'?'当前连红':'近3天'}}</span>
              <span :class="{'checked':searchMap.day==7}"  @click="onChangeDay(7)">{{searchMap.orderBy=='red'?'历史连红':'近7天'}}</span>
            </div>
            <!-- 列表 -->
            <van-list
              :offset="0"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="list_game_box" v-for="(v,k) in list">
                <router-link :to="{path:'/recommend_detail',query:{}}">
                  <van-cell>
                    <van-row class="top" type="flex" align="center">
                      <van-col span="2" class="tc">
                        <div>{{k+1}}</div>
                      </van-col>
                      <van-col span="">
                        <img :src="v.header_img" alt />
                      </van-col>
                      <van-col span="14">
                        <span class="tit_one">{{v.nick_name}}</span>
                      </van-col>
                      <van-col span="4" class="tr">
                        <div class="tit_three" v-if="searchMap.orderBy=='win'">{{searchMap.day==3?v.three_near_win_rate:v.seven_near_win_rate}}%</div>
						<div class="tit_three" v-if="searchMap.orderBy=='back'">{{searchMap.day==3?v.three_near_back_rate:v.seven_near_back_rate}}%</div>
						<div class="tit_three" v-if="searchMap.orderBy=='red'">{{searchMap.day==3?v.this_red_count:v.history_red_count}}连红</div>
                      </van-col>
                    </van-row>
                  </van-cell>
                </router-link>
              </div>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import {rankList} from "@/api/api";
export default {
  name: "ranking",
  data() {
    return {
      active: 0,
      tabList: ["最高命中", "最高回报", "最高连红"],
	  orderByMap:["win","back","red"],
      list: [],
      /* loading: false,
      finished: false, */
	  searchMap:{
		  day:3,
		  orderBy:"win",
		  pageSize:20
	  }
    };
  },
  methods: {
    onLoad() {
		let map = this.searchMap;
        rankList(map)
        .then(res => {
          if (res.flag) {
            //调用成功
			if(res.args.winList){
				this.list = res.args.winList;
			}else{
				this.list = [];
			}
          }
        })
        .catch(err => {
          console.log(err);
        });
      
    },
    onTabChange(tab) {
	  this.searchMap.orderBy = this.orderByMap[this.active];
	  this.searchMap.day = 3;
      this.onLoad();
    },
	onChangeDay(d){
		this.searchMap.day=d;
		this.onLoad();
	}
  },mounted() {
    this.onLoad();
  }
};
</script>
<style lang="less" scoped>
.tab_box {
  .tab_cl {
    border-radius: 30px;
    padding: 2px 8px;
    background: #ff0000;
    color: #fff;
  }
}
.latey {
  text-align: center;
  padding: 10px 0 20px;
  background: #fff;
  span {
    box-sizing: border-box;
    font-size: 14px;
    padding: 8px 30px;
    border: 1px solid #f5f5f5;
  }
  span:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  span:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .checked {
    background: #ff9900;
    color: #fff;
  }
}
.list_game_box {
  border-top: 2px solid #f5f5f5;
  .top {
    font-size: 14px;
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
    .tit_one {
      font-size: 14px;
      margin-left: 10px;
    }
    .tit_three {
      font-size: 14px;
      font-weight: bold;
      color: #ff0000;
    }
    
  }
}
</style>