<template>
    <!-- 设置向导 步骤1 选择设备类型 -->
    <div id="chooseDev" v-loading="loading" element-loading-text="拼命加载中...">
        <el-collapse v-model="activePanelNames">
            <!-- 网络摄像机 start -->
            <el-collapse-item name="1">
                <template slot="title">
                网络摄像机
                <i class="activeNotice-tip"><i class="el-icon-info"></i>网络摄像机直接连接网络</i>
                </template>
                <ul class="dev-wrap">
                    <li class="dev-item"
                        v-for="item in devTypeList.networkCamera"
                        :key="item.id"
                        @click="clickDev(item.link)">
                        <img class="dev-img" :src="item.image">
                    </li>
                </ul>
            </el-collapse-item>
            <!-- 网络摄像机 end -->
            <!-- 网络摄像机 start -->
            <el-collapse-item name="2">
                <template slot="title">
                硬盘录像机
                <i class="activeNotice-tip"><i class="el-icon-info"></i>DVR或NVR与摄像机组合使用</i>
                </template>
                <ul class="dev-wrap">
                    <li class="dev-item"
                        v-for="item in devTypeList.dvr"
                        :key="item.id"
                        @click="clickDev(item.link)">
                        <img class="dev-img" :src="item.image">
                    </li>
                </ul>
            </el-collapse-item>
            <!-- 网络摄像机 end -->
            <!-- 视频盒子 start -->
            <el-collapse-item name="3">
                <template slot="title">
                视频盒子
                <i class="activeNotice-tip"><i class="el-icon-info"></i>视频盒子与网络摄像机或探测器组合使用</i>
                </template>
                <ul class="dev-wrap">
                    <li class="dev-item"
                        v-for="item in devTypeList.videoBox"
                        :key="item.id"
                        @click="clickDev(item.link)">
                        <img class="dev-img" :src="item.image">
                    </li>
                </ul>
            </el-collapse-item>
            <!-- 视频盒子 end -->
            <!-- 探测器网关 start -->
            <el-collapse-item name="4">
                <template slot="title">
                探测器网关
                <i class="activeNotice-tip"><i class="el-icon-info"></i>探测器网关与探测器组合使用</i>
                </template>
                <ul class="dev-wrap">
                    <li class="dev-item"
                        v-for="item in devTypeList.detectorGateway"
                        :key="item.id"
                        @click="clickDev(item.link)">
                        <img class="dev-img" :src="item.image">
                    </li>
                </ul>
            </el-collapse-item>
            <!-- 视频盒子 end -->
        </el-collapse>
    </div>
</template>
<script>
export default {
  name: 'chooseDev',
  components: {
  },
  data () {
    return {
      loading: false,
      activePanelNames: ['1', '2', '3', '4'],
      devTypeList: {
        networkCamera: [],
        dvr: [],
        DetectorGateway: [],
        videoBox: []
      }
    }
  },
  created () {
    this.getDevTypeData()
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    /**
     * 获取设备类型
     */
    getDevTypeData () {
      let url = 'http://127.0.0.1:3000/deviceType'
      this.$http.get(url).then(res => {
        this.devTypeList = res.data
        console.log(this.devTypeList)
      })
    },

    clickDev (link) {
      console.log(link)
      this.$emit('getType', link)
    }
  }
}
</script>
<style scoped>
.header-title {
    padding: 10px 0;
    font-weight: 400;
}
.activeNotice-tip {
    color: #999;
    font-weight: 400;
    font-size: 12px;
    padding-left: 20px;
}
.dev-wrap {
    width: 100%;
}
.dev-item {
    display: inline-block;
    width: 23%;
    padding-bottom: 8.5%;
    position: relative;
    margin: 5px 5px 0 0;
    cursor: pointer;
    transition: all .3s ease;
    z-index: 1;
}
.dev-img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.dev-item:hover {
    transform: scale(1.1);
    box-shadow:  #666 6px 6px 16px 2px;
    z-index: 9;
}
</style>
<style>
#chooseDev .el-collapse-item__header {
    font-weight: 700;
}
</style>
