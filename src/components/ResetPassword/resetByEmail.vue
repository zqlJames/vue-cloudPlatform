<template>
    <div id="resetByEmail">
        <div class="step step1" v-if="step === 1">
            <el-input type="text" placeholder="请输入邮箱"
                :class="{'warnBorder': email.warnInfo}"
                @keyup.enter.native="toNextStep"
                autofocus="true"
                v-model="email.input">
            </el-input>
            <div class="warn" v-show="email.warnInfo"><span class="el-icon-error"></span> {{email.warnInfo}}</div>
        </div>
        <div class="step step2" v-if="step === 2">
            <p class="emailNotice tc">
                <span>重置密码链接已发送至邮箱：{{email.input}}</span><br>
                <span>请登录该邮箱进行修改</span>
            </p>
            <el-button class="loginEmailBtn" @click="loginEmail">立即登录邮箱</el-button>
            <countDown time="60" class="sendSmsBtn"
                :autoStart="startCountDown"
                :title="['重新发送邮件', '重新发送邮件']"
                ref="sendEmailBtn"
                @click="sendEmail">
            </countDown>
        </div>
        <div class="step step3" v-if="step === 3">
            <div class="password-wrap">
                <el-input type="password" placeholder="请输入新密码"
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
        <div class="btns tc" v-if="step !== 2">
            <el-button class="nextBtn" @click="toNextStep" :disabled="step === 4">{{nextBtnTxt}}</el-button>
        </div>
    </div>
</template>

<script>
import countDown from '../common/countDown.vue'

// 邮箱校验
const EMAIL_REG = /^\w+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)+$/
// 密码校验, 长度8~16位，包含数字和大小写字母
const PWD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/

export default {
  name: 'resetByEmail',
  components: {
    countDown
  },
  props: ['stage'],
  data () {
    return {
      step: 1,
      nextBtnTxt: '下一步',
      startCountDown: false,
      email: {
        input: '',
        warnInfo: ''
      },
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
  watch: {
    stage (val) {
      this.step = val
      if (val === 3) {
        this.$nextTick(() => {
          this.$refs.pwdInput.focus()
        })
      }
    }
  },
  created () {
  },
  methods: {
    /**
     * 邮箱校验
     */
    checkEmail () {
      /* eslint-disable */
      let str = this.email.input
      // 未填
      if (!str) {
        return'不能为空！'
      }
      // 格式错误
      else if (!EMAIL_REG.test(str)) {
        return '邮箱格式有误！'
      }
      else if (str !== 'aaa@163.com') {
        // 模拟向服务器发送请求，检查邮箱是否已绑定账号
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('该邮箱尚未绑定！')
          }, 1000)
        })
      }
      // 验证通过
      else {
        return ''
      }
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


    /**
     * 点击下一步按钮
     */
    async toNextStep () {
      let step = this.step
      switch (step) {
        // step1: 输入邮箱
        case 1:
          let emailWarn = await this.checkEmail()
          if (emailWarn) {
            this.email.warnInfo = emailWarn
            return
          } else {
            this.step++
            this.$nextTick(() => {
              this.startCountDown = true
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
            return
          }
      }
    },


    /**
     * 点击登录邮箱按钮
     */
    loginEmail () {
      window.location.href = 'https://email.163.com'
    },


    /**
     * 点击发送邮件按钮
     */
    sendEmail () {
      this.$refs.sendEmailBtn.action()
    }
  }
}
</script>

<style scoped>
.emailNotice {
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
    margin: 120px 0 0 0;
    position: relative;
}
.step2 {
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

/* 发送邮件 step2 */
.loginEmailBtn, .sendSmsBtn {
    width: 100%;
}
.sendSmsBtn {
    margin: 30px 0 0 0;
}

.password-wrap {
    position: relative;
}

/* 输入新密码 step3 */
.pwdAgain-wrap {
    margin: 30px 0 0 0;
    position: relative;
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
 