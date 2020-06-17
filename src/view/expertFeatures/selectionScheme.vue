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
            <van-cell @click="clickArrowDirection"
                      title="2018-11-31  周一  14场比赛"
                      is-link
                      :arrow-direction="arrowDirection" />
            <div class="list_box">
              <van-row type="flex"
                       align="center">
                <van-col span="6"></van-col>
                <van-col span="18"
                         class="tc">
                  <van-row>
                    <van-col span="8"
                             class="tit1">墨尔本城</van-col>
                    <van-col span="8">VS</van-col>
                    <van-col span="8"
                             class="tit1">悉尼FC</van-col>
                  </van-row>
                </van-col>
              </van-row>
              <van-row type="flex"
                       align="center">
                <van-col span="6"
                         class="tc">
                  <div>周三001</div>
                  <div>澳洲甲</div>
                  <div>16:40截止</div>
                </van-col>
                <van-col span="18"
                         class="tc">
                  <table>
                    <tr>
                      <td>0</td>
                      <td>
                        胜 2.01
                        <!-- 不满足需求可使用图片 -->
                        <i class="sanjiao"></i>
                      </td>
                      <td>平 2.01</td>
                      <td>负 2.01</td>
                      <td rowspan="2"
                          class="width32"
                          @click="isShow">更多选项</td>
                    </tr>
                    <tr>
                      <td>+1</td>
                      <td>胜 2.01</td>
                      <td>平 2.01</td>
                      <td>负 2.01</td>
                    </tr>
                  </table>
                </van-col>
              </van-row>
            </div>
            <div class="list_box">
              <van-row type="flex"
                       align="center">
                <van-col span="6"></van-col>
                <van-col span="18"
                         class="tc">
                  <van-row>
                    <van-col span="8"
                             class="tit1">墨尔本城</van-col>
                    <van-col span="8">VS</van-col>
                    <van-col span="8"
                             class="tit1">悉尼FC</van-col>
                  </van-row>
                </van-col>
              </van-row>
              <van-row type="flex"
                       align="center">
                <van-col span="6"
                         class="tc">
                  <div>周三001</div>
                  <div>澳洲甲</div>
                  <div>16:40截止</div>
                </van-col>
                <van-col span="18"
                         class="tc">
                  <table>
                    <tr>
                      <td>0</td>
                      <td>
                        胜 2.01
                        <!-- 不满足需求可使用图片 -->
                        <i class="sanjiao"></i>
                      </td>
                      <td>平 2.01</td>
                      <td>负 2.01</td>
                      <td rowspan="2"
                          class="width32"
                          @click="isShow">更多选项</td>
                    </tr>
                    <tr>
                      <td>+1</td>
                      <td>胜 2.01</td>
                      <td>平 2.01</td>
                      <td>负 2.01</td>
                    </tr>
                  </table>
                </van-col>
              </van-row>
            </div>
          </div>
          <!-- 篮球 -->
          <div v-show="active == 1">
            <van-cell @click="clickArrowDirection"
                      title="2018-11-31  周一  14场比赛"
                      is-link
                      :arrow-direction="arrowDirection" />
            <div class="list_box">
              <van-row type="flex"
                       align="center">
                <van-col span="6"></van-col>
                <van-col span="18"
                         class="tc">
                  <van-row>
                    <van-col span="8"
                             class="tit1">老鹰</van-col>
                    <van-col span="8">VS</van-col>
                    <van-col span="8"
                             class="tit1">黄蜂</van-col>
                  </van-row>
                </van-col>
              </van-row>
              <van-row type="flex"
                       align="center">
                <van-col span="6"
                         class="tc">
                  <div>301</div>
                  <div>NBA</div>
                  <div>16:40截止</div>
                </van-col>
                <van-col span="18"
                         class="tc">
                  <table>
                    <tr>
                      <td>非让分</td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                        <!-- 不满足需求可使用图片 -->
                        <i class="sanjiao"></i>
                      </td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                      </td>
                      <td rowspan="2"
                          class="width32"
                          @click="isShowTwo">更多选项</td>
                    </tr>
                    <tr>
                      <td>让分</td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                      </td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                      </td>
                    </tr>
                  </table>
                </van-col>
              </van-row>
            </div>
            <div class="list_box">
              <van-row type="flex"
                       align="center">
                <van-col span="6"></van-col>
                <van-col span="18"
                         class="tc">
                  <van-row>
                    <van-col span="8"
                             class="tit1">老鹰</van-col>
                    <van-col span="8">VS</van-col>
                    <van-col span="8"
                             class="tit1">黄蜂</van-col>
                  </van-row>
                </van-col>
              </van-row>
              <van-row type="flex"
                       align="center">
                <van-col span="6"
                         class="tc">
                  <div>301</div>
                  <div>NBA</div>
                  <div>16:40截止</div>
                </van-col>
                <van-col span="18"
                         class="tc">
                  <table>
                    <tr>
                      <td>非让分</td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                        <!-- 不满足需求可使用图片 -->
                        <i class="sanjiao"></i>
                      </td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                      </td>
                      <td rowspan="2"
                          class="width32"
                          @click="isShowTwo">更多选项</td>
                    </tr>
                    <tr>
                      <td>让分</td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                      </td>
                      <td>
                        <div>主负</div>
                        <div>2.30</div>
                      </td>
                    </tr>
                  </table>
                </van-col>
              </van-row>
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
                        name="clear" />
              <span class="tit1"
                    @click="isDialog">推单赔率限制说明</span>
            </div>
          </van-col>
          <van-col class="tit4"
                   span="6">
            <span>确定</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <switch-store-model ref="switchModel"></switch-store-model>
    <switch-store-model-two ref="switchModelTwo"></switch-store-model-two>
  </div>
</template>
<script>
import switchStoreModel from "./modules/switchStoreModel";
import switchStoreModelTwo from "./modules/switchStoreModelTwo";
import { getJson,pubRec } from "@/api/api";
import {obj_sort_by,by_str,formatDate} from '@/utils/util'
export default {
  name: "selection_scheme",
  components: { switchStoreModel, switchStoreModelTwo },
  data() {
    return {
      active: 0,
      tabList: ["竞彩足球", "竞彩篮球"],
      arrowDirection: "down",
	  seachMap:{
		  "type":"ht"
	  },
	  jsonData:{
		  
	  },
	  dataMatch:{},
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
		l_name_map:{},
    };
  },
  methods: {
    isShow() {
      this.$refs.switchModel.show = true;
    },
    isShowTwo(){
      this.$refs.switchModelTwo.show = true;
    },
    onTabChange(tab) {},
    clickArrowDirection() {
      this.arrowDirection = this.arrowDirection == "down" ? "up" : "down";
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
		getJson(this.seachMap).then(res => {
            if (res.flag) {
              //调用成功
              let json = res.args.json;
			  this.jsonData = json;
			  this.formatJson();
            }
          }).catch(err => {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
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
				
				m.book_end_time = formatDate(new Date(m.bookEndTimeLong),"yyyy-MM-dd hh:mm:ss");
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
					this.dataMatch[datestr]=item;
				}
			}
			for(var kk in this.dataMatch){
				this.dataMatch[kk].list.sort(by_str("sort_id"));
			}
			this.dataMatch = obj_sort_by(this.dataMatch,"datetem");
		}

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