<template>
    <div id="config">
        <!-- 导航 -->
        <div class="config-nav fl">
            <el-menu :default-active="activePath"
                    class="el-menu-vertical-demo config-nav-contain"
                    theme="dark"
                    router>
              <el-menu-item index="/config/deviceCfg" class="config-nav-item">设备管理</el-menu-item>
              <el-menu-item index="/config/deviceDomainCfg" class="config-nav-item">设备域名管理</el-menu-item>
              <el-menu-item index="/config/groupCfg" class="config-nav-item">群组管理</el-menu-item>
              <el-menu-item index="/config/userInfoCfg" class="config-nav-item">用户信息管理</el-menu-item>
              <el-menu-item index="/config/terminalBindingCfg" class="config-nav-item">终端绑定管理</el-menu-item>
              <el-menu-item index="/config/localCfg" class="config-nav-item">本地设置</el-menu-item>
            </el-menu>
        </div>
        <!-- 主体 -->
        <div class="config-main fr">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Config',
  data () {
    return {
      activePath: this.$route.path
    }
  },
  watch: {
    $route (to, from) {
      let path = to.path
      if (path.indexOf('deviceCfg') > 0) this.activePath = '/config/deviceCfg'
    }
  },
  created () {
    // 刷新设备详情页时设备管理导航不高亮的问题
    let path = this.$route.path
    if (path.indexOf('deviceCfg') > 0) {
      this.activePath = '/config/deviceCfg'
    }
  }
}
</script>
<style scoped>
#config {
    height: 100%;
}
.config-nav {
    width: 20%;
    height: 100%;
    display: inline-block;
}
.config-nav-contain {
    height: 100%;
}
.config-nav-item {
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #eee
}
.config-main {
    display: inline-block;
    width: 80%;
    background-color: #fff;
    height: 100%;
}
</style>
