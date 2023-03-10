<template>
  <h1 v-if="isLoading">Đang tải...</h1>
  <h1>{{ detail?.product_name }}</h1>
  <v-btn @click="onAddCart" color="var(--orange)" variant="tonal">Thêm vào giỏ hàng</v-btn>
</template>
<script lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/apiClient'
import store from '@/store'

export default defineComponent({
  name: 'DetailPageProduct',
  setup() {
    const route: any = useRoute()
    const { data, isLoading } = useQuery({
      queryKey: ['product', route.params.id],
      queryFn: () => api.product(route.params.id),
      refetchOnWindowFocus: false,
    })
    const detail = computed(() => data.value)
    const onAddCart = () => {
      store.dispatch('CART_ADD', {
        item: detail.value,
        type: 'PRODUCT',
        quantity: 1
      })
    }
    return { detail, isLoading, onAddCart }
  }
})
</script>