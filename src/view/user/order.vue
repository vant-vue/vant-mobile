<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
      <div class="tab_box">

        <!-- 列表 -->
        <van-list v-model="loading"
                  :offset="0"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <div class="list_game_box" v-for="(v,k) in list">
            <router-link :to="{path:'/order_detail',query:{}}">
              <van-cell>
                <van-row class="top"
                         type="flex"
                         align="center">
                  <van-col span="20">
                    <img :src="v.header_img"
                         alt />
                    <span class="tit_one">{{v.nick_name}}</span>
                    <span class="tit_two" v-if="v.near_ten_win>=5">近10中{{v.near_ten_win}}</span>
                    <span class="tit_two" v-if="this_red_count>=3">{{v.this_red_count}}连红</span>
                  </van-col>
                  <van-col span="4"
                           class="tr">
                    <div class="tit_three">{{v.seven_near_win_rate}}%</div>
                    <div class="tit_four">命中率</div>
                  </van-col>
                </van-row>
                <van-row class="mid"
                         type="flex"
                         align="center">
                  <van-col span="24">
                    <span class="tit_one">{{v.l_abbr}}</span>
                    <span class="tit_two">{{v.title.length>15?v.title.substring(0,15)+'...':v.title}}</span>
                  </van-col>
                </van-row>
                <van-row class="fot"
                         type="flex"
                         align="center">
                  <van-col span="12">
                    <span>
                      <van-icon class="ioc"
                                name="underway-o" />
                      <span>{{v.insert_time.substring(11,16)}}</span>
                    </span>
                  </van-col>
                  <van-col span="12"
                           class="tr">
                    <span v-if="v.pay_money&&v.pay_money>0">{{v.pay_money}}</span>
                  </van-col>
                </van-row>
              </van-cell>
            </router-link>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import {myOrder} from "@/api/api";
export default {
  name: "order",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
	  pageNo:1
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        myOrder({"pageNo":this.pageNo})
          .then(res => {
            if (res.flag) {
              //调用成功
              if (res.list && res.list.length > 0) {
                for (let i = 0; i < res.list.length; i++) {
                  this.list.push(res.list[i]);
                }
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (res.list.length < 10) {
                  this.finished = true;
                } else {
                  this.pageNo++;
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
    }
  }
};
</script>
<style lang="less" scoped>
.tab_box {
  padding-top: 10px;
}
.list_game_box {
  border-top: 2px solid #f5f5f5;
  .top {
    img {
      width: 24px;
      height: 24px;
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
      padding: 1px 5px;
      border-radius: 30px;
    }
    .tit_three {
      font-size: 14px;
      font-weight: bold;
      color: #ff0000;
    }
    .tit_four {
      font-size: 10px;
      color: #ff0000;
    }
  }
  .mid {
    padding-bottom: 10px;
    .tit_one {
      font-size: 10px;
      background: #0066ff;
      color: #fff;
      padding: 1px 5px;
      border-radius: 30px;
    }
    .tit_two {
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .fot {
    font-size: 14px;
    color: #999;
    .van-icon {
      vertical-align: middle;
      font-size: 16px;
      margin-right: 6px;
    }
  }
}
</style>