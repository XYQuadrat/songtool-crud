import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import main from '@/config/main'
import store from '@/store/index'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    dark: false,
  },
  themes: {
    light: main.theme,
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
