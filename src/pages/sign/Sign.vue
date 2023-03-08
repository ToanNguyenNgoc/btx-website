<template>
  <h1>Sign</h1>
  <form @submit.prevent="onSubmit">
    <input v-model="body.email" type="text" placeholder="Telephone...">
    <input v-model="body.password" type="text" placeholder="Password...">
    <v-btn :loading="load" :disabled="load" type="submit">Đăng nhập</v-btn>
  </form>
</template>

<script lang="ts">
import api from '@/api/apiClient'
import store from '@/store'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SignPage',
  setup () {
    const router = useRouter()
    const load = ref(false)
    const body = reactive({
      email: '',
      password: ''
    })
    const onSubmit = async () => {
      load.value = true
      try {
        const response = await api.login(body)
        if (response && response.token) {
          localStorage.setItem('app-tk', response.token)
          store.dispatch('GET_INFO', response)
          router.replace({ name: 'home' })
        }
      } catch (error) {
        load.value = false
      }
    }
    return { onSubmit, body, load }
  }
})
</script>
