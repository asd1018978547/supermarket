<template>
  <div>
    <!-- 搜索 -->
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="选择分类">
          <el-select v-model="search.category" placeholder="选择分类">
            <el-option
              v-for="item in type"
              :label="item.name"
              :value="item.index"
              :key="item.index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字:">
          <el-input v-model="search.keyWorld"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBtn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 表单 -->
    <el-table :data="Goods" style="width: 100%" :loading="loading">
      <el-table-column prop="barCode" label="商品条形码"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="category" label="所属分类"></el-table-column>
      <el-table-column prop="salePrice" label="售价(元)"></el-table-column>
      <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>
      <el-table-column prop="stockCount" label="库存"></el-table-column>
      <el-table-column prop="vipDiscount" label="会员优惠"></el-table-column>
      <el-table-column prop="promotion" label="是否促销"></el-table-column>
      <el-table-column label="库存总额(元)">
        <template slot-scope="scope">
          <span>{{ scope.row.marketPrice*scope.row.stockCount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="管理">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="changeGoods(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="removeGoods(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :currentPage="currentPage"
      @current-change="currentChange"
    ></el-pagination>

    <!-- 弹出的框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
      <el-form
        :inline="true"
        label-position="top"
        :model="updataGoods"
        :rules="rules"
        ref="updataGoods"
        label-width="100px"
      >
        <el-form-item label="所属分类">
          <el-select v-model="updataGoods.category">
            <el-option
              v-for="item in type"
              :label="item.name"
              :value="item.index"
              :key="item.index"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 条形码 -->
        <el-form-item label="条形码">
          <el-input v-model="updataGoods.barCode"></el-input>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="updataGoods.name"></el-input>
        </el-form-item>
        <!-- 商品售价 -->
        <el-form-item label="商品售价" prop="salePrice">
          <el-input v-model="updataGoods.salePrice " type="number"></el-input>
        </el-form-item>
        <!-- 市场价 -->
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model="updataGoods.marketPrice"></el-input>
          <p>默认市场价为售价的1.2倍</p>
        </el-form-item>
        <!-- 商品进价 -->
        <el-form-item label="商品进价">
          <el-input v-model="updataGoods.stockPrice"></el-input>
        </el-form-item>

        <!-- 入库数量 -->
        <el-form-item label="入库数量">
          <el-input v-model="updataGoods.stockCount"></el-input>
        </el-form-item>
        <!-- 商品重量 -->
        <el-form-item label="商品重量">
          <el-input v-model="updataGoods.commodityWeight"></el-input>
          <p>计重商品单位为千克</p>
        </el-form-item>
        <!-- 商品单位 -->
        <el-form-item label="商品单位">
          <el-input v-model="updataGoods.commodityUnit"></el-input>
        </el-form-item>

        <el-form-item label="会员优惠" prop="vipDiscount">
          <el-radio-group v-model="updataGoods.vipDiscount">
            <el-radio label="0">优惠</el-radio>
            <el-radio label="1">不优惠</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否促销" prop="promotion">
          <el-radio-group v-model="updataGoods.promotion">
            <el-radio label="0">促销</el-radio>
            <el-radio label="1">不促销</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品简介" prop="goodsDesc">
          <el-input type="textarea" v-model="updataGoods.goodsDesc"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="updataGoodsBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goods, removeGoods, updataGoods } from "../../api/api";
import type from "../../json/type.json";
var typeObj = {}; //创建商品类型映射对象
export default {
  created() {
    //初始获取前几条数据
    this.getGoods(this.currentPage);
    //搜索加入一条全部数据
    this.type = [{ name: "全部商品", index: 0 }, ...type];
  },

  data() {
    return {
      search: {
        keyWorld: "", //关键字
        category: "" //类型
      },
      type: [], //商品类型
      Goods: [], //当前所有商品列表
      loading: true, //from显示加载
      pageSize: 3, //每页显示3条
      total: 0, //总条数后台来
      currentPage: 1, //当前页数
      dialogFormVisible: false, //编辑框默认关闭
      updataGoods: {}, //修改的商品信息
      rules: {
        //验证
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
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    //搜索
    searchBtn() {
      this.getGoods(1, this.search.keyWorld, this.search.category);
    },

    //编辑
    changeGoods(row) {
      this.dialogFormVisible = true; //显示修改框
      this.updataGoods = row; //添加当前商品信息
      this.type = require("../../json/type.json");
      console.log(row);
    },
    //确认修改
    updataGoodsBtn() {
      console.log(this.updataGoods);

      updataGoods(this.updataGoods).then(res => {
        if (res.data == "ok") {
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "确认修改",
            center: true
          });
          //重新刷新数据
          this.getGoods(
            this.currentPage,
            this.search.keyWorld,
            this.search.category
          );
        } else {
          his.$message({
            type: "error",
            message: "修改失败",
            center: true
          });
        }
      });
    },
    //删除商品
    removeGoods(row) {
      console.log(row.id);
      //先前端判定是否删除
      this.$confirm("此操作将永久删除该商品, 是否继续?", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确定以后,才发送ajax进行数据删除
          removeGoods(row.id).then(res => {
            if (res.data == "ok") {
              this.$message({
                type: "success",
                message: "删除商品成功",
                center: true
              });
              //重新刷新数据
              this.getGoods(
                this.currentPage,
                this.search.keyWorld,
                this.search.category
              );
            } else {
              this.$message({
                type: "error",
                message: "取消删除商品",
                center: true
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "取消删除商品",
            type: "error",
            center: true
          });
        });
    },
    //换页
    currentChange(val) {
      //val是当前第几页
      this.currentPage = val;
      //换页请求
      this.getGoods(
        this.currentPage,
        this.search.keyWorld,
        this.search.category
      );
    },

    //封装ajax函数
    //currentPage 当前页  pagesize  一页几个 keyworld 关键字  category类型
    getGoods(currentPage, keyWorld = "", category = "") {
      this.loading = true; //发送ajax之前显示加载
      goods(currentPage, this.pageSize, keyWorld, category)
        .then(res => {
          //创建映射对象
          for (let item of type) {
            typeObj[item.index] = item.name;
          }
          // console.log(typeObj);

          //保存返回的结果用于遍历修改
          var arr = res.data.data;

          for (let obj of arr) {
            obj.category = typeObj[obj.category];
            obj.promotion = obj.promotion == 0 ? "促销" : "不促销";
            obj.vipDiscount = obj.vipDiscount == 0 ? "优惠" : "不优惠";
          }

          this.Goods = arr;
          this.total = res.data.total;
          this.loading = false; //发送成功隐藏加载
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.red {
  color: #ce3e3e;
}
</style>