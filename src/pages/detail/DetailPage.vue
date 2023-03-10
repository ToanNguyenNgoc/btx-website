<template>
  <h1 v-if="isLoading">Đang tải...</h1>
  <h1>{{ detail?.service_name }}</h1>
</template>
<script lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/apiClient'

export default defineComponent({
  name: 'DetailPage',
  setup() {
    const route: any = useRoute()
    const { data, isLoading } = useQuery({
      queryKey: ['service',route.params.id],
      queryFn: () => api.service(route.params.id),
      refetchOnWindowFocus: false,
    })
    const detail = computed(() => data.value)
    return { detail, isLoading }
  }
})
</script>