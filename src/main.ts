import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/font/style.css'
import '@/styles/global-style.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from './store'

const vuetify = createVuetify({
  components,
  directives
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')
