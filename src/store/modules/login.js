import * as types from '../mutation-types.js'
import { setUserInfo, removeUserInfo } from '@/utils/cache.js'
import { logout } from '@/api/login'
import { removeToken } from '@/utils/auth'
const state = {
  showLogin: false,
  action: '',
  // userinfo: getUserInfo()
  userinfo: ''
}
const mutations = {
  [types.SET_SHOW_LOGIN](state, showLogin) {
    state.showLogin = showLogin
  },
  [types.SET_LOGIN_ACTION](state, action) {
    state.action = action
  },
  [types.SET_USER_INFO](state, userinfo) {
    state.userinfo = userinfo
    if (userinfo) {
      setUserInfo(userinfo)
    } else {
      removeUserInfo(userinfo)
    }
  }
}

const actions = {
  // logout ({commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios.get('/api/v1/user/logout').then(res => {
  //       const { code } = res
  //       if (code === ERR_OK) {
  //         commit(types.SET_USER_INFO, '')
  //         resolve()
  //       } else {
  //         reject()
  //       }
  //     }).catch(() => {
  //       reject()
  //     })
  //   })
  // }
  // 退出系统
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit(types.SET_USER_INFO, '')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // commit('SET_PERMISSIONS', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
