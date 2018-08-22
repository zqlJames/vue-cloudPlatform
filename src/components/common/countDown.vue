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
  props: ['time', 'size', 'disabled'],
  data () {
    return {
      myTime: this.time,
      isEnd: true,
      btnTxt: '获取验证码'
    }
  },
  watch: {
    disabled (val) {
      this.isEnd = !val
    }
  },
  methods: {
    /**
     * 点击按钮开始倒计时
     */
    startCountDown () {
      this.isEnd = false
      this.btnTxt = this.myTime + 's后重新获取'
      // 通知父组件触发发送验证码请求
      this.$emit('click', true)
      this.$message({
        type: 'success',
        message: '已发送验证码请求！请在手机上查看'
      })
      let timer = setInterval(() => {
        this.myTime--
        this.btnTxt = this.myTime + 's后重新获取'
        if (this.myTime === 0) {
          clearInterval(timer)
          this.isEnd = true
          this.myTime = this.time
          this.btnTxt = '获取验证码'
        }
      }, 1000)
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
