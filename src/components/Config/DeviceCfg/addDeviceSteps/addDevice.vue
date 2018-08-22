<template>
    <!-- 设置向导 步骤3 添加设备 -->
    <div id="addDev">
        <h2 class="header-title">
            <span class="el-icon-info"></span>
            <span>设备与电脑在同一路由器下时，任选一种方式 。远程网络下，请使用“序列号查询添加”方式</span>
        </h2>
        <!-- 添加设备 start -->
        <div class="devSearch-wrap">
            <el-tabs type="border-card">
                <!-- 局域网扫描添加 start -->
                <el-tab-pane label="局域网扫描添加">
                    <el-button size="mini" round @click="getDevList"
                        :disabled="loading"
                        :icon="loading ? 'el-icon-loading' : 'el-icon-refresh'">
                        刷新
                    </el-button>
                    <ul class="dev-wrap" v-loading="loading" element-loading-text="正在检测局域网内设备，请稍候...">
                        <li :class="{'dev-item': true, 'currentActive': item.id === activeId}"
                            v-for="item in devList"
                            :key="item.id"
                            @click="handleClickItem(item.errorCode, item.serial, item.id)">
                            <img :src="item.image" class="dev-img">
                            <p class="item-name">{{item.name}}</p>
                            <div class="modal">
                                <div class="modal-circle"></div>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <!-- 局域网扫描添加 end -->
                <!-- 序列号查询添加 start -->
                <el-tab-pane label="序列号查询添加">
                    <div class="serialSearch" v-loading="loading2" element-loading-text="正在查询设备，请稍候...">
                        <label for="devCode">请输入序列号：</label>
                        <span class="el-icon-question"></span>
                        <el-input id="serialCode"
                                  @keyup.enter.native="handleSearchDev"
                                  v-model="serialCode"
                                  placeholder="请输入9位序列号"
                                  ref="serialCodeInput" type="input" size="small"></el-input>
                        <el-button size="small" icon="el-icon-search" @click="handleSearchDev">查询</el-button>
                        <div class="dev-item devSearch-block"
                             v-if="isShowSearchResult"
                             @click="handleClickItem(searchDev.errorCode, searchDev.serial, searchDev.id)">
                             <img :src="searchDev.image" class="dev-img">
                             <p class="item-name">{{searchDev.name}}</p>
                             <div class="modal">
                                 <div class="modal-circle"></div>
                             </div>
                        </div>
                    </div>
                </el-tab-pane>
                <!-- 序列号查询添加 end -->
                <el-dialog
                    class="verifyCodeDia"
                    title="设备验证码"
                    :visible.sync="isShowVerifyCodeDia"
                    width="400px">
                    <p class="tc pb5">您正在添加序列号为 <span class="mainColor">{{serialNumber}}</span> 的设备 <br>请输入设备验证码，验证码位于机身标签上</p>
                    <div class="tc mt10">
                        <img src="/static/imgs/bar_code.png" alt=""><br>
                        <span>验证码示意图</span>
                    </div>
                    <p class="tc mt10"></p>
                    <div class="codeInput-wrap">
                        <label for="devCode">设备验证码：</label>
                        <el-input id="devCode" v-model="devCode" ref="devCodeInput" type="input" width="200px"></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="isShowVerifyCodeDia = false">取消</el-button>
                        <el-button @click="isShowVerifyCodeDia = false">确定</el-button>
                    </span>
                </el-dialog>
            </el-tabs>
        </div>
        <!-- 添加设备 end -->
        <!-- 已添加设备 start -->
        <div class="addedDev" v-loading="loading3" element-loading-text="正在查询设备，请稍候...">
            <h3>已添加<strong class="red"> {{addedDev.length}} </strong>台设备</h3>
            <ul class="dev-wrap">
                <li class="dev-item addDevItem"
                    v-for="item in addedDev"
                    :key="item.id">
                    <img :src="item.image" class="dev-img">
                    <p class="item-name">{{item.name}}</p>
                </li>
            </ul>
        </div>
        <!-- 已添加设备 end -->
    </div>
</template>
<script>
export default {
  name: 'addDev',
  components: {
  },
  props: ['isNew'],
  data () {
    return {
      loading: false,
      loading2: false,
      loading3: false,
      devList: [],
      modalIndex: '',
      isShowVerifyCodeDia: false,
      serialNumber: '',
      activeId: '',
      devCode: '', // 输入的设备验证码
      serialCode: '', // 输入的序列号
      isShowSearchResult: false,
      searchDev: {
        image: '',
        name: ''
      }, // 通过序列号查询到的设备
      addedDev: [] // 已添加设备
    }
  },
  created () {
    this.getDevList()
    this.getAddedDev()
  },
  mounted () {
  },
  watch: {
    isShowVerifyCodeDia (val) {
      if (val) this.$nextTick(() => this.$refs.devCodeInput.focus())
      if (!val) this.devCode = ''
    }
  },
  methods: {
    /**
     * 提示框
     */
    showConfirmDia (txt) {
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },

    /**
     * 获取局域网设备
     */
    getDevList () {
      this.loading = true
      let url = 'http://127.0.0.1:3000/searchDevList'
      this.$http.get(url).then(res => {
        setTimeout(() => {
          this.loading = false
          this.devList = res.data
          console.log(this.devList)
        }, 1000)
      })
    },

    /**
     * 通过序列号查询设备
     */
    getDevBySerial (serial) {
      this.loading2 = true
      let url = 'http://127.0.0.1:3000/searchDevList?serial=' + serial
      this.$http.get(url).then(res => {
        console.log(res)
        setTimeout(() => {
          if (!res.data.length) {
            this.loading2 = false
            this.$message({
              type: 'warning',
              message: '错误！'
            })
            return
          }
          this.loading2 = false
          this.searchDev = res.data[0]
          this.isShowSearchResult = true
        }, 1000)
      }).catch(() => {
        this.loading2 = false
        this.$message({
          type: 'warning',
          message: '123'
        })
      })
    },

    /**
     * 点击查询
     */
    handleSearchDev () {
      let num = this.serialCode
      if (!num) {
        this.$message({
          type: 'warning',
          message: '请先输入序列号！'
        })
      } else {
        this.getDevBySerial(num)
      }
    },

    /**
     * 点击添加时触发
     */
    handleClickItem (code, serial, id) {
      this.activeId = id
      this.serialNumber = serial
      switch (code) {
        case '0':
          this.isShowVerifyCodeDia = true
          break
        case '5001':
          this.showConfirmDia('操作失败，设备已被其他用户添加')
          break
        case '2007':
          this.showConfirmDia('操作失败，设备已被其他用户添加')
          break
        case '2003':
          this.showConfirmDia('设备不在线，没有查询到结果')
          break
        case '2000':
          this.showConfirmDia('设备未连接到萤石云，请检查设备所在网络是否能正常上网')
          break
      }
    },

    /**
     * 获取已添加设备
     */
    getAddedDev () {
      this.loading3 = true
      let url = 'http://127.0.0.1:3000/addedDevList'
      this.$http.get(url).then(res => {
        setTimeout(() => {
          this.loading3 = false
          this.addedDev = res.data
          console.log(this.devList)
        }, 1000)
      })
    }
  }
}
</script>
<style scoped>
.header-title {
    font-weight: 400;
    font-size: 14px;
    padding: 10px;
    color: #999
}
.newer {
    margin-left: 10px;
}
.dev-wrap {
    width: 100%;
    min-height: 200px;
    overflow: hidden;
}
.dev-item {
    display: inline-block;
    width: 23%;
    padding-bottom: 17.5%;
    position: relative;
    margin: 5px 10px 20px 0;
    cursor: pointer;
    /* transition: all .3s ease; */
    z-index: 1;
}
.serialSearch {
    min-height: 200px;
    overflow: hidden;
}
.dev-item.devSearch-block {
    display: block;
    margin-top: 20px;
}
.currentActive {
    border: 2px solid #65d7cd;
    padding-bottom: 17.1%;
}
.dev-img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.item-name {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    bottom: -10%;
}
.modal {
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    transition: all .3s ease;
}
.modal-circle,
.modal::before,
.modal::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(360deg);
    transition: all .3s ease;
}
.modal-circle {
    width: 30%;
    height: 40%;
    border: 5px solid #65d7cd;
    border-radius: 50%;
}
.modal::before{
    width: 19.5%;
    height: 5px;
    background-color: #65d7cd;
}
.modal::after {
    width: 5px;
    height: 25%;
    background-color: #65d7cd;
}
.dev-item:hover .modal{
    opacity: 0.8;
}
.dev-item:hover .modal-circle,
.dev-item:hover .modal::before,
.dev-item:hover .modal::after {
    top: 50%;
    transform: translate(-50%, -50%) rotateZ(0);
}
.codeInput-wrap {
    margin-top: 20px;
}
.red {
    color: red;
}
.addedDev {
    padding: 15px;
    margin: 20px 0;
    border: 1px solid #dcdfe6;
    min-height: 200px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}

.addDevItem {
    cursor: default;
}

.el-icon-question {
    font-size: 14px;
    cursor: pointer;
}
.el-icon-question:hover {
    color: #409eff
}
</style>
<style>
.verifyCodeDia .el-input {
    width: 60%;
}
.serialSearch .el-input {
    width: 200px;
}
</style>
