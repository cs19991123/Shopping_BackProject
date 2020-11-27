<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, idx) in attrList"
          :key="idx"
        >
          <el-input
            v-model="item.value"
            autocomplete="off"
            class="shot"
          ></el-input>
          <el-button type="primary" @click="addAttr" v-if="idx == 0"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(idx)">删除</el-button>
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
import { mapGetters, mapActions } from "vuex";
import { specsadd, specsinfo, specsedit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrList: [
        {
          value: "",
        },
      ],
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {},
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
    }),
    // 添加规格属性
    addAttr() {
      if (this.attrList.length > 4) {
        this.$message.warning("最多添加5个商品规格属性");
        return;
      }
      this.attrList.push({
        value: "",
      });
    },
    // 删除规格属性
    delAttr(i) {
      this.attrList.splice(i, 1);
    },
    //   重置
    reset() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrList = [
        {
          value: "",
        },
      ];
      this.$refs.form.resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    look(id) {
      specsinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          res.data.list[0].attrs.map((item, index) => {
            if (index == 0) {
              this.attrList[0] = {
                value: item,
              };
            } else {
              this.attrList.push({
                value: item,
              });
            }
          });
          this.form = res.data.list[0];
          this.form.id = id;
        }
      });
    },
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.attrs = this.attrList.map((item) => item.value).join(",");
          specsadd(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    edit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.attrs = this.attrList.map((item) => item.value).join(",");
          specsedit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsList();
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
.shot {
  width: 70%;
}
</style>
