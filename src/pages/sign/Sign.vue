<template>
  <app-form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
    <div class="sign-form-row">
      <app-field @focus="errMessage = null" class="app-input" name="email" placeholder="Email/Số điện thoại" />
      <p class="form-row-error">{{ errors.email }}</p>
    </div>
    <div class="sign-form-row">
      <app-field @focus="errMessage = null" type="password" class="app-input" name="password" placeholder="Mật khẩu" />
      <p v-if="errors || errMessage" class="form-row-error">{{ errors.password ?? errMessage }}</p>
    </div>
    <div class="sign-form-bot">
      <v-btn :loading="isLoading" class="sign-form-bot_btn" type="submit" variant="tonal" color="var(--orange)">
        Đăng nhập
      </v-btn>
    </div>
  </app-form>
</template>

<script lang="ts">
import api from '@/api/apiClient'
import store from '@/store'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppInput from '@/components/Layouts/AppInput.vue'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/vue-query'
import { Login } from '@/interfaces'
import { AxiosError } from 'axios'
import router from '@/router'

export default defineComponent({
  name: 'SignPage',
  components: {
    AppInput: AppInput,
    AppForm: Form,
    AppField: Field
  },
  setup() {
    const errMessage = ref<string | null>(null)
    const schema = Yup.object().shape({
      email: Yup.string().required('Vui lòng nhập Email/Số điện thoại'),
      password: Yup.string().required('Vui lòng nhập mật khẩu')
    })
    const { mutate, isLoading } = useMutation({
      mutationFn: (body: Login) => api.login(body),
      onSuccess: (response) => {
        localStorage.setItem('app-tk', response.token)
        store.dispatch('GET_INFO')
        router.push('/')
      },
      onError: (error) => {
        const err = error as AxiosError
        if (err.response?.status === 401) errMessage.value = 'Mật khẩu không đúng'
        if (err.response?.status === 404) errMessage.value = 'Email/Số điện thoại chưa đăng ký'
      }
    })
    const onSubmit = (values: any) => {
      mutate(values)
    }
    return { onSubmit, schema, isLoading, errMessage }
  }
})
</script>
<style>
.sign-form-row {
  margin-top: 30px;
  position: relative;
}

.form-row-error {
  margin: 6px 0px 0px 20px;
  position: absolute;
  color: var(--red-2);
  font-size: 13px;
  line-height: 14px;
  font-weight: 500;
}

.sign-form-bot {
  margin-top: 32px;
}

.sign-form-bot_btn {
  width: 100%;
}
</style>
