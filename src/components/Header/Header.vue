<template>
  <v-container>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <div v-if="!userModule.user">
      <router-link :to="{ name: 'sign-in-route' }">Đăng nhập</router-link>
      <router-link :to="{ name: 'sign-up-route' }">Đăng ký</router-link>
    </div>
    <div v-if="userModule.user">
      <router-link :to="{ name: 'profile-detail-route' }">{{ userModule.user?.fullname }}</router-link>
    </div>
  </v-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { mapState } from 'vuex'
export default defineComponent({
  name: 'AppHeader',
  computed: mapState(['userModule']),
  setup() {
    return {}
  }
})

</script>
