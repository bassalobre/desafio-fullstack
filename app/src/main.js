import Vue from 'vue';
import VuetifyConfirm from 'vuetify-confirm'
import './plugins/vuetify';
import App from './App.vue';
import router from './router';

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Sim',
  buttonFalseText: 'Não',
  color: 'warning',
  icon: 'warning',
  title: '',
  width: 350,
  property: '$confirm'
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
