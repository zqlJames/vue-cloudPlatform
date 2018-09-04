<template>
    <div id="register">
        <img src="../../../static/imgs/register-bg.jpg" class="register-bg">
        <div class="register-wrap">
            <h3 class="register-title">立方云平台注册</h3>
            <el-tabs v-model="activeName" class="register-main">
                <el-tab-pane label="手机注册" name="1" class="phoneRegister">
                    <div class="username input-item">
                        <el-input type="text" maxlength="11"
                            :class="{'warnBorder': phone.warnInfo}"
                            :disabled="isRegistering"
                            @keyup.enter.native="handleRegister"
                            placeholder="请输入手机号"
                            v-model="phone.input"
                            @blur="phoneBlur">
                        </el-input>
                        <div class="warn" v-show="phone.warnInfo"><span class="el-icon-error"></span> {{phone.warnInfo}}</div>
                    </div>
                    <div class="verifyCode input-item">
                        <el-input type="text" maxlength="6"
                            :class="{'warnBorder': verifyCode.warnInfo}"
                            :disabled="isRegistering"
                            @keyup.enter.native="handleRegister"
                            placeholder="请输入验证码"
                            v-model="verifyCode.input"
                            @blur="verifyCodeBlur">
                        </el-input>
                        <countDown :time="60" class="getCodeBtn" ref="sendSmsBtn" @click="sendSMS" :disabled="isRegistering"></countDown>
                        <div class="warn" v-show="verifyCode.warnInfo"><span class="el-icon-error"></span> {{verifyCode.warnInfo}}</div>
                    </div>
                    <div class="pwd input-item">
                        <el-input type="password" maxlength="16"
                            :class="{'warnBorder': password.warnInfo}"
                            :disabled="isRegistering"
                            @keyup.enter.native="handleRegister"
                            placeholder="请输入密码"
                            v-model="password.input"
                            @blur="passwordBlur">
                        </el-input>
                        <div class="warn" v-show="password.warnInfo"><span class="el-icon-error"></span> {{password.warnInfo}}</div>
                        <div class="info"><span class="el-icon-info"></span> 密码长度8~16位，必须包含数字和英文字母，不能含其他字符</div>
                        <div class="el-icon-success" v-show="password.success"></div>
                    </div>
                    <div class="pwdAgain input-item">
                        <el-input type="password" maxlength="16"
                            :class="{'warnBorder': pwdAgain.warnInfo}"
                            :disabled="isRegistering"
                            @keyup.enter.native="handleRegister"
                            placeholder="请再次输入密码"
                            v-model="pwdAgain.input"
                            @blur="pwdAgainBlur">
                        </el-input>
                        <div class="warn" v-show="pwdAgain.warnInfo"><span class="el-icon-error"></span> {{pwdAgain.warnInfo}}</div>
                        <div class="el-icon-success" v-show="pwdAgain.success"></div>
                    </div>
                    <el-button @click="handleRegister"
                        :disabled="isRegistering"
                        :icon="isRegistering ? 'el-icon-loading' : ''"
                        class="registerBtn">
                        {{registerBtnTxt}}
                    </el-button>
                </el-tab-pane>
            </el-tabs>
            <div class="toLoginPage-wrap">
                已注册账号？
                <router-link to="/login"><span class="linkToLogin">立即登录</span></router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import '../../iconfont/iconfont.css'
import countDown from '../common/countDown.vue'

// 手机号校验
const PHONE_REG = /^1[3|4|5|8][0-9]\d{8}$/
// 密码校验, 长度8~16位，包含数字和大小写字母
const PWD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
// 验证码校验
const VERIFY_REG = /^\d{6}$/

export default {
  name: 'Register',
  components: {
    countDown
  },
  data () {
    return {
      activeName: '1',
      isRegistering: false,
      registerBtnTxt: '注册',
      phone: { // 用户输入的手机号
        input: '',
        warnInfo: ''
      },
      verifyCode: { // 用户输入的验证码
        input: '',
        warnInfo: ''
      },
      password: { // 用户输入的密码
        input: '',
        warnInfo: '',
        success: false
      },
      pwdAgain: { // 用户再次输入的密码
        input: '',
        warnInfo: '',
        success: false
      }
    }
  },
  created () {
  },
  watch: {
    'password.warnInfo' (val) {
      this.password.success = !val
    },
    'pwdAgain.warnInfo' (val) {
      this.pwdAgain.success = !val
    }
  },
  methods: {
    /**
     * 手机号输入框失焦验证
     */
    phoneBlur () {
      /* eslint-disable */
      let str = this.phone.input
      // 未填
      if (!str) {
        this.phone.warnInfo = '手机号不能为空！'
      }
      // 格式错误
      else if (!PHONE_REG.test(str)) {
        this.phone.warnInfo = '手机号码格式有误！'
      }
      // 验证通过
      else {
        this.phone.warnInfo = ''
      }
    },
    
    /**
     * 验证码输入框失焦验证
     */
    verifyCodeBlur () {
      /* eslint-disable */
      let str = this.verifyCode.input
      // 未填
      if (!str) {
        this.verifyCode.warnInfo = '验证码不能为空！'
      }
      // 格式错误
      else if (!VERIFY_REG.test(str)) {
        this.verifyCode.warnInfo = '验证码格式有误！'
      }
      // 验证通过
      else {
        this.verifyCode.warnInfo = ''
      }
    },
    
    /**
     * 密码输入框失焦验证
     */
    passwordBlur () {
      /* eslint-disable */
      let str = this.password.input
      // 未填
      if (!str) {
        this.password.warnInfo = '密码不能为空！'
      }
      // 格式错误
      else if (!PWD_REG.test(str)) {
        this.password.warnInfo = '密码格式有误！'
      }
      // 验证通过
      else {
        this.password.warnInfo = ''
        this.password.success = true
      }
    },
    
    /**
     * 再次输入密码输入框失焦验证
     */
    pwdAgainBlur () {
      /* eslint-disable */
      let str = this.pwdAgain.input
      // 未填
      if (!str) {
        this.pwdAgain.warnInfo = '密码不能为空！'
      }
      // 格式错误
      else if (!PWD_REG.test(str)) {
        this.pwdAgain.warnInfo = '密码格式有误！'
      }
      // 两次输入的密码不一致
      else if (this.password.input && str !== this.password.input) {
        this.pwdAgain.warnInfo = '两次输入的密码不一致！'
      }
      // 验证通过
      else {
        this.pwdAgain.warnInfo = ''
        this.pwdAgain.success = true
      }
    },

    /*
     * 点击获取验证码按钮时触发
     */
    sendSMS () {
      this.phoneBlur()
      if (this.phone.warnInfo) return
      let url = '/mobileApi/user/mobileDynamicCode/get'
      let param = {
        'basic': {
          'ver': '1.0',
          'id': 1,
          'time': 68954852668844,
          'nonce': 4758444447744741,
          'token': 'qsdfwaxzgfthfyrty',
          'sign': 'jdfjdikerkfdkrid'
        },
        'data': {
          'mobile': '15827265504'
        }
      }
      this.$http.post(url, param).then(res => {
        console.log(res.data)
        this.$message({
          type: 'success',
          message: '已发送验证码，请注意查收手机短信'
        })
        this.$refs.sendSmsBtn.action()
      })
    },

    /*
     * 点击注册按钮时触发
     */
    handleRegister () {
      // 先验证
      this.phoneBlur()
      this.verifyCodeBlur()
      this.passwordBlur()
      this.pwdAgainBlur()
      if (this.phone.warnInfo || this.verifyCode.warnInfo || this.password.warnInfo || this.pwdAgain.warnInfo) return
      this.isRegistering = true
      this.registerBtnTxt = '正在注册...'
      setTimeout(() => {
        this.$router.push('/config/userInfoCfg')
        this.isRegistering = false
        this.registerBtnTxt = '注册'
      }, 2000)
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
.register-bg {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 110%;
    animation: bgScale 60s ease-in-out infinite;
}
.register-wrap {
    padding: 15px 40px 25px 40px;
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
.register-title {
    font-size: 26px;
    font-weight: 400;
}
.register-main {
    margin-top: 20px;
}
.input-item {
    margin-top: 30px;
    position: relative;
}
.pwd.input-item {
    margin-top: 45px;
}
.username {
    margin-top: 20px;
}
.forgetPwd, .linkToLogin {
    color: #409eff;
}
.forgetPwd {
    position: absolute;
    top: 10px;
    right: 15px;
}
.toLoginPage-wrap {
    text-align: right;
    margin: 5px 0 0 0;
}
.forgetPwd:hover,
.linkToLogin:hover {
    text-decoration: underline;
    cursor: pointer;
}
.warn {
    color: #fc5b5b;
    position: absolute;
    bottom: -18px;
}
.el-icon-success {
    position: absolute;
    right: 10px;
    top: 15px;
    z-index: 99;
    color: #84c564;
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
.phoneRegister .verifyCode .el-input {
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
