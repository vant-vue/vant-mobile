<template>
  <van-overlay :show="show"
               @click="close">
    <div class="wrapper">
      <div class="block" @click.stop>
        <van-row class="top tc"
                 type="flex"
                 align="center">
         <van-col span="8"
                   class="tit1">{{match.h_cn_abbr}}</van-col>
          <van-col span="8">VS</van-col>
          <van-col span="8"
                   class="tit1">{{match.a_cn_abbr}}</van-col>
        </van-row>
        <!-- 胜平负/让球 -->
        <div class="title">胜平负/让球</div>
       <table>
          <tr>
            <td class="width10">0</td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['had']&&selectModelMap[match.id]['had']['h']}" @click="!match.had || selectMatch(match.id,'h','had')">
              胜 {{match.had?match.had.h:'-'}}
              <i :class="{'sanjiao':match.had&&match.had.single=='1'}"></i>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['had']&&selectModelMap[match.id]['had']['d']}" @click="!match.had || selectMatch(match.id,'d','had')">平 {{match.had?match.had.d:'-'}}</td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['had']&&selectModelMap[match.id]['had']['a']}" @click="!match.had || selectMatch(match.id,'a','had')">负 {{match.had?match.had.a:'-'}}</td>
          </tr>
          <tr>
            <td class="green">{{match.hhad?match.hhad.fixedodds:'-'}}</td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hhad']&&selectModelMap[match.id]['hhad']['h']}" @click="!match.hhad || selectMatch(match.id,'h','hhad')">胜 {{match.hhad?match.hhad.h:'-'}}
			 <i :class="{'sanjiao':match.hhad&&match.hhad.single=='1'}"></i></td>
            <td   :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hhad']&&selectModelMap[match.id]['hhad']['d']}" @click="!match.hhad || selectMatch(match.id,'d','hhad')">平 {{match.hhad?match.hhad.d:'-'}}</td>
            <td   :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hhad']&&selectModelMap[match.id]['hhad']['a']}" @click="!match.hhad || selectMatch(match.id,'a','hhad')">负 {{match.hhad?match.hhad.a:'-'}}</td>
          </tr>
        </table>
        <!-- 单 -->
        <div class="title"><span class="dan">单</span><span>比分</span></div>
        <table class="table_type_1">
          <tr>
            <td rowspan="3"
                class="width10">胜</td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0100']}"
			 @click="!match.crs || selectMatch(match.id,'0100','crs')">
              <div>1:0</div>
              <div>{{match.crs?match.crs["0100"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0200']}"
			 @click="!match.crs || selectMatch(match.id,'0200','crs')">
              <div>2:0</div>
              <div>{{match.crs?match.crs["0200"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0201']}"
			 @click="!match.crs || selectMatch(match.id,'0201','crs')">
              <div>2:1</div>
              <div>{{match.crs?match.crs["0201"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0300']}"
			 @click="!match.crs || selectMatch(match.id,'0300','crs')">
              <div>3:0</div>
              <div>{{match.crs?match.crs["0300"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0301']}" 
			@click="!match.crs || selectMatch(match.id,'0301','crs')">
              <div>3:1</div>
              <div>{{match.crs?match.crs["0301"]:'-'}}</div>
            </td>
          </tr>
          <tr>

            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0302']}" 
			@click="!match.crs || selectMatch(match.id,'0302','crs')">
              <div>3:2</div>
              <div>{{match.crs?match.crs["0302"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0400']}" 
			@click="!match.crs || selectMatch(match.id,'0400','crs')">
              <div>4:0</div>
              <div>{{match.crs?match.crs["0400"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0401']}" 
			@click="!match.crs || selectMatch(match.id,'0401','crs')">
              <div>4:1</div>
              <div>{{match.crs?match.crs["0401"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0402']}" 
			@click="!match.crs || selectMatch(match.id,'0402','crs')">
              <div>4:2</div>
              <div>{{match.crs?match.crs["0402"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0500']}" 
			@click="!match.crs || selectMatch(match.id,'0500','crs')">
              <div>5:0</div>
              <div>{{match.crs?match.crs["0500"]:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0501']}" 
			@click="!match.crs || selectMatch(match.id,'0501','crs')">
              <div>5:1</div>
              <div>{{match.crs?match.crs["0501"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0502']}" 
			@click="!match.crs || selectMatch(match.id,'0502','crs')">
              <div>5:2</div>
              <div>{{match.crs?match.crs["0502"]:'-'}}</div>
            </td>
            <td colspan="3"  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['-1-h']}" 
			@click="!match.crs || selectMatch(match.id,'-1-h','crs')">
              <div>胜其他</div>
              <div>{{match.crs?match.crs["-1-h"]:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td class="width10">平</td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0000']}" 
			@click="!match.crs || selectMatch(match.id,'0000','crs')">
              <div>0:0</div>
              <div>{{match.crs?match.crs["0000"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0101']}" 
			@click="!match.crs || selectMatch(match.id,'0101','crs')">
              <div>1:1</div>
              <div>{{match.crs?match.crs["0101"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0202']}" 
			@click="!match.crs || selectMatch(match.id,'0202','crs')">
              <div>2:2</div>
              <div>{{match.crs?match.crs["0202"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0303']}" 
			@click="!match.crs || selectMatch(match.id,'0303','crs')">
              <div>3:3</div>
              <div>{{match.crs?match.crs["0303"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['-1-d']}" 
			@click="!match.crs || selectMatch(match.id,'-1-d','crs')">
              <div>平其他</div>
              <div>{{match.crs?match.crs["-1-d"]:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td rowspan="3"
                class="width10">负</td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0001']}" 
			@click="!match.crs || selectMatch(match.id,'0001','crs')">
              <div>0:1</div>
              <div>{{match.crs?match.crs["0001"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0002']}" 
			@click="!match.crs || selectMatch(match.id,'0002','crs')">
              <div>0:2</div>
              <div>{{match.crs?match.crs["0002"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0102']}" 
			@click="!match.crs || selectMatch(match.id,'0102','crs')">
              <div>1:2</div>
              <div>{{match.crs?match.crs["0102"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0003']}" 
			@click="!match.crs || selectMatch(match.id,'0003','crs')">
              <div>0:3</div>
              <div>{{match.crs?match.crs["0003"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0103']}" 
			@click="!match.crs || selectMatch(match.id,'0103','crs')">
              <div>1:3</div>
              <div>{{match.crs?match.crs["0103"]:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0203']}" 
			@click="!match.crs || selectMatch(match.id,'0203','crs')">
              <div>2:3</div>
              <div>{{match.crs?match.crs["0203"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0004']}" 
			@click="!match.crs || selectMatch(match.id,'0004','crs')">
              <div>0:4</div>
              <div>{{match.crs?match.crs["0004"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0104']}" 
			@click="!match.crs || selectMatch(match.id,'0104','crs')">
              <div>1:4</div>
              <div>{{match.crs?match.crs["0104"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0204']}" 
			@click="!match.crs || selectMatch(match.id,'0204','crs')">
              <div>2:4</div>
              <div>{{match.crs?match.crs["0204"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0005']}" 
			@click="!match.crs || selectMatch(match.id,'0005','crs')">
              <div>0:5</div>
              <div>{{match.crs?match.crs["0005"]:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0105']}" 
			@click="!match.crs || selectMatch(match.id,'0105','crs')">
              <div>1:5</div>
              <div>{{match.crs?match.crs["0105"]:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['0205']}" 
			@click="!match.crs || selectMatch(match.id,'0205','crs')">
              <div>2:5</div>
              <div>{{match.crs?match.crs["0205"]:'-'}}</div>
            </td>
            <td colspan="3"  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['crs']&&selectModelMap[match.id]['crs']['-1-a']}" 
			@click="!match.crs || selectMatch(match.id,'-1-a','crs')">
              <div>负其他</div>
              <div>{{match.crs?match.crs["-1-a"]:'-'}}</div>
            </td>
          </tr>
        </table>
        <!-- 总进球 -->
        <div class="title"><span class="dan">单</span><span>总进球</span></div>
        <table class="table_type_1">
          <tr>
            <td rowspan="2"
                class="width10">总进球</td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s0']}" 
			@click="!match.ttg || selectMatch(match.id,'s0','ttg')">
              <div>0</div>
              <div>{{match.ttg?match.ttg.s0:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s1']}" 
			@click="!match.ttg || selectMatch(match.id,'s1','ttg')">
              <div>1</div>
              <div>{{match.ttg?match.ttg.s1:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s2']}" 
			@click="!match.ttg || selectMatch(match.id,'s2','ttg')">
              <div>2</div>
              <div>{{match.ttg?match.ttg.s2:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s3']}" 
			@click="!match.ttg || selectMatch(match.id,'s3','ttg')">
              <div>3</div>
              <div>{{match.ttg?match.ttg.s3:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s4']}" 
			@click="!match.ttg || selectMatch(match.id,'s4','ttg')">
              <div>4</div>
              <div>{{match.ttg?match.ttg.s4:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s5']}" 
			@click="!match.ttg || selectMatch(match.id,'s5','ttg')">
              <div>5</div>
              <div>{{match.ttg?match.ttg.s5:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s6']}" 
			@click="!match.ttg || selectMatch(match.id,'s6','ttg')">
              <div>6</div>
              <div>{{match.ttg?match.ttg.s6:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['ttg']&&selectModelMap[match.id]['ttg']['s7']}" 
			@click="!match.ttg || selectMatch(match.id,'s7','ttg')">
              <div>7+</div>
              <div>{{match.ttg?match.ttg.s7:'-'}}</div>
            </td>
          </tr>
        </table>
        <!-- 半全场 -->
        <div class="title"><span class="dan">单</span><span>半全场</span></div>
        <table class="table_type_1">
          <tr>
            <td rowspan="3"
                class="width10">半全场</td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['hh']}" 
			@click="!match.hafu || selectMatch(match.id,'hh','hafu')">
              <div>胜胜</div>
              <div>{{match.hafu?match.hafu.hh:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['hd']}" 
			@click="!match.hafu || selectMatch(match.id,'hd','hafu')">
              <div>胜平</div>
              <div>{{match.hafu?match.hafu.hd:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['ha']}" 
			@click="!match.hafu || selectMatch(match.id,'ha','hafu')">
              <div>胜负</div>
              <div>{{match.hafu?match.hafu.ha:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['dh']}" 
			@click="!match.hafu || selectMatch(match.id,'dh','hafu')">
              <div>平胜</div>
              <div>{{match.hafu?match.hafu.dh:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['dd']}" 
			@click="!match.hafu || selectMatch(match.id,'dd','hafu')">
              <div>平平</div>
              <div>{{match.hafu?match.hafu.dd:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['da']}" 
			@click="!match.hafu || selectMatch(match.id,'da','hafu')">
              <div>平负</div>
              <div>{{match.hafu?match.hafu.da:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['ah']}" 
			@click="!match.hafu || selectMatch(match.id,'ah','hafu')">
              <div>负胜</div>
              <div>{{match.hafu?match.hafu.ah:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['ad']}" 
			@click="!match.hafu || selectMatch(match.id,'ad','hafu')">
              <div>负平</div>
              <div>{{match.hafu?match.hafu.ad:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hafu']&&selectModelMap[match.id]['hafu']['aa']}" 
			@click="!match.hafu || selectMatch(match.id,'aa','hafu')">
              <div>负负</div>
              <div>{{match.hafu?match.hafu.aa:'-'}}</div>
            </td>
          </tr>
        </table>
        <!-- 按钮 -->
        <van-row class="fot tc"
                 type="flex"
                 align="center">
          <van-col span="12">
            <div class="close" @click="close">取消</div>
          </van-col>
          <van-col span="12">
            <div class="ok" @click="sureSelect">确定</div>
          </van-col>
        </van-row>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import {obj_sort_by,by_str,stringToDate,cloneObject,getLen} from '@/utils/util'
export default {
  name: "switchStoreModel",
  components: {},
  data() {
    return {
      show: false,
	  selectModelMap:{},
	  match:{}
    };
  },
  methods: {
    close() {
	  if(this.selectModelMap&&this.selectModelMap[this.match.id]){
		  this.selectModelMap = {};
	  }
      this.show = false;
    },
	sureSelect(){
		if(this.selectModelMap&&this.selectModelMap[this.match.id]){
		    this.$parent.selectMap[this.match.id] = cloneObject(this.selectModelMap[this.match.id]);
		}else{
			if(this.$parent.selectMap[this.match.id]){
				delete this.$parent.selectMap[this.match.id];
			}
		}
		this.show = false;
		this.$parent.caleCount();
		this.$parent.$forceUpdate();
	},
	selectMatch(mid,bet,lot){
		if(!this.selectModelMap[mid]){
			if(this.$parent.selectCount==2){
				return;
			}
			if(getLen(this.selectModelMap[mid])>=1){
				return;
			}
			this.selectModelMap[mid] = {};
			this.selectModelMap[mid][lot] = {};
			this.selectModelMap[mid][lot][bet] = this.match[lot][bet];
		}else{
			if(!this.selectModelMap[mid][lot]){
				return;
				//this.selectModelMap[mid][lot] = {};
				//this.selectModelMap[mid][lot][bet] = this.match[lot][bet];
			}else{
				if(this.selectModelMap[mid][lot][bet]){
					delete this.selectModelMap[mid][lot][bet];
					if(getLen(this.selectModelMap[mid][lot])==0){
						delete this.selectModelMap[mid][lot];
						if(getLen(this.selectModelMap[mid])==0){
							delete this.selectModelMap[mid];
						}
					}
				}else{
					if(lot=="hhad" || lot=="had"){
						if(getLen(this.selectModelMap[mid][lot])<2){
							this.selectModelMap[mid][lot][bet] = this.match[lot][bet];
						}
					}else{
						if(getLen(this.selectModelMap[mid][lot])<4){
							this.selectModelMap[mid][lot][bet] = this.match[lot][bet];
						}
					}
					
				}
			}
		}
		this.$forceUpdate();
	}
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
table {
  background: #fff;
  width: 100%;
  text-align: center; /*文本居中*/
  border-collapse: collapse; /*表格的边框合并，如果相邻，则共用一个边框*/
  border-spacing: 0; /*设置行与单元格边框的间距。当表格边框独立（即border-collapse:separate;）此属性才起作用*/
  tr {
    padding: 0;
    .width10 {
      width: 10px;
    }
    td {
      position: relative;
      padding: 0;
      font-size: 10px;
      border-bottom: 1px solid #bfbfbf;
      border-right: 1px solid #bfbfbf;
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
  }
  tr:first-child td {
    border-top: 1px solid #bfbfbf;
  }
  tr td:first-child {
    border-left: 1px solid #bfbfbf;
  }
}
.table_type_1 {
  td {
    padding: 2px 5px;
  }
}
.block {
  width: 96%;
  height: 90%;
  overflow-y: scroll;
  background-color: #fff;
  font-size: 12px;
  padding: 10px;
  .title {
    padding: 10px 0px;
    .dan {
      background: #ff0000;
      color: #fff;
      margin-right: 5px;
      padding: 0px 3px;
      border-radius: 5px;
    }
  }
  .top {
    padding: 10px 0px;
    border-bottom: 1px solid #bfbfbf;
    .tit1 {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .fot {
    .close {
      margin: 20px 20px 10px;
      padding: 5px 20px;
      border: 1px solid #323232;
      border-radius: 5px;
    }
    .ok {
      background: #ff9900;
      margin: 20px 20px 10px;
      padding: 5px 20px;
      color:#fff;
      border: 1px solid #ff9900;
      border-radius: 5px;
    }
  }
}
</style>