<template>
    <!-- 图形验证码组件 -->
    <div class="verifyImg" :style="styleObj" @click="handleClick" @mouseover="showModel = true" @mouseout="showModel = false">
        <img :src="src">
        <div :style="styleObj" class="model" v-show="showModel">点击更换</div>
    </div>
</template>
<script>
export default {
  name: 'countDown',
  props: ['src', 'width', 'height'],
  data () {
    return {
      styleObj: {
        'width': this.width,
        'height': this.height,
        'line-height': this.height
      },
      showModel: false
    }
  },
  methods: {
    /**
     * 点击更换图片
     */
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
.verifyImg {
    display: inline-block;
    position: relative;
    cursor: pointer;
}
.verifyImg img {
    vertical-align: baseline;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
.model {
    position: absolute;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    color: #eee;
    font-size: 16px;
    top: 0;
    left: 0;
}
</style>
