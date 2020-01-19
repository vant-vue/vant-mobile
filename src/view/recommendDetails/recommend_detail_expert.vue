<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="recommend_detail_box">
        <div class="top_box">
          <div class="list_game_box">
            <van-cell>
              <van-row class="top" type="flex" align="center">
                <van-col>
                  <img src="@/assets/home/game.png" alt />
                </van-col>
                <van-col span="20">
                  <div>
                    <span class="tit_one">{{expert.nickName}}</span>
                  </div>
                  <div>
                    <span class="tit_one">{{expert.fans}}粉丝</span>
                  </div>
                </van-col>
                <van-col span="6" class="tr">
                  <span class="tit_three" @click="attention">{{expert.isAttention?'已关注':'关注'}}</span>
                </van-col>
              </van-row>
              <div class="fon">{{expert.introduce}}</div>
            </van-cell>
          </div>
        </div>
        <div class="mid_box">
          <van-row class="li_item tc" type="flex" align="center">
            <van-col span="8">
              <div>{{expert.threeNearWinRate>=30?expert.threeNearWinRate+'%':'-'}}</div>
              <div>近3天胜率</div>
            </van-col>
            <van-col span="8">
              <div>{{expert.threeNearBackRate>=50?expert.threeNearBackRate+'%':'-'}}</div>
              <div>近3天回报率</div>
            </van-col>
            <van-col span="8">
              <div>{{expert.thisRedCount>2?expert.thisRedCount:'-'}}</div>
              <div>当前连红</div>
            </van-col>
          </van-row>
          <van-row class="li_item tc" type="flex" align="center">
            <van-col span="8">
              <div>{{expert.sevenNearWinRate>=30?expert.sevenNearWinRate+'%':'-'}}</div>
              <div>近3天胜率</div>
            </van-col>
            <van-col span="8">
              <div>{{expert.sevenNearBackRate>=50?expert.sevenNearBackRate+'%':'-'}}</div>
              <div>近3天回报率</div>
            </van-col>
            <van-col span="8">
              <div>{{expert.historyRedCount>4?expert.historyRedCount:'-'}}</div>
              <div>当前连红</div>
            </van-col>
          </van-row>
          <div class="title">历史战绩</div>
          <div class="content" v-if="redBlankList&&redBlankList.length>0">
            <span :class="{'red':v==1,"black":v==0}" v-for="(v,k) in redBlankList" :key="k">{{v==1?"红":"黑"}}</span>
          </div>
        </div>
        <div class="title_box">最新发布</div>
        <div class="new_box"  v-for="(v,k) in newList"  :key="k">
          <div>
            <span class="mode">{{v.passway}}</span>
            <span>{{v.title}}</span>
          </div>
          <van-row class="fot" type="flex" align="center">
            <van-col span="20">
              <span class="tit_one">
                <van-icon name="eye-o" />
                <span>{{v.viewTimes}}</span>
              </span>
              <span class="tit_two">
                <van-icon name="underway-o" />
                <span>{{v.pubTime.substring(11,16)}}</span>
              </span>
            </van-col>
            <van-col span="4" class="tr">
              <span class="tit_three">{{dealDecimal(v.payMoney)}}</span>
            </van-col>
          </van-row>
        </div>
        <div class="title_box">历史发布</div>
		<van-list
		  v-model="loading"
		  :offset="0"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>
        <div class="new_box" v-for="(v,k) in list"  :key="k">
          <div>
            <span class="mode">{{v.passway}}</span>
            <span>{{v.title}}</span>
          </div>
          <van-row class="fot" type="flex" align="center">
            <van-col span="20">
              <span class="tit_one">
                <van-icon name="eye-o" />
                <span>{{v.viewTimes}}</span>
              </span>
              <span class="tit_two">
                <van-icon name="underway-o" />
                <span>{{v.pubTime.substring(5,10)}}</span>
              </span>
            </van-col>
            <van-col span="4" class="tr">
              <span :class="{'tit_five':v.winStatus==1,'.tit_four':v.winStatus==0}">{{v.winStatus==1?"命中":"未中"}}</span>
            </van-col>
          </van-row>
        </div>
		 </van-list>
      </div>
    </div>
  </div>
</template>
<script>
	import { Toast } from 'vant';
	import {expertDetails,expertHistory,attentionExpert,removeAttention} from "@/api/api";
	import {dealDecimal} from '@/utils/util'
export default {
  name: "recommend_detail_expert",
  data() {
    return {
		expert:{},
		redBlankList:[],
		newList:[],
		seachMap:{
		  expertDataId:this.$route.query.expertDataId,
		  pageNo:1,
		  pageSize:10
		},
		list:[],
		loading: false,
		finished: false
	};
  },
  methods: {
	  loadExpert(){
		  let map = this.seachMap;
		  expertDetails(map)
		    .then(res => {
		      if (res.flag) {
		        //调用成功
		  			this.expert.nickName = res.args.nickName;
		  			this.expert.tenWin = res.args.expertData.nearTenWin;
		  			this.expert.thisRedCount = res.args.expertData.thisRedCount;
		  			this.expert.fans = res.args.expertData.fans;
		  			this.expert.threeNearWinRate = res.args.expertData.threeNearWinRate;
		  			this.expert.threeNearBackRate = res.args.expertData.threeNearBackRate;
		  			this.expert.sevenNearWinRate = res.args.expertData.sevenNearWinRate;
		  			this.expert.sevenNearBackRate = res.args.expertData.sevenNearBackRate;
		  			this.expert.historyRedCount = res.args.expertData.historyRedCount;
					this.expert.introduce = res.args.expertData.introduce;
		  			this.expert.isAttention = res.args.isAttention;
		  			this.expert.attentionId = res.args.attentionId;
		  			this.expert.headerImg = res.args.headerImg;
		  			this.redBlankList = res.args.rlist;
		  			this.newList = res.list;
		  	}
		    })
		    .catch(err => {
		      // 加载状态结束
		    });
	  },onLoad(){
		// 异步更新数据
		setTimeout(() => {
		  let map = this.seachMap;
		  expertHistory(map)
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
	},attention(){
		if(this.expert.isAttention&&this.expert.attentionId){//已关注的情况
			removeAttention({"attentionId":this.expert.attentionId})
			  .then(res => {
			    if (res.flag) {
			      //调用成功
				  Toast.success('取消成功');
				  this.expert.isAttention = false;
				  this.expert.attentionId = null;
				}
			  })
			  .catch(err => {
			    // 加载状态结束
			  });
		}else{
			attentionExpert({"attentionId":this.seachMap.expertDataId,"type":1})
			  .then(res => {
			    if (res.flag) {
			      //调用成功
				  Toast.success("关注成功");
				  this.expert.isAttention = true;
				  this.expert.attentionId = res.args.id;
				}
			  })
			  .catch(err => {
			    // 加载状态结束
			  });
		}
	}
  }
};
</script>
<style lang="less" scoped>
.recommend_detail_box {
  .top_box {
    background-image: url("../../assets/common/bg.png");
  }
  .list_game_box {
    .van-cell {
      background-color: transparent;
    }
    .top {
      color: #fff;
      img {
        width: 52px;
        height: 52px;
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
        font-size: 14px;
        margin-left: 8px;
        background: #fff;
        color: #ff9900;
        padding: 1px 8px;
        border-radius: 30px;
      }
    }
    .fon {
      font-size: 12px;
      padding-top: 10px;
      color: #fff;
    }
  }
  .mid_box {
    background: #fff;
    font-size: 12px;
    margin-top: 10px;
    .li_item {
      .van-col > div:first-child {
        font-size: 18px;
        color: #ff0000;
        padding: 8px 0;
      }
      .van-col > div:last-child {
        color: #323232;
        padding: 8px 0;
      }
    }
    .title {
      padding: 10px;
    }
    .content {
      padding: 0 20px 0 20px;
      span {
        display: inline-block;
        font-size: 13px;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #fff;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 26px;
      }
      .red {
        background: #ff0000;
        border-radius: 50%;
      }
      .black {
        background: #000;
        border-radius: 50%;
      }
    }
  }
  .title_box {
    font-size: 14px;
    font-weight: bold;
    margin: 10px;
    padding-left: 20px;
    border-left: 3px solid #000;
  }
  .new_box {
    background: #fff;
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #bfbfbb;
    .mode {
      padding: 2px 10px;
      border-radius: 50px;
      background: #0066ff;
      color: #fff;
      margin-right: 10px;
    }
    .fot {
      margin-top:15px;
      font-size: 14px;
      color: #999;
      .tit_one {
        margin-right: 10px;
      }
      .tit_three {
        font-weight: bold;
        color: #ff0000;
      }
      .tit_four {
        color: #ff0000;
        display: inline-block;
        width: 42px;
        height: 42px;
        line-height: 42px;
        border:1px solid #ff0000;
        text-align: center;
        border-radius: 50%;
      }
	  .tit_five {
	    color: #323232;
	    display: inline-block;
	    width: 42px;
	    height: 42px;
	    line-height: 42px;
	    border:1px solid #323232;
	    text-align: center;
	    border-radius: 50%;
	  }
      .van-icon {
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
}
</style>