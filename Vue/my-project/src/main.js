// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// ES6 模块化语法
import Vue from 'vue'
import App from './App'

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 引入子模板
  components: { App },
  template: '<App/>'
})
