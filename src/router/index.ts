import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/home/Home.vue'
import SignPage from '../pages/sign/Sign.vue'
import SignUpPage from '../pages/sign-up/SignUpPage.vue'
import ProfilePage from '../pages/profile/ProfilePage.vue'
import OrderPage from '../pages/profile/OrderPage.vue'
import ProfileDetailPage from '../pages/profile/ProfileDetailPage.vue'
import AppointmentPage from '../pages/profile/AppointmentPage.vue'
import DetailPage from '../pages/detail/DetailPage.vue'
import DetailPageProduct from '../pages/detail/DetailPageProduct.vue'
import CartPage from '../pages/cart/CartPage.vue'
import GalleryPage from '../pages/gallery/GalleryPage.vue'
import store from '@/store'
import { computed } from 'vue'
import api from '@/api/apiClient'
import MainLayoutVue from '@/components/Layouts/MainLayout.vue'
import AuthLayoutVue from '@/components/Layouts/AuthLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      Layout: MainLayoutVue
    }
  },
  {
    path: '/service/:id',
    name: 'ser-detail-route',
    component: DetailPage,
    meta: {
      Layout: MainLayoutVue
    }
  },
  {
    path: '/product/:id',
    name: 'pro-detail-route',
    component: DetailPageProduct,
    meta: {
      Layout: MainLayoutVue
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in-route',
    component: SignPage,
    meta: {
      Layout: AuthLayoutVue
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up-route',
    component: SignUpPage,
    meta: { Layout: AuthLayoutVue }
  },
  {
    path: '/cart',
    name: 'cart-route',
    component: CartPage,
    meta: {
      Layout: MainLayoutVue
    }
  },
  {
    path: '/galleries',
    name: 'gallery-route',
    component: GalleryPage,
    meta: {
      Layout: MainLayoutVue
    }
  },
  {
    path: '/profile',
    name: 'profile-route',
    component: ProfilePage,
    meta: {
      isAuth: true,
      Layout: MainLayoutVue
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
