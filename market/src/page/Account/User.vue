<template>
  <div>
    <el-table :data="User" style="width: 100%" :loading="loading">
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户组">
        <template slot-scope="scope">
          <span>{{ scope.row.userGroup == 0 ?'超级管理员' :'管理员' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteUser(scope.$index, scope.row)" type="danger" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :currentPage="currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { account, removeAccount } from "../../api/api";
export default {
  beforeMount() {
    //初始获取前几条数据
    this.getUser(this.currentPage);
  },
  data() {
    return {
      User: [],
      loading: true,
      pageSize: 3, //每页显示3条
      total: 0, //总条数后台来
      currentPage: 1 //当前页数
    };
  },
  methods: {
    //删除
    deleteUser(index, rows) {
      console.log(index, rows.id);
      //先前端判定是否删除
      this.$confirm("此操作将永久删除该账号, 是否继续?", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确定以后,才发送ajax进行数据删除
          removeAccount(rows.id).then(res => {
            if (res.data == "ok") {
              this.$message({
                type: "success",
                message: "删除账号成功",
                center:true
              });
              //重新刷新数据
              this.getUser(this.currentPage);
            } else {
              this.$message({
                type: "error",
                message: "取消删除账号",
                center:true
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "取消删除账号",
            type: "error",
            center:true
          });
        });
    },
    //换页
    currentChange(val) {
      //val是当前第几页
      this.currentPage = val;
      //换页请求
      this.getUser(val);
    },

    //封装一个请求多次调用
    getUser(currentPage) {
      this.loading = true//发送ajax之前显示加载
      account(currentPage, this.pageSize)
        .then(res => {
          //当前页账号删完之后执行
          if(res.data.data.length == 0){
            console.log('执行换页操作');
          }
          this.User = res.data.data;
          this.total = res.data.total;
          this.loading = false;//发送成功隐藏加载
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
</style>