import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import store from '@/store/index'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    dark: false,
  },
  icons: {
    iconfont: 'md',
  },
  lang: {
    locales: {},
    current: store.getters.lng,
  },
})

export default vuetify
