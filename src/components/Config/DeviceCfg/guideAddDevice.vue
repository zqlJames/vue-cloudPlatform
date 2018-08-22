<template>
    <!-- 设置向导组件 -->
    <div id="guideAddDevice" v-loading="loading" element-loading-text="拼命加载中...">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Config/DeviceCfg' }">我的设备</el-breadcrumb-item>
            <el-breadcrumb-item>设备向导</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <h3 class="header-title">欢迎使用设备添加与设置向导，请根据下面的步骤完成操作</h3> -->
        <el-steps :active="active" simple finish-status="success" class="guide-steps">
            <el-step title="选择设备类型"></el-step>
            <el-step title="连接设备"></el-step>
            <el-step title="添加设备"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <div class="stepPage">
            <component
              :is="steps[active]"
              :type="chooseType"
              :link="link"
              :isNew="isNew"
              @getType="getType">
            </component>
        </div>
        <!-- <step2 :is="active === 1"></step2>
        <step3 :is="active === 2"></step3>
        <step4 :is="active === 3"></step4> -->
        <div class="btnGroup">
          <el-button @click="toPreStep" v-show="this.active !== 0" type="primary" size="small" round class="backBtn">{{backBtnTxt}}</el-button>
          <el-button @click="toNextStep" v-show="this.active <= 4" type="success" size="small" round class="nextBtn">{{nextBtnTxt}}</el-button>
        </div>
    </div>
</template>
<script>
import step1 from './addDeviceSteps/chooseDevice.vue'
import step2 from './addDeviceSteps/linkToDevice.vue'
import step3 from './addDeviceSteps/addDevice.vue'
import step4 from './addDeviceSteps/finished.vue'
export default {
  name: 'GuideAddDevice',
  components: {
    step1,
    step2,
    step3,
    step4
  },
  props: ['currentActive'],
  data () {
    return {
      loading: false,
      steps: ['step1', 'step2', 'step3', 'step4', 'step4'],
      active: this.$route.params.activeIndex || 0,
      chooseType: '',
      link: '',
      backBtnTxt: '',
      nextBtnTxt: '我是老司机，跳过此步直接开始添加设备~',
      isNew: false
    }
  },
  created () {
  },
  mounted () {
    if (this.$route.params.activeIndex) this.isNew = true
  },
  watch: {
    active (val) {
      switch (val) {
        case 0:
          this.nextBtnTxt = '我是老司机，跳过此步直接开始添加设备~'
          break
        case 1:
          this.backBtnTxt = '返回选择设备类型'
          this.nextBtnTxt = '我已连接好设备，下一步'
          break
        case 2:
          this.backBtnTxt = '返回查看连接帮助'
          this.nextBtnTxt = '下一步'
          break
        case 3:
          this.backBtnTxt = '继续添加其他设备'
          this.nextBtnTxt = '立即开始体验'
          break
        case 4:
          this.backBtnTxt = '继续添加其他设备'
          this.nextBtnTxt = '立即开始体验'
          break
      }
    }
  },
  methods: {
    /**
     * 下一步
     */
    toNextStep () {
      if (this.active === 0) {
        this.active = 2
        return
      }
      if (this.active === 3 || this.active === 4) {
        this.$router.push({
          path: '/Home'
        })
      }
      if (this.active === 2) {
        this.active = 4
        return
      }
      if (this.active++ > 3) this.active = 0
    },

    /**
     * 返回上一步
     */
    toPreStep () {
      if (this.active === 4) {
        this.active = 2
        return
      }
      if (this.active-- < 1) this.active = 0
    },

    /**
     * 获取选择的设备类型和连接说明
     */
    getType (link) {
      this.link = link
      this.active = 1
    }
  }
}
</script>
<style scoped>
#guideAddDevice {
    padding: 20px 0 20px 20px;
    height: 100%;
}
.header-title {
    padding: 20px 0 5px 0;
    font-weight: 400;
    color: #999;
}
.guide-steps {
    margin-top: 20px;
}
.stepPage {
    height: calc(100% - 120px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10px 0 0;
}
.btnGroup {
  text-align: center
}
.backBtn, .nextBtn {
  display: inline-block;
  margin: 10px 15px 0 0;
}
</style>
