<template>
  <!-- 图片轮播 -->
  <div class="img_box">
    <van-swipe :autoplay="3000" @change="onChange" :initial-swipe="initialSwipe">
      <van-swipe-item
        class="b_item"
        :key="item.key"
        :index="index"
        v-for="(item,index) in banner_list"
      >
        <router-link :to="{path: item.url, query:{}}">
          <img :src="item.imageAttr" alt />
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { advList} from "@/api/api";
export default {
  name: "ImgBanner",
  components: {},
  data() {
    return {
      initialSwipe: 0, //初始位置索引
      banner_list: []
    };
  },

  methods: {
    onChange(index) {
      
    },
    more() {},
	loadAdv(){
		advList().then(res => {
		  if(res.flag){//调用成功
		   if(res.list){
			   this.banner_list = res.list;
			}
		  }
		}).catch(err=>{
		  console.log(err);
		});
	}
  },mounted() {
	  this.loadAdv();
  }
};
</script>
<style lang="less" scoped>
.img_box {
  box-sizing: border-box;
  margin: 10px 10px;
  img {
    width: 100%;
  }
}
</style>