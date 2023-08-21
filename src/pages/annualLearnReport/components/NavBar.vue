<template>
  <div class="head-back">
    <img src="../../../../static/images/learnReport/back.png" class="back-icon" @click="backAction" alt="">
    <span class="back-text">{{rightText}}</span>
    <span class="title">{{title}}</span>
    <span class="right-text" @click="rightAction">
      <img src="../../../../static/images/learnReport/play.png" class="animation" alt="" @click="pauseAudio" v-if="isPlay">
      <img src="../../../../static/images/learnReport/pause.png" alt="" @click="playAudio" v-else>
    </span>
<!--    <audio :src="audioSrc" controls="controls" ref="audio" style="display: none;">-->
<!--      Your browser does not support the audio element.-->
<!--    </audio>-->
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Back",
  props:{
    title:{
      type:String
    },
    rightText:{
      type:String,
      default: '返回'
    },
    defaultBack:{
      type:Boolean,
      default:true
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isPlay']),
  },
  methods: {
    backAction(){
      if (this.defaultBack) {
        this.$router.go(-1);
      } else {
        this.$emit('backAction')
      }
    },
    rightAction(){
      this.$emit('rightAction')
    },
    pauseAudio(){
      this.$bus.$emit('switchAudio',false);
    },
    playAudio(){
      this.$bus.$emit('switchAudio',true);
    },
  }
}
</script>

<style scoped lang="less">
.head-back{
  position: absolute;
  top: 0;
  z-index: 99;
  background: transparent;
  width: 100%;
  height: 100px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333333;
  .title{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .back-icon{
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    padding: 0.867rem 3rem 0.867rem 1.067rem;
    transform: translateY(-50%);
    width: 17px;
    height: 29px;
  }
  .back-text{
    position: absolute;
    top: 50%;
    left: 65px;
    font-size: 32px;
    transform: translateY(-50%);
    color: #ffffff;
  }
  .right-text{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 0.933rem;
    img{
      width: 44px;
      height: auto;
      padding: 0.867rem 1.067rem;
    }
    .animation{
      animation: rotate 2s linear infinite;
    }
    @keyframes rotate{from{transform: rotate(0deg)}
      to{transform: rotate(360deg)}
    }
  }
}
</style>
