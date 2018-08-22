<template>
  <div id="login">
      <img src="../../../static/imgs/login-bg.jpg" class="login-bg">
      <div class="login-wrap">
          <div class="login-title">
              <h3>立方云平台登录</h3>
          </div>
          <el-tabs v-model="activeName" class="login-main">
              <el-tab-pane label="账号密码登录" name="1">
                  <div class="username input-item">
                      <el-input type="text" :disabled="isLogining" @keyup.enter.native="handleLogin" placeholder="用户名/邮箱/手机号"></el-input>
                      <div class="warn" v-show="userWarn">账号格式不正确！</div>
                  </div>
                  <div class="pwd input-item">
                      <el-input type="password" :disabled="isLogining" @keyup.enter.native="handleLogin" placeholder="请输入密码"></el-input>
                      <div class="warn" v-show="pwdWarn">账号或密码错误！</div>
                      <div class="forgetPwd">忘记密码？</div>
                  </div>
                  <el-button @click="handleLogin"
                    :disabled="isLogining"
                    :icon="isLogining ? 'el-icon-loading' : ''"
                    class="loginBtn">
                    {{loginBtnTxt}}
                  </el-button>
              </el-tab-pane>
              <el-tab-pane label="手机验证码登录" name="2" class="phoneLogin">
                  <div class="username input-item">
                      <el-input type="text" maxlength="11" :disabled="isLogining" @keyup.enter.native="handleLogin" placeholder="请输入手机号"></el-input>
                      <countDown :time="60" class="getCodeBtn" :disabled="isLogining"></countDown>
                      <div class="warn" v-show="userWarn">手机号格式不正确！</div>
                  </div>
                  <div class="pwd input-item">
                      <el-input type="password" maxlength="6" :disabled="isLogining" @keyup.enter.native="handleLogin" placeholder="请输入验证码"></el-input>
                      <div class="warn" v-show="pwdWarn">验证码错误！</div>
                  </div>
                  <el-button @click="handleLogin"
                    :disabled="isLogining"
                    :icon="isLogining ? 'el-icon-loading' : ''"
                    class="loginBtn">
                    {{loginBtnTxt}}
                  </el-button>
              </el-tab-pane>
          </el-tabs>
          <div class="register">
              还未注册账号？
              <router-link to="/Register"><span class="registerLink">点击注册</span></router-link>
          </div>
          <div class="third">
              <div class="third-line tc">
                  <span class="line">—————————</span>
                  <span>&nbsp;其他方式登录&nbsp;</span>
                  <span class="line">—————————</span>
              </div>
              <div class="third-main">
                  <div class="login-icon icon-weixin-copy third-icon"></div>
                  <div class="login-icon icon-qqtb third-icon"></div>
                  <div class="login-icon icon-weibo third-icon"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import '../../iconfont/iconfont.css'
import countDown from '../common/countDown.vue'
export default {
  name: 'Login',
  components: {
    countDown
  },
  data () {
    return {
      activeName: '1',
      userWarn: false,
      pwdWarn: false,
      isLogining: false,
      loginBtnTxt: '登录'
    }
  },
  created () {
  },
  methods: {
    /*
     * 选择语言时触发
     */
    handleLogin () {
      this.isLogining = true
      this.loginBtnTxt = '正在登录...'
      setTimeout(() => {
        this.isLogining = false
        this.loginBtnTxt = '登录'
        // this.$router.push('Home')
      }, 2000)
      this.userWarn = !this.userWarn
      this.pwdWarn = !this.pwdWarn
    }
  }
}
</script>

<style scoped>
#login {
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
.login-wrap {
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
.login-title {
    font-size: 22px;
}
.login-title h3 {
    font-weight: 400;
}
.login-main {
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
    bottom: -20px;
    left: 5px;
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
.phoneLogin .phoneInput {
    margin-top: 20px;
}
.countDown {
    width: 134px;
}
</style>
<style>
#login .el-tabs__item {
    color: #eee;
}
#login .el-tabs__item.is-active {
    color: #409eff
}
.input-item .el-input {
    display: inline-block;
    margin: 0 auto;
}
.phoneLogin .username .el-input {
    width: 280px;
    vertical-align: top;
}
.input-item .el-input .el-input__inner {
    color: #eee;
    background-color: rgba(0, 0, 0, 0);
}
#login .loginBtn.el-button,
#login .getCodeBtn .el-button {
    background: rgba(0, 0, 0, 0);
    color: #fff;
    transition: all .2s ease;
}
#login .loginBtn.el-button {
    width: 100%;
    margin-top: 35px;
}
#login .loginBtn.el-button:hover,
#login .getCodeBtn .el-button:hover {
    background: rgba(64, 158, 255, .6);
}
#login .login-main .el-tabs__nav-wrap::after {
    background-color: rgba(255,255,255,.5);
}
</style>
