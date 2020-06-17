<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="recommend_detail_box">
        <div class="top_box">
          <div class="up">
            <div class="tit">{{rec.title}}</div>
            <van-row class type="flex" align="center">
              <van-col span="12">
                <span class="tit_one">{{rec.pubTime.substring(11,16)}}发布</span>
              </van-col>
              <van-col span="12" class="tr">
                <span class="tit_two">
                  <van-icon class="eye" name="eye-o" />
                  <span>{{rec.viewTimes}}人查看</span>
                </span>
              </van-col>
            </van-row>
          </div>
          <div class="list_game_box">
            <van-cell>
              <van-row class="top" type="flex" align="center">
                <van-col>
                  <img :src="headerImg" alt />
                </van-col>
                <van-col span="20">
                  <div>
                    <span class="tit_one">{{nickName}}</span>
                    <span class="tit_two">近10中{{nearTenWin}}</span>
                  </div>
                  <div>
                    <span class="tit_one">{{introduce}}</span>
                  </div>
                </van-col>
                <van-col span="6" class="tr">
				  <span class="tit_three" @click="attention">{{isAttention?'已关注':'关注'}}</span>
                </van-col>
              </van-row>
            </van-cell>
          </div>
        </div>
        <div class="mid_box">
          <div class="time">
            <van-icon class="ti" name="underway-o" />
            <span>{{rec.timeNear}}后截止</span>
          </div>
          <div class="cont_game" v-for="(a,b) in rec.matchArr" :key="b">
            <van-row class="tc" type="flex" align="center">
              <van-col span="6">
                <img src="@/assets/home/game.png" alt />
              </van-col>
              <van-col span="12">
                <div class="tit1">
                  <span>{{a.hName}}</span>
                  <span>vs</span>
                  <span>{{a.aName}}</span>
                </div>
                <div class="tit2">{{a.lName}} {{a.num}} {{a.endTime}}</div>
              </van-col>
              <van-col span="6">
                <img src="@/assets/home/game.png" alt />
              </van-col>
            </van-row>
            <div class="ret_a">
              <img v-if="false" src="@/assets/common/lock.png" alt />
              <div v-else class="win">{{a.betStr}}</div>
            </div>
          </div>
          <div class="rec_box" v-if="introduce!=null && introduce.length>0">
            <div class="title">推荐理由</div>
            <div class="cont">
              {{introduce}}
            </div>
          </div>
        </div>
        
      </div>

     
    </div>
  </div>
</template>
<script>
	import {dealDecimal} from '@/utils/util'
	import {details} from "@/api/api";
	import {formatContent,formatEndTime} from "@/utils/recommendUtils";
	export default {
	  name: "order_detail",
	  data() {
		return {
		  "isBd":false,
		  "level":1,
		  "isPay":false,
		  "nickName":'',
		  "headerImg":'',
		  "nearTenWin":'',
		  "thisRedCount":'',
		  "introduce":'',
		  "isAttention":false,
		  "rec":{},
		  show: true,
		  seachMap:{
			  rid:this.$route.query.rid
		  }
		};
	  },
	  methods: {
		attention(){
			if(this.isAttention&&this.attentionId){//已关注的情况
				removeAttention({"attentionId":this.attentionId})
				  .then(res => {
				    if (res.flag) {
				      //调用成功
					  Toast.success('取消成功');
					  this.isAttention = false;
					  this.attentionId = null;
					}
				  })
				  .catch(err => {
				    // 加载状态结束
				  });
			}else{
				attention({"attentionId":this.rec.expertDataId,"type":2})
				  .then(res => {
				    if (res.flag) {
				      //调用成功
					  Toast.success("关注成功");
					  this.isAttention = true;
					  this.attentionId = res.args.id;
					}
				  })
				  .catch(err => {
				    // 加载状态结束
				  });
			}
		},loadData(){
			let map = this.seachMap;
			details(map).then(res => {
	          if (res.flag) {
	            //调用成功
				let args = res.args;
	            this.isBd = args.isBd;
				this.isPay = args.isPay;
				this.level = args.level;
				this.nickName = args.nickName;
				this.headerImg = args.headerImg;
				this.nearTenWin = args.nearTenWin;
				this.thisRedCount = args.thisRedCount;
				this.introduce = args.introduce;
				this.isAttention = args.isAttention;
				this.rec = args.rec;
				if(this.rec){
					 let matchJson = eval('(' +this.rec.content+')');
					this.rec.timeNear = formatEndTime(this.rec.bookEndTime);
					this.rec.matchArr = formatContent(matchJson,this.rec.yh);
				}
	          }
	        })
	        .catch(err => {
	          // 加载状态结束
	          this.loading = false;
	          this.finished = true;
	        });
		}
	  },mounted() {
		this.loadData();//加载推荐数据
	  }
	};
</script>
<style lang="less" scoped>
.recommend_detail_box {
  .top_box {
    background: #ffffff;
    .up {
      border-bottom: 1px solid #bfbfbf;
      padding: 10px;
      .tit {
        font-size: 18px;
        font-weight: bold;
      }
      .tit_one,
      .tit_two {
        color: #bfbfbf;
        .eye {
          font-size: 14px;
          vertical-align: middle;
          margin-right: 6px;
        }
        font-size: 12px;
      }
    }
  }
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
    }
  }
  .mid_box {
    margin-top: 10px;
    margin-bottom: 50px;
    padding-bottom: 1px;
    background: #ffffff;
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
  .rec_box {
    padding: 10px;
    .title {
      padding-bottom: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    .cont {
      font-size: 12px;
    }
  }
  
}

</style>