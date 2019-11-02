<template>
  <div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="AddAccount"
      :rules="rules"
      ref="AddAccount"
    >
      <el-form-item label="用户名：" prop="account">
        <el-input v-model="AddAccount.account"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="AddAccount.password" type="password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPwd">
        <el-input v-model="AddAccount.checkPwd" type="password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="选择用户组" prop="usergroup">
        <el-select v-model="AddAccount.usergroup">
          <el-option :key="item.value" v-for="item in option" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('AddAccount')">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addAccuont } from "../../api/api";
export default {
  data() {
    return {
      option: [
        { label: "超级管理员", value: 0 },
        { label: "超级管理员", value: 1 },
        { label: "店员", value: 2 }
      ],
      AddAccount: {
        account: "",
        password: "",
        checkPwd: "",
        usergroup: ""
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPwd: [{ required: true, message: "请确认密码", trigger: "blur" }],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.AddAccount.password !== this.AddAccount.checkPwd) {
        //两次密码不一致
        this.$message({
          type: "error",
          message: "请检查两次密码是否一致",
          center: true
        });
        return;
      } else {
        //如果两次密码一致
        this.$refs[formName].validate(valid => {
          if (valid) {
            addAccuont(
              this.AddAccount.account,
              this.AddAccount.password,
              this.AddAccount.usergroup
            ).then(res => {
              this.$message({
                type: "success",
                message: "添加成功",
                center: true
              });
            });
          } else {
            this.$message({
              type: "error",
              message: "添加失败",
              center: true
            });
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style> 


