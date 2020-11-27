<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
      @opened="creatEditor"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="changeSecond"
          >
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
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择分类">
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input
            v-model.number="form.price"
            autocomplete="off"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
            maxlength="10"
          ></el-input>
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

        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeAttrs"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="item in attr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
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
import { goodsadd, goodsinfo, goodsedit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
// 引入富文本编译器
import E from "wangeditor";

export default {
  data() {
    return {
      form: {
        goodsname: "", // 商品名称
        first_cateid: "", // 一级分类编号
        second_cateid: "", // 二级分类编号
        price: "", // 商品价格
        market_price: "", // 市场价格
        img: "", // 图片信息
        specsid: "", // 商品规格编号
        specsattr: "", // 商品规格属性
        isnew: 1, // 是否新品
        ishot: 1, // 是否热卖
        status: 1, // 状态
        description: "",
      },
      formLabelWidth: "120px",
      rules: {
        goodsname: [{ required: true, message: "请输入标题", trigger: "blur" }],
        first_cateid: [
          { required: true, message: "请选择一级标题", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级标题", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "",
      fileList: [],
      editor: "",
      secondList: [], // 二级分类
      attr: [], // 规格属性
      isClear: true,
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList", // 商品分类
      specsList: "specs/getSpecsList", // 规格属性
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getAllSpecsList: "specs/getAllSpecsListAction",
      getGoodsList: "goods/getGoodsListAction",
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
    // 一级分类联动二级分类
    changeSecond(e) {
      if (this.isClear) {
        this.form.second_cateid = "";
      }
      this.cateList.map((item) => {
        if (item.id == e) {
          this.secondList = item.children;
        }
      });
    },
    // 商品规格联动规格属性
    changeAttrs(e) {
      if (this.isClear) {
        this.form.specsattr = "";
      }
      this.specsList.map((item) => {
        if (item.id == e) {
          this.attr = item.attrs;
        }
      });
    },
    // 打开富文本编译器
    creatEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description); // 重新设置编辑器内容
    },
    // 重置
    reset() {
      this.form = {
        goodsname: "", // 商品名称
        first_cateid: "", // 一级分类编号
        second_cateid: "", // 二级分类编号
        price: "", // 商品价格
        market_price: "", // 市场价格
        img: "", // 图片信息
        specsid: "", // 商品规格编号
        specsattr: "", // 商品规格属性
        isnew: 1, // 是否新品
        ishot: 1, // 是否热卖
        status: 1, // 状态
      };
      this.fileList = [];
      this.$refs.form.resetFields();
      this.editor.txt.html("");
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
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.join(",")
            : "";
          this.form.description = this.editor.txt.html();

          // 转化为formdata格式
          let data = this.form;
          let file = new FormData();
          for (let key in data) {
            file.append(key, data[key]);
          }
          file.append("img", this.imgUrl);
          // console.log(file.get('catename'));
          goodsadd(file)
            .then((res) => {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsList();
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
      goodsinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          this.isClear = false;
          this.changeSecond(this.form.first_cateid);
          this.changeAttrs(this.form.specsid);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 确认编辑
    edit(id) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.join(",")
            : "";
          this.form.description = this.editor.txt.html();
          // 转化为formdata格式
          let data = this.form;
          let file = new FormData();
          for (let key in data) {
            file.append(key, data[key]);
          }
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          // console.log(file.get('catename'));
          goodsedit(file)
            .then((res) => {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsList();
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
  mounted() {
    this.getCateList();
    this.getAllSpecsList();
  },
};
</script>

<style  lang="stylus" scoped></style>
