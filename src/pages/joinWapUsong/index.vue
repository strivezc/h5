<template>
  <div class="joinUs">
    <img src="@/assets/img/1.png" class="banner_img" />
    <img src="@/assets/img/2.png" class="banner_img" />
    <img src="@/assets/img/3.png" class="banner_img" />
    <img src="@/assets/img/4.png" class="banner_img" />
    <div class="page_bottom">
      <img src="@/assets/img/5.png" class="banner_img" />
      <van-field
        v-model="form.name"
        type="text"
        placeholder="姓名"
        class="input-name"
      />
      <van-field
        v-model="form.phone"
        type="number"
        placeholder="手机号"
        class="input-phone"
        maxlength="11"
      />
      <div class="submit-btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { validateMobile } from "@/utils/validate";
import { addNewAgentsApply } from "@/api";

export default {
  name: "index",
  data() {
    return {
      form: {
        name: "",
        phone: "",
        type: 2,
      },
    };
  },
  methods: {
    checkForm() {
      const reg = /[^\u4E00-\u9FA5]/g;
      if (!this.form.name) {
        this.$toast("姓名不能为空!");
        return false;
      } else if (this.form.name.length > 8) {
        this.$toast("姓名长度不能大于8!");
        return false;
      } else if (reg.test(this.form.name)) {
        this.$toast("姓名只能输入中文!");
        return false;
      } else if (!this.form.phone) {
        this.$toast("手机号码不能为空!");
        return false;
      } else if (!validateMobile(this.form.phone)) {
        this.$toast("手机格式错误!");
        return false;
      }
      return true;
    },
    async submit() {
      if (!this.checkForm()) return;
      try {
        await addNewAgentsApply(this.form);
        this.$toast.success("提交成功");
        this.form.name = "";
        this.form.phone = "";
      } catch (e) {
        console.log(e, "error");
      }
    },
  },
};
</script>

<style scoped lang="less">
.joinUs {
  .banner_img {
    width: 100%;
  }
  .page_bottom {
    position: relative;
    /deep/ .van-cell {
      padding: 0;
    }
    .input-name {
      position: absolute;
      left: 22.4%;
      top: 26.9%;
      width: 434px;
      height: 72px;
      /deep/ .van-field__body input {
        background: #f4f4f4;
        border: none;
        width: 434px;
        height: 72px;
        outline: none;
      }
    }
    .input-phone {
      position: absolute;
      left: 22.4%;
      top: 42%;
      width: 434px;
      height: 72px;
      /deep/ .van-field__body input {
        background: #f4f4f4;
        border: none;
        width: 434px;
        height: 72px;
        outline: none;
      }
    }
    .submit-btn {
      width: 60%;
      height: 80px;
      background: linear-gradient(
        90deg,
        rgba(255, 183, 39, 1),
        rgba(255, 203, 75, 1)
      );
      border-radius: 10px;
      text-align: center;
      line-height: 80px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 61.47%;
      font-size: 28px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
