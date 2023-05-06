<template>
  <component :is="$route.meta.Layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from './store'
import MainLayout from '@/components/Layouts/MainLayout.vue'
export default defineComponent({
  name: 'App',
  components: {
    MainLayout: MainLayout
  },
  created() {
    if (localStorage.getItem('app-tk')) {
      store.dispatch('GET_INFO')
    }
    store.dispatch('GET_ORG')
  },
})
</script>
