<template>
  <div class="share-btn">
    <img class="share-img"
         src="@/assets/img/share_icon.png"
         alt=""
         @click="showGuidance()" />
    <div class="guidance"
         v-if="isShowGuidance"
         @click="closeGuidance">
      <img src="@/assets/img/share_guidance.png"
           alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowGuidance: false,
    };
  },
  methods: {
    showGuidance() {
      this.isShowGuidance = true;
    },
    closeGuidance() {
      this.isShowGuidance = false;
    },
  },
};
</script>
<style scope lang="less">
.share-btn {
  .share-img {
    position: absolute;
    right: 30px;
    bottom: 6px;
    width: 32px;
    height: 32px;
  }
  .guidance {
    z-index: 1000;
    background: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    img {
      position: absolute;
      top: 30px;
      right: 0;
      width: 80%;
    }
  }
}
</style>
