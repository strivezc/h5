<template>

<div class="s-header">
    <div class="type1" v-if="headerType==1">
        <div class="type1_box">
            <img src="../../../../static/images/common/icon_left.png" class="icon_left" @click.stop="back"/>
            <div class="pagetit1">{{headerTit}}</div>
        </div>
        <div style="height:6.63rem;background:#fff"></div>
    </div>
    <div class="type2" v-if="headerType==2">
        <div class="type2_box">
            <img src="../../../../static/images/common/icon_left.png" class="icon_left" @click.stop="back"/>
            <span class="pagetit2 centerSPCZ">{{headerTit}}</span>
        </div>
        <div style="height:2.87rem;background:#fff"></div>
    </div>
</div>

</template>

<script>

export default {

    props:{
        headerType: Number,
        headerTit: String
    },

    data(){
        return{

        }
    },

    methods:{

        back(){
            this.$router.go(-1)
        }

    }

}

</script>

<style scoped>
.type1{
    
}
.type1_box{
    width: 100%;
    height: 6.63rem;
    position: fixed;
    top:0;
    left: 0;
    background: #fff;
}
.icon_left{
    width: 1.2rem;
    position: absolute;
    top: 0.8rem;
    left: 1.07rem;
}
.pagetit1{
    position: absolute;
    left: 1.07rem;
    bottom: 1.07rem;
    font-size: 1.87rem;
    color: #333;
    font-weight: 500;
}
.type2{
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
}
.type2_box{
    width: 100%;
    height: 2.87rem;
    position: fixed;
    top:0;
    left: 0;
    background: #fff;
}
</style>
