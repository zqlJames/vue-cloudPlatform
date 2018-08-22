<template>
    <!-- 时间周期结果展示组件 -->
    <el-tooltip content="点击修改" placement="top">
        <div class="timeRangeResultBox" @click="open">
            <div>
                <div>
                    <span v-text="timeResultStr"></span>
                </div>
                <div>
                    <span v-for="item in cycleDays" :key="item">{{item}} </span>
                </div>
            </div>
        </div>
    </el-tooltip>
</template>
<script>
export default {
  name: 'timeRangeResultBox',
  props: ['timeResultStr', 'cycleDays'],
  methods: {
    open () {
      this.$emit('openDia', true)
    }
  }
}
</script>
<style scoped>
.timeRangeResultBox {
    background-color: rgba(103,194,58,.1);
    padding: 5px 10px;
    border-radius: 6px;
    margin-top: 5px;
    border: 1px solid rgba(103,194,58,.2);
    color: #428023;
    transition: all .3s ease;
    overflow: hidden;
}
.timeRangeResultBox:hover {
    box-shadow: 1px 1px 12px 2px rgba(103,194,58,.2);
    background-color:rgba(103,194,58,.2);
    cursor: pointer;
    /* transform: scale(1.01) translateZ(0); */
}
.timeRangeResultBox:focus {
    border-color: #409eff;
}
</style>
