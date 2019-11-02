<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :currentPage="currentPage"
    @current-change="currentChange"
  ></el-pagination>
</template>

<script>
export default {
  methods: {
    //换页
    currentChange(val) {
      //val是当前第几页
      this.currentPage = val;
      //换页请求
      goods(val, this.data.pageSize)
        .then(res => {
          this.Goods = res.data.data;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>