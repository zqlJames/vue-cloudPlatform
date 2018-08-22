<template>
    <!-- 设置向导 步骤2 连接到设备 -->
    <div id="linkToDev" v-loading="loading" element-loading-text="拼命加载中...">
        <h2 class="header-title"><span class="el-icon-info"></span> 请参考图片说明完成设备连接</h2>
        <div class="linkHelp-wrap">
          <img :src="link" class="linkHelp">
        </div>
    </div>
</template>
<script>
export default {
  name: 'linkToDev',
  props: ['link'],
  components: {
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    /**
     * 下一步
     */
    toNextStep () {
      if (this.active++ > 3) this.active = 0
    }
  }
}
</script>
<style scoped>
.header-title {
    font-weight: 400;
    font-size: 16px;
    padding: 10px;
    color: #999
}
.linkHelp-wrap {
    width: 80%;
    margin: 10px auto 0
}
.linkHelp {
    width: 100%;
}
</style>
