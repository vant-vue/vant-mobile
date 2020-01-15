<template>
  <div class="focus_box" v-show="matchMap&&matchMap.length>0">
    <van-row class="title"
             type="flex"
             align="center">
      <van-col span="12">
        <span class="title_left">焦点赛事</span>
      </van-col>
      <van-col span="12"
               class="tr">
        <span class="title_right">
          <van-icon name="replay" @change="changeMatch"/>换一换</span>
      </van-col>
    </van-row>
    <van-row gutter="20"
             class="content">
      <van-col span="12" v-for="(v,k) in matchMap[active]">
        <router-link :to="{path:'/focusGame',query:{'mid':v.mId}}">
          <div class="content_item">
            <van-row class="content_item_top">
              <van-col span="12">
                {{v.matchJson.lAbbr}} {{v.matchJson.num}}
              </van-col>
              <van-col span="12">
                {{v.matchJson.endTime.substring(5,16)}}
              </van-col>
            </van-row>
            <van-row type="flex"
                     align="center"
                     class="content_item_cont tc">
              <van-col span="8">
                <img :src="v.matchJson.hImg" :onerror="this.src='/pt/img/logo-h.png'"
                     alt="">
                <div class="fo_b">{{v.matchJson.hAbbr}}</div>
              </van-col>
              <van-col span="8"
                       class="fo_a">
                VS
              </van-col>
              <van-col span="8">
                <img :src="v.matchJson.aImg" :onerror="this.src='/pt/img/logo-a.png'"
                     alt="">
                <div class="fo_b">{{v.matchJson.aAbbr}}</div>
              </van-col>
            </van-row>
            <div class="tr">{{v.hasRecCount}}位大神推荐</div>
          </div>
        </router-link>
      </van-col>
    </van-row>
  </div>

</template>
<script>
import {getHotMatch} from "@/api/api";
export default {
  name: "GameFocus",
  components: {},
  data() {
    return {
		active:0,
		matchMap:[]
	};
  },
  methods: {
	  loadMatch(){
		  getHotMatch().then(res => {
          if (res.flag) {
            //调用成功
            var list = res.list;
			if(list){
				var temp;
				for(let a=0;a<list.length;a++){
					if(a%2==0){
						temp = a/2;
						this.matchMap[temp] = [];
					}
					let hot = list[a];
					hot.matchJson = eval('(' +hot.matchContent+')');
					hot.hImg = '/static/teamlogo/png/'+hot.hId+'.png';
					hot.aImg = '/static/teamlogo/png/'+hot.aId+'.png';
					this.matchMap[temp].push(hot);
				}
			}
          }
        })
        .catch(err => {
          console.log(err);
        });
	  },
	  changeMatch(){
		  let len = this.matchMap.length;
		  if(len == this.active){
			  this.active = 0;
		  }else{
			  this.active++;
		  }
	  }
  }
};
</script>
<style lang="less" scoped>
.focus_box {
  padding: 10px 10px;
  background: #ffffff;
  .title {
    padding-bottom: 10px;
    font-size: 14px;
    &_left {
      font-weight: bold;
      padding-left: 20px;
      border-left: 3px solid #000;
    }

    &_right {
      color: #0066ff;
      .van-icon {
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
  .content {
    &_item {
      font-size: 12px;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      background: #ff9900;
      .content_item_cont {
        padding: 8px 0;
        img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }
        .fo_a {
          font-size: 16px;
          font-weight: bold;
        }
        .fo_b {
          font-weight: bold;
        }
      }
    }
  }
}
</style>