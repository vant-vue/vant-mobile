<template>
  <!-- 顶部滑动轮播 -->
  <div class="top_box">
    <van-row type="flex"
             align="center">
      <van-col span="5"
               class="logo">
        <img v-show="businessInfo.hasBd"
             :src="businessInfo.headerImg"
             alt />
      </van-col>
      <van-col span="8"
               class="title">
        <div v-show="businessInfo.hasBd">
          <div>{{businessInfo.storeName}}</div>
          <img @click="show_overlay = true"
               src="@/assets/home/wx.png"
               alt />
          <img src="@/assets/home/tel.png"
               alt />
          <img src="@/assets/home/share.png"
               alt />
          <span> </span>
        </div>
      </van-col>
      <van-col span="11"
               class="tr btn">
        <router-link :to="{path:'/search',query:{}}">
          <span>输入名称搜索</span>
        </router-link>
      </van-col>
    </van-row>
    <van-swipe class="handle_banner"
               @change="onChange"
               :loop="false"
               :width="screenWidth"
               :initial-swipe="initialSwipe"
               :show-indicators="false">
      <van-swipe-item class="b_item"
                      :key="item.key"
                      :index="index"
                      v-for="(item,index) in top_banner_list">
        <div class="item">
          <router-link :to="{path:'ranking',query:{'idx':index}}">
            <van-row type="flex"
                     align="center">
              <van-col span="4">
                <div class="t_txt tc">{{index==0?'最高命中榜':index==1?'最高收益榜':'连红小生榜'}}</div>
              </van-col>
              <van-col span="20"
                       class="re_box">
                <van-row type="flex"
                         class="re_item"
                         align="center"
                         v-for="(val,idx) in item"
                         :key="idx">
                  <van-col span="2">{{idx+1}}</van-col>
                  <van-col span="4">
                    <img :src="val.header_img"
                         alt />
                  </van-col>
                  <van-col span="12">{{val.nick_name}}</van-col>
                  <van-col span="5"
                           class="tr">{{index==0?val.seven_near_win_rate:index==1?val.seven_near_back_rate:val.this_red_count}}%</van-col>
                </van-row>
              </van-col>
            </van-row>
          </router-link>
        </div>
        <div class="more"
             v-show="index == top_banner_list.length-1"
             @click="more">
          <img src="@/assets/home/wx.png"
               alt />
          <div class="mo_t">查看更多</div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 弹窗 -->
    <van-overlay :show="show_overlay"
                 @click="show = false">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <div class="content">
            <div class="t1">联系彩店店主</div>
            <img src="@/assets/home/logo.png"
                 alt="">
            <div class="t2">长按识别二维码</div>
            <div class="t2">添加店主为好友即可随时沟通</div>
          </div>
          <div class="btn_box"
               @click="show_overlay = false">
            我知道了
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {rankList, getBusinessInfo} from "@/api/api";
export default {
  name: "TopBanner",
  components: {},
  data() {
    return {
      screenWidth:document.body.clientWidth*0.8,
      show_overlay: false,
      initialSwipe: 0, //初始位置索引
      top_banner_list: [
        [
          { nick_name: "大神1", header_img: "/assets/home/game.png" },
          { nick_name: "大神2" }
        ],
        [{ nick_name: "大神1" }, { nick_name: "大神2" }],
        [{ nick_name: "大神1" }, { nick_name: "大神2" }]
      ],
      businessInfo: {
        hasBd: false
      }
    };
  },
  methods: {
    onChange(index) {
      console.log(index);
    },
    more() {
      this.$router.push({ path: "/ranking" });
    },
    loadRank() {
      let map = {
        pageSize: 5,
        day: 7
      };
      rankList(map)
        .then(res => {
          if (res.flag) {
            //调用成功
            this.top_banner_list[0] = res.args.winList;
            this.top_banner_list[1] = res.args.backList;
            this.top_banner_list[2] = res.args.redList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadBusinessInfo() {
      getBusinessInfo()
        .then(res => {
          if (res.flag) {
            //调用成功
            this.businessInfo.headerImg = res.args.headerImg;
            this.businessInfo.storeName = res.args.storeName;
            this.businessInfo.qrcode = res.args.qrcode;
            this.businessInfo.phone = res.args.phone;
            this.businessInfo.qmgdCode = res.args.qmgdCode;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted(){
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 70%;
    border-radius: 5px;
    background-color: #fff;
    .content {
      text-align: center;
      padding: 10px 10px;
      .t1 {
        font-size: 16px;
        font-weight: bold;
      }
      .t2 {
        color: #bfbfbf;
      }
      img {
        width: 100%;
        padding: 10px 0;
      }
    }
    .btn_box {
      border: 1px solid #bfbfbf;
      font-size: 16px;
      padding: 12px 0;
      text-align: center;
    }
  }
}
.top_box {
  background: #0c00ae;
  padding: 20px;
  font-size: 12px;

  .logo {
    img {
      border-radius: 50%;
    }
  }
  .title {
    color: #fff;
    font-size: 20px;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .btn {
    color: #fff;
    span {
      display: inline-block;
      font-size: 12px;
      border: 1px solid #ffffff;
      padding: 6px 15px;
      border-radius: 30px;
    }
  }
  .handle_banner {
    padding-top: 10px;
    .b_item {
      position: relative;
      box-sizing: border-box;
      padding: 0;
      .item {
        width: 262px;
        background: #ff0000;
        border-radius: 6px;
        .t_txt {
          box-sizing: border-box;
          padding: 34px 8px;
          font-size: 14px;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        .re_box {
          background: #ffffff;
          padding: 6px;
          .re_item {
            padding: 3px 0;
          }
        }
      }
      .more {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: 0;
        width: 25px;
        .mo_t {
          font-size: 14px;
          color: #ffffff;
          padding: 5px;
        }
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>