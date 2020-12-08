<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="content_box">
        <div>
          <div class="game_box" v-for="(v,k) in this.showMap">
            <div class="top">{{v.m.num}} {{v.m.h_cn_abbr}} VS {{v.m.a_cn_abbr}}</div>
            <van-row gutter="20"
                     class="tc">
              <van-col span="8" v-for="(a,b) in v.arr">
                <div class="game">
                  <div class="t1">{{paramsMap.lotEnMap[a.lot]}}</div>
                  <div class="t2">{{paramsMap[a.lot][a.bet]}} {{a.odd}}</div>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <van-row type="flex"
                 align="center">
          <van-col span="12">
            单倍奖金：
          </van-col>
          <van-col class="tr fb"
                   span="12">
            {{scp.order?scp.order.orderAwardMin:''}}-{{scp.order?scp.order.orderAwardMax:''}}
          </van-col>
        </van-row>
      </div>
      <div class="content_box">
        <div v-if="level>1"
             class="data_box">
          <van-row type="flex"
                   align="center">
            <van-col span="9"
                     class="tr">
              <span class="t1">查看价格</span>
            </van-col>
            <van-col span="15"
                     class="tl">
              <van-stepper class="t2"
                           v-model="value"
                           input-width="80px"
                           button-size="30px" min="0" max="99" :decimal-length="2" async-change @change="onChange" @blur="numFilter"/>
            </van-col>
          </van-row>
          <van-row gutter="20"
                   class="tc">
            <van-col span="5"
                     class="select_box" v-if="a<=maxPrice" :class="{'checked':a==value}" @click="selectMe(a)" v-for="a in priceList">
              {{a==0?'免费':dealDecimal(a)}}
            </van-col>
          </van-row>
          <van-row class="switch_box"
                   type="flex"
                   align="center">
            <van-col class="sw_b">
              <van-switch size="18px"
                          v-model="checked" />
            </van-col>
            <van-col span="15">
              <span>不中退款</span>
            </van-col>
          </van-row>
        </div>
        <div v-if="level==1"
             class="no_data_box">
          <van-icon class="ioc"
                    name="question-o" />
          <span>您尚未获得收费资格，点击查看</span>
          <span class="fot_blue"
                @click="isDialog">【专家升降级制度】</span>
        </div>
      </div>
      <div class="content_box">
        <van-field v-model="value2"
                   label="标题"
                   required
                   placeholder="请输入本场推荐标题" maxlength="36"/>
        <van-field v-model="message"
                   rows="4"
                   autosize
                   label="观点"
                   type="textarea"
                   maxlength="480"
                   placeholder="请输入您对本次赛事搭配的分析看法"
                   show-word-limit />
      </div>
      <!-- 底部 -->
      <div class="footer_box" @click="sureSubmit">
        <div>
          <div class="tit5">确认发布</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import { Toast } from 'vant';
import { getUserIsExpert,pubRec } from "@/api/api";
import {paramsMap,betParamMap,betEnMap} from "@/utils/Constant";
import {obj_sort_by,by_str,stringToDate,parseTime,getLen,cloneObject,dealDecimal} from '@/utils/util'
export default {
  name: "queryScheme",
  data() {
    return {
      value: 8.8,
	  priceList:[0,8.8,18,38,58,68,88],
	  levelMap:{2:18,3:58,4:99},
      value2: "",
	  hasExpert:true,
	  level:2,
	  maxPrice:18,
	  isFree:0,
      checked: true,
      message: "",
	  selectMap:this.$route.params.selectMap,
	  passway:this.$route.params.passway,
	  showMap:{},
	  paramsMap:paramsMap,
	  lotteryId:this.$route.params.lotteryId,
	  matchNumber:'',
	  lAbbr:'',
	  scp:{
		  minJjyhMoney:0,
		  getPassWay:function(){
		  	  var pass = this.passway;
		  	  var passwayArr = [];
		  	  passwayArr.push(pass);
		  	  return passwayArr;
		  }
		},
		dealDecimal:dealDecimal
    };
  },
  methods: {
    isDialog() {
      this.$dialog
        .alert({
          title: "推单赔率限制说明",
          confirmButtonText: "我知道了",
          messageAlign: "left",
          message: `竞彩足球专家升级制度

　　免费作者升级规则：(满足任何一个条件可升级)

　　1.1、免费作者一周(7天)推荐达到或者超过5单，胜率达到65%升级为收费作者。

　　1.2、免费作者一周(7天)推荐达到或者超过5单，回报率达到200%升级为收费作者。

　　注：计算周期为周一凌晨到第二周周一早上10:00前完场的方案计算，周一10:00后系统自动升级前一周的晋级作者。按照推荐第一场比赛开始时间计算，而不是按照发帖时间。比如周日下午发起一贴，比赛时间是周一，那么这个贴算做周一的单。`
        })
        .then(() => {
          // on close
        });
    },calcMoney(){
	  jczq.vm =this.scp;
	  var reObj = jczq.bet.main();
	  this.scp.order.betnum = reObj.betNum; 
	  this.scp.order.followMoney=this.scp.order.betnum*2;
	  this.scp.order.orderMoney = (this.scp.order.betnum*this.scp.order.betMul*2);
	  this.scp.order.orderAwardMin = reObj.min.toFixed(2);
	  this.scp.order.orderAwardMax = reObj.max.toFixed(2);
	},checkUserExpert(){
		var that = this;
		getUserIsExpert({}).then(res => {
		    if (res.flag) {
		      //调用成功
			  this.hasExpert = res.args.isExpert;
			  if(!this.hasExpert){
				  this.$router.go(-1);
				  return;
			  }
			  if(res.args.level){
				  this.level = res.args.level;
				 this.maxPrice = this.levelMap[this.level];
			  }
		    }
		  }).catch(err => {
		    // 加载状态结束
		    that.loading = false;
		    that.finished = true;
		  });
	},getRecommendType(){
		let passway = this.passway;
		let lotteryId = this.lotteryId;
		if(passway=="2x1"){
			return 2;
		}
		if(lotteryId=="53"){//进球数
			return 3;
		}
		if(lotteryId=="54"){//半全场
			return 4;
		}
		if(lotteryId=="51" || lotteryId=="56"){//单关
			return 5;
		}
		if(parseInt(lotteryId)>60){//篮球
			return 6;
		}
		return 5
	},
	getMinFollowMoney(){
		if(this.level==1){
			return this.scp.order.orderMoney;
		}
		let price = parseFloat(this.value);
		let money = parseInt(price/0.05);
		if(money%2>0){
			money = money+1;
		}
		return money;
	},
	getContent(){
		let selectMap = this.selectMap;
		let contentMap = [];
		for(let k in selectMap){
			let obj = selectMap[k];
			let content = {
				lname:obj.m.l_cn_abbr,
				visiting_team:obj.m.a_cn_abbr,
				home_team:obj.m.h_cn_abbr,
				mid:k,
				num:obj.m.num,
				h_id:obj.m.h_id,
				a_id:obj.m.a_id
			};
			for(let a in obj){
				if(a!='m'){
					content[a] = obj[a];
					if(a=="hhad"||a=="hdc" || a=="hilo"){//加入盘口
						content[a].pankou = obj.m[a].fixedodds;
					}
				}
			}
			contentMap.push(content);
		}
		return JSON.stringify(contentMap);
	},numFilter() {// 截取当前数据到小数点后两位
			if(isNaN(this.value)){
				  this.value = 0;
				  this.isFree =1;
				  return;
			}
			if(this.value>this.maxPrice){
				this.value = this.maxPrice;
			}
			if(this.value==0){
				this.isFree =1;
			}else{
				this.isFree =0;
			}
	  },selectMe(val){
		  this.value = val;
		  if(this.value==0){
		  	this.isFree =1;
		  }else{
		  	this.isFree =0;
		  }
	  },onChange(value) {
        // 注意此时修改 value 后会再次触发 change 事件
		if(value>this.maxPrice){
			this.value = this.maxPrice;
		}else{
			 this.value = value;
		}
		if(this.value==0){
			this.isFree =1;
		}else{
			this.isFree =0;
		}
    },sureSubmit(){//确认提交
		if(!this.value2){
			//$.toast("请输入推荐标题", "forbidden");
			Toast.fail('请输入推荐标题');
			return;
		}
		let recommendType = this.getRecommendType();
		let minFollowMoney = this.getMinFollowMoney();
		let pmap = {
			title:this.value2,
			summary:this.message,
			singleMoney:this.scp.order.orderMoney,
			singleBonus:this.scp.order.orderAwardMax,
			recommendType:recommendType,
			payMoney:this.isFree==0?this.value:null,
			passway:this.passway,
			noWinBack:this.level>1?(this.checked?1:0):0,
			mtype:recommendType<6?1:2,
			minFollowMoney:minFollowMoney,
			matchNumber:this.matchNumber,
			lotteryId:this.lotteryId,
			lAbbr:this.lAbbr,
			isFree:this.isFree,
			content:this.getContent()
		}
		pubRec(pmap).then(res => {
		    if (res.flag) {
		      //调用成功
			 Toast.success('提交成功');
			 setTimeout(function(){
				 this.$router.push('order');
			 },1000);
		    }
		  }).catch(err => {
		    // 加载状态结束
		    that.loading = false;
		    that.finished = true;
		  });
		
	}
  },mounted() {
	  
	  //引入外部js
	  const oScript = document.createElement('script');
	  oScript.type = 'text/javascript';
	  oScript.src = '/dist/jczq.js';
	  document.body.appendChild(oScript);
	  const oPScript = document.createElement('script');
	  oPScript.type = 'text/javascript';
	  oPScript.src = '/dist/optimize.js';
	  
	  document.body.appendChild(oPScript);
	  
	let mp = this.selectMap;
	if(!mp||getLen(mp)==0){
		this.$router.go(-1);
		return;
	}
	for(let k in mp){
		var map = mp[k];
		this.showMap[k] = {"m":map.m};
		var arr = [];
		for(var kk in map){
			if(kk!='m'){
				for(var jk in map[kk]){
					var obj = {};
					obj.sort = betParamMap[kk][jk];
					obj.odd = map[kk][jk];
					obj.bet = jk;
					obj.lot = kk;
					if(map['m'][kk].fixedodds){
						obj.pankou = map['m'][kk].fixedodds;
					}
					arr.push(obj);
				}
			}
		}
		arr.sort(by_str("sort")).reverse();
		this.showMap[k].arr = arr;
		this.matchNumber = this.matchNumber+","+k;
		this.lAbbr = this.lAbbr+","+map.m.l_cn_abbr;
	}
	this.matchNumber.substring(1);
	this.lAbbr.substring(1);
	//计算奖金
	this.scp.g_config = {};
	this.scp.g_config.lottery_type = betParamMap.lotteryId[this.lotteryId+""];
	this.scp.selectMatchMap = this.selectMap;
	this.scp.betCnMap = this.paramsMap;
	this.scp.betEnMap = betEnMap;
	this.scp.passway = this.passway;
	  //订单计算后数据
	var betMul = 1;
	this.scp.order={betMul:betMul,betnum:0,orderMoney:0,orderMoneyJjyh:100,orderAwardMin:0,orderAwardMax:0,followAllow:true,followMoney:0};
	
	this.calcMoney();
	//this.checkUserExpert();
  }
};
</script>
<style lang="less" scoped>
.content_box {
  padding: 10px;
  margin: 10px 10px 0;
  border-radius: 5px;
  background: #ffffff;
  font-size: 14px;
  .game_box {
    border-bottom: 1px solid #bfbfbf;
    margin-bottom: 10px;
    .game {
      padding: 10px 0;
      .t1 {
        font-size: 12px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: #ff9900;
        color: #fff;
        padding: 5px 0;
      }
      .t2 {
        background: #f2f2f2;
        padding: 5px 0;
      }
    }
  }
  .game_box:last-child {
    border-bottom: 0;
  }
  .data_box {
    .t1 {
      padding-right: 10px;
    }
    .select_box {
      border: 1px solid #ff9900;
      margin-top: 10px;
      margin-left: 10px;
      padding: 5px;
      border-radius: 5px;
    }
    .select_box.checked {
      color: #fff;
      background: #ff9900;
    }
    .switch_box {
      margin-top: 10px;
      .sw_b {
        padding: 6px 10px 0 0;
        vertical-align: middle;
      }
    }
  }
  .no_data_box {
    padding: 10px 0;
    font-size: 12px;
    .ioc {
      font-size: 16px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .fot_blue {
      color: #3399ff;
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
    padding: 15px 20px;
    background: #ff9900;
    color: #ffffff;
    text-align: center;
  }
}
</style>