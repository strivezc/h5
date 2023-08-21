<template>
  <div class="divider">
    <div class="line"></div>
    <span class="text">{{msg}}</span>
  </div>
</template>
<script>
export default {
  props: ['msg'],
};
</script>
<style scoped lang="less">
.divider {
  text-align: center;
  position: relative;
  margin-bottom: 58px;

  .line {
    width: 100%;
    height: 1px;
    border-top: 1px solid #eeeeef;
  }

  .text {
    position: absolute;
    text-align: center;
    min-width: 130px;
    padding: 0 15px;
    height: 36px;
    top: -18px;
    left: 50%;
    margin-left: -75px;
    background: #fff;
    color: #999999;
    font-size: 28px;
  }
}
</style>
