<template>
  <div class="infojoinUs">
    <div class="top">
      <img src="@/assets/img/01m_top_bg.png" class="banner_img"/>
    </div>
    <div class="box">
      <div class="pingpai">
        <img src="@/assets/img/pingpai.png" class="banner_img"/>
      </div>
      <div class="submit-box">
        <img class="butterfly" src="@/assets/img/butterfly.png">
        <h5>合作咨询</h5>
        <div class="enroll">
          <p>
            <van-field
                v-model="form1.name"
                type="text"
                placeholder="请输入您的姓名"
                class="input"
            />
          </p>
          <p>
            <van-field
                v-model="form1.phone"
                type="number"
                maxlength="11"
                placeholder="请输入您的手机"
                class="input"
            />
          </p>
          <div class="submit-enroll" @click="submit('form1')">提交申请</div>
        </div>
      </div>
    </div>
    <img src="@/assets/img/zhaoshang_bg.png" class="banner_img"/>
    <div class="box">
      <div class="pingpai">
        <img src="@/assets/img/pingpai.png" class="banner_img"/>
      </div>
      <div class="submit-box">
        <img class="butterfly" src="@/assets/img/butterfly.png">
        <h5>合作咨询</h5>
        <div class="enroll">
          <p>
            <van-field
                v-model="form1.name"
                type="text"
                placeholder="请输入您的姓名"
                class="input"
            />
          </p>
          <p>
            <van-field
                v-model="form1.phone"
                type="number"
                maxlength="11"
                placeholder="请输入您的手机"
                class="input"
            />
          </p>
          <div class="submit-enroll" @click="submit('form1')">提交申请</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="p1">Copyright©深圳青豆教育科技有限公司 粤ICP备15077651号</div>
      <div class="p2">市场有风险  投资需谨慎</div>
    </div>

    <!--    <div class="con8">-->
    <!--      <h5>联系我们</h5>-->
    <!--      <div class="enroll">-->
    <!--        <p class="enroll-tit">轻松创业 共享红利</p>-->
    <!--        <p>-->
    <!--          <van-field-->
    <!--            v-model="form2.name"-->
    <!--            type="text"-->
    <!--            placeholder="姓名"-->
    <!--            class="input"-->
    <!--          />-->
    <!--        </p>-->
    <!--        <p>-->
    <!--          <van-field-->
    <!--            v-model="form2.phone"-->
    <!--            type="number"-->
    <!--            maxlength="11"-->
    <!--            placeholder="联系方式"-->
    <!--            class="input"-->
    <!--          />-->
    <!--        </p>-->
    <!--        <div class="submit-enroll" @click="submit('form2')">提交申请</div>-->
    <!--      </div>-->
    <!--      <p class="contact">吴老师 18575581753（微信同号）</p>-->
    <!--    </div>-->
  </div>
</template>

<script>
import {validateMobile} from "@/utils/validate";
import {addNewAgentsApply} from "@/api";

export default {
  name: "index",
  data() {
    return {
      form1: {
        name: "",
        phone: "",
        type: 1,
      },
      form2: {
        name: "",
        phone: "",
        type: 1,
      },
    };
  },
  methods: {
    checkForm(formName) {
      const reg = /[^\u4E00-\u9FA5]/g;
      if (!this[formName].name) {
        this.$toast("姓名不能为空!");
        return false;
      } else if (this[formName].name.length > 8) {
        this.$toast("姓名长度不能大于8!");
        return false;
      } else if (reg.test(this[formName].name)) {
        this.$toast("姓名只能输入中文!");
        return false;
      } else if (!this[formName].phone) {
        this.$toast("手机号码不能为空!");
        return false;
      } else if (!validateMobile(this[formName].phone)) {
        this.$toast("手机格式错误!");
        return false;
      }
      return true;
    },
    resetForm() {
      this.form1.name = "";
      this.form1.phone = "";
      this.form2.name = "";
      this.form2.phone = "";
    },
    async submit(formName) {
      if (!this.checkForm(formName)) return;
      try {
        await addNewAgentsApply(this[formName]);
        this.$toast.success("提交成功");
        this.resetForm();
      } catch (e) {
        console.log(e, "error");
      }
    },
  },
};
</script>

<style scoped lang="less">
  .infojoinUs {
    h4 {
      font-size: 50px;
      font-weight: bold;
      color: #272727;
      padding-top: 60px;
      line-height: 1;
      text-align: center;
    }

    .input {
      width: 100%;
      padding: 16px;
      padding-left: 33px;
      border: 1px solid #E4E4E4;
      height: 96px;
      box-sizing: border-box;
      background: #ffffff;
      margin-bottom: 40px;
      border-radius: 50px;
      color: #afafaf;
      font-size: 33px;

      /deep/ .van-field__control {
        text-align: center;
      }
    }

    .banner_img {
      width: 100%;
    }

    .top {
      width: 100%;
      position: relative;
    }

    .box {
      background: #0023ED;
      position: relative;
      margin-top: -88px;

      .pingpai {
        margin: 0 44px;
        height: 84px;
      }

      .submit-box {
        position: relative;
        width: 702px;
        background: #ffffff;
        margin: 0 24px;
        height: 640px;
        border-radius: 15px;
        box-shadow: 0 6px 28px 2px rgb(226 226 255 / 66%);

        .butterfly {
          position: absolute;
          top: 0;
          left: 0;
          width: 135px;
          height: 142px;
        }

        h5 {
          font-size: 40px;
          font-weight: bold;
          color: #222325;
          line-height: 47px;
          text-align: center;
          padding-top: 50px;
          margin-bottom: 50px;
        }

        .enroll {
          padding-left: 30px;
          padding-right: 30px;

          .submit-enroll {
            width: 638px;
            height: 96px;
            background: #df2e2e;
            line-height: 96px;
            border-radius: 50px;
            color: #ffffff;
            font-size: 33px;
            font-weight: 400;
            text-align: center;
            margin-top: 70px;
          }
        }
      }
    }

    .footer{
      background: #0023ED;
      padding: 90px 0;
      .p1{
        font-size: 22px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
        color: #FFF8EF;
        line-height: 26px;
        text-align: center;
        opacity: 0.9;
      }
      .p2{
        height: 33px;
        font-size: 22px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
        color: #FFF8EF;
        line-height: 26px;
        text-align: center;
        margin-top: 19px;
        opacity: 0.4;
      }
    }
  }
</style>
