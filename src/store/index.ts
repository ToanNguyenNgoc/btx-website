import { createStore } from 'vuex'
import userModule from './modules/user.module'
import orgModule from './modules/org.module'
import homeModule from './modules/home.module'
import cartModule from './modules/cart.module'
import { StoreState } from '@/interfaces'

const store = createStore<StoreState>({
  modules: {
    userModule,
    orgModule,
    homeModule,
    cartModule
  }
})

export default store
