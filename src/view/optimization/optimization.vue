<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="tab_box">
        <van-tabs v-model="active" swipeable @change="onTabChange">
          <van-tab v-for="(item,index) in tabList" :key="index" :index="index">
            <div slot="title">
              <span :class="{'tab_cl':active==index}">{{item}}</span>
            </div>
            <!-- 列表 -->
            <div class="game_box">
              <van-list
                v-model="loading"
                :offset="0"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div class="list_game_box" v-for="(v,k) in list"  :key="k">
                  <router-link :to="{path:'/optimization_recommend_detail',query:{}}">
                    <van-cell>
                      <van-row class="top" type="flex" align="center">
                        <van-col span="20">
                          <img src="@/assets/home/game.png" alt />
                          <span class="tit_one">{{v.nick_name}}</span>
                          <span class="tit_two" v-if="v.near_ten_win>=5">近10中{{v.near_ten_win}}</span>
                        </van-col>
                        <van-col span="4" class="tr">
                          <div class="tit_three">{{v.seven_near_win_rate}}%</div>
                          <div class="tit_four">命中率</div>
                        </van-col>
                      </van-row>
                      <div class="mid">
                        <div class="font_row" v-for="(a,b) in v.matchArr" :key="b">
                          <van-row type="flex" align="center">
                            <van-col span="16" class="font_one">{{a.num}} {{a.hName}} VS {{a.aName}}</van-col>
                            <van-col span="8" class="font_two tr">{{a.lName}} {{a.endTime}}</van-col>
                          </van-row>
                          <div class="font_three">{{a.betStr}}</div>
                        </div>
                      </div>
                      <div class="fot">
                        <van-row type="flex" align="center">
                          <van-col span="10">
                            <span class="red_color">百元奖金: {{dealDecimal(v.hunred_bonus)}}</span>
                          </van-col>
                          <van-col span="14" class="tr">
                            <van-icon class="time" name="underway-o" />
                            <span class="tit_four">{{v.timeNear}}</span>
                          </van-col>
                        </van-row>
                      </div>
                    </van-cell>
                  </router-link>
                </div>
              </van-list>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
	import {loganRlist} from "@/api/api";
	import {paramsMap,betParamMap} from "@/utils/Constant";
	import {by_str,parseTime,dealDecimal} from "@/utils/util";
	import {formatContent,formatEndTime} from "@/utils/recommendUtils";
export default {
  name: "optimization",
  data() {
    return {
      active: 0,
      tabList: ["关注", "全部", "二串", "总进球", "半全场","中高赔"],
	  yhMap:{"1":"均优","2":"博热","3":"搏冷"},
      list: [],
      loading: false,
      finished: false,
	  searchMap:{
		  recommendType:null,
		  isAttention:0
	  }
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
        let map = this.seachMap;
        loganRlist(map)
          .then(res => {
            if (res.flag) {
              //调用成功
              if (res.list && res.list.length > 0) {
                for (let i = 0; i < res.list.length; i++) {
				  let rd = res.list[i];
				  let matchJson = eval('(' +rd.content+')');
				  rd.matchArr = formatContent(matchJson,rd.yh);
				  rd.timeNear = formatEndTime(rd.book_end_time);
                  this.list.push(rd);
                }
              } 
            }
          })
          .catch(err => {
            // 加载状态结束
          });
    },
    onTabChange(tab) {
	  if(this.active==0){
		  this.searchMap.recommendType = null;
		  this.searchMap.isAttention =1;
	  }else{
		  this.searchMap.isAttention =0;
		  if(this.active==1){
			  this.searchMap.recommendType = null;
		  }else if(this.active==5){
			   this.searchMap.recommendType = this.active;
		  }else{
			   this.searchMap.recommendType = this.active - 1;
		  }
	  }
      this.list = [];
      this.onLoad();
    }
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
.game_box {
  padding: 0 10px;
  .list_game_box {
    border-top: 2px solid #f5f5f5;
    border-radius: 8px;
    margin-top:10px;
    .van-cell {
      padding: 10px 10px;
      border-radius: 8px;
    }
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
        padding: 1px 8px;
        border-radius: 30px;
      }
      .tit_three {
        font-size: 18px;
        font-weight: bold;
        color: #ff0000;
      }
      .tit_four {
        font-size: 10px;
        color: #ff0000;
      }
    }
    .mid {
      margin-top: 10px;
      font-size: 14px;
      .font_row {
        padding:10px 10px 0;
        background: #f2f2f2;
        .font_two {
          color: #bfbfbf;
        }
        .font_three {
          padding-top: 5px;
          color: #323232;
          font-weight: bold;
        }
      }
      .font_row:last-child{
        padding-bottom: 10px;
      }
    }
    .fot {
      padding-top: 10px;
      .red_color{
        color: #ff0000;
      }
      .time{
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
}
</style>