<template>
    <div id="app-navigation">
        <el-menu :default-active="activePath" router class="el-menu" mode="horizontal">
            <el-menu-item index="/myCubeCloud" class="el-menu-item">{{$t('nav.myCubeCloud')}}</el-menu-item>
            <el-menu-item index="/videos" class="el-menu-item">{{$t('nav.videos')}}</el-menu-item>
            <el-menu-item index="/message" class="el-menu-item">{{$t('nav.message')}}</el-menu-item>
            <el-menu-item index="/config" class="el-menu-item">{{$t('nav.config')}}</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'Nav',
  data () {
    return {
      activePath: this.$route.path
    }
  },
  watch: {
    $route (to, from) {
      let path = to.path
      if (path.indexOf('/videos') === 0) {
        this.activePath = '/videos'
      } else if (path.indexOf('/message') === 0) {
        this.activePath = '/message'
      } else if (path.indexOf('/config') === 0) {
        this.activePath = '/config'
      } else {
        this.activePath = to.path
        console.log(this.activePath)
      }
    }
  },
  methods: {
  }
}
</script>
<style scoped>
#app-navigation {
    padding-left: 30px;
}
#app-navigation .el-menu {
    /* background: red; */
    height: 80px;
}
#app-navigation .el-menu-item {
    height: 80px;
    line-height: 80px;
}
</style>
