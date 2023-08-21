<template>
  <div style="width: 100%; height: 100%;font-size: 20px">
    打开小程序按钮：
    <wx-open-launch-weapp
        username="gh_4fa28c310b5c"
        path="/subPackagesB/voteActivity/activityEnter"
        @launch="handleLaunchFn" @error="handleErrorFn"
    >
      <script type="text/wxtag-template">
      <style>.btn { padding: 12px;font-size: 20px} .btn2{ width: 13.1rem;height: 4.333rem;}</style>
      <button class="btn">跳转小程序</button><br>
      <img class="btn2" src="https://test.talk915.com/h5/static/images/learnReport/btn2.png" alt="">
      </script>
    </wx-open-launch-weapp>
  </div>
</template>

<script>
import {wxConfig} from '@/utils/wxConfig';
export default {
  methods: {
    wxConfig(){
      // 获取密钥
      wxConfig(true)
    },
    handleLaunchFn(e) {
      console.log('success', e)
    },
    handleErrorFn(e) {
      console.log('fail', e.detail);
    },
  },
  created() {
    // const oScript = document.createElement('script');
    // oScript.type = 'text/javascript';
    // oScript.src = 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js';
    // oScript.onload = this.wxConfig()
    // document.body.appendChild(oScript);
    this.wxConfig()
  },
}
</script>

<style>

</style>
