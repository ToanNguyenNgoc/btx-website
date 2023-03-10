<template>
  <v-container class="container">
    <div>
      <ul>
        <li>
          <router-link active-class="link_active" :to="{ name: 'profile-detail-route' }">Information</router-link>
        </li>
        <li>
          <router-link active-class="link_active" :to="{ name: 'orders-route' }">Order page</router-link>
        </li>
        <li>
          <router-link active-class="link_active" :to="{ name: 'appointments-route' }">Appointments page</router-link>
        </li>
        <li @click="onLogout">
          Đăng xuất
        </li>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </v-container>
</template>
<script lang="ts">
import store from '@/store'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const router = useRouter()
    const org = computed(() => store.state.orgModule.org)
    const onLogout = () => {
      store.dispatch('LOGOUT')
      router.push({ name: 'home' })
    }
    return { org, onLogout }
  }
})
</script>

<style scoped>
.container {
  display: flex;
}

.link_active {
  color: blueviolet;
}
</style>
