<template>
    <div id="login">
        <img src="../../../static/imgs/login-bg.jpg" class="login-bg">
        <div class="login-wrap">
            <h3 class="login-title">立方云平台登录</h3>
            <el-tabs v-model="activeName" class="login-main">
                <!-- 账号密码登录页面 -->
                <el-tab-pane label="账号密码登录" name="1">
                    <div class="username input-item">
                        <!-- 邮箱/手机 输入 -->
                        <el-input type="text"
                            :class="{'warnBorder': account.warnInfo}"
                            :disabled="isPwdLogining"
                            @keyup.enter.native="handleAccountLogin"
                            placeholder="邮箱/手机号"
                            @blur="accountBlur"
                            v-model="account.input">
                        </el-input>
                        <div class="warn" v-show="account.warnInfo"><span class="el-icon-error"></span> {{account.warnInfo}}</div>
                    </div>
                    <div class="pwd input-item">
                        <!-- 密码 输入 -->
                        <el-input type="password"
                            :class="{'warnBorder': password.warnInfo}"
                            :disabled="isPwdLogining"
                            @keyup.enter.native="handleAccountLogin"
                            placeholder="请输入密码"
                            @blur="passwordBlur"
                            v-model="password.input">
                        </el-input>
                        <div class="warn" v-show="password.warnInfo"><span class="el-icon-error"></span> {{password.warnInfo}}</div>
                        <router-link to="/resetPassword" class="forgetPwd">忘记密码？</router-link>
                    </div>
                    <div class="verifyImg-wrap input-item" v-if="isShowAccountImgVerify">
                        <!-- 图形验证码 输入 -->
                        <el-input type="text"
                            :class="{'warnBorder': accountVerifyImg.warnInfo, 'verifyImgInput': true}"
                            :disabled="isPwdLogining"
                            @keyup.enter.native="handleAccountLogin"
                            placeholder="请输入图形验证码"
                            v-model="accountVerifyImg.input">
                        </el-input>
                        <verifyImg :src="accountVerifyImgSrc" @click="getVerifyImg" width="130px" height="40px"></verifyImg>
                        <div class="warn" v-show="accountVerifyImg.warnInfo"><span class="el-icon-error"></span> {{accountVerifyImg.warnInfo}}</div>
                    </div>
                    <el-button @click="handleAccountLogin"
                        :disabled="isPwdLogining"
                        :icon="isPwdLogining ? 'el-icon-loading' : ''"
                        class="loginBtn">
                        {{loginBtnTxt}}
                    </el-button>
                </el-tab-pane>
                <!-- 验证码登录页面 -->
                <el-tab-pane label="手机验证码登录" name="2" class="phoneLogin">
                    <div class="username input-item">
                        <!-- 手机号 输入 -->
                        <el-input type="text" maxlength="11"
                            :class="{'warnBorder': phone.warnInfo}"
                            :disabled="isVerifyLogining"
                            @keyup.enter.native="handleVerifyLogin"
                            placeholder="请输入手机号"
                            @blur="phoneBlur"
                            v-model="phone.input">
                        </el-input>
                        <div class="warn" v-show="phone.warnInfo"><span class="el-icon-error"></span> {{phone.warnInfo}}</div>
                    </div>
                    <div class="pwd input-item">
                        <!-- 验证码 输入 -->
                        <el-input type="text" maxlength="6"
                            :class="{'warnBorder': verifyCode.warnInfo}"
                            :disabled="isVerifyLogining"
                            @keyup.enter.native="handleVerifyLogin"
                            placeholder="请输入验证码"
                            @blur="verifyCodeBlur"
                            v-model="verifyCode.input">
                        </el-input>
                        <countDown :time="60" class="getCodeBtn" :disabled="isVerifyLogining" @click="sendSMS" ref="sendSMSBtn"></countDown>
                        <div class="warn" v-show="verifyCode.warnInfo"><span class="el-icon-error"></span> {{verifyCode.warnInfo}}</div>
                    </div>
                    <div class="verifyImg-wrap input-item" v-if="isShowPhoneImgVerify">
                        <!-- 图形验证码 输入 -->
                        <el-input type="text"
                            :class="{'warnBorder': phoneVerifyImg.warnInfo, 'verifyImgInput': true}"
                            :disabled="isVerifyLogining"
                            @keyup.enter.native="handleVerifyLogin"
                            placeholder="请输入图形验证码"
                            v-model="phoneVerifyImg.input">
                        </el-input>
                        <!-- 验证码图片组件 -->
                        <verifyImg :src="phoneVerifyImgSrc" @click="getVerifyImg" width="130px" height="40px"></verifyImg>
                        <div class="warn" v-show="phoneVerifyImg.warnInfo"><span class="el-icon-error"></span> {{phoneVerifyImg.warnInfo}}</div>
                    </div>
                    <el-button @click="handleVerifyLogin"
                        :disabled="isVerifyLogining"
                        :icon="isVerifyLogining ? 'el-icon-loading' : ''"
                        class="loginBtn">
                        {{loginBtnTxt}}
                    </el-button>
                </el-tab-pane>
            </el-tabs>
            <div class="register">
                还未注册账号？
                <router-link to="/register"><span class="registerLink">点击注册</span></router-link>
            </div>
            <div class="third">
                <div class="third-line tc">
                    <span class="line">—————————</span>
                    <span>&nbsp;其他方式登录&nbsp;</span>
                    <span class="line">—————————</span>
                </div>
                <div class="third-main">
                    <div class="login-icon icon-weixin-copy third-icon" @click="handleWechatLogin"></div>
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
import verifyImg from '../common/verifyImg.vue'
import md5 from 'js-md5'
import {JSEncrypt} from 'jsencrypt'
import AES from '../../utils/aes.js'

// 手机号校验
const PHONE_REG = /^1[3|4|5|8][0-9]\d{8}$/
// 邮箱校验
const EMAIL_REG = /^\w+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)+$/
// 密码校验, 长度8~16位，包含数字和大小写字母
const PWD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
// 验证码校验
const VERIFY_REG = /^\d{6}$/

export default {
  name: 'Login',
  components: {
    countDown,
    verifyImg
  },
  data () {
    return {
      activeName: '1',
      /* 密码登录 */
      isPwdLogining: false,
      loginBtnTxt: '登录',
      account: { // 用户输入的手机号或邮箱
        input: '',
        warnInfo: ''
      },
      password: { // 用户输入的密码
        input: '',
        warnInfo: ''
      },
      accountVerifyImg: { // 用户输入的图形验证码（账号密码登录界面）
        input: '',
        warnInfo: ''
      },
      isShowAccountImgVerify: true, // 是否显示账号登录界面的图形验证码
      accountVerifyImgSrc: '', // 验证码图片src
      /* 验证码登录 */
      isVerifyLogining: false,
      phone: { // 用户输入的手机号
        input: '',
        warnInfo: ''
      },
      verifyCode: { // 用户输入的验证码
        input: '',
        warnInfo: ''
      },
      isShowPhoneImgVerify: true, // 是否显示验证码登录界面的图形验证码
      phoneVerifyImg: { // 用户输入的图形验证码（手机登录界面）
        input: '',
        warnInfo: ''
      },
      phoneVerifyImgSrc: '' // 验证码图片src
    }
  },
  created () {
    console.log('md5加密方法：')
    console.log(md5('holle'))
    console.log('---------------------------------\n')

    console.log('rsa加密方法：')
    // 实例化一个JSEncrypt对象
    let jse = new JSEncrypt()
    // 设置需要加密的字符串
    let encrypted = jse.encrypt('123456')
    console.log(`密码123456的RSA加密结果是：${encrypted}`)
    // 解密加密过的字符串
    let decrypted = jse.decrypt(encrypted)
    console.log(`解密结果是：${decrypted}`)
    console.log('---------------------------------\n')

    console.log('aes加密方法：')
    let password = '123456'
    let key = '8NONwyJtHesysWpM'
    let encryptedAES = AES.encrypt(password, key)
    console.log(`密码123456的AES加密结果是：${encryptedAES}`)
    // 解密加密过的字符串
    let decryptedAES = AES.decrypt(encryptedAES, key)
    console.log(`解密结果是：${decryptedAES}`)
  },
  methods: {
    /**
     * 账号输入框失焦验证
     */
    accountBlur () {
      /* eslint-disable */
      let account = this.account.input
      // 未填
      if (!account) {
        this.account.warnInfo = '请输入手机号或邮箱！'
      }
      // 格式错误
      else if (!PHONE_REG.test(account) && !EMAIL_REG.test(account)) {
        this.account.warnInfo = '手机号或邮箱格式有误！'
      }
      // 验证通过
      else {
        this.account.warnInfo = ''
      }
    },

    /**
     * 密码输入框失焦验证
     */
    passwordBlur () {
      /* eslint-disable */
      let pwd = this.password.input
      // 未填
      if (!pwd) {
        this.password.warnInfo = '密码不能为空！'
      }
      // 格式错误
      else if (!PWD_REG.test(pwd)) {
        this.password.warnInfo = '密码格式错误！'
      }
      // 验证通过
      else {
        this.password.warnInfo = ''
      }
    },


    /**
     * 获取验证码图片
     */
    getVerifyImg () {
      let url = 'api/genCode'
      this.$http.get(url).then(res => {
        if (this.activeName === '1') {
          this.accountVerifyImgSrc = res.data.returnObject
        } else {
          this.phoneVerifyImgSrc = res.data.returnObject
        }
      })
    },


    /**
     * 点击账号登录按钮时触发
     */
    handleAccountLogin () {
      // 先验证
      this.accountBlur()
      this.passwordBlur()
      if (this.account.warnInfo || this.password.warnInfo) return
      this.isPwdLogining = true
      this.loginBtnTxt = '正在登录...'
      //   let param = {
      //     username: this.account,
      //     password: this.password,
      //     type: 1
      //   }
      //   this.$http.post('api/user/login', param).then(res => {
      //     this.isPwdLogining = false
      //     this.loginBtnTxt = '登录'
      //     this.$router.push('/config/userInfoCfg')
      //   })
      setTimeout(() => {
        this.isPwdLogining = false
        this.loginBtnTxt = '登录'
        this.$router.push('/config/userInfoCfg')
      }, 1000)
    },


    /**
     * 手机号输入框失焦验证
     */
    phoneBlur () {
      /* eslint-disable */
      let phoneNum = this.phone.input
      // 未填
      if (!phoneNum) {
        this.phone.warnInfo = '手机号不能为空！'
      }
      // 格式错误
      else if (!PHONE_REG.test(phoneNum)) {
        this.phone.warnInfo = '手机号格式有误！'
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
      let verify = this.verifyCode.input
      // 未填
      if (!verify) {
        this.verifyCode.warnInfo = '验证码不能为空！'
      }
      // 格式错误
      else if (!VERIFY_REG.test(verify)) {
        this.verifyCode.warnInfo = '验证码格式有误！'
      }
      // 验证通过
      else {
        this.verifyCode.warnInfo = ''
      }
    },


    /**
     * 点击获取验证码按钮
     */
    sendSMS () {
      // 先验证
      this.phoneBlur()
      if (this.phone.warnInfo) return
      this.$message({
        type: 'success',
        message: '已发送验证码，请注意查收手机短信'
      })
      this.$refs.sendSMSBtn.action()
    },


    /**
     * 点击验证码登录按钮时触发
     */
    handleVerifyLogin () {
      this.phoneBlur()
      this.verifyCodeBlur()
      if (this.phone.warnInfo || this.verifyCode.warnInfo) return
      this.isVerifyLogining = true
      this.loginBtnTxt = '正在登录...'
      setTimeout(() => {
        this.isVerifyLogining = false
        this.loginBtnTxt = '登录'
        this.$router.push('/config/userInfoCfg')
      }, 1000)
    },


    /**
     * 微信登录
     */
    handleWechatLogin () {
      this.$http.get('api/wechatLogin/oauth2/getCode').then(res => {
        window.location.href = res.data.returnObject
      })
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
    top: 45%;
    left: 50%;
    margin-left: -250px;
    margin-top: -250px;
    background: rgba(0, 0, 0, .7);
    border: 1px solid #555;
}
.login-title {
    font-size: 26px;
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
.verifyImgInput {
    width: 260px;
    vertical-align: top;
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
.phoneLogin .pwd .el-input {
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