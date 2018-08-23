<template>
    <div id="message">
        <!-- 导航 -->
        <div class="message-nav fl">
            <el-menu :default-active="$route.path"
                    class="el-menu-vertical-demo message-nav-contain"
                    theme="dark"
                    router>
              <el-menu-item index="/message/eventMsg" class="message-nav-item">事件消息</el-menu-item>
              <el-menu-item index="/message/leaveMsg" class="message-nav-item">留言消息</el-menu-item>
              <el-menu-item index="/message/systemMsg" class="message-nav-item">系统消息</el-menu-item>
              <el-menu-item index="/message/daily" class="message-nav-item">日报</el-menu-item>
            </el-menu>
        </div>
        <!-- 主体 -->
        <div class="message-main fr">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Message'
}
</script>
<style scoped>
#message {
    height: 100%;
}
.message-nav {
    width: 20%;
    height: 100%;
    display: inline-block;
}
.message-nav-contain {
    height: 100%;
}
.message-nav-item {
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #eee
}
.message-main {
    display: inline-block;
    width: 80%;
    background-color: #fff;
    height: 100%;
}
</style>
