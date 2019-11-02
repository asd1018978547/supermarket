<template>
  <div>
    <el-container>
      <!-- 页头 -->
      <el-header>
        <span>
          <i class="el-icon-s-goods"></i>欢迎使用XXX管理系统
        </span>
        <!-- 头像框 -->
        <div class="avatarBox" style="display:flex">
          <img class="avatar" :src="avatarUrl" @click="goToUpload" />
          
          <span>{{ account }}</span>
        </div>
      </el-header>

      <el-container>
        <el-aside width="220px">
          <p>XXX管理系统</p>
          <!-- 导航 -->
          <el-menu
            router
            unique-opened
            default-active="/home/goods"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!-- 父级菜单 -->
            <el-submenu :index="menu.index" v-for="menu in treelist" :key="menu.index">
              <template slot="title">
                <i :class="menu.cls"></i>
                <span>{{ menu.title }}</span>
              </template>
              <!-- 子级菜单 -->
              <el-menu-item-group v-for=" item in menu.children" :key="item.index">
                <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container style="flex:1">
          <!-- 右侧主内容 -->
          <el-main>
            <router-view class="rightBox"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tree from "../json/treelist.json";
import { token, IP } from "../api/api";
export default {
  created() {
    // account: "admin"
    // avatarUrl: null
    // id: 26
    // msg: "登录成功"
    // token: ...
    // userGroup: "0"
    //验证token是否过期
    token(localStorage.token).then(res => {
      if (res.data == "ok") {
        this.account = localStorage.account;
        //设置头像(如果有头像就显示头像，否则显示默认头像)  不等于null有头像
        this.avatarUrl =
          localStorage.avatarUrl != "null"
            ? IP + "/" + localStorage.avatarUrl
            : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        //登录成功保存列表树
        //满足要求的保存
        this.treelist = tree.filter(item =>
          //包含当前用户组的添加进去
          item.userGroup.includes(localStorage.userGroup)
        );
      } else {
        this.account = "请登录";
        this.$alert("请重新登录", "登录过期", {
          confirmButtonText: "确定"
        });
      }
    });
    // this.avatarUrl= this.$store.state.avatarUrl; 
  },
  data() {
    return {
      account: "", //用户名
      avatarUrl: "",
      // 动态菜单创建
      treelist: []
    };
  },
  methods: {
    goToUpload() {
      this.$router.history.push("/home/upload");
    }
  }
};
</script>

<style lang="less" scoped>
.avatarBox {
  display: flex;
  align-items: center;
  .avatar {
    width: 50px;
    height: 50px;
    margin: 20px;
    border-radius: 50%;
  }
}

.el-container {
  height: 100%;
}
.el-aside {
  justify-content: center;
  text-align: center;
  background-color: #545c64;
  height: 100%;
  .el-menu {
    border: none;
  }
  p {
    color: #fff;
    font-size: 20px;
    margin: 40px 0;
  }
}
.el-header {
  padding: 0 20px;
  background-color: #313842;
  display: flex;
  justify-content: space-between;
  span {
    line-height: 60px;
    font-size: 30px;
    color: #fff;
  }
  .el-row {
    margin-top: 5px;
    align-items: center;
    margin-right: 10px;
  }
}

.rightBox {
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style> 