<template>
    <div id="device-domain-cfg" v-loading="loading" element-loading-text="拼命加载中...">
        <!-- 头部 start-->
        <div class="header">
            <h2 class="header-title fl">设备域名管理</h2>
            <div class="fr">
                <span class="searchResult" v-if="seachResult.length !== 0">
                    共查询出{{seachResult.length}}条信息，
                    <span class="link" @click="backToAll">返回全部</span>
                </span>
                <el-input size="small" class="searchInput" placeholder="按设备域名搜索" v-model="searchNameInput"></el-input><!--
             --><el-button size="small" icon="el-icon-search" class="searchBtn" @click="searchDev"></el-button>
                <el-button size="small" class="addDevBtn" @click="handleClickAddDev">添加设备</el-button>
                <el-button size="small" class="exportBtn">导出</el-button>
            </div>
        </div>
        <!-- 头部 end-->
        <!-- 列表 start-->
        <div class="main">
            <el-table
                ref="deviceListTable"
                :data="devDomainData"
                stripe
                height="100%"
                style="width: 100%"
                >
                    <el-table-column
                        prop="name"
                        label="设备域名"
                        header-align="center"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="serial"
                        label="设备序列号"
                        header-align="center"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="ip"
                        label="IP/端口"
                        header-align="center"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="devState"
                        label="设备状态"
                        header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.devState ? 'danger' : 'success'">
                                {{scope.row.devState ? '不在线' : '在线'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="supportCloud"
                        label="立方云状态"
                        header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.supportCloud ? 'success' : 'danger'">
                                {{scope.row.supportCloud ? '支持' : '不支持'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="设备操作"
                        header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <span class="el-icon-edit edit" title="编辑" @click="editDev(scope.row)"></span>
                            <span class="el-icon-delete edit" title="删除" @click="deleteDev(scope.row.id)"></span>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
        <!-- 列表 end-->
        <!-- 添加/编辑设备弹窗 -->
        <addOrEditDia
            :devData="devData"
            :visible.sync="isShowDia"
            :title="diaTitle"
            @getData="getData">
        </addOrEditDia>
    </div>
</template>
<script>
import addOrEditDia from './addOrEditDev.vue'
export default {
  name: 'DeviceDomainCfg',
  data () {
    return {
      loading: false,
      devDomainData: null,
      isShowDia: false,
      devData: {
        name: '',
        serial: '',
        ip: '0'
      },
      diaTitle: '',
      currentId: '', // 当前编辑的设备id
      searchNameInput: '', // 用户搜索时输入的域名
      seachResult: []
    }
  },
  components: {
    addOrEditDia
  },
  created () {
    this.getDevDomainData()
  },
  watch: {
    isShowDia (val) {
      if (!val) {
        this.devData = {
          name: '',
          serial: '',
          ip: '0'
        }
      }
    }
  },
  methods: {
    /**
     * 获取已添加设备
     */
    getDevDomainData () {
      this.loading = true
      let url = 'http://127.0.0.1:3000/devDomainData'
      this.$http.get(url).then(res => {
        setTimeout(() => {
          this.loading = false
          this.devDomainData = res.data
        }, 1000)
      })
    },

    /**
     * 点击添加设备按钮触发
     */
    handleClickAddDev () {
      this.isShowDia = true
      this.diaTitle = '添加设备'
    },

    /**
     * 点击编辑设备按钮触发
     */
    editDev (row) {
      this.diaTitle = '修改设备信息'
      this.currentId = row.id
      let currentDev = {...row}
      for (let k in this.devData) {
        this.devData[k] = currentDev[k]
      }
      this.isShowDia = true
    },

    /**
     * 从 添加 或 修改 设备弹窗子组件获取 添加 或 更改 的设备信息
     */
    getData (val) {
      let param = val
      if (this.diaTitle === '添加设备') {
        let url = 'http://127.0.0.1:3000/devDomainData'
        this.$http.post(url, param).then(res => {
          this.getDevDomainData()
        })
      } else {
        let url = 'http://127.0.0.1:3000/devDomainData/' + this.currentId
        this.$http.patch(url, param).then(res => {
          this.getDevDomainData()
        })
      }
    },

    /**
     * 删除设备
     */
    deleteDev (id) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = 'http://127.0.0.1:3000/devDomainData/' + id
        this.$http.delete(url).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getDevDomainData()
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '取消删除！'
        })
      })
    },

    /**
     * 按域名查询设备，点击搜索按钮时触发
     */
    searchDev () {
      this.seachResult = []
      let name = this.searchNameInput
      this.devDomainData.forEach(v => {
        if (v.name === name) this.seachResult.push(v)
      })
      if (this.seachResult.length) {
        this.devDomainData = [...this.seachResult]
      } else {
        alert('aaa')
      }
    },

    /**
     * 返回全部
     */
    backToAll () {
      this.searchNameInput = ''
      this.seachResult = []
      this.getDevDomainData()
    }
  }
}
</script>
<style scoped>
#device-domain-cfg {
    height: 100%;
}
.header {
    height: 60px;
    line-height: 60px;
    padding-left: 15px;
    position: relative;
    border-bottom: 1px solid #ebeef5;
}
.main {
    border-right: 1px solid #ebeef5;
    position: relative;
    height: calc(100% - 60px);
}
.exportBtn,
.addDevBtn {
    margin-top: 15px;
}
.searchInput {
    width: 180px;
    display: inline-block;
}
.searchResult {
    display: inline-block;
    margin-right: 10px;
}
.edit {
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    padding: 8px;
}
.edit:hover {
    color: #409eff;
}
</style>
<style>
.searchInput .el-input__inner {
    border-radius: 4px 0 0 4px;
}
.searchBtn.el-button--mini, .searchBtn.el-button--small {
    border-radius: 0 3px 3px 0;
    border-left: none;
}
</style>
