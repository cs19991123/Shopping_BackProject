<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="一级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
import { cateadd, cateinfo, cateedit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "",
      fileList: [],
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
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
        pid: 0,
        catename: "",
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
          cateadd(file)
            .then((res) => {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getCateList();
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
      cateinfo({ id }).then((res) => {
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
          cateedit(file)
            .then((res) => {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getCateList();
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
