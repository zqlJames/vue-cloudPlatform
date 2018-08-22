<template>
  <div id="quickmanager">
    <div class="quickmanager-header clearfix">
        <h3 class="fl">{{$t('home.quickManage')}}</h3>
        <div class="fr"><span class="el-icon-plus"></span> {{$t('home.addDevice')}}</div>
    </div>
    <el-carousel :autoplay="false" arrow="always" class="quickmanager-wrap">
        <el-carousel-item v-for="item in 4" :key="item" class="quickmanager-item">
            <img src="/static/demo.jpg" alt="" class="quickmanager-img">
            <!-- <video src="/static/demo.Ogg" poster="/static/logo.png" controls class="quickmanager-video"></video> -->
            <!-- <h3>{{ item }}</h3> -->
        </el-carousel-item>
    </el-carousel>
    <div class="quickmanager-footer pt5 clearfix">
        <div class="fl">C1办公室</div>
        <div class="fr">{{$t('home.config')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickManager'
}
</script>

<style lang="less" scoped>
#quickmanager {
    width: 680px;
    height: 100%;
    padding: 10px 13px;
    background-color: #fff;
    box-shadow: #666 1px 1px 10px;
}
.quickmanager-wrap {
    height: calc(100% - 40px);
}
.quickmanager-wrap,
.quickmanager-item {
    width: 650px;
}
.quickmanager-item, .quickmanager-img {
    display: inline-block;
    width: 650px;
    height: 100%;
    // border: 1px solid red;
}
</style>
<style>
.quickmanager-wrap .el-carousel__container {
    height: 100%;
}
</style>
