<template>
  <div>
    <el-form
    label-position="top"
      :model="AddStock"
      :rules="rules"
      ref="AddStock"
      label-width="100px"
      class="demo-AddStock"
    >
      <!-- 商品条形码 -->
      <el-form-item label="商品条形码" prop="code">
        <el-input v-model="AddStock.code"></el-input>
      </el-form-item>
      <!-- 数量 -->
      <el-form-item label="数量" prop="nums">
        <el-input v-model="AddStock.nums" type="number"></el-input>
        <p>计重商品单位为千克</p>
      </el-form-item>
      <!-- 进价 -->
      <el-form-item label="进价" prop="purchasePrice">
        <el-input v-model="AddStock.purchasePrice" type="number"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('AddStock')">入库</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AddStock: {
        code: "", //商品条形码
        nums: "", //数量
        purchasePrice: "" //商品进价
      },
      rules: {
        code: [
          { required: true, message: "请输入商品条形码", trigger: "blur" },
        ],
        nums: [
          { required: true, message: "请输入商品数量", trigger: "blur" },  
        ],
        purchasePrice: [
          { required: true, message: "请输入商品进价", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("提交成功!");
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>>

<style scoped>
</style>