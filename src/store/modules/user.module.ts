/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api/apiClient'
import { User, UserModule } from '@/interfaces'

const userModule = {
  state: {
    user: null,
    error: null,
    load: false
  },
  mutations: {
    async GET_INFO (state: UserModule) {
      const response = await api.profile()
      state.user = response
    },
    PUT_USER (state: UserModule, payload: User) {
      state.user = payload
    }
  },
  getters: {},
  actions: {
    GET_INFO (context: any) {
      context.commit('GET_INFO')
    },
    PUT_USER (context: any, payload:User) {
      context.commit('PUT_USER', payload)
    }
  }
}

export default userModule
