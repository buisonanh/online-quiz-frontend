import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './global.css';

Vue.config.productionTip = false

import VueFlashMessage from 'vue-flash-message'
import 'vue-flash-message/dist/vue-flash-message.min.css'

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 5000
  }
})

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
