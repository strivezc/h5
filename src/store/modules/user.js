import { login, logout, getInfo } from "@/api/user";
import {
  getToken,
  removeToken,
  setToken,
  setUserId,
  setUserType,
  setUserName,
  setTeacherInfo,
  setIsOrgUser,
  setHasOrgPackage,
  setMonthLeave,
  setMobileArea,
  setUserPhone,
  setUserImg,
  setPeopleSign
} from "@/utils/auth";

const state = {
  token: getToken(),
  name: "",
  userImg: "",
  phone: "",
  userId: "",
  recommendCode: "",
  isApp: null,
  isPlay: false,
  centreMsg: 0, //是否开启图形验证码 1-开启 0-关闭
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USER_IMG: (state, userImg) => {
    state.userImg = userImg;
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId;
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone;
  },
  SET_isApp: (state, isApp) => {
    state.isApp = isApp;
  },
  SET_isPlay: (state, isPlay) => {
    state.isPlay = isPlay;
  },
  SET_RECOMMEND_CODE: (state, recommendCode) => {
    state.recommendCode = recommendCode;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const params={
        ...userInfo,
        loginId: userInfo.loginId.trim(),
        password:userInfo.password.trim(),
      }
      login(params)
        .then((response) => {
          const data = response.resultData;
          commit("SET_TOKEN", data.token);
          commit("SET_PHONE", data.phone);
          commit("SET_USER_ID", data.userId);
          commit("SET_NAME", data.userName);
          commit("SET_USER_IMG", data.userImg);
          setToken(data.token);
          setUserId(data.userId);
          setUserType(data.userType);
          setUserName(data.userName);
          setIsOrgUser(data.isOrgUser);
          setHasOrgPackage(data.hasOrgPackage);
          setMonthLeave(data.isMonthPackageForLeave);
          setMobileArea(data.mobileArea);
          setUserPhone(data.phone);
          setUserImg(data.userImg);
          setPeopleSign(data.peopleSign);
          const teacherInfoStr = JSON.stringify(data.teaLoginInfoRespDTO);
          setTeacherInfo(teacherInfoStr);
          sessionStorage.setItem('needRemid', data.needRemid);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  setRecommendCode({ commit }, recommendCode) {
    commit("SET_RECOMMEND_CODE", recommendCode);
  },
  setName({ commit }, name) {
    commit("SET_NAME", name);
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
