<template>
  <v-btn @click="onBack">Back</v-btn>
  <h1>Register</h1>
  <app-form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
    <app-field class="app-input" name="fullname" placeholder="Họ và tên" />
    <p>{{ errors.fullname }}</p>
    <app-field class="app-input" name="code" placeholder="Mã xác thực" />
    <p>{{ errors.code }}</p>
    <app-field class="app-input" name="new_password" placeholder="Mật khẩu" />
    <p>{{ errors.new_password }}</p>
    <app-field class="app-input" name="confirmPassword" placeholder="Nhập lại mật khẩu" />
    <p>{{ errors.confirmPassword }}</p>
    <v-btn :loading="status.load" :disabled="status.load" type="submit" variant="tonal" color="var(--orange)">
      Đăng ký
    </v-btn>
  </app-form>
  <app-snack v-model="status.openNoti" :content="status.message" />
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue"
import { Form, Field } from "vee-validate"
import * as Yup from "yup"
import AppSnack from "@/components/Layouts/AppSnack.vue"
import { useRouter } from "vue-router"
import { omit } from "lodash"
import api from "@/api/apiClient"
import { Register } from "@/interfaces"

export default defineComponent({
  name: "RegisterForm",
  components: {
    AppForm: Form,
    AppField: Field,
    AppSnack: AppSnack
  },
  props: {
    telephone: { type: String, required: true }
  },
  emits: ['click-back'],
  setup(props, { emit }) {
    const router = useRouter()
    const onBack = () => emit("click-back")
    const status = reactive({
      load: false,
      message: '',
      openNoti: false,
      success: false
    })
    const schema = Yup.object().shape({
      fullname: Yup.string().required('Vui lòng nhập họ và tên'),
      code: Yup.number().required('Vui lòng nhập mã OTP'),
      new_password: Yup.string().required('Vui lòng nhập mật khẩu'),
      confirmPassword: Yup
        .string()
        .required('Vui lòng nhập lại mật khẩu')
        .oneOf([Yup.ref('new_password')], 'Mật khẩu nhập lại không đúng')
    })
    const onSubmit = async (value: any) => {
      status.load = true
      try {
        const response = await api.register({
          telephone: props.telephone,
          code: value.code,
          new_password: value.new_password
        })
        if (response) {
          status.openNoti = true
          status.load = false
          status.message = 'Đăng ký thành công. Quay về trang đăng nhập'
          setTimeout(() => {
            router.push({ name: 'sign-in-route' })
          }, 2500)
        }
      } catch (error) {
        status.load = false
        status.openNoti = true
        status.message = 'Có lỗi xảy ra. Vui lòng thử lại!'
      }
    }
    return { onBack, onSubmit, schema, status }
  }
})
</script>