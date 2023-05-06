<template>
  <app-form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
    <div class="sign-form-row">
      <app-field class="app-input" name="fullname" placeholder="Họ và tên" />
      <p class="form-row-error">{{ errors.fullname }}</p>
    </div>
    <div class="sign-form-row">
      <app-field class="app-input" :disabled="true" name="telephone" v-model="props.telephone"
        placeholder="Số điện thoại" />
      <v-btn @click="onBack" variant='text' class="btn-change" color="var(--orange)">Thay đổi</v-btn>
    </div>
    <div class="sign-form-row">
      <app-field class="app-input" name="code" placeholder="Mã xác thực" />
      <p class="form-row-error">{{ errors.code }}</p>
    </div>
    <div class="sign-form-row">
      <app-field type="password" class="app-input" name="new_password" placeholder="Mật khẩu" />
      <p class="form-row-error">{{ errors.new_password }}</p>
    </div>
    <div class="sign-form-row">
      <app-field type="password" class="app-input" name="confirmPassword" placeholder="Nhập lại mật khẩu" />
      <p class="form-row-error">{{ errors.confirmPassword }}</p>
    </div>
    <div class="sign-form-bot">
      <v-btn class="sign-form-bot_btn" :loading="isLoading" type="submit" variant="tonal" color="var(--orange)">
        Đăng ký
      </v-btn>
    </div>
  </app-form>
  <app-snack :color="status.color" v-model="status.openNoti" :content="status.message" />
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue"
import { Form, Field } from "vee-validate"
import * as Yup from "yup"
import AppSnack from "@/components/Layouts/AppSnack.vue"
import { useRouter } from "vue-router"
import api from "@/api/apiClient"
import { Register } from "@/interfaces"
import { useMutation } from "@tanstack/vue-query"

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
      message: '',
      openNoti: false,
      color:''
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

    const { mutate, isLoading } = useMutation({
      mutationFn: (body: Register) => api.register(body),
      onSuccess: () => {
        status.openNoti = true
        status.message = 'Đăng ký thành công. Quay về trang đăng nhập'
        setTimeout(() => {
          router.push({ name: 'sign-in-route' })
        }, 2500)
      },
      onError: () => {
        status.openNoti = true
        status.message = 'Có lỗi xảy ra. Vui lòng thử lại!'
        status.color = 'var(--red-2)'
      }
    })

    const onSubmit = (value: any) => mutate(value)
    return { onBack, onSubmit, schema, status, props, isLoading }
  }
})
</script>
<style scoped>
.btn-change {
  position: absolute;
  right: 0;
  top: 5px;
  background-color: #F5F8FA;
  z-index: 1;
}
</style>