<template>
  <input type="file" v-on:change="onChangeFile">
  <h3>{{ user?.fullname }}</h3>
  <img :src="user?.avatar" alt="">
  <form @submit.prevent="onUpdateProfile">
    <input type="text" v-model="userForm.fullname">
    <input type="text" v-model="userForm.email">
    <input type="text" v-model="userForm.telephone">
    <button type="submit">Lưu</button>
  </form>
</template>
<script lang="ts">
import api from '@/api/apiClient'
import { UpdateProfile } from '@/interfaces'
import store from '@/store'
import { computed, defineComponent, reactive } from 'vue'
import { postMedia } from '@/utils'
export default defineComponent({
  name: 'ProfileDetailPage',
  setup () {
    const user = computed(() => store.state.userModule.user)
    const userForm = reactive({
      fullname: user.value?.fullname,
      email: user.value?.email,
      telephone: user.value?.telephone
    })
    const onChangeFile = async (e: Event) => {
      const { media_ids } = await postMedia(e)
      const response = await api.putProfile({ media_id: media_ids[0] })
      if (response) {
        store.dispatch('PUT_USER', { ...user.value, ...response })
      }
    }
    const onUpdateProfile = async () => {
      const body: UpdateProfile = {
        fullname: userForm.fullname,
        email: userForm.email !== user.value.email ? userForm.email : null
      }
      const response = await api.putProfile(body)
      store.dispatch('PUT_USER', { ...user.value, ...response })
    }
    return { user, userForm, onChangeFile, onUpdateProfile }
  }
})
</script>
