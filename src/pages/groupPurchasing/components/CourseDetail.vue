<template>
  <div class="course-detail">
    <div class="goods-info">
      <img :src="grouponInfo.commodityPicture"
           alt="" />
      <div class="goods-msg">
        <div class="label">拼团优惠</div>
        <span v-if="isShowBtn"
              @click="viewDetail()"
              class="detail">查看详情></span>
        <div class="subject">{{grouponInfo.spellGroupTitle}}</div>
        <div class="price">
          <span class="money-num"><span v-if="showPrice">￥{{grouponInfo.memberPrice}}</span></span>
          <span class="people-num">{{grouponInfo.peopleNumber}}人成团</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CourseDetail',
  data() {
    return {};
  },
  props: {
    isShowBtn: {
      type: Boolean,
      default: false,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
    grouponInfo: {
      type: Object,
    },
  },
  methods: {
    viewDetail() {
      this.$router.push({
        name: 'ParticipatoryGroup',
        query: {
          spellGroupId: this.$route.query.spellGroupId,
          headUserId: this.$route.query.headUserId,
          spellGroupSenderId: this.$route.query.spellGroupSenderId,
          invitedUserId: this.$route.query.invitedUserId,
        },
      });
    },
  },
};
</script>
<style scoped lang="less">
.course-detail {
  width: 100%;
  .goods-info {
    display: flex;
    margin-bottom: 30px;
    img {
      background: #eee;
      flex-shrink: 0;
      width: 220px;
      height: 220px;
      border-radius: 16px;
      margin-right: 24px;
    }

    .goods-msg {
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
      .detail {
        position: absolute;
        right: 0;
        font-size: 28px;
        color: #666;
      }
      .view-detail {
        position: absolute;
        right: 0;
        top: 5px;
        font-size: 28px;
        color: #666;
      }

      .label {
        flex-shrink: 0;
        width: 140px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #ff5c01;
        font-size: 24px;
        color: #f9452c;
        background: none;
        border-radius: 0 20px 20px 20px;
      }

      .subject {
        width: 100%;
        flex-shrink: 0;
        height: 80px;
        text-align: left;
        font-size: 32px;
        line-height: 40px;
        font-weight: 500;
        color: #303133;
        margin: 16px 0 40px 0;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        flex-shrink: 0;
        display: flex;
        color: #ff5c01;
        justify-content: space-between;
        align-items: center;
        height: 45px;

        .money-num {
          padding: 0;
          font-size: 56px;
          font-weight: 500;
          margin-left: -10px;

          span {
            font-size: 40px;
          }
        }

        .people-num {
          font-size: 36px;
        }
      }
    }
  }
}
</style>
