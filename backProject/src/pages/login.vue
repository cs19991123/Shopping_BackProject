<template>
  <div class="bgpic">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username" clearable></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="userInfo.password"
          clearable
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button round @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userlogin } from "../util/axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({ getMenuAction: "aside/getMenuAction" }),
    login() {
      if (sessionStorage.getItem("userInfo")) {
        sessionStorage.removeItem("userInfo");
      }
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          userlogin(this.userInfo).then((res) => {
            if (res.data.code == 200) {
              // 登陆成功
              this.$message.success(res.data.msg);
              // sessionStorage.setItem("userInfo", JSON.stringify(res.data.list));
              this.getMenuAction(res.data.list);
              this.$router.push("/index");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="stylus" scoped>
.bgpic {
  background: url('');
}

.el-form {
  width: 400px;
  height: 200px;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  margin: auto;
  background: linear-gradient(45deg, pink, skyblue);
  padding: 35px 30px 0 0;

  .el-button {
    width: 200px;
  }
}
</style>
