<template>
  <v-container>
    <div>
      <div v-if="step === 1">
        <h1>Telephone</h1>
        <form @submit.prevent="handleSubmit">
          <input class="app-input" v-model="telephone" placeholder="Telephone..." />
          <v-btn :loading="load" :disabled="load" color="var(--orange)" type="submit" variant="tonal">Lấy mã otp</v-btn>
        </form>
      </div>
      <register-form @click-back="onBackFromRegister" v-if="step === 2" :telephone="telephone" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import RegisterForm from "./RegisterForm.vue"
import AppInput from "@/components/Layouts/AppInput.vue"
import api from "@/api/apiClient"

export default defineComponent({
  name: "SignUpPage",
  components: {
    RegisterForm: RegisterForm,
    AppInput: AppInput,
  },
  setup() {
    const step = ref(1)
    const telephone = ref()
    const load = ref(false)
    const handleSubmit = async () => {
      load.value = true
      try {
        const response = await api.register({ telephone: telephone.value })
        if (response) {
          step.value = 2
          load.value = false
        }
      } catch (error) {
        load.value = false
      }
    }
    const onBackFromRegister = () => step.value = 1
    return { step, load, telephone, handleSubmit, onBackFromRegister }
  }
})
</script>