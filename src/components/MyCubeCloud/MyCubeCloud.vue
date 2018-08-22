<template>
    <div id="mycubecloud">
        <div class="mycubecloud-header">
            <router-link to class="mycubecloud-header-myhead" @mouseover.native="showEditHead" @mouseout.native="showEditHead">
                <span class="mycubecloud-header-edithead" v-show="editHead">{{$t('home.editHead')}}</span>
            </router-link>
            <!-- 导航开始 -->
            <div class="mycubecloud-header-nav">
                <p class="mycubecloud-header-nav-sign">--"美好的一天，从关爱自己与家人开始。"</p>
                <ul class="mycubecloud-header-nav-main">
                    <li class="mycubecloud-header-nav-item">
                        <router-link to="/Videos/LiveVideos">
                            <div class="mycubecloud-header-nav-icon">
                                <span class="el-icon-caret-right"></span>
                            </div>
                            <span class="mycubecloud-header-nav-text" :title="$t('home.myVideos')">{{$t('home.myVideos')}}</span>
                        </router-link>
                    </li>
                    <li class="mycubecloud-header-nav-item">
                        <router-link to="/Videos/LocalPhotos">
                            <div class="mycubecloud-header-nav-icon">
                                <span class="el-icon-picture"></span>
                            </div>
                            <span class="mycubecloud-header-nav-text" :title="$t('home.myPhotos')">{{$t('home.myPhotos')}}</span>
                        </router-link>
                    </li>
                    <li class="mycubecloud-header-nav-item">
                        <router-link to>
                            <div class="mycubecloud-header-nav-icon">
                                <span class="el-icon-share"></span>
                            </div>
                            <span class="mycubecloud-header-nav-text" :title="$t('home.videoShare')">{{$t('home.videoShare')}}</span>
                        </router-link>
                    </li>
                    <li class="mycubecloud-header-nav-item">
                        <router-link to>
                            <div class="mycubecloud-header-nav-icon">
                                <span class="el-icon-star-on"></span>
                            </div>
                            <span class="mycubecloud-header-nav-text" :title="$t('home.videoCollection')">{{$t('home.videoCollection')}}</span>
                        </router-link>
                    </li>
                    <li class="mycubecloud-header-nav-item">
                        <router-link to>
                            <div class="mycubecloud-header-nav-icon">
                                <span class="el-icon-warning"></span>
                            </div>
                            <span class="mycubecloud-header-nav-text" :title="$t('home.accountSecurity')">{{$t('home.accountSecurity')}}</span>
                        </router-link>
                    </li>
                    <li class="mycubecloud-header-nav-item">
                        <router-link to="/Config/DeviceDomainCfg">
                            <div class="mycubecloud-header-nav-icon">
                                <span class="el-icon-setting"></span>
                            </div>
                            <span class="mycubecloud-header-nav-text" :title="$t('home.devDomainManage')">{{$t('home.devDomainManage')}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- 导航结束 -->
        </div>
        <!-- 主体 -->
        <div class="mycubecloud-main">
            <!-- 快速管理 -->
            <QuickManager class="fl"></QuickManager>
            <!-- 今日事项 -->
            <MattersToday class="fr"></MattersToday>
        </div>
        <!-- 广告位 -->
        <div class="mycubecloud-adv">GO  >> 立方云商城</div>
    </div>
</template>
<script>
import QuickManager from './QuickManager'
import MattersToday from './MattersToday'
export default {
  name: 'MyCubeCloud',
  components: {
    QuickManager,
    MattersToday
  },
  data () {
    return {
      editHead: false
    }
  },
  methods: {
    showEditHead () {
      this.editHead = !this.editHead
    }
  }
}
</script>
<style scoped>
/* 导航部分 */
#mycubecloud {
    height: 100%;
}
.mycubecloud-header {
    height: 150px;
    padding-top: 20px;
    overflow: hidden;
}
.mycubecloud-header-myhead {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    display: inline-block;
    margin: 25px 62px 0 40px;
    border: 3px solid #eee;
    border-radius: 50%;
    background: url("../../assets/logo.png") center 15px no-repeat;
    background-color: #fff;
    background-size: 80%;
}
.mycubecloud-header-edithead {
    text-align: center;
    font-size: 10px;
    color: #eee;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .5)
}
.mycubecloud-header-nav {
    display: inline-block;
}
.mycubecloud-header-nav-sign {
    color: #606266;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    margin-left: -20px;
}
.mycubecloud-header-nav-item {
    display: inline-block;
    margin-right: 15px;
    max-width: 120px;
}
.mycubecloud-header-nav-icon,
.mycubecloud-header-nav-text {
    display: block;
    color: #606266;
}
.mycubecloud-header-nav-icon {
    height: 60px;
    line-height: 68px;
    text-align: center;
    font-size: 25px;
}
.mycubecloud-header-nav-icon > span {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #606266;
    border-radius: 50%
}
.mycubecloud-header-nav-text {
    height: 15px;
    line-height: 15px;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mycubecloud-header-nav-item:hover .mycubecloud-header-nav-icon > span,
.mycubecloud-header-nav-item:hover .mycubecloud-header-nav-icon,
.mycubecloud-header-nav-item:hover .mycubecloud-header-nav-text {
    color: #000;
    border-color: #000;
}

.mycubecloud-main {
    height: calc(100% - 280px);
    min-height: 300px;
}

.mycubecloud-adv {
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: #bbb;
    margin-top: 15px;
    font-size: 20px;
}
</style>
