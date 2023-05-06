<template>
  <div>
    <div class="header">
      <v-container class="header-container">
        <div class="header-left">
          <router-link class="header-left-link" :to="{ name: 'home' }">
            <img v-if="orgModule.org" :src="orgModule.org?.image_url" alt="">
          </router-link>
          <p class="header-left-title">
            {{ $route.path === '/sign-in' ? 'Đăng nhập' : 'Đăng ký' }}
          </p>
        </div>
      </v-container>
    </div>
    <div class="auth-body">
      <div class="auth-body-form-cnt">
        <slot />
        <div class="auth-body-form-bot">
          <p v-if="$route.path === '/sign-in'" class="auth-body-form-bot_title">Bạn chưa có tài khoản?
            <router-link :to="{ name: 'sign-up-route' }">
              Đăng ký
            </router-link>
          </p>
          <p v-if="$route.path === '/sign-up'" class="auth-body-form-bot_title">
            Trở về trang
            <router-link :to="{ name: 'sign-in-route' }">
              Đăng nhập
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: 'AuthLayout',
  computed:{
    ...mapState(['orgModule'])
  }
})
</script>
<style scoped>
.header {
  box-shadow: var(--box-shadow);
}

.header-container {
  margin: 0px auto;
  display: flex;
  align-content: center;
}

.header-left {
  display: flex;
  align-content: center;
}

.header-left-link {
  display: block;
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 100%;
}

.header-left-link img {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  z-index: 1;
  object-fit: cover;
  border-radius: 100%;
}

.header-left-title {
  margin-left: 12px;
  font-size: 18px;
  line-height: 44px;
  font-weight: 600;
}

.auth-body {
  width: 100%;
  height: calc(100svh - 68px);
  height: -webkit-fill-available;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}

.auth-body-form-cnt {
  width: 500px;
  height: max-content;
  box-shadow: var(--box-shadow);
  border-radius: 12px;
  padding: 24px;
}

.auth-body-form-bot {
  margin-top: 24px;
}

.auth-body-form-bot_title {
  text-align: end;
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;
}

.auth-body-form-bot_title a {
  color: var(--orange);
  font-weight: 600;
}
@media only screen and (max-width: 767px) {
  .auth-body-form-cnt{
    box-shadow: none;
  }
}
</style>