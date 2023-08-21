<template>
  <div class="button-wrap">
    <div class="btn" @click="handleClick">分享抽奖</div>
  </div>
</template>

<script>
import {addMarkedPointUserClickRecord} from '@/api';
export default {
  name: "shareButton",
  data() {
    return {};
  },
  methods: {
    handleClick() {
      addMarkedPointUserClickRecord(106103101);
      this.$emit('handleClick');
    }
  }
}
</script>

<style scoped lang="less">
  .button-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 130px;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    width: 100%;
    .btn {
      width: 686px;
      height: 88px;
      background: #0087FF;
      border-radius: 64px 64px 64px 64px;
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 88px;
    }
  }
</style>
