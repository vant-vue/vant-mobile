<template>
  <div class="selection_box">
    <div class="tab_box">
      <van-tabs v-model="active"
                swipeable
                @change="onTabChange">
        <van-tab v-for="(item,index) in tabList"
                 :key="index"
                 :index="index">
          <div slot="title">
            <span>{{item}}</span>
          </div>
          <!-- 足球 -->
          <div v-show="active == 0">
			 <div v-for="(v,k) in dataMatch">
				<van-cell @click="clickArrowDirection(k)"
						  :title="v.title"
						  is-link
						  :arrow-direction="v.arrowDirection" />
				<div class="list_box" v-for="(b,a) in v.list" v-show="v.arrowDirection=='down'">
				  <van-row type="flex"
						   align="center">
					<van-col span="6"></van-col>
					<van-col span="18"
							 class="tc">
					  <van-row>
						<van-col span="8"
								 class="tit1">{{b.h_cn_abbr}}</van-col>
						<van-col span="8">VS</van-col>
						<van-col span="8"
								 class="tit1">{{b.a_cn_abbr}}</van-col>
					  </van-row>
					</van-col>
				  </van-row>
				  <van-row type="flex"
						   align="center">
					<van-col span="6"
							 class="tc">
					  <div>{{b.num}}</div>
					  <div>{{b.l_cn_abbr}}</div>
					  <div>{{b.book_end_time.substring(11,16)}}截止</div>
					</van-col>
					<van-col span="18"
							 class="tc">
					  <table>
						<tr>
						  <td>0</td>
						  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['had']&&selectMap[b.id]['had']['h']}" @click="!b.had || selectMatch(b.id,'h','had')">
							胜 {{b.had?b.had.h:'-'}}
							<!-- 不满足需求可使用图片 -->
							<i :class="{'sanjiao':b.had&&b.had.single=='1'}"></i>
						  </td>
						  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['had']&&selectMap[b.id]['had']['d']}"  @click="!b.had || selectMatch(b.id,'d','had')">平 {{b.had?b.had.d:'-'}}</td>
						  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['had']&&selectMap[b.id]['had']['a']}"  @click="!b.had || selectMatch(b.id,'a','had')">负 {{b.had?b.had.a:'-'}}</td>
						  <td rowspan="2"
							  class="width32"
							  @click="isShow(b.id)" v-if="!selectMatchCountMap[b.id]">更多选项</td>
						  <td rowspan="2"
							  class="width32"
							  @click="isShow(b.id)" v-if="selectMatchCountMap[b.id]">已选<span style="color: #ff0000;">{{selectMatchCountMap[b.id]}}</span>项</td>
						</tr>
						<tr>
						  <td :class="{'red':b.hhad&&b.hhad.fixedodds.indexOf('+')!=-1,'green':b.hhad&&b.hhad.fixedodds.indexOf('-')!=-1}">{{b.hhad?b.hhad.fixedodds:'-'}}</td>
						  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['hhad']&&selectMap[b.id]['hhad']['h']}"  @click="!b.hhad || selectMatch(b.id,'h','hhad')">胜 {{b.hhad?b.hhad.h:'-'}}
							<i :class="{'sanjiao':b.hhad&&b.hhad.single=='1'}"></i>
						  </td>
						  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['hhad']&&selectMap[b.id]['hhad']['d']}"  @click="!b.hhad || selectMatch(b.id,'d','hhad')">平 {{b.hhad?b.hhad.d:'-'}}</td>
						  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['hhad']&&selectMap[b.id]['hhad']['a']}"  @click="!b.hhad || selectMatch(b.id,'a','hhad')">负 {{b.hhad?b.hhad.a:'-'}}</td>
						</tr>
					  </table>
					</van-col>
				  </van-row>
				</div>
			</div>
          </div>
          <!-- 篮球 -->
          <div v-show="active == 1">
			   <div v-for="(v,k) in dataMatch">
					<van-cell @click="clickArrowDirection(k)"
							  :title="v.title"
							  is-link
							  :arrow-direction="v.arrowDirection" />
					<div class="list_box"  v-for="(b,a) in v.list"  v-show="v.arrowDirection=='down'">
					  <van-row type="flex"
							   align="center">
						<van-col span="6"></van-col>
						<van-col span="18"
								 class="tc">
						  <van-row>
							<van-col span="8"
									 class="tit1">{{b.a_cn_abbr}}</van-col>
							<van-col span="8">VS</van-col>
							<van-col span="8"
									 class="tit1">{{b.h_cn_abbr}}</van-col>
						  </van-row>
						</van-col>
					  </van-row>
					  <van-row type="flex"
							   align="center">
						<van-col span="6"
								 class="tc">
						  <div>{{b.num}}</div>
						  <div>{{b.l_cn_abbr}}</div>
						  <div>{{b.book_end_time.substring(11,16)}}截止</div>
						</van-col>
						<van-col span="18"
								 class="tc">
						  <table>
							<tr>
							  <td>非让分</td> 
							  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['mnl']&&selectMap[b.id]['mnl']['a']}" @click="!b.mnl || selectMatch(b.id,'a','mnl')">
								<div>主负</div>
								<div>{{b.mnl?b.mnl.a:'-'}}</div>
								<!-- 不满足需求可使用图片 -->
								<i  :class="{'sanjiao':b.mnl&&b.mnl.single=='1'}"></i>
							  </td>
							  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['mnl']&&selectMap[b.id]['mnl']['h']}" @click="!b.mnl || selectMatch(b.id,'h','mnl')">
								<div>主胜</div>
								<div>{{b.mnl?b.mnl.h:'-'}}</div>
							  </td>
							  <td rowspan="2"
									  class="width32"
									  @click="isShowTwo(b.id)" v-if="!selectMatchCountMap[b.id]">更多选项</td>
							  <td rowspan="2"
									  class="width32"
									  @click="isShowTwo(b.id)" v-if="selectMatchCountMap[b.id]">已选<span style="color: #ff0000;">{{selectMatchCountMap[b.id]}}</span>项</td>
							</tr>
							<tr>
							  <td>让分</td>
							  <td :class="{'active':selectMap[b.id]&&selectMap[b.id]['hdc']&&selectMap[b.id]['hdc']['a']}" @click="!b.hdc || selectMatch(b.id,'a','hdc')">
								<div>主负</div>
								<div>{{b.hdc?b.hdc.a:'-'}}</div>
								<i  :class="{'sanjiao':b.hdc&&b.hdc.single=='1'}"></i>
							  </td>
							  <td  :class="{'active':selectMap[b.id]&&selectMap[b.id]['hdc']&&selectMap[b.id]['hdc']['h']}" @click="!b.hdc || selectMatch(b.id,'h','hdc')">
								<div>主胜</div>
								<div>{{b.hdc?b.hdc.h:'-'}}</div>
							  </td>
							</tr>
						  </table>
						</van-col>
					  </van-row>
					</div>
			</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 底部 -->
    <div class="footer_box">
      <div>
        <van-row class="tc"
                 type="flex"
                 align="center">
          <van-col span="18">
            <div class="tl">
              <van-icon class="ioc"
                        name="clear" @click="clearSelect" />
              <span class="tit1"
                    @click="isDialog">推单赔率限制说明</span>
            </div>
          </van-col>
          <van-col class="tit4"
                   span="6" @click="sureSubmit">
            <span>确定</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <switch-store-model ref="switchModel" :selectMap="selectMap"></switch-store-model>
    <switch-store-model-two ref="switchModelTwo"></switch-store-model-two>
  </div>
</template>
<script>
import { Toast } from 'vant';
import switchStoreModel from "./modules/switchStoreModel";
import switchStoreModelTwo from "./modules/switchStoreModelTwo";
import { getJson } from "@/api/api";
import {poolId} from "@/utils/Constant";
import {obj_sort_by,by_str,stringToDate,parseTime,getLen,cloneObject} from '@/utils/util'
export default {
  name: "selection_scheme",
  components: { switchStoreModel, switchStoreModelTwo },
  data() {
    return {
      active: 0,
      tabList: ["竞彩足球", "竞彩篮球"],
	  typeList: ["ht", "hhgg"],
	  seachMap:{
		  "type":"ht"
	  },
	  jsonData:{
		  
	  },
	  dataMatch:{},
	  selectMap:{},
	  selectCount:0,
	  selectMatchCountMap:{},
	  g_config:{
		  minute_before_playtime:5
	  },
	  nowTime:new Date().getTime(),
	  matchGame:{
	  			totalMatchCount:0
	  },
	  weekArr:{
				"周一":1,
				"周二":2,
				"周三":3,
				"周四":4,
				"周五":5,
				"周六":6,
				"周日":7
		},
		l_name_map:{}
    };
  }
  ,
  methods: {
    isShow(mid) {
	  this.$refs.switchModel.match = this.jsonData[mid];
	  let thisMap = this.selectMap[mid];
	  if(thisMap){
		  this.$refs.switchModel.selectModelMap[mid]= cloneObject(thisMap);
	  }else{
		  this.$refs.switchModel.selectModelMap = {};
	  }
      this.$refs.switchModel.show = true;
	  this.$forceUpdate();
    },
    isShowTwo(mid){
	  this.$refs.switchModelTwo.match = this.jsonData[mid];
	  let thisMap = this.selectMap[mid];
	  if(thisMap){
	  	 this.$refs.switchModelTwo.selectModelMap[mid]= thisMap;
	  }else{
	  	 this.$refs.switchModelTwo.selectModelMap = {};
	  }
      this.$refs.switchModelTwo.show = true;
	  this.$forceUpdate();
    },
	clearSelect(){
		this.selectMap={};
		this.selectCount =0;
		this.selectMatchCountMap = {};
	},
    onTabChange(tab) {
		this.dataMatch = {};
		this.jsonData = {};
		this.l_name_map = {};
		this.matchGame = {};
		this.matchGame.totalMatchCount =0;
		this.selectCount =0;
		this.selectMap = {};
		this.selectMatchCountMap = {};
		this.seachMap.type = this.typeList[this.active];
		this.loadData();
	},
    clickArrowDirection(k) {
      this.dataMatch[k].arrowDirection = this.dataMatch[k].arrowDirection == "down" ? "up" : "down";
    },
    isDialog() {
      this.$dialog
        .alert({
          title: "推单赔率限制说明",
          confirmButtonText: "我知道了",
          messageAlign: "left",
          message: `为保证大神推单用户的使用体验，现将发文时的赔率限制整理如下，请各位作者知悉并遵守。

	一、推荐单场 
		1、胜平负、让球单场最多可以双选，进球数、半全场、比分最多可以选4个推荐结果； 
		2、单选赔率需大于等于1.45； 
		3、双选最低赔率需大于等于2.65； 
		4、选择三个结果，最低赔率需大于等于4； 
		5、选择四个结果，最低赔率需大于等于5.5。

	二、推荐两场 
		1、推荐两场默认2串1，两场不仅需全部命中，而且需盈利才算红单。 
		2、串关推荐最低回报必须大于等于145%，竞彩、让球每场最多选择两个结果，其他玩法最多选择4个。`
        })
        .then(() => {
          // on close
        });
    },
	loadData(){
		var that = this;
		getJson(this.seachMap).then(res => {
            if (res.flag) {
              //调用成功
              let json = res.args.json;
			  that.jsonData = json.data
			  that.formatJson();
            }
          }).catch(err => {
            // 加载状态结束
            that.loading = false;
            that.finished = true;
          });
	},formatJson(){//格式化竞彩数据
		var json = this.jsonData;
		if(json){
			var dataMatch = {};
			var datearr=[];
			for(var id in json){
				var m = json[id];
				m.match_start_time = m.date + ' ' + m.time;
				var date = parseTime(m.match_start_time);
				var hour = date.getHours();
				if(date.getDay()==0 || date.getDay()==1){
					if(hour >= 1 && hour < 9){
						m.book_end_time = m.date+" 01:00:00";
					}else{
						if(hour==9 &&date.getMinutes()==0){
							m.book_end_time = m.date+" 01:00:00";
						}else{
							m.book_end_time = m.match_start_time;
						}
					}
				}else{
					if(hour >= 0 && hour < 9){
						m.book_end_time = m.date+" 00:00:00";
					}else{
						if(hour==9 &&date.getMinutes()==0){
							m.book_end_time = m.date+" 00:00:00";
						}else{
							m.book_end_time = m.match_start_time;
						}
				
					}
				}
				if(m.match_start_time < m.book_end_time){
					m.book_end_time = m.match_start_time;
				}
				m.bookEndTimeLong=parseTime(m.book_end_time).getTime();
				m.bookEndTimeLong = m.bookEndTimeLong-this.g_config.minute_before_playtime*60*1000;
				if(m.bookEndTimeLong<this.nowTime||(m.index_show==1&&m.show==0)){//截止
					continue;
				}
				
				if(m.crs&&m.crs.single==0&&m.ttg&&m.ttg.single==0){
					continue;
				}
				
				if(!this.matchGame[m.l_id]){
					this.matchGame[m.l_id]={};
					this.matchGame[m.l_id].matchCount = 0;
				}
				this.matchGame[m.l_id]['l_id'] = m.l_id;
				this.matchGame[m.l_id]['l_cn_abbr']=m.l_cn_abbr;
				this.matchGame[m.l_id]['l_cn']=m.l_cn;
				this.matchGame[m.l_id]['selected']=true;
				this.matchGame[m.l_id].matchCount++;
				this.matchGame.totalMatchCount++;
				
				m.book_end_time = stringToDate(new Date(m.bookEndTimeLong),"yyyy-MM-dd hh:mm:ss");
				var key = m.b_date+","+m.num.substring(0,2);
				var list = dataMatch[key];
				if(!list){
					datearr.push(key);//排序用的
					list=[];
					dataMatch[key]=list;
				}
				m.single=false;
				if(m.had && m.had.single==1){
					m.single=true;
				}
				if(m.hhad && m.hhad.single==1){
					m.single=true;
				}
				if(m.ttg&&m.ttg.single==1){
					m.single=true;
				}
				if(m.crs&&m.crs.single==1){
					m.single=true;
				}
				if(m.hafu&&m.hafu.single==1){
					m.single=true;
				}
				m.h_order=m.h_order==""?"":"["+m.h_order.replace(/\D/g,'')+"]";
				m.a_order=m.a_order==""?"":"["+m.a_order.replace(/\D/g,'')+"]";
				m.sort_id = m.b_date.replace(/-/g,"")+this.weekArr[m.num.substring(0,2)]+m.num.substring(2);
				this.jsonData[m.id]=m;
				this.l_name_map[m.l_cn_abbr] = "1";
				list.push(m);
			}
			for(var i=0;i<datearr.length;i++){
				var datestr = datearr[i];
				var list = dataMatch[datestr];
				var keyArr = datestr.split(",");
				var date = keyArr[0];
				var week = keyArr[1];
				var item = {};
				item.date = date;
				item.datetem = date.split("-")[0]+date.split("-")[1]+date.split("-")[2];
				item.week = week;
				item.list = list;
				item.show=true;
				item.hasChild = true;
				if(list!=null&&list.length>0){
					item.title = item.date+' '+item.week+' '+item.list.length+'场比赛';
					item.arrowDirection = "down";
					this.dataMatch[datestr]=item;
				}
			}
			for(var kk in this.dataMatch){
				this.dataMatch[kk].list.sort(by_str("sort_id"));
			}
			this.dataMatch = obj_sort_by(this.dataMatch,"datetem");
		}

	},
	selectMatch(mid,bet,lot){
		if(!this.selectMap[mid]){
			if(this.selectCount==2){
				return;
			}
			if(getLen(this.selectMap[mid])>=1){
				return;
			}
			this.selectMap[mid] = {};
			this.selectMap[mid][lot] = {};
			this.selectMap[mid][lot][bet] = this.jsonData[mid][lot][bet];
		}else{
			if(!this.selectMap[mid][lot]){
				return;
				//this.selectMap[mid][lot] = {};
				//this.selectMap[mid][lot][bet] = this.jsonData[mid][lot][bet];
			}else{
				if(this.selectMap[mid][lot][bet]){
					delete this.selectMap[mid][lot][bet];
					if(getLen(this.selectMap[mid][lot])==0){
						delete this.selectMap[mid][lot];
						if(getLen(this.selectMap[mid])==0){
							delete this.selectMap[mid];
						}
					}
				}else{
					let maxCount = 1;
					if(lot=="had"||lot=="hhad"){
						maxCount =2;
					}
					if(getLen(this.selectMap[mid][lot])<maxCount){
						//最多可以双选
						this.selectMap[mid][lot][bet] = this.jsonData[mid][lot][bet];
					}
				}
			}
		}
		this.caleCount();
		this.$forceUpdate();
	},caleCount(){
		this.selectCount = getLen(this.selectMap);
		this.selectMatchCountMap = {};
		if(this.selectMap&&this.selectCount>0){
			for(var key in this.selectMap){
				var count =0;
				if(this.selectMap[key]){
					for(var k in this.selectMap[key]){
						count +=  getLen(this.selectMap[key][k]);
					}
				}
				this.selectMatchCountMap[key] = count;
			}
		}
	},sureSubmit(){
		
		if(this.selectCount==0){
			//$.toast("请至少选择一场赛事", "forbidden");
			Toast.fail('请至少选择一场赛事');
			return;
		}
		var lMap = {};
		for(var key in this.selectMap){
			for(var k in this.selectMap[key]){
				if(k=='m'){
					continue;
				}
				lMap[k] = 1;
				if(this.selectCount==1&&this.jsonData[key][k].single!=1){
					//$.toast("非单关至少选择两场赛事", "forbidden");
					Toast.fail('非单关至少选择两场赛事');
					return;
				}
			}
			this.selectMap[key]['m'] = this.jsonData[key];
		}
		let lotteryId;
		if(getLen(lMap)>1){
			  if(this.active==0){
				  lotteryId = "59";
			  }else{
				  lotteryId = "69";
			  }
		}else{
			var lk;
			for(var jk in lMap){
				lk = jk;
			}
			lotteryId = poolId[lk];
		}
		var passway = this.selectCount+"x"+1;
		this.$router.push({name: 'queryScheme',params:{"selectMap":this.selectMap,"lotteryId":lotteryId,"passway":passway}});
	}
  },mounted() {
		this.loadData();//加载数据
	 }
};
</script>
<style lang="less" scoped>
.selection_box {
  table {
    background: #fff;
    width: 100%;
    text-align: center; /*文本居中*/
    border-collapse: collapse; /*表格的边框合并，如果相邻，则共用一个边框*/
    border-spacing: 0; /*设置行与单元格边框的间距。当表格边框独立（即border-collapse:separate;）此属性才起作用*/
    tr {
      padding: 0;
    }
    td {
      position: relative;
      padding: 0;
      font-size: 12px;
      border-right: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      padding: 8px 5px;
      .sanjiao {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-top: 15px solid red;
        border-right: 15px solid transparent;
        font-size: 10px;
      }
    }
	td.red {
	  color: #ff0000;
	}
	td.active{
		background:#ff0000;
		color:#fff;
	}
	td.green {
	  color: green;
	}
    .width32 {
      width: 32px;
    }
  }
  .tab_box {
    padding-bottom: 100px;
    .list_box {
      padding: 0.42667rem;
      color: #969799;
      font-size: 0.34667rem;
      line-height: 1.5;
      background-color: #f5f5f5;
      border-bottom: 1px solid #bfbfbb;
      .tit1 {
        font-size: 14px;
        font-weight: bold;
        color: #000;
      }
    }
    .list_box:last-child {
      border: 0;
    }
  }
  .footer_box {
    position: fixed;
    background: #ffffff;
    bottom: 0;
    width: 100%;
    font-size: 0.37333rem;
    .ioc {
      font-size: 30px;
      color: #bfbfbf;
      vertical-align: middle;
      margin-left: 20px;
    }
    .tit1 {
      font-size: 14px;
      margin-left: 20px;
      color: #199ed8;
    }
    .tit4 {
      padding: 20px 0;
      span {
        padding: 10px 25px;
        border-radius: 5px;
        background: #ff9900;
        color: #ffffff;
      }
    }
  }
}
</style>