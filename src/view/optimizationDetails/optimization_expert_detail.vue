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
                    <!-- <span class="tit_two">近10中8</span> -->
                  </div>
                  <div>
                    <span class="tit_one">{{expert.fans}}粉丝</span>
                  </div>
                </van-col>
                <van-col span="6" class="tr">
                  <span class="tit_three" @click="attention">{{expert.isAttention?'已关注':'关注'}}</span>
                </van-col>
              </van-row>
              <!-- <div class="fon">长期从事竞彩分析工作专业分析师，国家认证彩票分析师。</div> -->
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
              <div>近7天胜率</div>
            </van-col>
            <van-col span="8">
              <div>{{expert.sevenNearBackRate>=50?expert.sevenNearBackRate+'%':'-'}}</div>
              <div>近7天回报率</div>
            </van-col>
            <van-col span="8">
              <div>{{expert.historyRedCount>4?expert.historyRedCount:'-'}}</div>
              <div>当前连红</div>
            </van-col>
          </van-row>
          <div class="title">历史战绩</div>
          <div class="content" v-if="redBlankList&&redBlankList.length>0">
            <span :class="{'red':v.winStatus==1,"black":v.winStatus==0}" v-for="(v,k) in redBlankList" :key="k">{{v.winStatus==1?"红":"黑"}}</span>
          </div>
        </div>
        <div class="title_box">最新发布</div>
        <div class="content_box" v-for="(v,k) in newList"  :key="k">
          <div class="mid">
            <div class="font_row"   v-for="(a,b) in v.matchArr" :key="b">
              <van-row type="flex" align="center">
                <van-col span="16" class="font_one">{{a.num}} {{a.hName}} VS {{a.aName}}</van-col>
                <van-col span="8" class="font_two tr">{{a.lName}} {{a.endTime?a.endTime:''}}</van-col>
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
        </div>
        <div class="title_box">历史发布</div>
		<van-list
		  v-model="loading"
		  :offset="0"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>
			 <div class="content_box" v-for="(v,k) in list"  :key="k">
			  <div class="mid">
				<div class="font_row"  v-for="(a,b) in v.matchArr" :key="b">
				  <van-row type="flex" align="center">
					<van-col span="16" class="font_one">{{a.num}} {{a.hName}} VS {{a.aName}}</van-col>
					<van-col span="8" class="font_two tr">{{a.lName}} {{a.endTime?a.endTime:''}}</van-col>
				  </van-row>
				  <div class="font_three red_color">{{a.betStr}}</div>
				</div>
				<div v-if="v.win_status==1" class="checked">命中</div>
				<div v-else class="nochecked">未中</div>
			  </div>
			  <div class="fot">
				<van-row type="flex" align="center">
				  <van-col span="10">
					<span class="gray">百元奖金:  {{dealDecimal(v.hunred_bonus)}}</span>
				  </van-col>
				  <van-col span="14" class="tr">
					<van-icon class="time" name="underway-o" />
					<span class="tit_four">{{v.recommendDate}}</span>
				  </van-col>
				</van-row>
			  </div>
			</div>
		 </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import {loganExpertDetails,loganHistoryList,attentionExpert,removeAttention} from "@/api/api";
import {paramsMap,betParamMap} from "@/utils/Constant";
import {by_str,parseTime,dealDecimal} from "@/utils/util";
export default {
  name: "optimization_recommend_detail",
  data() {
    return {
      show: true,
	  expert:{},
	  yhMap:{"1":"均优","2":"博热","3":"搏冷"},
	  redBlankList:[],
	  newList:[],
	  seachMap:{
		  expertId:this.$route.query.expertId,
		  pageNo:1,
		  pageSize:10
	  },
	  list:[],
	  loading: false,
	  finished: false
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },loadExpert(){
		 let map = this.seachMap;
		loganExpertDetails(map)
		  .then(res => {
		    if (res.flag) {
		      //调用成功
			this.expert.nickName = res.args.nickName;
			this.expert.tenWin = res.args.tenWin;
			this.expert.thisRedCount = res.args.thisRedCount;
			this.expert.fans = res.args.fans;
			this.expert.threeNearWinRate = res.args.threeNearWinRate;
			this.expert.threeNearBackRate = res.args.threeNearBackRate;
			this.expert.sevenNearWinRate = res.args.sevenNearWinRate;
			this.expert.sevenNearBackRate = res.args.sevenNearBackRate;
			this.expert.historyRedCount = res.args.historyRedCount;
			this.expert.isAttention = res.args.isAttention;
			this.expert.attentionId = res.args.attentionId;
			this.redBlankList = res.args.redBlankList;
			this.newList = res.args.newList;
			if(this.newList&&this.newList.length>0){
				for(let a in this.newList){
					let rd = this.newList[i];
					let matchJson = eval('(' +rd.content+')');
					rd.matchArr = this.formatContent(matchJson,rd.yh);
					rd.timeNear = this.formatEndTime(rd.book_end_time);
				}
			}
			}
		  })
		  .catch(err => {
		    // 加载状态结束
		  });
	},onLoad(){
		// 异步更新数据
		setTimeout(() => {
		  let map = this.seachMap;
		  loganHistoryList(map)
		    .then(res => {
		      if (res.flag) {
		        //调用成功
		        if (res.list && res.list.length > 0) {
		          for (let i = 0; i < res.list.length; i++) {
					   let rd = res.list[i];
					   let matchJson = eval('(' +rd.content+')');
					   rd.matchArr = this.formatContent(matchJson,rd.yh);
					   //rd.timeNear = this.formatEndTime(rd.book_end_time);
					   this.list.push(rd);
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
	},formatContent(matchJson,yh){
		let jsonArr = [];
		let isYh = false;
		for(let b in matchJson){
			let match = matchJson[b];
			let obj = {};
			for(let a in match){
				if(a=="winBet"||a=="isRemove"||a=="winStatus"){
					continue;
				}
				obj.hName = match[a].home_team;
				obj.aName = match[a].visiting_team;
				obj.lName = match[a].lname;
				obj.num = match[a].bno_cn;
				obj.endTime = match[a].time.replace(/_/g,":").substrng(5,10);
			    let bet = obj.bet;
				if(!bet){
					bet = [];
				}
				let betObj = {};
				betObj.bet = match[a].bet.indexOf("r")!=-1?match[a].bet.substring(1):match[a].bet;
				betObj.odd = match[a].odd;
				betObj.lott = match[a].lott;
				betObj.txt = paramsMap[betObj.lott][betObj.bet];
				betObj.sortBy = betParamMap[match[a].lott][betObj.bet];
				bet.push(betObj);
				obj.bet = bet;
			}
			obj.bet.sort(by_str("sortBy"));
			let betStr = "";
			for(let c in obj.bet){
				let d = obj.bet[c];
				betStr += " "+d.txt+d.odd;
			}
			betStr = betStr.substring(1);
			if(obj.bet.length>1&&!isYh&&yh>0){
				isYh = true;
				betStr += " ("+this.yhMap[yh]+")";
			}
			obj.betStr = betStr;
			jsonArr.push(obj);
		}
		return jsonArr;
	},formatEndTime(endTime){
		if(typeof endTime == "string"){
			endTime = parseTime(endTime);
		}
		if(endTime.getTime()<new Date().getTime()){
			return "已截止";
		}
		let hm = endTime.getTime() - new Date().getTime();
		let day = hm/(1000*3600*24);//天数
		let str = "";
		if(day>0){
			str += day+"天";
		}
		hm = hm%(1000*3600*24);
		let hour = hm/(3600*1000);//小时
		if(hour>0){
			str += day+"小时";
		}
		hm = hm%(3600*24);
		let min = hm/(60*1000);//分钟
		str += min+"分后截止";
		return str;
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
			attentionExpert({"attentionId":this.seachMap.expertId,"type":2})
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
  .content_box {
    background: #fff;
    padding: 10px 10px;
    border-top: 1px solid #f5f5f5;
    .red_color {
      color: #ff0000;
    }
    .mid {
      position: relative;
      font-size: 14px;
      .font_row {
        padding: 10px 10px 0;
        background: #f2f2f2;
        .font_two {
          color: #bfbfbf;
        }
        .font_three {
          padding-top: 5px;
          color: #323232;
          font-weight: bold;
        }
        .red_color {
          color: #ff0000;
        }
      }
      .font_row:last-child {
        padding-bottom: 10px;
      }
      .checked{
        position: absolute;
        transform: translate(-50%,-50%);
        top:50%;
        right: 25%;
        border:1px solid #ff0000;
        color:#ff0000;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        font-size: 16px;
        text-align: center;
        line-height: 42px;
      }
      .nochecked
        {
        position: absolute;
        transform: translate(-50%,-50%);
        top:50%;
        right: 25%;
        border:1px solid #323232;
        color:#323232;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        font-size: 16px;
        text-align: center;
        line-height: 42px;
      }
      
    }
    .fot {
      font-size: 12px;
      padding-top: 10px;
      .time {
        vertical-align: middle;
        margin-right: 6px;
      }
      .tit_four {
        color: #bfbfbf;
      }
      .gray {
        color: #bfbfbf;
      }
    }
  }
}
</style>