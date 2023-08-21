<template>
  <div style="height: 100vh">
    <transition name="fade">
      <div class="userType-wrap" v-show="show2">
        <template v-if="learnReportData.newStu">
          <img src="../../../../static/images/learnReport/14.png" class="button-new centerSP" alt="" @click="toPoster">
          <img src="../../../../static/images/learnReport/12.png" class="img-bottom" alt="">
        </template>
        <template v-else-if="learnReportData.noData">
          <img src="../../../../static/images/learnReport/15.png" class="button-new centerSP" alt="" @click="toPoster">
          <img src="../../../../static/images/learnReport/13.png" class="img-bottom" alt="">
        </template>
        <template v-else>
          <img src="../../../../static/images/learnReport/5.png" class="img-bottom" alt="">
        </template>
        <div class="content" v-if="learnReportData.noData">
          <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
          >
            <div v-for="item in textNoDataArr" v-if="show" :data-index="item.num" :key="item.num">
              <span v-html="item.text">{{item}}</span>
            </div>
          </transition-group>
        </div>
        <div class="content" v-else-if="learnReportData.newStu">
          <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
          >
            <div v-for="item in textNewUserArr" v-if="show" :data-index="item.num" :key="item.num">
              <span v-html="item.text">{{item}}</span>
            </div>
          </transition-group>
        </div>
        <div class="content" v-else>
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
import {isWeixin} from "@/utils";

export default {
  name: "UserType",
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
        {
          num: 1,
          text: `<p class="title mb-20"><span class="color-y">${this.learnReportData.userName}</span>大侠</p>`
        },
        {
          num: 2,
          text: `<span class="title color-y ">${this.learnReportData.createDate}</span>， <span class="item-text">你历经重重考验，</span>`
        },
        {num: 3, text: `<p><p class="item-text mb-20"><span class="item-text">加入我们的神秘组织</span><span class="title color-y">《说客英语》</span> <span class="item-text">联盟。</span></p>`},
        // {num: 4, text: `<p class="mb-20"></span></p>`},
        {num: 4, text: `<span class="item-text">至此，你已进入风云变幻的说客武林世界，</span> `},
        {
          num: 5,
          text: `<p class="item-text mb-20">和各路语言侠客切磋了 <span class="title color-y ">${this.learnReportData.studyDay}</span> 天，</p> `
        },
        {num: 6, text: `<span class="item-text">英雄剑法果然名不虚传！</span> `},
      ]
    },
    textNoDataArr() {
      return [
        {num: 1, text: `<p class="title mb-20">很遗憾~</p> `},
        {num: 2, text: `<p class="normal-text">我们错过了你的2022年，</p> `},
        {num: 3, text: `<p class="normal-text">但你可以开启新的说客英语</p> `},
        {num: 4, text: `<p class="normal-text">学习之旅~</p> `},
      ]
    },
    textNewUserArr() {
      return [
        {num: 1, text: `<p class="title mb-20">Hi~很高兴认识你</p> `},
        {num: 2, text: `<p class="normal-text">新侠客首次注册后有专属课程顾问</p> `},
        {num: 3, text: `<p class="normal-text mb-50">会联系你并免费为你约体验课。</p> `},
        {num: 4, text: `<p class="normal-text">让我们一起开启说客英语学习之旅吧~</p> `},
      ]
    },
  },
  methods: {
    toPoster(type){
      Cookies.set('curPage', 'userType');
      if (isWeixin()) {
        let url = this.$router.resolve({path:'/poster',query:{tagType:this.learnReportData.tagType, recommendCode: this.learnReportData.userDistributorCode}});
        window.location.replace(url.href);
      } else {
        this.$router.replace({path:'/poster',query:{tagType:this.learnReportData.tagType, recommendCode: this.learnReportData.userDistributorCode}});
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      // console.log(el.dataset.index)
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
<style>
  .userType-wrap .content {
    padding-left: 65px;
    padding-top: 140px;
    position: relative;
    z-index: 1;
  }

  .userType-wrap .title {
    font-size: 40px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .userType-wrap .item-text {
    font-size: 30px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .userType-wrap .normal-text {
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .userType-wrap .color-y {
    color: #FCFF00;
  }

  .userType-wrap .mb-20 {
    margin-bottom: 20px;
  }

  .userType-wrap .mb-50 {
    margin-bottom: 50px;
  }

  .userType-wrap . {
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

  .oblique-light {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .img-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .no-data-img {
    width: 576px;
    bottom: 350px;
    left: 50%;
  }

  .z-index1 {
    z-index: 1;
  }

  .button {
    position: absolute;
    bottom: 210px;
    width: 476px;
    height: auto;
  }

  .button-new {
    position: absolute;
    top: 650px;
    z-index: 10;
    width: 392px;
    height: auto;
  }
</style>
