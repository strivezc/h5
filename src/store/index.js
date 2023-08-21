import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import content from './modules/content'
import cachedRoute from './modules/cachedRoute'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,
    content,
    cachedRoute
  },
  getters
})
