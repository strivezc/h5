<template>
  <div style="height: 100vh">
    <transition name="fade">
      <div class="teacherData-wrap" v-show="show2">
        <img src="../../../../static/images/2021LearnReport/7.png" class="vertical-light" alt="">
        <img src="../../../../static/images/2021LearnReport/8.png" class="img-bottom" alt="">
        <div class="content">
          <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
          >
            <div v-for="item in textArr" v-if="show" :data-index="item.num" :key="item.num">
              <div v-if="item.num===2">
                <div class="tea-wrap" v-for="(item,index) in learnReportData.teaInfoList" :key="item.teaId">
                  <span class="item-text">{{index+1}}、{{item.teacherName}}老师</span>
                  <span class="item-text">{{item.num}}次</span>
                </div>
              </div>
              <span v-html="item.text" v-else>{{item}}</span>
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
        {num: 1, text: `<p class="title">你的年度老师</p>`},
        {num: 2},
        {num: 3, text: `<p class="title c-yellow font-32">师者，传道授业解惑也</p>`},
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
  .teacherData-wrap .content {
    padding-top: 160px;
    position: relative;
    z-index: 1;
  }


  .teacherData-wrap .title {
    font-size: 38px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 52px;
    text-align: center;
    margin-bottom: 40px;
  }

  .teacherData-wrap .font-32 {
    font-size: 32px;
  }

  .teacherData-wrap .c-yellow {
    color: #FCFF00;
    margin-top: 40px;
  }

  .teacherData-wrap .tea-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 150px;

    .item-text {
      font-size: 30px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 54px;
      text-align: center;
    }
  }

  .teacherData-wrap .color-y {
    color: #FCFF00;
  }

  .teacherData-wrap .mb-30 {
    margin-bottom: 30px;
  }

  .teacherData-wrap .font-cepai {
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
