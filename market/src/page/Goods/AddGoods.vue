<template>
  <div>
    <el-form
      label-position="top"
      :model="AddGoods"
      :rules="rules"
      ref="AddGoods"
      label-width="100px"
    >
      <el-form-item label="所属分类">
        <el-select v-model="AddGoods.category">
          <el-option v-for="item in type" :label="item.name" :value="item.index" :key="item.index"></el-option>
        </el-select>
      </el-form-item>

      <!-- 条形码 -->
      <el-form-item label="条形码">
        <el-input v-model="AddGoods.barCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="randomCode">立即创建</el-button>
      </el-form-item>

      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="AddGoods.name"></el-input>
      </el-form-item>
      <!-- 商品售价 -->
      <el-form-item label="商品售价" prop="salePrice">
        <el-input v-model="AddGoods.salePrice " type="number"></el-input>
      </el-form-item>
      <!-- 市场价 -->
      <el-form-item label="市场价" prop="marketPrice">
        <el-input v-model="AddGoods.marketPrice"></el-input>
        <p>默认市场价为售价的1.2倍</p>
      </el-form-item>
      <!-- 商品进价 -->
      <el-form-item label="商品进价">
        <el-input v-model="AddGoods.stockPrice"></el-input>
      </el-form-item>

      <!-- 入库数量 -->
      <el-form-item label="入库数量">
        <el-input v-model="AddGoods.stockCount"></el-input>
      </el-form-item>
      <!-- 商品重量 -->
      <el-form-item label="商品重量">
        <el-input v-model="AddGoods.commodityWeight"></el-input>
        <p>计重商品单位为千克</p>
      </el-form-item>
      <!-- 商品单位 -->
      <el-form-item label="商品单位">
        <el-input v-model="AddGoods.commodityUnit"></el-input>
      </el-form-item>

      <el-form-item label="会员优惠" prop="vipDiscount">
        <el-radio-group v-model="AddGoods.vipDiscount">
          <el-radio label="0">优惠</el-radio>
          <el-radio label="1">不优惠</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否促销" prop="promotion">
        <el-radio-group v-model="AddGoods.promotion">
          <el-radio label="0">促销</el-radio>
          <el-radio label="1">不促销</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="商品简介" prop="goodsDesc">
        <el-input type="textarea" v-model="AddGoods.goodsDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('AddGoods')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addGoods } from "../../api/api";
import type from "../../json/type.json";
export default {
  beforeMount() {
    //初始获取前几条数据
    this.type = type;
  },
  data() {
    return {
      type: [], //分类下拉框数据
      AddGoods: {
        category: "", //商品分类
        barCode: "", //条形码
        name: "", //商品名称
        salePrice: "", //商品售价
        marketPrice: "", //市场价
        stockPrice: "", //商品进价
        stockCount: "", //入库数量
        commodityWeight: "", //商品重量
        commodityUnit: "", //商品单位
        vipDiscount: "", //会员优惠
        promotion: "", //是否促销
        goodsDesc: ""
      },
      rules: {
        category: [
          { required: true, message: "请选择一个分类", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        salePrice: [
          { required: true, message: "请输入商品售价", trigger: "blur" },
          { message: "请输入商品价格", trigger: "blur" }
        ],
        vipDiscount: [
          { required: true, message: "会员优惠", trigger: "change" }
        ],
        promotion: [{ required: true, message: "是否促销", trigger: "change" }],
        goodsDesc: [
          { required: true, message: "请填写商品简介", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addGoods(this.AddGoods)
            .then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            });
        } else {
          this.$message({
            message: "提交添加请求失败",
            type: "error"
          });
          return false;
        }
      });
    },
    //生成条形码
    randomCode() {
      let str = "";
      for (let i = 0; i < 18; i++) {
        str += Math.floor(Math.random() * 10);
      }
      this.AddGoods.barCode = str;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>>

<style lang="less" scoped>
</style>