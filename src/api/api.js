import { getAction, postAction, deleteAction, putAction } from '@/api/manage'

/**
* 首页接口--------------------------------------------------------
* @date 2020-01-11
* @author WangWei
**/
const rankList = (params) => postAction("/expert/home/rankList", params);//首页排名
const advList = (params) => postAction("/expert/home/advList", params);//首页广告
const getHotMatch = (params) => postAction("/expert/home/getHotMatch", params);//首页焦点赛事
const getMatch = (params) => postAction("/expert/home/getMatch", params);//首页焦点赛事

/**
 * 个人中心接口----------------------------------------------------
 * @date 2020-01-14
 * @author WangWei
 */
const userInfo = (params) => postAction("/expert/user/userinfo", params);//用户信息
const getPhoneCode = (params) => postAction("/expert/user/getphonecode", params);//绑定手机号验证码
const bdPhone = (params) => postAction("/expert/user/bdPhone", params);//绑定手机号
const myOrder = (params) => postAction("/expert/user/myOrder", params);//我的订单数据
const mycashRecord = (params) => postAction("/expert/user/mycashRecord", params);//我的余额/收益流水信息
const myAmount = (params) => postAction("/expert/user/myAmount", params);//获取我的余额/收益
const attentionExpert = (params) => postAction("/expert/user/attentionExpert", params);//获取我关注的大神
const getQmgdCode = (params) => postAction("/expert/user/getQmgdCode", params);//获取我的分享码
const toBeExpert = (params) => postAction("/expert/user/toBeExpert", params);//生成专家
const getExpertInfoData = (params) => postAction("/expert/user/getExpertInfoData", params);//注册钱获取专家申请信息
const getCheckStatus = (params) => postAction("/expert/user/getCheckStatus", params);//获取专家信息审核状态
const getUserIsExpert = (params) => postAction("/expert/user/getUserIsExpert", params);//获取大神发单权限
const pubRec = (params) => postAction("/expert/user/pubRec", params);// 发布推荐
const attention = (params) => postAction("/expert/user/attention", params);// 关注大神或者龙眼专家
const removeAttention = (params) => postAction("/expert/user/removeAttention", params);// 取消关注
const getExpertData = (params) => postAction("/expert/user/getExpertData", params);// 获取大神数据
const getBusinessInfo = (params) => postAction("/expert/user/getBusinessInfo", params);//获取首页店主信息 存在自由彩民 展示无信息
const getQmgdRechargeMoney = (params) => postAction("/expert/user/getQmgdRechargeMoney", params);//获取充值列表
const storeList = (params) => postAction("/expert/user/storeList", params);//获取绑定的店铺
const switchStore = (params) => postAction("/expert/user/switchStore", params);//切换绑定的店铺
const uploadFileWx = (params) => postAction("/expert/user/uploadFileWx", params);//上传图片
/**
 * 大神推荐接口
 *@date 2020-01-14
 * @author WangWei
 */
const todayList = (params) => postAction("/expert/dsRec/todayList", params);//今日推荐列表
const details = (params) => postAction("/expert/dsRec/details", params);//推荐详情
const followDetails = (params) => postAction("/expert/dsRec/followDetails", params);//跟单详情
const expertDetails = (params) => postAction("/expert/dsRec/expertDetails", params);//专家详情
const expertHistory = (params) => postAction("/expert/dsRec/expertHistory", params);//获取专家历史推荐
const payforRecommend = (params) => postAction("/expert/dsRec/payforRecommend", params);//支付推荐
const followOrder = (params) => postAction("/expert/dsRec/followOrder", params);// 跟单
const payRec = (params) => postAction("/expert/dsRec/payRec", params);// 店主支付查询方案
const viewRecDetail = (params) => postAction("/expert/dsRec/viewRecDetail", params);//查询的方案详情

/**
 * 龙眼推荐接口
 *@date 2020-01-14
 * @author WangWei
 */
const loganRlist = (params) => postAction("/expert/logan/rlist", params);//优选龙眼2.0
const loganDetails = (params) => postAction("/expert/logan/details", params);//优选详情
const loganExpertDetails = (params) => postAction("/expert/logan/expertDetails", params);//优选专家详情
const loganHistoryList = (params) => postAction("/expert/logan/historyList", params);//优选专家历史记录

export {
  rankList,
  advList,
  getHotMatch,
  getMatch,
  userInfo,
  getPhoneCode,
  bdPhone,
  myOrder,
  mycashRecord,
  myAmount,
  attentionExpert,
  getQmgdCode,
  toBeExpert,
  getExpertInfoData,
  getCheckStatus,
  getUserIsExpert,
  pubRec,
  attention,
  removeAttention,
  getExpertData,
  getBusinessInfo,
  getQmgdRechargeMoney,
  storeList,
  switchStore,
  uploadFileWx,
  todayList,
  details,
  followDetails,
  expertDetails,
  expertHistory,
  payforRecommend,
  followOrder,
  payRec,
  viewRecDetail,
  loganRlist,
  loganDetails,
  loganExpertDetails,
  loganHistoryList
}