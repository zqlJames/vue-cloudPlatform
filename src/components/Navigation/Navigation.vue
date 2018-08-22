<template>
    <div id="app-navigation">
        <el-menu :default-active="activePath" router class="el-menu" mode="horizontal">
            <el-menu-item index="/MyCubeCloud" class="el-menu-item">{{$t('nav.myCubeCloud')}}</el-menu-item>
            <el-menu-item index="/Videos" class="el-menu-item">{{$t('nav.videos')}}</el-menu-item>
            <el-menu-item index="/Message" class="el-menu-item">{{$t('nav.message')}}</el-menu-item>
            <el-menu-item index="/Config" class="el-menu-item">{{$t('nav.config')}}</el-menu-item>
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
      if (path.indexOf('/Videos') === 0) {
        this.activePath = '/Videos'
      } else if (path.indexOf('/Message') === 0) {
        this.activePath = '/Message'
      } else if (path.indexOf('/Config') === 0) {
        this.activePath = '/Config'
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
