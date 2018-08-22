<template>
    <div id="deviceCfg" v-loading="loading" element-loading-text="拼命加载中...">
        <div class="deviceCfg-wrap">
            <!-- 头部 start-->
            <div class="header">
                <h2 class="header-title fl">我的设备</h2>
                <router-link to="/Config/GuideAddDevice">
                    <el-button size="small" icon="el-icon-plus" class="guideAddDev fr">向导添加设备</el-button>
                </router-link>
            </div>
            <!-- 头部 end-->
            <!-- 留言列表 start-->
            <div class="main">
                <el-table
                    ref="deviceListTable"
                    :data="deviceListData"
                    stripe
                    height="100%"
                    style="width: 100%"
                    >
                      <el-table-column
                          prop="devName"
                          label="设备名称"
                          :filters="devNameList"
                          :filter-method="filterDevName"
                          header-align="center"
                          align="center">
                      </el-table-column>
                      <el-table-column
                          prop="state"
                          label="状态"
                          :filters="[{ text: '正常', value: 0 }, { text: '不在线', value: 1 }]"
                          :filter-method="filterState"
                          header-align="center"
                          align="center">
                          <template slot-scope="scope">
                              <el-tag
                                  :type="scope.row.state ? 'danger' : 'success'"
                                  disable-transitions>{{scope.row.state ? '不在线' : '正常'}}
                              </el-tag>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="remindSwitch"
                          label="活动检测提醒"
                          :filters="[{ text: '开', value: true }, { text: '关', value: false }]"
                          :filter-method="filterRemindSwitch"
                          header-align="center"
                          align="center">
                          <template slot-scope="scope">
                              <el-switch
                                v-model="scope.row.remindSwitch">
                              </el-switch>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="id"
                          label="设备详情"
                          header-align="center"
                          align="center">
                          <template slot-scope="scope">
                              <span @click="showDevInfo(scope.row.id)" class="videolink pointer">设备详情</span>
                          </template>
                      </el-table-column>
                </el-table>
            </div>
            <!-- 留言列表 end-->
            <!-- 分页 start-->
            <!-- <div class="pagination"></div> -->
            <!-- 分页 end-->
        </div>
    </div>
</template>
<script>
export default {
  name: 'DeviceCfg',
  components: {
  },
  data () {
    return {
      loading: false,
      /* 列表数据 */
      deviceListData: [],
      devNameList: [] // 设备名称列表
    }
  },
  created () {
    this.getDevList()
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    /**
     * 获取设备列表
     */
    getDevList () {
      this.loading = true
      // 开启node服务器 本地路径 E:\study\practice\FullStack\jstraining-master\demos\rest-api-demo
      this.$http.get('http://127.0.0.1:3000/deviceList').then(res => {
        setTimeout(() => {
          this.loading = false
          let list = res.data
          this.deviceListData = list
          this.devNameList = list.map(v => {
            return {
              text: v.devName,
              value: v.devName
            }
          })
        }, 1000)
      })
    },

    /**
     * 设备名称筛选
     */
    filterDevName (val, row) {
      return row.devName === val
    },

    /**
     * 状态筛选
     */
    filterState (val, row) {
      return row.state === val
    },

    /**
     * 开关状态筛选
     */
    filterRemindSwitch (val, row) {
      return row.remindSwitch === val
    },

    /**
     * 查看设备详情
     */
    showDevInfo (id) {
      // 使用this.$router.push跳转路由页面，params 或者 query 向目标路由传递参数，
      // 在目标路由页面通过this.$route.params来获取传参对象
      // ***params传参 ，路径不能使用path 只能使用name,不然获取不到传的数据
      // 参考https://blog.csdn.net/qq_15646957/article/details/78070862
      this.$router.push({
        name: 'DeviceInfo',
        params: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
#deviceCfg {
    height: 100%;
}
.deviceCfg-wrap {
    height: 100%;
}
.header {
    height: 60px;
    line-height: 60px;
    padding-left: 15px;
    position: relative;
    border-bottom: 1px solid #ebeef5;
}
.fastAddDev, .guideAddDev {
    margin-top: 15px;
}
.guideAddDev {
    margin-left: 10px;
}
.main {
    border-right: 1px solid #ebeef5;
    position: relative;
    height: calc(100% - 60px);
}
.videolink {
    color: #409eff;
}
.videolink:hover {
    text-decoration: underline;
}
</style>
