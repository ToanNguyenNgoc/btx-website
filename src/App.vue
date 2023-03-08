<template>
  <app-header />
  <router-view />
  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import store from './store'
export default defineComponent({
  name: 'App',
  components: {
    AppHeader: Header,
    AppFooter: Footer
  },
  created () {
    if (localStorage.getItem('app-tk')) {
      store.dispatch('GET_INFO')
    }
    store.dispatch('GET_ORG')
  }
})
</script>
