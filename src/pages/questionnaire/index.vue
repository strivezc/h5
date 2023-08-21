<template>
  <div class="questionnaire">
    <van-form @failed="onFailed" ref="form">
      <div v-for="(item,index) in questionData" :key="index">
        <van-field v-if="item.name==='radio'"
                   :name="`${item.name}${index}`"
                   required
                   :label="`${index+1}、${item.label}`"
                   :rules="item.rules">
          <template #input>
            <van-radio-group v-model="item.value">
              <van-radio :name="index+1" v-for="(item,index) in item.data" :key="index+1">{{item}}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-else-if="item.name==='checkboxGroup'"
                   :name="`${item.name}${index}`"
                   required
                   :label="`${index+1}、${item.label}`"
                   :rules="item.rules">
          <template #input>
            <van-checkbox-group v-model="item.value">
              <van-checkbox :name="index+1" v-for="(item,index) in item.data" :key="index+1" shape="square">{{item}}
              </van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
      </div>
      <div style="margin: 16px;" v-if="!noAttend">
        <van-button round block type="info" @click="submit">提交</van-button>
      </div>
    </van-form>

    <LoginPopup :showPopup.sync="showPopup"
                :isLoginAction.sync="isLoginAction"
                @handleLogin="handleLogin"
                @handleRegister="handleLogin"
                ref="loginPopup">
    </LoginPopup>
  </div>
</template>

<script>
import LoginPopup from "@/components/LoginPopup";
import {checkLogin} from '@/api/user';
import { queryQuestionnaireSurveyRaffleState, submitsQuestionnaire } from "@/api";
import {getToken, removeToken, setToken} from '@/utils/auth';

export default {
  name: "index",
  components: {LoginPopup},
  data() {
    return {
      code:'', // 抽奖活动码
      isToRaffle:'', // 是否可以抽奖  1.可以抽奖  2.请完成问卷  3.用户已抽奖  4.抽奖未开启 5.抽奖活动结束
      questionData: [
        {
          name: 'radio',
          label: '请问您的年龄？',
          data: ['A、18岁以下', 'B、18岁-30岁', 'C、31岁--45岁', 'D、45岁以上'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '您目前的生活状态',
          data: ['A、有全职工作，很忙', 'B、有全职工作但不忙，可兼顾家庭', 'C、有时间自由的工作，可较好的兼顾家庭', 'D、全职照顾家庭'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '您是通过什么渠道了解到说客英语？',
          data: ['A、朋友圈分享 ', 'B、朋友推荐', 'C、抖音，微博，小红书等', 'D、广告', 'E、其他'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '您期望的线上学习的频次为?',
          data: ['A、每周1次 ', 'B、每周2～4次', 'C、每天1次', 'D、每天多次'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'checkboxGroup',
          label: '您经常使用哪些软件较多（多选）',
          data: ['A、微博 ', 'B、小红书', 'C、抖音', 'D、微信', 'E、哔哩哔哩', 'F、知乎', 'G、贴吧'],
          value: [],
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'checkboxGroup',
          label: '什么样的内容会吸引您打开？（多选）',
          data: ['A、活动类内容 ', 'B、新功能介绍', 'C、提醒和通知类内容'],
          value: [],
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '除了跟上课有关的操作，您平时会使用说客英语吗？',
          data: ['A、会 ', 'B、不会'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '如果停留，活动中什么内容吸引你停留？',
          data: ['A、活动的介绍 ', 'B、活动的样式', 'C、活动的数据', 'D、活动的优惠'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '您会主动和朋友分享平台吗？',
          data: ['A、不会，上完课都直接关闭软件 ', 'B、如果有助于学习，会乐意分享', 'C、可能会，需要根据本堂课的学习情况和老师的教学情况而定', 'D、会，分享学习近况有助于记录自己的学习过程'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '您认为系统最需要改进的功能是哪项?',
          data: ['A、VIP约课/续课功能 ', 'B、学习计划功能', 'C、邀请有礼功能', 'D、黄金会员扩展权益', 'E、拼团功能', 'F、课前预约、课后复习功能'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'checkboxGroup',
          label: '如果说客推出新功能，您需要的是？（多选）',
          data: ['A、帮助提高英语水平的学习工具', 'B、可以提供更多优惠的活动功能', 'C、黄金会员可获得更多权益', 'D、提高现有功能的体验和增加功能的使用引导'],
          value: [],
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '优先选择哪种方式购买课时？',
          data: ['A、咨询学习顾问统一购买', 'B、通过说客英语App定期的拼团活动获得', 'C、通过说客英语App定期的邀请有礼获得', 'D、在说客英语的官方网站进行购买'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'checkboxGroup',
          label: '如果说客孵化新课程，您需要的是？（多选）',
          data: ['A、各个阶段的学习规划服务', 'B、解决学习具体问题的训练营（专注力，学习力）', 'C、亲子沟通', 'D、情绪管理', 'E、家庭健康营养'],
          value: [],
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '注册成功后您多久接到我们学习顾问的联系？',
          data: ['A、2小时内', 'B、12小时内', 'C、24小时内', 'D、超过24小时'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '学习顾问是否会协助推荐合适的老师和教材？',
          data: ['A、会主动推荐让我满意的老师和教材', 'B、会推荐，但推荐的老师和教材不是太让我满意', 'C、从来不会推荐'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '购买套餐开始正常上课后，学习顾问一般多久会联系您了解学习情况？',
          data: ['A、每周', 'B、每个月', 'C、套餐内课时快用完时', 'D、不联系'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '您有问题主动咨询学习顾问时，一般多久得到回复？',
          data: ['A、实时', 'B、1小时内', 'C、24小时内', 'D、超过24小时', 'F、不回复'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '官方推出的活动，如果您满足条件，学习顾问是否主动联系您并发放奖励？',
          data: ['A、是', 'B、否，需要自己问'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'checkboxGroup',
          label: '您最希望得到学习顾问提供的服务是哪些？（多选）',
          data: ['A、提供专业学习规划服务', 'B、推荐合适的老师', 'C、及时告知优惠活动', 'D、定期对学习提供指导和建议'],
          value: [],
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'checkboxGroup',
          label: '客服为您服务时，您觉得是否满意？（多选）',
          data: ['A、回复专业', 'B、回复不专业', 'C、服务态度好', 'D、服务态度不好', 'E、解决问题迅速', 'F、解决问题慢'],
          value: [],
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '约课选择老师的时候，您更侧重哪一点？',
          data: ['A、老师的发音', 'B、老师履历（学历、教学经验）', 'C、来自学员的评分和评价内容'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
        {
          name: 'radio',
          label: '您更喜欢老师怎样的课堂教学方式？',
          data: ['A、严格把握好上课进度，100%完成教材内容', 'B、需重点纠正发音、词汇、语法等错误，教材无需当节课完成', 'C、注重交流和拓展，无需纠正', 'D、使用教学道具、多样化教学（画画、唱歌、游戏、音视频）'],
          value: '',
          rules: [{required: true, message: '请选择'}],
        },
      ],
      isLogin: Boolean(getToken()),
      showPopup: false,
      isLoginAction: true,
      noAttend: false,
    };
  },
  created() {
    this.checkLogin();
    document.title = '说客英语问卷调查';
  },
  methods: {
    /**
     *@desc allReady 是否已填完问卷
     *@author zzc
     *@date 2022/11/28
     */
    async checkQuestionnaireStatus(allReady){
      try {
        const {resultData} = await queryQuestionnaireSurveyRaffleState();
        this.code=resultData.code;
        this.isToRaffle=resultData.isToRaffle;
        const raffleTime=resultData.raffleTime;
        if (this.isToRaffle===1) {
          if (allReady) {
            window.location.href=`${window.location.origin}/h5/specialLottery?code=${this.code}`;
          } else {
            this.$dialog.alert({
              title: '温馨提示',
              message: '您已完成该问卷，可进入抽奖',
              confirmButtonText: '去抽奖',
              className: 'dialogAlert',
              closeOnClickOverlay: true
            }).then(() => {
              window.location.href=`${window.location.origin}/h5/specialLottery?code=${this.code}`;
            })
          }
        } else if (this.isToRaffle===3) {
          this.$dialog.alert({
            title: '温馨提示',
            message: '您已完成抽奖',
            confirmButtonText: '查看抽奖记录',
            className: 'dialogAlert',
            closeOnClickOverlay: true
          }).then(() => {
            window.location.href=`${window.location.origin}/h5/specialLottery?code=${this.code}&isToRaffle=${this.isToRaffle}`;
          })
        } else if (this.isToRaffle===4) {
          this.$dialog.alert({
            title: '温馨提示',
            message: `该抽奖活动还未开始，具体时间为<br>${raffleTime}`,
            confirmButtonText: '我知道了',
            className: 'dialogAlert',
            closeOnClickOverlay: true
          })
          this.noAttend=true;
        } else if (this.isToRaffle===5) {
          this.$dialog.alert({
            title: '温馨提示',
            message: '该问卷活动已结束',
            confirmButtonText: '我知道了',
            className: 'dialogAlert',
            closeOnClickOverlay: true
          })
          this.noAttend=true;
        }
      } catch (e) {
        this.$toast(e.resultMessage);
        if (e.resultMessage.indexOf('您不能参与该活动')>-1) {
          this.noAttend=true;
        }
      }
    },
    async checkLogin() {
      try {
        if (getToken()) {
          await checkLogin();
          await this.checkQuestionnaireStatus();
        } else {
          this.isLogin = false;
          this.showPopup = true;
        }
      } catch (e) {
        if (e.resultCode === -1) {
          removeToken('token');
          this.isLogin = false;
          this.showPopup = true;
        }
      }
    },
    handleLogin() {
      this.isLogin = Boolean(getToken());
      if (this.isLogin) {
        this.checkQuestionnaireStatus();
      } else {

      }
    },
    submit(){
      this.$refs.form.validate().then(()=>{
        this.onSubmit();
      }).catch(err=>{
        this.onFailed(err);
      });
    },
    async onSubmit(values) {
      if (this.isLogin) {
        if (this.isToRaffle === 2) {
          try {
            let userSurveyInfo = this.questionData.map((item, index) => {
              return {
                titleNumber: index + 1,
                titleType: item.name === 'radio' ? 1 : 2,
                answer: item.name === 'radio' ? item.value : item.value.toString().replace(/,/g, '#'),
              }
            })
            let params = {
              code: this.code,
              userSurveyInfo
            };
            console.log(params, 'params');
            await submitsQuestionnaire(params);
            this.checkQuestionnaireStatus(true);
          } catch (e) {
            console.log(e, 'error');
          }
        } else if (this.isToRaffle === 4) {
          this.$dialog.alert({
            title: '温馨提示',
            message: '该抽奖活动还未开始',
            confirmButtonText: '我知道了',
            className: 'dialogAlert',
            closeOnClickOverlay: true
          })
        } else if (this.isToRaffle === 5) {
          this.$dialog.alert({
            title: '温馨提示',
            message: '该问卷活动已结束',
            confirmButtonText: '我知道了',
            className: 'dialogAlert',
            closeOnClickOverlay: true
          })
        }
      } else {
        this.showPopup = true;
      }
    },
    onFailed(errors) {
      if (errors.length>0) {
        this.$refs.form.scrollToField(errors[0].name);
      }
    },
  }
}
</script>

<style scoped lang="less">
  .questionnaire {
    background: #eeeeee;
  }
  /deep/ .van-cell{
    padding-left: 32px!important;
  }
  /deep/ .van-field {
    display: block;
    margin-bottom: 30px;
  }

  /deep/ .van-field__label {
    color: rgba(0, 0, 0, 1);
    font-size: 34px;
    padding: 30px 0;
    width: auto;
    padding-left: 10px;
  }

  /deep/ .van-cell--required::before {
    padding: 30px 0;
  }

  /deep/ .van-radio {
    padding: 15px 0;
    font-size: 30px;
  }

  /deep/ .van-checkbox__label {
    padding: 15px 0;
    font-size: 30px;
  }
</style>
