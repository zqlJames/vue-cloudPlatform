<template>
    <div id="leaveMsg" v-loading="loading" element-loading-text="拼命加载中...">
        <!-- 头部 start-->
        <div class="header">
            <el-button size="small" @click="markedAsRead" class="markedAsRead">
                <span class="allread el-icon-check" v-show="isAllread"></span>
                <span class="unread" v-show="!isAllread">{{unreadCount}}</span>
                <span>全部标记为已读</span>
            </el-button>
            <el-button size="small" @click="deleteSelect">删除选中</el-button>
        </div>
        <!-- 头部 end-->
        <!-- 留言列表 start-->
        <div class="main">
            <el-table
                ref="leaveMsgTable"
                :data="leaveData"
                stripe
                height="100%"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @cell-mouse-enter="hoverRow"
                >
                  <el-table-column
                      type="selection"
                      width="35">
                  </el-table-column>
                  <el-table-column
                      prop="date"
                      label="日期"
                      :render-header="customDateHeader">
                      <!-- :filter-method="filterDate"> -->
                  </el-table-column>
                  <el-table-column
                      prop="devName"
                      label="设备"
                      :filters="devList"
                      :filter-method="filterDevName">
                  </el-table-column>
                  <el-table-column
                      prop="msgType"
                      label="消息类型"
                      :filters="msgTypeList"
                      :filter-method="filterMsgType">
                  </el-table-column>
                  <el-table-column
                      prop="msgState"
                      label="消息状态"
                      width="100"
                      :filters="[{ text: '未读', value: '未读' }, { text: '已读', value: '已读' }]"
                      :filter-method="filterMsgState">
                      <template slot-scope="scope">
                          <el-tag
                              :type="scope.row.msgState === '未读' ? 'danger' : 'success'"
                              disable-transitions>{{scope.row.msgState}}</el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column
                      prop="videos"
                      label="录像 | 视频 | 分享">
                      <template slot-scope="scope">
                          <router-link to class="videolink">视频对讲</router-link>
                          <span>|</span>
                          <router-link to class="videolink">语音回复</router-link>
                      </template>
                  </el-table-column>
                  <el-table-column
                      label=""
                      width="50"
                      prop="id">
                      <template slot-scope="scope">
                          <span @click="deleteSingleMsg(scope.row.id)" class="el-icon-delete deleteSingleMsg" v-show="showDeleteIcon[scope.row.id]"></span>
                      </template>
                  </el-table-column>
            </el-table>
            <!-- 列表日期选择 -->
            <div class="datetimepicker">
                <el-date-picker
                    v-model="tableDateRange"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    ref="tableDatePicker"
                    :picker-options="datePickerOptions"
                    @change='changeFilterDate'
                    @blur="blurFilterDate">
                </el-date-picker>
            </div>
        </div>
        <!-- 留言列表 end-->
        <!-- 分页 start-->
        <!-- <div class="pagination"></div> -->
        <!-- 分页 end-->
    </div>
</template>
<script>
import tableHeader from './tableHeader.vue'
export default {
  name: 'LeaveMsg',
  components: {
    tableHeader
  },
  data () {
    return {
      loading: false,
      /* 列表数据 */
      leaveData: [],
      leaveDataCopy: [], // 备份所有事件消息
      devList: [], // 设备名称列表
      msgTypeList: [], // 消息类型列表
      isShowDatePicker: false,
      customTableHeader: {
        text: '',
        isHighlight: false,
        isShow: false
      },
      isShowDeleteCheckbox: false,
      showDeleteIcon: {}, // 删除图标显示
      tableDateRange: [], // 列表筛选日期范围
      filterDateObj: {startTime: 0, endTime: 0}, // 日期范围毫秒对象
      checkedGroupData: [], // 选中的数据
      isAllread: false, // 是否所有已读
      unreadCount: 0, // 未读消息数量
      datePickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created () {
    this.getEventMsg()
    this.getDevList()
    this.getMsgTypeList()
  },
  mounted () {
  },
  watch: {
    leaveDataCopy (val) {
      this.leaveData = val
    },
    unreadCount (val) {
      if (val === 0) this.isAllread = true
    },
    tableDateRange (val) {
      if (val && val.length) this.customTableHeader.isHighlight = true
      if (!val || !val.length) this.customTableHeader.isHighlight = false
    },
    isShowDatePicker (val) {
      this.customTableHeader.isShow = val
    }
  },
  methods: {
    /**
     * 获取事件列表  --- 涉及到复杂数组去重，可封装一个通用工具
     */
    getEventMsg () {
      this.loading = true
      let that = this
      // this.$http.get('static/json/leaveMsgData.json').then(res => {
      // 开启node服务器 本地路径 E:\study\practice\FullStack\jstraining-master\demos\rest-api-demo
      this.$http.get('http://127.0.0.1:3000/leaveMsg').then(res => {
        setTimeout(() => {
          this.loading = false
          this.leaveData = res.data
          this.leaveData.forEach(v => {
            this.$set(that.showDeleteIcon, v.id, false) // vm.$set(对象,属性名,属性值)
            // 上一行代码调用vue的set方法让showDeleteIcon来监听中的属性变化，如果写成 this.showDeleteIcon[v.id] = false 则不能实现双向绑定
            if (v.msgState === '未读') this.unreadCount++
          })
          this.leaveDataCopy = this.leaveData
        }, 1000)
      })
    },

    /**
     * 获取设备列表
     */
    getDevList () {
      this.$http.get('static/json/devList.json').then(res => {
        let arr = res.data.devList
        this.devList = arr.map(v => {
          return {
            'text': v,
            'value': v
          }
        })
      })
    },

    /**
     * 获取消息类型列表
     */
    getMsgTypeList () {
      this.$http.get('static/json/leaveMsgType.json').then(res => {
        let arr = res.data.typeList
        this.msgTypeList = arr.map(v => {
          return {
            'text': v,
            'value': v
          }
        })
      })
    },

    /**
     * 自定义日期表头
     * 知识点：vue渲染函数  按住ctrl狂戳链接https://cn.vuejs.org/v2/guide/render-function.html
     */
    customDateHeader (h, {column}) {
      let that = this
      that.customTableHeader.text = column.label
      return h(
        tableHeader,
        {
          props: {
            tableHeadComp: that.customTableHeader
          },
          on: {
            showTableDatePicker: this.showDateRange
          }
        }
      )
    },

    showDateRange (isShow) {
      this.isShowDatePicker = isShow
      if (isShow) {
        this.$refs.tableDatePicker.focus()
      }
    },

    /**
     * 列表日期筛选时选择日期范围
     */
    changeFilterDate (val) {
      this.isShowDatePicker = false
      if (val && val.length) {
        let startTime = val[0].getTime()
        let endTime = val[1].getTime()
        let arr = []
        this.leaveData = this.leaveDataCopy
        this.leaveData.forEach(v => {
          let _time = new Date(v.date).getTime()
          if (_time >= startTime && _time <= endTime) {
            arr.push(v)
          }
        })
        this.leaveData = arr
      } else {
        this.leaveData = this.leaveDataCopy
      }
    },

    /**
     * 列表日期选择控件失去焦点时触发(鼠标点在其他位置)
     * 设置定时器是因为：
     * blur事件优先于表头的click事件执行，会产生逻辑冲突，因此为blur事件设置定时器，让click事件优先触发
     */
    blurFilterDate () {
      setTimeout(() => {
        this.isShowDatePicker = false
      }, 0)
    },

    /**
     * 日期筛选逻辑
     * 尝试用element-ui自带过滤方法，此路暂时不通，需研究element组件源码
     */
    filterDate (val, row) {
      const {start, end} = this.filterDateObj
      let targetDate = new Date(row.date).getTime()
      if (start && end) {
        return targetDate >= start && targetDate <= end
      }
    },

    /**
     * 设备名称筛选
     */
    filterDevName (val, row) {
      return row.devName === val
    },

    /**
     * 消息类型筛选
     */
    filterMsgType (val, row) {
      return row.msgType === val
    },

    /**
     * 消息状态筛选
     */
    filterMsgState (val, row) {
      return row.msgState === val
    },

    /**
     * 标记为已读
     */
    markedAsRead () {
      let that = this
      let count = 0
      this.leaveData.forEach((v, i) => {
        if (v.msgState === '未读') {
          that.leaveData[i].msgState = '已读'
          count++
        }
      })
      if (!count) {
        return
      }
      this.$message({
        type: 'success',
        message: '标记成功!',
        duration: 1000
      })
      this.isAllread = true
    },

    /**
     * 选中列表行事件
     */
    handleSelectionChange (val) {
      console.log(val)
      this.checkedGroupData = val
    },

    /**
     * 删除选中
     */
    deleteSelect () {
      let select = this.checkedGroupData
      if (!select.length) {
        this.$message({
          message: '请先选择要删除的消息！',
          type: 'warning'
        })
      } else {
        this.$confirm('删除后将不能恢复，确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          select.forEach(v => {
            this.leaveDataCopy.forEach((val, j) => {
              if (v.id === val.id) {
                if (v.msgState === '未读') {
                  this.unreadCount--
                }
                this.leaveDataCopy.splice(j, 1)
              }
            })
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
          this.checkedGroupData = []
        })
      }
    },

    /**
     * 删除单条消息
     */
    deleteSingleMsg (id) {
      this.$confirm('删除后将不能恢复，确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.leaveDataCopy.forEach((v, i) => {
          if (v.id === id) {
            if (v.msgState === '未读') {
              this.unreadCount--
            }
            this.leaveDataCopy.splice(i, 1)
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1000
        })
      })
    },

    /**
     * 鼠标移动至某一行时显示该行的删除图标
     */
    hoverRow (row) {
      for (let k in this.showDeleteIcon) {
        if (k === row.id + '') {
          this.showDeleteIcon[k] = true
        } else {
          this.showDeleteIcon[k] = false
        }
      }
    }
  }
}
</script>
<style scoped>
#leaveMsg {
    height: 100%;
}
.header {
    height: 60px;
    line-height: 60px;
    text-align: right;
    border-bottom: 1px solid #ebeef5;
}
.main {
    border-right: 1px solid #ebeef5;
    position: relative;
    height: calc(100% - 60px);
}
#leaveMsg .datetimepicker {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: none;
}
.unread, .allread {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: initial;
}
.unread {
  background-color: #f56c6c;
  color: #fff;
}
.allread {
  background-color: #67c23a;
  color: #fff;
}
.videolink {
  color: #409eff;
}
.videolink:hover {
  text-decoration: underline;
}
.deleteSingleMsg {
  font-size: 18px;
}
.deleteSingleMsg:hover {
  cursor: pointer;
  color: #409eff;
}

/* 事件消息统计弹窗 */
/* .selectDev {
  margin-right: 30px;
} */
.selectGroup {
  text-align: left;
  padding-left: 100px;
}
.selectGroup-item {
  margin-right: 15px;
}
</style>
<style>
#leaveMsg .stats-dialog .el-dialog__title {
  font-weight: 700;
}
#leaveMsg .stats-dialog .el-input__inner {
  padding-right: 0;
}
#leaveMsg .stats-dialog .el-dialog__body {
  padding: 10px 20px;
}
#leaveMsg .el-table .cell,
#leaveMsg .el-table th div {
  overflow: visible!important;
}
#leaveMsg .table-header-date {
  padding-left: 0;
}

</style>
