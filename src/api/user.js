import request from '@/utils/request';
import { config } from '@/utils/config';

export function login(data) {
  return request({
    url: `${config.users}/user/login`,
    method: 'post',
    data
  });
}
export function register(data) {
  return request({
    url: `${config.users}/user/register`,
    method: 'post',
    data
  });
}
export function regForSpread(data) {
  return request({
    url: `${config.users}/user/regForSpread`,
    method: 'post',
    data
  });
}
export function regForActivity(data) {
  return request({
    url: `${config.users}/user/regForActivity`,
    method: 'post',
    data
  });
}
export function resetPassword(data) {
  return request({
    url: `${config.users}/user/resetPassword`,
    method: 'post',
    data
  });
}
export function sendSmsCode(data) {
  return request({
    url: `${config.users}/user/sendSmsCode`,
    method: 'post',
    data
  });
}
export function sendSmsCodeByCaptcha(data) {
  return request({
    url: `${config.users}/user/sendSmsCodeByCaptcha`,
    method: 'post',
    data
  });
}
export function getPictureCode() {
  return request({
    url: `${config.users}/user/getPictureCode`,
    method: 'post',
  });
}

export function getInfo(userId) {
  return request({
    url: `${config.users}/user/getUserMessageForFront/${userId}`,
    method: 'get',
  });
}

export function logout() {
  return request({
    url: `${config.users}/user/logout`,
    method: 'post'
  });
}

export function getComplianceContent(data) {
  return request({
    url: `${config.users}/user/queryComplianceContent`,
    method: 'post',
    hideMessage: true,
    data
  });
}
export function getWxinShareInfo(data) {
  return request({
    url: `${config.users}/user/getWxinShareInfo`,
    method: 'post',
    data
  });
}
export function checkLogin() {
  return request({
    url: `${config.users}/user/startClass`,
    method: 'get',
    hideMessage: true,
  });
}
export function uploadImgForAdmin(data) {
  return request({
    url: `${config.async}/fileServer/uploadFileByBase64`,
    method: 'post',
    data,
  });
}
