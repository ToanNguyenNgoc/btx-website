<template>
  <div id="header" class="header">
    <v-container>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'gallery-route' }">Thư viện</router-link>
      <div v-if="!userModule.user">
        <router-link :to="{ name: 'sign-in-route' }">Đăng nhập</router-link>
        <router-link :to="{ name: 'sign-up-route' }">Đăng ký</router-link>
      </div>
      <router-link v-if="userModule.user" :to="{ name: 'profile-detail-route' }">
        {{ userModule.user?.fullname }}
      </router-link>
      <router-link :to="{ name: 'cart-route' }">Giỏ hàng({{ totalItem }})</router-link>
    </v-container>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
export default defineComponent({
  name: 'AppHeader',
  computed: {
    ...mapState(['userModule']),
    ...mapGetters(['totalItem'])
  },
  setup() {
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header')
      if (header) {
        header.style.backgroundColor = `rgb(255 204 188 / ${window.scrollY}%)`
      }
    })
    return {}
  }
})

</script>
<style scoped>
.header {
  top: 0;
  left: 0;
  /* position: fixed; */
  /* z-index: 10; */
  /* width: 100vw; */
  /* transition: var(--trans); */
}

.v-container {
  margin: 0px auto;
}
</style>
