import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/assets/css/global.less'

const vm = createApp(App)
vm.config.globalProperties.$toast = Vant.Toast
vm.use(store).use(router).use(Vant).mount('#app')

