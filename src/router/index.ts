import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/home/Home.vue'
import SignPage from '../pages/sign/Sign.vue'
import ProfilePage from '../pages/profile/ProfilePage.vue'
import OrderPage from '../pages/profile/OrderPage.vue'
import ProfileDetailPage from '../pages/profile/ProfileDetailPage.vue'
import AppointmentPage from '../pages/profile/AppointmentPage.vue'
import store from '@/store'
import { computed } from 'vue'
import api from '@/api/apiClient'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/sign-in',
    name: 'sign-in-route',
    component: SignPage
  },
  {
    path: '/profile',
    name: 'profile-route',
    component: ProfilePage,
    meta: {
      isAuth: true
    },
    children: [
      { path: '', name: 'profile-detail-route', component: ProfileDetailPage },
      { path: 'orders', name: 'orders-route', component: OrderPage },
      { path: 'appointments', name: 'appointments-route', component: AppointmentPage }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getUserInfo = async () => {
  const response = await api.profile()
  return response
}

router.beforeEach(async (to, from, next) => {
  const isRequiredAuth = to.matched.some((record) => record.meta.isAuth)
  const user = computed(() => store.state.userModule.user)
  let isUser = user.value
  if (!user.value && isRequiredAuth) {
    isUser = await getUserInfo()
  }
  if (isRequiredAuth && !isUser) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
