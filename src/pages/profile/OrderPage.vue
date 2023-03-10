<template>
  <h1 v-if="isLoading">Loading...</h1>
  <ul>
    <li v-for="(order, index) in orders.data" :key="index">
      <p>{{ order.created_at }} - {{ order.amount }}</p>
    </li>
  </ul>
  <v-btn v-if="orders.data?.length < orders.total" :loading="isFetchingNextPage" @click="fetchNextPage">
    More
  </v-btn>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import api from '@/api/apiClient'
import { orderParam } from '@/params'
import { ResponseSuccess } from '@/interfaces'

export default defineComponent({
  name: 'OrderPage',
  setup() {
    const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
      queryKey: ['orders'],
      queryFn: ({ pageParam = 1 }) => api.orders({ ...orderParam, page: pageParam }),
      refetchOnWindowFocus: false,
      getNextPageParam: (page: ResponseSuccess<any>) => page.current_page + 1
    })
    const orders: any = computed(() => {
      return {
        data: data.value?.pages.map((page: ResponseSuccess<any>) => page.data).flat(),
        total: data.value?.pages[0]?.total
      }
    })
    return { orders, isLoading, fetchNextPage, isFetchingNextPage }
  }
})
</script>
