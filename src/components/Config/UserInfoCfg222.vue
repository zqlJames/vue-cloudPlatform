<template>
    <div id="userinfo-cfg"   v-loading="loading" element-loading-text="拼命加载中">
        <el-tabs v-model="activeName" type="card" @tab-click="paneClick" class="userinfo-tab">
            <el-tab-pane label="账户资料" name="countInfo">
            <!-- <div @click="change" style="width: 200px;height: 100px;background: red;"></div> -->
            <div>{{userData.name}}</div>
            <countInfoPage :allData="userData"></countInfoPage>
           
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="password">修改密码333</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import countInfoPage from "./countInfo.vue";


export default {
  name: "UserInfoCfg",
  components: {
    countInfoPage
  },
  data() {
    return {
      loading: false,
      activeName: "countInfo",
      // userData: {
      //   name: "",
      //   realName: "",
      //   email: "",
      //   phone: ""
      // }
      userData: null
    }
  },
  created() {
    this.getCountInfo();
  },
  methods: {
    /* change () {
      this.userData.email = '1111111111111'
      console.log(this.userData)
    }, */
    paneClick(tab, event) {},
    /**
     * 查询用户详情信息
     */
    getCountInfo() {
      this.loading = true;
      let url = "http://127.0.0.1:3000/countInfo";
      this.$http.get(url).then(res => {
        setTimeout(() => {
          this.loading = false;
          this.userData = res.data;
        }, 1000);
      });
    }
  }
};
</script>
<style scoped>
#userinfo-cfg {
  height: 100%;
}
.userinfo-tab {
  margin-top: 10px;
  margin-left: 10px;
}

#hideContent{
  display: none;
}
</style>
