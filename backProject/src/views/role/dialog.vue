<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps"
            check-strictly
          >
          </el-tree>
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleadd, roleinfo, roleedit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleListAction",
    }),
    // 重置
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
      this.$refs.form.resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 添加一条数据
    add() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      this.$refs.form.validate((valid) => {
        if (valid) {
          roleadd(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // look显示
    look(id) {
      roleinfo({ id }).then((res) => {
        this.form = res.data.list;
        this.$refs.tree.setCheckedKeys(this.form.menus.split(","));
        this.form.id = id;
      });
    },
    // 确定编辑
    edit() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      this.$refs.form.validate((valid) => {
        if (valid) {
          roleedit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
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
