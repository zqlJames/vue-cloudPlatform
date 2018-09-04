<template>
    <div id="userinfo-cfg">
        <el-tabs v-model="activeName" class="userinfoCfg-main" type="border-card">
            <el-tab-pane label="账户资料" name="1" class="accountTab">
                <modifyAccount></modifyAccount>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="2" class="modifyPwdTab" v-loading="loading" element-loading-text="正在请求修改，请稍候...">
                <modifyPwd :showCancelBtn="false" warnPlace="right" @confirm="handleSaveNewPwd">
                    <p slot="newTips" class="notice"><i>长度为6~12位字母或数字</i></p>
                </modifyPwd>
            </el-tab-pane>
            <el-tab-pane label="注销账户" name="3" class="cancelTab">
                <cancelAccount></cancelAccount>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import modifyAccount from './modifyAccountInfo.vue'
import cancelAccount from './cancelAccount.vue'
import modifyPwd from '../../common/modifyPassword.vue'
export default {
  name: 'UserInfoCfg',
  components: {
    modifyAccount,
    modifyPwd,
    cancelAccount
  },
  data () {
    return {
      activeName: '1',
      loading: false
    }
  },
  created () {
  },
  methods: {
    /**
     * 修改密码点击确认按钮触发
     */
    handleSaveNewPwd (val) {
      if (val) {
        this.loading = true
        // 发送修改密码请求
        setTimeout(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '修改密码成功!'
          })
        }, 2000)
      }
    }
  }
}
</script>
<style scoped>
#userinfo-cfg {
    height: 100%;
    padding: 15px 0 10px 25px;
}

/* 修改密码界面样式 */
#userinfo-cfg .modifyPassword {
    margin: 40px 0 0 40px;
}
.userinfoCfg-main {
    padding: 0 0 30px 0;
}
.notice{
    margin-left: 100px;
    width: 200px;
    color: #999;
}

</style>
<style>
/* 用户信息界面样式 */
.avatar-uploader .el-button {
    position: absolute;
    top: 16px;
    left: 140px;
}
#userinfo-cfg .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

/* 修改密码界面样式 */
#userinfo-cfg .modifyPassword .footer {
    margin-top: 20px;
}
#userinfo-cfg .modifyPassword .footer .el-button {
    margin-left: 102px;
}
#userinfo-cfg .modifyPassword .item {
    margin-top: 20px;
}
</style>
