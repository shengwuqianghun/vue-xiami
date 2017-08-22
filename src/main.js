import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueLazyload,{
	loading:require("common/image/load.jpg")
})

new Vue({
  el: '#app',
	router,
	store,
  template: '<App/>',
  components: { App }
})
