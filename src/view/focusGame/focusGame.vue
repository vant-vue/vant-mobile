<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="tab_box">
        <!-- 标题 -->
        <div class="t_box">
        <div class="title_box">焦点赛事</div>
        <!-- 轮播 -->
        <div class="banner_box">
          <van-swipe @change="onChange" :initial-swipe="initialSwipe">
            <van-swipe-item
              class="b_item"
              :key="item.key"
              :index="index"
              v-for="(item,index) in banner_list"
            >
              <van-cell class="banner_item">
                <van-row class="r_it1" type="flex" align="center">
                  <van-col span="12">{{item.matchJson.lAbbr}} {{item.matchJson.num}}</van-col>
                  <van-col span="12" class="tr">{{item.matchJson.endTime.substring(5,16)}}</van-col>
                </van-row>
                <van-row class="r_it2 tc" type="flex" align="center">
                  <van-col span="8">
                    <img :src="item.matchJson.hImg" :onerror="this.src='/pt/img/logo-h.png'" alt />
                    <div>{{item.matchJson.hAbbr}}</div>
                  </van-col>
                  <van-col span="8" class="vs">VS</van-col>
                  <van-col span="8">
                    <img  :src="item.matchJson.aImg" :onerror="this.src='/pt/img/logo-a.png'" alt />
                    <div>{{item.matchJson.aAbbr}}</div>
                  </van-col>
                </van-row>
              </van-cell>
            </van-swipe-item>
            <div class="custom_indicator" slot="indicator">
              <span
                :class="{'current':current==index}"
                :key="item.key"
                :index="index"
                v-for="(item,index) in banner_list"
              ></span>
            </div>
          </van-swipe>
        </div>
        </div>
        <!-- 列表 -->
         <van-row class="list_box" type="flex" align="center">
          <van-col span="12" class="fot_s">本场大神推荐</van-col>
          <van-col span="12" class="tr">共{{banner_list&&banner_list.length>0?banner_list[current].hasRecCount:0}}个推荐</van-col>
        </van-row>
        <van-list
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
      </div>
    </div>
  </div>
</template>
<script>
import {getHotMatch,todayList} from "@/api/api";
export default {
  name: "focusGame",
  data() {
    return {
      initialSwipe: 0, //初始位置索引
      banner_list: [],
      current: 0,
      list: [],
      loading: false,
      finished: false,
	  searchMap:{
		  pageNo: 1,
		  pageSize: 10,
		  mid:this.$route.query.mid
	  }
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
	  this.searchMap.mid = this.banner_list[index].mId;
	  onLoad();
    },
    onLoad() {
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
    }, loadMatch(){
		  getHotMatch().then(res => {
          if (res.flag) {
            //调用成功
            var list = res.list;
			if(list){
				for(let a=0;a<list.length;a++){
					let hot = list[a];
					hot.matchJson = eval('(' +hot.matchContent+')');
					hot.hImg = '/static/teamlogo/png/'+hot.hId+'.png';
					hot.aImg = '/static/teamlogo/png/'+hot.aId+'.png';
					if(hot.mId == this.searchMap.mid){
						this.current =a;
					}
				}
				if(!this.searchMap.mid){
					this.searchMap.mid = list[0].mId;
				}
				this.banner_list = list[0].mId;;
				this.onLoad();
			}
          }
        })
        .catch(err => {
          console.log(err);
        });
	  }
  },mounted() {
	 this.loadMatch();
  }
};
</script>
<style lang="less" scoped>
.t_box{
   background: #ffcc00;
}
.title_box {
  font-size: 18px;
  color: #000;
  font-weight: bold;
  padding: 10px 10px;
  background: #ffcc00;
}
.banner_box {
  box-sizing: border-box;
  padding: 10px 10px 10px;
  background: #ffcc00;
  .custom_indicator {
    text-align: center;
    span {
      display: inline-block;
      width: 14px;
      height: 6px;
      border-radius: 10px;
      background: #fff;
      margin-left: 10px;
    }
    .current {
      background: #ccc;
    }
  }
  .banner_item {
    border-radius: 8px;
    .r_it1 {
      font-size: 12px;
      color: #323232;
    }
    img {
      width: 38px;
      height: 38px;
    }
    .vs {
      font-size: 26px;
    }
    .r_it2 {
      padding: 10px 0 0;
      font-weight: bold;
    }
  }
}
.list_box{
  background: #fff;
  padding:10px;
  font-size: 12px;
  color:#bfbfbf;
  .fot_s{
    color:#000;
    font-size: 14px;
    font-weight: bold;
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
      background: #ff9900;
      padding: 2px 10px;
      border-radius: 30px;
      margin-right: 10px;
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