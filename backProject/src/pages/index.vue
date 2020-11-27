<template>
  <div>
    <el-container>
      <el-header
        >xxx大型后台管理系统
        <el-button @click="logout">退出</el-button>
        <i class="Name" v-if='getUserInfo'>{{ getUserInfo.username }}</i>
      </el-header>
      <el-container>
        <v-aside></v-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vAside from "../components/aside";
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
      username: "",
    };
  },
  computed:{
    ...mapGetters({
      getUserInfo:'aside/getMenu'
    })
  },
  components: {
    vAside,
  },
  methods: {
    ...mapActions({
      getMenuAction:'aside/getMenuAction'
    }),
    logout() {
      this.$confirm("是否退出此账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.getMenuAction(null)
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
  mounted() {
    this.username = JSON.parse(sessionStorage.getItem("userInfo")).username;
  },
};
</script>

<style  lang="stylus" scoped>
.el-header {
  background: #545c64;
  color: #fff;
  font-size: 24px;
  line-height: 60px;

  .Name {
    float: right;
    margin-right: 10px;
  }

  .el-button {
    float: right;
    margin: 10px 0 0;
  }
}
</style>
