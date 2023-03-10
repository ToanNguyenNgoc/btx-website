import { Cart, CartModule, Product, Service } from "@/interfaces"
import { Commit } from "vuex"

interface PayloadAddCart {
  item: Service & Product,
  quantity: number,
  type: 'SERVICE' | 'PRODUCT'
}

const cartLocal:Cart[] = localStorage.getItem('BTX_CART')
  ? JSON.parse(`${localStorage.getItem('BTX_CART')}`)
  :
  []

const generatePrice = (specialPrice: number, gPrice: number) => {
  let special_price = specialPrice
  let price = gPrice
  if (special_price < 0) {
    special_price = gPrice
    price = 0
  }
  return { special_price, price }
}

const cartModule = {
  state: {
    carts: cartLocal,
    totalItem: 0,
    totalAmount: 0
  },
  getters: {
    totalItem(state: CartModule) {
      return state.carts.length
    },
    totalAmount(state: CartModule) {
      const cartsConfirm = state.carts.filter(item => item.confirm)
      let { total } = cartsConfirm.reduce((cartTotal: any, item: Cart) => {
        const { quantity, special_price } = item
        const itemTotal = quantity * special_price
        cartTotal.total += itemTotal
        return cartTotal
      }, { total: 0 })
      return total
    }
  },
  mutations: {
    CART_ADD(state: CartModule, payload: PayloadAddCart) {
      const item_id = `${payload.type}_${payload.item.id}`
      const iIndex = state.carts.findIndex(item => item.item_id === item_id)
      if (iIndex > -1) {
        state.carts[iIndex].quantity += payload.quantity
      } else {
        const { special_price, price } = generatePrice(
          payload.item.special_price,
          payload.item.price || payload.item.retail_price
        )
        const cartItem: Cart = {
          item_id: item_id,
          id: payload.item.id,
          name: payload.item.service_name || payload.item.product_name,
          image_url: payload.item.image_url,
          type: payload.type,
          price: price,
          special_price: special_price,
          quantity: payload.quantity,
          confirm: false
        }
        state.carts.unshift(cartItem)
      }
      localStorage.setItem('BTX_CART', JSON.stringify(state.carts))
    },
    CART_TOGGLE_CONFIRM(state: CartModule, payload: string) {
      const iIndex = state.carts.findIndex(item => item.item_id === payload)
      state.carts[iIndex].confirm = !state.carts[iIndex].confirm
      localStorage.setItem('BTX_CART', JSON.stringify(state.carts))
    },
    CART_ASC(state: CartModule, payload: string) {
      const iIndex = state.carts.findIndex(item => item.item_id === payload)
      state.carts[iIndex].quantity += 1
      localStorage.setItem('BTX_CART', JSON.stringify(state.carts))
    },
    CART_DESC(state: CartModule, payload: string) {
      const iIndex = state.carts.findIndex(item => item.item_id === payload)
      if (state.carts[iIndex].quantity > 1) {
        state.carts[iIndex].quantity -= 1
      }
      localStorage.setItem('BTX_CART', JSON.stringify(state.carts))
    },
    CART_REMOVE(state: CartModule, payload: string) {
      state.carts = state.carts.filter(item => item.item_id !== payload)
      localStorage.setItem('BTX_CART', JSON.stringify(state.carts))
    }
  },
  actions: {
    CART_ADD({ commit }: { commit: Commit }, payload: PayloadAddCart) {
      commit('CART_ADD', payload)
    },
    CART_TOGGLE_CONFIRM({ commit }: { commit: Commit }, payload: number) {
      commit('CART_TOGGLE_CONFIRM', payload)
    },
    CART_ASC({ commit }: { commit: Commit }, payload: number) {
      commit('CART_ASC', payload)
    },
    CART_DESC({ commit }: { commit: Commit }, payload: number) {
      commit('CART_DESC', payload)
    },
    CART_REMOVE({ commit }: { commit: Commit }, payload: number) {
      commit('CART_REMOVE', payload)
    }
  }
}
export default cartModule