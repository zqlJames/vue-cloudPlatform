<template>
    <div class="cancelAccount">
        <p class="notice"><span class="el-icon-info"></span> 为了保障账号安全，请按照下面步骤操作</p>
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
              <div class="verify-wrap">
                  <el-input type="text" maxlength="8" placeholder="请输入短信验证码"
                      :class="{'warnBorder': verifyCode.warnInfo, 'smsInput': true}"
                      ref="verifyInput"
                      @keyup.enter.native="toNextStep"
                      v-model="verifyCode.input">
                  </el-input>
                  <countDown time="60" class="sendSmsBtn" :autoStart="startCountDown" ref="sendSmsBtn" @click="sendSMS"></countDown>
                  <div class="warn" v-show="verifyCode.warnInfo"><span class="el-icon-error"></span> {{verifyCode.warnInfo}}</div>
              </div>
              <div class="password-wrap">
                  <el-input type="password" placeholder="请输入账户密码"
                      :class="{'warnBorder': password.warnInfo}"
                      ref="pwdInput"
                      @keyup.enter.native="toNextStep"
                      v-model="password.input">
                  </el-input>
                  <div class="warn" v-show="password.warnInfo"><span class="el-icon-error"></span> {{password.warnInfo}}</div>
              </div>
        </div>
        <el-button class="nextBtn" @click="toNextStep" :disabled="step === 4">{{nextBtnTxt}}</el-button>
    </div>
</template>
<script>
import countDown from '../../common/countDown.vue'

export default {
  name: 'cancelAccount',
  components: {
    countDown
  },
  data () {
    return {
      nextBtnTxt: '下一步',
      step: 1,
      phoneNumCode: '', // 加*的手机号
      startCountDown: false,
      phone: {
        input: '',
        warnInfo: ''
      },
      verifyCode: {
        input: '',
        warnInfo: ''
      },
      password: {
        input: '',
        warnInfo: ''
      }
    }
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
      else if (str !== '18866668888') {
        // 模拟向服务器发送请求，验证手机号是否已注册
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('手机号码错误！')
          }, 1000)
        })
      }
      // 验证通过
      else {
        return ''
      }
    },


    /**
     * 验证码前台校验
     */
    checkVerifyCode () {
      this.verifyCode.warnInfo = ''
      if (!this.verifyCode.input) this.verifyCode.warnInfo = '不能为空！'
    },


    /**
     * 密码前台校验
     */
    checkPwd () {
      this.password.warnInfo = ''
      if (!this.password.input) this.password.warnInfo = '不能为空！'
    },


    /**
     * 验证码+密码后台校验
     */
    checkVerifyAndPwd () {
      let verifyCode = this.verifyCode.input
      let password = this.password.input
      // 模拟向服务器发送请求
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (verifyCode !== '666666' || password !== 'aaaa1111') {
            resolve('验证码或密码错误！')
          } else {
            resolve()
          }
        }, 1000)
      })
    },


    /**
     * 点击获取验证码
     */
    sendSMS () {
      this.$refs.sendSmsBtn.action()
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

        // step2: 校验验证码和密码
        case 2:
          this.checkVerifyCode()
          this.checkPwd()
          if (this.verifyCode.warnInfo || this.password.warnInfo) return
          let result = await this.checkVerifyAndPwd()
          if (result) {
            this.$message({
              type: 'error',
              message: result
            })
            return
          } else {
            // 弹出是否确认注销弹窗
            this.$confirm('是否确认注销账号？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login')
            })
          }
      }
    }
  }
}
</script>
<style scoped>
.cancelAccount {
    padding: 20px 0 0 30px;
}
.notice {
    font-weight: 700;
    font-size: 16px;
}
.step {
    width: 300px;
    position: relative;
    margin: 30px 0 0 0;
}
.warn {
    position: absolute;
    bottom: -17px;
    left: 0;
    color: #fc5b5b;
}
.verify-wrap {
    position: relative;
}
.info {
    color: #aaa;
    position: absolute;
    top: -17px;
    left: 2px;
}
/* 短信验证 step2 */
.smsInput {
    width: 160px;
}
.sendSmsBtn {
    display: inline-block;
    width: 135px;
}
.password-wrap {
    position: relative;
    margin: 30px 0 0 0;
}
.nextBtn {
    margin: 30px 0 0 0;
    width: 300px;
}
</style>
