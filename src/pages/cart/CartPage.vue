<template>
  <v-container>
    <h2>Cart page</h2>
    <ul>
      <li v-for="cart in cartModule.carts" :key="cart.item_id">
        <span>{{ cart.name }}</span>
        <app-price v-if="cart.price > 0" :price="cart.price" />
        <app-price :price="cart.special_price" />
        <v-btn @click="onDescCartItem(cart.item_id)">-</v-btn>
        {{ cart.quantity }}
        <v-btn @click="onAscCartItem(cart.item_id)">+</v-btn>
        <input type="checkbox" v-model="cart.confirm" @click="onToggleItem(cart.item_id)" />
        <v-btn @click="onRemoveItem(cart.item_id)">Remove</v-btn>
      </li>
    </ul>
    <h4>{{ totalItem }}</h4>
    <app-price :price="totalAmount" currency="đ" />
  </v-container>
</template>
<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import AppPrice from '@/components/Layouts/AppPrice.vue';
export default defineComponent({
  name: 'CartPage',
  components: {
    AppPrice: AppPrice
  },
  computed: {
    ...mapState(['cartModule']),
    ...mapGetters(['totalItem', 'totalAmount'])
  },
  methods: {
    onToggleItem(item_id: string) {
      store.dispatch('CART_TOGGLE_CONFIRM', item_id)
    },
    onAscCartItem(item_id: string) {
      store.dispatch('CART_ASC', item_id)
    },
    onDescCartItem(item_id: string) {
      store.dispatch('CART_DESC', item_id)
    },
    onRemoveItem(item_id: string) {
      store.dispatch('CART_REMOVE', item_id)
    }
  }
})
</script>