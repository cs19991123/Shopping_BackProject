<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-change="change"
            :on-remove="remove"
            :on-preview="onPreview"
            :auto-upload="false"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
        <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { banneradd, bannerinfo, banneredit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "",
      fileList: [],
    };
  },
  props: ["addInfo"],
  computed: {},
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    remove(file, fileList) {
      this.imgUrl = "";
      this.form.img = "";
    },
    change(file, fileList) {
      // console.log(file);
      this.imgUrl = file.raw;
    },
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 重置
    reset() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.fileList = [];
      this.$refs.form.resetFields();
    },
    // 取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 确定添加
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 转化为formdata格式
          let data = this.form;
          let file = new FormData();
          for (let key in data) {
            file.append(key, data[key]);
          }
          file.append("img", this.imgUrl);
          // console.log(file.get('catename'));
          banneradd(file)
            .then((res) => {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerList();
            })
            .catch((err) => {
              this.$message.error(res.data.msg);
            });
        } else {
          return false;
        }
      });
    },
    // 编辑
    look(id) {
      bannerinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 确认编辑
    edit(id) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 转化为formdata格式
          let data = this.form;
          let file = new FormData();
          for (let key in data) {
            file.append(key, data[key]);
          }
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          // console.log(file.get('catename'));
          banneredit(file)
            .then((res) => {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerList();
            })
            .catch((err) => {
              this.$message.error(res.data.msg);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="stylus" scoped></style>
