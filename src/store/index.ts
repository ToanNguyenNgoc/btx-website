import { createStore } from 'vuex'
import userModule from './modules/user.module'
import orgModule from './modules/org.module'
import { StoreState } from '@/interfaces'

const store = createStore<StoreState>({
  modules: {
    userModule,
    orgModule
  }
})

export default store
