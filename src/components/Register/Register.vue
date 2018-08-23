<template>
  <div id="register">
      <img src="../../../static/imgs/register-bg.jpg" class="login-bg">
      <div class="register-wrap">
          <div class="register-title">
              <h3>立方云平台注册</h3>
          </div>
          <el-tabs v-model="activeName" class="register-main">
              <el-tab-pane label="手机注册" name="1" class="phoneRegister">
                  <div class="username input-item">
                      <el-input type="text" maxlength="11" :disabled="isRegistering" @keyup.enter.native="handleRegister" placeholder="请输入手机号"></el-input>
                      <countDown :time="60" class="getCodeBtn" :disabled="isRegistering"></countDown>
                      <div class="warn" v-show="userWarn">手机号格式不正确！</div>
                  </div>
                  <div class="pwd input-item">
                      <el-input type="text" maxlength="6" :disabled="isRegistering" @keyup.enter.native="handleRegister" placeholder="请输入验证码"></el-input>
                      <div class="warn" v-show="pwdWarn">验证码错误！</div>
                  </div>
                  <div class="pwd input-item">
                      <el-input type="password" maxlength="12" :disabled="isRegistering" @keyup.enter.native="handleRegister" placeholder="请输入密码"></el-input>
                      <div class="warn" v-show="pwdWarn">密码格式错误！</div>
                      <div class="info"><span class="el-icon-info"></span> 密码长度6~12位，数字，大小写英文字母任意组合</div>
                  </div>
                  <el-button @click="handleRegister"
                    :disabled="isRegistering"
                    :icon="isRegistering ? 'el-icon-loading' : ''"
                    class="registerBtn">
                    {{registerBtnTxt}}
                  </el-button>
              </el-tab-pane>
          </el-tabs>
          <div class="register">
              已注册账号？
              <router-link to="/login"><span class="registerLink">立即登录</span></router-link>
          </div>
      </div>
  </div>
</template>

<script>
import '../../iconfont/iconfont.css'
import countDown from '../common/countDown.vue'
export default {
  name: 'Register',
  components: {
    countDown
  },
  data () {
    return {
      activeName: '1',
      userWarn: false,
      pwdWarn: false,
      isRegistering: false,
      registerBtnTxt: '注册'
    }
  },
  created () {
  },
  methods: {
    /*
     * 选择语言时触发
     */
    handleRegister () {
      this.isRegistering = true
      this.registerBtnTxt = '正在注册...'
      setTimeout(() => {
        this.isRegistering = false
        this.registerBtnTxt = '注册'
        // this.$router.push('Home')
      }, 2000)
      this.userWarn = !this.userWarn
      this.pwdWarn = !this.pwdWarn
    }
  }
}
</script>

<style scoped>
#register {
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
.login-bg {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 110%;
    animation: bgScale 60s ease-in-out infinite;
}
.register-wrap {
    padding: 15px 40px;
    width: 500px;
    overflow: hidden;
    min-height: 500px;
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -250px;
    background: rgba(0, 0, 0, .7);
    border: 1px solid #555
}
.register-title {
    font-size: 22px;
}
.register-title h3 {
    font-weight: 400;
}
.register-main {
    margin-top: 20px;
}
.input-item {
    margin-top: 35px;
    position: relative;
}
.username {
    margin-top: 20px;
}
.forgetPwd, .registerLink {
    color: #409eff;
}
.forgetPwd {
    position: absolute;
    top: 10px;
    right: 15px;
}
.register {
    text-align: right;
    margin: 5px 0 0 0;
}
.forgetPwd:hover,
.registerLink:hover {
    text-decoration: underline;
    cursor: pointer;
}
.warn {
    color: #fc5b5b;
    position: absolute;
    bottom: -16px;
    left: 5px;
}
.info {
    color: #aaa;
    position: absolute;
    top: -17px;
    left: 2px;
}

.third {
    margin-top: 50px;
    color: #999;
}
.third-line {
    color: #999;
}
.third-main {
    margin-top: 10px;
}
.third-icon {
    display: inline-block;
    cursor: pointer;
    font-size: 40px;
    margin-left: 72px
}
.third-icon:hover {
    color: #eee;
}
.phoneRegister .phoneInput {
    margin-top: 20px;
}
.countDown {
    width: 134px;
}
</style>
<style>
#register .el-tabs__item {
    color: #eee;
}
#register .el-tabs__item.is-active {
    color: #409eff
}
.input-item .el-input {
    display: inline-block;
    margin: 0 auto;
}
.phoneRegister .username .el-input {
    width: 280px;
    vertical-align: top;
}
.input-item .el-input .el-input__inner {
    color: #eee;
    background-color: rgba(0, 0, 0, 0);
}
#register .registerBtn.el-button,
#register .getCodeBtn .el-button {
    background: rgba(0, 0, 0, 0);
    color: #fff;
    transition: all .2s ease;
}
#register .registerBtn.el-button {
    width: 100%;
    margin-top: 35px;
}
#register .registerBtn.el-button:hover,
#register .getCodeBtn .el-button:hover {
    background: rgba(64, 158, 255, .6);
}
#register .register-main .el-tabs__nav-wrap::after {
    background-color: rgba(255,255,255,.5);
}
</style>
