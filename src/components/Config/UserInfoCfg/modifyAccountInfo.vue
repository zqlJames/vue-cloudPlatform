<template>
    <div class="modifyAccountInfo">
        <div class="headInfo account-item">
            <h3 class="title">头像信息</h3>
            <div class="headInfo-content">
                <el-upload
                    class="avatar-uploader"
                    action="upload/user/upload/img"
                    name="headImg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <el-button slot="trigger" size="small">点击上传头像</el-button>
                </el-upload>
            </div>
        </div>
        <div class="accountInfo account-item">
        <h3 class="title">账户信息</h3>
            <div class="accountInfo-content">
                <div class="accountInfo-content-item">
                    <span class="accountInfo-content-item-title">昵称：</span>
                    <el-input class="accountInfo-content-item-input" size="small">{{nickName}}</el-input>
                </div>
                <div class="accountInfo-content-item">
                    <span class="accountInfo-content-item-title">用户名：</span>
                    <span class="accountInfo-content-item-input">{{userName}}</span>
                </div>
                <div class="accountInfo-content-item">
                    <span class="accountInfo-content-item-title">真实姓名：</span>
                    <el-input class="accountInfo-content-item-input" size="small">{{realName}}</el-input>
                </div>
                <div class="accountInfo-content-item">
                    <span class="accountInfo-content-item-title">所在位置：</span>
                    <el-input class="accountInfo-content-item-input" size="small">{{adress}}</el-input>
                </div>
                <div class="accountInfo-content-item">
                    <span class="accountInfo-content-item-title">邮箱：</span>
                    <el-input class="accountInfo-content-item-input" size="small"></el-input>
                    <el-button class="accountInfo-content-item-buttton" size="small">绑定</el-button>
                </div>
                <div class="accountInfo-content-item">
                    <span class="accountInfo-content-item-title">手机号码：</span>
                    <span class="accountInfo-content-item-input">
                        18866668888
                        <span class="link">修改</span>
                    </span>
                </div>
                <el-button @click="handleSaveAccount" class="saveBtn" size="small">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import nonce from '../../../utils/nonce.js'

export default {
  name: 'modifyAccountInfo',
  data () {
    return {
      imageUrl: '../../../../static/imgs/dog.jpg',
      nickName: '',
      userName: '张三',
      realName: '',
      adress: '',
      uploadData: {
        basic: {
          id: '12312',
          time: '20180901',
          nonce: '12345678987654321',
          token: '1',
          sign: 'yrj'
        }
      }
    }
  },
  created () {
    this.getUserInfo()
    console.log(nonce.getRandomNumber(32))
  },
  methods: {
    /**
     * 获取用户信息
     */
    getUserInfo () {
      const url = 'api/user/get'
      const param = {
        basic: {
          id: '12312',
          time: '20180901',
          nonce: '12345678987654321',
          token: '1',
          sign: 'yrj'
        }
      }
      this.$http.post(url, param).then((res) => {
        let userData = res.data
        this.realName = userData.name
      })
    },

    /**
     * 上传头像成功的回调
     */
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    /**
     * 上传头像之前的回调
     */
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) this.$message.error('上传头像图片只能是 JPG 格式!')
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!')
      return isJPG && isLt2M
    },

    /**
     * 用户信息点击保存按钮触发
     */
    handleSaveAccount () {
      const url = 'api/user/update'
      const param = {
        basic: {
          id: '12312',
          time: '20180901',
          nonce: '12345678987654321',
          token: '1',
          sign: 'yrj'
        },
        data: {
          name: this.nickName,
          adress: this.adress,
          userName: '123'
        }
      }
      this.$http.post(url, param).then((res) => {
        console.log(res.data)
      })
    }
  }
}
</script>
<style scoped>
.title {
    margin-top: 20px;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    background: #f5f7fa;
    font-weight: 400;
    font-size: 16px;
}
.headInfo-content, .accountInfo-content {
    margin: 0 0 0 30px;
}
.avatar-uploader-icon {
    display: inline-block;
    font-size: 14px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    display: block;
    border: 1px solid #ccc;
}
.avatar-uploader {
    display: inline-block;
    position: relative;
}
.uploadBtn {
    display: inline-block
}

.accountInfo-content-item {
    margin: 20px 0 0 0px
}
.accountInfo-content-item-title {
    display: inline-block;
    width: 70px;
}
.accountInfo-content-item-input {
    display: inline-block;
    width: 240px;
}
.saveBtn {
    margin: 40px 0 0 70px;
    width: 240px;
}
</style>
