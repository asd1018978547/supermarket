<template>
  <div class="login">
    <el-card class="box-card">
      <!-- 表头 -->
      <div slot="header">
        <span>金都综超管理系统</span>
      </div>
      <!-- 内容 -->

      <div>
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="user"
          label-width="100px"
          class="demo-user"
        >
          <el-form-item label="账号" prop="account">
            <el-input clearable v-model="user.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              clearable
              show-password
              type="password"
              v-model="user.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-button type="primary" @click="submitForm('user')">登录</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { login } from "../api/api";

export default {
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3-10个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 3, max: 10, message: "密码长度在3-10个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //通过表单验证
        if (valid) {
          //发送ajax请求
          login(this.user.account, this.user.password)
            .then(res => {
              if (res.data.msg == "登录成功") {
                // code为0登录成功
                // 显示一个提示框
                this.$notify({
                  title: "成功",
                  message: res.data.msg,
                  type: "success"
                });
                localStorage.token = res.data.token; //保存token
                localStorage.account = this.user.account;
                localStorage.userGroup = res.data.userGroup;
                localStorage.avatarUrl = res.data.avatarUrl;
                this.$router.history.push("/home/goods");
              } else {
                this.$message({
                  type: "error",
                  message: "登录失败",
                  center: true
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } //没有通过表单验证
        else {
          this.$message({
            type: "error",
            message: "请检查账号名或密码",
            center: true
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // background-color: #00bcd3;
  background: linear-gradient(to right, #4b8fed, #34c2aa);
  // background: linear-gradient(to right, #34c2aa, #6cd557);
  .box-card {
    width: 500px;
    margin-right: 100px;
    text-align: center;
    .el-button {
      margin: 15px 0;
      width: 200px;
    }
    span {
      font-size: 26px;
      line-height: 50px;
    }
  }
}
</style>