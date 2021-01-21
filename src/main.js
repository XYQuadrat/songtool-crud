import Vue from 'vue'
import i18n from './locales/index'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/http'
import './plugins/ie'
import App from './App.vue'

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      router.push({ path: '/login' })
    }
  })
})

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
