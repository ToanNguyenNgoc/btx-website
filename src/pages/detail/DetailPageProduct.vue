<template>
  <h1 v-if="isLoading">Đang tải...</h1>
  <h1>{{ detail?.product_name }}</h1>
</template>
<script lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/apiClient'

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
    console.log(detail)
    return { detail, isLoading }
  }
})
</script>