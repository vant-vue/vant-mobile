<template>
  <div>
    <!-- <Header></Header> -->
    <div class="main_box">
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
            <!-- 列表 -->
            <van-list v-model="loading"
                      :offset="0"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad">
                <div class="list_box" v-for="(v,k) in list">
                  <router-link :to="{path:'/recommend_detail',query:{}}">
                    <van-cell>
                      <van-row class="top"
                               type="flex"
                               align="center">
                        <van-col span="3">
                          <img :src="active?'@/assets/home/game.png':v.imgUrl"
                               alt />

                        </van-col>
                        <van-col span="9">
                          <span class="tit_one">{{v.nickName}}</span>
                        </van-col>
                        <van-col span="12"
                                 class="tr">
                          <span class="tit_two" @click="removeAtention(k)">已关注</span>
                        </van-col>
                      </van-row>

                    </van-cell>
                  </router-link>
                </div>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import {attentionExpert} from "@/api/api";
export default {
  name: "focus",
  data() {
    return {
      active: 0,
      tabList: ["关注的大神", "关注的优选"],
      list: [],
      loading: false,
      finished: false,
	  searchMap:{
		  pageNo:1,
		  type:1
	  }
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        let map = this.seachMap;
         attentionExpert(map)
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
    },
    onTabChange(tab) {
	  this.searchMap.type = this.active + 1;
	  this.searchMap.pageNo = 1;
      this.list = [];
      this.onLoad();
    },removeAtention(k){
		let att = this.list[k];
		removeAttention({"id":att.id})
           .then(res => {
             if (res.flag) {
               //调用成功
               this.list.splice(k,1); 
             }
           })
           .catch(err => {
             // 加载状态结束
           });
	}
  }
};
</script>
<style lang="less" scoped>
.tab_box {
  .list_box {
    border-top: 2px solid #f5f5f5;
    .top {
      img {
        width: 28px;
        height: 28px;
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
    }
  }
}
</style>