/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 初始化浏览器默认样式
import '@/assets/css/reset.css'
import '@/assets/css/common.css'

/*
*  全局引入element-ui库
*  后期优化性能可改为各页面按需加载
*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// element国际化
import ele_Locale from 'element-ui/lib/locale'
import ele_en from 'element-ui/lib/locale/lang/en'
import ele_zh from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { ele_zh })

/* 
* 国际化，引入vue-i18n插件
*/
import VueI18n from 'vue-i18n'
import zh from '@/assets/lang/zh.js'
import en from '@/assets/lang/en.js'
Vue.use(VueI18n)
const LANG_KEY = window.localStorage.getItem('language')
const i18n = new VueI18n({
  locale: LANG_KEY ? LANG_KEY : 'zh-cn',    // 语言标识
  messages: {
    'zh-cn': Object.assign(zh, ele_zh),   // 中文语言包
    'en-us': Object.assign(en, ele_en)    // 英文语言包
  }
})
// 重点！！将element-ui组件本地化
ele_Locale.i18n((key, value) => i18n.t(key, value))

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false


// 自定义键盘事件键位 不能用驼峰命名，用 “-” 链接
/* Vue.config.keyCodes = {
  enter: 13
} */

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 元素可拖拽指令 v-drag
Vue.directive('drag', {
  inserted: function (el) {  //inserted 钩子函数:当元素被插入父元素时触发,可省略
    let oDiv = el;  //el --> 触发的DOM元素
    oDiv.onmousedown = function (e) {
      let l = e.clientX - oDiv.offsetLeft
      let t = e.clientY - oDiv.offsetTop
      document.onmousemove = function (e) {
        oDiv.style.left = e.clientX - l + 'px'
        oDiv.style.top = e.clientY - t + 'px'
      }
      oDiv.onmouseup = function () {
          document.onmousemove = null
          oDiv.onmouseup = null
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
