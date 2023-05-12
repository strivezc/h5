<template>
  <div class="content complianceContent">
    <div v-html="content">{{ content }}</div>
    <div v-if="resourceType==35 && showCheck" class="checkbox">
      <van-checkbox v-model="checked" shape="square" @change="changeCheck">我已阅读并同意《隐私政策》</van-checkbox>
    </div>
  </div>
</template>

<script>
import { getComplianceContent } from "@/api/user";
import { disagreePrivacy } from "@/utils/appMethod";

export default {
  name: "ComplianceContent",
  data() {
    return {
      content: "",
      resourceType: "",
      checked:true,
      showCheck:null,
    };
  },
  created() {
    this.resourceType = this.$route.params.id;
    this.platformType = this.$route.query.platformType;
    this.showCheck = this.$route.query.showCheck;
    this.getContent();
    if ((this.resourceType == 34 || this.resourceType == 35)
      && (this.platformType == 4 || this.platformType == 5 || this.platformType == 7)) {
      // AI英语测评的用户协议和隐私协议，修改document.title
      document.title = 'AI英语测评';
    }
  },
  methods: {
    changeCheck(val){
      if (!val) {
        this.$dialog.confirm({
          message: '若点击确定撤回《隐私政策》的同意，App将无法正常使用哦！',
          confirmButtonText:'取消撤回',
          cancelButtonText:'确定撤回',
        }).then(()=>{
          this.checked=true;
        }).catch(()=>{
          disagreePrivacy();
        });
      }
    },
    async getContent() {
      try {
        const { resultData } = await getComplianceContent({
          resourceType: this.resourceType,
          platformType: this.platformType,
        });
        if (resultData && resultData.content) {
          this.content = resultData.content;
        } else {
          if (this.resourceType == 34) {
            window.location.href = `${process.env.API_ROOT}/h5/static/html/userAgreement.html`;
          } else if (this.resourceType == 35) {
            window.location.href = `${process.env.API_ROOT}/h5/static/html/privacyPolicy.html`;
          } else if (this.resourceType == 36) {
            window.location.href = `${process.env.API_ROOT}/h5/static/html/juveniles.html`;
          }
        }
      } catch (e) {
        console.log(e, "error");
        if (this.resourceType == 34) {
          window.location.href = `${process.env.API_ROOT}/h5/static/html/userAgreement.html`;
        } else if (this.resourceType == 35) {
          window.location.href = `${process.env.API_ROOT}/h5/static/html/privacyPolicy.html`;
        } else if (this.resourceType == 36) {
          window.location.href = `${process.env.API_ROOT}/h5/static/html/juveniles.html`;
        }
      }
    },
  },
};
</script>

<style>
  .complianceContent img{
    max-width: 100%;
  }
</style>

<style scoped>
.content {
  font-size: 30px;
  padding: 20px;
  word-break: break-word;
}
  .checkbox{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
</style>
