<template>
  <div>
    <img src="@/assets/img/biaoti.png" class="biaoti"/>
    <div class="bound" v-if="phoneArr && phoneArr.length>0">
      <div class="gap_title">
        <span class="gap"></span>
        <span class="title">已绑定账号</span>
      </div>
      <div class="bound_input" v-for="item in phoneArr" :key="item">
        <span class="left">{{item}}</span>
        <span class="right" @click="unbind(item)">解绑</span>
      </div>
    </div>
    <div class="bind">
      <div class="gap_title">
        <span class="gap"></span>
        <span class="title">新账号绑定</span>
      </div>
      <div class="type_area">
      <span
          class="type_txt2"
          :class="{ active: currentPage === 'passwordBind' }"
          @click="switchTo('passwordBind')"
      >密码绑定</span
      >
        <span class="gap"></span>
        <span
            class="type_txt1"
            :class="{ active: currentPage === 'codeBind' }"
            @click="switchTo('codeBind')"
        >验证码绑定</span
        >
      </div>
    </div>
    <keep-alive>
      <component :is="currentPage" @refresh="getUserPhone"></component>
    </keep-alive>

    <div class="tip">
      <p>说明：</p>
      <p>1、您可在此绑定、解绑账号</p>
      <p>2、若您有其他问题，您可以咨询<span @click="toCustomer">在线客服</span>或者咨询您的课程顾问。</p>
    </div>
  </div>
</template>

<script>
import passwordBind from "./components/passwordBind";
import codeBind from "./components/codeBind";
import { userPhone,unBindAccount } from "@/api";

export default {
  name: "Login",
  components: {
    passwordBind,
    codeBind,
  },
  data() {
    return {
      currentPage: "passwordBind",
      code: "", // 活动码
      phoneArr:[]
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.getUserPhone();
  },
  methods: {
    switchTo(pageName) {
      this.currentPage = pageName;
    },
    async getUserPhone(){
      try {
        const {resultData} =await userPhone(this.code);
        this.phoneArr=resultData.phone;
      } catch (e) {
        console.log(e, 'error');
      }
    },
    unbind(account){
      this.$dialog.confirm({
        title:'提示',
        message: '您确定解绑该账号吗？',
        cancelButtonText:'取消',
        confirmButtonText:'确定',
      }).then(async ()=>{
        const params={
          account,
          code:this.code
        }
        try {
          await unBindAccount(params)
          this.$toast.success("解绑成功");
          this.getUserPhone();
        } catch (e) {
          console.log(e, 'error');
        }
      }).catch(()=>{
      });
    },
    toCustomer(){
      // if (getToken()) {
      //   window.location.href = `${process.env.IM_LINK}?platformType=0&platformUserId=${this.userId}&platformUserType=7&platformPhone=${this.phone}&platformNickName=${this.name}&platformTerminalType=1`;
      // } else {
      //   window.location.href = `${process.env.IM_LINK}?platformType=0&platformUserId=&platformUserType=7&platformPhone=&platformNickName=&platformTerminalType=1`
      // }
      window.location.href = `${process.env.IM_LINK}?platformType=0&platformUserId=&platformUserType=7&platformPhone=&platformNickName=&platformTerminalType=1`
    },
  },
};
</script>

<style scoped lang="less">
  .biaoti {
    height: 106px;
    display: block;
    margin: auto;
    margin-top: 18px;
  }

  .bound {
    margin: 60px 32px 0;
    padding-bottom: 20px;

    .bound_input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      width: 100%;
      height: 96px;
      border-radius: 48px;
      border: 1px solid #E4E4E4;

      .left {
        margin-left: 36px;
        font-size: 32px;
        font-weight: 400;
        color: #333333;
        line-height: 45px;
      }

      .right {
        margin-right: 50px;
        font-size: 32px;
        font-weight: 400;
        color: #0087FF;
        line-height: 45px;
      }
    }
  }

  .gap_title {
    display: flex;
    align-items: center;
    padding-bottom: 20px;

    .title {
      color: #333333;
      line-height: 56px;
      font-weight: 400;
      font-size: 40px;
    }

    .gap {
      width: 6px;
      height: 33px;
      background: #0087FF;
      display: inline-block;
      margin-left: 6px;
      margin-right: 23px;
      border-radius: 5px;
    }
  }

  .tip {
    margin: 30px 32px 108px;

    p {
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }

    span {
      color: #0087FF;
    }
  }

  .bind {
    margin: 60px 32px 0;
  }

  .type_area {
    height: 2.3rem;
    margin-top: 48px;
    font-size: 1.6rem;
    color: #999999;
    padding: 0 2.37rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .gap {
    width: 0.03rem;
    height: 1.27rem;
    background: #cecece;
    display: inline-block;
  }

  .type_area span {
  }

  .type_txt1 {
    font-size: 32px;
    font-weight: 400;
    color: #333333;
    line-height: 45px;
  }

  .type_txt2 {
    font-size: 32px;
    font-weight: 400;
    color: #333333;
    line-height: 45px;
  }

  .active {
    color: #0087FF;
  }

  .forget span {
    padding: 1.33rem 0;
  }
</style>
