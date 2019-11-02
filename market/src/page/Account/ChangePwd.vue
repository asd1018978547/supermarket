<template>
  <div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="ChangePwd"
      :rules="rules"
      ref="ChangePwd"
    >
      <el-form-item label="原密码：" prop="oldPwd">
        <el-input v-model="ChangePwd.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPwd">
        <el-input v-model="ChangePwd.newPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPwd">
        <el-input v-model="ChangePwd.checkPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ChangePwd')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePwd } from "../../api/api";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ChangePwd.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ChangePwd: {
        oldPwd: "",
        newPwd: "",
        checkPwd: ""
      },
      rules: {
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //获取当前登录的账号的id
      var id = localStorage.getItem("id");
      this.$refs[formName].validate(valid => {
        if (valid) {
          changePwd(id, this.ChangePwd.oldPwd, this.ChangePwd.newPwd)
            .then(res => {
              alert(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({
            type: "error",
            message: "请检查密码",
            center: true
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>