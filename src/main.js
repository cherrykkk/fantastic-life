import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'

createApp(App).use(store).use(router).mount('#app')
