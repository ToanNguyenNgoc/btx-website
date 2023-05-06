<template>
  <div>
    <app-form v-if="step === 1" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="sign-form-row">
        <app-field class="app-input" name="telephone" placeholder="Số điện thoại" />
        <p class="form-row-error">{{ errors.telephone }}</p>
      </div>
      <div class="sign-form-bot">
        <v-btn :loading="isLoading" class="sign-form-bot_btn" type="submit" variant="tonal" color="var(--orange)">
          Lấy mã xác thực
        </v-btn>
      </div>
    </app-form>
    <register-form v-if="step === 2" @click-back="onBackFromRegister" :telephone="telephone" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import RegisterForm from "./RegisterForm.vue"
import api from "@/api/apiClient"
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import { validate } from "@/utils"
import { useMutation } from "@tanstack/vue-query"
import { Register } from "@/interfaces"

export default defineComponent({
  name: "SignUpPage",
  components: {
    AppForm: Form,
    AppField: Field,
    RegisterForm: RegisterForm,
  },
  setup() {
    const step = ref(1)
    const telephone = ref<string>('')
    const schema = Yup.object().shape({
      telephone: Yup.string()
        .required('Vui lòng nhập số điện thoại')
        .matches(validate.phone, { message: 'Số điện thoại không đúng định dạng' })
    })
    const { mutate, isLoading } = useMutation({
      mutationFn: (body: Register) => api.register(body),
      onSuccess: () => step.value = 2
    })
    const onSubmit = (data: any) => {
      mutate(data)
      telephone.value = data.telephone
    }
    const onBackFromRegister = () => step.value = 1
    return { step, schema, onBackFromRegister, onSubmit, isLoading, telephone }
  }
})
</script>