<template>
  <div>
    <!-- <Header></Header> -->
    <div class="field_box">
      <van-cell-group class="name">
        <van-field
          v-model="sub.nickName"
          autosize
          required
		  maxlength="8"
          clearable
          label="昵称"
          placeholder="为自己取一个响亮的名字"
		  :error-message="errmsg.nickName"
		  @focus="focusMsg('nickName')"
        />
        <van-field
          v-model="sub.introduce"
          rows="1"
          autosize
		  maxlength="50"
          label="个人介绍"
          type="textarea"
          placeholder="一句话介绍自己不可以包含联系方式"
		  :error-message="errmsg.introduce"
		  @focus="focusMsg('introduce')"
        />
      </van-cell-group>
      <div class="title">身份信息</div>
      <van-cell-group class="id_card">
        <van-field v-model="sub.name" @focus="focusMsg('name')" maxlength="6" autosize required clearable label="姓名" placeholder="请输入姓名"  :error-message="errmsg.name"/>
        <van-field
          v-model="sub.idNumber"
          autosize
          required
          clearable
		  @focus="focusMsg('idNumber')"
		  maxlength="18"
          type="number"
          label="身份证号"
          placeholder="请输入身份证号"
		   :error-message="errmsg.idNumber"
        />
        <div class="upload_box">
          <div class="ti">请上传身份证正面</div>
          <van-uploader  v-model="file.fontUrl"  :max-count="1"/>
        </div>
		<div class="upload_box">
		  <div class="ti">请上传身份证反面</div>
		  <van-uploader   v-model="file.backUrl"  :max-count="1" />
		</div>
      </van-cell-group>
      <van-cell-group class="name">
        <van-field
          v-model="sub.reson"
          rows="2"
          autosize
          label="申请理由"
		  @focus="focusMsg('reson')"
          type="textarea"
          maxlength="200"
          placeholder="说出你的优势、上传你的历史推荐"
          show-word-limit
		   :error-message="errmsg.reson"
        />
        <van-uploader v-model="file.resonFile"    multiple  :max-count="3"/>
      </van-cell-group>
    </div>
    <div class="fot_box">
        <van-button class="btn" type="primary" @click="sumitBtn" color="#ff9900" block>{{isBtn?'提交中...':'提交申请'}}</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import {toBeExpert,getExpertInfoData} from "@/api/api";
import {isIdNumber} from "@/utils/validate";
export default {
  name: "become_professor",
  data() {
    return {
	  sub:{
		  nickName: "",
		  introduce: "",
		  name:"",
		  idNumber:"",
		  reson:"",
		  backUrl:"",
		  fontUrl:"",
		  resonFile:"",
		  businessId:this.$route.query.businessId
	  },
	  errmsg:{nickName:"",introduce:"",name:"",idNumber:"",reson:""},
	  file:{
		  backUrl:[],
		  fontUrl:[],
		  resonFile:[]
	  },
	  isBtn:false
    };
  },
  methods: {
	  sumitBtn(){
		  if(this.isBtn){
			  return;
		  }
		  if(this.sub.nickName==''){
			  this.errmsg.nickName = "请输入昵称";
			  console.log( this.errmsg)
			  return;
		  }
		  if(this.sub.introduce==''){
			  this.errmsg.introduce = "请输入个人介绍";
			  return;
		  }
		 if(this.sub.name==''){
			  this.errmsg.name = "请输入姓名";
			  return;
		 }
		 if(!isIdNumber(this.sub.idNumber)){
			  this.errmsg.idNumber = "身份证号格式错误";
			  return;
		 }
		 if(this.sub.reson==""){
			  this.errmsg.reson = "请输入申请理由";
			  return;
		 }
		 if(this.sub.reson.length<10){
			  this.errmsg.reson = "申请理由不少于10个字符";
			  return;
		 }
		 if(this.file.fontUrl.length==0){
			 Toast('请上传身份证正面');
			  return;
		 }
		 if(this.file.backUrl.length==0){
			 Toast('请上传身份证反面');
			  return;
		 }
		 if(this.file.resonFile.length==0){
			 Toast('请至少上传一张历史战绩截图');
			  return;
		 }
		 this.isBtn = true;
		 this.fontUrl = this.file.fontUrl[0].content;
		 this.backUrl = this.file.backUrl[0].content;
		 var resonFileArr = [];
		 for(let b=0;b<this.file.resonFile.length;b++){
			 resonFileArr.push(this.file.resonFile[b].content);
		 }
		 this.resonFile = resonFileArr.join("|");
		 Toast.loading({
		   message: '数据提交中...',
		   forbidClick: true
		 });
		 toBeExpert(this.sub).then(res => {
		   if (res.flag) {
		     //调用成功
		 	 Toast.success('提交成功');
			 setTimeout(() => {
			 	this.$router.push({ path: "/user" });
			 }, 800);
		   }
		 })
		 .catch(err => {
		   console.log(err);
		 });
		 
	  },focusMsg(t){
		  this.errmsg[t]="";
	  }/* , afterReadFontUrl(file) {
		  let base64 = file.content;
		  this.uplosdImg(base64,"fontUrl");
	 }, afterReadBackUrl(file) {
		  let base64 = file.content;
		  this.uplosdImg(base64,"backUrl");
	 }, afterReadResonFile(file) {
		  var base64List = [];
		  for(let a =0;a<file.length;a++){
				base64List.push(file[a].content);
		  }
		  let base64 = base64List.join("|");
		   this.uplosdImg(base64,"resonFile");
	 } *//* ,uplosdImg(base64,dirname){
		 uploadFileWx({"base64":base64,"dirname":dirname}).then(res => {
		   if (res.flag) {
		     //调用成功
			 var list = res.list;
			 var fileArr = [];
			 for(let b=0;b<list.length;b++){
				 fileArr.push(list[b].url);
			 }
			 if(fileArr.length>1){
				 this[dirname] += fileArr.join("|");
			 }else{
				 this[dirname] = fileArr[0];
			 }
		   }
		 })
		 .catch(err => {
		   console.log(err);
		 });
	 } */
  }
};
</script>
<style lang="less" scoped>
.field_box {
  padding-bottom: 100px;
  .name {
    margin-top: 10px;
  }
  .title {
    padding: 10px;
    font-size: 14px;
  }
}
.upload_box {
  padding: 10px;
  .ti {
    font-size: 14px;
    padding-bottom: 20px;
  }
}
.fot_box {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 20px;
  .btn {
    border-radius: 8px;
  }
}
</style>