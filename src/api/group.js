import request from '@/utils/request';
import { config } from '@/utils/config';

export function getGrouponPromotionInfo(data) {
  return request({
    url: `${config.market}/grouponPromotion/getGrouponPromotionInfo`,
    method: 'post',
    data
  });
}
export function buyGoods(data) {
  return request({
    url: `${config.market}/grouponPromotion/buyGoods`,
    method: 'post',
    data,
    isRepeatSubmit:true
  });
}
// 2023/4/17品牌推广创建订单接口修改
export function spreadOrder(data) {
  return request({
    url: `${config.market}/grouponPromotion/spreadOrder`,
    method: 'post',
    data,
    isRepeatSubmit:true
  });
}
export function advRegCallBack(clickId) {
  return request({
    url: `${config.market}/grouponPromotion/advRegCallBack/${clickId}`,
    method: 'get',
  });
}
//拼团
// 拼团状态-未登录
export function spellGroupStatusDetails(spellGroupSenderId,invitedUserId) {
  return request({
    url: `${config.market}/stuSpellGroup/spellGroupStatusDetails/${spellGroupSenderId}/${invitedUserId}`,
    method: 'get',
  });
}
// 拼团状态-已登录
export function spellGroupLoginStatus(spellGroupSenderId,invitedUserId) {
  return request({
    url: `${config.market}/stuSpellGroup/spellGroupLoginStatus/${spellGroupSenderId}/${invitedUserId}`,
    hideMessage:true,
    method: 'get',
  });
}
//拼团详情
export function spellGroupH5Details(spellGroupSenderId,id) {
  return request({
    url: `${config.market}/stuSpellGroup/spellGroupH5Details/${spellGroupSenderId}/${id}`,
    method: 'get',
  });
}
//支付后的拼团详情
export function spellGroupPayStatusDetails(spellGroupSenderId,invitedUserId) {
  return request({
    url: `${config.market}/stuSpellGroup/spellGroupPayStatusDetails/${spellGroupSenderId}/${invitedUserId}`,
    method: 'get',
  });
}
// 我的拼团订单详情查询
export function mySpellGroupOrderDetails(id) {
  return request({
    url: `${config.market}/stuSpellGroup/mySpellGroupOrderDetails/${id}`,
    method: 'get',
  });
}
export function existSpellGroupOrder(buyType,spellGroupId) {
  return request({
    url: `${config.market}/stuSpellGroup/existSpellGroupOrder/${buyType}/${spellGroupId}`,
    method: 'get',
  });
}

