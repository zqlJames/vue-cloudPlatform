<template>
    <div id="livevideos" v-loading="loading" :element-loading-text="$t('common.loading')">
        <div class="bottons">
            <el-button @click="addGroupDialogVisible = true" icon="el-icon-plus"> {{$t('liveVideos.addGroup')}}</el-button>
            <el-button @click="devSearchDialogVisible = true" icon="el-icon-search">{{$t('liveVideos.query')}}</el-button>
            <el-button @click="addGroupDialogVisible = true" icon="el-icon-setting" v-if="isGroupEditable">{{$t('common.config')}}</el-button>
        </div>
        <!-- 分组Tab组件 -->
        <el-tabs @tab-click="changeTab" v-model="activeTabName" @tab-remove="removeTab" type="card" class="livevideos-content">
            <el-tab-pane
                v-for="item in TabList"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :closable="item.name !== '1'">
                <div class="tab-content-main">
                    <!-- <el-scrollbar style="height: 100%;width: 100%"> -->
                    <!-- 视频设备列表展示 -->
                    <ul class="tab-content-main-warp">
                        <li class="tab-content-main-item fl"
                            v-for="(value, key) in currentVideoList"
                            :key="value.id">
                            <router-link to class="tab-content-main-item-a">
                                <div class="tab-content-main-item-bg"
                                    :style="{backgroundImage:'url(' + value.videoPic + ')'}"
                                    @mouseover="showPlayBtn(key)"
                                    @mouseout="playBtnIndex = -1">
                                    <div class="playbtn" v-show="playBtnIndex === key">
                                        <div class="playbtn-circle">
                                            <span class="playbtn-triangle"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-content-main-item-title mt5 pl5 pr5">
                                    <div class="item-title-name fl">{{value.title}}</div>
                                    <div class="item-title-share fr" @click="shareDialogVisible = true">
                                        <span class="el-icon-share"></span>
                                        <span>{{$t('common.share')}}</span>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                    <!-- </el-scrollbar> -->
                </div>
                <!-- 分页组件 -->
                <div class="tab-content-pagination">
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[4, 8, 12, 16]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="videoImgList.length">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- ********************************************* 弹窗 ********************************************** -->
        <!-- 添加分组弹窗 start -->
        <el-dialog
            :title="$t('liveVideos.addGroup')"
            :visible.sync="addGroupDialogVisible"
            width="30%">
            <div class="addgroup-main">
                <div class="addgroup-main-item addgroup-main-name">
                    <div class="addgroup-main-left fl">{{$t('liveVideos.groupName')}}：</div>
                    <div class="addgroup-main-right fl"><el-input v-model="newGroupData.name"></el-input> </div>
                </div>
                <div class="addgroup-main-item addgroup-main-ontop">
                    <div class="addgroup-main-left fl">{{$t('liveVideos.setTop')}}：</div>
                    <div class="addgroup-main-right fl">
                        <el-switch v-model="newGroupData.isOnTop"></el-switch>
                    </div>
                </div>
                <div class="addgroup-main-item addgroup-main-import">
                    <div class="addgroup-main-left fl">{{$t('liveVideos.importCameras')}}：</div>
                    <div class="addgroup-main-right fl">
                        <div class="addgroup-main-import-head">
                            <el-checkbox :label="$t('liveVideos.allCameras')" v-model="isSelectAll" name="type" @change="isSelectAllCamera"></el-checkbox>
                            <span class="el-icon-search fr" @click="showFilter = !showFilter"></span>
                        </div>
                        <div class="addgroup-main-import-content">
                            <div v-if="showFilter" class="addgroup-keywords-serch">
                                <el-input
                                    :placeholder="$t('liveVideos.inputKeywordsForFiltering')"
                                    v-model="filterText">
                                </el-input>
                            </div>
                            <div v-if="showFilter" class="addgroup-keywords-serch-placeholder"></div>
                            <!-- 摄像机树形数据 -->
                            <!-- <el-scrollbar style="height: 100%;width: 100%"> -->
                            <el-tree
                              class="filter-tree"
                              :data="newGroupData.cameraTreeData"
                              show-checkbox
                              default-expand-all
                              node-key="id"
                              @check-change="changeTreeNodeSelect"
                              ref="cameraTree"
                              :filter-node-method="filterCamTreeNode"
                              highlight-current>
                            </el-tree>
                            <!-- </el-scrollbar> -->
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addGroupDialogVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" @click="addGroup">{{$t('common.confirm')}}</el-button>
            </div>
        </el-dialog>
        <!-- 添加分组弹窗 end -->
        <!-- 设备查询弹窗 -->
        <el-dialog
        :title="$t('liveVideos.deiveQuery')"
        :visible.sync="devSearchDialogVisible"
        width="30%">
            <div class="devSearch-main">
                <el-input
                    :placeholder="$t('liveVideos.queryByKeywordsOrName')"
                    v-model="devSearchKeyWord">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="devSearchDialogVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" @click="doDevSearch">{{$t('common.confirm')}}</el-button>
            </div>
        </el-dialog>
        <!-- 分享视频弹窗 -->
        <el-dialog
        :title="$t('liveVideos.chooseShareType')"
        :visible.sync="shareDialogVisible"
        width="30%">
            <div class="share-dialog-main">
                <div class="share-dialog-main-item">
                    <div class="iconfont icon-sharequare"></div>
                    <p class="share-dialog-main-item-text">{{$t('liveVideos.shareToSquare')}}</p>
                </div>
                <div class="share-dialog-main-item">
                    <div class="iconfont icon-shareToFriends"></div>
                    <p class="share-dialog-main-item-text">{{$t('liveVideos.shareWithFriends')}}</p>
                </div>
                <div class="share-dialog-main-item">
                    <div class="iconfont icon-qrcode"></div>
                    <p class="share-dialog-main-item-text">{{$t('liveVideos.shareByQRCode')}}</p>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="shareDialogVisible = false">{{$t('common.close')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import '../../../iconfont/iconfont.css'
export default {
  name: 'LiveVideos',
  data () {
    return {
      activeTabName: '1',
      TabList: [{
        title: '我的摄像机',
        name: '1',
        content: '我的',
        editable: false
      }],
      currentPage: 1,
      pageSize: 16,
      currentVideoList: [],
      videoImgList: [],
      playBtnIndex: -1,
      loading: false,
      addGroupDialogVisible: false, // 添加分组弹窗
      devSearchDialogVisible: false, // 设备查询弹窗
      shareDialogVisible: false, // 视频分享弹窗
      devSearchKeyWord: '',
      newGroupData: {
        cameraTreeData: [],
        name: '',
        isOnTop: false
      },
      isGroupEditable: false, // 分组是否可编辑
      showFilter: false,
      filterText: '',
      isSelectAll: false
    }
  },
  created () {
    this.getCurrentLiveVideos('/douban/v2/movie/in_theaters')
    this.getCameraList()
  },
  watch: {
    filterText (val) {
      this.$refs.cameraTree.filter(val)
    },
    activeTabName (val) {
      console.log(val, 'val')
      if (val === '1') {
        this.isGroupEditable = false
        this.getCurrentLiveVideos('/douban/v2/movie/in_theaters')
      } else {
        this.isGroupEditable = true
        // this.getCurrentLiveVideos('/douban/v2/movie/in_theaters')
      }
    //   this.getCurrentLiveVideos('/douban/v2/movie/in_theaters')
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      let startIndex = (this.currentPage - 1) * val
      let endIndex = this.currentPage * val
      this.currentVideoList = this.videoImgList.slice(startIndex, endIndex)
    },

    handleCurrentChange (val) {
      this.currentPage = val
      let startIndex = this.pageSize * (val - 1)
      let endIndex = this.pageSize * val
      this.currentVideoList = this.videoImgList.slice(startIndex, endIndex)
    },

    /**
     * 获取当前分组的摄像机列表
     */
    getCurrentLiveVideos (url) {
      const that = this
      this.loading = true
      this.$http.get(url).then(res => {
        that.loading = false
        let result = res.data.subjects
        that.videoImgList = result.map((v, i) => {
          return {
            videoPic: v.images.small,
            title: v.title,
            shareState: 1,
            id: i + 1
          }
        })
        that.currentVideoList = that.videoImgList.slice(0, this.pageSize)
      })
    },

    showPlayBtn (index) {
      this.playBtnIndex = index
    },

    /**
     * 从后台获取所有摄像机数据,渲染弹窗中的可选设备列表
     */
    getCameraList () {
      this.loading = true
      this.$http.get('/douban/v2/movie/in_theaters').then(res => {
        this.loading = false
        let result = res.data.subjects
        this.newGroupData.cameraTreeData = result.map((v, i) => {
          return {
            videoPic: v.images.small,
            // title: v.title,
            label: v.title,
            // shareState: '分享',
            id: i + 1
          }
        })
      })
    },

    /**
     * 添加新分组
     */
    addGroup () {
      if (!this.newGroupData.name.trim()) {
        this.$message({
          message: '分组名不能为空！',
          type: 'warning'
        })
        return
      }
      let selectList = this.$refs.cameraTree.getCheckedNodes(true)
      if (!selectList.length) {
        this.$message({
          message: '请选择设备！',
          type: 'warning'
        })
        return
      }
      this.TabList.push({
        title: this.newGroupData.name,
        name: (this.TabList.length + 1) + '',
        content: '我的',
        editable: true
      })
      this.activeTabName = (this.TabList.length) + ''
      this.addGroupDialogVisible = false
      this.videoImgList = selectList.map((v, i) => {
        return {
          videoPic: v.videoPic,
          title: v.label,
          shareState: 1,
          id: v.id
        }
      })
      this.currentVideoList = this.videoImgList.slice(0, this.pageSize)
      console.log(this.currentVideoList)
    },

    /**
     * 切换Tab
     */
    changeTab (val) {
      console.log(val)
      console.log(this.activeTabName)
      if (val.name !== '1') {
        // this.getCurrentLiveVideos('/douban/v2/movie/top250')
        this.isGroupEditable = true
      } else {
        this.getCurrentLiveVideos('/douban/v2/movie/in_theaters')
        this.isGroupEditable = false
      }
    },

    /**
     * 是否全选所有摄像机
     */
    isSelectAllCamera (val) {
      if (val) {
        this.$refs.cameraTree.setCheckedNodes(this.newGroupData.cameraTreeData)
      } else {
        this.$refs.cameraTree.setCheckedNodes([])
      }
    },

    /**
     * 树形节点选中状态变化时
     */
    changeTreeNodeSelect (node, isSelected, isLeafSelceted) {
      if (!isSelected) {
        this.isSelectAll = false
      } else {
        // console.log(this.$refs.cameraTree.getCheckedNodes(true))
      }
    },

    /**
     * 过滤视频设备树节点
     */
    filterCamTreeNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    /**
     * 删除分组
     */
    removeTab (val) {
      console.log(val)
      this.$confirm('确定删除该分组?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.TabList.forEach((v, i) => {
          if (v.name === val) {
            this.TabList.splice(i, 1)
          }
        })
        if (this.activeTabName === val) {
          this.activeTabName = this.TabList[0].name
          this.getCurrentLiveVideos('/douban/v2/movie/in_theaters')
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    /**
     * 查询设备
     */
    doDevSearch () {
      this.devSearchDialogVisible = false
    },

    /**
     * 视频分享
     */
    shareVideo () {

    }
  }
}
</script>
<style scoped>
img {
    width: 200px;
}
#livevideos {
    position: relative;
}
.bottons {
    position: absolute;
    right: 0;
    z-index: 99;
}
#livevideos, .livevideos-content {
    height: 100%;
}
.tab-content-pagination {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%)
}
.tab-content-main-warp {
    height: 100%;
    overflow: auto;
}
.tab-content-main-item {
    width: 200px;
    height: 200px;
    margin: 0 0 15px 25px;
    /* border: 1px solid #000; */
}
.tab-content-main-item-a {
    display: block;
    height: 150px;
}
.tab-content-main-item-bg {
    height: 150px;
    position: relative;
    transform: scale(1) translateZ(0);
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    transition: all 0.75s cubic-bezier(0, 1, 0.75, 1);
}
.tab-content-main-item-bg:hover {
    background-size: 130%;
    background-position: center center;
    transform: scale(1) translateZ(0);
}
.playbtn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background-color: rgba(0, 0, 0, .6);
}
.playbtn-circle {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 2px solid #fff;
    border-radius: 50%;
    opacity: 0.8;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.playbtn-triangle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    height: 0px;
    width: 0px;
    border-top: 15px solid transparent;
    border-left: 22px solid #fff;
    border-bottom: 15px solid transparent;
}

/* 添加分组弹窗样式 */
.addgroup-main-item {
    overflow: hidden;
    margin-bottom: 10px;
}
.addgroup-main-left {
    width: 25%;
    vertical-align: middle
}
.addgroup-main-right {
    width: 70%;
}
.addgroup-main-name .addgroup-main-left {
    line-height: 35px;
}
.addgroup-main-import .addgroup-main-right {
    height: 200px;
    border: 1px solid #dcdfe6;
    position: relative;
}
.addgroup-main-import-head {
    border-bottom: 1px solid #dcdfe6;
    padding: 5px;
}
.addgroup-main-import-head .el-icon-search {
    margin-top: 2px;
    font-weight: 700;
}
.addgroup-main-import-head .el-icon-search:hover {
    color: #409eff;
    cursor: pointer;
}
.addgroup-main-import-content {
    height: 167px;
    overflow: auto;
}
.addgroup-keywords-serch {
    width: 96%;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 99;
}
.addgroup-keywords-serch-placeholder {
    height: 40px;
}

/* 分享弹窗样式 */
.share-dialog-main {
    overflow: hidden;
}
.share-dialog-main-item {
    display: inline-block;
    width: 26%;
    height: 100px;
    padding-top: 20px;
    margin: 10px;
    cursor: pointer;
}
.share-dialog-main-item:hover {
   box-shadow: 1px 1px 15px 1px rgba(64, 158, 255, .5);
}
.share-dialog-main-item .iconfont {
    font-size: 40px;
    color: #409eff;
    text-align: center
}
.share-dialog-main-item-text {
    text-align: center;
}
</style>
<style>
#livevideos .el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: none;
    padding-bottom: 10px;
}
#livevideos .el-tabs--card>.el-tabs__header .el-tabs__item {
    border: 1px solid #e4e7ed;
    margin-right: 10px;
}
#livevideos .el-tabs__item.is-active {
    background-color: #409eff;
    color: #fff;
    font-weight: 700;
    font-size: 22px;
    vertical-align: bottom;
}
#livevideos .el-tabs__content {
    height: calc(100% - 65px);
    padding-bottom: 50px;
}
#livevideos .el-tabs__content .el-tab-pane,
#livevideos .el-tabs__content .tab-content-main {
    height: 100%;
}
#livevideos .el-tabs__content .el-tab-pane {
    position: relative;
}
#livevideos .item-title-share .el-icon-share {
    color: #409eff;
}
/* #livevideos .el-scrollbar__wrap {
    overflow-x: hidden;
} */
#livevideos .el-dialog {
    min-width: 400px;
}
#livevideos .addgroup-main-import-content .el-tree {
    padding-bottom: 15px;
}
#livevideos .el-tabs__nav-wrap {
    width: 60%;
}
#livevideos .el-tabs__nav-wrap .el-icon-arrow-left:hover,
#livevideos .el-tabs__nav-wrap .el-icon-arrow-right:hover {
    color: #409eff;
    font-weight: 700
}
</style>
