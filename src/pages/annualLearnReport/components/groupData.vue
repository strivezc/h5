<template>
  <div style="height: 100vh">
    <transition name="fade">
      <div class="groupData-wrap" v-show="show2">
        <img src="../../../../static/images/learnReport/bg.png" class="img-bottom" alt="">
        <div class="content">
          <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
          >
            <div v-for="item in textArr" v-if="show" :data-index="item.num" :key="item.num">
              <span v-html="item.text">{{item}}</span>
            </div>
            <div v-for="(item,index) in imgArr" :key="`${index}bubble`">
              <img :src="item.img" alt="" class="bubble" :class="`bubble${index+1}`">
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import bubble1 from '../../../../static/images/learnReport/bubble5.png'
import bubble2 from '../../../../static/images/learnReport/bubble6.png'
import bubble3 from '../../../../static/images/learnReport/bubble3.png'

export default {
  name: "GroupData",
  props: {
    learnReportData: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      show2: false,
      imgArr: [
        {img: bubble1},
        {img: bubble2},
        {img: bubble3},
      ]
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
        {num: 1, text: `<span class="item-text">行走江湖，行侠仗义，</span> `},
        {num: 2, text: `<span class="item-text">人不负我,我又怎能负人？</span> `},
        {num: 3, text: `<p class="item-text mb-40">江湖互助一直是“说客盟友”的共识！ </p> `},
        {
          num: 4,
          text: `<p class="item-text">一路上有 <span class="title color-y">${this.learnReportData.spellGroupFriendsNums}</span> 好友共同对你进行了帮扶拼团，</p> `
        },
        {
          num: 5,
          text: `<p class="item-text">为你省下盘缠 <span class="title color-y">${this.learnReportData.spellGroupSaveMoney}</span> 金额，</p> `
        },
        {
          num: 6,
          text: `<p class="item-text"><span class="title color-y">${this.learnReportData.assistGodDarts}</span> 枚助攻神镖被你收入囊中。</p> `
        },
      ]
    },
  },
  methods: {
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
  .groupData-wrap .content {
    box-sizing: border-box;
    padding-left: 76px;
    padding-top: 100px;
    position: relative;
    height: 100vh;
    z-index: 1;
  }

  .groupData-wrap .item-text {
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .groupData-wrap .title {
    font-size: 40px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .groupData-wrap .mb-40 {
    margin-bottom: 40px;
  }

  .groupData-wrap .color-y {
    color: #FCFF00;
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

  .img-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .bubble {
    width: 350px;
    height: 350px;
    user-select: none;
    pointer-events: none;
  }

  .bubble1 {
    position: absolute;
    top: 510px;
    left: 20px;
    -webkit-animation: bubble1 1.2s ease-in-out alternate infinite;
    animation: bubble1 1.2s ease-in-out alternate infinite;
  }

  .bubble2 {
    position: absolute;
    top: 604px;
    right: 20px;
    -webkit-animation: bubble2 1.2s ease-in-out alternate infinite;
    animation: bubble2 1.2s ease-in-out alternate infinite;
  }
  .bubble3 {
    position: absolute;
    top: 860px;
    left: 110px;
    width: 320px;
    height: 320px;
    -webkit-animation: bubble3 1.2s ease-in-out alternate infinite;
    animation: bubble3 1.2s ease-in-out alternate infinite;
  }

  @-webkit-keyframes bubble1 {
    100% {
      top: 520px
    }
  }

  @keyframes bubble1 {
    100% {
      top: 520px
    }
  }

  @-webkit-keyframes bubble2 {
    100% {
      top: 614px
    }
  }

  @keyframes bubble2 {
    100% {
      top: 614px
    }
  }
  @-webkit-keyframes bubble3 {
    100% {
      top: 840px
    }
  }

  @keyframes bubble3 {
    100% {
      top: 840px
    }
  }
</style>
