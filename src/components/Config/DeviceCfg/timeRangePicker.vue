<template>
    <!-- 时间范围周期设定弹窗 start -->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="800px"
      class="setTimeRange">
        <div class="config-item">
            <slot name="describe"></slot>
            <div class="config-item-title">时间段：</div>
            <span class="config-item-content">
                <!-- 时间选择 start -->
                <div class="cubecloud_timeRangePicker">
                    <el-select v-model="timeRangeData.startHourValue" size="small" placeholder="请选择">
                        <el-option
                            v-for="item in startHourList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    :
                    <el-select v-model="timeRangeData.startMinuteValue" size="small" placeholder="请选择">
                        <el-option
                            v-for="item in startMinuteList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp;至&nbsp;
                    <el-select v-model="timeRangeData.endHourValue" size="small" placeholder="请选择">
                        <el-option
                            v-for="item in endHourList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    :
                    <el-select v-model="timeRangeData.endMinuteValue" size="small" placeholder="请选择">
                        <el-option
                            v-for="item in endMinuteList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
                <!-- 时间选择 end -->
            </span>
        </div>
        <div class="config-item">
            <span class="config-item-title">重复：</span>
            <!-- 星期选择 start -->
            <el-checkbox-group size="small" v-model="timeRangeData.checkedDays">
                <el-checkbox-button v-for="item in days" :label="item.value" :key="item.value">{{item.label}}</el-checkbox-button>
            </el-checkbox-group>
            <!-- 星期选择 end -->
        </div>
        <!-- <div class="config-item">
            <span class="config-item-title">是否启用：</span>
            <el-switch v-model="isUseSpecialSetting"></el-switch>
        </div> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="btnCancel">取 消</el-button>
            <el-button type="primary" @click="btnOK">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 时间范围周期定弹窗 end -->
</template>
<script>
export default {
  name: 'timeRangePicker',
  props: ['title', 'initTimeRangeData', 'visible'],
  data () {
    return {
      /* 时间选择 */
      startHourList: [],
      startMinuteList: [],
      endHourList: [],
      endMinuteList: [],
      timeRangeData: {...this.initTimeRangeData},
      /* 星期选择 */
      days: [{ // 周一 ~ 周日
        label: this.$t('deviceManage.Monday'),
        value: 1
      }, {
        label: this.$t('deviceManage.Tuesday'),
        value: 2
      }, {
        label: this.$t('deviceManage.Wednesday'),
        value: 3
      }, {
        label: this.$t('deviceManage.Thursday'),
        value: 4
      }, {
        label: this.$t('deviceManage.Friday'),
        value: 5
      }, {
        label: this.$t('deviceManage.Saturday'),
        value: 6
      }, {
        label: this.$t('deviceManage.Sunday'),
        value: 7
      }],
      sortedCheckedDays: [] // 选择的日期排序后结果
    }
  },
  created () {
    this.creatTimeOptions()
  },
  watch: {
    initTimeRangeData: {
      handler (val) {
        this.timeRangeData = {...val}
      },
      deep: true
    },
    timeRangeData: {
      handler (val) {
        this.getEndHourList(val.startHourValue)
        this.getEndMinuteList(val.startHourValue, val.startMinuteValue, val.endHourValue)
      },
      deep: true
    }
  },
  methods: {
    /**
     * 初始化生成时间选项
     */
    creatTimeOptions () {
      let hourList = []
      let minuteList = []
      for (let i = 0; i < 60; i++) {
        let val = i < 10 ? '0' + i : i + ''
        minuteList.push({
          value: val,
          label: val
        })
      }
      hourList = minuteList.slice(0, 24)
      this.startHourList = [...hourList]
      this.startMinuteList = [...minuteList]
      this.endHourList = [...hourList]
      this.endHourList.push({
        value: '00(第二天)',
        label: '00(第二天)'
      })
      this.endMinuteList = [...minuteList]
    },

    /**
     * 动态生成endHourList
     */
    getEndHourList (startHour) {
      let arr = []
      let str = startHour * 1
      let flag = true
      for (let i = 0; i <= 24; i++) {
        if (str < 24 && flag) {
          arr.push({
            label: str < 10 ? '0' + str : str + '',
            value: str < 10 ? '0' + str : str + ''
          })
        } else {
          flag = false
          let newStr = str - 24
          arr.push({
            label: newStr < 10 ? '0' + newStr + '(第二天)' : newStr + '(第二天)',
            value: newStr < 10 ? '0' + newStr + '(第二天)' : newStr + '(第二天)'
          })
        }
        str++
      }
      this.endHourList = arr
    },

    /**
     * 动态生成endMinuteList
     */
    getEndMinuteList (startHour, startMin, endHour) {
      let startM = startMin * 1
      if (startHour === endHour) {
        this.endMinuteList.forEach((v, i) => {
          if (v.value * 1 <= startM) {
            this.endMinuteList[i].disabled = true
          }
        })
      } else {
        this.endMinuteList.forEach((v, i) => {
          this.endMinuteList[i].disabled = false
        })
      }
    },

    /**
     * 判断日期选择范围是否合法，传入参数为timeRangeData
     */
    judgeLegality (list) {
      // debugger
      let startH = list.startHourValue * 1
      let startM = list.startMinuteValue * 1
      let endH = list.endHourValue
      let endM = list.endMinuteValue * 1
      let days = list.checkedDays
      if (!days.length) {
        this.$message({
          type: 'warning',
          message: '请选择重复日期',
          duration: 1000
        })
        return false
      }
      if (endH.indexOf('第二天') < 0) {
        let num = endH * 1
        if (num < startH || (num === startH && endM <= startM)) {
          this.$message({
            type: 'warning',
            message: '结束时间必须大于开始时间！',
            duration: 2000
          })
          return false
        } else {
          return true
        }
      } else if ((endH.split('(')[0] * 1 === startH && endM > startM) || endH.split('(')[0] * 1 > startH) {
        this.$message({
          type: 'warning',
          message: '活动检测提醒时间跨度不能超过24小时',
          duration: 2000
        })
        return false
      } else {
        return true
      }
    },

    /**
     * 选择的重复日进行排序,父组件可以通过$refs调用该方法实现星期按顺序排序显示
     */
    sortCheckedDays (checked) {
      let arr = [...checked].sort()
      return arr.map(v => {
        return this.getDaysByValue(v)
      })
    },

    /**
     * value和星期对照关系
     */
    getDaysByValue (value) {
      switch (value) {
        case 1:
          return this.$t('deviceManage.Monday')
        case 2:
          return this.$t('deviceManage.Tuesday')
        case 3:
          return this.$t('deviceManage.Wednesday')
        case 4:
          return this.$t('deviceManage.Thursday')
        case 5:
          return this.$t('deviceManage.Friday')
        case 6:
          return this.$t('deviceManage.Saturday')
        case 7:
          return this.$t('deviceManage.Sunday')
      }
    },

    /**
     * 将timeRangeValue转换成'00:00'格式的字符串
     */
    getRangeStr (data = {startHourValue: '00', startMinuteValue: '00', endHourValue: '00', endMinuteValue: '01'}) {
      console.log(123)
      let {startHourValue, startMinuteValue, endHourValue, endMinuteValue} = data
      let isNextDay = (endHourValue.match(/\((\S*)\)/) || '').length !== 0
      let endH = isNextDay ? endHourValue.match(/(\S*)\(/)[1] : endHourValue
      return `${startHourValue} : ${startMinuteValue} ~ ${endH} : ${endMinuteValue} ${isNextDay ? '(第二天)' : ''}`
    },

    /**
     * 点击取消按钮
     */
    btnCancel () {
      this.timeRangeData = {...this.initTimeRangeData}
      this.emitToParent(this.timeRangeData)
    },

    /**
     * 点击确认按钮
     */
    btnOK () {
      let val = this.timeRangeData
      if (!this.judgeLegality(val)) return
      this.emitToParent(val)
    },

    emitToParent (data) {
      let val = {...data}
      let resultStr = this.getRangeStr(val)
      this.$emit('getTimeRange', data, resultStr)
      // 关闭弹窗
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>
.cubecloud_timeRangePicker {
    display: inline-block;
}
.config-item {
    margin-top: 15px;
}
.config-item-title {
    display: inline-block;
    width: 100px;
    margin-right: 20px;
    vertical-align: middle;
}
.config-item-content {
    display: inline-block;
}
</style>
<style>
.cubecloud_timeRangePicker .el-input {
    width: auto!important;
    max-width: 120px;
}
.cubecloud_timeRangePicker .el-select-dropdown {
    left: 200px!important;
}
.cubecloud_timeRangePicker .popper__arrow {
    left: 48px!important;
}
.setTimeRange .el-dialog__body {
    padding-top: 0;
}
</style>
