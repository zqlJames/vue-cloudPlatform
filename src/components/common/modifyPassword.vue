<template>
    <!-- 修改密码组件 -->
    <div class="modifyPassword">
        <div class="oldpwd item">
            <label for="old" class="label">旧密码：</label>
            <el-input type="password"
                size="small"
                v-model="pwdData.old"
                id="old"
                :class="{'input': true, 'warnBorder': isWarnData.old, 'rightBorder': isRightData.old}"
                @blur="oldPwdBlur"></el-input>
                <p :class="{'warning': true,
                            'warning-top': warnPlace === 'top',
                            'warning-right': warnPlace === 'right'}"
                    v-show="isWarnData.old">
                    <span class="el-icon-error"></span><i>{{warnTxtData.old}}</i>
                </p>
                <span class="el-icon-success" v-show="isRightData.old"></span>
            <!-- <p class="notice"><i>初始密码为 <a href="#" class="link">设备验证码</a></i></p> -->
            <slot name="oldTips" class="notice"></slot>
        </div>
        <div class="newpwd item">
            <label for="new" class="label">新密码：</label>
            <el-input type="password"
                size="small"
                v-model="pwdData.new" id="new"
                :class="{'input': true, 'warnBorder': isWarnData.new, 'rightBorder': isRightData.new}"
                @blur="newPwdBlur"></el-input>
                <p :class="{'warning': true,
                            'warning-top': warnPlace === 'top',
                            'warning-right': warnPlace === 'right'}"
                    v-show="isWarnData.new">
                    <span class="el-icon-error"></span><i>{{warnTxtData.new}}</i>
                </p>
                <span class="el-icon-success" v-show="isRightData.new"></span>
            <!-- <p class="notice"><i>长度为6~12位字母或数字</i></p> -->
            <slot name="newTips" class="notice"></slot>
        </div>
        <div class="newpwd-confirm item">
            <label for="newConfirm" class="label">确认新密码：</label>
            <el-input type="password"
                size="small"
                v-model="pwdData.confirm"
                id="newConfirm"
                :class="{'input': true, 'warnBorder': isWarnData.confirm, 'rightBorder': isRightData.confirm}"
                @blur="confirmPwdBlur"></el-input>
                <p :class="{'warning': true,
                            'warning-top': warnPlace === 'top',
                            'warning-right': warnPlace === 'right'}"
                    v-show="isWarnData.confirm">
                    <span class="el-icon-error"></span><i>{{warnTxtData.confirm}}</i>
                </p>
                <span class="el-icon-success" v-show="isRightData.confirm"></span>
            <p class="notice"><i>与上面的密码保持一致</i></p>
        </div>
        <div class="footer">
            <el-button @click="btnCancel" v-if="showCancelBtn">取 消</el-button>
            <el-button type="primary" @click="btnOK">确 定</el-button>
        </div>
    </div>
</template>
<script>
// 密码校验规则: 6~12位字母或数字
const REG = /^[a-zA-Z0-9]{6,12}$/
export default {
  name: 'modifyPwd',
  props: ['showCancelBtn', 'warnPlace'],
  data () {
    return {
      pwdData: {
        old: '', // 输入的旧密码
        new: '', // 输入的新密码
        confirm: '' // 确认的新密码
      },
      isWarnData: {
        old: false, // 是否显示旧密码错误提示
        new: false, // 是否显示新密码错误提示
        confirm: false // 是否显示确认密码错误提示
      },
      warnTxtData: {
        old: '', // 旧密码错误提示内容
        new: '', // 新密码错误提示内容
        confirm: '' // 确认密码错误提示内容
      },
      isRightData: { // 是否显示正确图标
        old: false,
        new: false,
        confirm: false
      }
    }
  },
  watch: {
  },
  methods: {
    /**
     * 密码校验提示
     * @item{string} 校验项，'old'/'new'/'confirm'
     * @value{Boolean} true显示正确图标，false显示错误提示
     * @text{string} 错误提示的内容
     */
    checkRules (item, value, text = '') {
      this.isWarnData[item] = !value
      this.isRightData[item] = value
      this.warnTxtData[item] = text
    },

    /**
     * 旧密码输入框失去焦点时合法校验
     */
    oldPwdBlur () {
      let val = this.pwdData.old
      let newVal = this.pwdData.new
      if (!val) {
        this.checkRules('old', false, '密码不能为空！')
      } else {
        this.checkRules('old', true)
        if (newVal && newVal === val) this.checkRules('new', false, '不能与旧密码相同！')
        if (newVal && REG.test(newVal) && newVal !== val) this.checkRules('new', true)
      }
    },

    /**
     * 新密码输入框失去焦点时合法校验
     */
    newPwdBlur () {
      const reg = /^[a-zA-Z0-9]$/
      let val = this.pwdData.new
      if (!val) {
        this.checkRules('new', false, '密码不能为空！')
        return
      }
      if (!reg.test(val)) this.checkRules('new', false, '只能输入字母或数字！')
      if (val.length < 6) this.checkRules('new', false, '密码长度不得小于6位！')
      if (val.length > 12) this.checkRules('new', false, '密码长度不得大于12位！')
      if (REG.test(val)) {
        this.checkRules('new', true)
        if (this.pwdData.old && val === this.pwdData.old) this.checkRules('new', false, '不能与旧密码相同！')
        if (this.pwdData.confirm && val !== this.pwdData.confirm) this.checkRules('confirm', false, '两次输入的密码不一致！')
        if (val === this.pwdData.confirm) this.checkRules('confirm', true)
      }
    },

    /**
     * 确认新密码输入框失去焦点时合法校验
     */
    confirmPwdBlur () {
      let val = this.pwdData.confirm
      if (!val) {
        this.checkRules('confirm', false, '密码不能为空！')
        return
      }
      if (val !== this.pwdData.new) {
        this.checkRules('confirm', false, '两次输入的密码不一致！')
      } else {
        this.checkRules('confirm', true)
      }
    },

    /**
     * 点击确认按钮
     */
    btnOK () {
      // 先判断是否有未填项
      let pwdData = {...this.pwdData}
      let isWarnData = {...this.isWarnData}
      for (let k in pwdData) {
        if (!pwdData[k]) {
          this.checkRules(k, false, '密码不能为空！')
          return
        }
      }
      // 再判断有无错误输入
      for (let k in isWarnData) {
        if (isWarnData[k]) {
          return
        }
      }
      // 通知父组件发送修改密码请求
      this.$emit('confirm', true)
    }
  }
}
</script>
<style scoped>
.modifyPassword .input {
    width: 200px;
}
.item {
    margin-top: 45px;
    position: relative;
}
.item.oldpwd {
    margin-top: 0;
}
.label {
    display: inline-block;
    width: 100px;
}
.notice{
    margin-left: 100px;
    width: 200px;
    color: #999;
}
.warning {
    position: absolute;
    color: red;
    display: inline-block;
}
.warning-top {
    top: -16px;
    left: 100px;
}
.warning-right {
    top: 10px;
    left: 315px;
}
.el-icon-success {
  color: #67c500;
}
</style>
<style>
.modifyPassword .warnBorder .el-input__inner,
.modifyPassword .warnBorder .el-input__inner:hover,
.modifyPassword .warnBorder .el-input__inner:focus {
  border-color: red;
}
.modifyPassword .rightBorder .el-input__inner,
.modifyPassword .rightBorder .el-input__inner:hover,
.modifyPassword .rightBorder .el-input__inner:focus {
  border-color: #67c500;
}
</style>
