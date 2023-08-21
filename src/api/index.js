import request from "@/utils/request";
import {config} from "@/utils/config";
import {getUserId, getPeopleSign} from '@/utils/auth';

export function aliWapPaymentApplication(data) {
  return request({
    url: `${config.market}/myOrder/aliWapPaymentApplication`,
    method: "post",
    data,
    isRepeatSubmit:true
  });
}
export function wxPaymentApplication(data) {
  return request({
    url: `${config.market}/myOrder/wxPaymentApplication`,
    method: "post",
    data,
    isRepeatSubmit:true
  });
}

// 品牌推广详情
export function getBrandPromotionInfo(data) {
  return request({
    url: `${config.market}/brandPromotion/getBrandPromotionInfo`,
    method: "post",
    data,
    hideMessage: true,
  });
}
// 活动推广详情
export function getActivityPromotionInfo(data) {
  return request({
    url: `${config.market}/activityPromotion/getBrandPromotionInfo`,
    method: "post",
    hideMessage: true,
    data,
  });
}
export function activityBuyGoods(data) {
  return request({
    url: `${config.market}/activityPromotion/buyGoods`,
    method: "post",
    data,
    isRepeatSubmit:true
  });
}
export function addNewAgentsApply(data) {
  return request({
    url: `${config.config}/aboutUs/addNewAgentsApply`,
    method: "post",
    data,
  });
}
export function userWxBind(data) {
  return request({
    url: `${config.async}/userBind/userWxBind`,
    method: "post",
    data,
  });
}
export function userWxBindBySms(data) {
  return request({
    url: `${config.async}/userBind/userWxBindBySms`,
    method: "post",
    data,
  });
}
export function userPhone(code) {
  return request({
    url: `${config.async}/userBind/userPhone/${code}`,
    method: "get",
  });
}
export function unBindAccount(data) {
  return request({
    url: `${config.async}/userBind/unBindAccount`,
    method: "post",
    data,
  });
}
export function createMemberOrder(data) {
  return request({
    url: `${config.market}/myOrder/createMemberOrder`,
    method: "post",
    data,
  });
}
export function createSpellGroupOrder(data) {
  return request({
    url: `${config.market}/myOrder/createSpellGroupOrder`,
    method: "post",
    data,
  });
}
export function orderStatus(id,orderFrom) {
  return request({
    url: `${config.market}/myOrder/orderStatus/${id}/${orderFrom}`,
    method: "get",
  });
}
export function getReportDetail() {
  return request({
    url: `${config.config}/learnReport/getReportDetail`,
    method: "get",
    hideMessage: true,
  });
}
export function teaYearLabel(data) {
  return request({
    url: `${config.record}/stu/teaYearLabel`,
    method: "post",
    data,
  });
}
export function createTagType(data) {
  return request({
    url: `${config.config}/learnReport/createTagType`,
    method: "post",
    data,
  });
}
export function createOrder(code) {
  return request({
    url: `${config.market}/memberActivity/createOrder/${code}`,
    method: "get",
  });
}
export function getActivityDetail(data) {
  return request({
    url: `${config.market}/memberActivity/getActivityDetail`,
    method: "post",
    data
  });
}
export function queryActivityInfo() {
  return request({
    url: `${config.market}/memberActivity/queryActivityInfo`,
    method: "get",
    hideMessage: true,
  });
}
export function getWxActivityDetail() {
  return request({
    url: `${config.market}/memberActivity/getWxActivityDetail`,
    method: "get",
    hideMessage: true,
  });
}
export function createMemberActivityOrder(data) {
  return request({
    url: `${config.market}/memberActivity/createOrder`,
    method: "post",
    data,
    isRepeatSubmit:true
  });
}
export function queryMemberActivityReward(activityId) {
  return request({
    url: `${config.market}/memberActivity/queryMemberActivityReward/${activityId}`,
    method: "get",
  });
}
export function getPrizeActivityInfo(code,hideMessage=false) {
  return request({
    url: `${config.market}/userPrizeActivity/getPrizeActivityInfo/${code}`,
    method: "get",
    hideMessage,
  });
}

export function queryNowRaffleInfo(code) {
  return request({
    url: `${config.market}/userPrizeActivity/queryNowRaffleInfo/${code}`,
    method: "get",
  });
}
export function runActivityPrize(code) {
  return request({
    url: `${config.market}/userPrizeActivity/runActivityPrize/${code}`,
    method: "get",
    hideMessage: true,
  });
}

export function addMarkedPointUserClickRecord(eventId) {
  return request({
    url: `${config.async}/markedPoint/addMarkedPointUserClickRecord`,
    method: "post",
    data: {
      userClickInfoReqDTO: JSON.stringify({
        userId: getUserId(),
        platformType: 3,
        peopleSign: getPeopleSign(),
        eventDetails: [
          {
            clickTime: parseInt(new Date().getTime() / 1000),
            eventType: 1,
            eventId,
          }
        ]
      })
    },
    hideMessage: true,
  });
}
export function queryQuestionnaireSurveyRaffleState() {
  return request({
    url: `${config.market}/userPrizeActivity/queryQuestionnaireSurveyRaffleState`,
    method: "get",
    hideMessage: true,
  });
}
export function submitsQuestionnaire(data) {
  return request({
    url: `${config.market}/userPrizeActivity/submitsQuestionnaire`,
    method: "post",
    data
  });
}
