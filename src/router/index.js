import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['@/components/Login/Login.vue'], resolve)
const Register = resolve => require(['@/components/Register/Register.vue'], resolve)
const Home = resolve => require(['@/components/Home.vue'], resolve)
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
const UserInfoCfg = resolve => require(['@/components/Config/UserInfoCfg.vue'], resolve)
const TerminalBindingCfg = resolve => require(['@/components/Config/TerminalBindingCfg.vue'], resolve)
const LocalCfg = resolve => require(['@/components/Config/LocalCfg.vue'], resolve)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: '/MyCubeCloud',
      children: [{
        path: '/MyCubeCloud',
        name: 'MyCubeCloud',
        component: MyCubeCloud
      },
      {
        path: '/Videos',
        name: 'Videos',
        component: Videos,
        redirect: '/Videos/LiveVideos',
        children: [{
          path: 'LiveVideos',
          name: 'LiveVideos',
          component: LiveVideos
        }, {
          path: 'LocalPhotos',
          name: 'LocalPhotos',
          component: LocalPhotos
        }, {
          path: 'CloudPic',
          name: 'CloudPic',
          component: CloudPic
        }]
      },
      {
        path: '/Message',
        name: 'Message',
        component: Message,
        redirect: '/Message/EventMsg',
        children: [{
          path: 'EventMsg',
          name: 'EventMsg',
          component: EventMsg
        }, {
          path: 'LeaveMsg',
          name: 'LeaveMsg',
          component: LeaveMsg
        }, {
          path: 'SystemMsg',
          name: 'SystemMsg',
          component: SystemMsg
        }, {
          path: 'Daily',
          name: 'Daily',
          component: Daily
        }]
      },
      {
        path: '/Config',
        name: 'Config',
        component: Config,
        redirect: '/Config/DeviceCfg',
        children: [{
          path: 'DeviceCfg',
          name: 'DeviceCfg',
          component: DeviceCfg
        }, {
          path: 'DeviceCfg/:id',
          name: 'DeviceInfo',
          component: DeviceInfo
        }, {
          path: 'GuideAddDevice',
          name: 'GuideAddDevice',
          component: GuideAddDevice
        }, {
          path: 'DeviceDomainCfg',
          name: 'DeviceDomainCfg',
          component: DeviceDomainCfg
        }, {
          path: 'GroupCfg',
          name: 'GroupCfg',
          component: GroupCfg
        }, {
          path: 'UserInfoCfg',
          name: 'UserInfoCfg',
          component: UserInfoCfg
        }, {
          path: 'TerminalBindingCfg',
          name: 'TerminalBindingCfg',
          component: TerminalBindingCfg
        }, {
          path: 'LocalCfg',
          name: 'LocalCfg',
          component: LocalCfg
        }]
      }]
    }
  ]
})
