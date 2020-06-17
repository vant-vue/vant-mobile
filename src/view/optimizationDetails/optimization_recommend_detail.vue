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
                  <img :src="expert.headerImg" alt />
                </van-col>
                <van-col span="20">
                  <div>
                    <span class="tit_one">{{expert.nickName}}</span>
                    <span class="tit_two" v-if="expert.tenWin>=3">近10中{{expert.tenWin}}</span>
                    <span class="tit_two" v-if="expert.thisRedCount>=3">{{expert.thisRedCount}}连红</span>
                  </div>
                  <div>
                    <span class="tit_four">{{expert.fans}} 粉丝</span>
                  </div>
                </van-col>
                <van-col span="6" class="tr">
                  <span class="tit_three" @click="attention">{{expert.isAttention?'已关注':'关注'}}</span>
                </van-col>
              </van-row>
            </van-cell>
          </div>
        </div>
        <div class="mid_box">
          <van-row type="flex" align="center">
            <van-col span="10" class="red_color">百元奖金:  {{rec.hunred_bonus?dealDecimal(rec.hunred_bonus):"-"}}</van-col>
            <van-col span="14" class="tr">
              <div class="time">
                <van-icon class="ti" name="underway-o" />
                <span>{{rec.timeNear}}</span>
              </div>
            </van-col>
          </van-row>
          <div class="cont_game" v-for="(a,b) in rec.matchArr" :key="b">
            <van-row class="tc" type="flex" align="center">
              <van-col span="6">
                <img :src="b.hImg" :onerror="this.src='/pt/img/logo-h.png'"  alt />
              </van-col>
              <van-col span="12">
                <div class="tit1">
                  <span>{{b.hName}}</span>
                  <span>vs</span>
                  <span>{{b.aName}}</span>
                </div>
                <div class="tit2">{{a.lName}} {{a.endTime?a.endTime:''}}</div>
              </van-col>
              <van-col span="6">
                <img :src="b.aImg" :onerror="this.src='/pt/img/logo-a.png'"  alt />
              </van-col>
            </van-row>
            <div class="ret_a">
              <div class="win">{{b.betStr}}</div>
            </div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer_box" v-if="isGd">
          <div>
            <div class="tit5" >跟单</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import {loganDetails,attentionExpert,removeAttention} from "@/api/api";
import {paramsMap,betParamMap} from "@/utils/Constant";
import {by_str,parseTime,dealDecimal} from "@/utils/util";
export default {
  name: "optimization_recommend_detail",
  data() {
    return {
	  searchMap:{
		  recommendId:this.$route.query.recommendId
	  },
	  yhMap:{"1":"均优","2":"博热","3":"搏冷"},
	  expert:{
		  
	  },
	  rec:{
		  
	  },isGd:false
	 };
  },
  methods: {
  loadDetail(){
		loganDetails(this.searchMap)
		  .then(res => {
		    if (res.flag) {
		      //调用成功
				this.expert.nickName = res.args.nickName;
				this.expert.tenWin = res.args.tenWin;
				this.expert.thisRedCount = res.args.thisRedCount;
				this.expert.fans = res.args.fans;
				this.expert.expertId = res.args.expertId;
				this.expert.isAttention = res.args.isAttention;
				this.expert.attentionId = res.args.attentionId;
				this.rec = res.args.rec;
				if(rec){
					let matchJson = eval('(' +rec.content+')');
					rec.matchArr = this.formatContent(matchJson,rec.yh);
					if(rec.winStatus!=-1){
						rec.timeNear="已结束";
					}else{
						rec.timeNear = this.formatEndTime(rec.book_end_time);
						if(rec.timeNear!="已截止"){
							this.isGd = true;
						}
					}
				}
			}
		  })
		  .catch(err => {
		    // 加载状态结束
		    this.loading = false;
		    this.finished = true;
		  });
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
				obj.hImg = '/static/teamlogo/png/'+match[a].h_id+'.png';
				obj.aImg = '/static/teamlogo/png/'+match[a].a_id+'.png';
				obj.endTime = match[a].time.replace(/_/g,":").substrng(5,11);
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
    .list_game_box {
      border-top: 2px solid #f5f5f5;
      .top {
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
          background: #ff0000;
          color: #fff;
          padding: 1px 8px;
          border-radius: 30px;
        }
        .tit_four {
          font-size: 14px;
          margin-left: 8px;
          color: #bfbfbf;
        }
      }
    }
  }
  .mid_box {
    margin-top: 10px;
    background: #ffffff;
    .red_color{
      font-size: 12px;
      color:#ff0000;
    }
    .time {
      padding-top: 10px;
      font-size: 12px;
      color: #323233;
      text-align: center;
      .ti {
        vertical-align: middle;
        font-size: 14px;
        margin-right: 6px;
      }
    }
    .cont_game {
      box-sizing: border-box;
      padding: 20px;
      margin: 10px 10px;
      background: #f2f2ff;
      img {
        width: 38px;
        height: 38px;
      }
      .tit1 {
        font-size: 18px;
        font-weight: bold;
        span {
          padding: 0 5px;
        }
        span:nth-child(2) {
          font-size: 20px;
        }
      }
      .tit2 {
        font-size: 12px;
        color: #323233;
      }
      .ret_a {
        background: #ffffff;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-radius: 50px;
        margin-top: 20px;
        img {
          width: 24px;
          height: 24px;
        }
        .win {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }

  .footer_box {
    position: fixed;
    background: #ffffff;
    bottom: 0;
    width: 100%;
    font-size: 0.37333rem;
    .tit5 {
      font-size: 13px;
      padding: 20px 20px;
      background: #ff9900;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>