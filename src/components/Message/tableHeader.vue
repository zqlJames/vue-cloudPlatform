<template>
    <div class="th" @click="showFilterContent">
        <span :class="{'text': true, 'highlight': tableHeadComp.isHighlight}">{{tableHeadComp.text}}</span><!--
     --><i :class="{'el-icon-arrow-down': !tableHeadComp.isShow, 'el-icon-arrow-up': tableHeadComp.isShow}"></i>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['tableHeadComp'],
  methods: {
    showFilterContent () {
      let flag = !this.tableHeadComp.isShow
      this.$emit('showTableDatePicker', flag)
    }
  }
}
</script>
<style scoped>
.th {
  padding-left: 0!important;
}
.el-icon-arrow-up, .el-icon-arrow-down {
  font-size: 12px;
  transform: scale(.75);
  cursor: pointer;
}
.highlight {
  color: #409eff;
}
</style>
