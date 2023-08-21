<template>
  <div style="height: 100vh">
    <transition name="fade">
  <div class="reportShare-wrap" v-show="show2">
    <img src="../../../../static/images/2021LearnReport/7.png" class="vertical-light" alt="">
    <img src="../../../../static/images/2021LearnReport/10.png" class="img-bottom" alt="">
    <img src="../../../../static/images/2021LearnReport/11.png" class="button centerSP" alt="" @click="toPoster">
    <div class="content">
      <transition-group
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
      >
        <div v-for="item in textArr" v-if="show" :data-index="item.num" :key="item.num">
          <span v-html="item.text">{{item}}</span>
        </div>
      </transition-group>
    </div>
  </div>
    </transition>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "ReportShare",
  props: {
    learnReportData: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      show2: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
      this.show2 = true;
    })
  },
  computed: {
    textArr() {
      return [
        {num: 1, text: `<p class="normal-text">知识的海洋里，你并非孤军奋战</p>`},
        {num: 2, text: `<p class="normal-text">这一年 有你真好</p>`},
        {num: 3, text: `<p class="normal-text">下一年 请多指教</p>`},
      ]
    },
  },
  methods: {
    toPoster(){
      Cookies.set('curPage', 'userType');
      this.$router.replace({path:'/poster',query:{classTotalNum:this.learnReportData.classTotalNum,tagType:this.learnReportData.tagType,name:this.learnReportData.userName}});
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      let delay = el.dataset.index * 100
      setTimeout(() => {
        el.style.transition = 'opacity 2s '
        el.style.opacity = 1
        el.style.animation = 'one-in 2s infinite'
        el.style['animation-iteration-count'] = 1
        done()
      }, delay)
    }
  }
}
</script>
<style lang="less">
  .reportShare-wrap .content {
    padding-top: 210px;
    position: relative;
    z-index: 1;
  }

  .reportShare-wrap .c-yellow {
    color: #FCFF00;
  }
  .normal-text {
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 78px;
    text-align: center;
  }

  .reportShare-wrap .color-y {
    color: #FCFF00;
  }

  .reportShare-wrap .font-cepai {
    font-family: 'cepai';
  }

</style>
<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 4s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @keyframes one-in {
    from {
      padding-top: 100px;
      height: 0%;
    }
    to {
      padding-top: 0px;
      height: 100%;
    }
  }

  .vertical-light {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .img-bottom {
    position: absolute;
    bottom: 330px;
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }
  .button {
    position: absolute;
    bottom: 210px;
    width: 476px;
    height: auto;
  }

  .z-index1 {
    z-index: 1;
  }
</style>
