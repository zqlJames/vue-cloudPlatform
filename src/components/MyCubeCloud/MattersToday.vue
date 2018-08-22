<template>
  <div id="matterstoday">
      <div class="matterstoday-header tc">{{$t('home.mattersToday')}}</div>
      <div class="matterstoday-main">
          <ul class="matterstoday-main-contain">
              <li class="matterstoday-main-item">
                <router-link to class="matterstoday-main-item-a">
                    <div class="matterstoday-main-item-icon">
                        <span class="el-icon-bell"></span>
                    </div>
                    <span class="matterstoday-main-item-text">{{$t('home.abnormalReminding')}}</span>
                </router-link>
              </li>
              <li class="matterstoday-main-item">
                <router-link to="/Videos/CloudPic" class="matterstoday-main-item-a">
                    <div class="matterstoday-main-item-icon">
                        <span class="el-icon-upload"></span>
                    </div>
                    <span class="matterstoday-main-item-text">{{$t('home.cloudImage')}}</span>
                </router-link>
              </li>
              <li class="matterstoday-main-item">
                <router-link to class="matterstoday-main-item-a">
                    <div class="matterstoday-main-item-icon">
                        <span class="el-icon-news"></span>
                    </div>
                    <span class="matterstoday-main-item-text">{{$t('home.videoSquare')}}</span>
                </router-link>
              </li>
              <li class="matterstoday-main-item">
                <router-link to class="matterstoday-main-item-a">
                    <div class="matterstoday-main-item-icon">
                        <span class="el-icon-phone-outline"></span>
                    </div>
                    <span class="matterstoday-main-item-text">{{$t('home.videoInvitations')}}</span>
                </router-link>
              </li>
              <li class="matterstoday-main-item">
                <router-link to="/Message/LeaveMsg" class="matterstoday-main-item-a">
                    <div class="matterstoday-main-item-icon">
                        <span class="el-icon-message"></span>
                    </div>
                    <span class="matterstoday-main-item-text">{{$t('home.leaveMessages')}}</span>
                </router-link>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MattersToday'
}
</script>

<style lang="less" scoped>
#matterstoday {
    width: calc(100% - 700px);
    height: 100%;
    background-color: #fff;
    box-shadow: #666 -1px 1px 10px;
}
.matterstoday-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    font-weight: 700;
}
.matterstoday-main {
    height: calc(100% - 150px);
}
.matterstoday-main-contain {
    height: 100%;
}
.matterstoday-main-item {
    float: left;
    width: 33.333%;
    height: 50%;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    text-align: center;
    transition: all .3s ease;
}
.matterstoday-main-item:hover {
   box-shadow: 1px 1px 10px 5px #ccc;
}
.matterstoday-main-item-a {
    display: inline-block;
    width: 100%;
    height: 100%;
}
.matterstoday-main-item-icon {
    width: 100%;
    height: 80%;
    font-size: 40px;
    position: relative;
}
.matterstoday-main-item-icon span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>
<style>
</style>
