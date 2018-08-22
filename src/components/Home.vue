<template>
  <div id="home">
      <div id="home-header">
        <div class="home-head-in mc">
            <router-link to="/Home" class="home-logo fl">
              <img src="../../static/logo-cc.png" class="home-logo-img">
            </router-link>
            <Nav class="home-nav fl"></Nav>
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
      <div id="home-content" class="mc">
        <div class="home-content-main mc">
            <router-view></router-view>
        </div>
      </div>
      <div id="home-footer-wrap" class="tc">
        <div>{{$t('footer.companyName')}}</div>
      </div>
  </div>
</template>

<script>
import Nav from './Navigation/Navigation.vue'
export default {
  name: 'Home',
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
#home {
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
}
.home-head-in {
  width: 90%;
  max-width: 1240px;
  min-width: 960px;
  height: 100%;
  box-sizing: content-box;
}
#home-header {
  height: 80px!important;
  line-height: 80px;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}
.home-logo {
  width: 20%;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  font-weight: 700;
  position: relative;
  color: #606266;
}
.home-logo-img {
  width: 180px;
}
.home-nav {
  width: 60%;
  height: 100%;
}
.nav-langList {
  top: 50px!important
}
#home-content {
  max-width: 1240px;
  min-width: 960px;
  width: 90%;
  height: calc(100% - 130px);
}
.home-content-main {
  height: 100%;
}
#home-footer-wrap {
  height: 50px!important;
  line-height: 50px!important;
  background: #eee;
}

</style>
