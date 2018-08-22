<template>
  <div id="app">
    <div id="app-wrap">
      <div id="app-header">
        <div class="app-head-in mc">
            <router-link to="/" class="app-logo fl">
              <img src="/static/logo-cc.png" class="app-logo-img">
            </router-link>
            <Nav class="app-nav fl"></Nav>
            <!-- 语言切换功能 -->
            <el-dropdown @command="handleCommand" trigger="click" class="fr">
                <span class="el-dropdown-link">
                    {{currentLang}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="nav-langList">
                    <el-dropdown-item
                        v-for="item in langList"
                        :key="item.value"
                        v-text="item.label"
                        :command="item">
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
      </div>
      <div id="app-content" class="mc">
        <div class="app-content-main mc">
            <router-view></router-view>
        </div>
      </div>
      <div id="app-footer-wrap" class="tc">
        <div>{{$t('footer.companyName')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './components/Navigation/Navigation.vue'
export default {
  name: 'App',
  components: {
    Nav
  },
  data () {
    return {
      langKey: '',
      langList: [{
        label: '中文',
        value: 'zh-cn'
      }, {
        label: 'English',
        value: 'en-us'
      }],
      currentLang: ''
    }
  },
  created () {
    this.getCurrentLang()
  },
  methods: {
    /*
     * 选择语言时触发
     */
    handleCommand (val) {
      // 先判断是否就是当前语言
      if (this.currentLang === val.label) return
      this.currentLang = val.label
      this.$i18n.locale = val.value
      window.localStorage.setItem('language', val.value)
      // 重载页面
      window.location.reload()
    },

    /*
     * 获取当前所用语言
     */
    getCurrentLang () {
      let lan = window.localStorage.getItem('language')
      if (!lan) {
        this.currentLang = '中文'
        return
      }
      this.langList.forEach(v => {
        if (v.value === lan) {
          this.currentLang = v.label
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  min-width: 960px;
  min-height: 600px;
}
#app-wrap {
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
}
.app-head-in {
  width: 90%;
  max-width: 1240px;
  min-width: 960px;
  height: 100%;
  box-sizing: content-box;
}
#app-header {
  height: 80px!important;
  line-height: 80px;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}
.app-logo {
  width: 20%;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  font-weight: 700;
  position: relative;
  color: #606266;
}
.app-logo-img {
  width: 180px;
}
.app-nav {
  width: 60%;
  height: 100%;
}
.nav-langList {
  top: 50px!important
}
#app-content {
  max-width: 1240px;
  min-width: 960px;
  width: 90%;
  height: calc(100% - 130px);
}
.app-content-main {
  height: 100%;
}
#app-footer-wrap {
  height: 50px!important;
  line-height: 50px!important;
  background: #eee;
}

</style>
