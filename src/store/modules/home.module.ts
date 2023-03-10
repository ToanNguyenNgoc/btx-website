import api from '@/api/apiClient'
import { HomeModule } from '@/interfaces'
import { Commit } from 'vuex'
const homeModule = {
  state: {
    services: {
      data: [],
      load: true
    },
    products: {
      data: [],
      load: true
    }
  },
  mutations: {
    async GET_SERVICES(state: HomeModule) {
      try {
        const response = await api.services()
        state.services.data = response.data
        state.services.load = false
      } catch (error) {
        state.services.load = false
      }
    },
    async GET_PRODUCTS(state: HomeModule) {
      try {
        const response = await api.products()
        state.products.data = response.data
        state.products.load = false
      } catch (error) {
        state.products.load = false
      }
    }
  },
  setters: {},
  actions: {
    GET_SERVICES({ commit }: { commit: Commit }) {
      commit('GET_SERVICES')
    },
    GET_PRODUCTS({ commit }: { commit: Commit }) {
      commit('GET_PRODUCTS')
    }
  }
}
export default homeModule