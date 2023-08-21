<template>
  <div id="app" :class="isApp?'safe-area-bottom':''">
    <div class="router">
      <keep-alive :include="$store.getters.cachedRouteNames">
        <router-view/>
      </keep-alive>
    </div>
    <audio controls ref="audio" style="display: none" loop>
      <source src="../static/images/learnReport/peiyue.mp3" >
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>

<script>
import {isWeixin} from "@/utils";
import {wxConfig} from '@/utils/wxConfig';
import {mapGetters} from "vuex";

export default {
  name: "App",
  data() {
    return {
      audioSrc: '',
    }
  },
  computed: {
    ...mapGetters(['isApp']),
  },
  created() {
    let that = this;
    this.registerWxConfig();
    // 待触发 `UniAppJSBridgeReady` 事件后，即可调用 uni 的 API。
    document.addEventListener('UniAppJSBridgeReady', function () {
      uni.postMessage({
        data: {
          action: 'message'
        }
      });
      uni.getEnv(function (res) {
        console.log('当前环境：' + JSON.stringify(res));
      });
      setTimeout(() => {
        try {
          document.getElementById('enterVoting').addEventListener('click', function () {
            that.$toast.loading({
              duration: 0, // 持续展示 toast
              forbidClick: true,
              message: "加载中...",
            });
            setTimeout(() => {
              console.log('回到小程序');
              that.$toast.clear();
              uni.navigateTo({
                url: '/subPackagesB/voteActivity/activityEnter'
              });
            }, 1800)
          });
        } catch (e) {
          // console.log(e, 'error');
        }
      }, 500)
    });

    window.addEventListener('resize', () => {
      const activeElement = document.activeElement;
      if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        setTimeout(() => {
          activeElement.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          });// true与父元素顶部对齐，false与父元素底部对齐
        }, 100)
      }
    });
    this.$bus.$on('switchAudio', (isPlay) => {
      this.switchAudio(isPlay);
    });
  },
  methods: {
    registerWxConfig() {
      if (window.location.href.indexOf('poster')>-1) {
        if (isWeixin()) {
          wx.miniProgram.getEnv((res) => {
            console.log(res, 'res-miniprogram');
            if (res.miniprogram) {
              console.log('在小程序内');
            } else {
              console.log('不在小程序内');
              wxConfig()
            }
          })
        }
      }
    },
    switchAudio(isPlay) {
      console.log(isPlay,'switchAudio');
      this.$nextTick(() => {
        if (isPlay) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
        this.$store.commit('user/SET_isPlay', isPlay);
      });
    },
  }
};
</script>

<style lang='less'>
  @import "./common/css/reset.css";
  @import "./common/css/public.less";
  @import "./common/css/vant-ui.css";

  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "PingFang SC", Helvetica, Tahoma, Arial, "Hiragino Sans GB",
    "Hiragino Sans GB W3", STXihei, STHeiti, SimHei, Heiti, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;

    .router {
      flex: 1 0 auto;
    }

  }

  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
  }
</style>
