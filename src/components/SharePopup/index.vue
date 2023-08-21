<template>
  <div class="share">
    <van-popup v-model="show" position="bottom" class="van_pop">
      <div class="link_area">
        <div class="link_box"  v-for="(item,index) in shareList" :key="index" @click="clickAction(item.value)">
          <img :src="item.img" class="icon_link"/>
          <div class="link_txt">{{item.text}}</div>
        </div>
      </div>
      <div class="cancel" @click.stop="popShow">取消</div>
    </van-popup>
  </div>
</template>

<script>
import {addMarkedPointUserClickRecord} from '@/api';
export default {
  props:{
    shareList:{
      type:Array,
      default:()=>{
        return [
          {img: require('../../../static/images/common/friend.png'), text: '微信好友',value:'friend'},
          {img: require('../../../static/images/common/wechat.png'), text: '朋友圈',value:'wechat'},
          {img: require('../../../static/images/common/icon_link.png'), text: '复制链接',value:'link'},
          {img: require('../../../static/images/common/save.png'), text: '保存图片',value:'save'},
        ]
      }
    }
  },
  data() {
    return {
      show: false,
      // shareList: [
      //   {img: require('../../../static/images/common/friend.png'), text: '微信好友',value:'friend'},
      //   {img: require('../../../static/images/common/wechat.png'), text: '朋友圈',value:'wechat'},
      //   {img: require('../../../static/images/common/icon_link.png'), text: '复制链接',value:'link'},
      //   {img: require('../../../static/images/common/save.png'), text: '保存图片',value:'save'},
      // ]
    }
  },
  methods: {
    popShow() {
      addMarkedPointUserClickRecord(106104101);
      this.show = !this.show;
    },
    clickAction(value) {
      this.popShow();
      this.$emit('clickAction',value);
    },
  }
}
</script>

<style scoped>
  .link_area {
    display: flex;
    align-items: center;
    width: 100%;
    height: 266px;
    background: #FFFFFF;
    border-radius: 1.07rem 1.07rem 0rem 0rem;
  }

  .link_box {
    text-align: center;
    left: 1.73rem;
    padding-left: 70px;
  }

  .icon_link {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    color: #333333;
    font-size: 28px;
    line-height: 28px;
  }
  .link_txt{
    font-size: 28px;
    color: #333333;
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
    color: #999999;
    background: #ffffff;
  }
</style>
