<template>
    <!-- 添加设备弹窗 -->
    <el-dialog class="addDevDia"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="400px"
        :title="title">
        <div class="input-wrap">
            <span>设备域名：</span>
            <el-input size="small" class="domainName" placeholder="请输入设备域名" v-model="inputData.name"></el-input>
        </div>
        <div class="input-wrap">
            <span>设备序列号：</span>
            <el-input size="small" class="domainName" placeholder="请输入设备序列号" v-model="inputData.serial"></el-input>
        </div>
        <div class="input-wrap">
            <span>HTTP映射端口：</span>
            <el-input size="small" class="domainName" placeholder="请输入设备域名" v-model="inputData.ip"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="btnCancel">取 消</el-button>
            <el-button type="primary" @click="btnOk">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
  name: 'addEditDevDia',
  props: ['devData', 'visible', 'title'],
  data () {
    return {
      inputData: {
        name: '',
        serial: '',
        ip: '0'
      }
    }
  },
  watch: {
    devData: {
      handler (val) {
        this.inputData = val
      },
      deep: true
    }
  },
  methods: {
    btnCancel () {
      this.$emit('update:visible', false)
    },
    btnOk () {
      this.$emit('getData', this.inputData)
      this.$emit('update:visible', false)
    }
  }
}
</script>
