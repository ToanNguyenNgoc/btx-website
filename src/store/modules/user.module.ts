/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api/apiClient'
import { User, UserModule } from '@/interfaces'
import { Commit } from 'vuex'

const userModule = {
  state: {
    user: null,
    error: null,
    load: false
  },
  mutations: {
    async GET_INFO(state: UserModule) {
      const response = await api.profile()
      state.user = response
    },
    PUT_USER(state: UserModule, payload: User) {
      state.user = payload
    },
    LOGOUT(state: UserModule) {
      localStorage.removeItem('app-tk')
      state.user = null
    }
  },
  getters: {},
  actions: {
    GET_INFO({ commit }: { commit: Commit }) {
      commit('GET_INFO')
    },
    PUT_USER({ commit }: { commit: Commit }, payload: User) {
      commit('PUT_USER', payload)
    },
    LOGOUT({ commit }: { commit: Commit }) {
      commit('LOGOUT')
    }
  }
}

export default userModule
