import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VuetifyConfirm from 'vuetify-confirm'
import VueFlashMessage from 'vue-flash-message';
import 'vuetify/src/stylus/app.styl'

require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    light: {
      background: '#cccccc',
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    },
    dark: {
      background: '#ddd',
      primary: '#cccccc',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  }
})

Vue.use(VuetifyConfirm, {
    buttonTrueText: 'Confirmar',
    buttonFalseText: 'Cancelar',
    width: 350,
    property: '$confirm'
})

Vue.use(VueFlashMessage);
