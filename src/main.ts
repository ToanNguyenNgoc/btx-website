import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import store from './store'
import '@/assets/font/style.css'
import '@/styles/global-style.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives
})


createApp(App)
  .use(store)
  .use(VueQueryPlugin)
  .use(router)
  .use(vuetify).mount('#app')
