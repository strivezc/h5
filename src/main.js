// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VueQriously from "vue-qriously";
import VueClipboard from "vue-clipboard2";
import Vconsole from "vconsole";

// 添加Fastclick移除移动端点击延迟
import FastClick from "fastclick";
import Vant from "vant";
import "vant/lib/index.css";
import "./utils/routeControl"; // routeControl
Vue.prototype.$bus = new Vue();
Vue.use(Vant);

Vue.use(VueClipboard);
Vue.use(VueQriously);

//百度统计
router.afterEach(( to, from, next ) => {
  setTimeout(()=>{
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?5b0a5bee741be5864bd9a61a7a7c4d00";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },0);
});

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next();
})

//FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month"
  ) {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

FastClick.attach(document.body);
Vue.config.productionTip = false;

if (process.env.NODE_ENV !== "production") {
  new Vconsole();
}
Vue.config.ignoredElements = ['wx-open-launch-weapp'];

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
