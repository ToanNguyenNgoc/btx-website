/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api/apiClient'
import { OrgModule } from '@/interfaces'
import { Commit } from 'vuex'

const orgModule = {
  state: {
    org: null,
    load: true,
    galleries: {
      data: [],
      load: true
    }
  },
  mutations: {
    async GET_ORG(state: OrgModule) {
      try {
        const response = await api.organizationsId()
        state.load = false
        state.org = response
      } catch (error) {
        state.load = false
      }
    },
    async GET_GALLERIES(state: OrgModule) {
      try {
        const response = await api.galleries()
        state.galleries.data = response
        state.galleries.load = false
      } catch (error) {
        state.galleries.data = false
      }
    }
  },
  actions: {
    GET_ORG(context: any) {
      context.commit('GET_ORG')
    },
    GET_GALLERIES({ commit }: { commit: Commit }) {
      commit('GET_GALLERIES')
    }
  }
}
export default orgModule
