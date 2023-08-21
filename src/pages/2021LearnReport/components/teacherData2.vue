<template>
  <div style="height: 100vh">
    <transition name="fade">
  <div class="teacherData2-wrap" v-show="show2">
    <img src="../../../../static/images/2021LearnReport/7.png" class="vertical-light" alt="">
    <img src="../../../../static/images/2021LearnReport/9.png" class="img-bottom" alt="">
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
export default {
  name: "TeacherData",
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
        {num: 1, text: `<p class="title">你的挚爱老师</p>`},
        {num: 2,text: `<p class="title c-yellow">${this.learnReportData.teaInfoList[0].teacherName}</p>`},
        {
          num: 3,
          text: `<p class="normal-text">累计约课 <span class="title color-y font-cepai">${this.learnReportData.teaInfoList[0].num}</span> 次， 总时长 <span class="title color-y font-cepai">${this.learnReportData.teaClassTimeStr}</span></p> `
        },
        {num: 4, text: `<p class="normal-text">你是该老师的忠实粉丝了。</p>`},
        {num: 5, text: `<p class="normal-text">和你一样喜欢TA的还有 <span class="title color-y font-cepai">${this.learnReportData.stuTotalNum}</span> 位同学</p>`},
        {num: 6, text: `<p class="normal-text">TA们在${this.learnReportData.stuArea}</p>`},
      ]
    },
  },
  methods: {
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
  .teacherData2-wrap .content {
    padding-top: 160px;
    position: relative;
    z-index: 1;
  }

  .teacherData2-wrap .title {
    font-size: 38px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 52px;
    text-align: center;
    margin-bottom: 40px;
  }

  .teacherData2-wrap .c-yellow {
    color: #FCFF00;
  }
  .normal-text {
    font-size: 30px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 70px;
    text-align: center;
  }
  .teacherData2-wrap .tea-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 170px;
    .item-text {
      font-size: 28px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 54px;
      text-align: center;
    }
  }

  .teacherData2-wrap .color-y {
    color: #FCFF00;
  }

  .teacherData2-wrap .mb-30 {
    margin-bottom: 30px;
  }

  .teacherData2-wrap .font-cepai {
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
