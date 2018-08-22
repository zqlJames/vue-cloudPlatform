<template>
    <div id="localphotos" v-loading="loading" element-loading-text="拼命加载中...">
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
                <el-button @click="devSearchVisible = true" icon="el-icon-search">按条件查询</el-button>
            </div>
            <!-- 按条件搜索 -->
            <div class="header-search-box" v-if="devSearchVisible">
                <span class="search-dev-name">
                    <span style="color: #fff">设备名：</span>
                    <el-select v-model="currentSearch" placeholder="请选择" :title="currentSearch">
                        <el-option
                            v-for="item in deviceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span class="search-time-range">
                    <span style="color: #fff">时间段：</span>
                    <el-date-picker
                        v-model="searchDataRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </span>
                <el-button @click="devSearchVisible = false" icon="el-icon-search">查询</el-button>
                <div @click="devSearchVisible = false" class="search-close-icon">
                    <span class="el-icon-close"></span>
                </div>
            </div>
        </div>
        <!-- 头部搜索 end -->
        <!-- 主体展示部分 -->
        <div class="main">
            <div v-for="(item, index) in searchResult" :key="item.id">
                <div class="main-date">{{item.date}}</div>
                <!-- 视频设备列表展示 -->
                <ul class="main-photos">
                    <li class="main-photos-item fl"
                        v-for="(value, key) in item.photoList"
                        :key="value.id"
                        @mouseover="highlightPic(key)"
                        @mouseout="highlightPicIndex = -1">
                        <router-link to class="main-photos-item-a">
                            <div class="main-photos-item-bg"
                                :style="{backgroundImage:'url(' + value.picUrl + ')'}">
                                <div class="highlight" v-show="highlightPicIndex === key"></div>
                            </div>
                        </router-link>
                        <div class="main-photos-item-title mt5 pl5 pr5">
                            <div class="item-title-info fl">{{value.name}}<br/>{{value.time}}</div>
                            <div class="item-title-delete fr" @click="removePic(index + '' + key)" v-show="highlightPicIndex === key" title="删除">
                                <span class="el-icon-delete"></span>
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
  name: 'LocalPhotos',
  data () {
    return {
      loading: false,
      currentDev: '全部设备',
      currentSearch: '全部设备',
      deviceOptions: [{
        value: '全部设备'
      }, {
        value: 'C2客厅'
      }, {
        value: 'C1办公室爱仕达撒所多'
      }, {
        value: 'C3走廊'
      }],
      devSearchVisible: false,
      searchDataRange: [new Date(), new Date()],
      searchResult: [{
        date: '2018-6-28',
        photoList: [],
        id: '1'
      }, {
        date: '2018-6-26',
        photoList: [],
        id: '2'
      }],
      highlightPicIndex: -1
    }
  },
  created () {
    this.getPhotos()
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
        console.log(res.data)
        this.searchResult.forEach((v, i) => {
          v.photoList = result.map((val, j) => {
            return {
              picUrl: val.subject.images.small,
              name: val.subject.title,
              time: '11:30:25'
            }
          })
        })
        console.log(this.searchResult)
      }).catch(error => {
        this.loading = false
        console.log(error.response)
      })
    },

    /**
     * 删除照片
     */
    highlightPic (key) {
      this.highlightPicIndex = key
    },

    /**
     * 删除照片
     */
    removePic (key) {
      console.log(key)
      this.$confirm('文件删除后将不能恢复，确定要删除?', '删除图片或剪辑', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
    }
  }
}
</script>
<style scoped>
#localphotos {
    height: 100%;
    position: relative;
}
.header-select {
    text-align: right;
}
.header-search-box {
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
/* 小三角
 .header-search-box::before {
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
.search-time-range {
    display: inline-block;
    margin-right: 5px;
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

/* 主体展示部分 */
.main {
    margin-top: 30px;
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
#localphotos .header-search-box .el-select {
    width: 180px;
}
#localphotos .header-search-box .el-date-editor--datetimerange.el-input,
#localphotos .header-search-box .el-date-editor--datetimerange.el-input__inner {
    width: 360px;
}
.search-time-range .el-date-editor--daterange.el-input,
.search-time-range .el-date-editor--daterange.el-input__inner,
.search-time-range .el-date-editor--timerange.el-input,
.search-time-range .el-date-editor--timerange.el-input__inner {
    width: 280px;
}
#localphotos .el-picker-panel {
    box-shadow: 1px 1px 15px 2px #000!important;
}
</style>
