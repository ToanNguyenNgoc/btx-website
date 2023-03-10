<template>
  <div v-if="orgModule.load">
    <h1>Đang tải...</h1>
  </div>
  <div v-if="orgModule.org">
    <h1>{{ orgModule.org?.name }}</h1>
  </div>
  <ul>
    <li v-for="(service, index) in homeModule.services.data" :key="index">
      <router-link :to="{ name: 'ser-detail-route', params: { id: service.id } }">
        <span>{{ service.service_name }}</span>
      </router-link>
    </li>
  </ul>
  <ul>
    <li v-for="(product, index) in homeModule.products.data" :key="index">
      <router-link :to="{ name: 'pro-detail-route', params: { id: product.id } }">
        <span>{{ product.product_name }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import store from '@/store'
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'HomePage',
  computed: {
    ...mapState(['orgModule', 'homeModule'])
  },
  created() {
    if (this.homeModule.services.load) {
      store.dispatch('GET_SERVICES')
    }
    if (this.homeModule.products.load) {
      store.dispatch('GET_PRODUCTS')
    }
  }
})

</script>
