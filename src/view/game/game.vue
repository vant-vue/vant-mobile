<template>
  <div>
    <!-- <Header></Header> -->

    <van-tabs v-model="active"
              swipeable
              @change="onTabChange">
      <van-tab v-for="(item,index) in tabList"
               :key="index"
               :index="index">
        <div slot="title">
          <span>{{item}}</span>
        </div>
        <!-- 赛事 -->
        <div class="main_box">
          <div class="filter_box">
            <van-row type="flex"
                     align="center">
              <van-col span="19">
                <van-button class="btn"
                            @click="show = true"
                            icon="calender-o"
                            size="small"
                            plain
                            hairline
                            color="#323232"
                            block>
                  <van-icon class="left"
                            name="arrow-left" />
                  <span>{{date}}</span>
                  <van-icon class="right"
                            name="arrow" />
                </van-button>
              </van-col>
              <van-col span="5"
                       class="tr">
                <van-button icon="filter-o"
                            size="small"
                            color="linear-gradient(to right, #4bb0ff, #6149f6)"
                            @click="show_overlay = true">筛选</van-button>
              </van-col>
            </van-row>
          </div>
          <router-link :to="{path:'/focusGame',query:{}}">
            <div class="list_box">
              <van-cell>
                <van-row class="r_it1"
                         type="flex"
                         align="center">
                  <van-col span="12">西甲 周四001</van-col>
                  <van-col span="12"
                           class="tr">12-22 03:00</van-col>
                </van-row>
                <van-row class="r_it2 tc"
                         type="flex"
                         align="center">
                  <van-col span="8">
                    <img src="@/assets/home/game.png"
                         alt />
                    <div>巴萨</div>
                  </van-col>
                  <van-col span="8">
                    <div class="vs">2:1</div>
                    <div class="end">已结束</div>
                    <div class="rec">23个推荐</div>
                  </van-col>
                  <van-col span="8">
                    <img src="@/assets/home/game.png"
                         alt />
                    <div>皇马</div>
                  </van-col>
                </van-row>
              </van-cell>
            </div>
          </router-link>
          <router-link :to="{path:'/focusGame',query:{}}">
            <div class="list_box">
              <van-cell>
                <van-row class="r_it1"
                         type="flex"
                         align="center">
                  <van-col span="12">西甲 周四001</van-col>
                  <van-col span="12"
                           class="tr">12-22 03:00</van-col>
                </van-row>
                <van-row class="r_it2 tc"
                         type="flex"
                         align="center">
                  <van-col span="8">
                    <img src="@/assets/home/game.png"
                         alt />
                    <div>巴萨</div>
                  </van-col>
                  <van-col span="8">
                    <div class="vs">VS</div>
                    <div class="end">已结束</div>
                    <div class="rec">23个推荐</div>
                  </van-col>
                  <van-col span="8">
                    <img src="@/assets/home/game.png"
                         alt />
                    <div>皇马</div>
                  </van-col>
                </van-row>
              </van-cell>
            </div>
          </router-link>
        </div>
      </van-tab>
    </van-tabs>
    <Footer></Footer>
    <van-calendar v-model="show"
                  :show-confirm="false"
                  :min-date="minDate"
                  :max-date="maxDate"
                  :default-date="defualtDate"
                  @confirm="onConfirm" />
    <!-- 刷选弹窗 -->
    <van-overlay :show="show_overlay"
                 @click="show = false">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <div class="content">
            <van-row class="z_row"
                     type="flex"
                     align="center">
              <van-col span="12"
                       class="checked">全选</van-col>
              <van-col span="12">反选</van-col>
            </van-row>
            <van-row class="x_row"
                     gutter="20">
              <van-col span="8">
                <div class="checked">法国杯</div>
              </van-col>
              <van-col span="8">
                <div>法国杯</div>
              </van-col>
              <van-col span="8">
                <div>法国杯2</div>
              </van-col>
              <van-col span="8">
                <div>法国杯2</div>
              </van-col>
              <van-col span="8">
                <div>法国杯2</div>
              </van-col>
              <van-col span="8">
                <div>法国杯2</div>
              </van-col>
              <van-col span="8">
                <div>法国杯2</div>
              </van-col>
              <van-col span="8">
                <div>法国杯2</div>
              </van-col>
              <van-col span="8">
                <div>法国杯2</div>
              </van-col>
            </van-row>
          </div>
          <div class="btn_box">
            <van-row class="btn"
                     type="flex"
                     align="center">
              <van-col @click="show_overlay = false"
                       span="12"
                       class="checked">取消</van-col>
              <van-col @click="show_overlay = false"
                       span="12">确定</van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getNextDayDate } from "@/utils/util";

export default {
  name: "game",
  components: {},
  data() {
    return {
      active: 0,
      tabList: ["足球", "篮球"],
      show: false,
      show_overlay: false,
      date: this.formatDate(new Date()),
      minDate: getNextDayDate(-180, new Date()),
      maxDate: getNextDayDate(1, new Date()),
      defualtDate: new Date()
    };
  },

  methods: {
    onTabChange(tab) {},
    week(time) {
      let weekday = new Array(7);
      weekday[0] = "星期天";
      weekday[1] = "星期一";
      weekday[2] = "星期二";
      weekday[3] = "星期三";
      weekday[4] = "星期四";
      weekday[5] = "星期五";
      weekday[6] = "星期六";
      return weekday[new Date(time).getDay()];
    },
    formatDate(time) {
      let date = new Date(time);
      // date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes()) + ':' + checkTime(date.getSeconds());
      let date_value =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        this.week(time);
      //最后显示yyyy-MM-dd hh:mm:ss
      return date_value;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    }
  }
};
</script>

<style lang="less" scope>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .block {
    width: 90%;
    border-radius: 5px;
    background-color: #fff;
    .content {
      padding: 20px 10px;
      .z_row {
        text-align: center;
        border-radius: 5px;
        border: 1px solid #bfbfbf;
        font-size: 14px;
        overflow: hidden;
        .van-col {
          padding: 5px;
        }
        .checked {
          background: #ff0000;
          color: #fff;
        }
      }
      .x_row {
        margin-top: 16px;
        text-align: center;
        font-size: 14px;
        .van-col div {
          border: 1px solid #bfbfbf;
          padding: 8px;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .van-col div.checked {
          border: 1px solid #ff0000;
          color: #ff0000;
        }
      }
    }
    .btn_box {
      .btn {
        border: 1px solid #bfbfbf;
        text-align: center;
        font-size: 16px;
        .van-col {
          padding: 10px 0;
        }
        .van-col:first-child {
          border-right: 1px solid #bfbfbf;
        }
      }
    }
  }
}

.filter_box {
  font-size: 14px;
  padding: 10px;
  background: #ffffff;
  .btn {
    position: relative;
    .left {
      font-size: 16px;
      position: absolute;
      left: 10px;
      transform: translateY(-50%);
      top: 50%;
    }
    .right {
      font-size: 16px;
      position: absolute;
      right: 10px;
      transform: translateY(-50%);
      top: 50%;
    }
  }
}
.list_box {
  margin: 10px;
  border-radius: 8px;
  .r_it1 {
    font-size: 12px;
    color: #bfbfbf;
  }
  img {
    width: 38px;
    height: 38px;
  }
  .r_it2 {
    padding: 10px 0 0;
    font-weight: bold;
  }
  .vs {
    font-size: 20px;
  }
  .end {
    color: #bfbfbf;
    padding: 3px;
  }
  .rec {
    border-radius: 5px;
    border: 1px solid #ff0000;
    color: #ff0000;
  }
}
</style>
