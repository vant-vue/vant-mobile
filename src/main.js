import 'amfe-flexible';
import 'babel-polyfill'
import Vue from 'vue';
import App from './App';
import { router } from './router';
import store from './store'
import Storage from 'vue-ls'
Vue.config.devtools = true;
import {
  NavBar,
  Tabbar,
  TabbarItem,
  Toast,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Icon,
  List,
  Cell,
  Tab,
  Tabs,
  Search,
  Popup,
  Stepper,
  Dialog,
  Button,
  Calendar,
  Field,
  CellGroup,
  Uploader,
  Overlay,
  Switch,
  Sticky
} from 'vant';
Vue.use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Toast)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(Icon)
  .use(List)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(Search)
  .use(Popup)
  .use(Stepper)
  .use(Dialog)
  .use(Button)
  .use(Calendar)
  .use(Field)
  .use(CellGroup)
  .use(Uploader)
  .use(Overlay)
  .use(Switch)
  .use(Sticky)

//公共组件
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {getUserId} from '@/utils/cookie'

// 为路由对象 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的的路径
  // from 代表从哪个路径跳转
  // next 是一个函数 表示放行 next() 放行 next('/login') 强制跳转
  //如果用户访问的登录页面，直接放行
  if (to.path === '/login') return next();
  //检查cookie中是否含有登录信息 含有的话 写入到localStorage
  const localStr = getUserId("localStorage");
  //没有token 强制跳转到登录页
  if (!localStr) return next('/login');
  next();
})


Vue.use(Header);
Vue.use(Footer);

Vue.use(Storage)
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});


