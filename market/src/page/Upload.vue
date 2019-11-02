<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :action="uploadip"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { IP } from "../api/api";

export default {
  created() {

  },
  data() {
    return {
      imageUrl: "" //图片的地址
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = IP + "/" + res;
      //改变vuex状态机里的数据
      this.$store.commit('changeAvatarUrl',IP + "/" + res);
      console.log(this.$store.state);
      
    }
  },
  computed: {
    //设置上传的请求地址
    uploadip() {
      return IP + "/upload?id=" + localStorage.id;
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader,
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>