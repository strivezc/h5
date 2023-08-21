<template>
  <div class="lottery-record">
    <van-action-sheet v-model="show"
                      title="抽奖记录"
                      :close-icon="closeIcon"
                      :close-on-click-overlay="false"
                      @click-overlay="popShow">
      <div class="content" :class="(detailData.createrPhone || detailData.createrWxCode)?'mb-140':''">
        <div class="item" v-for="(item,index) in prizeRecordList" :key="index" :class="{'noPrize':item.prizeStatus===1}">
          <img :src="item.prizeImg" class="left" alt="" v-if="item.prizeImg">
          <img src="@/assets/img/lottery/thanksForComing.png" class="left" alt="" v-else>
          <div class="right">
            <template v-if="item.prizeStatus===1">
              <span class="text noPrize-text">未中奖</span>
            </template>
            <template v-else>
              <span class="text">{{item.prizeName}}</span>
              <span class="num">1份</span>
            </template>
            <span class="date" :class="{'noPrize-text':item.prizeStatus===1}">{{item.prizeStatus===1?'抽奖日期':'获奖日期'}}：{{item.createTime}}</span>
          </div>
        </div>

      </div>
      <div class="btn-wrap"  v-if="detailData.createrPhone || detailData.createrWxCode">
        <div class="btn" @click="openContact">领奖联系方式</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "record",
  props:{
    prizeRecordList:{
      type:Array,
      default(){
        return []
      }
    },
    detailData:{
      type:Object,
      default(){
        return {}
      }
    },
  },
  data() {
    return {
      show: false,
      closeIcon: require('@/assets/img/lottery/close2.png')
    };
  },
  methods: {
    popShow() {
      this.show = !this.show;
    },
    openContact(){
      this.popShow();
      this.$emit('openContact');
    },
  }
}
</script>

<style scoped lang="less">
  .lottery-record {
    position: relative;
  }

  /deep/ .van-action-sheet__header {
    font-size: 40px;
    font-weight: bold;
    color: #0087FF;
    line-height: 47px;
    margin-top: 30px;
    height: 80px;
  }

  /deep/ .van-action-sheet__close {
    top: 25px;
    right: 10px;
  }

  .close {
    position: absolute;
    z-index: 2025;
    top: 32px;
    /*bottom: 32px;*/
    right: 32px;
    width: 48px;
    height: 48px;
  }
  .btn-wrap{
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    width: 100%;
    background: #ffffff;
    .btn{
      width: 260px;
      height: 59px;
      border-radius: 60px 60px 60px 60px;
      opacity: 1;
      border: 1px solid #0087FF;
      font-size: 26px;
      color: #0084FF;
      line-height: 59px;
      text-align: center;
    }
  }
  .content {
    position: relative;
    margin: 50px 32px;
    margin-top: 10px;
    .noActive {
      background: transparent;
    }

    .item {
      background: #FFF8EB;
      border-radius: 8px 8px 8px 8px;
      display: flex;
      height: 160px;
      width: 100%;
      margin-bottom: 20px;

      .left {
        padding-left: 30px;
        padding-top: 30px;
        padding-bottom: 30px;
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }

      .right {
        display: flex;
        justify-content: space-between;
        align-items: self-start;
        flex-direction: column;
        padding-right: 30px;
        padding-top: 30px;
        padding-bottom: 30px;

        .text {
          font-size: 28px;
          color: #FF5737;
          line-height: 28px;
        }

        .num {
          min-width: 56px;
          height: 28px;
          background: rgba(255, 87, 55, 0.1);
          border-radius: 60px 60px 60px 60px;
          font-size: 22px;
          color: #FF5737;
          line-height: 28px;
          text-align: center;
        }

        .date {
          font-size: 22px;
          font-weight: 400;
          color: #666666;
          line-height: 22px;
        }
      }
    }
    .noPrize{
      background: #ffffff;
    }
    .noPrize-text{
      color: #666666;
    }
  }
  .mb-140{
    margin-bottom: 140px;
  }
</style>
