<template>
    <div id="cloudpic" v-loading="loading" element-loading-text="拼命加载中...">
        <!-- 头部搜索 start -->
        <div class="header">
            <div class="header-select">
                <el-select v-model="currentDev" placeholder="请选择" v-show="!devSearchVisible">
                    <el-option
                        v-for="item in deviceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button @click="devSearchVisible = true" icon="el-icon-search" class="searchbtn">按条件查询</el-button>
                <el-button @click="showDeleteCheckbox" icon="el-icon-delete">批量删除</el-button>
                <el-button @click="devDownloadVisible = true" icon="el-icon-download">批量下载</el-button>
            </div>
            <!-- 按条件搜索 start-->
            <div class="header-tool-box searchByCondition" v-if="devSearchVisible">
                <span class="search-dev-name">
                    <span style="color: #fff">设备名：</span>
                    <el-select v-model="currentSearchDevName" placeholder="请选择" :title="currentSearchDevName">
                        <el-option
                            v-for="item in deviceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span class="search-filetype">
                    <span style="color: #fff">文件类型：</span>
                    <el-select v-model="currentSearchFlieType" placeholder="请选择" :title="currentSearchFlieType">
                        <el-option
                            v-for="item in flieTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </span><br/>
                <span class="search-time-range">
                    <span style="color: #fff">时间段：</span>
                    <el-date-picker
                        v-model="searchDateRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </span>
                <el-button @click="devSearchVisible = false" class="search-box-search" icon="el-icon-search">查询</el-button>
                <div class="tool-box-bg el-icon-search"></div>
                <div @click="devSearchVisible = false" class="search-close-icon">
                    <span class="el-icon-close"></span>
                </div>
            </div>
            <!-- 按条件搜索 end-->
            <!-- 批量删除全选 start -->
            <div class="header-tool-box delete-all" v-show="deleteItemVisiable">
                <span class="delete-all-checkbox">
                    <el-checkbox v-model="isDeleteAll" @change="handleAllCheckedChange" v-show="deleteItemVisiable"></el-checkbox>
                    <span>选择当前所有云图像</span>
                </span>
                <el-button @click="deleteSelected" class="search-box-search" icon="el-icon-delete">删除选中</el-button>
                <div class="tool-box-bg el-icon-delete"></div>
                <div @click="deleteItemVisiable = false" class="search-close-icon">
                    <span class="el-icon-close"></span>
                </div>
            </div>
            <!-- 批量删除全选 end -->
            <!-- 批量下载 start -->
            <div class="header-tool-box batch-download" v-if="devDownloadVisible">
                <span class="download-time-range">
                    <span style="color: #fff">时间段：</span>
                    <el-date-picker
                        v-model="searchDateRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </span><br>
                <span class="download-filetype">
                    <span style="color: #fff">文件类型：</span>
                    <el-select v-model="currentSearchFlieType" placeholder="请选择" :title="currentSearchFlieType">
                        <el-option
                            v-for="item in flieTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <el-button @click="batchDownload" class="download-box-search" icon="el-icon-download">下载云图像</el-button>
                <div class="tool-box-bg el-icon-download"></div>
                <div @click="devDownloadVisible = false" class="search-close-icon">
                    <span class="el-icon-close"></span>
                </div>
            </div>
            <!-- 批量下载 end -->
        </div>
        <!-- 头部搜索 end -->
        <!-- 主体展示部分 -->
        <div class="main">
            <div v-for="(item, index) in searchResult" :key="item.id">
                <div class="main-date">{{item.date}}</div>
                <!-- 视频设备列表展示 -->
                <ul class="main-photos">
                    <li class="main-photos-item fl"
                        v-for="(value, k) in item.photoList"
                        :key="value.id"
                        @mouseover="highlightPic(k)"
                        @mouseout="highlightPicIndex = -1">
                        <router-link to :class="{'main-photos-item-a': true, 'showbg': deleteItemVisiable}">
                            <div class="main-photos-item-bg"
                                :style="{backgroundImage:'url(' + value.picUrl + ')'}">
                                <div class="highlight" v-show="highlightPicIndex === k"></div>
                            </div>
                        </router-link>
                        <div :class="{'main-photos-item-title': true, 'showbg': deleteItemVisiable}">
                            <div class="item-title-info fl">{{value.name}}<br/>{{value.time}}</div>
                            <div class="item-title-delete fr" @click="removePic(index + '' + k)" v-show="!deleteItemVisiable && highlightPicIndex === k" title="删除">
                                <span class="el-icon-delete"></span>
                            </div>
                            <div class="item-title-delete fr">
                                <el-checkbox v-model="isCheckedGroup[index + '' + k]" v-if="deleteItemVisiable" ></el-checkbox>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'CloudPic',
  data () {
    return {
      loading: false,
      currentDev: '全部设备',
      currentSearchDevName: '全部设备',
      currentSearchFlieType: '全部类型',
      deviceOptions: [{
        value: '全部设备'
      }, {
        value: 'C2客厅'
      }, {
        value: 'C1办公室爱仕达撒所多'
      }, {
        value: 'C3走廊'
      }],
      flieTypeOptions: [{
        value: '图片'
      }, {
        value: '视频'
      }],
      devSearchVisible: false,
      searchDateRange: [new Date(), new Date()],
      searchResult: [{
        date: '2018-7-6',
        photoList: [],
        id: '1'
      }, {
        date: '2018-7-5',
        photoList: [],
        id: '2'
      }],
      highlightPicIndex: -1,
      deleteAllVisible: false,
      deleteItemVisiable: false,
      isCheckedGroup: {},
      isDeleteAll: false,
      devDownloadVisible: false
    }
  },
  created () {
    this.getPhotos()
  },
  watch: {
    isCheckedGroup: {
      handler (val) {
        console.log(val)
        let flag = 0
        let len = 0
        for (let k in val) {
          len++
          if (val[k]) flag++
        }
        this.isDeleteAll = flag === len
      },
      deep: true
    }
  },
  methods: {
    /**
     * 获取照片列表
     */
    getPhotos () {
      this.loading = true
      this.$http.get('/douban/v2/movie/us_box').then(res => {
        this.loading = false
        let result = res.data.subjects
        let _obj = {}
        let count = 0
        this.searchResult.forEach((v, i) => {
          v.photoList = result.map((val, j) => {
            _obj[i + '' + j] = false
            return {
              picUrl: val.subject.images.small,
              name: val.subject.title,
              time: '11:30:25',
              id: count++
            }
          })
        })
        this.isCheckedGroup = _obj
        console.log(this.isCheckedGroup)
      }).catch(error => {
        this.loading = false
        console.log(error.response)
      })
    },

    /**
     * 鼠标悬停当前图片高亮
     */
    highlightPic (key) {
      this.highlightPicIndex = key
    },

    /**
     * 点击批量删除按钮显示复选框
     */
    showDeleteCheckbox () {
      this.deleteAllVisible = true
      this.deleteItemVisiable = true
    },

    /**
     *  全选/全不选
     */
    handleAllCheckedChange (val) {
      if (val) {
        for (let k in this.isCheckedGroup) {
          this.isCheckedGroup[k] = true
        }
      } else {
        for (let k in this.isCheckedGroup) {
          this.isCheckedGroup[k] = false
        }
      }
    },

    /**
     * 删除所选图片
     */
    deleteSelected () {
      // 先判断是否有选中图像
      let list = this.isCheckedGroup
      let flag = false
      for (let k in list) {
        if (list[k]) flag = true
      }
      if (!flag) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的图像！'
        })
        return
      }
      this.$confirm('文件删除后将不能恢复，确定要删除?', '删除云图像', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItemVisiable = false
        // 删除逻辑
        // .......
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
     * 批量下载
     */
    batchDownload () {
      this.devDownloadVisible = false
    }
  }
}
</script>
<style scoped>
#cloudpic {
    height: 100%;
    position: relative;
}
.header-select {
    text-align: right;
}
.searchbtn {
    margin-left: 10px;
}
.header-tool-box {
    width: 100%;
    position: absolute;
    top: -5px;
    padding: 10px;
    border-radius: 5px;
    background-color: #3a3a3a;
    box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, .5);
    animation: test 0.1s linear 0s 1 alternate;
}
@keyframes test {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.header-tool-box.searchByCondition .tool-box-bg,
.header-tool-box.delete-all .tool-box-bg,
.header-tool-box.batch-download .tool-box-bg {
    font-size: 100px;
    color: #4a4a4a;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    right: 30px;
    z-index: 0;
}
.header-tool-box.delete-all {
    color: #fff;
    font-size: 16px;
    height: 110px;
    line-height: 85px;
}
.delete-all-checkbox {
    margin: 0 60px 0 10px;
}
/* 小三角
 .header-tool-box::before {
    display: block;
    content: '';
    position: absolute;
    height: 0px;
    width: 0px;
    top: -10px;
    right: 50px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #eee;
} */
.search-dev-name {
    display: inline-block;
    margin-right: 20px;
}
.search-filetype {
    margin-left: 30px;
}
.download-time-range {
    margin-left: 32px;
}
.download-filetype {
    display: inline-block;
    margin: 10px 30px 0 20px;
}
.search-time-range {
    display: inline-block;
    margin: 10px 5px 0 0;
}
.search-close-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    font-size: 14px;
    cursor: pointer;
}
.search-close-icon:hover {
    background-color: red;
    color: #fff;
}
.header-delete-all {
    position: absolute;
    top: 90px;
    left: 23px;
    font-size: 16px;
}

/* 主体展示部分 */
.main {
    margin-top: 75px;
    padding-top: 20px;
    height: calc(100% - 100px);
    overflow: auto;
}
.main-date {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    /* border-radius: 5px; */
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    background-color: #bbb;
    margin: 0 0 10px 24px;
}
.main-photos {
    overflow: hidden;
    margin-bottom: 10px;
}
.main-photos-item {
    width: 200px;
    height: 200px;
    margin: 0 0 15px 25px;
}
.main-photos-item-a {
    display: block;
    height: 150px;
}
.main-photos-item-bg {
    height: 150px;
    position: relative;
    transform: scale(1) translateZ(0);
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    transition: all 0.75s cubic-bezier(0, 1, 0.75, 1);
}
.main-photos-item-bg:hover {
    background-size: 130%;
    background-position: center center;
    transform: scale(1) translateZ(0);
}
.highlight {
    width: 200px;
    height: 150px;
    border: 2px solid #409eff;
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
}
.main-photos-item-title {
    overflow: hidden;
    padding: 5px 5px 0 5px;
}
.showbg {
    background-color: #ecf5ff;
    border-radius: 0 0 5px 5px;
    box-shadow: 1px 1px 10px 1px #666;
}
.item-title-delete {
    cursor: pointer;
    color: #ccc;
    font-size: 20px;
}
.item-title-delete:hover {
    color: #409eff;
}
</style>
<style>
#cloudpic .header-tool-box .el-select {
    width: 190px;
}
#cloudpic .download-filetype .el-select {
    width: 120px;
}
#cloudpic .el-picker-panel {
    box-shadow: 1px 1px 15px 2px #000!important;
}
#cloudpic .header-tool-box .el-button {
    background-color: #409eff;
    color: #fff;
    border: none
}
#cloudpic .header-tool-box .el-button:hover {
    box-shadow: 0px 1px 5px #ccc;
}
</style>
