const state = {
  groupData: {}, // 团购数据
}

const mutations = {
  SET_GROUP_DATA: (state, data) => {
    state.groupData = data;
    sessionStorage.setItem('groupData',JSON.stringify(data))
  },
}

const actions = {
  setGroupData({commit}, data){
    commit('SET_GROUP_DATA', data);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

