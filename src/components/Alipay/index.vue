<template>
  <div v-html="form">{{ form }}</div>
</template>
<script>
export default {
  name: "Alipay",
  data() {
    return {
      form: "",
    };
  },
  mounted() {
    //接收表单内容
    this.form = this.$route.query.htmls;
    this.$nextTick(() => {
      document.forms[0].submit(); //自动执行表单提交事件
    });
  },
};
</script>
