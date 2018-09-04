import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['@/components/Login/Login.vue'], resolve)
const Register = resolve => require(['@/components/Register/Register.vue'], resolve)
const ResetPassword = resolve => require(['@/components/ResetPassword/ResetPwd.vue'], resolve)
const Home = resolve => require(['@/components/Home/Home.vue'], resolve)
const MyCubeCloud = resolve => require(['@/components/MyCubeCloud/MyCubeCloud.vue'], resolve)

const Videos = resolve => require(['@/components/Videos/Videos.vue'], resolve)
const LiveVideos = resolve => require(['@/components/Videos/LiveVideos/LiveVideos.vue'], resolve)
const LocalPhotos = resolve => require(['@/components/Videos/LocalPhotos.vue'], resolve)
const CloudPic = resolve => require(['@/components/Videos/CloudPic.vue'], resolve)

const Message = resolve => require(['@/components/Message/Message.vue'], resolve)
const EventMsg = resolve => require(['@/components/Message/EventMsg.vue'], resolve)
const LeaveMsg = resolve => require(['@/components/Message/LeaveMsg.vue'], resolve)
const SystemMsg = resolve => require(['@/components/Message/SystemMsg.vue'], resolve)
const Daily = resolve => require(['@/components/Message/Daily.vue'], resolve)

const Config = resolve => require(['@/components/Config/Config.vue'], resolve)
const DeviceCfg = resolve => require(['@/components/Config/DeviceCfg/DeviceCfg.vue'], resolve)
const DeviceInfo = resolve => require(['@/components/Config/DeviceCfg/DeviceInfo.vue'], resolve)
const GuideAddDevice = resolve => require(['@/components/Config/DeviceCfg/guideAddDevice.vue'], resolve)
const DeviceDomainCfg = resolve => require(['@/components/Config/DeviceDomainCfg/DeviceDomainCfg.vue'], resolve)
const GroupCfg = resolve => require(['@/components/Config/GroupCfg.vue'], resolve)
const UserInfoCfg = resolve => require(['@/components/Config/UserInfoCfg/UserInfoCfg.vue'], resolve)
const TerminalBindingCfg = resolve => require(['@/components/Config/TerminalBindingCfg.vue'], resolve)
const LocalCfg = resolve => require(['@/components/Config/LocalCfg.vue'], resolve)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/resetPassword',
      name: 'ResetPwd',
      component: ResetPassword
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/myCubeCloud',
      children: [{
        path: '/myCubeCloud',
        name: 'MyCubeCloud',
        component: MyCubeCloud
      },
      {
        path: '/videos',
        name: 'Videos',
        component: Videos,
        redirect: '/videos/liveVideos',
        children: [{
          path: 'liveVideos',
          name: 'LiveVideos',
          component: LiveVideos
        }, {
          path: 'localPhotos',
          name: 'LocalPhotos',
          component: LocalPhotos
        }, {
          path: 'cloudPic',
          name: 'CloudPic',
          component: CloudPic
        }]
      },
      {
        path: '/message',
        name: 'message',
        component: Message,
        redirect: '/message/eventMsg',
        children: [{
          path: 'eventMsg',
          name: 'EventMsg',
          component: EventMsg
        }, {
          path: 'leaveMsg',
          name: 'LeaveMsg',
          component: LeaveMsg
        }, {
          path: 'systemMsg',
          name: 'SystemMsg',
          component: SystemMsg
        }, {
          path: 'daily',
          name: 'Daily',
          component: Daily
        }]
      },
      {
        path: '/config',
        name: 'Config',
        component: Config,
        redirect: '/config/deviceCfg',
        children: [{
          path: 'deviceCfg',
          name: 'DeviceCfg',
          component: DeviceCfg
        }, {
          path: 'deviceCfg/:id',
          name: 'DeviceInfo',
          component: DeviceInfo
        }, {
          path: 'guideAddDevice',
          name: 'GuideAddDevice',
          component: GuideAddDevice
        }, {
          path: 'deviceDomainCfg',
          name: 'DeviceDomainCfg',
          component: DeviceDomainCfg
        }, {
          path: 'groupCfg',
          name: 'GroupCfg',
          component: GroupCfg
        }, {
          path: 'userInfoCfg',
          name: 'UserInfoCfg',
          component: UserInfoCfg
        }, {
          path: 'terminalBindingCfg',
          name: 'TerminalBindingCfg',
          component: TerminalBindingCfg
        }, {
          path: 'localCfg',
          name: 'LocalCfg',
          component: LocalCfg
        }]
      }]
    }
  ]
})
