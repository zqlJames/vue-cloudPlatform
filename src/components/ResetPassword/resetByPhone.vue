<template>
  <div id="resetByPhone">
      <div class="step step1" v-if="step === 1">
            <el-input type="text" maxlength="11" placeholder="请输入手机号"
                :class="{'warnBorder': phone.warnInfo}"
                @keyup.enter.native="toNextStep"
                autofocus="true"
                v-model="phone.input">
            </el-input>
            <div class="warn" v-show="phone.warnInfo"><span class="el-icon-error"></span> {{phone.warnInfo}}</div>
      </div>
      <div class="step step2" v-if="step === 2">
            <p class="smsNotice">已发送验证码到：{{phoneNumCode}}</p>
            <el-input type="text" maxlength="8" placeholder="请输入短信验证码"
                :class="{'warnBorder': verifyCode.warnInfo, 'smsInput': true}"
                ref="verifyInput"
                @keyup.enter.native="toNextStep"
                v-model="verifyCode.input">
            </el-input>
            <div class="warn" v-show="verifyCode.warnInfo"><span class="el-icon-error"></span> {{verifyCode.warnInfo}}</div>
            <countDown time="60" class="sendSmsBtn" :autoStart="startCountDown" ref="sendSmsBtn" @click="sendSMS"></countDown>
      </div>
      <div class="step step3" v-if="step === 3">
            <div class="password-wrap">
                <el-input type="password" placeholder="设置新密码"
                    :class="{'warnBorder': password.warnInfo}"
                    ref="pwdInput"
                    @keyup.enter.native="toNextStep"
                    @blur="checkPwd"
                    v-model="password.input">
                </el-input>
                <div class="warn" v-show="password.warnInfo"><span class="el-icon-error"></span> {{password.warnInfo}}</div>
                <div class="info"><span class="el-icon-info"></span> 密码长度8~16位，必须包含数字和英文字母，不能含其他字符</div>
            </div>
            <div class="pwdAgain-wrap">
                <el-input type="password" placeholder="再次输入新密码"
                    :class="{'warnBorder': pwdAgain.warnInfo}"
                    @keyup.enter.native="toNextStep"
                    @blur="checkPwdAgain"
                    v-model="pwdAgain.input">
                </el-input>
                <div class="warn" v-show="pwdAgain.warnInfo"><span class="el-icon-error"></span> {{pwdAgain.warnInfo}}</div>
            </div>
      </div>
      <div class="step step4" v-if="step === 4">
            <div class="success-wrap">
                <span class="el-icon-success"></span>
                <p class="success-txt">新密码重置成功！</p>
            </div>
      </div>
      <div class="btns tc">
          <el-button class="nextBtn" @click="toNextStep" :disabled="step === 4">{{nextBtnTxt}}</el-button>
      </div>
  </div>
</template>

<script>
import countDown from '../common/countDown.vue'

// 手机号校验
const PHONE_REG = /^1[3|4|5|8][0-9]\d{8}$/
// 密码校验, 长度8~16位，包含数字和大小写字母
const PWD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
// 验证码校验
const VERIFY_REG = /^\d{6}$/

export default {
  name: 'ResetByPhone',
  components: {
    countDown
  },
  data () {
    return {
      nextBtnTxt: '下一步',
      step: 1,
      phone: {
        input: '',
        warnInfo: ''
      },
      verifyCode: {
        input: '',
        warnInfo: ''
      },
      phoneNumCode: '', // 加*的手机号
      startCountDown: false,
      password: {
        input: '',
        warnInfo: ''
      },
      pwdAgain: {
        input: '',
        warnInfo: ''
      }
    }
  },
  created () {
  },
  methods: {
    /**
     * 手机号码校验
     */
    checkPhone () {
      /* eslint-disable */
      let str = this.phone.input
      // 未填
      if (!str) {
        return '不能为空！'
      }
      // 格式错误
      else if (!PHONE_REG.test(str)) {
        return '手机号码格式有误！'
      }
      else if (str !== '18866668888') {
        // 模拟向服务器发送请求，验证手机号是否已注册
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('该手机号尚未注册！')
          }, 1000)
        })
      }
      // 验证通过
      else {
        return ''
      }
    },


    /**
     * 验证码校验
     */
    checkVerifyCode () {
      /* eslint-disable */
      let str = this.verifyCode.input
      // 未填
      if (!str) {
        return '不能为空！'
      }
      // 格式错误
      else if (!VERIFY_REG.test(str)) {
        return '验证码格式有误！'
      }
      else if (str !== '666666') {
        // 模拟向服务器发送请求，检查验证码是否正确
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('验证码错误！')
          }, 1000)
        })
      }
      // 验证通过
      else {
        return ''
      }
    },


    /**
     * 点击获取验证码
     */
    sendSMS () {
      this.$refs.sendSmsBtn.action()
    },


    /**
     * 密码校验
     */
    checkPwd () {
      /* eslint-disable */
      let str = this.password.input
      // 未填
      if (!str) {
        this.password.warnInfo = '不能为空！'
      }
      // 格式错误
      else if (!PWD_REG.test(str)) {
        this.password.warnInfo = '密码格式有误！'
      }
      // 验证通过
      else {
        this.password.warnInfo = ''
      }
    },


    /**
     * 再次输入密码校验
     */
    checkPwdAgain () {
      /* eslint-disable */
      let str = this.pwdAgain.input
      // 未填
      if (!str) {
        this.pwdAgain.warnInfo = '不能为空！'
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
      }
    },


    /*
     * 点击下一步按钮
     */
    async toNextStep () {
      let step = this.step
      switch (step) {
        // step1: 输入手机号
        case 1:
          let phoneWarn = await this.checkPhone()
          if (phoneWarn) {
            this.phone.warnInfo = phoneWarn
            return
          } else {
            // 进入验证码页
            this.step++
            let str = this.phone.input
            this.phoneNumCode = `${str.slice(0, 3)}****${str.slice(7, 11)}`
            this.$nextTick(() => {
              this.startCountDown = true
              this.$refs.verifyInput.focus()
            })
            return
          }

        // step2: 输入验证码
        case 2:
          let verifyWarn = await this.checkVerifyCode()
          if (verifyWarn) {
            this.verifyCode.warnInfo = verifyWarn
            return
          } else {
            // 进入修改密码页
            this.step++
            this.$nextTick(() => {
              this.$refs.pwdInput.focus()
            })
            return
          }

        // step3: 修改密码
        case 3:
          this.checkPwd()
          this.checkPwdAgain()
          if (this.password.warnInfo || this.pwdAgain.warnInfo) {
            return
          } else {
            // 进入完成页
            this.step++
            let count = 5
            this.nextBtnTxt = `正在跳转至登录页面(${count}s)`
            let timer = setInterval(() => {
              count--
              this.nextBtnTxt = `正在跳转至登录页面(${count}s)`
              if (count === 0) {
                clearInterval(timer)
                this.$router.push('/login')
              }
            }, 1000)
          }
      }
    }
  }
}
</script>

<style scoped>
.smsNotice {
    color: aquamarine;
    font-size: 16px;
    padding: 0 0 20px 0;
}
.btns {
    margin: 40px 0 0 0;
}
.nextBtn {
    width: 100%;
}
.step {
    margin: 130px 0 0 0;
    position: relative;
}
.step2 .step3 {
    margin-top: 100px;
}
.step4 {
    margin-top: 90px;
}
.warn {
    position: absolute;
    bottom: -17px;
    left: 0;
    color: #fc5b5b;
}
.info {
    color: #aaa;
    position: absolute;
    top: -17px;
    left: 2px;
}
/* 短信验证 step2 */
.smsInput {
    width: 270px;
}
.sendSmsBtn {
    width: 135px;
}

/* 输入新密码 step3 */
.password-wrap {
    position: relative;
}
.pwdAgain-wrap {
    position: relative;
    margin: 30px 0 0 0;
}

/* 完成 step4 */
.success-wrap {
    color: aquamarine;
    font-size: 30px;
    text-align: center
}
.el-icon-success {
    font-size: 60px;
    padding: 0 0 20px 0;
}
</style>
