<template>
  <div class="head-back">
    <img src="../../../static/images/common/icon_left.png" class="back-icon" @click="backAction" alt="" v-if="showBack">
    <span class="title">{{title}}</span>
    <span class="right-text" @click="rightAction">{{rightText}}</span>
  </div>
</template>

<script setup>
  import {defineProps, defineEmits} from "vue";
  import {useRouter} from "@/utils/vueApi.js";

  const router = useRouter();
  const emits = defineEmits(['backAction', 'rightAction'])
  const props = defineProps({
    title: {
      type: String
    },
    rightText: {
      type: String
    },
    defaultBack: {
      type: Boolean,
      default: true
    },
    showBack: {
      type: Boolean,
      default: true
    },
  })

  const backAction = () => {
    if (props.defaultBack) {
      router.go(-1);
    } else {
      emits('backAction')
    }
  }
  const rightAction = () => {
    emits('rightAction')
  }
</script>

<style scoped lang="less">
.head-back{
  position: fixed;
  top: 0;
  z-index: 99;
  background: #ffffff;
  width: 100%;
  height: 2.933rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333333;
  border-bottom: 0.033rem solid #eeeeee;
  .title{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .back-icon{
    position: absolute;
    top: 50%;
    padding: 0.867rem 1.067rem;
    transform: translateY(-50%);
    width: 1.2rem;
    height: 1.2rem;
  }
  .right-text{
    position: absolute;
    top: 50%;
    right: 0;
    padding: 0.867rem 1.067rem;
    transform: translateY(-50%);
    font-size: 0.933rem;
  }
}
</style>
