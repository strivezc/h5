<template>

  <div class="navigation">
    <div class="navi_tab" @click.stop="toPage(1)">
        <img :src='tab1Icon' class='tab_img'/>
        <span class="tab_name" :class="{'act': pagenum == 1}">首页</span>
    </div>
    <div class="navi_tab"  @click.stop="toPage(2)">
        <img :src="tab2Icon"  class='tab_img'/>
        <span class="tab_name" :class="{'act': pagenum == 2}">约课</span>
    </div>
    <div class="navi_tab"  @click.stop="toPage(3)">
        <img :src="tab3Icon"  class='tab_img'/>
        <span class="tab_name" :class="{'act': pagenum == 3}">我的</span>
    </div>
  </div>

</template>

<script>
export default {

  props:{
    pagenum: Number,
  },

  data(){
    return{
      tab1Icon: require('../../../../static/images/student/home_gray.png'),
      tab1_act:require('../../../../static/images/student/home.png'),
      tab2Icon: require('../../../../static/images/student/appointment_gray.png'),
      tab2_act:require('../../../../static/images/student/appointment.png'),
      tab3Icon: require('../../../../static/images/student/person_gray.png'),
      tab3_act:require('../../../../static/images/student/person.png'),
    }
  },

  mounted(){
    switch(this.pagenum){
      case 1:
        this.tab1Icon = this.tab1_act
        break;
      case 2:
        this.tab2Icon = this.tab2_act
        break;
      case 3:
        this.tab3Icon = this.tab3_act
        break;
    }
  },

  methods:{
    toPage(pagenum){
      if(this.pagenum === pagenum)return;
      switch(pagenum){
      case 1:
        this.$router.push('/student/home');
        break;
      case 2:
        this.$router.push('/student/appointment');
        break;
      case 3:
        this.$router.push('/student/personal');
        break;
      }
    }
  }

}
</script>

<style scoped>

.navigation{
  position: fixed;
  left:0;
  bottom: 0;
  height: 3.27rem;
  width: 100%;
  background: #fff;
  padding: 0.7rem 4.7rem 0 4.7rem;
  display: flex;
  justify-content: space-between;
  text-align: center;
  box-sizing: border-box;
  font-size: 0;
  z-index: 100;
  box-shadow: 0rem 0rem 0.67rem 0rem rgba(217, 217, 217, 0.5);
}
.navi_tab{
  width: 4rem;
}
.tab_img{
  width: 1.33rem;
}
.tab_name{
  display: block;
  font-size: 0.66rem;
  color: #BEC1C6;
  margin-top: 0.16rem;
}
.act{
  color: #1190FF;
}
</style>
