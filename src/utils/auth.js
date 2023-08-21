import Cookies from 'js-cookie';

const TokenKey = 'token';
const UserId = 'userId';
const UserType='userType';
const TeacherInfo='teacherInfo';
const UserName='userName';
const IsOrgUser='isOrgUser';
const HasOrgPackage='hasOrgPackage';
const MonthLeave='monthLeave';
const MobileArea='mobileArea';
const UserPhone='userPhone';
const UserImg='userImg';
const PeopleSign='peopleSign';


export function getPeopleSign() {
  return Cookies.get(PeopleSign);
}
export function setPeopleSign(peopleSign) {
  return Cookies.set(PeopleSign, peopleSign);
}
export function removePeopleSign() {
  return Cookies.remove(PeopleSign);
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function setUserImg(userImg) {
  return Cookies.set(UserImg,userImg);
}
export function getUserImg() {
  return Cookies.get(UserImg);
}
export function removeUserImg() {
  return Cookies.remove(UserImg);
}

export function getUserId() {
  return Cookies.get(UserId);
}

export function removeUserId() {
  return Cookies.remove(UserId);
}

export function setUserId(userId) {
  return Cookies.set(UserId, userId);
}

export function getUserPhone() {
  return Cookies.get(UserPhone);
}

export function removeUserPhone() {
  return Cookies.remove(UserPhone);
}

export function setUserPhone(userPhone) {
  return Cookies.set(UserPhone, userPhone);
}

export function setUserType(userType) {
  return Cookies.set(UserType,userType);
}
export function getUserType() {
  return Cookies.get(UserType);
}
export function removeUserType() {
  return Cookies.remove(UserType);
}

export function setUserName(userName) {
  return Cookies.set(UserName,userName);
}
export function getUserName() {
  return Cookies.get(UserName);
}
export function removeUserName() {
  return Cookies.remove(UserName);
}

export function setTeacherInfo(teacherInfo) {
  return Cookies.set(TeacherInfo,teacherInfo);
}
export function getTeacherInfo() {
  return Cookies.get(TeacherInfo);
}
export function removeTeacherInfo() {
  return Cookies.remove(TeacherInfo);
}
export function getIsOrgUser() {
  return Cookies.get(IsOrgUser);
}
export function removeIsOrgUser() {
  return Cookies.remove(IsOrgUser);
}
export function setIsOrgUser(isOrgUser) {
  return Cookies.set(IsOrgUser,isOrgUser);
}
export function getHasOrgPackage() {
  return Cookies.get(HasOrgPackage);
}
export function removeHasOrgPackage() {
  return Cookies.remove(HasOrgPackage);
}
export function setHasOrgPackage(hasOrgPackage) {
  return Cookies.set(HasOrgPackage,hasOrgPackage);
}

export function getMonthLeave() {
  return Cookies.get(MonthLeave);
}
export function removeMonthLeave() {
  return Cookies.remove(MonthLeave);
}
export function setMonthLeave(monthLeave) {
  return Cookies.set(MonthLeave,monthLeave);
}

export function getMobileArea() {
  return Cookies.get(MobileArea);
}
export function removeMobileArea() {
  return Cookies.remove(MobileArea);
}
export function setMobileArea(mobileArea) {
  return Cookies.set(MobileArea,mobileArea);
}
