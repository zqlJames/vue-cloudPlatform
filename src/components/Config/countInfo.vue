<template>
    <div id="countInfo-cfg">
      <div class="titleInfo">头像信息</div>
      <div>
        <img src="" class="imge"/>
        <input type="file" name="uploadFile" id="uploadFile"/>
        <span>支持JPG、JPEG、PNG格式，图片大小不超过2MB</span>
       </div>

       <div class="titleInfo">账户信息</div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="用户名">
            <span v-text="form.userName"></span>
        </el-form-item>

        <el-form-item label="真实姓名">
            <el-input v-model="form.realName"></el-input>
        </el-form-item>

         <el-form-item label="所在位置">
            <area-select type='text'   :level='2' v-model="selected" :data="pcaa"></area-select>
        </el-form-item>

        <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
            <el-button plain>解绑</el-button>
        </el-form-item>


        <el-form-item label="手机号码">
            <span v-text="form.email"></span>
            <router-link v-bind="{to:'/'}">修改</router-link >
        </el-form-item>
       
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>

       <div class="titleInfo">二维码名片</div>


      <div id="qrcodejs">

      </div>



    </div>
</template>
<script>
// import QRCode from "qrcodejs2";
// import { pca, pcaa } from "area-data";



export default {
  name: "countInfoCfg",
  props: ["allData"],
  data() {
    return {
      form: this.allData,   
      // pcaa: pcaa, //最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
      selected: []
    }
  },
  mounted() {
    // this.getQrcode();
  },
  /* watch: {
    allData (val) {
      this.form = val
    }
  }, */
  methods: {
    /**
     * 二维码使用
     */
    /* getQrcode() {
      var qrcode = new QRCode(document.getElementById("qrcodejs"), {
        text: "12345645",
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
      this.$emit("getData", qrcode)
      console.log(qrcode);
    } */
  }
};
</script>
<style scoped>
#countInfo-cfg {
  height: 100%;
  min-height: 700px;
  overflow-y:scroll;
}
.titleInfo {
  background-color: #ecf5ff;
  margin: 10px 0px;
  font-size: 20px;
  font-family: "\5FAE\8F6F\96C5\9ED1", "Microsoft YaHei", "Arial Narrow";
}

.imge {
  display: inline-block;
  width: 100px;
  height: 100px;
}

.el-input {
  width: 180px;
}


</style>


<style>
#countInfo-cfg .area-select-wrap .area-select {
  display: inline-block !important;
  width: 100px !important;
}
</style>






