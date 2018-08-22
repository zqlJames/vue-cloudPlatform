<template>
    <!-- 设置向导 步骤4 完成 -->
    <div id="finished" v-loading="loading" element-loading-text="拼命加载中...">
        <h2 class="header"><span class="el-icon-success"></span><br> 已完成设备添加！欢迎加入立方云~</h2>
    </div>
</template>
<script>
export default {
  name: 'finished',
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
  }
}
</script>
<style scoped>
#finished {
    height: 100%;
}
.header {
    width: 100%;
    height: 300px;
    text-align: center;
}
.el-icon-success {
    color: #67c23a;
    font-size: 50px;
    margin: 200px 0 10px 0;
}
</style>
