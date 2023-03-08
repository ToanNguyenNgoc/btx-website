/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api/apiClient'
import { OrgModule } from '@/interfaces'

const orgModule = {
  state: {
    org: null,
    load: true
  },
  mutations: {
    async GET_ORG (state: OrgModule) {
      try {
        const response = await api.organizationsId()
        state.load = false
        state.org = response
      } catch (error) {
        state.load = false
      }
    }
  },
  actions: {
    GET_ORG (context: any) {
      context.commit('GET_ORG')
    }
  }
}
export default orgModule
