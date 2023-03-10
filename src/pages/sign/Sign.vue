<template>
  <v-container>
    <h1>Sign</h1>
    <form @submit.prevent="onSubmit">
      <app-input v-model="body.email" placeholder="Telephone..." />
      <app-input v-model="body.password" placeholder="Password..." />
      <v-btn color="var(--orange)" variant="tonal" :loading="load" :disabled="load" type="submit">
        Đăng nhập
      </v-btn>
    </form>
  </v-container>
</template>

<script lang="ts">
import api from '@/api/apiClient'
import store from '@/store'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppInput from '@/components/Layouts/AppInput.vue'

export default defineComponent({
  name: 'SignPage',
  components: {
    AppInput: AppInput,
  },
  setup() {
    const router = useRouter()
    const load = ref(false)
    const body = reactive({
      email: '',
      password: ''
    })
    const onSubmit = async () => {
      if (body.email.trim() !== '' && body.password !== '') {
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
    }
    return { onSubmit, body, load }
  }
})
</script>
