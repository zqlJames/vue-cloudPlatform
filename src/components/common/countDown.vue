<template>
    <!-- 倒计时按钮组件 -->
    <div class="countDown">
        <el-button class="smsVerify-btn"
            :size="size"
            @click="startCountDown"
            :disabled="!isEnd">
            {{btnTxt}}
        </el-button>
    </div>
</template>
<script>
export default {
  name: 'countDown',
  props: ['time', 'size', 'disabled', 'autoStart', 'title'],
  data () {
    return {
      myTime: this.time,
      isEnd: true,
      btnTxt: '获取验证码',
      btnTxtAfter: 's后重新获取'
    }
  },
  watch: {
    disabled (val) {
      this.isEnd = !val
    },
    autoStart (val) {
      if (val) this.action()
    },
    title (val) {
      if (val.length) {
        this.btnTxt = val[0]
        this.btnTxtAfter = 's后' + val[1]
      }
    }
  },
  methods: {
    /**
     * 执行倒计时动作
     */
    action () {
      this.isEnd = false
      this.btnTxt = this.myTime + this.btnTxtAfter
      let timer = setInterval(() => {
        this.myTime--
        this.btnTxt = this.myTime + this.btnTxtAfter
        if (this.myTime === 0) {
          clearInterval(timer)
          this.isEnd = true
          this.myTime = this.time
          this.btnTxt = this.title ? this.title[0] : '获取验证码'
        }
      }, 1000)
    },
    /**
     * 点击按钮开始倒计时
     */
    startCountDown () {
      // 通知父组件触发发送验证码请求
      this.$emit('click', true)
      // this.action()
    }
  }
}
</script>
<style scoped>
.countDown {
    display: inline-block;
}
</style>
<style>
.countDown .el-button {
    width: 100%;
}
</style>
