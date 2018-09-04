<template>
  <div id="resetPwd">
      <img src="../../../static/imgs/reset-bg.jpg" class="resetPwd-bg">
      <div class="resetPwd-wrap">
          <h3 class="resetPwd-title">{{resetTitle}}</h3>
          <div class="resetBtnGroup" v-if="!isBtnClicked">
              <el-button class="phoneBtn resetBtn" @click="handleResetbyPhone">通过手机找回</el-button>
              <el-button class="emailBtn resetBtn" @click="handleResetbyEmail">通过邮箱找回</el-button>
              <el-button class="manualBtn resetBtn" @click="handleResetbyMaual">人工审核找回</el-button>
          </div>
          <div class="resetMain">
              <component :is="resetWays[active]" :stage="emailStep"></component>
          </div>
          <div class="toLoginPage-wrap" v-if="!isBtnClicked">
              已有账号？
              <router-link to="/login"><span class="linkToLogin">立即登录</span></router-link>
          </div>
      </div>
  </div>
</template>

<script>
import phone from './resetByPhone.vue'
import email from './resetByEmail.vue'
import manual from './resetByManual.vue'
export default {
  name: 'ResetPwd',
  components: {
    phone,
    email,
    manual
  },
  watch: {
  },
  data () {
    return {
      resetTitle: '重置密码',
      isBtnClicked: false,
      active: -1,
      resetWays: ['phone', 'email', 'manual'],
      emailStep: 1
    }
  },
  created () {
    // 判断是否从邮箱链接进入，如果是，则直接跳转至邮箱找回修改密码界面
    let query = this.$route.query
    if (query.email) {
      this.handleResetbyEmail()
      this.$nextTick(() => {
        this.emailStep = 3
      })
    }
  },
  methods: {
    /*
     * 点击手机找回按钮
     */
    handleResetbyPhone () {
      this.isBtnClicked = true
      this.resetTitle = '手机号码找回密码'
      this.active = 0
    },

    /*
     * 点击邮箱找回按钮
     */
    handleResetbyEmail () {
      this.isBtnClicked = true
      this.resetTitle = '邮箱找回密码'
      this.active = 1
    },

    /*
     * 点击人工审核找回按钮
     */
    handleResetbyMaual () {
      this.isBtnClicked = true
      this.resetTitle = '邮箱找回密码'
      this.active = 1
    }
  }
}
</script>

<style scoped>
#resetPwd {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    color: #eee;
}

@keyframes bgScale {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0%{
        transform: scale(1);
    }
    25%{
        transform: scale(1.2);
    }
    50%{
        transform: scale(1);
    }
    75%{
        transform: scale(1.2);
    }
}
.resetPwd-bg {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 110%;
    animation: bgScale 60s ease-in-out infinite;
}
.resetPwd-wrap {
    padding: 15px 40px;
    width: 500px;
    overflow: hidden;
    min-height: 500px;
    position: absolute;
    z-index: 999;
    top: 45%;
    left: 50%;
    margin-left: -250px;
    margin-top: -250px;
    background: rgba(0, 0, 0, .7);
    border: 1px solid #555
}
.resetPwd-title {
    font-size: 26px;
    font-weight: 400;
}
.resetBtnGroup, .resetMain {
    position: relative;
    margin: 80px 0 0 0;
}
.resetBtn {
    display: block;
    width: 100%;
    margin: 40px 0 0 0
}
.toLoginPage-wrap {
    text-align: right;
    margin: 5px 0 0 0;
}
.linkToLogin {
    color: #409eff;
}
.linkToLogin:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
<style>
#resetPwd .el-button,
#resetPwd .el-button {
    background: rgba(0, 0, 0, 0);
    color: #fff;
    transition: all .2s ease;
}
#resetPwd .el-button:hover,
#resetPwd .el-button:hover {
    background: rgba(64, 158, 255, .6);
}

#resetPwd .el-input__inner {
    color: #eee;
    background-color: rgba(0, 0, 0, 0);
}
</style>
