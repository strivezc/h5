<template>
  <div style="height: 100vh">
    <transition name="fade">
  <div class="courseData-wrap" v-show="show2">
    <img src="../../../../static/images/2021LearnReport/7.png" class="vertical-light" alt="">
    <div class="content">
      <transition-group
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
      >
        <div v-for="item in textArr" v-if="show" :data-index="item.num" :key="item.num">
          <p class="flex-center" v-if="item.num===2"><img :src="getBadgeImg" class="badge-img" alt=""></p>
          <span v-html="item.text" v-else>{{item}}</span>
        </div>
      </transition-group>
    </div>
  </div>
    </transition>
  </div>
</template>

<script>
import badge1 from '../../../../static/images/2021LearnReport/badge1.png';
import badge2 from '../../../../static/images/2021LearnReport/badge2.png';
import badge3 from '../../../../static/images/2021LearnReport/badge3.png';
import badge4 from '../../../../static/images/2021LearnReport/badge4.png';
import badge5 from '../../../../static/images/2021LearnReport/badge5.png';

export default {
  name: "CourseData",
  props: {
    learnReportData: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      show2: false,
      badge1,
      badge2,
      badge3,
      badge4,
      badge5,
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
      let arr=[
        {num: 0, text: `<p class="item-text">评测课的级别为</p> `},
        {num: 1, text: `<p class="item-text-title">${this.getBadge(this.learnReportData.assessClassTag)}</p> `},
        {num: 2},
        {
          num: 3,
          text: `<p class="normal-text">一共约了 <span class="title color-y font-cepai">${this.learnReportData.assessClassNum}</span> 节测评课</p> `
        },
        {
          num: 4,
          text: `<p class="normal-text">你主要学习的语种是 <span class="title color-y font-cepai">${this.learnReportData.languageType}</span></p> `
        },
      ];
      if (this.learnReportData.assessClassTag==1) {
        arr[3].text=`<p class="normal-text">当前测评课等级较低，可预约口语测评课提升等级</p> `;
      }
      return arr;
    },
    getBadgeImg() {
      const val=this.learnReportData.assessClassTag;
      if (val == 1) {
        return badge1
      } else if (val == 2) {
        return badge2
      } else if (val == 3) {
        return badge3
      } else if (val == 4) {
        return badge4
      } else if (val == 5) {
        return badge5
      }
    },
  },
  methods: {
    getBadge(val){
      if (val == 1) {
        return '秀才'
      } else if (val == 2) {
        return '举人'
      } else if (val == 3) {
        return '探花'
      } else if (val == 4) {
        return '榜眼'
      } else if (val == 5) {
        return '状元'
      }
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
<style>
  .courseData-wrap .content {
    padding-top: 260px;
    position: relative;
    z-index: 1;
  }

  .courseData-wrap .title {
    font-size: 38px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 52px;
  }

  .courseData-wrap .item-text {
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 52px;
    text-align: center;
  }
  .courseData-wrap .normal-text {
    font-size: 30px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 64px;
    text-align: center;
  }

  .courseData-wrap .item-text-title {
    text-align: center;
    margin-top: 30px;
    font-size: 64px;
    font-weight: 500;
    color: #FFFFFF;
    /*line-height: 164px;*/
  }
  .courseData-wrap .badge-img {
    width: 326px;
    height: 326px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .courseData-wrap .flex-center {
    display: flex;
    justify-content: center;
  }

  .courseData-wrap .color-y {
    color: #FCFF00;
  }

  .courseData-wrap .mb-30 {
    margin-bottom: 30px;
  }

  .courseData-wrap .font-cepai {
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
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .z-index1 {
    z-index: 1;
  }
</style>
