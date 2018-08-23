<template>
    <div id="userinfo-cfg">
        <el-tabs v-model="activeName" class="userinfoCfg-main" type="border-card">
            <el-tab-pane label="账户资料" name="1" class="account">
                <div class="headInfo account-item">
                    <h3 class="title">头像信息</h3>
                    <div class="headInfo-content">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <el-button slot="trigger" size="small">点击上传头像</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="accountInfo account-item">
                    <h3 class="title">账户信息</h3>
                    <div class="accountInfo-content">
                        <div class="accountInfo-content-item">
                            <span class="accountInfo-content-item-title">昵称：</span>
                            <el-input class="accountInfo-content-item-input" size="small"></el-input>
                        </div>
                        <div class="accountInfo-content-item">
                            <span class="accountInfo-content-item-title">用户名：</span>
                            <span class="accountInfo-content-item-input">zzzzz</span>
                        </div>
                        <div class="accountInfo-content-item">
                            <span class="accountInfo-content-item-title">真实姓名：</span>
                            <el-input class="accountInfo-content-item-input" size="small"></el-input>
                        </div>
                        <div class="accountInfo-content-item">
                            <span class="accountInfo-content-item-title">所在位置：</span>
                            <el-input class="accountInfo-content-item-input" size="small"></el-input>
                        </div>
                        <div class="accountInfo-content-item">
                            <span class="accountInfo-content-item-title">邮箱：</span>
                            <el-input class="accountInfo-content-item-input" size="small"></el-input>
                            <el-button class="accountInfo-content-item-buttton" size="small">绑定</el-button>
                        </div>
                        <div class="accountInfo-content-item">
                            <span class="accountInfo-content-item-title">手机号码：</span>
                            <span class="accountInfo-content-item-input">
                                18866668888
                                <span class="link">修改</span>
                            </span>
                        </div>
                        <el-button @click="handleSaveAccount" type="primary" class="saveBtn" size="small">保存</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="2" class="modifyPwd" v-loading="loading" element-loading-text="正在请求修改，请稍候...">
                <modifyPwd :showCancelBtn="false" warnPlace="right" @confirm="handleSaveNewPwd">
                    <p slot="newTips" class="notice"><i>长度为6~12位字母或数字</i></p>
                </modifyPwd>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import modifyPwd from '../common/modifyPassword.vue'
export default {
  name: 'UserInfoCfg',
  components: {
    modifyPwd
  },
  data () {
    return {
      activeName: '1',
      imageUrl: '../../../static/imgs/dog.jpg',
      loading: false
    }
  },
  created () {
  },
  methods: {
    /**
     * 上传头像成功的回调
     */
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    /**
     * 上传头像之前的回调
     */
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) this.$message.error('上传头像图片只能是 JPG 格式!')
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!')
      return isJPG && isLt2M
    },

    /**
     * 用户信息点击保存按钮触发
     */
    handleSaveAccount () {

    },

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
/* 用户信息界面样式 */
.title {
    margin-top: 20px;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    background: #f5f7fa;
    font-weight: 400;
    font-size: 16px;
}
.headInfo-content, .accountInfo-content {
    margin: 0 0 0 30px;
}
.avatar-uploader-icon {
    display: inline-block;
    font-size: 14px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    display: block;
    border: 1px solid #ccc;
}
.avatar-uploader {
    display: inline-block;
    position: relative;
}
.uploadBtn {
    display: inline-block
}

.accountInfo-content-item {
    margin: 20px 0 0 0px
}
.accountInfo-content-item-title {
    display: inline-block;
    width: 70px;
}
.accountInfo-content-item-input {
    display: inline-block;
    width: 240px;
}
.saveBtn {
    margin-top: 20px;
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
