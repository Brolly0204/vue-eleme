import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import '@/common/stylus/index.styl';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
window.router = router;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

