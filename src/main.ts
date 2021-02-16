import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// モジュールの読み込み
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import Amplify from 'aws-amplify';
import appSyncConfig from './aws-exports';

Amplify.configure(appSyncConfig); // 追加

Vue.config.productionTip = false;
Vue.use(ElementUI); // 追加

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
