<template>
  <van-overlay :show="show"
               @click="close">
    <div class="wrapper">
      <div class="block"
           @click.stop>
        <van-row class="top tc"
                 type="flex"
                 align="center">
          <van-col span="8"
                   class="tit1">{{match.a_cn_abbr}}</van-col>
          <van-col span="8">VS</van-col>
          <van-col span="8"
                   class="tit1">{{match.h_cn_abbr}}</van-col>
        </van-row>
        <!-- 胜平负/让球 -->
        <div class="title">胜负/让分胜负</div>
        <table>
          <tr>
            <td class="width10">非让分</td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['mnl']&&selectModelMap[match.id]['mnl']['a']}"
			 @click="!match.mnl || selectMatch(match.id,'a','mnl')">
              <div>主负</div>
              <div>{{match.mnl?match.mnl.a:'-'}}</div>
              <i  :class="{'sanjiao':match.mnl&&match.mnl.single=='1'}"></i>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['mnl']&&selectModelMap[match.id]['mnl']['h']}"
			 @click="!match.mnl || selectMatch(match.id,'h','mnl')">
              <div>主胜</div>
              <div>{{match.mnl?match.mnl.h:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td class="">让分</td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hdc']&&selectModelMap[match.id]['hdc']['a']}"
			 @click="!match.hdc || selectMatch(match.id,'a','hdc')">
              <div>主负（{{match.hdc?match.hdc.fixedodds:'-'}}）</div>
              <div>{{match.hdc?match.hdc.a:'-'}}</div>
			   <i  :class="{'sanjiao':match.hdc&&match.hdc.single=='1'}"></i>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hdc']&&selectModelMap[match.id]['hdc']['h']}"
			 @click="!match.hdc || selectMatch(match.id,'h','hdc')">
              <div>主胜（{{match.hdc?match.hdc.fixedodds:'-'}}）</div>
              <div>{{match.hdc?match.hdc.h:'-'}}</div>
            </td>
          </tr>
        </table>
        <!-- 大小分 -->
        <div class="title">大小分</div>
        <table>
          <tr>
            <td class="width10">大小分</td>
            <td class="pr" :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hilo']&&selectModelMap[match.id]['hilo']['h']}"
			 @click="!match.hilo || selectMatch(match.id,'h','hilo')">
              <div>大分</div>
              <div>{{match.hilo?match.hilo.h:'-'}}</div>
              <span class="win_coin">{{match.hilo?match.hilo.fixedodds:'-'}}</span>
			  <i  :class="{'sanjiao':match.hilo&&match.hilo.single=='1'}"></i>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['hilo']&&selectModelMap[match.id]['hilo']['l']}"
			 @click="!match.hilo || selectMatch(match.id,'l','hilo')">
              <div>小分</div>
              <div>{{match.hilo?match.hilo.l:'-'}}</div>
            </td>
          </tr>
        </table>
        <!-- 单胜分差 -->
        <div class="title"><span class="dan">单</span><span>胜分差</span></div>
        <table class="table_type_1">
          <tr>
            <td rowspan="2"
                class="width10">主负</td>
            <td class="pr" :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['l1']}"
			 @click="!match.wnm || selectMatch(match.id,'l1','wnm')">
              <div>1-5</div>
              <div>{{match.wnm?match.wnm.l1:'-'}}</div>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['l2']}"
			 @click="!match.wnm || selectMatch(match.id,'l2','wnm')">
              <div>6-10</div>
              <div>{{match.wnm?match.wnm.l2:'-'}}</div>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['l3']}"
			 @click="!match.wnm || selectMatch(match.id,'l3','wnm')">
              <div>11-15</div>
              <div>{{match.wnm?match.wnm.l3:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['l4']}"
			 @click="!match.wnm || selectMatch(match.id,'l4','wnm')">
              <div>16-20</div>
              <div>{{match.wnm?match.wnm.l4:'-'}}</div>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['l5']}"
			 @click="!match.wnm || selectMatch(match.id,'l5','wnm')">
              <div>21-25</div>
              <div>{{match.wnm?match.wnm.l5:'-'}}</div>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['l6']}"
			 @click="!match.wnm || selectMatch(match.id,'l6','wnm')">
              <div>26+</div>
              <div>{{match.wnm?match.wnm.l6:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td rowspan="2"
                class="width10">主负</td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['w1']}"
			 @click="!match.wnm || selectMatch(match.id,'w1','wnm')">
              <div>1-5</div>
              <div>{{match.wnm?match.wnm.w1:'-'}}</div>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['w2']}"
			 @click="!match.wnm || selectMatch(match.id,'w2','wnm')">
              <div>6-10</div>
              <div>{{match.wnm?match.wnm.w2:'-'}}</div>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['w3']}"
			 @click="!match.wnm || selectMatch(match.id,'w3','wnm')">
              <div>11-15</div>
              <div>{{match.wnm?match.wnm.w3:'-'}}</div>
            </td>
          </tr>
          <tr>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['w4']}"
			 @click="!match.wnm || selectMatch(match.id,'w4','wnm')">
              <div>16-20</div>
              <div>{{match.wnm?match.wnm.w4:'-'}}</div>
            </td>
            <td  :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['w5']}"
			 @click="!match.wnm || selectMatch(match.id,'w5','wnm')">
              <div>21-25</div>
              <div>{{match.wnm?match.wnm.w5:'-'}}</div>
            </td>
            <td :class="{'active':selectModelMap[match.id]&&selectModelMap[match.id]['wnm']&&selectModelMap[match.id]['wnm']['w6']}"
			 @click="!match.wnm || selectMatch(match.id,'w6','wnm')">
              <div>26+</div>
              <div>{{match.wnm?match.wnm.w6:'-'}}</div>
            </td>
          </tr>

        </table>
        <!-- 按钮 -->
        <van-row class="fot tc"
                 type="flex"
                 align="center">
          <van-col span="12">
            <div class="close"
                 @click="close">取消</div>
          </van-col>
          <van-col span="12">
            <div class="ok"  @click="sureSelect">确定</div>
          </van-col>
        </van-row>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import {obj_sort_by,by_str,stringToDate,cloneObject,getLen} from '@/utils/util'
export default {
  name: "",
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
					if(lot=="wnm"){
						if(getLen(this.selectModelMap[mid][lot])<4){
							this.selectModelMap[mid][lot][bet] = this.match[lot][bet];
						}
					}else{
						if(getLen(this.selectModelMap[mid][lot])<1){
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
  .pr{
    position: relative;
  }
  .win_coin{
    background: #ff0000;
    position: absolute;
    transform: translateY(-50%);
    top:50%;
    right:-40px;
    width:80px;
    color:#fff;
    text-align: center;
    padding:5px 0;
    font-size: 14px;
    border-radius: 30px;

  }
}
.table_type_1 {
  td {
    padding: 8px 5px;
  }
}
.block {
  width: 96%;
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
      color: #fff;
      border: 1px solid #ff9900;
      border-radius: 5px;
    }
  }
}
</style>