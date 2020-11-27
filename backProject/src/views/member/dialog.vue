<template>
  <div>
    <el-dialog
      title="编辑会员"
      :visible.sync="isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { memberinfo, memberedit } from "../../util/axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  props: ["isShow"],
  computed: {},
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    // 重置
    reset() {
      this.form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
      this.$refs.form.resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },

    // look显示
    look(uid) {
      memberinfo({ uid }).then((res) => {
        this.form = res.data.list;
        this.form.uid = uid;
      });
    },
    // 确定编辑
    edit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          memberedit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMemberList();
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

<style  lang="" scoped>
</style>
