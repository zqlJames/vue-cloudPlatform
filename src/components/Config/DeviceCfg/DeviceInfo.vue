<template>
    <div id="deviceInfo" v-loading="loading" element-loading-text="拼命加载中...">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Config/DeviceCfg' }">我的设备</el-breadcrumb-item>
          <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
          <div class="header">
              <div class="header-left fl">
                  <img :src="info.image" :title="info.name" :alt="info.name" class="header-left-img">
              </div>
              <div class="header-right fl">
                  <div class="header-right-title">
                      <h4 class="fl">{{info.name}}</h4>
                      <span class="fr">扫扫二维码，微信快捷管理设备</span>
                  </div>
                  <div class="header-right-content">
                      <div class="header-right-content-item">
                            <span class="header-right-content-item-left">类型：</span>
                            <span>网络摄像机 C1</span>
                      </div>
                      <div class="header-right-content-item">
                            <span class="header-right-content-item-left"> 序列号：</span>
                            <span>451961515</span>
                      </div>
                      <div class="header-right-content-item">
                            <span class="header-right-content-item-left">网络状态：</span>
                            <span>有线</span>
                      </div>
                      <div class="header-right-content-item">
                            <span class="header-right-content-item-left">当前版本：</span>
                            <span>
                                V4.2.5 build 151103
                                <span>（已是最新版本）</span>
                                <a class="link">查看版本信息</a>
                            </span>
                      </div>
                  </div>
                  <div class="header-right-buttons">
                      <el-button disabled icon="el-icon-upload2" size="mini">升级</el-button>
                      <el-button icon="el-icon-edit" size="mini" @click="editName">修改名称</el-button>
                      <el-button icon="el-icon-wifi" size="mini">设置Wi-Fi</el-button>
                      <el-button icon="el-icon-delete" size="mini">删除设备</el-button>
                      <el-button icon="el-icon-refresh" size="mini">转移设备</el-button>
                  </div>
              </div>
          </div>
          <div class="config-wrap">
              <el-collapse v-model="activePanelNames">
                  <!-- 活动检测提醒 start -->
                  <el-collapse-item name="1">
                      <template slot="title">
                        活动检测提醒
                        <i class="activeNotice-tip"><i class="el-icon-info"></i>当设备检测到人或动物活动时，会向您发送消息推送，以作提醒。</i>
                      </template>
                      <div class="config-item">
                          <div class="config-item-title">提醒开关：</div>
                          <div class="config-item-content" onselectstart="return false">
                              <el-switch v-model="noticeSwitch"></el-switch>
                          </div>
                      </div>
                      <transition name="fade">
                          <div v-show="noticeSwitch" class="fade-content">
                                <div class="config-item">
                                    <div class="config-item-title">提醒时段：</div>
                                    <div class="config-item-content">
                                        <el-radio-group v-model="timeRangeRadio">
                                                <el-radio label="1">全部时间段均作提醒</el-radio>
                                                <el-radio label="2">我要特殊设定</el-radio>
                                        </el-radio-group><br>
                                        <!-- 时间范围周期选择弹窗组件 start -->
                                        <timeRangePicker
                                            title="活动检测提醒时间段"
                                            @getTimeRange="getTimeRangeData"
                                            ref="timeRange"
                                            :visible.sync="isShowSetTimeDia"
                                            :initTimeRangeData="timeRangeValue">
                                        </timeRangePicker>
                                        <timeRangeResultBox
                                            @openDia="openNoticeSetDia"
                                            v-show="isShowResultBox"
                                            :timeResultStr="timeResultStr"
                                            :cycleDays="cycleDays">
                                        </timeRangeResultBox>
                                    </div>
                                </div>
                                <div class="config-item">
                                    <span class="config-item-title">提醒声音：</span>
                                    <el-select v-model="selectedSound" size="mini" placeholder="请选择">
                                            <el-option
                                                v-for="item in sounds"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                <span style="float: left; padding-right: 30px">{{ item.label }}</span>
                                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.describe }}</span>
                                            </el-option>
                                    </el-select>
                                </div>
                          </div>
                      </transition>
                  </el-collapse-item>
                  <!-- 活动检测提醒 end -->
                  <!-- 设备存储状态 start -->
                  <el-collapse-item name="2">
                      <template slot="title">
                        设备存储状态
                        <i class="activeNotice-tip"><i class="el-icon-info"></i>查看设备存储类型和服务有效期</i>
                      </template>
                      <div v-if="devStoreState.isOverdue">
                          <div>
                            <span>{{devStoreState.storeStyle}}</span>
                            <el-tag type="danger" size="mini">已到期</el-tag>
                          </div>
                          <div>有效期：{{devStoreState.deadline}}</div>
                          <div>
                              <a href="#" class="link mr5">云存储服务条款</a>
                              <a href="#" class="link ml5">去延长服务</a>
                          </div>
                      </div>
                      <div v-else>
                          <span>{{devStoreState.storeStyle}}</span>
                          <el-tag type="success" size="mini">正常使用</el-tag>
                      </div>
                  </el-collapse-item>
                  <!-- 设备存储状态 end -->
                  <!-- 设备安全状态 start -->
                  <el-collapse-item name="3">
                      <template slot="title">
                        设备安全状态
                        <i class="activeNotice-tip"><i class="el-icon-info"></i>开启后，您的视频与图片将会受到密码保护</i>
                      </template>
                      <div class="config-item">
                          <div class="config-item-title">视频图片加密：</div>
                          <div class="config-item-content">
                              <el-switch v-model="securitySwitch" @change="changeSecuritySwitch"></el-switch>
                              <span class="link ml5" @click="modifyPwd">修改密码</span>
                              <modifyPwd title="修改加密密码" :visible.sync="modifyPwdVisible"></modifyPwd>
                          </div>
                      </div>
                      <!-- dialog 短信验证弹窗 start -->
                      <el-dialog
                        title="手机验证码验证"
                        :visible.sync="smsVerifyDiaVisible"
                        width="450"
                        class="smsVerify">
                        <span>验证码：</span>
                        <el-input v-model="verificationCode" class="smsVerify-input" placeholder="请输入验证码"></el-input>
                        <countDown time="20" size="midium" @click="getVerifyCode"></countDown>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="smsVerifyDiaVisible = false">取 消</el-button>
                            <el-button type="primary" @click="decryptConfirm">确 定</el-button>
                        </span>
                      </el-dialog>
                      <!-- dialog 短信验证弹窗 end -->
                  </el-collapse-item>
                  <!-- 设备安全状态 end -->
                  <!-- 设备在线设置 start -->
                  <el-collapse-item name="4">
                      <template slot="title">
                        设备在线设置
                        <i class="activeNotice-tip"><i class="el-icon-info"></i>设置后，设备将按照设置的时间段自动开关机。</i>
                      </template>
                      <div class="config-item">
                          <div class="config-item-title">在线时段开关：</div>
                          <div class="config-item-content" onselectstart="return false">
                              <el-switch v-model="onlineSwitch" @change="changeOnlineSwitch"></el-switch>
                              <timeRangePicker
                                  title="在线时段设置"
                                  ref="onlineTimeRange"
                                  @getTimeRange="getOlineTimeRangeData"
                                  :visible.sync="isShowOnlineTimeRangeDia"
                                  :initTimeRangeData="onlineTimeRangeValue">
                                  <div slot="describe" class="slot-onlineDescribe">
                                      <p><span class="el-icon-info"></span> <i>设置了设备的上下线时间之后，设备将会在所设置的时间自动上下线。</i></p>
                                      <p>&nbsp;&nbsp;&nbsp; <i>如需在已设置好的时间之外上线，必须reset设备并重新配置后，才可重新上线，故请慎重考虑。</i></p>
                                  </div>
                              </timeRangePicker>
                              <timeRangeResultBox
                                    @openDia="openOnlineSetDia"
                                    v-show="isShowOnlineResultBox"
                                    :timeResultStr="onlineTimeResultStr"
                                    :cycleDays="onlineCycleDays">
                              </timeRangeResultBox>
                          </div>
                      </div>
                  </el-collapse-item>
                  <!-- 设备在线设置 end -->
                  <!-- 设备消息通知 start -->
                  <el-collapse-item name="5">
                      <template slot="title">
                        设备消息通知
                        <i class="activeNotice-tip"><i class="el-icon-info"></i>设备下线后，手机客户端会收到提醒消息</i>
                      </template>
                      <div class="config-item">
                          <div class="config-item-title">下线通知：</div>
                          <div class="config-item-content">
                              <el-switch v-model="msgNotifySwitch"></el-switch>
                          </div>
                      </div>
                  </el-collapse-item>
                  <!-- 设备消息通知 end -->
                  <!-- 设备声音开关 start -->
                  <el-collapse-item name="6">
                      <template slot="title">
                        设备声音开关
                        <i class="activeNotice-tip"><i class="el-icon-info"></i>开启后，开机和设置wifi有声音提示</i>
                      </template>
                      <div class="config-item">
                          <div class="config-item-title">提示音设置：</div>
                          <div class="config-item-content">
                              <el-switch v-model="devSoundSwitch"></el-switch>
                          </div>
                      </div>
                  </el-collapse-item>
                  <!-- 设备声音开关 end -->
              </el-collapse>
          </div>
      </div>
    </div>
</template>
<script>
import timeRangePicker from './timeRangePicker.vue'
import timeRangeResultBox from './timeRangeResultBox.vue'
import countDown from '../../common/countDown.vue'
import modifyPwd from './modifyPasswordDialog.vue'
export default {
  name: 'DeviceInfo',
  components: {
    timeRangePicker,
    timeRangeResultBox,
    countDown,
    modifyPwd
  },
  data () {
    return {
      loading: false,
      id: '', // 当前设备id
      info: [], // 设备详情信息
      activePanelNames: ['1', '2', '3'], // 默认展开配置
      /* 活动检测提醒 */
      noticeSwitch: false, // 提醒开关
      timeRangeRadio: '1', // 提醒时段单选框
      timeRangeValue: { // 特殊设定时段值
        startHourValue: '00',
        startMinuteValue: '00',
        endHourValue: '00',
        endMinuteValue: '01',
        checkedDays: []
      },
      isShowSetTimeDia: false, // 是否显示时间周期范围选择弹窗
      cycleDays: [], // 选择的星期
      isShowResultBox: false, // 是否显示特殊设定结果
      timeResultStr: '00 : 00 ~ 00 : 01', // 显示的时间结果
      sounds: [{ // 提醒声音
        value: 1,
        label: '警报模式',
        describe: '对闯入者进行强烈警告（蜂鸣警报声）'
      }, {
        value: 2,
        label: '提醒模式',
        describe: '对闯入者进行轻微警告（间歇的”嘀“的一声）'
      }, {
        value: 3,
        label: '静音模式',
        describe: ''
      }],
      selectedSound: '',
      /* 设备存储状态 */
      devStoreState: {
        storeStyle: '云存储', // 存储类型
        isOverdue: true, // 是否过期
        deadline: '2018.6.15' // 到期时间
      },
      /* 设备安全状态 */
      securitySwitch: false, // 加密开关状态
      smsVerifyDiaVisible: false, // 是否显示解密验证码验证弹窗
      verificationCode: '', // input输入的验证码
      modifyPwdVisible: false, // 是否显示修改密码弹窗
      /* 设备在线设置 */
      onlineSwitch: false, // 在线开关
      isShowOnlineTimeRangeDia: false,
      onlineTimeRangeValue: { // 特殊设定时段值
        startHourValue: '00',
        startMinuteValue: '00',
        endHourValue: '00',
        endMinuteValue: '01',
        checkedDays: []
      },
      onlineCycleDays: [], // 选择的星期
      isShowOnlineResultBox: false, // 是否显示特殊设定结果
      onlineTimeResultStr: '00 : 00 ~ 00 : 01', // 显示的时间结果
      /* 设备消息通知 */
      msgNotifySwitch: false,
      /* 设备声音开关 */
      devSoundSwitch: false
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getDevInfo()
  },
  mounted () {
  },
  watch: {
    cycleDays (val) {
      if (!val.length) this.timeRangeRadio = '1'
    },
    timeRangeRadio (val) {
      this.isShowSetTimeDia = val === '2'
      this.isShowResultBox = val === '2'
    },
    onlineCycleDays (val) {
      this.onlineSwitch = val.length !== 0
    },
    onlineSwitch (val) {
      if (!val) this.isShowOnlineResultBox = false
    },
    msgNotifySwitch (val) {
      if (val) {
        this.$message({
          type: 'success',
          message: '已开启消息通知！'
        })
      } else {
        this.$message({
          type: 'success',
          message: '已关闭消息通知！'
        })
      }
    },
    devSoundSwitch (val) {
      if (val) {
        this.$message({
          type: 'success',
          message: '已开启设备声音！'
        })
      } else {
        this.$message({
          type: 'success',
          message: '已关闭设备声音！'
        })
      }
    }
  },
  methods: {
    /**
     * 根据设备id获取设备详情信息
     */
    getDevInfo () {
      this.loading = true
      let url = 'http://127.0.0.1:3000/deviceInfo/' + this.id
      this.$http.get(url).then(res => {
        setTimeout(() => {
          this.loading = false
          this.info = res.data
        }, 1000)
      })
    },

    /**
     * 修改设备名称
     */
    editName () {
      this.$prompt('', '修改名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[^%#&',;=?$+@!~`%*"/\\]+/g,
        // inputErrorMessage: '不能出现 %#&\',;=?$+@!~`%*" 等特殊字符'
      }).then(({value}) => {
        let url = 'http://127.0.0.1:3000/deviceInfo/' + this.id
        let param = {
          name: value
        }
        this.$http.patch(url, param).then(res => {
          this.info.name = value
          this.$message({
            type: 'success',
            message: '已修改！'
          })
        }).catch()
      })
    },

    /**
     * 从timeRangePicker子组件获取时间范围
     */
    getTimeRangeData (val, str) {
      this.timeRangeValue = val
      this.timeResultStr = str
      this.cycleDays = this.$refs.timeRange.sortCheckedDays(val.checkedDays)
      this.isShowResultBox = this.cycleDays !== 0
    },

    openNoticeSetDia (val) {
      this.isShowSetTimeDia = val
    },

    /**
     * 点击设置加密开关时触发
     */
    changeSecuritySwitch (val) {
      this.securitySwitch = !val
      if (val) {
        // 加密
        this.$confirm('如果您的视频正在分享，开启后视频广场分享将自动停止，确定要开启？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.securitySwitch = val
          this.$message({
            type: 'success',
            message: '加密成功!'
          })
        }).catch(() => {})
      } else {
        // 解密
        this.$confirm('关闭后，视频与图片查看的安全级别将降低，确定要关闭？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setTimeout(() => {
            this.smsVerifyDiaVisible = true
          }, 200)
        })
      }
    },

    /**
     * 验证码弹窗点击确认
     */
    decryptConfirm () {
      this.smsVerifyDiaVisible = false
      // 先将获取到的验证码进行验证...
      // 然后关闭加密开关
      this.securitySwitch = false
    },

    /**
     * 获取验证码请求
     */
    getVerifyCode (val) {
      if (val) {
        this.$http.get('/douban/v2/movie/us_box').then(res => {
        }).catch(e => {
          console.log(e)
        })
      }
    },

    /**
     * 点击修改密码时触发
     */
    modifyPwd () {
      // 解密
      this.$confirm('修改后，视频与图片将使用新密码进行加密，但之前加密的录像与图片仍需使用旧密码进行查看，确定要修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          this.modifyPwdVisible = true
        }, 200)
      })
    },

    /**
     * 点击在线时段开关时触发
     */
    changeOnlineSwitch (val) {
      this.onlineSwitch = !val
      if (val) {
        // 开启
        this.$confirm('设置在线时间段后，设备将按照设置的时间段自动开关机，关机时设备将无法操作，确定要设置？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //   this.onlineSwitch = true
          setTimeout(() => {
            this.isShowOnlineTimeRangeDia = true
          }, 200)
        }).catch(() => {})
      } else {
        // 关闭
        this.onlineSwitch = false
        this.onlineTimeRangeValue.checkedDays = []
        this.onlineCycleDays = []
      }
    },

    /**
     * 从timeRangePicker子组件获取在线时间范围
     */
    getOlineTimeRangeData (val, str) {
      this.onlineTimeRangeValue = val
      this.onlineTimeResultStr = str
      this.onlineCycleDays = this.$refs.onlineTimeRange.sortCheckedDays(val.checkedDays)
      this.isShowOnlineResultBox = this.onlineCycleDays.length !== 0
    },

    openOnlineSetDia (val) {
      this.isShowOnlineTimeRangeDia = true
    }
  }
}
</script>
<style scoped>
#deviceInfo {
    height: 100%;
    padding: 20px 0 20px 20px;
}
.main {
    width: 100%;
    height: calc(100% - 14px);
    overflow: auto;
    overflow-x: hidden;
}

/* 头部基本信息样式 */
.header {
    overflow: hidden;
    margin: 20px 0;
}
.header-left {
    width: 240px;
    height: 180px;
    margin-right: 20px;
}
.header-left-img {
    width: 240px;
}
.header-right {
    width: 500px;
    height: 180px;
    position: relative;
}
.header-right-title {
    overflow: hidden;
    padding-bottom: 3px;
    border-bottom: 1px solid #ebeef5
}
.header-right-content-item {
    margin-top: 12px;
}
.header-right-content-item-left {
    display: inline-block;
    width: 80px;
}
.header-right-buttons {
    width: 500px;
    position: absolute;
    left: 0;
    bottom: 0;
}

.activeNotice-tip {
    color: #999;
    font-weight: 400;
    font-size: 12px;
    padding-left: 20px;
}
.config-item {
    margin-top: 10px;
}
.config-item-title {
    display: inline-block;
    width: 100px;
    margin-right: 20px;
    vertical-align: top;
}
.config-item-content {
    display: inline-block;
}

/* 活动检测开启后动画效果 后期优化*/
/* .fade-content {
    will-change: height;
    height: auto;
    overflow: hidden;
}
.fade-enter-active, .fade-leave-active{
    transition: all .5s cubic-bezier(.55,0,.1,1);
}
.fade-enter-active,
.fade-leave-active {
    height: 81px;
    transform-origin: center top;
}
.fade-enter,
.fade-leave-active {
    height: 0px;
} */
.smsVerify-input {
    width: auto;
}

.slot-onlineDescribe {
  padding-bottom: 40px;
  font-size: 12px;
  color: red
}

</style>
<style>
#deviceInfo .header-right-buttons .el-button+.el-button {
    margin-left: 5px;
}
#deviceInfo .el-collapse-item__header {
    font-weight: 700;
}
#deviceInfo .el-switch {
    vertical-align: bottom;
}
#deviceInfo .setTimeRange .el-checkbox-group {
    display: inline-block;
    vertical-align: middle;
}
.smsVerify .el-dialog {
    width: 500px;
}
</style>
