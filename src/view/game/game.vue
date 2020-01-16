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
                            @click="showLname">筛选</van-button>
              </van-col>
            </van-row>
          </div>
          <router-link :to="{path:'/focusGame',query:{}}"
                       v-for="(v,k) in list"
                       :key="k"
                       v-show="lNameMap[v.league_name_short]==1">
            <div class="list_box">
              <van-cell>
                <van-row class="r_it1"
                         type="flex"
                         align="center">
                  <van-col span="12">{{v.league_name_short}} {{v.plan_day}}{{v.plan_number}}</van-col>
                  <van-col span="12"
                           class="tr">{{v.match_start_time.substring(5,16)}}</van-col>
                </van-row>
                <van-row class="r_it2 tc"
                         type="flex"
                         align="center">
                  <van-col span="8">
                    <img :src="v.match_type==1?v.hImg:v.aImg"
                         :onerror="errorImg.h"
                         alt />
                    <div>{{v.match_type==1?v.home_team_short:v.visiting_team_short}}</div>
                  </van-col>
                  <van-col span="8">
                    <div class="vs">{{v.full_score?v.full_score:"VS"}}</div>
                    <div class="end"
                         v-if="v.full_score">已结束</div>
                    <div class="rec"
                         v-if="v.hasRecCount&&v.hasRecCount>0">{{v.hasRecCount}}个推荐</div>
                  </van-col>
                  <van-col span="8">
                    <img :src="v.match_type==1?v.aImg:v.hImg"
                         :onerror="errorImg.a"
                         alt />
                    <div>{{v.match_type==1?v.visiting_team_short:v.home_team_short}}</div>
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
                       class="checked"
                       @click="selectAll">全选</van-col>
              <van-col span="12"
                       @click="selectFan">反选</van-col>
            </van-row>
            <van-row class="x_row"
                     gutter="20">
              <van-col span="8"
                       v-for="(v,k) in lNameMap"
                       :key="k">
                <div :class="{'checked':v==1}"
                     @click="clickLname(k)">{{k}}</div>
              </van-col>
            </van-row>
          </div>
          <div class="btn_box">
            <van-row class="btn"
                     type="flex"
                     align="center">
              <van-col @click="removeLname"
                       span="12"
                       class="checked">取消</van-col>
              <van-col @click="sureLname"
                       span="12">确定</van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getMatch } from "@/api/api";
import { getNextDayDate } from "@/utils/dateUtils";
import { cloneObject } from "@/utils/util";
export default {
  name: "game",
  components: {},
  data() {
    return {
      active: 0,
      tabList: ["足球", "篮球"],
      typeMap: ["football", "basketball"],
      show: false,
      show_overlay: false,
      date: this.formatDate(new Date()),
      minDate: getNextDayDate(-180, new Date()),
      maxDate: getNextDayDate(1, new Date()),
      defualtDate: new Date(),
      errorImg: {
        h: "this.src='http://m.longw.vip/pt/img/logo-h.png'",
        a: "this.src='http://m.longw.vip/pt/img/logo-a.png'"
      },
      list: [],
      serachMap: {
        sport: "football"
      },
      dateMap: {},
      lNameMap: {},
      showlNameMap: {}
    };
  },

  methods: {
    onTabChange(tab) {
      this.serachMap.sport = this.typeMap[tab];
      this.loadMatch();
    },
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
      this.serachMap.date = this.date.split(" ")[0];
      this.loadMatch();
    },
    loadMatch() {
      let map = this.seachMap;
      getMatch(map)
        .then(res => {
          if (res.flag) {
            //调用成功
            let dateArr = res.args.dateArr;
            this.dateMap.next = dateArr[2];
            this.dateMap.prev = dateArr[0];
            this.dateMap.week = dateArr[3];
            this.dateMap.now = dateArr[1];
            if (res.list && res.list.length > 0) {
              this.list = res.list;
              for (let k in this.list) {
                let m = this.list[k];
                this.lNameMap[m.league_name_short] = 1;
                m.hImg = "/static/teamlogo/png/" + hot.home_team_id + ".png";
                m.aImg =
                  "/static/teamlogo/png/" + hot.visiting_team_id + ".png";
              }
            }
          }
        })
        .catch(err => {
          // 加载状态结束
        });
    },
    selectAll() {
      let mp = this.lNameMap;
      if (mp) {
        for (let k in mp) {
          mp[k] = 1;
        }
      }
    },
    selectFan() {
      let mp = this.lNameMap;
      if (mp) {
        for (let k in mp) {
          if (mp[k]) {
            mp[k] = 0;
          } else {
            mp[k] = 1;
          }
        }
      }
    },
    clickLname(k) {
      let mp = this.lNameMap;
      if (mp[k] == 1) {
        mp[k] = 0;
      } else {
        mp[k] = 1;
      }
    },
    removeLname() {
      this.show_overlay = false;
      this.lNameMap = this.cloneObject(this.showlNameMap);
    },
    showLname() {
      this.show_overlay = true;
      this.showlNameMap = this.cloneObject(this.lNameMap);
    },
    sureLname() {
      this.show_overlay = false;
    },
    cloneObject(obj) {
      return JSON.parse(JSON.stringify(obj));
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
