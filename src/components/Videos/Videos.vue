<template>
    <div id="videos">
        <!-- 导航 -->
        <div class="videos-nav fl">
            <el-menu :default-active="$route.path"
                    class="el-menu-vertical-demo videos-nav-contain"
                    theme="dark"
                    router>
              <el-menu-item index="/Videos/LiveVideos" class="videos-nav-item">{{$t('liveVideos.liveVideos')}}</el-menu-item>
              <el-menu-item index="/Videos/LocalPhotos" class="videos-nav-item">{{$t('localPhotos.localPhotos')}}</el-menu-item>
              <el-menu-item index="/Videos/CloudPic" class="videos-nav-item">{{$t('cloudPicture.cloudPicture')}}</el-menu-item>
              <el-menu-item index="/Videos" class="videos-nav-item"><a href="http://square.ys7.com/index" target="_blank">{{$t('videoSquare.videoSquare')}}</a> </el-menu-item>
            </el-menu>
        </div>
        <!-- 主体 -->
        <div class="videos-main fr">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Videos'
}
</script>
<style scoped>
#videos {
    height: 100%;
}
.videos-nav {
    width: 20%;
    height: 100%;
    display: inline-block;
}
.videos-nav-contain {
    height: 100%;
}
.videos-nav-item {
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #eee
}
.videos-main {
    display: inline-block;
    width: 80%;
    background-color: #fff;
    height: 100%;
    padding: 15px 0 15px 25px;
}
</style>
