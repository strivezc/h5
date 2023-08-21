<template>
  <div class="share">
    <!-- 弹窗层 -->
    <van-popup v-model="show" position="bottom" class="van_pop">
      <div class="link_area">
        <div class="link_box centerCZ" @click="clickAction">
          <img src="../../../static/images/common/icon_link.png" class="icon_link"/>
          <div class="link_txt">复制链接</div>
        </div>
      </div>
      <div class="cancel" @click.stop="popShow">取消</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    popShow() {
      this.show = !this.show;
    },
    clickAction(){
      this.$emit('clickAction')
    },
  }
}
</script>

<style scoped>
  .link_area {
    width: 25rem;
    height: 6.6rem;
    background: #FFFFFF;
    border-radius: 1.07rem 1.07rem 0rem 0rem;
    position: relative;
  }

  .link_box {
    width: 4rem;
    text-align: center;
    left: 1.73rem;
  }

  .icon_link {
    width: 2.93rem;
    margin-bottom: 0.33rem;
    color: #333;
    font-size: 0.93rem;
  }

  .van_pop {
    background: unset !important;
  }

  .cancel {
    width: 100%;
    height: 3.33rem;
    line-height: 3.33rem;
    text-align: center;
    font-size: 1.07rem;
    color: #333;
    background: #fff;
  }
</style>
