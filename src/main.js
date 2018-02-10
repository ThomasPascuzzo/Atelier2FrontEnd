// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store.js'

Vue.config.productionTip = false

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});

window.axios = axios.create({
  baseURL: 'http://geoquizz.kojuri.com/public/',
  
  
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  components: { App },
  template: '<App/>'
})
